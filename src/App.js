import React, { Component } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import EnzymeSelector from './components/EnzymeSelector';
import Modifications from './components/Modifications';

var fastaParser = require('fasta-js');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fastaEntries: [],
      numberOfProteins: 0,
      enzyme: 'trypsin',
    };
  }

  getFastaData = (fastaText) => {
    var fasta = new fastaParser();
    var entries = fasta.parse(fastaText);
    this.setState({
      fastaEntries: entries,
      numberOfProteins: entries.length,
    });
  }

  setEnzyme = (enzyme) => {
    this.setState({
      enzyme: enzyme,
    });
    console.log(enzyme);
  }

  render() {
    return (
      <div className="App">
        

        <FileUpload getFastaCallback={this.getFastaData} />
        <EnzymeSelector setEnzymeCallback={this.setEnzyme} />
        <Modifications />
      </div>
    );
  }
}

export default App;
