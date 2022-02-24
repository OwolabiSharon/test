import React from 'react';
import {NavLink} from 'react-router-dom';
import Header from './Header';


export default class Home extends React.Component {

  constructor(props){
    super(props)

    this.hideMenu = this.hideMenu.bind(this)
    this.showMenu = this.showMenu.bind(this)

}

    hideMenu(){
      var navlinks = document.getElementById("NavLinks")

      navlinks.style.right= "-200px"

    }
    showMenu(){
      var navlinks = document.getElementById("NavLinks")

      navlinks.style.right= "0px"

    }


  render() {
    return (
      <body>
          <section className = "banner">
            <div className = "navbar">
              <h3 className = "header_h1"> lottery </h3>

                 <ul className = "header_list" id="NavLinks">
                 <i className="fa fa-times" onClick={this.hideMenu}></i>
                    <li className = "header_listitem">
                      <NavLink to="/" activeClassName="is-active" exact={true} className = "header_listitem">home page</NavLink>
                    </li>
                    <li className = "header_listitem">
                      <NavLink to="/create" activeClassName="is-active"className = "header_listitem">  create</NavLink>
                    </li>
                    <li className = "header_listitem">
                      <NavLink to="/terms" activeClassName="is-active" className = "header_listitem">terms</NavLink>
                    </li>
                 </ul>
                 <i className="fa fa-bars" onClick={this.showMenu}></i>
            </div>

            <div className="content">
              <h1>LOSE ALL YOUR MONEY</h1>
              <p>random comedic text about me scamming a lot of people and taking a lionshare of their earnings</p>
              <div className="div">
              <button><NavLink to="/create" className = "NavLink_div">create account</NavLink></button>
                <button><NavLink to="/login" className = "NavLink_div">login</NavLink></button>
              </div>
            </div>
          </section>
      </body>
    );
  }
}
