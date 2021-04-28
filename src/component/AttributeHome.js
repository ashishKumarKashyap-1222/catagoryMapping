import React, { Component } from "react";
import {
    Card,
    FlexLayout,
    Select,
    BodyHeader,
    PageLoader,
    ChoiceList,
    Button,
} from "@cedcommerce/ounce-ui";
// import Attribute_search from "./Attribute_search"
// import FacebookCode from "./facebookCode"
const token =
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjA0YjNhMDU2YmI3OTAzYTczYjFmODgzIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjQ3MTQ4MDAyLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJhdWQiOiIxMjcuMC4wLjEiLCJ0b2tlbl9pZCI6IjYwNGM0ODYyZDUwZmMyMDFmNzJkMTM4MiJ9.e1WDhAJPUjJaD1r0lfHSKbg7gutCYxr1O9ciprEpw5kSOqiBqKyZsvtABzGGienw3HbubqE1H1aGJR6fEqUntQQIkrVw38fX19nZ3bEH4nKlqbr3jl8UbbMPNo6mCrU4A7QwkDIbwL4Hj-pfQVtiQRzqb3k_WaPTa_-jJBTkIBMQFrGl4LdsLp9Iij-nJ5YWLftCjrLcyo0wNWSPk8nbjbko5gXW4f38o3Ws2JKgs8ZiPHPh0ZjYcHm8ZJsaNFzMB99gou5p9LNhgw0sFlbEOp0AGn60Qx-rAWXQQiMO2aEMBYF0B6H8fTmA79TTPnrdla3mGp9XSCJKpC8n2YEp9Q";

