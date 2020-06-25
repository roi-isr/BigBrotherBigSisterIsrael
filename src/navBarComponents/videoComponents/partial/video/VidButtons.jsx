import React, { Component } from "react";
import "./VidButtons.css";

class VidButtons extends Component {
  state = {
    inputText: "",
  }

  handleInputChange = (e) => {
    this.setState({ inputText: e.target.value });

  }

  join_room = (e) => {
    e.preventDefault();
    this.props.joinRoom(this.state.inputText);
    this.setState({ inputText: "" });
  }

  render() {
    return (
      <div className="vid-btn-main">


        <div className="start-buttons">
          <button
            className="btn btn-success start_btn"
            onClick={this.props.startVideo}
            disabled={this.props.startDisable}>
            התחל שיחת וידאו
        </button>

          <button
            className="btn btn-danger hangup_btn"
            onClick={this.props.hangUp}
            disabled={this.props.hangDisable}>
            סיים שיחה
        </button>

          <button
            className="btn btn-primary create_room"
            onClick={this.props.createRoom}
            disabled={this.props.createDisable}>
            הזמן את {this.props.linkedName} לשיחת וידאו!
                     </button>

        </div>
      </div>
    );
  }
}
export default VidButtons;
