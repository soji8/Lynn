require.config({ paths: { 'vs': './node_modules/monaco-editor/min/vs' } });
// var template = `
//     function x() {
//         console.log("Hello world!");
//     }
// `

var template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>7-22</title>
</head>
<body>
    123123
</body>
</html>`
require(['vs/editor/editor.main'], () => {
    editorCreate(template, 'html');
});

function editorCreate(template, language) {
    var editor = monaco.editor.create($('#monaco-text')[0], {
        value: template,
        language: language
    });
}

function codeInput() {
    $.post("/code", {test: '11'}, (data) => {
        console.log(data)
    })
}