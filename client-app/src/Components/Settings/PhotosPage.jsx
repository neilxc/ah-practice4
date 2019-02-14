import React, {Component, Fragment} from 'react';
import {
    Image,
    Segment,
    Header,
    Divider,
    Grid,
    Button,
    Card,
    Icon
} from 'semantic-ui-react';
import classNames from 'classnames'
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {inject, observer} from "mobx-react";
import {toast} from "react-toastify";

@inject('userStore', 'authStore')
@observer
class PhotosPage extends Component {
    state = {
        files: [],
        fileName: '',
        cropResult: null,
        image: {}
    };

    cancelCrop = () => {
        this.setState({
            files: [],
            image: {}
        });
    };

    uploadImage = async () => {
        try {
            await this.props.userStore.addPhoto(this.state.image);
            this.cancelCrop();
            toast.success('Success, Photo has been uploaded');
        } catch (error) {
            console.error('Oops', error.message);
        }
    };

    handlePhotoDelete = (photo) => async () => {
        try {
            await this.props.userStore.deletePhoto(photo);
        } catch (error) {
            console.error('Oops', error.message)
        }
    };

    handleSetMainPhoto = (photo) => async () => {
        try {
            await this.props.userStore.setMainPhoto(photo);
        } catch (error) {
            console.error('Oops', error.message)
        }
    };

    cropImage = () => {
        if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }

        this.refs.cropper.getCroppedCanvas().toBlob(blob => {
            let imageUrl = URL.createObjectURL(blob);
            this.setState({
                cropResult: imageUrl,
                image: blob
            });
        }, 'image/jpeg');
    };

    onDrop = files => {
        this.setState({
            files: files.map(file => Object.assign(file, {preview: URL.createObjectURL(file)})),
            fileName: files[0].name
        });
        console.log(this.state.files);
        console.log(this.state.fileName);
    };

    render() {
        const {loading, authStore: {currentUser}} = this.props;
        let filteredPhotos;
        if (currentUser && currentUser.photos) {
            filteredPhotos = currentUser.photos.filter(photo => {
                return photo.url !== currentUser.image
            })
        }
        return (
            <Segment>
                <Header dividing size="large" content="Your Photos"/>
                <Grid>
                    <Grid.Row/>
                    <Grid.Column width={4}>
                        <Header color="teal" sub content="Step 1 - Add Photo"/>
                        <Dropzone onDrop={this.onDrop}>
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
                        <Header sub color="teal" content="Step 2 - Resize image"/>
                        {this.state.files[0] && (
                            <Cropper
                                style={{height: 200, width: '100%'}}
                                ref="cropper"
                                src={this.state.files[0].preview}
                                aspectRatio={1}
                                viewMode={0}
                                dragMode="move"
                                guides={false}
                                scalable={true}
                                cropBoxMovable={true}
                                cropBoxResizable={true}
                                crop={this.cropImage}
                            />
                        )}
                    </Grid.Column>
                    <Grid.Column width={1}/>
                    <Grid.Column width={4}>
                        <Header sub color="teal" content="Step 3 - Preview and Upload"/>
                        {this.state.files[0] && (
                            <div>
                                <Image
                                    style={{minHeight: '200px', minWidth: '200px'}}
                                    src={this.state.cropResult}
                                />
                                <Button.Group>
                                    <Button
                                        loading={this.props.userStore.uploadingPhoto}
                                        onClick={this.uploadImage}
                                        style={{width: '100px'}}
                                        positive
                                        icon="check"
                                    />
                                    <Button
                                        disabled={this.props.userStore.uploadingPhoto}
                                        onClick={this.cancelCrop}
                                        style={{width: '100px'}}
                                        icon="close"
                                    />
                                </Button.Group>
                            </div>
                        )}
                    </Grid.Column>
                </Grid>

                <Divider/>
                {currentUser &&
                <Fragment>
                    <Header sub color="teal" content="All Photos"/>
                    <Card.Group itemsPerRow={5}>
                        <Card>
                            <Image src={currentUser.image || '/assets/user.png'}/>
                            <Button positive>Main Photo</Button>
                        </Card>
                        {filteredPhotos && filteredPhotos.map(photo => (
                            <Card key={photo.id}>
                                <Image src={photo.url}/>
                                <div className="ui two buttons">
                                    <Button loading={loading} onClick={this.handleSetMainPhoto(photo)} basic
                                            color="green">
                                        Main
                                    </Button>
                                    <Button onClick={this.handlePhotoDelete(photo)} basic icon="trash" color="red"/>
                                </div>
                            </Card>
                        ))}
                    </Card.Group>
                </Fragment>}

            </Segment>
        );
    }
}

export default PhotosPage;
