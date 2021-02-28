import { Badge, Button, Card, Modal, PageLoader, Table, TextField } from '@cedcommerce/ounce-ui'
import React, { Component } from 'react'
import Home from './Home'
import Edit_click from './Edit_click'

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
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg"
            }
        }).then(res => res.json())
            .then(e => {
                if (e.success) {
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
                <span style={{ float: 'right' }}>
                    <Badge size="large"
                        type="Success"
                    >Total mapped catagory{this.state.length}</Badge>
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
