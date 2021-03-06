import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchNote, deleteNote, updateNote } from "../actions";
import EditNote from "./EditNote";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { MarkdownPreview } from "react-marked-markdown";
import Tag from "./Tag";

class SingleNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateActive: false,
      modal: false
    };
  }
  componentDidMount() {
    this.props.fetchNote(this.props.match.params.id);
  }

  toggleUpdate = () => {
    this.setState(prevState => {
      return { updateActive: !prevState.updateActive };
    });
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { modal: !prevState.modal };
    });
  };

  deleteNote = () => {
    this.props.deleteNote(this.props.match.params.id, this.props.history);
  };

  render() {
    if (!this.props.fetchedNote) {
      return <div />;
    }
    return (
      <div className="single-note-view">
        <div className="header">
          <a onClick={this.toggleUpdate}>edit</a>
          <a onClick={this.toggleModal}>delete</a>
        </div>
        <div className="note-content">
          <h3>{this.props.note.title}</h3>
          <MarkdownPreview value={this.props.note.content} />
          {/* <div className="tags">
                        {this.props.note.tags.length > 0 ? this.props.note.tags.map(tag => <Tag key={tag} tagName={tag} />) : null}
                    </div> */}
        </div>
        {this.state.updateActive !== false ? (
          <EditNote
            onCancel={this.toggleUpdate}
            title={this.props.note.title}
            content={this.props.note.content}
            tags={this.props.note.tags}
            updateNote={this.props.updateNote}
            id={this.props.match.params.id}
          />
        ) : null}
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Are you sure you want to delete this note?
          </ModalHeader>
          <ModalBody>
            <Button className="wide" color="danger" onClick={this.deleteNote}>
              Delete
            </Button>{" "}
            <Button className="teal-button" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetchingNote: state.fetchingNotes,
    fetchedNote: state.fetchedNote,
    note: state.note,
    error: state.error
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchNote, deleteNote, updateNote }
  )(SingleNote)
);