export default class AttributeHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingPage: false,
            cedcommerce: {},
            options: [
                { value: "1", label: "google" },
                { value: "2", label: "Ebay_UK" },
                { value: "3", label: "Ebay_AU" },
                { value: "4", label: "mercadolibre" },
            ],
            value: {},
            lastKeyCedcommerce: "",
            optionCedAttributes: [],
            attribute: "",
            MappedData: {},
            flag: false,
            options1: [],
            valueMulti: [],
            dataCedAttri: [],
        };
    }

    get = async (url) => {

        this.setState({ loadingPage: true });
        const res = await fetch(
            `http://192.168.0.222/ebay/home/public/connector/` + url,
            {
                method: "get",
                headers: {
                    Authorization: token,
                },
            }
        );
        this.setState({ loadingPage: false });
        return res.json();
    };

    handleChange1(value) {
        localStorage.setItem("MarketPlaceAttribute", JSON.stringify(value));
        this.setState({ marketPlace: value }, () => this.fetch());
    }
    componentDidMount() {
        this.storeMarketplace();
    }
    storeMarketplace() {
        if (localStorage.getItem("MarketPlaceAttribute") != undefined) {
            this.setState(
                {
                    marketPlace: JSON.parse(localStorage.getItem("MarketPlaceAttribute")),
                },
                () => {
                    this.fetch();
                }
            );
        } else {
            this.setState(
                {
                    marketPlace: this.state.options[0].value,
                },
                () => {
                    this.fetch();
                }
            );
        }
    }

    async fetch() {
        this.get("profile/getRootCategory?marketplace=cedcommerce").then((e) => {
            let a = {};
            e.data.forEach((item) => {
                a[item.level] = e.data;
            });
            // console.log(a)

            this.setState({
                cedcommerce: a,
            });
        });
    }
    handleChange(e) {
        this.setState(
            {
                loadingPage: true,
                optionCedAttributes: [],
                lastKeyCedcommerce: e,
            },
            () => {
                this.attributeCheak();
            }
        );
        let delLevel = 0;

        Object.keys(this.state.cedcommerce).map((a) => {
            this.state.cedcommerce[a].forEach((m) => {
                if (m.next_level.$oid == undefined) {
                    if (e == m.next_level) {
                        delLevel = m.level;
                    }
                } else {
                    if (e == m.next_level.$oid) {
                        delLevel = m.level;
                    }
                }
            });
        });

        let obj1 = Object.keys(this.state.cedcommerce);
        let abc1 = { ...this.state.cedcommerce };
        let xyz1 = { ...this.state.value };

        for (let i = delLevel + 1; i <= obj1.length; i++) {
            delete abc1[i];
            delete xyz1[i];
        }
        this.setState({
            cedcommerce: abc1,
            value: xyz1,
        });

        this.get(`profile/getCatrgoryNextLevel?next_level=${e}`).then((data1) => {
            let a = {};
            data1.data.forEach((item) => {
                a[item.level] = [...data1.data];
            });
            this.setState((preState) => {
                preState.loadingPage = false;
                preState.previouscedcommerce = this.state.cedcommerce;
                preState.cedcommerce = { ...preState.previouscedcommerce, ...a };
                return preState;
            });
        });
    }

    renderCedcommerceCategory = () => {
        let val = this.state.options[this.state.marketPlace - 1].label;
        return (
            <Card>
                <BodyHeader title={"CedCommerce category"} />

                <div className="mt-10">
                    <FlexLayout childWidth="fullWidth"></FlexLayout>
                </div>

                {Object.keys(this.state.cedcommerce).map((a, i) => {
                    var options1 = [];
                    for (var i = 0; i < this.state.cedcommerce[a].length; i++) {
                        if (this.state.cedcommerce[a][i]["mapping"] != undefined) {
                            if (this.state.cedcommerce[a][i]["mapping"][val] != undefined) {
                                options1.push({
                                    label: this.state.cedcommerce[a][i].name + `(Mapped)`,
                                    // ?? = undefine and null
                                    // || = same as ??, but with 0 and ''
                                    value:
                                        this.state.cedcommerce[a][i]["next_level"].$oid ??
                                        this.state.cedcommerce[a][i].next_level,
                                });
                            } else {
                                options1.push({
                                    label: this.state.cedcommerce[a][i].name,
                                    value:
                                        this.state.cedcommerce[a][i]["next_level"].$oid ??
                                        this.state.cedcommerce[a][i].next_level,
                                });
                            }
                        } else {
                            options1.push({
                                label: this.state.cedcommerce[a][i].name,
                                value:
                                    this.state.cedcommerce[a][i]["next_level"].$oid ??
                                    this.state.cedcommerce[a][i].next_level,
                            });
                        }
                    }

                    return (
                        <div className="mt-10">
                            <FlexLayout
                                childWidth="fullWidth"
                                direction="none"
                                halign="fill"
                                spacing="loose"
                            >
                                <Select
                                    key={i}
                                    searchEable
                                    value={this.state.value[a]}
                                    placeholder="Choose Category"
                                    options={options1}
                                    onChange={(e) => {
                                        // console.log(e)
                                        let val = { ...this.state.value };
                                        val[a] = e;
                                        this.setState(
                                            {
                                                value: val,
                                            },
                                            () => this.handleChange(e)
                                        );
                                    }}
                                />
                            </FlexLayout>
                        </div>
                    );
                    // }
                })}
                <div className="mt-20">
                    {this.state.optionCedAttributes.length > 0 &&
                        this.renderCedcommerceAttribute()}
                </div>
            </Card>
        );
    };
    renderCedcommerceAttribute = () => {
        return (
            <>
                <BodyHeader title={"Cedcommerce Attributes"} />
                <div className="mt-20">
                    <FlexLayout
                        childWidth="fullWidth"
                        direction="none"
                        halign="fill"
                        spacing="loose"
                    >
                        {
                            <>
                                <Select
                                    placeholder="Choose Attribute"
                                    onChange={(val) => {
                                        this.setState({ attribute: val });
                                    }}
                                    value={this.state.attribute}
                                    options={this.state.optionCedAttributes}
                                />
                                <div className="mt-10">
                                    <Button primary onClick={() => this.getAttributes()}>
                                        Get Attributes
                  </Button>
                                </div>
                            </>
                        }
                    </FlexLayout>
                </div>
            </>
        );
    };
    getAttributes() {
        let option = [];
        this.setState({ flag: true });
        if (this.state.MappedData["mapping"]) {
            if (
                this.state.MappedData["mapping"][
                this.state.options[this.state.marketPlace - 1].label
                ]
            ) {
                if (
                    typeof this.state.MappedData["mapping"][
                    this.state.options[this.state.marketPlace - 1].label
                    ] == "object"
                ) {
                    this.state.MappedData["mapping"][
                        this.state.options[this.state.marketPlace - 1].label
                    ].forEach(async (item) => {
                        await fetch(
                            `http://192.168.0.222/ebay/home/public/connector/profile/getCategoryAttribute?marketplace=${this.state.options[this.state.marketPlace - 1].label
                            }&category_id=${item}`,
                            {
                                method: "get",
                                headers: {
                                    authorization: token,
                                },
                            }
                        )
                            .then((res) => res.json())
                            .then((data) => {
                                // console.log(data.data)
                                data.data.forEach((value) => {
                                    option.push({
                                        label: value.marketplace_attribute_id,
                                        value: value["_id"].$oid,
                                    });
                                });
                                this.setState({
                                    options1: option,
                                });
                            });
                    });
                }
            }
        }
    }
    async attributeCheak() {
        let object = {};
        Object.keys(this.state.cedcommerce).map((a) => {
            this.state.cedcommerce[a].forEach((item) => {
                // console.log(item)
                if (item["next_level"] == this.state.lastKeyCedcommerce) {
                    object = item;
                } else if (item["next_level"].$oid == this.state.lastKeyCedcommerce) {
                    object = item;
                }
            });
        });
        this.setState({
            MappedData: object,
        });
        let value = object["next_level"].$oid ?? object["next_level"];
        await fetch(
            `http://192.168.4.96/ebay/home/public/connector/profile/getCategoryAttribute?marketplace=cedcommerce&category_id=${value}`,
            {
                method: "GET",
                headers: {
                    authorization: token,
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.data.length > 0) {
                    this.setState({ dataCedAttri: data.data });
                    let optionCedAttributes = [];
                    data.data.forEach((item) => {
                        optionCedAttributes.push({
                            label: item["marketplace_attribute_id"],
                            value: item["_id"].$oid,
                        });
                    });
                    this.setState({
                        optionCedAttributes: optionCedAttributes,
                    });
                }
            });
    }

    onSubmit() {
        let object = {};
        let value = this.state.options[this.state.marketPlace - 1].label;
        this.state.dataCedAttri.forEach((item) => {
            if (item["_id"].$oid == this.state.attribute) {
                object = item;
            }
        });
        let mapping = {};
        mapping[value] = this.state.valueMulti;
        object["mapping"] = mapping;
        console.log(object);
    }

    renderMarketplaceAttribute = () => {
        if (this.state.flag && this.state.options1.length > 0) {
            let options = this.state.options1;

            return (
                <div className="mt-20">
                    <BodyHeader title="Marketplace Attributes"></BodyHeader>
                    <FlexLayout
                        childWidth="fullWidth"
                        direction="none"
                        halign="fill"
                        spacing="loose"
                    >
                        <div className="mt-40">
                            <ChoiceList
                                placeholder="choose"
                                options={options}
                                value={this.state.valueMulti}
                                onChange={(a) => {
                                    // console.log(a);
                                    if (this.state.valueMulti.includes(a)) {
                                        let temp = this.state.valueMulti;
                                        let index = temp.indexOf(a);
                                        temp.splice(index, 1);
                                        this.setState({
                                            valueMulti: temp,
                                        });
                                    } else {
                                        let temp = this.state.valueMulti;
                                        temp.push(a);
                                        this.setState({
                                            valueMulti: temp,
                                        });
                                    }
                                }}
                            />
                        </div>
                    </FlexLayout>
                </div>
            );
        }
    };

    render() {
        return (
            <>
                <FlexLayout halign="end">
                    <Select
                        thickness="thin"
                        placeholder="select marketplace"
                        value={this.state.marketPlace}
                        options={this.state.options}
                        onChange={(a) => {
                            this.handleChange1(a);
                        }}
                    />
                </FlexLayout>
                <Card
                    primaryAction={{
                        content: "Submit",
                        onClick: () => {
                            this.onSubmit();
                        },
                    }}
                >
                    {this.state.loadingPage && <PageLoader></PageLoader>}

                    <FlexLayout halign="fill">
                        {this.state.marketPlace && this.renderCedcommerceCategory()}
                        {this.state.flag && this.renderMarketplaceAttribute()}
                    </FlexLayout>

                </Card>
                {/* <Attribute_search></Attribute_search> */}
                {/* <FacebookCode></FacebookCode> */}
            </>
        );
    }
}
