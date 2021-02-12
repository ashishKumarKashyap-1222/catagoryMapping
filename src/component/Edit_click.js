import React, { Component } from "react";

import {
    Badge,
    BodyLayout,
    Button,
    Card,
    FlexLayout,
    Select,
    TextField,
} from "@cedcommerce/ounce-ui";
import "@cedcommerce/ounce-ui/dist/index.css";
import DataTable from "./DataTable";
import EbayUs from "./EbayUs";
import Taxonomy from "./taxonomy";

export default class Edit_click extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            searchGoogle: "",
            searchOther: "",
            next_level: "60251c0257aced67df6a41f2",
            google: [],
            next_levelGoogle: "60251e3b6d0ee5056d5289e2",
            levelgoogle: {},
            next: {},
            lastKeyGoogle: "",
            lastKeyOther: "",
            previousGoogle: [],
            previousOther: [],
            value: {},
        };
    }

    async componentDidMount() {
        /**
         * this api fetch root catagory
         */
        await fetch(
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
                console.log(e.data[0].next_level);

                this.setState({
                    previousOther: a,
                    next_level: e.data[0].next_level,
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
                console.log(e);

                this.setState({
                    previousGoogle: a,
                    next_levelGoogle: e.data[0].next_level,

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
                console.log(a);
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
        let finalData = this.props.data
        console.log(this.state.data)
        let aOther = Object.keys(this.state.data)[
            Object.keys(this.state.data).length - 2
        ];
        let bOther = Object.keys(this.state.data)[
            Object.keys(this.state.data).length - 1
        ];
        console.log(aOther)
        console.log(bOther)
        // if (Object.keys(this.state.other).length > 1) {
        this.state.data[aOther].forEach((temp) => {
            if (temp.next_level["$oid"] == this.state.lastKeyOther) {
                mapping["Ebay"] = temp.full_path;
            } else if (temp.next_level == this.state.lastKeyOther) {
                mapping["Ebay"] = temp.full_path;
            }
            this.state.data[bOther].forEach((temp) => {
                if (temp.next_level["$oid"] == this.state.lastKeyOther) {
                    mapping["Ebay"] = temp.full_path;
                }
            });
        });

        finalData["mapping"] = mapping;

        console.log(finalData);
        // } else alert("plese select atleast one  catagory");
    }

    handleChange(e) {
        this.setState({ lastKeyOther: e });
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

                this.setState({
                    previousOther: this.state.data,

                    data: { ...this.state.data, ...a },
                });
            });
    }

    render() {
        return (
            <Card>
                <BodyLayout>
                    <FlexLayout childWidth="fullWidth">
                        <Card title="Selected Catagory">
                            <Badge size="large" type="Success">
                                {this.props.data.full_path}
                            </Badge>
                        </Card>
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
                            <span
                                onKeyPress={(a) => {
                                    if (a.key === "Enter") {
                                        if (this.state.searchGoogle.length > 3) {
                                            this.searchCatagory(this.state.searchGoogle);
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
                        </Card>
                    </FlexLayout>
                    <Button
                        onClick={() => {
                            this.onSubmit();
                        }}
                    >
                        SUBMIT
          </Button>
                    {this.state.previousOther && (
                        <DataTable
                            previous={this.state.previousOther}
                            dataGoogle={this.state.searchGoogleData}
                        />
                    )}
                </BodyLayout>
            </Card>
        );
    }
}
