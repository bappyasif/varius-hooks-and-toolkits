let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, "./src/index.js"),
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js"
    },
    mode: "development",
    // devServer: {contentBase: path.join(__dirname, "src")},
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html')
        })
    ]
}