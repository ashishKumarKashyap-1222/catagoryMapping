import { Button, Card, FlexLayout, Modal, Select, Table, TextField } from '@cedcommerce/ounce-ui'
import React, { Component } from 'react'

export default class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            columns: {
                'Cedcommerce Catagory': {
                    'alignment': 'left',
                    'title': 'Cedcommerce Catagory'
                },
                'Mapped Catagory': {
                    'title': 'Mapped Catagory'
                },
                'action': {
                    'title': 'action'
                }
            },
            value: '',
            modal: false
        }
    }
    fetch() {
        fetch(`http://192.168.0.222/ebay/home/public/connector/profile/searchCategory?filters[marketplace]=google&filters[name]=${this.state.value}`, {
            method: 'get',
            headers: {
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg"
            }
        }).then(res => res.json())
            .then(e => {
                let row = []
                console.log(e)
                e.data.forEach(data => {
                    let temp = {}
                    Object.keys(this.state.columns).map(key => {

                        // console.log(data)
                        switch (key) {
                            case ('Cedcommerce Catagory'):
                                temp['Cedcommerce Catagory'] = data.full_path
                            case ('Mapped Catagory'):
                                temp['Mapped Catagory'] = ''

                            case ('action'):

                                temp['action'] = <Button onClick={() => this.setState({ modal: true })}>Edit</Button>
                        }
                    })
                    row.push(temp)


                })
                this.setState({ rows: row })




            })
    }

    render() {
        return (
            <Card>
                <span onKeyPress={(e) => { if (e.key == 'Enter') { this.fetch() } }}>
                    <TextField placeHolder=' Type Catagory You Want To Search ' onChange={(e) => { this.setState({ value: e }) }} value={this.state.value} />

                </span>
                {  this.state.rows && < Table
                    columns={this.state.columns}
                    rows={this.state.rows}
                />}

                <Modal
                    close={() => { this.setState({ modal: !this.state.modal }) }}
                    heading="Modal"
                    open={this.state.modal}
                ><Card>
                        <FlexLayout>
                            <Select></Select>
                            <Select></Select>
                        </FlexLayout>
                    </Card>

                </Modal>


            </Card>

        )
    }
}
