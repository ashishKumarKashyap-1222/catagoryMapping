import React, { Component } from 'react'

import { BodyLayout, Button, Card, FlexLayout, Modal, Select, Table, TextField } from '@cedcommerce/ounce-ui'
import '@cedcommerce/ounce-ui/dist/index.css'
import Taxonomy from './component/taxonomy'
// import Temp from './component/temp'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      next_level: "60141717750bf43f31768482",
      google: [],
      next_levelGoogle: "601d2b5651957a78023d20e2",
      levelgoogle: {},
      previous: [],
      next: {},
      modal: false,
    }
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
  options(marketplace) {
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
  serchkey(e) {
    let a = Object.keys(this.state.google)[Object.keys(this.state.google).length - 1]
    this.state.google[a].forEach(temp => {
      if (temp.next_level['$oid'] == e) {
        console.log(temp.full_path)
      }

    })

  }

  handleChange(e, marketplace) {
    // console.log(e)
    fetch(`http://192.168.0.222/ebay/home/public/connector/profile/getCatrgoryNextLevel?next_level=${e}`, {
      method: 'GET',
      headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg"
      }
    }).then(response => response.json())
      .then(data1 => {
        // console.log(data1.data)
        let a = {}
        data1.data.forEach(item => {
          a[item.level] = data1.data
        })
        if (marketplace === 'google') {

          this.setState({
            // data: a
            // next_levelGoogle:
            previous: this.state.google,
            google: { ...this.state.google, ...a }
          })
          this.serchkey(e)


        } else {
          this.setState({
            data: { ...this.state.data, ...a }
          })

        }

      })
  }
  // handleChange1(e, marketplace) {
  //   fetch(`http://192.168.0.222/ebay/home/public/connector/profile/getCatrgoryNextLevel?next_level=${e}`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg"
  //     }
  //   }).then(response => response.json())
  //     .then(data1 => {
  //       console.log(data1)
  //       let a = {}
  //       data1.data.forEach(item => {
  //         a[item.level] = data1.data
  //       })
  //       if (marketplace == 'google') {
  //         this.setState({
  //           google: { ...this.state.google, ...a },

  //         })
  //       } else {
  //         this.setState({
  //           data: { ...this.state.data, ...a }
  //         })
  //       }

  //     })

  // }

  render() {
    return (
      <Card>
        <BodyLayout>
          <FlexLayout childWidth="fullWidth">
            <Card title="Google Catagory">
              <span onKeyPress={(a) => { if (a.key === 'Enter') { this.search() } }}>
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
                  return <Select key={p} value={options1[0].value} options={options1} onChange={(e) => this.handleChange1(e, 'other')} />
                }
              })}
            </Card>
          </FlexLayout>
          <Button onClick={() => { console.log("clicked") }}>SUBMIT</Button>
        </BodyLayout>
        <Card cardType="selego">
          <Modal open={this.state.modal} heading="Search Catagory"
            close={() => { this.setState({ modal: !this.state.modal }) }}
            primaryAction={false}
            secondaryAction={false}
          >
            <Table
              columns={{
                address: {
                  alignment: 'left',
                  filter: false,
                  show: true,
                  title: 'address',
                  type: 'string',
                  width: '200'
                },
                email: {
                  alignment: 'left',
                  filter: false,
                  show: true,
                  title: 'email',
                  type: 'string',
                  width: '200'
                },
                name: {
                  alignment: 'left',
                  filter: false,
                  show: true,
                  title: 'user name',
                  type: 'string',
                  width: '200'
                },
                user: {
                  alignment: 'left',
                  filter: false,
                  show: true,
                  title: 'user ID',
                  type: 'string',
                  width: '200'
                }
              }}
              rows={[
                {
                  address: 'USA',
                  email: 'user@example.com',
                  name: 'Smith',
                  user: '102'
                },
                {
                  address: 'Canada',
                  email: 'user2@example.com',
                  name: 'Wilson',
                  user: '103'
                },
                {
                  address: 'Australia',
                  email: 'user3@example.com',
                  name: 'David',
                  user: '104'
                },
                {
                  address: 'India',
                  email: 'user4@example.com',
                  name: 'Shashish',
                  user: '105'
                }
              ]}
            /></Modal>
        </Card>
      </Card>

    )


  }
}