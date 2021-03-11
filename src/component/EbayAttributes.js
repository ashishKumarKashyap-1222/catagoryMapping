import React, { Component } from 'react'

export default class EbayAttributes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {}
        }
    }



    async componentDidMount() {
        let raw = []
        await fetch("https://raw.githubusercontent.com/ashishk455-CEDCOSS/attributes/main/attributes.json").then(res => res.json())
            .then(data => {
                // console.log(data)
                data.forEach(val => {
                    // console.log(val)

                    raw.push({

                        // "name": template.name,
                        "code": val.category_id,
                        "marketplace": 'cedcommerce',
                        "marketplace_attribute_id": val.name,
                        // "category_id": template["_id"]["$oid"],
                        "type": "string",
                        // "value": {
                        //     "red": "REDIS BLUE",
                        //     "green": "green"
                        // },
                        "required": val.required == false ? 0 : 1,
                        "sort_order": "1",
                        "mapping": {}
                    })
                })
            })
        this.setState({
            data: raw
        }, () => {
            this.nameAdd()
        })
        // console.log(raw)
    }
    async nameAdd() {

        let FinalData = []
        await fetch("https://raw.githubusercontent.com/ashishk455-CEDCOSS/attributes/main/allCategoriesashish.json").then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(this.state.data.length)
                console.log(data.length)

                this.state.data.forEach(a => {
                    data.forEach(val => {


                        // console.log(val)
                        if (val.marketplace == "cedcommerce" && val.marketplace_id == a.code) {
                            FinalData.push({ ...a, name: val.name, category_id: val['_id'].$oid })
                        }
                    })
                })

            })
        console.log(JSON.stringify(FinalData))
        console.log("FinalData", FinalData.length)
    }





    render() {
        return (
            <div>

            </div>
        )
    }
}
