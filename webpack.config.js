const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const paths = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist'),
    public: path.resolve(__dirname, 'public'),
    html: path.resolve(__dirname, 'public', 'index.html'),
};

const buildPlugins = (mode, apiUrl) => [
    new HtmlWebpackPlugin({
        template: paths.html,
    }),
    new webpack.DefinePlugin({
        __API__: JSON.stringify(apiUrl),
    }),
    new webpack.ProgressPlugin(),
];

const buildDevServer = (mode, port) => {
    if (mode !== 'development') return undefined;

    return {
        open: true,
        client: {
            logging: 'none',
        },
        historyApiFallback: true,
        hot: true,
        port,
    };
};

const buildOptimization = () => ({
    minimize: true,
    minimizer: [
        new TerserPlugin({
            test: /\.js(\?.*)?$/i,
        }),
    ],
});

const buildResolvers = () => ({
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
        '@': paths.src,
    },
});

const buildLoaders = () => {
    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const cssLoader = {
        test: /\.css$/i,
        use: [ 'style-loader', 'css-loader' ],
    };

    return [
        tsLoader,
        cssLoader,
    ];
};

module.exports = (env, argv) => {
    const mode = argv.mode === 'development' ? 'development' : 'production';
    const port = env.port ?? 3000;
    const apiUrl = env.apiUrl || 'http://68.183.74.14:4005/api/';

    return {
        entry: './src/index.tsx',
        output: {
            filename: '[name].[contenthash].bundle.js',
            path: paths.dist,
            clean: true,
        },
        module: {
            rules: buildLoaders(),
        },
        optimization: buildOptimization(),
        resolve: buildResolvers(),
        plugins: buildPlugins(mode, apiUrl),
        devServer: buildDevServer(mode, port),
        devtool: 'source-map',
        mode,
    };
};
