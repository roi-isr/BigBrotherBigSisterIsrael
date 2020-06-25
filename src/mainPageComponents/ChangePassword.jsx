import React, { Component } from "react";
import "./ChangePassword.css";
import firebase from "../config/Firebase"

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ""
        };
        this.fAuth = firebase.auth();
    }

    closeForm = () => {
        this.props.parentCallback(false);
    };

    changePassword = () => {
        this.fAuth
            .sendPasswordResetEmail(this.props.email)
            .then(() => alert("הסיסמא החדשה נשלחה אליך למייל"))
            .catch(() => alert("שגיאה בהזנת הנתונים"));
    }

    render() {
        return (
            <div>
                <div id="form-box" className="col-md-25 text-center">
                    <div className="change-pwd-form" id="add-pic-form">
                        <span className="helper"> </span>
                        <div className="center-form">
                            <div
                                className="close-btn"
                                id="close-watch"
                                onClick={this.closeForm}
                            >
                                x
              </div>
                            <div className="form-group">
                                <h1 className="change-pwd-lbl">שינוי סיסמא</h1>
                                <p className="change-pwd-p">בלחיצה על הכפתור למטה יישלח אליך למייל לינק לשינוי הסיסמא.</p>
                                <button
                                    className="btn btn-success send-reset-email"
                                    onClick={this.changePassword}
                                >
                                    שלח לי לינק לשינוי סיסמא!
                </button>

                            </div>{" "}
                        </div>{" "}
                    </div>{" "}
                </div>{" "}
            </div>
        );
    }
}

export default ChangePassword;
