import React, { Component } from "react";
import { Image, Grid } from "semantic-ui-react";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: this.props.character
    };
    // this.handleButtonJoinRoom = this.handleButtonJoinRoom.bind(this); // remove if nothing wrong
  }

  displayCharacter = char => {
    switch (char) {
      case "civilian":
        return (
          <Image
            src="https://cdn1.vectorstock.com/i/1000x1000/95/55/fat-mafia-portrait-vector-1329555.jpg"
            size="small"
          />
        );

      case "mafia":
        return (
          <Image
            src="https://previews.123rf.com/images/alexutemov/alexutemov1604/alexutemov160400060/54585015-doctor-boy-cartoon-character-and-doctor-boy-playing-doctor-boy-with-stethoscope-medical-small-person.jpg"
            size="small"
          />
        );
      case "doctor":
        return (
          <Image
            src="https://cdn4.vectorstock.com/i/1000x1000/36/38/crowd-of-cartoon-people-characters-vector-17353638.jpg"
            size="small"
          />
        );

      default:
        return (
          <Image
            src="https://d1yn1kh78jj1rr.cloudfront.net/image/preview/rDtN98Qoishumwih/rip-grave-cartoon-halloween-vector-illustration_my4AhW_SB_PM.jpg"
            size="small"
          />
        );
    }
  };

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "50vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 175 }}>
          {this.displayCharacter(this.state.character)}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Game;
