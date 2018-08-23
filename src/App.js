import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import axios from "axios";

import FileUpload from "./FileUpload";

class App extends Component {
  constructor() {
    super();
    this.state = {
      imgs: []
    };
  }

  componentDidMount() {
    this.getImages();
  }

  getImages = () => {
    axios.get("/media").then(res =>
      this.setState({
        imgs: res.data.Contents
      })
    );
  };

  render() {
    console.log(this.state.imgs);
    let allImgs = this.state.imgs.map((e, i) => {
      let filePath = `https://s3.us-east-2.amazonaws.com/caroverflowmedia/${
        e.Key
      }`;
      if (e.Key.substr(e.Key.length - 4) === ".mp4") {
        return (
          <video width="320" height="240" autoPlay controls key={i}>
            <source src={filePath} type="video/mp4" />
          </video>
        );
      } else if (e.Key.substr(e.Key.length - 4) === ".mp3") {
        return (
          <audio key={i} controls>
            <source src={filePath} type="audio/mpeg" />
          </audio>
        );
      } else {
        return (
          <img
            key={i}
            src={filePath}
            alt="s3 images"
            style={{ height: "250px", width: "250px" }}
          />
        );
      }
    });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {allImgs}
        <FileUpload getImages={this.getImages} />
      </div>
    );
  }
}

export default App;
