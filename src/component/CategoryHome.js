import React, { Component, lazy, Suspense } from 'react'
import { Route, Switch, } from "react-router-dom";


import {
    Card,
    PageLoader,
    Tabs
} from "@cedcommerce/ounce-ui";
// import Home from './Home'
// import Edit from './Edit'
const Home = lazy(() => import("./Home"))
const Edit = lazy(() => import("./Edit"))

export default class CategoryHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: "/",
            marketPlace: ''
        }

    }
    getMarketplaceName(name) {
        this.setState({
            marketPlace: name
        })


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

                <Suspense fallback={<PageLoader />}>
                    <Switch>
                        <Route exact path="/" component={Home} render={(props) => {
                            <Home{...props} marketplace={this.marketPlace().bind(this)} />
                        }} />

                        <Route
                            path='/Edit'
                            render={(props) => (
                                <Edit {...props} marketplace={this.state.marketPlace} />
                            )}
                        />
                        <Route path="/Edit" component={Edit} />
                    </Switch>
                </Suspense>

            </>

        )
    }
}
