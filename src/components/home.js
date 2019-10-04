import React, { Component } from "react";
import { Button, Divider, Input, Label, Form, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import axios from "axios";
var generate = require("project-name-generator");

const CREATE_ROOM_PATH = "http://localhost:8888/mafia/create-rooms.php";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.nickn,
      room_name: this.props.roomn
    };
    this.handleButtonJoinRoom = this.handleButtonJoinRoom.bind(this); // remove if nothing wrong
  }

  handleButtonCreateRoom() {
    let room_name = generate().dashed;

    // callback on setstate in order to reuse state right after setting it
    this.setState({ room_name }, () => {
      console.log(room_name);

      axios({
        method: "get",
        url: `${CREATE_ROOM_PATH}`,
        withCredentials: true,
        headers: {
          "content-type": "text/plain"
        },
        params: {
          room_name: room_name
        }
      })
        .then(result => {
          console.log("SQL result");
          console.log(result);
        })
        .catch(error => {
          console.log("SQL error");
          console.log(error);
        });
      this.props.handleEnterRoom(this.state.nickname, this.state.room_name);
    });
  }

  handleButtonJoinRoom() {
    this.props.handleEnterRoom(this.state.nickname, this.state.room_name);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "50vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 250 }}>
          <Divider hidden />
          <Divider hidden />
          <Form>
            <Form.Field>
              {/* <Label pointing="below">Nickname</Label> */}
              <Input
                placeholder={
                  this.state.nickname ? this.state.nickname : "Nickname"
                }
                onChange={this.handleChange}
                name="nickname"
              />
            </Form.Field>
          </Form>
          <Divider hidden />

          <Button
            style={{ width: "225px" }}
            color="teal"
            content={"Create Room"}
            size="huge"
            onClick={this.handleButtonCreateRoom.bind(this)}
          />
          <Divider hidden />

          <Input
            action={{
              content: "Join Room",
              //   color: "blue",
              onClick: () => this.handleButtonJoinRoom()
            }}
            placeholder={
              this.state.room_name ? this.state.room_name : "Enter room name"
            }
            style={{ justifyContent: "center", width: "150px" }}
            onChange={this.handleChange}
            name="room_name"
          />
        </Grid.Column>
      </Grid>
    );
  }
}
Home.propTypes = {
  handleEnterRoom: PropTypes.func.isRequired
};

export default Home;
