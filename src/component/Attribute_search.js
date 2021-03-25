import React, { Component } from "react";
import {
    Card,
    FlexLayout,
    Select,
    BodyHeader,
    PageLoader,
    ChoiceList,
    Button,
    TextField,
    Pagination,
    Table,
} from "@cedcommerce/ounce-ui";
const token =
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjA0YjNhMDU2YmI3OTAzYTczYjFmODgzIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjQ3MTQ4MDAyLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJhdWQiOiIxMjcuMC4wLjEiLCJ0b2tlbl9pZCI6IjYwNGM0ODYyZDUwZmMyMDFmNzJkMTM4MiJ9.e1WDhAJPUjJaD1r0lfHSKbg7gutCYxr1O9ciprEpw5kSOqiBqKyZsvtABzGGienw3HbubqE1H1aGJR6fEqUntQQIkrVw38fX19nZ3bEH4nKlqbr3jl8UbbMPNo6mCrU4A7QwkDIbwL4Hj-pfQVtiQRzqb3k_WaPTa_-jJBTkIBMQFrGl4LdsLp9Iij-nJ5YWLftCjrLcyo0wNWSPk8nbjbko5gXW4f38o3Ws2JKgs8ZiPHPh0ZjYcHm8ZJsaNFzMB99gou5p9LNhgw0sFlbEOp0AGn60Qx-rAWXQQiMO2aEMBYF0B6H8fTmA79TTPnrdla3mGp9XSCJKpC8n2YEp9Q";

export default class Attribute_search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            loadingPage: false,
            page: 1,
            searchData: [],
            datatableView: false,
            flag: false
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

    searchcategory(e) {
        if (e.length > 3) {

            this.get(
                `profile/searchCategory?filters[marketplace]=cedcommerce&filters[name]=${e}&limit=5&page=${this.state.page}`
            ).then((data) => {
                this.setState({ searchData: data.data, datatableView: true });
            });
        } else {
            alert("Please Enter More Appropriate Value");
        }
    }
    // dataTable() {
    //     if (this.state.flag) {

    //         console.log("object")
    //         let row = []

    //         this.state.searchData.forEach(async (item) => {
    //             console.log(item)
    //             await fetch(`http://192.168.0.222/ebay/home/public/connector/profile/getCategoryAttribute?marketplace=cedcommerce&category_id=${item["_id"].$oid}`, {
    //                 method: "get",
    //                 headers: {
    //                     authorization: token,
    //                 }
    //             })
    //                 .then(response => response.json())
    //                 .then(data => console.log(data))



    //         })
    //         return (
    //             <Table
    //                 columns={{
    //                     address: {
    //                         title: 'Category'
    //                     },
    //                     email: {
    //                         title: 'Attributes'
    //                     },
    //                     name: {
    //                         title: 'MarketPlace Attributes'
    //                     },
    //                     user: {
    //                         title: ''
    //                     }
    //                 }}
    //                 rows={[
    //                     {
    //                         address: 'USA',
    //                         email: 'user@example.com',
    //                         name: 'Smith',
    //                         user: <Button>Select</Button>
    //                     },
    //                     {
    //                         address: 'Canada',
    //                         email: 'user2@example.com',
    //                         name: 'Wilson',
    //                         user: '103'
    //                     },
    //                     {
    //                         address: 'Australia',
    //                         email: 'user3@example.com',
    //                         name: 'David',
    //                         user: '104'
    //                     },
    //                     {
    //                         address: 'India',
    //                         email: 'user4@example.com',
    //                         name: 'Shashish',
    //                         user: '105'
    //                     }
    //                 ]}
    //             />
    //         )
    //     }


    // }

    render() {
        return (
            <Card>
                <FlexLayout halign='end'>
                    <Pagination
                        currentPage={this.state.page}
                        totalPages={100}
                        simpleView={true}
                        onNext={() => {
                            if (this.state.value.length > 3) {

                                this.setState({ page: this.state.page + 1 }, () => {
                                    this.searchcategory(this.state.value);
                                });
                            }
                        }}
                        onPrevious={() => {
                            if (this.state.value.length > 3) {
                                if (this.state.page == 1) {
                                    alert("You are on First Page");
                                } else {
                                    this.setState({ page: this.state.page - 1 }, () => {
                                        this.searchcategory(this.state.value);
                                    });
                                }
                            }
                        }}
                    />
                </FlexLayout>
                {this.state.loadingPage && <PageLoader></PageLoader>}
                {/* <span
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            this.setState({ flag: true })
                            this.searchcategory(this.state.value);
                        }
                    }}
                >
                    <TextField
                        value={this.state.value}
                        onChange={(a) => {
                            this.setState({ flag: false, value: a });
                        }}
                    />
                </span> */}
                {/* {this.state.datatableView && this.dataTable()} */}


            </Card>
        );
    }
}
