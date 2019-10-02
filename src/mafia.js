import React, { Component } from "react";
import { Button, Divider, Header, Grid } from "semantic-ui-react";
import axios from "axios";
import Cookies from "universal-cookie";
var generate = require("project-name-generator");
var randomstring = require("randomstring");

const API_PATH = "http://localhost:3000/mafia/index.php";

class Mafia extends Component {
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

  handleButtonClick() {
    let room_name = generate().dashed;
    console.log(room_name);

    axios({
      method: "get",
      url: `http://localhost:8888/mafia/create-rooms.php`,
      withCredentials: true,
      headers: {
        "content-type": "text/plain"
        // Cookie: `master_cookie=${cookie}`
      },
      params: {
        room_name: room_name
      }
    })
      .then(result => {
        console.log("result");
        console.log(result);
      })
      .catch(error => {
        console.log("error");
        console.log(error);
      });
  }

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "50vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 400 }}>
          <Header as="h2" color="blue" textAlign="center" size="huge">
            MAFIA
          </Header>

          <Divider></Divider>
          {/* <Divider hidden /> */}
          <Button
            color="blue"
            content={"Create Room"}
            size="huge"
            onClick={this.handleButtonClick}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default Mafia;
