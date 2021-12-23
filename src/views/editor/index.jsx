import React, { useEffect, useState } from "react";
import QuillEditor from "../../editor_plugin/QuillEditor";
import "./index.less";
import OpenapiUpload from "../../components/OpenapiUpload";

const EditorPage = () => {
	const [quillEditorInstance, updateQuillEditorInstance] = useState(null);
	const [previewQuillEditorInstance, updatePreviewQuillEditorInstance] = useState(null);
	
	useEffect(() => {
		const quillInstance = new QuillEditor({ id: "#quill-editor" });
		const previewQuillInstance = new QuillEditor({ id: "#preview-editor", type: "preview" });
		updateQuillEditorInstance(quillInstance);
		quillInstance.getModule("toolbar").addHandler("image", handleUploadBtnClick);
		updatePreviewQuillEditorInstance(previewQuillInstance);
	}, []);
	
	const handleUploadBtnClick = () => {
		document.getElementById("uploadBtn").click();
	};
	const uploadChange = (fileList) => {
		fileList.map(() => {
			const addImageRange = quillEditorInstance.getSelection();
			const newRange = 0 + (addImageRange !== null ? addImageRange.index : 0);
			quillEditorInstance.insertEmbed(newRange, "image", "http://open.web.hualala.com/static/media/banner2.eb60054e.jpg");
			quillEditorInstance.setSelection(1 + newRange);
		});
	};
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
		<OpenapiUpload onChange={ uploadChange }/>
	</div>;
};
export default React.memo(EditorPage);
