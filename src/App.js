import React, { Component } from "react";
import { Helmet } from "react-helmet";
import SearchResult from "./SearchResult";

import "../src/App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    };
  }

  onChange = e => {
    const terms = e.target.value.split(" ");
    const lastWord = terms[terms.length - 1];

    fetch(`https://api.datamuse.com/words?rel_rhy=${lastWord}&md=d`)
      .then(res => {
        return res.json();
      })
      .then(words => this.setState({ searchResults: words }));
  };

  render() {
    console.log(this.state.searchResults);

    return (
      <div className="container">
        <div className="title">
          <input
            type="text"
            onChange={this.onChange}
            className="searchInput"
            placeholder="type a word"
          />
          <div className="resultsContainer">
            {this.state.searchResults.map(result => (
              <SearchResult result={result} />
            ))}
          </div>{" "}
        </div>
      </div>
    );
  }
}
