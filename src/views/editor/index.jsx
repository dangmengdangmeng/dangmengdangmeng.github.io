import React, { useEffect, useState } from "react";
import QuillEditor from "../../editor_plugin/QuillEditor";
import "./index.less";

const EditorPage = () => {
	const [quillEditorInstance, updateQuillEditorInstance] = useState(null);
	const [previewQuillEditorInstance, updatePreviewQuillEditorInstance] = useState(null);
	
	useEffect(() => {
		const quillInstance = new QuillEditor({ id: "#quill-editor" });
		const previewQuillInstance = new QuillEditor({ id: "#preview-editor", type: "preview" });
		updateQuillEditorInstance(quillInstance);
		updatePreviewQuillEditorInstance(previewQuillInstance);
	}, []);
	const saveEditorData = () => {
		const snowContent = quillEditorInstance.getContents();
		previewQuillEditorInstance.setContents(snowContent);
	};
	return <div className="editor-page">
		<span>点击保存查看效果---</span>
		<button onClick={ saveEditorData }>保存</button>
		<div id="quill-editor"/>
		<br/>
		预览效果:
		<div id="preview-editor"/>
	</div>;
};
export default React.memo(EditorPage);
