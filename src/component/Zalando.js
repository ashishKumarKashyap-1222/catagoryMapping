// import React, { Component } from 'react'

// export default class Zalando extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             data: {}
//         }
//     }



//     componentDidMount() {
//         this.fetchData()
//     }

//     fetchData() {
//         fetch("http://192.168.4.96/ebay/home/public/connector/profile/searchCategory?filters[marketplace]=zalando", {
//             method: "GET",
//             headers: {
//                 authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjA0YjNhMDU2YmI3OTAzYTczYjFmODgzIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjQ3MTQ4MDAyLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJhdWQiOiIxMjcuMC4wLjEiLCJ0b2tlbl9pZCI6IjYwNGM0ODYyZDUwZmMyMDFmNzJkMTM4MiJ9.e1WDhAJPUjJaD1r0lfHSKbg7gutCYxr1O9ciprEpw5kSOqiBqKyZsvtABzGGienw3HbubqE1H1aGJR6fEqUntQQIkrVw38fX19nZ3bEH4nKlqbr3jl8UbbMPNo6mCrU4A7QwkDIbwL4Hj-pfQVtiQRzqb3k_WaPTa_-jJBTkIBMQFrGl4LdsLp9Iij-nJ5YWLftCjrLcyo0wNWSPk8nbjbko5gXW4f38o3Ws2JKgs8ZiPHPh0ZjYcHm8ZJsaNFzMB99gou5p9LNhgw0sFlbEOp0AGn60Qx-rAWXQQiMO2aEMBYF0B6H8fTmA79TTPnrdla3mGp9XSCJKpC8n2YEp9Q"
//             }
//         }).then(response => response.json())
//             .then(data => this.setState({
//                 data: data.data,
//             }, () => { this.attributes(); console.log(data.data) }))
//     }
//     attributes() {
//         let data = {}
//         fetch("https://raw.githubusercontent.com/ashishk455-CEDCOSS/attributes/main/ZalandoAttributes.json").then(res => res.json())
//             .then(data => {
//                 data.forEach(element => {
//                     console.log(element)

//                 });
//             })
//     }



//     render() {
//         return (
//             <div>

//             </div>
//         )
//     }
// }
