import React, { Component } from "react";
import "./NoLinkedUsers.css";

class NoLinkedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeForm = () => {
    this.props.parentCallback(false);
  };

  render() {
    return (
      <div>
        <div className="col-md-25 text-center pop-up-div-no-link">
          <div className="pop-up-nlink">
            <span className="helper-nlink"> </span>
            <div className="center-form">
              <div
                className="popupCloseBtn"
                id="close-watch"
                onClick={this.closeForm}
              >
                x
              </div>
              <table className="table table-striped table-dark m-100 table-responsive no-link-table" >
                <thead>
                  <tr><th colSpan="5" className="h1 table-title">משתמשים ללא חונך/חניך</th></tr>
                  <tr className="h2 table-cols">
                    <th className="align-middle">שם</th>
                    <th className="align-middle">תפקיד</th>
                    <th className="align-middle">ת"ז</th>
                    <th className="align-middle">אימייל</th>
                    <th className="align-middle">טלפון</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.renderNoLink()}
                </tbody>
              </table>
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default NoLinkedUsers;
