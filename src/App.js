import React, { Component } from 'react'

import { BodyLayout, Button, Card, FlexLayout, Select, TextField } from '@cedcommerce/ounce-ui'
import '@cedcommerce/ounce-ui/dist/index.css'
import Taxonomy from './component/taxonomy'
import Temp from './component/temp'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      next_level: "601d2b5651957a78023d20e2",
      google: []

    }
  }
  componentDidMount() {
    /**
     * this api fetch root catagory
    */
    // fetch("http://192.168.0.222/ebay/home/public/connector/profile/getRootCategory?marketplace=shopify", {
    //   method: 'get',
    //   headers: {
    //     Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg"
    //   }
    // }).then(response => response.json())
    //   .then(e => {
    //     // console.log(e)
    //     let a = {}
    //     e.data.forEach(item => {
    //       // console.log(item.level)
    //       a[item.level] = e.data
    //     })

    //     this.setState({
    //       data: a
    //     })
    //   })
    fetch("http://192.168.0.222/ebay/home/public/connector/profile/getRootCategory?marketplace=google", {
      method: 'get',
      headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg"
      }
    }).then(response => response.json())
      .then(e => {
        let a = {}
        e.data.forEach(item => {
          // console.log(item)
          a[item.level] = e.data
        })

        this.setState({
          data: a
        })
      })

  }

  options() {
    let options1 = [];
    let a = this.state.data[0]
    // console.log(a)

    if (a != undefined) {
      for (let i = 0; i < a.length; i++) {
        options1.push({ label: a[i].custom_category_path, value: a[i].next_level })
      }
    }
    console.log(options1)
    return options1;
  }

  handleChange(e) {
    // console.log(e)
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
        this.setState({
          // data: a
          data: { ...this.state.data, ...a }

        })

      })
  }

  handleChange1(e) {
    fetch(`http://192.168.0.222/ebay/home/public/connector/profile/getCatrgoryNextLevel?next_level=${e}`, {
      method: 'GET',
      headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY0MzU0MDg4OCwiaXNzIjoiaHR0cHM6XC9cL2FwcHMuY2VkY29tbWVyY2UuY29tIiwiYXVkIjoiMTI3LjAuMC4xIiwidG9rZW5faWQiOjE2MTIwMDQ4ODh9.ZXKtyIxaT9eliUpKmluIenZnNI1A8dishJ5pLavOROhwJAfGKODuFN81-xVJBBO46HljmsHc1fmWp7wt6IKlBikKPigQrfOswZ245QlURYK20iJQvyrGJJ0tv2x8n0YSxEBfFiSfhtry21JyueInJ_SipiXfUjXdm0g21DA5gtv7Z9KkTP4eDqY4vX1fmn3BXZvs0efQuUWK5swVP2wEsxPJU9LoOshwkqP7qd7HgbF3WWxSySnUyTqgdwPdHeId2A-gk86rbZNt-Z9V4hakDBnTmTmjcJqIS2J45U2tj0Fpd9ik5i6b0FPA591DsYZalAZIuRuWEZCL01ta1Mi_Wg"
      }
    }).then(response => response.json())
      .then(data1 => {
        let a = {}
        // console.log(data1.data)
        // console.log(this.state.data)
        data1.data.forEach(item => {
          a[item.level] = data1.data
        })
        this.setState({
          data: { ...this.state.data, ...a }

        })
      })

  }


  render() {
    return (

      <Card>
        {/* <Taxonomy /> */}

        <BodyLayout>
          <FlexLayout childWidth="fullWidth">
            <Card title="Google Catagory">
              <span onKeyPress={(a) => { if (a.key === 'Enter') { this.search() } }}>
                <TextField value={this.state.search} onChange={(a) => this.setState({ search: a })} placeHolder="Search Your Catagory Here" />

              </span>

              <Select
                onChange={() => { console.log("object") }}
                options={[{ label: 'option1', value: '1' }, { label: 'option2', value: '2' }, { label: 'option3', value: '3' }]}
                value='1'

              />
            </Card>
            <Card title="Marketplace catagory">
              <TextField placeHolder="Search Your Catagory Here" />
              <Select
                onChange={(e) => { this.handleChange(e); this.setState({ next_level: e }) }}
                options={this.options()}
                value={this.state.next_level}
              />
              {Object.keys(this.state.data).map((a) => {
                var options1 = [];
                // let value = ''
                if (a != 0) {
                  // console.log(a)
                  // console.log(this.state.data[a])

                  for (var i = 0; i < this.state.data[a].length; i++) {
                    options1.push({ label: this.state.data[a][i].name, value: this.state.data[a][i].next_level.$oid })
                  }
                  return <Select value={options1[0].value} options={options1} onChange={(e) => this.handleChange1(e)} />
                }
              })}
            </Card>
          </FlexLayout>
          <Button>SUBMIT</Button>


        </BodyLayout>
        {/* <Temp /> */}

      </Card>

    )


  }
}