
import React, { Component } from 'react'

export class Taxonomy extends Component {
    constructor() {
        super()
        this.state = {
            abc: {},
        }
    }




    async componentDidMount() {
        var txtArr;
        var finalObj = {};
        await fetch('https://raw.githubusercontent.com/erashish455/text/main/asdf.txt').then(response => response.text())
            .then(data => {
                let txt = data
                txtArr = txt.split("\n");
                txtArr.shift();
                txtArr.pop();
                txtArr.forEach(item => {
                    let spl = item.trim().split(">")
                    var nested = spl.reduceRight(function (obj, value) {
                        return { [value.trim()]: obj };
                    }, {});
                    finalObj = this.combine(finalObj, nested);
                });
                this.setState({
                    abc: finalObj
                })
            })
    }

    datamapping() {
        let modifies = {}
        var temp = this.state.abc
        Object.keys(temp).map(key => {
            console.log(temp[key])

        })
    }


    combine = (prevObj, nextObj) => {
        for (var key in nextObj) {
            if (!(key in prevObj)) {
                prevObj[key] = nextObj[key];
            } else {
                this.combine(prevObj[key], nextObj[key]);
            }
        }
        return prevObj;
    }





    render() {
        this.datamapping()
        return (
            <div>

            </div>
        )
    }
}

export default Taxonomy


