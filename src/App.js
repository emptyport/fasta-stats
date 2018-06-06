import React, { Component } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import EnzymeSelector from './components/EnzymeSelector';
import Modifications from './components/Modifications';
import ProteinList from './components/ProteinList';
import IndividualProteinView from './components/IndividualProteinView';
import SearchInput, {createFilter} from 'react-search-input'
import { Line } from 'rc-progress';

var fastaParser = require('fasta-js');
var peptideCutter = require('peptide-cutter');
var peptideModifier = require('peptide-modifier');

const KEYS_TO_FILTERS = ['id', 'sequence'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fastaEntries: [],
      filteredFastaEntries: [],
      selectedEntry: null,
      searchTerm: '',
      unmodifiedPeptideLengths: [],
      modifiedPeptideMasses: [],
      numberOfProteins: 0,
      numberOfUnmodifiedPeptides: 0,
      numberOfModifiedPeptides: 0,
      enzyme: 'trypsin',
      modifications: [
        {
          'name': 'Carbamidomethylation',
          'residues': ['C'],
          'type': 'fixed',
          'mass': 57.02,
          'id': 1
        },
        {
          'name': 'Oxidation',
          'residues': ['O'],
          'type': 'variable',
          'mass': 15.99,
          'id': 2
        }
      ],
      digestProgress: 0,
    };

    this.removeModification = this.removeModification.bind(this);
    this.saveModification = this.saveModification.bind(this);
    this.runAnalysis = this.runAnalysis.bind(this);
    this.setSelectedEntry = this.setSelectedEntry.bind(this);
    this.DisplaySelectedProtein = this.DisplaySelectedProtein.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this)
  }

  DisplaySelectedProtein = () => {

    if(this.state.selectedEntry === null) {
      return (<div>Hello</div>);
    }
    else {
      console.log(this.state.filteredFastaEntries[this.state.selectedEntry].id);

      return (
        <div>
          <div className="sequenceTitle">
            {this.state.filteredFastaEntries[this.state.selectedEntry].id}
          </div>

          <IndividualProteinView sequence={this.state.filteredFastaEntries[this.state.selectedEntry].sequence} />

        </div>
      );
    }
  }

  setSelectedEntry = (index) => {
    this.setState({
      selectedEntry: index
    });
  }

  getFastaData = (fastaText) => {
    var fasta = new fastaParser();
    var entries = fasta.parse(fastaText);
    this.setState({
      fastaEntries: entries,
      numberOfProteins: entries.length,
      filteredFastaEntries: entries,
    });
  }

  setEnzyme = (enzyme) => {
    this.setState({
      enzyme: enzyme,
    });
    console.log(enzyme);
  }

  saveModification = (newMod) => {
    this.setState({
      modfications: this.state.modifications.push(newMod)
    });
  }

  removeModification = (id) => {
    const remainder = this.state.modifications.filter((mod) => {
      if(mod.id !== id) return mod;
      return null;
    });
    this.setState({
      modifications: remainder
    });
  }

  runAnalysis = () => {
    var options = {
      'enzyme': this.state.enzyme,
      'num_missed_cleavages': 2,
      'min_length': 2,
      'max_length': 30
    };
     
    let peptideList = [];

    var cutter = new peptideCutter(options);
    for(var i=0; i<this.state.fastaEntries.length; i++) {
      var peptides = cutter.cleave(this.state.fastaEntries[i].sequence);
      for(var j=0; j<peptides.length; j++) {
        peptideList.push(peptides[j]);

      }
      var progress = parseInt( (((i+1) / this.state.numberOfProteins) * 100), 10 );
      this.setState({
        digestProgress: progress,
      });
    }
    console.log(peptideList.length);
    /*this.setState({
      unmodifiedPeptides: peptideList,
      numberOfUnmodifiedPeptides: peptideList.length
    });*/
  }

  searchUpdated (term) {
    this.setState({
      searchTerm: term
    });

    this.state.filteredFastaEntries = this.state.fastaEntries.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
  }  


  render() {
    
    

    return (
      <div className="App">
        
        <div className="grid-container">

          <div className="grid-item file-upload-item">
            <FileUpload getFastaCallback={this.getFastaData} />
            <SearchInput className="search-input" onChange={this.searchUpdated} />
          </div>


          <ProteinList entries={this.state.filteredFastaEntries} handleClickCallback={this.setSelectedEntry} />

          <div className="grid-item individual-protein-item">
            <this.DisplaySelectedProtein />
          </div>
         
        </div>
      </div>
    );
  }
}

export default App;

/*
 <br />
          <br />
          <br />

          <EnzymeSelector setEnzymeCallback={this.setEnzyme} />
          <Modifications 
            modifications={this.state.modifications}
            removeModificationCallback={this.removeModification}
            saveModificationCallback={this.saveModification}
          />

          <button onClick={this.runAnalysis}>Run</button>
          <Line percent={this.state.digestProgress} strokeWidth="2" strokeColor="#0066ff" />
          */
