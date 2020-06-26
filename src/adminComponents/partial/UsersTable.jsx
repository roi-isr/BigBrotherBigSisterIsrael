import React, { Component } from "react";
import Loader from 'react-loader-spinner'
import "./UsersTable.css";
import firebase from "../../config/Firebase"
import NoLinkedUsers from "./NoLinkedUsers";

class UsersTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersArr: [],
            linkedUserArr: [],
            noLinkedUsers: [],
            noLink: false
        }
        this.usersRef = firebase.firestore().collection('Users');
    }

    componentDidMount() {
        var linkedUserId;
        this.usersRef
            .where('type', "==", "חונך")
            .orderBy('fName', 'asc')
            .orderBy('lName', 'asc')
            .get()
            .then(queryShot => {
                queryShot.forEach(
                    (doc) => {
                        linkedUserId = doc.data().link_user;
                        if (typeof (linkedUserId) !== 'undefined' && linkedUserId !== "") {
                            this.setState({ usersArr: [...this.state.usersArr, doc.data()] })
                            this.usersRef.doc(linkedUserId).get()
                                .then(linkedDoc => this.setState({ linkedUserArr: [...this.state.linkedUserArr, linkedDoc.data()] }))
                        }
                    }
                )
            })
            .catch((e) => console.log(e.name));
        this.usersRef
            .orderBy('type', 'desc')
            .orderBy('fName', 'asc')
            .orderBy('lName', 'asc')
            .get()
            .then(queryShot => {
                queryShot.forEach(
                    (doc) => {
                        linkedUserId = doc.data().link_user;
                        if ((typeof (doc.data().link_user) === 'undefined' || doc.data().link_user === "") &&
                            (doc.data().type === "חונך" || doc.data().type === "חניך")) {
                            var newUser = {
                                name: doc.data().fName + " " + doc.data().lName,
                                role: doc.data().type,
                                id: doc.data().id,
                                email: doc.data().email,
                                phone: doc.data().phone
                            };
                            this.setState({ noLinkedUsers: [...this.state.noLinkedUsers, newUser] })
                        }
                    })
            })
            .catch((e) => console.log(e.name));
    }

    renderLinked = (index, dataType) => {
        if (typeof (this.state.linkedUserArr[index]) !== 'undefined' && this.state.linkedUserArr[index] !== null) {
            if (dataType === "name")
                return (
                    <td className="align-middle">{this.state.linkedUserArr[index].fName + " " + this.state.linkedUserArr[index].lName}</td>
                );
            else if (dataType === "id")
                return (
                    <td className="align-middle">{this.state.linkedUserArr[index].id}</td>
                );
            else if (dataType === "email")
                return (
                    <td className="align-middle">{this.state.linkedUserArr[index].email}</td>
                );
            else
                return (
                    <td className="align-middle">{this.state.linkedUserArr[index].phone}</td>
                );

        }
        else
            return null;
    }

    renderTableLine = () => {

        return (this.state.usersArr.map((data, index) =>
            <tr key={"row" + index} className="h5 table-cols">
                <td className="align-middle">{data.fName + " " + data.lName}</td>
                <td className="align-middle">{data.id}</td>
                <td className="align-middle">{data.email}</td>
                <td className="align-middle">{data.phone}</td>
                {this.renderLinked(index, "name")}
                {this.renderLinked(index, "id")}
                {this.renderLinked(index, "email")}
                {this.renderLinked(index, "phone")}
            </tr >
        ));
    }

    renderNoLink = () => {
        return (this.state.noLinkedUsers.map((data, index) =>
            <tr key={"row" + index} className="h4 table-cols">
                <td className="align-middle">{data.name}</td>
                <td className="align-middle">{data.role}</td>
                <td className="align-middle">{data.id}</td>
                <td className="align-middle">{data.email}</td>
                <td className="align-middle">{data.phone}</td>

            </tr >
        ));
    }

    closeNoLink = () => {
        this.setState({ noLink: false })
    }

    showNoLinkedUsers = () => {
        this.setState({ noLink: true })
    }

    noLinkAppearance = () => {
        if (this.state.noLink)
            return (<NoLinkedUsers parentCallback={this.closeNoLink} renderNoLink={this.renderNoLink} />)
        return null;
    }

    renderTable = () => {
        if (typeof (this.state.linkedUserArr[0]) === 'undefined')
            return (<Loader className="user-table-indicator" type="Bars" height="400px" width="400px"></Loader>);
        else
            return (
                <div className="table-div">
                    <table className="table table-striped table-dark w-75 table-responsive users-table" >
                        <thead>
                            <tr><th colSpan="8" className="h1 table-title">טבלת חונך / חניך</th></tr>
                            <tr className="h2 table-cols">
                                <th className="align-middle">שם החונך</th>
                                <th className="align-middle">ת"ז</th>
                                <th className="align-middle">אימייל</th>
                                <th className="align-middle">טלפון</th>
                                <th className="align-middle">שם החניך</th>
                                <th className="align-middle">ת"ז</th>
                                <th className="align-middle">אימייל</th>
                                <th className="align-middle">טלפון</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableLine()}
                        </tbody>
                    </table>
                    <button className="btn btn-success show-no-link-btn" onClick={this.showNoLinkedUsers}>הצג משתמשים ללא חונך/חניך</button>
                    {this.noLinkAppearance()}
                </div>
            );
    }

    render() {
        return (
            this.renderTable()
        );
    }
}

export default UsersTable;
