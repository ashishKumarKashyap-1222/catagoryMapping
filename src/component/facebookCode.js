// import React, { Component } from 'react'

// export default class FacebookCode extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             data: {}
//         }
//     }




//     componentDidMount() {
//         fetch("https://raw.githubusercontent.com/ashishk455-CEDCOSS/attributes/main/facebookdata.json").then(res => res.json())
//             .then(data1 => {
//                 // console.log(data1)
//                 this.setState({
//                     data: data1
//                 }, () => {
//                     this.fetchData()
//                 })

//             })
//         // console.log("object")
//     }

//     async fetchData() {
//         var attributes = []


//         await fetch("https://raw.githubusercontent.com/ashishk455-CEDCOSS/attributes/main/facebook.json").then(res => res.json())
//             .then(data => {
//                 this.state.data.forEach((item1) => {
//                     // console.log(data)
//                     Object.keys(data).map(item => {
//                         // console.log(item1.name)
//                         // console.log(item)
//                         if (item == item1.name) {

//                             Object.keys(data[item]).map(key => {

//                                 attributes.push({
//                                     name: item1.name,
//                                     code: item1.marketplace_id,
//                                     category_id: item1['_id'].$oid,
//                                     marketplace: "facebook",
//                                     marketplace_attribute_id: key,
//                                     type: data[item][key].type,
//                                     value: data[item][key].value,
//                                     required: data[item][key].required_level === "recommended" ? 1 : 0,
//                                     mapping: {},

//                                 })
//                             })
//                         } else {
//                             // console.log(item1.name)
//                             // console.log(item)

//                         }
//                     })

//                 })
//                 console.log(JSON.stringify(attributes))


//             })


//     }






//     render() {
//         return (
//             <div>
//                 {/* {this.fetchData()} */}

//             </div>
//         )
//     }
// }

import React, { Component } from 'react'

export default class FacebookCode extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {}
        }
    }
    componentDidMount() {
        fetch("https://raw.githubusercontent.com/ashishk455-CEDCOSS/attributes/main/zalandoAllData.json").then(res => res.json())
            .then(data => {
                // console.log(data)
                this.setState({
                    data: data
                }, () => this.fetchData())
            })
    }


    async fetchData() {
        let cat = []
        let attributes = []
        await this.state.data.forEach(async (item2) => {
            // console.log(item2)

            await fetch("https://raw.githubusercontent.com/ashishk455-CEDCOSS/attributes/main/Zalando.json").then(res => res.json())
                .then(data => {
                    // console.log(data)
                    data['items'].forEach(item => {
                        // console.log(item)
                        cat.push(
                            {
                                name: item.label,
                                marketplace_id: item.label.split(" ").join("_"),
                                marketplace_parent_id: "0",
                                marketplace: "zalando",
                                full_path: item.label,
                                children: [],
                                level: 0
                            },
                        )
                        Object.keys(item['tiers']).map(item1 => {
                            // console.log(item['tiers'][item1])
                            // console.log(item1)
                            Object.keys(item['tiers'][item1]).map(a => {
                                if (a == "mandatory_types") {
                                    // console.log(item['tiers'][item1][a])
                                    item['tiers'][item1][a].forEach(item3 => {
                                        attributes.push({
                                            marketplace: 'zalando',
                                            marketplace_attribute_id: item3,
                                            type: "string",
                                            required: 1,
                                            sort_order: 1,
                                            name: item.label,
                                            category_id: item2['_id'].$oid,
                                            code: item2.marketplace_id
                                        })
                                    })

                                }
                                else if (a === 'optional_types') {
                                    item['tiers'][item1][a].forEach(item3 => {
                                        attributes.push({
                                            marketplace: 'zalando',
                                            marketplace_attribute_id: item3,
                                            type: "string",
                                            required: 0,
                                            sort_order: 1,
                                            name: item.label,
                                            category_id: item2['_id'].$oid,
                                            code: item2.marketplace_id
                                        })


                                    })

                                }

                            })

                        })
                    })
                })
            console.log((JSON.stringify(attributes)))
        })

        // console.log(JSON.stringify(cat))
        // console.log((cat))
    }






    render() {

        return (
            <div>
                {/* {this.fetchData()} */}

            </div>
        )
    }
}

