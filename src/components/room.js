import React, { Component } from "react";
import { Container, Table, Header, Image, Button } from "semantic-ui-react";
import axios from "axios";

const GET_ROOM_PATH = "http://localhost:8888/mafia/get_room_by_id.php";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.nickn,
      room_name: this.props.roomn,
      room_id: this.props.roomid,
      // array: ["player1", "player2", "player3"],
      users: []
    };
    // this.handleButtonJoinRoom = this.handleButtonJoinRoom.bind(this); // remove if nothing wrong
  }

  async componentDidMount() {

    console.log(this.state.room_name);
    
    try {
      const result = await axios.get(`${GET_ROOM_PATH}`, {
        params: {
          room_name: this.state.room_name
        }
      })
  
      console.log("SQL result GET ROOM");
      console.log(result);

      this.setState({
        users: result.data.data
      });

    } catch (error) {
      // TODO: send warning to user
      console.log("SQL error");
      console.log(error);
    }
  }

  handleHomeButton = () => {
    this.props.handlePageChange("home");
  };

  handleStartButton = () => {
    this.props.handlePageChange("game");
  };

  render() {
    return (
      <Container>
        <Button
          style={{ width: "225px" }}
          content={"Home"}
          onClick={this.handleHomeButton}
        />

        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                style={{ fontSize: 25, textAlign: "center", color: "grey" }}
              >
                {this.state.room_name}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.users.map(player => (
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image
                      src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                      rounded
                      size="mini"
                    />
                    <Header.Content>{player.nickname}</Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          {/* <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" image>
                  <Image
                    src="https://react.semantic-ui.com/images/avatar/small/lena.png"
                    rounded
                    size="mini"
                  />
                  <Header.Content>
                    Lena
                    <Header.Subheader>Human Resources</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" image>
                  <Image
                    src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                    rounded
                    size="mini"
                  />
                  <Header.Content>
                    Matthew
                    <Header.Subheader>Fabric Design</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" image>
                  <Image
                    src="https://react.semantic-ui.com/images/avatar/small/lindsay.png"
                    rounded
                    size="mini"
                  />
                  <Header.Content>
                    Lindsay
                    <Header.Subheader>Entertainment</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" image>
                  <Image
                    src="https://react.semantic-ui.com/images/avatar/small/mark.png"
                    rounded
                    size="mini"
                  />
                  <Header.Content>
                    Mark
                    <Header.Subheader>Executive</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
            </Table.Row>
          </Table.Body> */}
        </Table>

        <Button
          style={{ width: "225px" }}
          content={"Start"}
          color="blue"
          onClick={this.handleStartButton}
        />
      </Container>
    );
  }
}

export default Room;
