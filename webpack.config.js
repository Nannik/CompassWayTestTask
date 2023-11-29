const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const paths = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist'),
    public: path.resolve(__dirname, 'src', 'public'),
    html: path.resolve(__dirname, 'src', 'public', 'index.html')
}

const buildPlugins = (mode) => {
    return [
        new HtmlWebpackPlugin({
            template: paths.html
        })
    ]
}

const buildDevServer = (mode, port) => {
    if (mode !== 'development') return undefined;

    return {
        static: {
            directory: paths.public,
        },
        compress: true,
        open: true,
        port,
    }
}

module.exports = (env, argv) => {
    const mode = argv.mode === 'development' ? 'development' : 'production';
    const port = env.port ?? 3000;

    return {
        entry: './src/index.js',
        output: {
            filename: '[name].[contenthash].bundle.js',
            path: paths.dist,
            clean: true
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    test: /\.js(\?.*)?$/i,
                }),
            ],
        },
        plugins: buildPlugins(mode),
        devServer: buildDevServer(mode, port),
        devtool: 'source-map',
        mode
    }
};