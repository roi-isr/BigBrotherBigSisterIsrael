import React, { Component } from "react";
import "./Video.css";
import Loader from 'react-loader-spinner'

class Video extends Component {

  req = () => {
    this.props.remoteRef.current.requestFullscreen();
  }

  onPause = (e) => {
    e.target.play();
  }

  mute = () => {
    if (!this.props.isConnected)
      return;
    this.props.mute_func();
  }

  stopVideo = () => {
    if (!this.props.isConnected)
      return;
    this.props.stop_vid_func();
  }



  render() {
    return (
      <div className="main-vid">
        <div className="video-section">
          <svg className="bi bi-mic-mute-fill remote-mute-icon" style={{ color: this.props.rem_mute_icon, opacity: this.props.rem_mute_icon === 'black' ? 0.3 : 1 }} width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12.734 9.613A4.995 4.995 0 0 0 13 8V7a.5.5 0 0 0-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 0 1 4 8V7a.5.5 0 0 0-1 0v1a5 5 0 0 0 4.5 4.975V15h-3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-3v-2.025a4.973 4.973 0 0 0 2.43-.923l-.718-.719zM11 7.88V3a3 3 0 0 0-5.842-.963L11 7.879zM5 6.12l4.486 4.486A3 3 0 0 1 5 8V6.121zm8.646 7.234l-12-12 .708-.708 12 12-.708.707z" />
          </svg>
          <svg className="bi bi-camera-video-off remote-video-icon" style={{ color: this.props.rem_video_icon, opacity: this.props.rem_video_icon === 'black' ? 0.3 : 1 }} width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.075 3.196A2.159 2.159 0 0 0 .5 4.666v6.667c0 1.197.97 2.167 2.167 2.167h6.666c.568 0 1.084-.218 1.47-.575l-.708-.708c-.204.176-.47.283-.762.283H2.667A1.167 1.167 0 0 1 1.5 11.333V4.667c0-.292.107-.558.283-.762l-.708-.709zM10.5 8.379V4.667c0-.645-.522-1.167-1.167-1.167H5.621l-1-1h4.712c1.094 0 1.998.81 2.146 1.862l2.037-1.182c.859-.498 1.984.095 1.984 1.128v7.384c0 .482-.245.869-.594 1.093l-.79-.79a.317.317 0 0 0 .384-.303V4.308a.318.318 0 0 0-.482-.263L11.5 5.505V9.38l-1-1z" />
            <path fillRule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.707z" />
          </svg>
          <legend className="lgd-rem-vid">וידאו של {this.props.linkedName}</legend>

          <button className="btn btn-success full-screen-btn"
            onClick={this.req}
            disabled={this.props.fullScreenDisable}>מסך מלא</button>
          <h3 className="time-duration">משך השיחה:
            {" " + this.props.timer[0]}:{this.props.timer[1]}{this.props.timer[2]}:{this.props.timer[3]}{this.props.timer[4]}
          </h3>
          <video
            ref={this.props.remoteRef}
            className="rem-video"
            height="450px"
            width="595px"
            autoPlay
            onPause={this.onPause}
          />

          <svg className="bi bi-mic-mute-fill local-mute-icon" style={{ color: this.props.mute_icon, cursor: "pointer", opacity: this.props.mute_icon === 'black' ? 0.3 : 1 }} onClick={this.mute} width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12.734 9.613A4.995 4.995 0 0 0 13 8V7a.5.5 0 0 0-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 0 1 4 8V7a.5.5 0 0 0-1 0v1a5 5 0 0 0 4.5 4.975V15h-3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-3v-2.025a4.973 4.973 0 0 0 2.43-.923l-.718-.719zM11 7.88V3a3 3 0 0 0-5.842-.963L11 7.879zM5 6.12l4.486 4.486A3 3 0 0 1 5 8V6.121zm8.646 7.234l-12-12 .708-.708 12 12-.708.707z" />
          </svg>
          <svg className="bi bi-camera-video-off local-video-icon" style={{ color: this.props.video_icon, cursor: "pointer", opacity: this.props.video_icon === 'black' ? 0.3 : 1 }} onClick={this.stopVideo} disabled={true} width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.075 3.196A2.159 2.159 0 0 0 .5 4.666v6.667c0 1.197.97 2.167 2.167 2.167h6.666c.568 0 1.084-.218 1.47-.575l-.708-.708c-.204.176-.47.283-.762.283H2.667A1.167 1.167 0 0 1 1.5 11.333V4.667c0-.292.107-.558.283-.762l-.708-.709zM10.5 8.379V4.667c0-.645-.522-1.167-1.167-1.167H5.621l-1-1h4.712c1.094 0 1.998.81 2.146 1.862l2.037-1.182c.859-.498 1.984.095 1.984 1.128v7.384c0 .482-.245.869-.594 1.093l-.79-.79a.317.317 0 0 0 .384-.303V4.308a.318.318 0 0 0-.482-.263L11.5 5.505V9.38l-1-1z" />
            <path fillRule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.707z" />
          </svg>
          <legend className="lgd-my-vid">וידאו שלי ({this.props.userName})</legend>
          <video
            ref={this.props.localRef}
            className="loc-video"
            height="450px"
            width="595px"
            muted
            autoPlay
            onPause={this.onPause} />

        </div>
        <Loader type="Oval" className="video-loader" visible={(!this.props.isConnected && this.props.readyToJoin) || this.props.disconnectionStat} height="200px" width="200px" color="#FFFFFF" />
      </div>
    );
  }
}

export default Video;
