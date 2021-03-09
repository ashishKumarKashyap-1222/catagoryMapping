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



// await fetch('https://raw.githubusercontent.com/ashishk455-CEDCOSS/category/main/categoriesCBT.json').then(res => res.json())
//     .then(data => {
//         console.log("object")
//         Object.keys(data).map(key => {

//             // console.log(key)
//             id.push(key)

//         })
//         console.log(JSON.stringify(id))

//         // this.setState({
//         //     Id: id
//         // }
//         // , () => { this.dataImport() }
//         // )
//     }
//     )



//         await fetch('https://raw.githubusercontent.com/ashishk455-CEDCOSS/category/main/array.txt').then(res => res.json())
//             .then(data => {
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
//         let temp = this.state.data.slice(7000, 8837)
//         temp.forEach(async (a) => {

//             await fetch(`http://192.168.0.222/ebay/home/public/mercadohome/product/attributes?shop_id=9&category_id=${a}`, {
//                 method: "get",
//                 headers: {
//                     Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0NjczMTEwNiwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTUxOTUxMDZ9.V3t-AMzRqqNrRZt2PJvqV-8MBGVZ5iIv6ynsnEpqfFObtHV-BUr8DOCXkBKBDV18b3TySybpKroqc6xgFLXslnrlcPvDQHrdGMy51i-ILGZEnBkbfN9SRApNHRSF5bhGpKVdUx5hZff1cWYghdQrwi-KmByWKFW5l4aHaF183-8AOaKOIrxy1Jc7ZG3gYLVUIUYuH9p-u9D8ebceiC2R16Xc80xRi0_UDz1zRM_RYtJLc5FpoVwvo7PTDr30S8ATf5tCjXrt94iQUlPHYtxF9bSCvyuKBwKm0amNpkvoMpESNNf2MUq0932RBR80Rg4ohWc6EnF6Wxu3iFYgFZnwOg "
//                 }
//             }).then(data => data.json())
//                 .then(data1 => {
//                     console.log(counter)
//                     ashish[a] = data1
//                     counter++
//                 })
//             console.log(JSON.stringify(ashish))

//         })

//         // console.log(this.state.Id.length)
//     }
//     render() {
//         return (
//             <div>

//             </div >
//         )
//     }
// }


import React, { Component } from 'react'

export default class Attribute extends Component {

    constructor(props) {
        console.log("ffytyfch")
        super(props)

        this.state = {

        }
    }





    componentDidMount() {
        this.fetchAttribute()
    }


    fetchAttribute() {
        fetch("https://raw.githubusercontent.com/ashishk455-CEDCOSS/category/main/total_attribute.json").then(resp => resp.json())
            .then(data => console.log(data))

    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

