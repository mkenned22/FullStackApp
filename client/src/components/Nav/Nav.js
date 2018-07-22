import React from "react";

const navStyle = {
	"background-color":"transparent",
	"border-color":"transparent"
}
const navbarbrandStyle = {
  "background-color":"transparent",
  "margin-top": "-12px"
}
const menubuttonStyle = {
  "background-color":"transparent",
  "border-color":"transparent",
  "background-image":"none",
	"box-shadow":"none"	
}

const logoStyle = {
  "width":"45px",
  "height":"45px"
}

const logofontStyle = {
  "color":"white",
  "text-transform": "none"
}

const dropdowncontainerStyle = {
  "margin-top": "1px",
  "position": "relative",
  "float":"right"
}

const dropdownmenuStyle = {
  "position":"absolute",
  "top": "100%",
  "right": "0",
  "margin-left": "-100px"
}

const Nav = () =>
  <header>
    <nav class="navbar navbar-default" style={navStyle}>
      <a class="navbar-brand" style={navbarbrandStyle} href="/">
        <span id="logo-font" style={logofontStyle}><img id="logo" style={logoStyle} src="images/SafePassage.png" />&nbsp;&nbsp;SafePassage</span>
      </a>

      <div class="dropdown-container" style={dropdowncontainerStyle}>
        <button class="btn btn-default btn-lg dropdown-toggle" style={menubuttonStyle} type="button" data-toggle="dropdown" aria-haspopup="true"
          aria-expanded="false">
          <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
        </button>
        <ul class="dropdown-menu" style={dropdownmenuStyle}>
          <li>
            <a data-toggle="modal" data-target="#loginModal">
              <span class="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;&nbsp;Login
                    </a>
          </li>
          <li>
            <a data-toggle="modal" data-target="#signupModal">

              <span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>&nbsp;&nbsp;Sign Up</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>;

export default Nav;
