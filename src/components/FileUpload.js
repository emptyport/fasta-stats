import React, { Component } from 'react';
import Files from 'react-files';
import '../assets/FileUpload.css';
import { Line } from 'rc-progress';

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileProgress: 0
    }

    this.onFilesChange = this.onFilesChange.bind(this);
    this.dataLoaded = this.dataLoaded.bind(this);
  }

  onFilesChange(files) {
    var reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = this.dataLoaded;

    reader.onprogress = function(data) {
      if (data.lengthComputable) {                                            
        var progress = parseInt( ((data.loaded / data.total) * 100), 10 );
        this.setState({
          fileProgress: progress
        });
      }
    }.bind(this);
  }

  dataLoaded(evt) {
    var data = evt.target.result;
    this.props.getFastaCallback(data);
  }

  render() {
    return (
      <div className="grid-item file-upload-item">
        <div className="FileUpload">
          <Files
            className='files-dropzone'
            accepts={['.fasta', '.fa']}
            maxFileSize={1000000000}
            onChange={this.onFilesChange}
          >
            Drop files here or click to upload
          </Files>
        </div>
        <Line percent={this.state.fileProgress} strokeWidth="2" strokeColor="#0066ff" />
      </div>
    );
  }
}

export default FileUpload;