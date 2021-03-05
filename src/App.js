import React, { Component, lazy, Suspense } from "react";

import {
  Tabs,
  PageLoader,
} from "@cedcommerce/ounce-ui";
import "@cedcommerce/ounce-ui/dist/index.css";
import { Route, Switch, withRouter } from "react-router-dom";

const AttributeHome = lazy(() => import('./component/AttributeHome'))
const CategoryHome = lazy(() => import('./component/CategoryHome'))

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: '/'

    };
  }



  render() {
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

        <Suspense fallback={<PageLoader />}>

          <Switch>
            <Route path='/attribute' component={AttributeHome} />
            <Route path='/' component={CategoryHome} />
          </Switch>
        </Suspense>






      </>
    );
  }
}

export default withRouter(App);
