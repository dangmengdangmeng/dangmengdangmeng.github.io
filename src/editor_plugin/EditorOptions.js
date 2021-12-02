import BetterTable from "quill-better-table";

const quillEditorModules = {
	theme: "snow",
	modules: {
		toolbar: {
			container: [
				[{ "header": [1, 2, 3, 4, 5, 6, false] }, { size: ['14px','16px',"18px", "20px", "22px", "24px", "26px", "28px", "30px"] }], // header,font-size
				["bold", "italic", "underline", "strike"],//加粗,斜体,下划线,删除线
				[{ "color": [] }, { "background": [] }],// 文字颜色,背景色
				[{ "align": [] }, { "list": "ordered" }, { "list": "bullet" }, { "indent": "-1" }, { "indent": "+1" }], // 居中,有序,无序,首行缩进
				["blockquote", "code-block"], // 引用,代码块
				["link", "image", "table", "clean"]// 链接,图片,表格,清空
			],
			handlers: {
				table() {
					const tableModule = this.quill.getModule("better-table");
					tableModule.insertTable(3, 3);
				}
			}
		},
		syntax: true,
		imageResize: { //调整大小组件。
			displayStyles: {
				backgroundColor: "black",
				border: "none",
				color: "white"
			},
			modules: ["Resize", "DisplaySize", "Toolbar"]
		},
		table: false,
		"better-table": {
			operationMenu: { // table右键事件重命名
				items: {
					insertColumnRight: {
						text: "右侧插入一列"
					},
					insertColumnLeft: {
						text: "左侧插入一列"
					},
					insertRowUp: {
						text: "上侧插入一行"
					},
					insertRowDown: {
						text: "下侧插入一行"
					},
					mergeCells: {
						text: "合并单元格"
					},
					unmergeCells: {
						text: "拆分单元格"
					},
					deleteColumn: {
						text: "删除当前列"
					},
					deleteRow: {
						text: "删除当前行"
					},
					deleteTable: {
						text: "删除表格"
					}
				},
				color: {
					colors: [
						"#E53333", "#E56600", "#FF9900", "#64451D",
						"#DFC5A4", "#FFE500", "#009900", "#006600",
						"#99BB00", "#B8D100", "#60D978", "#00D5FF",
						"#337FE5", "#003399", "#4C33E5", "#9933E5",
						"#CC33E5", "#EE33EE", "#FFFFFF", "#CCCCCC",
						"#999999", "#666666", "#333333", "#000000"
					],
					text: "背景颜色"
				}
			}
		},
		keyboard: {
			bindings: BetterTable.keyboardBindings
		}
	}
};
const previewQuillEditorModules = {
	theme: "snow",
	modules: {
		toolbar: false
	},
	readOnly: true
};
export  {
	quillEditorModules,
	previewQuillEditorModules
}
