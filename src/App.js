import React, { Component } from "react";

import {
  Tabs,
  BodyLayout,
  FlexLayout,
} from "@cedcommerce/ounce-ui";
import "@cedcommerce/ounce-ui/dist/index.css";

import AttributeHome from './component/AttributeHome'
import CategoryHome from './component/CategoryHome'
import { Route, Switch, withRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      selected1: '/'

    };
  }



  render() {
    // console.log(this.state.marketPlace)
    return (
      <>
        <div className='mt-20'>
          <Tabs
            onChange={(e) => {
              this.props.history.push(e);
              this.setState({ selected1: e });
            }}
            selected={this.state.selected}
            value={[
              {
                content: "Category Mapping",
                id: "/",
              },
              {
                content: "Attribute Mapping",
                id: "/attribute",
              },
            ]}
          />
        </div>



        <Switch>
          <Route path='/attribute' component={AttributeHome} />
          <Route path='/' component={CategoryHome} />

        </Switch>







      </>
    );
  }
}

export default withRouter(App);
