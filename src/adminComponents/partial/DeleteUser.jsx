import React, { Component } from "react";
import "./DeleteUser.css";
import firebase from "../../config/Firebase"

class DeleteUser extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      email: ""
    }
    this.usersRef = firebase.firestore().collection('Users');
  }

  valid = (querySnapshot) => {
    this.usersRef.where('id', '==', this.state.id)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          alert("המשתמש שאתה מנסה למחוק לא קיים במערכת.");
          throw Error(500);
        }
      })
      .catch((e) => console.log("משתמש לא קיים במערכת"));
  }

  deleteUser = (event) => {
    event.preventDefault();
    this.valid();
    this.usersRef.where('id', '==', this.state.id)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          this.setState({ email: doc.data().email }, () => {
            var con = window.confirm("האם אתה בטוח שברצונך למחוק את " + doc.data().fName + " " + doc.data().lName + "?")
            if (con) {
              if (typeof (doc.data().link_user) !== 'undefined' && doc.data().link_user !== "")
                this.usersRef.doc(doc.data().link_user).update({ link_user: "" })
              doc.ref.delete()
                .then(() => {
                  alert(`המשתמש ${doc.data().fName + " " + doc.data().lName} נמחק מהמערכת.`);
                  this.setState({ id: "" })
                }
                );
            }
          });
        });
      })
      .catch((e) => console.log(e.name))
  }

  render() {
    return (

      <form className="del-user-form" onSubmit={this.deleteUser}>
        <h1 className="delete-title"><u>מחיקת משתמש</u></h1>
        <div className="form-group row">
          <label className="del-lab" htmlFor="inputPassword3">תעודת זהות</label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="inputPassword3"
              placeholder="תעודת זהות"
              value={this.state.id}
              onChange={(e) => this.setState({ id: e.target.value })} required />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-danger del-btn">הסר משתמש</button>
          </div>
        </div>
      </form>
    );
  }
}

export default DeleteUser;
