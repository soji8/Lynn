let path = require("path");
let webpack = require("webpack");

module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
    externals: {
      
    },
    exclude: {

    },
    node: {

    }
}