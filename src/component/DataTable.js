import { Button, Card, Table } from '@cedcommerce/ounce-ui'
import React, { Component } from 'react'


export default class DataTable extends Component {
    constructor(props) {
        super(props)
        // console.log(props.dataGoogle)
        console.log(props.previous)
        console.log(props.lastKey)

        this.state = {
            dataOther: props.dataOther,
            dataGoogle: props.dataGoogle,
            columns: {
                'Source': {
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
        let source = this.props.previous[Object.keys(this.props.previous).length - 1]



        let path = ''
        source.forEach(item => {
            if (item.next_level["$oid"] == this.props.lastKey) {
                path = item.full_path

            } else if (item.next_level == this.props.lastKey) {
                path = item.full_path

            }
        })
        // console.log(path)
        let row = []
        let columns = this.state.columns



        this.state.dataGoogle.forEach(data => {
            let temp = {}
            Object.keys(columns).map(key => {

                // console.log(data)
                switch (key) {
                    case ('Source'):
                        temp['Source'] = path
                    case ('target'):
                        temp['target'] = data.full_path

                    case ('action'):
                        temp['action'] = <Button onClick={() => this.submit(data, path)}>Select</Button>
                }
            })
            row.push(temp)

        })
        // console.log(row)

        return (< Table
            columns={this.state.columns}
            rows={row}
        />)

        // }



    }
    submit(data, full_Path) {
        let val = { ...data }
        let mapping = {}
        mapping['Ebay'] = full_Path
        val['mapping'] = mapping
        console.log(val)



    }

    render() {

        return (


            <Card cardType="selego">
                {/* {this.state.dataOther == true ?  this.datatable(): null} */}
                {this.props.lastKey && this.datatable()}
            </Card>



        )

    }
}
