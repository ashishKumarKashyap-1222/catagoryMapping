
import React, { Component, useState, useEffect } from 'react'

export class EbayUs extends Component {
    constructor() {
        super()
        this.state = {
            abc: {},
        }
    }




    async componentDidMount() {
        var temp;
        var finalObj = {};
        var allKeyId = {}
        await fetch('https://raw.githubusercontent.com/erashish455/text/main/asdf.txt').then(response => response.text())
            .then(data => {
                let maxLength = 0
                let txt = data
                temp = txt.split("\n");
                // console.log(temp)
                temp.shift();
                temp.pop();
                // console.log(temp)
                let unique = {}

                temp.forEach((item) => {
                    let bpl = item.split(' - ')
                    let spl = item.split(' - ')[1].split('//')
                    // console.log(spl)
                    spl.forEach((a) => {
                        // console.log(item.trim())
                        unique[a.trim()] = ''
                    })
                    if (spl.length > maxLength) {
                        maxLength = spl.length
                    }
                    allKeyId[bpl[1]] = bpl[0].trim();

                    var nested = spl.reduceRight(function (obj, value) {
                        return { [value.trim()]: obj };
                    }, {});

                    finalObj = this.combine(finalObj, nested);
                });
                // console.log(unique)
                // console.log(finalObj)
                // console.log(Object.keys(unique).length)
                // console.log(maxLength)
                // console.log(allKeyId)
                this.recurtion(finalObj, allKeyId)

            })
    }


