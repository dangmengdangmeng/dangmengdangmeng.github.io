import React, { useEffect, useState } from "react";
import Quill from "quill";
import ImageResize from "quill-image-resize-module";
import BetterTable from "quill-better-table/dist/quill-better-table";
import "quill/dist/quill.snow.css";
import "../../editor_plugin/FontSize.less";
import "quill-better-table/src/assets/quill-better-table.scss";
import "./index.less";

const Size = Quill.import("attributors/style/size");
Size.whitelist = ["16px", "20px"];
Quill.register(Size);
Quill.register("modules/imageResize", ImageResize);
Quill.register({
	"modules/better-table": BetterTable
}, true);
const EditorPage = () => {
	const [quillEditorInstance, updateQuillEditorInstance] = useState(null);
	const [previewQuillEditorInstance, updatePreviewQuillEditorInstance] = useState(null);
	useEffect(() => {
		const quillModules = {
			theme: "snow",
			modules: {
				toolbar: {
					container: [
						[{ size: ["16px", "20px"] }],
						// [{ "font": [] }],
						["bold", "italic", "underline", "strike"],//加粗,斜体,下划线,删除线
						[{ "list": "ordered" }, { "list": "bullet" }, { "indent": "-1" }, { "indent": "+1" }], // 无序,有序,首行缩进
						[{ "align": [] }], //居中相关
						[{ "background": [] }, { "color": [] }],// 背景色,文字颜色
						["blockquote", "code-block"], // 引用,代码块
						["link", "image", "table", "clean"]// 链接,图片,表格,清空
					],
					handlers: {
						table() {
							const quill = this.quill;
							const tableModule = quill.getModule("better-table");
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
		const previewQuillModules = {
			theme: "snow",
			modules: {
				toolbar: false
			},
			readOnly: true
		};
		const quillInstance = new Quill("#quill-editor", quillModules);
		const previewQuillInstance = new Quill("#preview-editor", previewQuillModules);
		// quillInstance.on('text-change',()=>{
		// 	const snowContent = quillInstance.getContents()
		// 	previewQuillInstance.setContents(snowContent)
		// })
		updateQuillEditorInstance(quillInstance);
		updatePreviewQuillEditorInstance(previewQuillInstance);
	}, []);
	const saveEditorData = () => {
		const snowContent = quillEditorInstance.getContents();
		previewQuillEditorInstance.setContents(snowContent);
	};
	return <div className="editor-page">
		<button onClick={ saveEditorData }>保存</button>
		<div id="quill-editor"/>
		<br/>
		预览效果:
		<div id="preview-editor"/>
	</div>;
};
export default React.memo(EditorPage);
