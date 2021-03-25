import React, { Component } from 'react'

export default class FacebookCode extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {}
        }
    }




    componentDidMount() {
        fetch("https://raw.githubusercontent.com/ashishk455-CEDCOSS/attributes/main/facebookdata.json").then(res => res.json())
            .then(data1 => {
                // console.log(data1)
                this.setState({
                    data: data1
                }, () => {
                    this.fetchData()
                })

            })
        // console.log("object")
    }

    async fetchData() {
        var attributes = []


        await fetch("https://raw.githubusercontent.com/ashishk455-CEDCOSS/attributes/main/facebook.json").then(res => res.json())
            .then(data => {
                this.state.data.forEach((item1) => {
                    // console.log(data)
                    Object.keys(data).map(item => {
                        // console.log(item1.name)
                        // console.log(item)
                        if (item == item1.name) {

                            Object.keys(data[item]).map(key => {

                                attributes.push({
                                    name: item1.name,
                                    code: item1.marketplace_id,
                                    category_id: item1['_id'].$oid,
                                    marketplace: "facebook",
                                    marketplace_attribute_id: key,
                                    type: data[item][key].type,
                                    value: data[item][key].value,
                                    required: data[item][key].required_level === "recommended" ? true : false,
                                    mapping: {},

                                })
                            })
                        } else {
                            console.log(item1.name)
                            // console.log(item)

                        }
                    })

                })
                // console.log(attributes)


            })


    }






    render() {
        return (
            <div>
                {/* {this.fetchData()} */}

            </div>
        )
    }
}

// import React, { Component } from 'react'

// export default class FacebookCode extends Component {

//     async fetchData() {
//         let cat = []
//         await fetch("https://raw.githubusercontent.com/ashishk455-CEDCOSS/attributes/main/Zalando.json").then(res => res.json())
//             .then(data => {
//                 // console.log(data)
//                 data['items'].forEach(item => {
//                     // console.log(item)
//                     Object.keys(item['tiers']).map(item1 => {
//                         // console.log(item['tiers'][item1])
//                         // console.log(item1)
//                         Object.keys(item['tiers'][item1]).map(a => {
//                             if (a == "mandatory_types") {
//                                 // console.log(item['tiers'][item1][a])
//                                 item['tiers'][item1][a].forEach(item3 => {
//                                     cat.push({
//                                         marketplace: 'zalando',
//                                         marketplace_attribute_id: item3,
//                                         type: "string",
//                                         required: 1,
//                                         sort_order: 1,
//                                         name: item.label,
//                                     })
//                                 })

//                             }
//                             else if (a === 'optional_types') {
//                                 item['tiers'][item1][a].forEach(item3 => {
//                                     cat.push({
//                                         marketplace: 'zalando',
//                                         marketplace_attribute_id: item3,
//                                         type: "string",
//                                         required: 0,
//                                         sort_order: 1,
//                                         name: item.label,
//                                     })


//                                 })

//                             }

//                         })

//                     })
//                 })
//             })
//         console.log(JSON.stringify(cat))
//     }






//     render() {

//         return (
//             <div>
//                 {this.fetchData()}

//             </div>
//         )
//     }
// }

