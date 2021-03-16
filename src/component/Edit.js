import { Badge, Button, Card, Modal, PageLoader, Table, TextField } from '@cedcommerce/ounce-ui'
import React, { Component } from 'react'
import Home from './Home'
import Edit_click from './Edit_click'
const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjA0YjNhMDU2YmI3OTAzYTczYjFmODgzIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjQ3MTQ4MDAyLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJhdWQiOiIxMjcuMC4wLjEiLCJ0b2tlbl9pZCI6IjYwNGM0ODYyZDUwZmMyMDFmNzJkMTM4MiJ9.e1WDhAJPUjJaD1r0lfHSKbg7gutCYxr1O9ciprEpw5kSOqiBqKyZsvtABzGGienw3HbubqE1H1aGJR6fEqUntQQIkrVw38fX19nZ3bEH4nKlqbr3jl8UbbMPNo6mCrU4A7QwkDIbwL4Hj-pfQVtiQRzqb3k_WaPTa_-jJBTkIBMQFrGl4LdsLp9Iij-nJ5YWLftCjrLcyo0wNWSPk8nbjbko5gXW4f38o3Ws2JKgs8ZiPHPh0ZjYcHm8ZJsaNFzMB99gou5p9LNhgw0sFlbEOp0AGn60Qx-rAWXQQiMO2aEMBYF0B6H8fTmA79TTPnrdla3mGp9XSCJKpC8n2YEp9Q"

export default class Edit extends Component {

    constructor(props) {
        // console.log(this.props.marketplace)
        super(props)

        this.state = {
            columns: {
                'Cedcommerce category': {
                    'alignment': 'left',
                    'title': 'Cedcommerce category'
                },
                'Mapped category': {
                    'title': 'Mapped category'
                },
                'action': {
                    'title': 'action'
                }
            },
            value: '',
            modal: false,
            loadingPage: true
        }
    }
    componentDidMount() {
        this.fetch()
    }
    fetch() {
        this.setState({ loadingPage: true })
        fetch(`http://192.168.0.222/ebay/home/public/connector/profile/searchCategory?filters[marketplace]=cedcommerce&filters[name]=${this.state.value}`, {
            method: 'get',
            headers: {
                Authorization: token
            }
        }).then(res => res.json())
            .then(e => {
                if (e.success) {
                    console.log(e)
                    let row = []
                    e.data.forEach(data => {
                        if (Object.keys(data).includes('mapping')) {
                            let temp = {}
                            Object.keys(this.state.columns).map(key => {
                                switch (key) {
                                    case ('Cedcommerce category'):
                                        temp['Cedcommerce category'] = data.full_path
                                    case ('Mapped category'):
                                        temp['Mapped category'] = data.mapping.Ebay != undefined ? data.mapping.Ebay : data.mapping.Ebay_US
                                    case ('action'):
                                        temp['action'] = <Button onClick={() => this.setState({ modal: true, data: data })}>Edit</Button>
                                }
                            })
                            row.push(temp)

                        }
                    })
                    this.setState({ rows: row, length: row.length, loadingPage: false })

                } else {
                    console.error(e)
                }

            })

    }

    render() {

        return (

            <Card>
                {this.state.loadingPage && <PageLoader />}
                <span onKeyPress={(e) => { if (e.key == 'Enter') { this.fetch() } }}>
                    <TextField placeHolder=' Type category You Want To Search ' onChange={(e) => { this.setState({ value: e }) }} value={this.state.value} />

                </span>

                {  this.state.rows && < Table
                    columns={this.state.columns}
                    rows={this.state.rows}
                />}
                <Modal
                    close={() => { this.setState({ modal: !this.state.modal }) }}
                    heading="Edit category"
                    open={this.state.modal}
                >
                    <Edit_click data={this.state.data}></Edit_click>
                </Modal>
            </Card>

        )
    }
}
