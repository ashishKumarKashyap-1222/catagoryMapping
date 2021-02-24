import React, { Component } from "react";

import {
    Button,
    Card,
    FlexLayout,
    Select,
    TextField,
    BodyHeader,
    PageLoader,
    Modal,
    Toast,
    LRLayout,
} from "@cedcommerce/ounce-ui";
import "@cedcommerce/ounce-ui/dist/index.css";
import DataTable from "./DataTable";
import update from "./function";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            searchGoogle: "",
            loadingPage: true,
            searchOther: "",
            next_level: "",
            google: [],
            next_levelGoogle: "",
            levelgoogle: {},
            next: {},
            lastKeyGoogle: "",
            lastKeyOther: "",
            value: {},
            valueOther: {},
            childModal: false,
            addChildrenData: {},
            childrenName: "",
            childDataToast: false,
            childDataMessage: "",
            options: [
                { value: "1", label: "Ebay_US" },
                { value: "2", label: "Ebay_UK" },
                { value: "3", label: "Ebay_AU" },
            ],
            marketPlace: "",
        };
    }

    get = (url) => {
        this.setState({ loadingPage: true });
        return fetch(`http://192.168.0.222/ebay/home/public/connector/` + url, {
            method: "get",
            headers: {
                Authorization:
                    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg",
            },
        }).then((res) => {
            this.setState({ loadingPage: false });
            return res.json();
        });
    };

    searchcategory(e) {
        if (Object.keys(this.state.data).length > 1) {
            this.setState({ loadingPage: true });
            this.get(
                `profile/searchCategory?filters[marketplace]=cedcommerce&filters[name]=${e}`
            ).then((data) => {
                this.setState({ searchGoogleData: data.data, loadingPage: false });
            });
        } else {
            alert("please choose one marketplace category");
        }
    }
    componentDidMount() {
        /**
         * this api fetch root category
         */
        this.storeMarketplace();
    }
    storeMarketplace() {
        if (localStorage.getItem("MarketPlace") != undefined) {
            this.setState(
                {
                    marketPlace: JSON.parse(localStorage.getItem("MarketPlace")),
                },
                () => this.fetch()
            );
        } else {
            this.setState(
                {
                    marketPlace: this.state.options[0].value,
                },
                () => this.fetch()
            );
        }
    }
    async fetch() {
        await this.get(
            "profile/getRootCategory?marketplace=" +
            this.state.options[this.state.marketPlace - 1].label
        ).then((e) => {
            if (e.success) {
                let a = {};
                e.data.forEach((item) => {
                    a[item.level] = e.data;
                });

                this.setState({
                    previousOther: a,
                    next_level: e.data[0].next_level,
                    data: a,
                });
                this.setState({ loadingPage: false });
            } else {
                console.error(e);
            }
        });
        this.get("profile/getRootCategory?marketplace=cedcommerce").then((e) => {
            let a = {};
            e.data.forEach((item) => {
                a[item.level] = e.data;
            });

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
                for (let i = 0; i < a.length; i++) {
                    if (this.state.google[0][i]["mapping"] != undefined) {
                        // console.log(this.state.google[0][i]['mapping'].this.state.options[this.state.marketPlace - 1])
                        let a = this.state.options[this.state.marketPlace - 1].label;
                        if (this.state.google[0][i]["mapping"][a] != undefined) {
                            options1.push({
                                label: this.state.google[0][i].name + `(Mapped)`,
                                value: this.state.google[0][i].next_level,
                            });
                        } else {
                            options1.push({
                                label: this.state.google[0][i].name,
                                value: this.state.google[0][i].next_level,
                            });
                        }
                    } else {
                        options1.push({
                            label: this.state.google[0][i].name,
                            value: this.state.google[0][i].next_level,
                        });
                    }
                }
                return options1;
            } else {
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
                    finalData = temp;
                } else if (temp.next_level == this.state.lastKeyGoogle) {
                    finalData = temp;
                }
                this.state.google[b].forEach((temp) => {
                    if (temp.next_level["$oid"] == this.state.lastKeyGoogle) {
                        finalData = temp;
                    }
                });
            });

            if (Object.keys(this.state.data).length > 1) {
                this.state.data[aOther].forEach((temp) => {
                    if (temp.next_level["$oid"] == this.state.lastKeyOther) {
                        // console.log(this.state.lastKeyOther)
                        mapping[this.state.options[this.state.marketPlace - 1].label] =
                            temp.next_level["$oid"];
                    } else if (temp.next_level == this.state.lastKeyOther) {
                        mapping[this.state.options[this.state.marketPlace - 1].label] =
                            temp.next_level;
                    }
                    this.state.data[bOther].forEach((temp) => {
                        if (temp.next_level["$oid"] == this.state.lastKeyOther) {
                            mapping[this.state.options[this.state.marketPlace - 1].label] =
                                temp.next_level["$oid"];
                        }
                    });
                });
                finalData["mapping"] = mapping;
                delete finalData["custom_category_path"];
                delete finalData["parent_id"];
                delete finalData["is_child"];
                delete finalData["next_level"];
                finalData = [finalData];
                console.log(finalData);
                // update(finalData);
                this.setState(
                    {
                        data: [],
                        searchGoogle: "",
                        loadingPage: true,
                        searchOther: "",
                        next_level: "",
                        google: [],
                        next_levelGoogle: "",
                        levelgoogle: {},
                        next: {},
                        lastKeyGoogle: "",
                        lastKeyOther: "",
                        value: {},
                        valueOther: {},
                        selectedMarketplace: "Ebay_US",
                        childModal: false,
                        addChildrenData: {},
                        childrenName: "",
                        childDataToast: false,
                        childDataMessage: "",
                        options: [
                            { value: "1", label: "Ebay_US" },
                            { value: "2", label: "Ebay_UK" },
                            { value: "3", label: "Ebay_AU" },
                        ],
                        marketPlace: "",
                    },
                    () => {
                        this.storeMarketplace();
                    }
                );
            } else alert("plese select one category");
        } else alert("plese select atleast one cedcommerce category");
    }

    handleChange(e, marketplace) {
        this.setState({ loadingPage: true });
        let delLevel = 0;
        let delLevelOther = 0;
        if (marketplace == "google") {
            this.setState({ lastKeyGoogle: e });
        } else {
            this.setState({ lastKeyOther: e });
        }
        if (marketplace == "google") {
            Object.keys(this.state.google).map((a) => {
                this.state.google[a].forEach((m) => {
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

            let obj1 = Object.keys(this.state.google);
            let abc1 = { ...this.state.google };
            let xyz1 = { ...this.state.value };

            for (let i = delLevel + 1; i <= obj1.length; i++) {
                delete abc1[i];
                delete xyz1[i];
            }
            this.setState({
                google: abc1,
                value: xyz1,
            });
        } else {
            Object.keys(this.state.data).map((a) => {
                this.state.data[a].forEach((m) => {
                    if (m.next_level.$oid == undefined) {
                        if (e == m.next_level) {
                            delLevelOther = m.level;
                        }
                    } else {
                        if (e == m.next_level.$oid) {
                            delLevelOther = m.level;
                        }
                    }
                });
            });

            let obj2 = Object.keys(this.state.data);
            let abc2 = { ...this.state.data };
            let xyz2 = { ...this.state.valueOther };

            for (let i = delLevelOther + 1; i <= obj2.length; i++) {
                delete abc2[i];
                delete xyz2[i];
            }
            this.setState({
                data: abc2,
                valueOther: xyz2,
            });
        }

        this.get(`profile/getCatrgoryNextLevel?next_level=${e}`).then((data1) => {
            let a = {};
            data1.data.forEach((item) => {
                a[item.level] = [...data1.data];
            });
            if (marketplace === "google") {
                this.setState((preState) => {
                    preState.loadingPage = false;
                    preState.previousGoogle = this.state.google;
                    preState.google = { ...preState.previousGoogle, ...a };
                    return preState;
                });
            } else {
                this.setState({
                    previousOther: this.state.data,
                    loadingPage: false,

                    data: { ...this.state.data, ...a },
                });
            }
        });
    }

    renderMarketplaceCategory = () => {
        return (
            <Card>
                {this.state.marketPlace && (
                    <BodyHeader
                        title={
                            this.state.options[this.state.marketPlace - 1].label + ` Category`
                        }
                    />
                )}
                <div className="mt-10">
                    <Select
                        onChange={(e) => {
                            this.setState({ next_level: e }, () =>
                                this.handleChange(e, "other")
                            );
                        }}
                        placeholder="Choose"
                        options={this.options("other")}
                        value={this.state.next_level}
                    />
                </div>
                {Object.keys(this.state.data).map((a, p) => {
                    // console.log(this.state.data)
                    var options1 = [];
                    if (a != 0) {
                        for (var i = 0; i < this.state.data[a].length; i++) {
                            options1.push({
                                label: this.state.data[a][i].name,
                                value: this.state.data[a][i].next_level.$oid,
                            });
                        }

                        return (
                            <div className="mt-10">
                                <Select
                                    key={p}
                                    placeholder="Choose"
                                    value={this.state.valueOther[a]}
                                    options={options1}
                                    onChange={(e) => {
                                        let val = { ...this.state.valueOther };
                                        val[a] = e;
                                        this.setState(
                                            {
                                                valueOther: val,
                                            },
                                            () => this.handleChange(e, "other")
                                        );
                                    }}
                                />
                            </div>
                        );
                    }
                })}
            </Card>
        );
    };
    addChildren(data) {
        let temp = {
            marketplace_parent_id: this.state.google[0][0].marketplace_parent_id,
            marketplace: this.state.google[0][0].marketplace,
            level: this.state.google[0][0].level,
        };
        let objects = data ?? temp;

        this.setState({
            childModal: true,
            addChildrenData: objects,
        });
    }
    async updateChild(name) {
        if (name.length > 3) {
            let data = this.state.addChildrenData;
            data["name"] = name;
            console.log(data);
            await fetch(
                `http://192.168.0.222/ebay/home/public/connector/profile/createUpdateCategoryChild`,
                {
                    method: "post",
                    body: JSON.stringify([data]),
                    headers: {
                        "Content-Type": "application/json",
                        authorization:
                            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg",
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    this.setState(
                        { childDataMessage: data.message, childDataToast: true },
                        () => {
                            this.setState(
                                {
                                    data: [],
                                    searchGoogle: "",
                                    loadingPage: true,
                                    searchOther: "",
                                    next_level: "",
                                    google: [],
                                    next_levelGoogle: "",
                                    levelgoogle: {},
                                    next: {},
                                    lastKeyGoogle: "",
                                    lastKeyOther: "",
                                    value: {},
                                    valueOther: {},
                                    selectedMarketplace: "Ebay_US",
                                    childModal: false,
                                    addChildrenData: {},
                                    childrenName: "",
                                    childDataToast: false,
                                    childDataMessage: "",
                                },
                                () => {
                                    this.fetch();
                                }
                            );
                        }
                    );
                })
                .catch((err) => console.log(err));
        } else {
            alert("Enter More Appropriate name");
        }
    }
    renderAddChildModal = () => {
        return (
            <>
                <BodyHeader thickness="thin" title={"Name"} />
                <TextField
                    thickness="thin"
                    value={this.state.childrenName}
                    onChange={(a) => {
                        this.setState({ childrenName: a });
                    }}
                    placeholder="Enter Category Name"
                />
                <BodyHeader thickness="thin" title={"Parent Id"} />
                <TextField
                    thickness="thin"
                    title="Parent ID"
                    readOnly={true}
                    value={this.state.addChildrenData.marketplace_parent_id}
                />
                <BodyHeader thickness="thin" title={"Marketplace Name"} />
                <TextField
                    thickness="thin"
                    readOnly={true}
                    value={this.state.addChildrenData.marketplace}
                />
                <Button
                    onClick={() => {
                        this.updateChild(this.state.childrenName);
                    }}
                >
                    Add
        </Button>
            </>
        );
    };

    renderCedcommerceCategory = () => {
        return (
            <Card>
                <BodyHeader title={"CedCommerce category"} />
                <div className="mt-10">
                    <FlexLayout childWidth="fullWidth">
                        <Select
                            onChange={(e) => {
                                this.handleChange(e, "google");
                                this.setState({ next_levelGoogle: e });
                            }}
                            placeholder="Choose"
                            options={this.options("google")}
                            value={this.state.next_levelGoogle}
                        />
                    </FlexLayout>
                </div>

                {Object.keys(this.state.google).map((a, i) => {
                    var options1 = [];
                    let data = {};

                    if (a != 0) {
                        for (var i = 0; i < this.state.google[a].length; i++) {
                            if (this.state.google[a][i]["mapping"] != undefined) {
                                let val = this.state.options[this.state.marketPlace - 1].label;
                                if (this.state.google[a][i]["mapping"][val] != undefined) {
                                    options1.push({
                                        label: this.state.google[a][i].name + `(Mapped)`,
                                        value: this.state.google[a][i].next_level.$oid,
                                    });
                                } else {
                                    options1.push({
                                        label: this.state.google[a][i].name,
                                        value: this.state.google[a][i].next_level.$oid,
                                    });
                                }
                            } else {
                                options1.push({
                                    label: this.state.google[a][i].name,
                                    value: this.state.google[a][i].next_level.$oid,
                                });
                            }
                        }
                        data = {
                            marketplace_parent_id: this.state.google[a][0]
                                .marketplace_parent_id,
                            marketplace: this.state.google[a][0].marketplace,
                            level: this.state.google[a][0].level,
                        };

                        return (
                            <div className="mt-10">
                                <FlexLayout
                                    // childWidth='fullWidth'
                                    direction="none"
                                    halign="fill"
                                    spacing="loose"
                                // valign="none"
                                // wrap="wrap"
                                >
                                    <Select
                                        key={i}
                                        value={this.state.value[a]}
                                        placeholder="Choose"
                                        options={options1}
                                        onChange={(e) => {
                                            let val = { ...this.state.value };
                                            val[a] = e;
                                            this.setState(
                                                {
                                                    value: val,
                                                },
                                                () => this.handleChange(e, "google")
                                            );
                                        }}
                                    />

                                    <Button
                                        onClick={() => {
                                            this.addChildren(data);
                                        }}
                                    >
                                        Add Child
                  </Button>
                                </FlexLayout>
                            </div>
                        );
                    }
                })}
            </Card>
        );
    };

    renderSearch = () => {
        return (
            <>
                <span
                    onKeyPress={(a) => {
                        if (a.key === "Enter") {
                            if (this.state.searchGoogle.length > 3) {
                                this.searchcategory(this.state.searchGoogle);
                            } else {
                                alert("please enter more appropriate value");
                            }
                        }
                    }}
                >
                    <TextField
                        value={this.state.searchGoogle}
                        onChange={(a) => this.setState({ searchGoogle: a })}
                        placeHolder="Search Your category Here"
                    />
                </span>
                {this.state.searchGoogleData && this.state.previousOther && (
                    <DataTable
                        lastKey={this.state.lastKeyOther}
                        previous={this.state.previousOther}
                        dataGoogle={this.state.searchGoogleData}
                        fetch={this.fetch.bind(this)}
                    />
                )}
            </>
        );
    };
    handleChange1(value) {
        localStorage.setItem("MarketPlace", JSON.stringify(value));
        this.setState({ marketPlace: value }, () => this.fetch());
    }

    render() {
        // console.log(this.state.options[this.state.marketPlace - 1])
        return (
            <>
                {this.state.loadingPage && <PageLoader />}
                <div style={{ "margin-bottom": "50px" }}>
                    <FlexLayout
                        childWidth="none"
                        direction="none"
                        halign="end"
                        spacing="none"
                        valign="none"
                        wrap="none"
                    >
                        <div className="mt-20">
                            <Select
                                thickness="thin"
                                placeholder="select marketplace"
                                value={this.state.marketPlace}
                                options={this.state.options}
                                onChange={(a) => {
                                    this.handleChange1(a);
                                }}
                            />
                        </div>
                    </FlexLayout>
                </div>
                <Card
                    primaryAction={{
                        content: "Submit",
                        onClick: () => {
                            this.onSubmit();
                        },
                    }}
                >
                    <Modal
                        open={this.state.childModal}
                        close={() => {
                            this.setState({ childModal: false });
                        }}
                    >
                        {this.renderAddChildModal()}
                        {this.state.childDataToast && (
                            <Toast
                                timeout={500}
                                message={this.state.childDataMessage}
                                onDismiss={() => {
                                    this.setState({ childDataToast: false });
                                }}
                            ></Toast>
                        )}
                    </Modal>
                    <FlexLayout
                        childWidth="fullWidth"
                        direction="none"
                        halign="center"
                        spacing="loose"
                        valign="none"
                        wrap="none"
                    >
                        {this.renderMarketplaceCategory()}
                        {this.renderCedcommerceCategory()}
                    </FlexLayout>
                </Card>
                <Card>
                    <BodyHeader title={"Search"} />
                    {this.renderSearch()}
                </Card>
            </>
        );
    }
}
