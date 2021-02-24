import React, { Component } from 'react'
import { Route, Switch, } from "react-router-dom";
import Home from "./Home";
import Edit from "./Edit";

import {
    Card,
    FlexLayout,
    Tabs
} from "@cedcommerce/ounce-ui";

export default class CategoryHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: "/",
        }
    }

    render() {
        return (
            <>
                <Card>

                    <div className='mt-30 m'>
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

                    </div>
                </Card>


                <Switch>
                    <Route exact path="/" component={Home} />

                    <Route path="/Edit" component={Edit} />
                </Switch>

            </>

        )
    }
}
