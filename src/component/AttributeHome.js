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
            marketPlace: "",
            lastKeyCedcommerce: "",
            optionCedAttributes: [],
            attribute: "",
            MappedData: {},
            flag: false,
            options1: [],
            valueMulti: [],
            dataCedAttri: []
        };
    }

    get = async (url) => {
        this.setState({ loadingPage: true });
        const res = await fetch(
            `https://e4c557978080.ngrok.io/ebay/home/public/connector/` + url,
            {
                method: "get",
                headers: {
                    Authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjA0YjNhMDU2YmI3OTAzYTczYjFmODgzIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjQ3MTQ4MDAyLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJhdWQiOiIxMjcuMC4wLjEiLCJ0b2tlbl9pZCI6IjYwNGM0ODYyZDUwZmMyMDFmNzJkMTM4MiJ9.e1WDhAJPUjJaD1r0lfHSKbg7gutCYxr1O9ciprEpw5kSOqiBqKyZsvtABzGGienw3HbubqE1H1aGJR6fEqUntQQIkrVw38fX19nZ3bEH4nKlqbr3jl8UbbMPNo6mCrU4A7QwkDIbwL4Hj-pfQVtiQRzqb3k_WaPTa_-jJBTkIBMQFrGl4LdsLp9Iij-nJ5YWLftCjrLcyo0wNWSPk8nbjbko5gXW4f38o3Ws2JKgs8ZiPHPh0ZjYcHm8ZJsaNFzMB99gou5p9LNhgw0sFlbEOp0AGn60Qx-rAWXQQiMO2aEMBYF0B6H8fTmA79TTPnrdla3mGp9XSCJKpC8n2YEp9Q",
                },
            }
        );
        this.setState({ loadingPage: false });
        return res.json();
    };
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
                    // this.props.marketplace(this.state.options[this.state.marketPlace - 1].label),
                    this.fetch();
                }
            );
        } else {
            this.setState(
                {
                    marketPlace: this.state.options[0].value,
                },
                () => {
                    //  this.props.marketPlace(this.state.options[this.state.marketPlace - 1].label),
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

            this.setState({
                cedcommerce: a,
            });
        });
    }
    async attributeCheak() {
        let object = {};
        Object.keys(this.state.cedcommerce).map((a) => {
            this.state.cedcommerce[a].forEach((item) => {
                if (
                    item.level != 0 &&
                    item["next_level"].$oid == this.state.lastKeyCedcommerce
                ) {
                    object = item;
                } else if (item["next_level"] == this.state.lastKeyCedcommerce) {
                    object = item;
                }
            });
        });
        this.setState({
            MappedData: object,
        });

        let value = object["next_level"].$oid ?? object["next_level"];
        await fetch(
            `https://e4c557978080.ngrok.io/ebay/home/public/connector/profile/getCategoryAttribute?marketplace=cedcommerce&category_id=${value}`,
            {
                method: "GET",
                headers: {
                    authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjA0YjNhMDU2YmI3OTAzYTczYjFmODgzIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjQ3MTQ4MDAyLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJhdWQiOiIxMjcuMC4wLjEiLCJ0b2tlbl9pZCI6IjYwNGM0ODYyZDUwZmMyMDFmNzJkMTM4MiJ9.e1WDhAJPUjJaD1r0lfHSKbg7gutCYxr1O9ciprEpw5kSOqiBqKyZsvtABzGGienw3HbubqE1H1aGJR6fEqUntQQIkrVw38fX19nZ3bEH4nKlqbr3jl8UbbMPNo6mCrU4A7QwkDIbwL4Hj-pfQVtiQRzqb3k_WaPTa_-jJBTkIBMQFrGl4LdsLp9Iij-nJ5YWLftCjrLcyo0wNWSPk8nbjbko5gXW4f38o3Ws2JKgs8ZiPHPh0ZjYcHm8ZJsaNFzMB99gou5p9LNhgw0sFlbEOp0AGn60Qx-rAWXQQiMO2aEMBYF0B6H8fTmA79TTPnrdla3mGp9XSCJKpC8n2YEp9Q",
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.data.length > 0) {
                    this.setState({ dataCedAttri: data.data })
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
    options() {
        /**this function creates options for the select tag */
        if (this.state.cedcommerce[0] != undefined) {
            let options1 = [];

            let a = this.state.cedcommerce[0];
            for (let i = 0; i < a.length; i++) {
                // console.log(this.state.cedcommerce[0][i]["mapping"])
                if (this.state.cedcommerce[0][i]["mapping"] != undefined) {
                    if (this.state.cedcommerce[0][i]["mapping"]["google"] != undefined) {
                        options1.push({
                            label: this.state.cedcommerce[0][i].name + `(Mapped)`,
                            value: this.state.cedcommerce[0][i].next_level,
                        });
                    } else {
                        options1.push({
                            label: this.state.cedcommerce[0][i].name,
                            value: this.state.cedcommerce[0][i].next_level,
                        });
                    }
                } else {
                    options1.push({
                        label: this.state.cedcommerce[0][i].name,
                        value: this.state.cedcommerce[0][i].next_level,
                    });
                }
            }
            return options1;
        }
    }

    renderCedcommerceCategory = () => {
        let val = this.state.options[this.state.marketPlace - 1].label;
        return (
            <Card>
                <BodyHeader title={"CedCommerce category"} />

                <div className="mt-10">
                    <FlexLayout childWidth="fullWidth">
                        <Select
                            onChange={(e) => {
                                this.handleChange(e, "cedcommerce");
                                this.setState({ next_levelcedcommerce: e });
                            }}
                            searchEable
                            placeholder="Choose Category"
                            options={this.options("cedcommerce")}
                            value={this.state.next_levelcedcommerce}
                        />
                    </FlexLayout>
                </div>

                {Object.keys(this.state.cedcommerce).map((a, i) => {
                    var options1 = [];

                    if (a != 0) {
                        for (var i = 0; i < this.state.cedcommerce[a].length; i++) {
                            if (this.state.cedcommerce[a][i]["mapping"] != undefined) {
                                if (this.state.cedcommerce[a][i]["mapping"][val] != undefined) {
                                    options1.push({
                                        label: this.state.cedcommerce[a][i].name + `(Mapped)`,
                                        value: this.state.cedcommerce[a][i].next_level.$oid,
                                    });
                                } else {
                                    options1.push({
                                        label: this.state.cedcommerce[a][i].name,
                                        value: this.state.cedcommerce[a][i].next_level.$oid,
                                    });
                                }
                            } else {
                                options1.push({
                                    label: this.state.cedcommerce[a][i].name,
                                    value: this.state.cedcommerce[a][i].next_level.$oid,
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
                                            let val = { ...this.state.value };
                                            val[a] = e;
                                            this.setState(
                                                {
                                                    value: val,
                                                },
                                                () => this.handleChange(e, "cedcommerce")
                                            );
                                        }}
                                    />
                                </FlexLayout>
                            </div>
                        );
                    }
                })}
                <div className="mt-20">{this.state.optionCedAttributes.length > 0 && this.renderCedcommerceAttribute()}</div>
            </Card>
        );
    };

    renderCedcommerceAttribute = () => {
        return (
            <>
             <BodyHeader title={"Cedcommerce Attributes"} />
             <div className='mt-20'>
         

            <FlexLayout
                childWidth="fullWidth"
                direction="none"
                halign="fill"
                spacing="loose"
            >
              
                { (
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
                )}
            </FlexLayout>
                    
            </div>
            </>
        );
    };
    getAttributes() {
        let option = [];
        this.setState({ flag: true })
        if (this.state.MappedData["mapping"]) {
            if (this.state.MappedData["mapping"][this.state.options[this.state.marketPlace - 1].label]) {
                if (typeof (this.state.MappedData["mapping"][this.state.options[this.state.marketPlace - 1].label]) == "object") {

                    this.state.MappedData["mapping"][this.state.options[this.state.marketPlace - 1].label].forEach(async (item) => {
                        await fetch(`https://e4c557978080.ngrok.io/ebay/home/public/connector/profile/getCategoryAttribute?marketplace=${this.state.options[this.state.marketPlace - 1].label}&category_id=${item}`, {
                            method: "get",
                            headers: {
                                authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjA0YjNhMDU2YmI3OTAzYTczYjFmODgzIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjQ3MTQ4MDAyLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJhdWQiOiIxMjcuMC4wLjEiLCJ0b2tlbl9pZCI6IjYwNGM0ODYyZDUwZmMyMDFmNzJkMTM4MiJ9.e1WDhAJPUjJaD1r0lfHSKbg7gutCYxr1O9ciprEpw5kSOqiBqKyZsvtABzGGienw3HbubqE1H1aGJR6fEqUntQQIkrVw38fX19nZ3bEH4nKlqbr3jl8UbbMPNo6mCrU4A7QwkDIbwL4Hj-pfQVtiQRzqb3k_WaPTa_-jJBTkIBMQFrGl4LdsLp9Iij-nJ5YWLftCjrLcyo0wNWSPk8nbjbko5gXW4f38o3Ws2JKgs8ZiPHPh0ZjYcHm8ZJsaNFzMB99gou5p9LNhgw0sFlbEOp0AGn60Qx-rAWXQQiMO2aEMBYF0B6H8fTmA79TTPnrdla3mGp9XSCJKpC8n2YEp9Q",
                            }
                        }).then(res => res.json())
                            .then(data => {
                                // console.log(data.data)
                                data.data.forEach(value => {
                                    option.push({
                                        label: value.marketplace_attribute_id,
                                        value: value["_id"].$oid
                                    })
                                })
                                this.setState({
                                    options1: option
                                })
                            })
                    });

                }
            }
        }
    }

    renderMarketplaceAttribute = () => {

        if (this.state.flag && this.state.options1.length > 0) {
            let options = this.state.options1

            return (
                <>
                    <BodyHeader title="Marketplace Attributes"></BodyHeader>
                    <FlexLayout
                        childWidth="fullWidth"
                        direction="none"
                        halign="fill"
                        spacing="loose"
                    >
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
                    </FlexLayout>
                </>
            );


        }




    };
    handleChange1(value) {
        localStorage.setItem("MarketPlaceAttribute", JSON.stringify(value));
        this.setState({ marketPlace: value }, () => this.fetch());
    }
    onSubmit() {
        let object = {}
        let value = this.state.options[this.state.marketPlace - 1].label
        // console.log("object")
        // console.log(this.state.valueMulti)
        // console.log(this.state.attribute)
        // console.log(this.state.dataCedAttri)
        this.state.dataCedAttri.forEach(item => {
            if (item["_id"].$oid == this.state.attribute) {
                object = item
            }
        })
        let mapping = {}
        mapping[value] = this.state.valueMulti
        object["mapping"] = mapping
        console.log(object)





    }
    render() {
        return (
            <Card
                primaryAction={{
                    content: "Submit",
                    onClick: () => {
                        this.onSubmit();
                    },
                }}
            >
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
                {this.state.loadingPage && <PageLoader />}
                <FlexLayout halign="fill" spacing="loose">
                    <FlexLayout direction="vertical">
                        {this.state.marketPlace && this.renderCedcommerceCategory()}
                    </FlexLayout>
                    <FlexLayout>
                        {this.state.flag &&
                            this.renderMarketplaceAttribute()}
                    </FlexLayout>
                </FlexLayout>
            </Card>
        );
    }
}
