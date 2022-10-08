import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import FlowChart from "./views/flow";
import EditorPage from "./views/editor";
import Home from "./views/home";
import TinyEditor from "./views/tiny";
import OpenApiFooter from "./components/OpenApiFooter";
import "./App.less";

const App = () => {
	return (
		<div className="app">
			<div className="content">
				<Switch>
					<Route exact path="/" component={ Home }/>
					<Route exact path="/flow" component={ FlowChart }/>
					<Route exact path="/editor" component={ EditorPage }/>
					<Route exact path="/tiny" component={ TinyEditor }/>
					<Redirect to="/"/>
				</Switch>
			</div>
			<OpenApiFooter/>
		</div>
	);
};

export default React.memo(App);
