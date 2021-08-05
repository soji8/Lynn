class Vnode {
    constructor (tag, attr, childer, parent, childerTemplate, uuid) {
        this.tag = tag;
        this.attr = attr;
        this.childer = childer;
        this.parent = parent;
        this.childerTemplate = childerTemplate;
        this.uuid = this.uuid() || uuid;
    }
    uuid() {
        return (
            Math.random() * 10000000000 +
            Math.random() * 100000 + 
            Date.now()
        ).toString(36);
    }
}
        
class Engine {
    constructor() {
        this.nodes = new Map();
    }
    rander (template, data = {}) {
        const re1 = /<(\w+)\s*([^>]*)>([^<]*?)<\/\1>/gm;
        const re2 = /<(\w+)\s*([^>]*)\/>/gm;

        template = template.replace(/\n/gm, "");

        while(re1.test(template) || re2.test(template)) {
            template = template.replace(re1, (s0, s1, s2, s3) => {
                var attr = this.parseAttribute(s2);
                var node = new Vnode(s1, attr, [], null, s3);
                this.nodes.set(node.uuid, node);
                return `(${node.uuid})`;
            });
            template = template.replace(re2, (s0, s1, s2) => {
                var attr = this.parseAttribute(s2);
                var node = new Vnode(s1, attr, [], null, null);
                this.nodes.set(node.uuid, node);
                return `(${node.uuid})`;
            });
        }
        let tree = this.templateToTree(template);
        var dom = this.treeToDom(tree, document.createDocumentFragment(), data);
        document.body.appendChild(dom);
    }
    
    // attr存放格式转为对象
    parseAttribute(str) {
        const re = /(\w+\-?\w+)="(.*?)"/gm;
        let obj = {};
        str.replace(re, (s0, s1, s2) => {
            obj[s1] = s2;
        });
        return obj;
    }    

    templateToTree(template) {
        const re = /\((.*?)\)/g;
        let stack = [];
        // tag, attr, childer, parent, childerTemplate, uuid
        let parent = new Vnode("root", {}, [], null, template, null);
        stack.push(parent);
        while (stack.length > 0) {
            let pnode = stack.pop();
            let nodestr = pnode.childerTemplate.trim();
            [...nodestr.matchAll(re)].forEach((item) => {
                let n = this.nodes.get(item[1]);
                let newn = new Vnode(
                    n.tag,
                    n.attr,
                    [],
                    pnode,
                    n.childerTemplate,
                    null
                );
                pnode.childer.push(newn);
                stack.push(newn);
                if (n.childerTemplate == null) {
                    stack.pop();
                }
            });
        }
        return parent.childer[0];
    }
    treeToDom(tree, node, data) {
        var tree = tree, _this = this;
        var e = document.createElement(tree.tag);
        // 编写属性
        if (tree.attr) {
            var attr = tree.attr;
            Object.keys(attr).forEach((item) => {
                let value = attr[item];
                let att = document.createAttribute(item);
                // 特殊属性获取数据
                let attrRe = /\{\{(.*)\}\}/g;
                if (attrRe.test(value)) {
                    let attrRe = /\{\{(.*)\}\}/g;
                    value = _this.strValue(attrRe.exec(value)[1], data);
                }
                att.value = value;
                e.setAttributeNode(att);
            });
        }
        // 编写文字
        if (tree.childerTemplate != null) {
            let text = tree.childerTemplate.trim();
            let textre = /\{\{(.*)\}\}/
            if (textre.test(text)) {
                text.replace(textre, (s0, s1) => {
                    let t = document.createTextNode(_this.strValue(s1, data));
                    e.appendChild(t);
                });
            }
        }
        this.createNode(node, e, data);
        
        if (tree.childer) {
            [...tree.childer].forEach((item) => {
                _this.treeToDom(item, e, data);
            });
        }
        return node;
    }

    // 获取数据输出
    strValue(str, data) {
        let name = str.split('.');
        let newData = data;
        name.forEach((item) => {
            newData = newData[item];
        });
        if (newData === undefined) {
            return '';
        }
        return newData;
    }

    // 处理特殊格式
    createNode(node, dom, data) {
        // 处理v-if决定是否写入node
        if (dom.getAttribute('v-if')) {
            let key = dom.getAttribute('v-if');
            if (!this.strValue(key, data)) return;
            // 并消除属性节点
            dom.removeAttribute('v-if');
        }
        node.appendChild(dom);
    }
}
