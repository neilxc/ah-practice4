import React, {Component} from 'react';
import {Button, Grid, Header, Icon, Image} from "semantic-ui-react";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {observer} from "mobx-react";
import {action} from 'mobx';
import Dropzone from "react-dropzone";
import classNames from "classnames";

const createPreview = (file) => {
    file.preview = window.URL.createObjectURL(file);
    return file.preview;
};

const destroyPreview = (file, field) => (e) => {
    e.preventDefault();
    window.URL.revokeObjectURL(file.preview);
    console.log('file.preview', file.preview);
    const index = field.files.indexOf(file);
    action(() => field.files.splice(index, 1))();
};

@observer
class PhotoInput extends Component {
    createPreview = (file) => (e) => {
        console.log(file);
        // eslint-disable-next-line
        file.preview = URL.createObjectURL(file);
        return file.preview;
    };

    cropImage = () => {
        console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
        // if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
        //     return;
        // }
        //
        // this.refs.cropper.getCroppedCanvas().toBlob(blob => {
        //     let imageUrl = URL.createObjectURL(blob);
        //     this.setState({
        //         cropResult: imageUrl,
        //         image: blob
        //     });
        // }, 'image/jpeg');
    };

    render() {
        const {field} = this.props;
        return (
            <Grid>
                <Grid.Column width={4}>
                    <Header color={'teal'} sub content={'Step 1 - Add Photo'}/>
                    <Dropzone onDrop={field.onDrop}>
                        {({getRootProps, getInputProps, isDragActive}) => {
                            return (
                                <div {...getRootProps()} className={classNames('dropzone',
                                    {'dropzone--isActive': isDragActive})}
                                     style={{paddingTop: '30px', textAlign: 'center'}}>
                                    <Icon name="upload" size="huge"/>
                                    <Header content="Drop image here or click to upload"/>
                                </div>
                            )
                        }}
                    </Dropzone>
                </Grid.Column>
                <Grid.Column width={1}/>
                <Grid.Column width={4}>
                    <Header sub color={'teal'} content={'Step 2 - Resize image'}/>
                    {(field.files && field.files.length) && field.files.map(file => {
                        return (
                            <Cropper
                                style={{height: 200, width: '100%'}}
                                ref="cropper"
                                src={file.preview}
                                aspectRatio={1}
                                viewMode={0}
                                dragMode="move"
                                guides={false}
                                scalable={true}
                                cropBoxMovable={true}
                                cropBoxResizable={true}
                                crop={this.cropImage}
                            />
                        )
                    })}
                </Grid.Column>
                <Grid.Column width={1}/>
                {/*<Grid.Column width={4}>*/}
                {/*<Header sub color="teal" content="Step 3 - Preview and Upload"/>*/}
                {/*<div>*/}
                {/*<Image*/}
                {/*style={{minHeight: '200px', minWidth: '200px'}}*/}
                {/*src={this.state.cropResult}*/}
                {/*/>*/}
                {/*<Button.Group>*/}
                {/*<Button*/}
                {/*loading={this.props.userStore.uploadingPhoto}*/}
                {/*onClick={this.uploadImage}*/}
                {/*style={{width: '100px'}}*/}
                {/*positive*/}
                {/*icon="check"*/}
                {/*/>*/}
                {/*<Button*/}
                {/*disabled={this.props.userStore.uploadingPhoto}*/}
                {/*onClick={this.cancelCrop}*/}
                {/*style={{width: '100px'}}*/}
                {/*icon="close"*/}
                {/*/>*/}
                {/*</Button.Group>*/}
                {/*</div>*/}
                {/*</Grid.Column>*/}
            </Grid>
        )
    }
}

export default PhotoInput