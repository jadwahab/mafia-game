import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Home from "./home";
import Room from "./room";
import { Divider, Header, Grid, Button } from "semantic-ui-react";
import Cookies from "universal-cookie";
var randomstring = require("randomstring");

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookie: ""
    };
  }
  componentDidMount() {
    const cookies = new Cookies();

    if (!cookies.get("master_cookie")) {
      let cookie = randomstring.generate(7);
      cookies.set("master_cookie", `${cookie}`, { path: "/", maxAge: 3600 });
      this.setState({ cookie });
    }
  }

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "50vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 400 }}>
          <Divider hidden />
          <Header as="h2" color="blue" textAlign="center" size="huge">
            MAFIA
          </Header>
          {/* ^ app frame ^ */}
          <HashRouter>
            <div className="content">
              <Route exact path="/" component={Home} />
              <Route path="/room" component={Room} />
            </div>
            <div>
              <Divider hidden />
              <ul className="header">
                <li>
                  <NavLink to="/">
                    <Button color="blue" content={"Room"} />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/room">Room</NavLink>
                </li>
              </ul>
            </div>
          </HashRouter>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Main;
/*
states:

1- home page:
input name
create room button
join room button input

2- room page:
start button
home button
table of players
refresh button

3- game page:
character
toggle hide button
restart button

*/
