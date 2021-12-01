import React from "react";
import { Route, Switch ,Redirect} from "react-router-dom";
import FlowChart from "./views/flow";
import EditorPage from "./views/editor";

const App = ()=> {
  return (
    <Switch>
        <Route exact path="/flow" component={FlowChart}/>
        <Route exact path="/editor" component={EditorPage}/>
        <Redirect to="/editor"/>
    </Switch>
  );
}

export default React.memo(App);
