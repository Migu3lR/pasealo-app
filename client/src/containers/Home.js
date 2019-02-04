import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API, PubSub } from "aws-amplify";
import { connect } from 'react-redux';

import "./Home.css";

class Home extends Component {
  componentDidMount() {
    console.log(this.props)
  }
  /*constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }

  async componentDidMount() {
    await PubSub.publish('/redux/api/prueba', 
    {
      message: "hola",
      cid: PubSub._pluggables[0].clientId
    });
    
    if (!this.props.isAuthenticated) {
      return;
    }
  
    try {
      const notes = await this.notes();
      console.log(notes)
      //this.setState({ notes });
    } catch (e) {
      alert(e);
    }
  
    //this.setState({ isLoading: false });
  }
  
  notes() {
    return API.get("api", "/api");
  }

  renderNotesList(notes) {
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0
          ? <ListGroupItem
              key={note.noteId}
              href={`/notes/${note.noteId}`}
              onClick={this.handleNoteClick}
              header={note.content.trim().split("\n")[0]}
            >
              {"Created: " + new Date(note.createdAt).toLocaleString()}
            </ListGroupItem>
          : <ListGroupItem
              key="new"
              href="/notes/new"
              onClick={this.handleNoteClick}
            >
              <h4>
                <b>{"\uFF0B"}</b> Create a new note
              </h4>
            </ListGroupItem>
    );
  }
  
  handleNoteClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }*/

  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }
/*
  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }*/

  render() {
    return (
      <div className="Home">
        {/*this.props.isAuthenticated ? this.renderNotes() : this.renderLander()*/}
        {this.renderLander()}
      </div>
    );
  }
}

const mapStateToProps = (state) => { return { ...state } }
export default connect(mapStateToProps)(Home);