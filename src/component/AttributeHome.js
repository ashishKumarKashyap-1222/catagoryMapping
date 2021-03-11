import React, { Component } from "react";
import {
    Card,
    FlexLayout,
    Select,
    TextField,
    BodyHeader,
    PageLoader,
    ChoiceList,
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
                { value: '4', label: "mercadolibre" }
            ],
        };
    }

    get = async (url) => {
        this.setState({ loadingPage: true });
        const res = await fetch(
            `http://192.168.0.222/ebay/home/public/connector/` + url,
            {
                method: "get",
                headers: {
                    Authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg",
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
                    this.fetch()
                }
            );
        } else {
            this.setState(
                {
                    marketPlace: this.state.options[0].value,
                },
                () => {
                    //  this.props.marketPlace(this.state.options[this.state.marketPlace - 1].label),
                    this.fetch()
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
                // previouscedcommerce: a,
                // next_levelcedcommerce: e.data[0].next_level,
                cedcommerce: a,
            });
        });
    }
    handleChange(e) {
        this.setState({ loadingPage: true });
        let delLevel = 0;

        this.setState({ lastKeycedcommerce: e });

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
                if (this.state.cedcommerce[0][i]["mapping"] != undefined) {
                    if (
                        this.state.cedcommerce[0][i]["mapping"]["cedcommerce"] != undefined
                    ) {
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
                            placeholder="Choose Ctegory"
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
                                if (
                                    this.state.cedcommerce[a][i]["mapping"]["cedcommerce"] !=
                                    undefined
                                ) {
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
            </Card>
        );
    };
    renderCedcommerceAttribute = () => {
        return (
            <FlexLayout
                childWidth="fullWidth"
                direction="none"
                halign="fill"
                spacing="loose"
            >
                <Select placeholder="Choose Attribute"></Select>
            </FlexLayout>
        );
    };
    renderMarketplaceAttribute = () => {
        let option = [
            { label: "as", value: "1" },
            { label: "asd", value: "2" },
            { label: "ads", value: "3" },
            { label: "ads", value: "4" },
            { label: "asv", value: "5" },
            { label: "ags", value: "6" },
            { label: "ass", value: "7" },
            { label: "ags", value: "8" },
            { label: "ajs", value: "9" },
        ]
        return (
            <>
                <BodyHeader title="Marketplace Attributes"></BodyHeader>
                <FlexLayout
                    childWidth="fullWidth"
                    direction="none"
                    halign="fill"
                    spacing="loose"
                >

                    <ChoiceList placeholder='choose' options={option} value={["1", "2"]} onChange={(a) => {
                        console.log(a)
                    }} />
                </FlexLayout>
            </>
        );
    };
    handleChange1(value) {
        localStorage.setItem("MarketPlaceAttribute", JSON.stringify(value));
        this.setState({ marketPlace: value }, () => this.fetch());
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
                        {this.renderCedcommerceCategory()}
                    </FlexLayout>
                    <FlexLayout>
                        {this.renderMarketplaceAttribute()}
                    </FlexLayout>

                </FlexLayout>
            </Card>
        );
    }
}
