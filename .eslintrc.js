module.exports = {
	"root": true,
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": [
		// "eslint:recommended",
		"airbnb",
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"rules": {
		"import/no-unresolved": 0,
		"import/extensions": 0,
		"class-methods-use-this": 0,
		"no-tabs": 0,
		"indent": ["error", "tab"],
		"object-curly-newline": 0,
		"no-restricted-syntax": 0,
		"arrow-parens": 0,
		"linebreak-style": 0,
		"max-len": 0,
		"no-underscore-dangle": 0,
		"no-plusplus": 0,
	},
	settings: {
		'import/resolver': {
			webpack: {
				config: './webpack/webpack.config.js',
			},
		},
	},
};