import React, {Fragment, Component} from 'react';
import {observer} from "mobx-react";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

@observer
class CropperInput extends Component {
    createPreview = (file) => {
        console.log(file.name);
        // eslint-disable-next-line
        file.preview = URL.createObjectURL(file);
        return file.preview;
    };

    cropImage = (file) => (e) => {
        this.refs.cropper.getCroppedCanvas().toBlob(blob => {
            file.cropResult  = URL.createObjectURL(blob);
            file.image = blob;
        }, 'image/jpeg');
        return file;
    };
    
    render() {
        const {field} = this.props;
        const file = field.files && field.files[0][0];
        return (
            <div>
                {file &&
                <Cropper
                    style={{height: 200, width: '100%'}}
                    ref="cropper"
                    src={this.createPreview(file)}
                    aspectRatio={1}
                    viewMode={0}
                    dragMode="move"
                    guides={false}
                    scalable={true}
                    cropBoxMovable={true}
                    cropBoxResizable={true}
                    crop={this.cropImage(file)}
                />}
            </div>
        )
    }
}

export default CropperInput


