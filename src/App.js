import React, { Component } from 'react'

import { BodyLayout, Button, Card, FlexLayout, Modal, Select, Table, TextField } from '@cedcommerce/ounce-ui'
import '@cedcommerce/ounce-ui/dist/index.css'
import Taxonomy from './component/taxonomy'
// import Temp from './component/temp'
// import EbayUs from './component/EbayUs'
import EbayUK from './component/Ebay_UK'
import DataTable from './component/DataTable'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      search: '',
      next_level: "60141717750bf43f31768482",
      google: [],
      next_levelGoogle: "601d2b5651957a78023d20e2",
      levelgoogle: {},
      previous: [],
      next: {},
      lastKeyGoogle: '',
      lastKeyOther: '',
      modal: false,
    }
  }
  searchCatagory(e) {
    fetch(`http://192.168.0.222/ebay/home/public/connector/profile/searchCategory?name=${e}`, {
      method: 'get',
      headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg"
      }
    }
    ).then(res => res.json())
      .then(data => this.setState({ searchGoogleData: data.data }))
  }
  componentDidMount() {
    /**
     * this api fetch root catagory
    */
    fetch("http://192.168.0.222/ebay/home/public/connector/profile/getRootCategory?marketplace=shopify", {
      method: 'get',
      headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg"
      }
    }).then(response => response.json())
      .then(e => {
        let a = {}
        e.data.forEach(item => {
          a[item.level] = e.data
        })

        this.setState({
          data: a
        })
      })
    fetch("http://192.168.0.222/ebay/home/public/connector/profile/getRootCategory?marketplace=google", {
      method: 'get',
      headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg"
      }
    }).then(response => response.json())
      .then(e => {
        let a = {}
        e.data.forEach(item => {
          a[item.level] = e.data
        })

        this.setState({
          google: a
        })
      })

  }
  options(marketplace) {        /**this function creates options for the select tag */
    if (this.state.google[0] != undefined) {
      let options1 = [];
      if (marketplace == 'google') {
        let a = this.state.google[0]
        for (let i = 0; i < a.length; i++) {
          options1.push({ label: a[i].custom_category_path, value: a[i].next_level })
        }
        return options1;

      } else {
        let a = this.state.data[0]
        for (let i = 0; i < a.length; i++) {
          options1.push({ label: a[i].custom_category_path, value: a[i].next_level })
        }
        return options1;
      }

    }

  }


  onSubmit() {
    let mapping = {}
    let finalData = {}
    let a = Object.keys(this.state.google)[Object.keys(this.state.google).length - 2]
    let b = Object.keys(this.state.google)[Object.keys(this.state.google).length - 1]
    let aOther = Object.keys(this.state.data)[Object.keys(this.state.data).length - 2]
    let bOther = Object.keys(this.state.data)[Object.keys(this.state.data).length - 1]
    this.state.google[a].forEach(temp => {
      if (temp.next_level["$oid"] == this.state.lastKeyGoogle) {
        mapping["marketplace_code"] = temp.full_path
        finalData = temp
      }
      this.state.google[b].forEach(temp => {
        if (temp.next_level["$oid"] == this.state.lastKeyGoogle) {
          mapping["marketplace_code"] = temp.full_path
          finalData = temp
        }
      })
    })
    this.state.data[aOther].forEach(temp => {
      if (temp.next_level["$oid"] == this.state.lastKeyOther) {
        console.log(temp.full_path)
      }
      this.state.data[bOther].forEach(temp => {
        if (temp.next_level["$oid"] == this.state.lastKeyOther) {
          console.log(temp.full_path)
        }
      })
    })
    finalData['mapping'] = mapping

    console.log(finalData)
  }

  handleChange(e, marketplace) {
    if (marketplace == 'google') {
      this.setState({ lastKeyGoogle: e })

    } else {
      this.setState({ lastKeyOther: e })

    }
    fetch(`http://192.168.0.222/ebay/home/public/connector/profile/getCatrgoryNextLevel?next_level=${e}`, {
      method: 'GET',
      headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg"
      }
    }).then(response => response.json())
      .then(data1 => {
        let a = {}
        data1.data.forEach(item => {
          a[item.level] = data1.data
        })
        if (marketplace === 'google') {
          this.setState({
            previous: this.state.google,
            google: { ...this.state.google, ...a }
          })
        } else {
          this.setState({
            data: { ...this.state.data, ...a }
          })
        }
      })
  }

  render() {
    return (
      <Card>
        {/* <EbayUs></EbayUs> */}
        {/* <EbayUK></EbayUK> */}
        <BodyLayout>
          <FlexLayout childWidth="fullWidth">
            <Card title="Google Catagory">
              <span onKeyPress={(a) => { if (a.key === 'Enter') { this.searchCatagory(this.state.search) } }}>
                <TextField value={this.state.search} onChange={(a) => this.setState({ search: a })} placeHolder="Search Your Catagory Here" />

              </span>

              <Select
                onChange={(e) => { this.handleChange(e, 'google'); this.setState({ next_levelGoogle: e }) }}
                options={this.options('google')}
                value={this.state.next_levelGoogle}

              />
              {Object.keys(this.state.google).map((a, i) => {
                var options1 = [];

                if (a != 0) {
                  for (var i = 0; i < this.state.google[a].length; i++) {
                    options1.push({ label: this.state.google[a][i].name, value: this.state.google[a][i].next_level.$oid })
                  }
                  return <Select key={i} value={options1[0].value} options={options1} onChange={(e) => { this.handleChange(e, 'google'); console.log(e) }} />
                }
              })}
            </Card>
            <Card title="Marketplace catagory">
              <TextField placeHolder="Search Your Catagory Here" />
              <Select
                onChange={(e) => { this.handleChange(e, 'other'); this.setState({ next_level: e }) }}
                options={this.options('other')}
                value={this.state.next_level}
              />
              {Object.keys(this.state.data).map((a, p) => {
                var options1 = [];
                if (a != 0) {
                  for (var i = 0; i < this.state.data[a].length; i++) {
                    options1.push({ label: this.state.data[a][i].name, value: this.state.data[a][i].next_level.$oid })
                  }
                  return <Select key={p} value={options1[0].value} options={options1} onChange={(e) => this.handleChange(e, 'other')} />
                }
              })}
            </Card>
          </FlexLayout>
          <Button onClick={() => { this.onSubmit() }}>SUBMIT</Button>
          {this.state.searchGoogleData && <DataTable data={this.state.searchGoogleData} />}
        </BodyLayout>

      </Card>

    )


  }
}