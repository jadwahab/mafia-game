import React, { Component } from "react";
import { Button, Divider, Input, Label, Form, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "universal-cookie";
var generate = require("project-name-generator");

const CREATE_ROOM_PATH = "http://localhost:8888/mafia/create-rooms.php";
const GET_ROOM_PATH = "http://localhost:8888/mafia/get_room_by_id.php";
const ADD_USER_PATH = "http://localhost:8888/mafia/add_user_to_room.php";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.nickn,
      room_name: this.props.roomn,
      room_id: this.props.roomid
    };
    this.handleButtonJoinRoom = this.handleButtonJoinRoom.bind(this); // remove if nothing wrong
  }

  handleButtonJoinRoom = async () => {
    try {
      const result = await axios.get(`${ADD_USER_PATH}`, {
        params: {
          room_name: this.state.room_name,
          nickname: this.state.nickname
        }
      })
  
      console.log("SQL result ADD USER");
      console.log(result);
      this.props.handleEnterRoom(this.state.nickname, this.state.room_name, result.data.room_id);

    } catch (error) {
      // TODO: send warning to user
      console.log("SQL error");
      console.log(error);
    }

    // try {
    //   const result = await axios.get(`${CREATE_ROOM_PATH}`, {
    //     params: {
    //       room_name: this.state.room_name,
    //       nickname: this.state.nickname
    //     }
    //   })
  
    //   console.log("SQL result CREATE ROOM");
    //   console.log(result);
  
    //   const user_id = result.data.user_id
    //   this.setState({ room_id: result.data.room_id });
  
    //   const cookies = new Cookies();
  
    //   if (!cookies.get("user_id")) {
    //     cookies.set("user_id", `${user_id}`, { path: "/", maxAge: 3600 });
    //   }
  
    //   this.setState({ this.state.room_name });

    //   this.props.handleEnterRoom(this.state.nickname, this.state.room_name, result.data.room_id);

    // } catch (error) {
    //   // TODO: send warning to user
    //   console.log("SQL error");
    //   console.log(error);
    // }

  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleButtonCreateRoom = async () => {
    let room_name = generate().dashed;

    try {
      const result = await axios.get(`${CREATE_ROOM_PATH}`, {
        params: {
          room_name: room_name,
          nickname: this.state.nickname
        }
      })
  
      console.log("SQL result CREATE ROOM");
      console.log(result);
  
      const user_id = result.data.user_id
      this.setState({ room_id: result.data.room_id });
  
      const cookies = new Cookies();
  
      if (!cookies.get("user_id")) {
        cookies.set("user_id", `${user_id}`, { path: "/", maxAge: 3600 });
      }
  
      this.setState({ room_name });

      this.props.handleEnterRoom(this.state.nickname, this.state.room_name, result.data.room_id);

    } catch (error) {
      // TODO: send warning to user
      console.log("SQL error");
      console.log(error);
    }

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
