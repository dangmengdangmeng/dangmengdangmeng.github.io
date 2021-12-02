import React from "react";
import { Route, Switch ,Redirect} from "react-router-dom";
import FlowChart from "./views/flow";
import EditorPage from "./views/editor";
import Home from "./views/home";

const App = ()=> {
  return (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/flow" component={FlowChart}/>
        <Route exact path="/editor" component={EditorPage}/>
        <Redirect to="/"/>
    </Switch>
  );
}

export default React.memo(App);
