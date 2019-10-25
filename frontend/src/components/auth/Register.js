import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const cookie = cookies.get('csrftoken')

const headers = {
  'Content-Type': 'application/json',
  'X-CSRFToken': cookie
}

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    const cookie = cookies.getAll()
    this.setState({cookie: cookie.csrftoken})
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors })

    console.log(this.state.cookie)
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/api/v1/accounts/register/', this.state.formData, {headers: headers})
      .then(res => {
        toast.success(res.data.message)
        this.props.history.push('login/')
      })
      .catch(err => {
        this.setState({ errors: err.response.data })
      })

  }




  render() {
    if (!this.state) return 'loading'
    return (
      <section className="section full-height">
        <div className="container">
          <div className="columns">
            <div className="column">
            </div>
            <div className="column">
            </div>
            <div className="column is-one-third is-half-tablet">
            <h2 className="title has-text-centered is-4 has-text-light">Register</h2>
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label has-text-grey-light">Username</label>
                  <div className="control">
                    <input
                      className="input"
                      name="username"
                      placeholder="eg"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
                </div>
                <div className="field">
                  <label className="label has-text-grey-light">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      placeholder="eg"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
                </div>
                <div className="field">
                  <label className="label has-text-grey-light">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="password"
                      placeholder="eg: ••••••••"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
                </div>
                <div className="field">
                  <label className="label has-text-grey-light">Password Confirmation</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="password_confirm"
                      placeholder="eg: ••••••••"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.password_confirm && <small className="help is-danger">{this.state.errors.password_confirm}</small>}
                </div>
                <br />
                <div className="has-text-centered">
                  <button className="button is-link is-outlined">Submit</button>
                </div>
              </form>
            </div>
            <div className="column">
            </div>
            <div className="column">
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Register
