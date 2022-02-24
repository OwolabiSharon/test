import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

export default class Topup extends React.Component {
  constructor(props){
    super(props)

    this.onsubmit = this.onsubmit .bind(this)
    this.onChangeAmount = this.onChangeAmount.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
    this.showMenu = this.showMenu.bind(this)

    this.state = {
      amount: '',
    };
}

  onChangeAmount(e){
    this.setState({
      amount: e.target.value
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
    const data = {
      amount: this.state.amount,
    }

    axios.post('http://localhost:3000/topUp', data, { headers: { Authorization : 'Bearer ' + localStorage.getItem('token')}})
    .then(res =>{

      if (res.data.data.message === "top up successful") {
        window.location = '/dashboard'
      }else {
        this.setState({
          display: res.data.data.message
        })
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        display: "bad request"
      }) //Logs a string: Error: Request failed with status code 404
    });

  }
  render() {
    return (
      <body>
      <div className = "navbar2">
        <h3 className = "header_h1"> lottery </h3>

           <ul className = "header_list2" id="NavLinks">
           <i className="fa fa-times" onClick={this.hideMenu}></i>
              <li className = "header_listitem">
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

          <h1>topUp lottery account</h1>
          <h4>dont put your card number and pin here oo, ill just theif your money</h4>

          <form onSubmit={this.onsubmit} >
            <label>bank Name</label>
            <input
              type="text"
               name="accountName"
               className="add-option-input"
               placeholder="bank Name"
            />
            <label>debit card number</label>
            <input
              type="text"
               name="email"
               className="add-option-input"
               placeholder="debit card number"
            />
            <label>expiry date</label>
            <input
              type="text"
               name="option"
               className="add-option-input"
               placeholder="expiry date"
            />
            <label>card pin</label>
            <input
              type="text"
               name="option"
               className="add-option-input"
               placeholder="card pin"
            />
            <label>amount</label>
            <input
              type="text"
               name="option"
               className="add-option-input"
               placeholder="amount"
               onChange={this.onChangeAmount}
            />
            <button className="button">top up</button>
          </form>

        </div>
        <h4>{this.state.display}</h4>
      </body>
    );
  }
}
