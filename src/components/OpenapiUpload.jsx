import React from "react";
import { Upload } from "antd";

/**
 * @description 多选上传 最多3张
 * */
const OpenapiUpload = props => {
	const { action = "https://www.mocky.io/v2/5cc8019d300000980a055e76", onChange } = props;
	const uploadChange = ({ fileList }) => {
		const isAllFinished = fileList.every(item => item.status === "done");
		if (isAllFinished) {
			onChange(fileList);
		}
	};
	return <div style={ { display: "none" } }>
		<Upload
			action={ action }
			multiple
			maxCount={ 3 }
			onChange={ uploadChange }
		>
			<div id="uploadBtn"/>
		</Upload>
	</div>;
};
export default React.memo(OpenapiUpload);
