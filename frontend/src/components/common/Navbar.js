import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'



class Navbar extends React.Component {

  constructor() {
    super()
    this.state = {
      navbarOpen: false
    }
    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  logout() {
    Auth.removeToken()
    this.props.history.push('/')
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen})
  }

  render() {
    return (
      <nav className="navbar is-black" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand ">
            <a
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div
            className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}
          >
            <div className="navbar-start">

              <Link to="/" className="navbar-brand">
                <div className="navbar-item title">
                Циничный Редактор
                </div>
              </Link>
              
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {!Auth.isAuthenticated() &&
                    <Link to="/register" className="button is-light">
                      <strong>Регистрация</strong>
                    </Link>
                  }
                  {!Auth.isAuthenticated() &&
                    <Link  to="/login" className="button is-light">
                      Войти
                    </Link>
                  }
                  {Auth.isAuthenticated() &&
                    <Link to={`/users/${Auth.getCurrentUserId()}`} className="button is-light">
                      My Profile
                    </Link>
                  }
                  {Auth.isAuthenticated() &&
                    <Link
                      to="/"
                      className="button is-dark"
                      onClick={this.logout}
                    >
                      Выйти
                    </Link>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
