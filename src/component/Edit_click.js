import React, { Component } from "react";

import {
    Badge,
    BodyLayout,
    Button,
    Card,
    FlexLayout,
    Select,
    Table,
    TextField,
    Toast,
} from "@cedcommerce/ounce-ui";
import "@cedcommerce/ounce-ui/dist/index.css";
import DataTable from "./DataTable";
import update from "./function";

export default class Edit_click extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            searchOther: "",
            next_level: "60251c0257aced67df6a41f2",
            lastKeyOther: "",
            previousOther: [],
            value: {},
            searchOtherData: [],
            flag: false,
            columns: {
                'Source': {
                    'title': 'Source'
                },
                'target': {
                    'title': 'target'
                },
                'action': {
                    'title': 'action'
                }
            },
        };
    }
    get = (url) => {
        this.setState({ loadingPage: true })
        return fetch(
            `http://192.168.4.96/ebay/home/public/connector/` + url,
            {
                method: "get",
                headers: {
                    Authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjA0YjNhMDU2YmI3OTAzYTczYjFmODgzIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjQ3MTQ4MDAyLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJhdWQiOiIxMjcuMC4wLjEiLCJ0b2tlbl9pZCI6IjYwNGM0ODYyZDUwZmMyMDFmNzJkMTM4MiJ9.e1WDhAJPUjJaD1r0lfHSKbg7gutCYxr1O9ciprEpw5kSOqiBqKyZsvtABzGGienw3HbubqE1H1aGJR6fEqUntQQIkrVw38fX19nZ3bEH4nKlqbr3jl8UbbMPNo6mCrU4A7QwkDIbwL4Hj-pfQVtiQRzqb3k_WaPTa_-jJBTkIBMQFrGl4LdsLp9Iij-nJ5YWLftCjrLcyo0wNWSPk8nbjbko5gXW4f38o3Ws2JKgs8ZiPHPh0ZjYcHm8ZJsaNFzMB99gou5p9LNhgw0sFlbEOp0AGn60Qx-rAWXQQiMO2aEMBYF0B6H8fTmA79TTPnrdla3mGp9XSCJKpC8n2YEp9Q",
                },
            }
        ).then((res) => {
            this.setState({ loadingPage: false })
            return res.json()
        })
    }

    async componentDidMount() {
        /**
         * this api fetch root category
         */
        this.get("profile/getRootCategory?marketplace=Ebay_US")
            .then((e) => {
                let a = {};
                e.data.forEach((item) => {
                    a[item.level] = e.data;
                });
                // console.log(e.data[0].next_level);

                this.setState({
                    previousOther: a,
                    next_level: e.data[0].next_level,
                    data: a,
                });
            });
    }
    options() {
        /**this function creates options for the select tag */
        if (this.state.data[0] != undefined) {
            let options1 = [];

            let a = this.state.data[0];
            for (let i = 0; i < a.length; i++) {
                options1.push({
                    label: a[i].custom_category_path,
                    value: a[i].next_level,
                });
            }
            return options1;
        }
    }
    searchcategory(e) {
        this.get("profile/searchCategory?filters[marketplace]=google&filters[name]=" + e)
            .then((data) => {
                this.setState({ searchOtherData: data.data }, () => console.log(this.state.searchOtherData));

            });
    }

    onSubmit() {
        let mapping = {};
        let finalData = this.props.data;
        console.log(this.state.data);
        let aOther = Object.keys(this.state.data)[
            Object.keys(this.state.data).length - 2
        ];
        let bOther = Object.keys(this.state.data)[
            Object.keys(this.state.data).length - 1
        ];
        if (Object.keys(this.state.data).length > 1) {
            this.state.data[aOther].forEach((temp) => {
                if (temp.next_level["$oid"] == this.state.lastKeyOther) {
                    mapping["Ebay_US"] = temp.next_level['$oid'];
                } else if (temp.next_level == this.state.lastKeyOther) {
                    mapping["Ebay_US"] = temp.next_level;
                }
                this.state.data[bOther].forEach((temp) => {
                    if (temp.next_level["$oid"] == this.state.lastKeyOther) {
                        mapping["Ebay_US"] = temp.next_level['$oid'];
                    }
                });
            });

            finalData["mapping"] = mapping;
            delete finalData["custom_category_path"];
            delete finalData["parent_id"];
            delete finalData["is_child"];
            delete finalData["next_level"];
            delete finalData["_id"];
            console.log(finalData)
            update([finalData]).then(data => this.setState({
                message: data,
                flag: true
            }))


        } else alert("plese select atleast one  category");
    }


    handleChange(e) {
        this.setState({ lastKeyOther: e });
        this.get("profile/getCatrgoryNextLevel?next_level=" + e)
            .then((data1) => {
                let a = {};
                data1.data.forEach((item) => {
                    a[item.level] = data1.data;
                });

                this.setState({
                    previousOther: this.state.data,

                    data: { ...this.state.data, ...a },
                });
            });
    }
    datatable() {
        let row = []
        let columns = this.state.columns
        this.state.searchOtherData.forEach(data => {
            let temp = {}
            Object.keys(columns).map(key => {
                switch (key) {
                    case ('Source'):
                        temp['Source'] = this.props.data.full_path
                    case ('target'):
                        temp['target'] = data.full_path

                    case ('action'):
                        temp['action'] = <Button onClick={() => this.submit(this.props.data, data.full_path)}>Select</Button>
                }
            })
            row.push(temp)

        })


        return (< Table
            columns={this.state.columns}
            rows={row}
        />)




    }
    submit(data, full_Path) {
        let val = { ...data }
        let mapping = {}
        mapping['Ebay_US'] = full_Path
        val['mapping'] = mapping
        delete val['custom_category_path']
        delete val['parent_id']
        delete val['is_child']
        delete val['_id']
        update([val])




    }

    render() {
        return (
            <Card>
                <BodyLayout>
                    <FlexLayout childWidth="fullWidth">
                        <Card title="Selected category">
                            <Badge size="large" type="none">
                                {this.props.data.full_path}
                            </Badge>
                        </Card>
                        <Card title="Marketplace category">
                            <Select
                                onChange={(e) => {
                                    this.handleChange(e, "other");
                                    this.setState({ next_level: e });
                                }}
                                options={this.options()}
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
                                        if (this.state.searchOther.length > 3) {
                                            this.searchcategory(this.state.searchOther);
                                        } else {
                                            alert("please enter more appropriate value");
                                        }
                                    }
                                }}
                            >
                                <TextField
                                    value={this.state.searchOther}
                                    onChange={(a) => this.setState({ searchOther: a })}
                                    placeHolder="Search Your category Here"
                                />
                            </span>
                            {this.state.flag && <Toast message={this.state.message} onDismiss={() => { this.setState({ flag: false }) }} />}
                        </Card>
                    </FlexLayout>
                    <Button
                        onClick={() => {
                            this.onSubmit();
                        }}
                    >
                        SUBMIT
          </Button>
                    {this.state.previousOther && this.datatable()}
                </BodyLayout>
            </Card>
        );
    }
}