    combine = (prevObj, nextObj) => {
        var c = 0;
        for (var key in nextObj) {
            if (!(key in prevObj)) {
                prevObj[key] = nextObj[key];
            } else {
                this.combine(prevObj[key], nextObj[key]);
            }
        }
        return prevObj;
    }
    recurtion(object, allKeyId) {
        let nodes = [];
        let MajorObj = object
        Object.keys(MajorObj).forEach((eleModule, indexMod) => {
            let ObjContToAdd = [];
            let parent = '0'
            let child = ''
            Object.keys(allKeyId).map((i) => {

                if (i.trim() == eleModule) {
                    child = allKeyId[i]
                }
            })

            Object.keys(MajorObj[eleModule]).forEach((eleCont, indexCont) => {
                let ObjActToAdd = [];
                let parent = ''
                let child = ''
                Object.keys(allKeyId).map((i) => {
                    if (i.split('//').length > 1) {
                        if (i.split('//')[i.split('//').length - 1].trim() == eleCont) {
                            child = allKeyId[i]

                        }
                        if (i.split('//')[0].trim() === eleModule) {
                            parent = allKeyId[eleModule]
                        }
                    }
                })
                Object.keys(MajorObj[eleModule][eleCont]).forEach((eleAct, indexAct) => {
                    let ObjShowToAdd = []
                    let parent = ''
                    let child = ''
                    Object.keys(allKeyId).map((i) => {
                        if (i.split('//').length > 1) {
                            if (i.split('//')[i.split('//').length - 1].trim() == eleAct) {
                                child = allKeyId[i]
                            }
                            if (i.split('//')[i.split('//').length - 1].trim() == eleCont) {
                                parent = allKeyId[i]
                            }
                        }
                    })
                    Object.keys(MajorObj[eleModule][eleCont][eleAct]).forEach((eleShow, indexShow) => {
                        let ObjAnyToAdd = [];
                        let parent = ''
                        let child = ''
                        Object.keys(allKeyId).map((i) => {
                            if (i.split('//').length > 1) {
                                if (i.split('//')[i.split('//').length - 1].trim() == eleShow) {
                                    child = allKeyId[i]
                                }
                                if (i.split('//')[i.split('//').length - 1].trim() == eleAct) {
                                    parent = allKeyId[i]
                                }
                            }
                        })
                        Object.keys(MajorObj[eleModule][eleCont][eleAct][eleShow]).forEach((eleAny, indexAny) => {
                            let ObjAlfaToAdd = []
                            let parent = ''
                            let child = ''
                            Object.keys(allKeyId).map((i) => {
                                if (i.split('//').length > 1) {
                                    if (i.split('//')[i.split('//').length - 1].trim() == eleAny) {
                                        child = allKeyId[i]
                                    }
                                    if (i.split('//')[i.split('//').length - 1].trim() == eleShow) {
                                        parent = allKeyId[i]
                                    }
                                }
                            })
                            Object.keys(MajorObj[eleModule][eleCont][eleAct][eleShow][eleAny]).forEach((eleAlfa, indexAlfa) => {
                                let ObjBetaToAdd = [];
                                let parent = ''
                                let child = ''
                                Object.keys(allKeyId).map((i) => {
                                    if (i.split('//').length > 1) {
                                        if (i.split('//')[i.split('//').length - 1].trim() == eleAlfa) {
                                            child = allKeyId[i]
                                        }
                                        if (i.split('//')[i.split('//').length - 1].trim() == eleAny) {
                                            parent = allKeyId[i]
                                        }
                                    }
                                })
                                Object.keys(MajorObj[eleModule][eleCont][eleAct][eleShow][eleAny][eleAlfa]).forEach((eleBeta, indexBeta) => {
                                    let ObjectGamaToAdd = [];

                                    let parent = ''
                                    let child = ''
                                    Object.keys(allKeyId).map((i) => {
                                        if (i.split('//').length > 1) {
                                            if (i.split('//')[i.split('//').length - 1].trim() == eleBeta) {
                                                child = allKeyId[i]
                                            }
                                            if (i.split('//')[i.split('//').length - 1].trim() == eleAlfa) {
                                                parent = allKeyId[i]
                                            }
                                        }
                                    })
                                    Object.keys(MajorObj[eleModule][eleCont][eleAct][eleShow][eleAny][eleAlfa][eleBeta]).forEach((eleGama, indexGama) => {
                                        let parent = ''
                                        let child = ''
                                        Object.keys(allKeyId).map((i) => {
                                            if (i.split('//').length > 1) {
                                                if (i.split('//')[i.split('//').length - 1].trim() == eleGama) {
                                                    child = allKeyId[i]
                                                }
                                                if (i.split('>')[i.split('>').length - 1].trim() == eleBeta) {
                                                    parent = allKeyId[i]
                                                }
                                            }
                                        })
                                        ObjectGamaToAdd[indexGama] = {
                                            name: eleGama,
                                            marketplace_id: child,
                                            marketplace_parent_id: parent,
                                            marketplace: 'Ebay_US', full_path: `${eleModule}>${eleCont}>${eleAct}>${eleShow}>${eleAny}>${eleAlfa}>${eleBeta}>${eleGama}`, level: 7, children: []
                                        }

                                    })

                                    ObjBetaToAdd[indexBeta] = {
                                        name: eleBeta,
                                        marketplace_id: child,
                                        marketplace_parent_id: parent,
                                        marketplace: 'Ebay_US', full_path: `${eleModule}>${eleCont}>${eleAct}>${eleShow}>${eleAny}>${eleAlfa}>${eleBeta}`, level: 6, children: ObjectGamaToAdd
                                    }
                                })

                                ObjAlfaToAdd[indexAlfa] = {
                                    name: eleAlfa,
                                    marketplace_id: child,
                                    marketplace_parent_id: parent,
                                    marketplace: 'Ebay_US', full_path: `${eleModule}>${eleCont}>${eleAct}>${eleShow}>${eleAny}>${eleAlfa}`, children: ObjBetaToAdd, level: 5
                                }
                                // }
                            })
                            ObjAnyToAdd[indexAny] = {
                                name: eleAny,
                                marketplace_id: child,
                                marketplace_parent_id: parent,
                                marketplace: 'Ebay_US', full_path: `${eleModule}>${eleCont}>${eleAct}>${eleShow}>${eleAny}`, children: ObjAlfaToAdd, level: 4
                            }
                        })
                        ObjShowToAdd[indexShow] = {
                            name: eleShow,
                            marketplace_id: child,
                            marketplace_parent_id: parent,
                            marketplace: 'Ebay_US', full_path: `${eleModule}>${eleCont}>${eleAct}>${eleShow}`, children: ObjAnyToAdd, level: 3
                        }
                    })
                    ObjActToAdd[indexAct] = {
                        name: eleAct,
                        marketplace_id: child,
                        marketplace_parent_id: parent,
                        marketplace: 'Ebay_US', full_path: `${eleModule}>${eleCont}>${eleAct}`, children: ObjShowToAdd, level: 2
                    }
                })
                ObjContToAdd[indexCont] = {
                    name: eleCont,
                    marketplace_id: child,
                    marketplace_parent_id: parent,
                    marketplace: 'Ebay_US', full_path: `${eleModule}>${eleCont}`, children: ObjActToAdd, level: 1
                }
            })
            nodes[indexMod] = {
                name: eleModule,
                marketplace_id: child,
                marketplace_parent_id: parent,
                marketplace: 'Ebay_US', full_path: `${eleModule}`, children: ObjContToAdd, level: 0
            }
        })
        console.log(nodes)
        // console.log(JSON.stringify(nodes))





    }




    render() {

        return (
            <div>

            </div>
        )
    }
}

export default EbayUs


