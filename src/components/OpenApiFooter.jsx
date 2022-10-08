import React from "react";
import beanIcon from "../assets/bean-icon.png";
import "./css/OpenApiFooter.less";

const OpenApiFooter = () => {
	
	const pushToPage = () => {
		window.open("http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010602104159");
	};
	return <div className="open-api-footer">
		<div className="bean-container" onClick={ pushToPage }>
			<img src={ beanIcon } alt="bean"/>
			<p className="number">京公网安备 11010602104159号</p>
		</div>
	</div>;
};
export default React.memo(OpenApiFooter);
