import React from "react";
import { Link } from "react-router-dom";
import './index.less'
const Home = ()=>{
	return <div className="home">
		<ul>
			<li><Link to="/editor">富文本编辑器</Link></li>
			<li><Link to="/flow">流程图</Link></li>
		</ul>
	</div>
}
export default React.memo(Home)
