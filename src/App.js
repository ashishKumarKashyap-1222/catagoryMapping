import React, { Component } from "react";

import {
  Button,
  Card,
  Tabs,
  BodyLayout,
  Select,
  LRLayout,
  FlexLayout,
} from "@cedcommerce/ounce-ui";
import "@cedcommerce/ounce-ui/dist/index.css";
import Home from "./component/Home";
import Edit from "./component/Edit";
import { Route, Switch, withRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "/",

    };
  }



  render() {
    // console.log(this.state.marketPlace)
    return (
      <BodyLayout>

        <Tabs
          onChange={(e) => {
            this.props.history.push(e);
            this.setState({ selected: e });
          }}
          selected={this.state.selected}
          value={[
            {
              content: "Home",
              id: "/",
            },
            {
              content: "Edit",
              id: "/Edit",
            },
          ]}
        />



        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/Edit" component={Edit} />
        </Switch>
      </BodyLayout>
    );
  }
}

export default withRouter(App);
