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
    axios.get("/media").then(
      res => console.log(res.data)
      // this.setState({
      //   imgs: res.data.Contents
      // })
    );
  }

  render() {
    console.log(this.state.imgs);
    // let allImgs = this.state.imgs.map((e, i) => {
    //   console.log(e);
    //   return <img key={i} src={e.Key} alt="s3 images" />;
    // });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <FileUpload />
      </div>
    );
  }
}

export default App;
