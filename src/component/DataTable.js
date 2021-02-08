import { Button, Card, FlexLayout, Table } from '@cedcommerce/ounce-ui'
import React, { Component } from 'react'

export default class DataTable extends Component {
    constructor(props) {
        super(props)
        // console.log(props)

        this.state = {
            columns: {
                'Source': {
                    'alignment': 'left',
                    'title': 'Source'
                },
                'target': {
                    'title': 'target'
                },
                'action': {
                    'title': 'action'
                }
            },
            rows: []

        }
    }
    datatable() {
        let row = []
        let columns = this.state.columns

        this.props.data.forEach(data => {
            let temp = {}
            Object.keys(columns).map(key => {
                switch (key) {
                    case ('Source'):
                        temp['Source'] = data.full_path
                    case ('target'):
                        temp['target'] = ''
                    case ('action'):
                        temp['action'] = [<Button style={{ 'marginLeft': '10px' }}>Submit</Button>]
                }
                row.push(temp)
            })

        })
        console.log(row)
        return (< Table
            columns={this.state.columns}
            rows={row}
        />)


    }

    render() {

        return (


            <Card cardType="selego">
                {this.datatable()}
            </Card>



        )

    }
}
