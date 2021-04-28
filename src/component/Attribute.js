// import React, { Component } from 'react'

// export default class Attribute extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             Id: [],
//             data: []
//         }
//     }


//     async componentDidMount() {
//         let id = []



//         await fetch('https://raw.githubusercontent.com/ashishk455-CEDCOSS/category/main/categoriesCBT.json').then(res => res.json())
//             .then(data => {
//                 // console.log(data)
//                 console.log("object")
//                 Object.keys(data).map(key => {

//                     // console.log(key)
//                     id.push(key)

//                 })
//                 // console.log(JSON.stringify(id))

//                 // this.setState({
//                 //     Id: id
//                 // }
//                 // , () => { this.dataImport() }
//                 // )
//             }
//             )



//         await fetch('https://raw.githubusercontent.com/ashishk455-CEDCOSS/category/main/array.txt').then(res => res.json())
//             .then(data => {
//                 console.log(data)
//                 this.setState({
//                     data: data

//                 }
//                     , () => this.dataImport()
//                 )

//             })
//     }
//     dataImport() {
//         let ashish = {}
//         let counter = 0
//         console.log(this.state.data.length)
//         //8838
//         let temp = this.state.data.slice(8000, 8838)
//         temp.forEach(async (a) => {

//             await fetch(`http://192.168.4.96/ebay/home/public/mercadohome/product/attributes?shop_id=9&category_id=${a}`, {
//                 method: "get",
//                 headers: {
//                     Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjA0YjNhMDU2YmI3OTAzYTczYjFmODgzIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjQ3MTQ4MDAyLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJhdWQiOiIxMjcuMC4wLjEiLCJ0b2tlbl9pZCI6IjYwNGM0ODYyZDUwZmMyMDFmNzJkMTM4MiJ9.e1WDhAJPUjJaD1r0lfHSKbg7gutCYxr1O9ciprEpw5kSOqiBqKyZsvtABzGGienw3HbubqE1H1aGJR6fEqUntQQIkrVw38fX19nZ3bEH4nKlqbr3jl8UbbMPNo6mCrU4A7QwkDIbwL4Hj-pfQVtiQRzqb3k_WaPTa_-jJBTkIBMQFrGl4LdsLp9Iij-nJ5YWLftCjrLcyo0wNWSPk8nbjbko5gXW4f38o3Ws2JKgs8ZiPHPh0ZjYcHm8ZJsaNFzMB99gou5p9LNhgw0sFlbEOp0AGn60Qx-rAWXQQiMO2aEMBYF0B6H8fTmA79TTPnrdla3mGp9XSCJKpC8n2YEp9Q "
//                 }
//             }).then(data => data.json())
//                 .then(data1 => {
//                     console.log(counter)
//                     ashish[a] = data1
//                     counter++
//                 })
//             console.log(JSON.stringify(ashish))

//             // })


//             // console.log(this.state.Id.length)
//         }
//     render() {
//             return(
//             <div>

//             </div >
//         )
//     }
// }


import React, { Component } from 'react'

export default class Attribute extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: []

        }
    }





    componentDidMount() {

        fetch("https://raw.githubusercontent.com/ashishk455-CEDCOSS/category/main/categoriesCBT.json").then(res => res.json())
            .then(data => {
                // console.log(data)

                this.setState({
                    data: data
                },
                    () => {
                        this.fetchAttribute()
                    }
                )




            })
        // console.log(fullData)

    }







    fetchAttribute() {
        let temp = []
        fetch("https://raw.githubusercontent.com/ashishk455-CEDCOSS/attributes/main/mercardo_cbt.json").then(resp => resp.json())
            .then(data => {
                console.log(data)
                Object.keys(data).map((key) => {


                    // console.log(data[key])
                    data[key]['all'].forEach(item => {
                        if (data[key]['required'].includes(item)) {
                            temp.push({

                                // "name": "category name",
                                "code": key,
                                "marketplace": 'MercadoLibre',
                                "marketplace_attribute_id": item,
                                // "category_id": 1,
                                "type": "string",
                                // "value": {
                                //     "red": "REDIS BLUE",
                                //     "green": "green"
                                // },
                                "required": 1,
                                "sort_order": "1",
                                "mapping": {}
                            })
                        } else {
                            temp.push({
                                // "name": "category name",
                                "code": key,
                                "marketplace": 'MercadoLibre',
                                "marketplace_attribute_id": item,
                                // "category_id": 1,
                                "type": "string",
                                // "value": {
                                //     "red": "REDIS BLUE",
                                //     "green": "green"
                                // },
                                "required": 0,
                                "sort_order": "1",
                                "mapping": {}
                            })
                        }
                    })
                })

                // let list = []
                // console.log(temp)
                // temp.forEach(a => {
                //     // console.log(a)
                //     Object.keys(this.state.data).map((key) => {
                //         // console.log(this.state.data[key])
                //         // console.log(key)
                //         // console.log(a.code)
                //         if (key == a.code) {
                //             list.push({ ...a, name: this.state.data[key].name })
                //             //     // temp[a]["name"] = this.state.data[key].name
                //             //     temp[a] = {
                //             //         ...temp[a],
                //             //         name: this.state.data[key].name
                //             //     }
                //             // let some = { ...temp[a] }
                //             // some['name'] = this.state.data[key].name
                //             // temp[a] = some

                //         }
                //     })
                // })
                // console.log(temp)
                this.nameAdd(temp)

            })

    }
    async nameAdd(list) {

        let FinalData = []
        await fetch("https://raw.githubusercontent.com/ashishk455-CEDCOSS/attributes/main/allCategoriesashish.json").then(res => res.json())
            .then(data => {
                // console.log(data)
                // console.log(data.length)
                list.forEach(a => {
                    data.forEach(val => {
                        // console.log("data")


                        // console.log(val)
                        if (val.marketplace == "mercadolibre" && val.marketplace_id == a.code) {
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

