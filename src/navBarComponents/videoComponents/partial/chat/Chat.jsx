import React, { Component } from "react";
import "./Chat.css";
import MessageCube from "./MessageCube";
import logo from '../../../../static_pictures/chat_background.jpg'

class Chat extends Component {
  state = {
    incomeMessage: "",
    messages: []
  }
  componentDidUpdate(prevProp, prevState) {
    if (this.props.outMes !== prevProp.outMes) {
      this.setState({
        messages: [...this.state.messages,
        <MessageCube
          key={this.state.messages.length + 1}
          st={{ textAlign: "right", float: "right", padding: "2px", wordBreak: "break-word", wordWrap: 'break-word', marginTop: "10px", marginRight: "5px", minHeight: "40px", width: '80%', maxWidth: "80%", backgroundColor: "#ece5dd", borderRadius: "10px" }}
          mes={this.props.outMes.mes}
        />]
      });
    }
  }
  handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage = () => {
    if (this.state.incomeMessage === "" || this.state.incomeMessage.trim().length === 0)
      return;
    this.setState({
      messages: [...this.state.messages,
      <MessageCube
        key={this.state.messages.length + 1}
        st={{ textAlign: "right", maxWidth: "80%", float: "left", padding: "2px", wordBreak: "break-word", marginTop: "10px", marginLeft: "5px", minHeight: "40px", width: '80%', backgroundColor: "#dcf8c6", borderRadius: "10px" }}
        mes={this.state.incomeMessage}
      />]
    });
    this.props.sendMessage(this.state.incomeMessage);
    this.setState({ incomeMessage: "" });
  }

  textChange = (event) => {
    this.setState({ incomeMessage: event.target.value })
  }

  render() {
    return (
      <div className="chat-sec">

        <legend className="chat-lgd">תיבת צ'אט</legend>

        <div className="chat-screen" style={{ backgroundImage: `url(${logo})` }}>
          {this.state.messages}
        </div>

        <div className="chat-input">

          <textarea
            className="chat-text"
            value={this.state.incomeMessage}
            onChange={this.textChange}
            spellCheck="false"
            type="text"
            rows="3"
            onKeyDown={this.handleKey}
            disabled={this.props.inputDisable}
          />

          <button
            className="btn btn-success send-btn"
            onClick={this.sendMessage}
            disabled={this.props.sendDisable}>
            שלח
            </button>

        </div>
      </div>
    );
  }
}

export default Chat;
