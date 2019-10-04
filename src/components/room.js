import React, { Component } from "react";
import { Container, Table, Header, Image, Button } from "semantic-ui-react";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.nickn,
      room_name: this.props.roomn,
      array: ["player1", "player2", "player3"]
    };
    // this.handleButtonJoinRoom = this.handleButtonJoinRoom.bind(this); // remove if nothing wrong
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
            {this.state.array.map(player => (
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image
                      src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                      rounded
                      size="mini"
                    />
                    <Header.Content>{player}</Header.Content>
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
