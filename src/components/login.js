import React from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props){
    super(props)

    this.onsubmit = this.onsubmit.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
    this.showMenu = this.showMenu.bind(this)

    this.state = {
      email: '',
      password:'',
      display:''
    };
}

  onChangeEmail(e){
    this.setState({
      email: e.target.value
    })
  }
  onChangePassword(e){
    this.setState({
      password: e.target.value
    })
  }

  hideMenu(){
    var navlinks = document.getElementById("NavLinks")

    navlinks.style.right= "-200px"

  }
  showMenu(){
    var navlinks = document.getElementById("NavLinks")

    navlinks.style.right= "0px"

  }

  onsubmit(e){
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password:this.state.password,
    }
    axios.post('http://localhost:3000/login', userData)
      .then(res =>{
        if (res.data.message === "Login successful") {

          window.location = '/dashboard'
          localStorage.setItem('token', res.data.data.token);
        }else {
          this.setState({
            display: res.data.message
          })
        }

      })
      .catch((error) => {
        console.log(error);
        this.setState({
          display: "bad request"
        }) //Logs a string: Error: Request failed with status code 404
      });

    //window.location = '/dashboard'
  }

  render() {
    return (
      <body>
      <div className = "navbar2">
        <h3 className = "header_h1"> lottery </h3>

           <ul className = "header_list2" id="NavLinks">
           <i className="fa fa-times" onClick={this.hideMenu}></i>
              <li className = "header_listitem2">
                <NavLink to="/" activeClassName="is-active" exact={true} className = "header_listitem2">home page</NavLink>
              </li>
              <li className = "header_listitem2">
                <NavLink to="/create" activeClassName="is-active"className = "header_listitem2">  create</NavLink>
              </li>
              <li className = "header_listitem2">
                <NavLink to="/terms" activeClassName="is-active" className = "header_listitem2">terms</NavLink>
              </li>
           </ul>
           <i className="fa fa-bars" onClick={this.showMenu} id="fa-bars"></i>
      </div>
      <div className="signup-box">
      <h1>login</h1>
      <h4>hint: the more tickets you buy the greater your odds of winning</h4>
        <form onSubmit={this.onsubmit} className="add-option">
        <label>email</label>
          <input
            type="text"
             name="email"
             className="add-option-input"
             placeholder="email"
             onChange={this.onChangeEmail}
          />
          <label>password</label>
          <input
            type="text"
             name="option"
             className="add-option-input"
             placeholder="password"
             onChange={this.onChangePassword}
          />

          <button className="button">login</button>

          <p> get a lone from the bank and put it here, you will win dont worry<NavLink to="/terms">terms and conditions</NavLink> </p>
        </form>
        <h4>{this.state.display}</h4>
      </div>
      <p className="loginP">don't have an account??<NavLink to="/create">create one here</NavLink></p>
      </body>
    );
  }
}
