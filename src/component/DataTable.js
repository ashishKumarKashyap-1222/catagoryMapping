import { Button, Card, Table } from '@cedcommerce/ounce-ui'
import React, { Component } from 'react'
import update from './function'


export default class DataTable extends Component {
    constructor(props) {
        super(props)
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
        let id = ''
        source.forEach(item => {
            if (item.next_level["$oid"] === this.props.lastKey) {
                path = item.full_path
                id = item.marketplace_id


            } else if (item.next_level === this.props.lastKey) {
                path = item.full_path
                id = item.marketplace_id





            }
        })
        let row = []
        let columns = this.state.columns
        this.state.dataGoogle.forEach(data => {
            let temp = {}
            Object.keys(columns).map(key => {
                switch (key) {
                    case ('Source'):
                        temp['Source'] = path
                    case ('target'):
                        temp['target'] = data.full_path
                    case ('action'):
                        temp['action'] = <Button onClick={() => this.submit(data, id)}>Select</Button>
                }
            })
            row.push(temp)
        })
        return (< Table
            columns={this.state.columns}
            rows={row}
        />)
    }


    submit(data, full_Path) {
        let val = { ...data }
        let mapping = {}
        mapping[this.props.marketPlace] = full_Path
        val['mapping'] = mapping
        delete val['custom_category_path']
        delete val['parent_id']
        delete val['is_child']
        delete val['_id']
        console.log(val)
        // update([val])
        // setTimeout(() => { window.location.reload(true) }, 700)

    }

    render() {

        return (
            <Card cardType="selego">
                {this.props.lastKey && this.datatable()}
                {this.datatable()}
            </Card>
        )

    }
}
