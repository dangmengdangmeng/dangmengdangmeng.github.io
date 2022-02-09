import Quill from "quill";
import { previewQuillEditorModules, quillEditorModules } from "./EditorOptions";
import ImageResize from "quill-image-resize-module";
import BetterTable from "quill-better-table";
import './quill-better-table.less'
import "quill/dist/quill.snow.css";
import "./FontSize.less";

const Size = Quill.import("attributors/style/size");
Size.whitelist = ["14px", "16px", "18px", "20px", "22px", "24px", "26px", "28px", "30px"];
Quill.register(Size);
Quill.register("modules/imageResize", ImageResize);
Quill.register({
	"modules/better-table": BetterTable
}, true);

class QuillEditor {
	constructor(config = { type: "" }) {
		this.editorType = config.type;
		this.elementId = config.id;
		return this.init()
	}
	init() {
		const editorOptions = this.editorType === "preview" ? previewQuillEditorModules : quillEditorModules;
		return new Quill(this.elementId, editorOptions);
	}
}

export default QuillEditor;
