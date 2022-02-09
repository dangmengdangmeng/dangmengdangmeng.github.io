import React from "react";
import { Route, Switch ,Redirect} from "react-router-dom";
import FlowChart from "./views/flow";
import EditorPage from "./views/editor";
import Home from "./views/home";
import TinyEditor from "./views/tiny";
const App = ()=> {
  return (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/flow" component={FlowChart}/>
        <Route exact path="/editor" component={EditorPage}/>
        <Route exact path="/tiny" component={TinyEditor}/>
        <Redirect to="/"/>
    </Switch>
  );
}

export default React.memo(App);
