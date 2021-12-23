const {
	override,
	fixBabelImports,
	addWebpackPlugin,
	addLessLoader, // less配置函数
	adjustStyleLoaders // /路径别名
} = require("customize-cra");
const path = require("path");
const webpack = require("webpack");

module.exports = override(
	fixBabelImports("import", { // antd 按需加载
		libraryName: "antd",
		style: true  //自动打包相关的样式 默认为 style:'css',这里需要改为true
	}),
	addLessLoader({
		javascriptEnabled: true
	}),
	addWebpackPlugin(new webpack.ProvidePlugin({
		"window.Quill":'quill/dist/quill.js',
		"Quill":'quill/dist/quill.js'
	})),
	adjustStyleLoaders((item) => {
		if (item.test.toString().includes("less")) {
			item.use.push({
				loader: "style-resources-loader",
				options: {
					patterns: path.resolve(__dirname, "src/assets/global.less")
				}
			});
		}
	})
);
