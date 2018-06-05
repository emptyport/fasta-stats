import React, { Component } from 'react';

class IndividualProteinView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hydropathyValues: [],
    }

    this.calculateHydropathy = this.calculateHydropathy.bind(this);

  }

  // Values come from this publication: https://www.sciencedirect.com/science/article/pii/0022283682905150?via%3Dihub
  calculateHydropathy = () => {
    let hydropathy = {
      'I': 4.5,
      'V': 4.2,
      'L': 3.8,
      'F': 2.8,
      'C': 2.5,
      'M': 1.9,
      'A': 1.8,
      'G': -0.4,
      'T': -0.7,
      'S': -0.8,
      'W': -0.9,
      'Y': -1.3,
      'P': -1.6,
      'H': -3.2,
      'E': -3.5,
      'Q': -3.5,
      'D': -3.5,
      'N': -3.5,
      'K': -3.9,
      'R': -4.5
    }

    let values = [];
    for(var i=0; i<this.props.sequence.length; i++) {
      values.push({
        x: i+1,
        y: parseFloat(hydropathy[this.props.sequence[i]])
      });
    }
    this.setState({
      hydropathyValues: values
    });
  }

  componentDidMount() {
    let hydropathy = {
      'I': 4.5,
      'V': 4.2,
      'L': 3.8,
      'F': 2.8,
      'C': 2.5,
      'M': 1.9,
      'A': 1.8,
      'G': -0.4,
      'T': -0.7,
      'S': -0.8,
      'W': -0.9,
      'Y': -1.3,
      'P': -1.6,
      'H': -3.2,
      'E': -3.5,
      'Q': -3.5,
      'D': -3.5,
      'N': -3.5,
      'K': -3.9,
      'R': -4.5
    }

    let values = [];
    for(var i=0; i<this.props.sequence.length; i++) {
      let hydro = hydropathy[this.props.sequence[i]];
      values.push({
        x: i+1,
        y: hydro
      });
    }

    console.log(values[0]);

    var ft = new window.FeatureViewer(
      this.props.sequence,
      '#featureViewer',
      {
        showAxis: true,
        showSequence: true,
        brushActive: true, //zoom
        toolbar:true, //current zoom & mouse position
        bubbleHelp:true, 
        zoomMax:10 //define the maximum range of the zoom
      }
    );

    try {
      ft.addFeature({
        data: values,
        className: 'hydrophobicityLine',
        name: 'Hydrophobicity',
        color: "#0F8292",
        type: 'line',
        height: 5
      });
    }
    catch(err) {
      console.log(err);
    }
    
  }

  render() {
    return (
      <div>
        <div id="featureViewer"></div>
      </div>
    );
  }
}

export default IndividualProteinView;