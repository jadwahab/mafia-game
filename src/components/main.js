import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Home from "./home";
import Room from "./room";
import Game from "./game";
import { Divider, Header, Grid, Button } from "semantic-ui-react";
import Cookies from "universal-cookie";
var randomstring = require("randomstring");

const PAGE_STATE = {
  home: "home",
  room: "room",
  game: "game"
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookie: "",
      page_state: PAGE_STATE.home,
      nickname: "",
      room_name: "",
      room_id: "",
    };
  }

  // componentDidMount() {
  //   const cookies = new Cookies();

  //   if (!cookies.get("master_cookie")) {
  //     let cookie = randomstring.generate(7);
  //     cookies.set("master_cookie", `${cookie}`, { path: "/", maxAge: 3600 });
  //     this.setState({ cookie });
  //   }
  // }

  handlePageChange = state => {
    this.setState({ page_state: state });
  };

  handleEnterRoom = (nn, rn, rid) => {
    this.setState({ nickname: nn, room_name: rn, room_id: rid });
    this.handlePageChange(PAGE_STATE.room);
  };

  // todo:
  handleEnterGame = () => {
    // this.setState({ nickname: nn, room_name: rn });
    this.handlePageChange(PAGE_STATE.game);
  };

  pageDisplay() {
    switch (this.state.page_state) {
      case PAGE_STATE.home:
        return (
          <Home
            handleEnterRoom={this.handleEnterRoom}
            nickn={this.state.nickname}
            roomn={this.state.room_name}
          />
        );

      case PAGE_STATE.room:
        return (
          <Room
            handlePageChange={this.handlePageChange}
            handleEnterGame={this.handleEnterGame}
            nickn={this.state.nickname}
            roomn={this.state.room_name}
            roomid={this.state.room_id}
          />
        );

      case PAGE_STATE.game:
        return <Game handlePageChange={this.handlePageChange} />;

      default:
        return "";
    }
  }

  render() {
    return (
      <div>
        <Divider hidden />
        <Header as="h2" textAlign="center" size="huge">
          MAFIA
        </Header>
        {this.pageDisplay()}
      </div>
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
