import React, { Component } from "react";
import "./AddPicture.css";
import ImageUploader from "react-images-upload";

class AddPicture extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [], url: "" };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      pictures: pictureFiles,
      url: pictureDataURLs,
    });
  }

  closePicForm = () => {
    this.props.parentCallback(false);
  };

  textPicture = (e) => {
    this.props.setPicText(e.target.value);
  };

  publishImg = () => {
    if (this.state.pictures.length === 0) {
      alert("אנא בחר תמונה");
      return;
    }
    this.props.parentCallback(false);
    if (this.props.showText)
      this.props.setImagePostParent(this.state.pictures, this.state.url);
    else
      this.props.setImagePostParent(this.state.pictures, this.state.url[0]);
  };

  renderTextInput = () => {
    if (this.props.showText)
      return (
        <div>
          <label className="text-pic-lbl" htmlFor="textPicture"> הוסף כיתוב לתמונה </label>
          <input
            type="text"
            name="textPicture"
            className="form-control"
            placeholder="הוסף טקסט"
            onChange={this.textPicture}
          />
        </div>
      )
    else
      return null;
  }
  render() {
    return (
      <div>
        <div id="form-add-pic" className="col-md-25 text-center">
          <div className="add-pic-form-divs" id="add-pic-form">
            <span className="helper"> </span>
            <div className="center-form">
              <div
                className="add-pic-close"
                id="close-watch"
                onClick={this.closePicForm}
              >
                x
              </div>
              <div className="view-pic">
                <div className="form-group">
                  {this.renderTextInput()}
                  <ImageUploader
                    className="img-uploader"
                    fileContainerStyle={{ width: "500px", hight: "500px" }}
                    withIcon={true}
                    withPreview={true}
                    buttonText="בחר תמונה"
                    onChange={this.onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                    buttonStyles={{ left: "0px" }}
                  />
                </div>{" "}
                <button
                  className="btn btn-success publish-img"
                  onClick={this.publishImg}
                >
                  פרסם תמונה
                </button>
              </div>
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default AddPicture;
