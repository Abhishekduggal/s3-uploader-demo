import React, { Component } from "react";
import axios from "axios";

class FileUpload extends Component {
  constructor(props) {
    super();
    this.state = {
      file: null
    };
  }

  // might be to handle compressing file size here??
  submitFile = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    axios
      .post(`/test-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        this.setState(
          {
            file: null
          },
          this.props.getImages()
        );
      })
      .catch(error => {
        // handle your error
      });
  };

  // might be able to manage uploading many files here?
  handleFileUpload = event => {
    this.setState({ file: event.target.files });
  };

  render() {
    return (
      // {type file lets use upload file from computer,
      // accept determines what kind of file the form will accept}
      <form onSubmit={this.submitFile}>
        <input
          label="upload file"
          type="file"
          accept=".png, .jpg, .jpeg, .mp4"
          onChange={this.handleFileUpload}
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}

export default FileUpload;
