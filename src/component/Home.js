import React, { Component } from "react";

import {
    BodyLayout,
    Button,
    Card,
    FlexLayout,
    Modal,
    Select,
    Table,
    TextField,
} from "@cedcommerce/ounce-ui";
import "@cedcommerce/ounce-ui/dist/index.css";
import DataTable from "./DataTable";
import EbayUs from "./EbayUs";
import Taxonomy from "./taxonomy";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
} from "react-router-dom";

export default class Home extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            searchGoogle: "",
            searchOther: "",
            next_level: '60251c0257aced67df6a41f2',
            google: [],
            next_levelGoogle: '60251e3b6d0ee5056d5289e2',
            levelgoogle: {},
            next: {},
            lastKeyGoogle: "",
            lastKeyOther: "",
            previousGoogle: [],
            previousOther: [],
            value: {},
        };
    }
    searchCatagory(e) {
        fetch(
            `http://192.168.0.222/ebay/home/public/connector/profile/searchCategory?filters[marketplace]=google&filters[name]=${e}`,
            {
                method: "get",
                headers: {
                    Authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                // if (marketplace == 'google') {
                this.setState({ searchGoogleData: data.data });
                // console.log(data)
                // }
                // else {
                //     this.setState({ searchOtherData: data.data })
                //     // console.log(data)

                // }
            });
    }
    componentDidMount() {
        /**
         * this api fetch root catagory
         */
        fetch(
            "http://192.168.0.222/ebay/home/public/connector/profile/getRootCategory?marketplace=Ebay_US",
            {
                method: "get",
                headers: {
                    Authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg",
                },
            }
        )
            .then((response) => response.json())
            .then((e) => {
                let a = {};
                e.data.forEach((item) => {
                    a[item.level] = e.data;
                });
                // console.log(a)/

                this.setState({
                    previousOther: a,
                    data: a,
                });
            });
        fetch(
            "http://192.168.0.222/ebay/home/public/connector/profile/getRootCategory?marketplace=google",
            {
                method: "get",
                headers: {
                    Authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg",
                },
            }
        )
            .then((response) => response.json())
            .then((e) => {
                let a = {};
                e.data.forEach((item) => {
                    a[item.level] = e.data;
                });
                // console.log(a)

                this.setState({
                    previousGoogle: a,
                    google: a,
                });
            });
    }
    options(marketplace) {
        /**this function creates options for the select tag */
        if (this.state.google[0] != undefined && this.state.data[0] != undefined) {
            let options1 = [];
            if (marketplace == "google") {
                let a = this.state.google[0];
                console.log(a)
                for (let i = 0; i < a.length; i++) {
                    options1.push({
                        label: a[i].custom_category_path,
                        value: a[i].next_level,
                    });
                }
                // console.log(options1)
                return options1;
            } else {
                let a = this.state.data[0];
                for (let i = 0; i < a.length; i++) {
                    options1.push({
                        label: a[i].custom_category_path,
                        value: a[i].next_level,
                    });
                }
                // console.log(options1)
                return options1;
            }
        }
    }

    onSubmit() {
        let mapping = {};
        let finalData = {};
        let a = Object.keys(this.state.google)[
            Object.keys(this.state.google).length - 2
        ];
        let b = Object.keys(this.state.google)[
            Object.keys(this.state.google).length - 1
        ];
        let aOther = Object.keys(this.state.data)[
            Object.keys(this.state.data).length - 2
        ];
        let bOther = Object.keys(this.state.data)[
            Object.keys(this.state.data).length - 1
        ];
        if (Object.keys(this.state.google).length > 1) {
            this.state.google[a].forEach((temp) => {
                if (temp.next_level["$oid"] == this.state.lastKeyGoogle) {
                    // mapping["marketplace_code"] = temp.full_path
                    finalData = temp;
                } else if (temp.next_level == this.state.lastKeyGoogle) {
                    finalData = temp;
                }
                this.state.google[b].forEach((temp) => {
                    if (temp.next_level["$oid"] == this.state.lastKeyGoogle) {
                        // mapping["marketplace_code"] = temp.full_path
                        finalData = temp;
                    }
                });
            });

            if (Object.keys(this.state.data).length > 1) {
                this.state.data[aOther].forEach((temp) => {
                    if (temp.next_level["$oid"] == this.state.lastKeyOther) {
                        mapping["Ebay"] = temp.full_path;
                    } else if (temp.next_level == this.state.lastKeyOther) {
                        mapping["Ebay"] = temp.full_path;

                    }
                    this.state.data[bOther].forEach((temp) => {
                        if (temp.next_level["$oid"] == this.state.lastKeyOther) {
                            // console.log(temp.full_path);
                            mapping["Ebay"] = temp.full_path;
                        }
                    });
                });
                finalData["mapping"] = mapping;

                console.log(finalData);
            } else alert("plese selet one catagory");
        } else alert("plese select atleast one cedcommerce catagory");
    }

    handleChange(e, marketplace) {
        if (marketplace == "google") {
            this.setState({ lastKeyGoogle: e });
        } else {
            this.setState({ lastKeyOther: e });
        }
        fetch(
            `http://192.168.0.222/ebay/home/public/connector/profile/getCatrgoryNextLevel?next_level=${e}`,
            {
                method: "GET",
                headers: {
                    Authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg",
                },
            }
        )
            .then((response) => response.json())
            .then((data1) => {
                let a = {};
                data1.data.forEach((item) => {
                    a[item.level] = data1.data;
                    // console.log(item);
                });
                if (marketplace === "google") {
                    this.setState({
                        previousGoogle: this.state.google,
                        google: { ...this.state.google, ...a },
                    });
                } else {
                    this.setState({
                        previousOther: this.state.data,

                        data: { ...this.state.data, ...a },
                    });
                    // console.log(this.state.previousOther);
                }
            });
    }

    render() {
        return (
            <Card>
                {/* <EbayUs></EbayUs> */}
                {/* <EbayUK></EbayUK> */}
                {/* <Taxonomy></Taxonomy> */}
                <BodyLayout>
                    <FlexLayout childWidth="fullWidth">
                        <Card title="Marketplace catagory">
                            <Select
                                onChange={(e) => {
                                    this.handleChange(e, "other");
                                    this.setState({ next_level: e });
                                }}
                                options={this.options("other")}
                                value={this.state.next_level}
                            />
                            {Object.keys(this.state.data).map((a, p) => {
                                var options1 = [];
                                let tempVal = {};
                                if (a != 0) {
                                    for (var i = 0; i < this.state.data[a].length; i++) {
                                        options1.push({
                                            label: this.state.data[a][i].name,
                                            value: this.state.data[a][i].next_level.$oid,
                                        });
                                    }
                                    tempVal[a] = this.state.data[a][0].next_level;

                                    return (
                                        <Select
                                            key={p}
                                            value={tempVal[a].$oid}
                                            options={options1}
                                            onChange={(e) => {
                                                this.handleChange(e, "other");
                                                tempVal[a].$oid = e;
                                            }}
                                        />
                                    );
                                }
                            })}
                        </Card>
                        <Card title="CedCommerce Catagory">
                            <Select
                                onChange={(e) => {
                                    this.handleChange(e, "google");
                                    this.setState({ next_levelGoogle: e });
                                }}
                                options={this.options("google")}
                                value={this.state.next_levelGoogle}
                            />
                            {Object.keys(this.state.google).map((a, i) => {
                                let tempVal = {};
                                var options1 = [];

                                if (a != 0) {
                                    for (var i = 0; i < this.state.google[a].length; i++) {
                                        options1.push({
                                            label: this.state.google[a][i].name,
                                            value: this.state.google[a][i].next_level.$oid,
                                        });
                                    }

                                    // console.log(a)
                                    // console.log(this.state.google[a][0])
                                    tempVal[a] = this.state.google[a][0].next_level;
                                    // console.log(tempVal[a].$oid)
                                    return (
                                        <Select
                                            key={i}
                                            value={tempVal[a].$oid}
                                            options={options1}
                                            onChange={(e) => {
                                                this.handleChange(e, "google");
                                                tempVal[a].$oid = e;
                                            }}
                                        />
                                    );
                                }
                            })}
                        </Card>
                    </FlexLayout>
                    <Button
                        onClick={() => {
                            this.onSubmit();
                        }}
                    >
                        SUBMIT
          </Button>

                    <span
                        onKeyPress={(a) => {
                            if (a.key === "Enter") {
                                if (this.state.searchGoogle.length > 3) {
                                    this.searchCatagory(this.state.searchGoogle);
                                    // console.log(this.state.previousOther);
                                } else {
                                    alert("please enter more appropriate value");
                                }
                            }
                        }}
                    >
                        <TextField
                            value={this.state.searchGoogle}
                            onChange={(a) => this.setState({ searchGoogle: a })}
                            placeHolder="Search Your Catagory Here"
                        />
                    </span>
                    {this.state.searchGoogleData && this.state.previousOther && (
                        <DataTable
                            lastKey={this.state.lastKeyOther}
                            previous={this.state.previousOther}
                            dataGoogle={this.state.searchGoogleData}
                        />
                    )}
                </BodyLayout>
            </Card>
        );
    }
}
