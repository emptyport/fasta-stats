import React, { Component } from 'react';
import Files from 'react-files';

class FileUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className="FileUpload">
                <Files
                    className='files-dropzone'
                    accepts={['.fasta', '.fa']}
                    maxFileSize={1000000000}
                >
                Drop files here or click to upload
                </Files>
            </div>
        );
    }
}

export default FileUpload;