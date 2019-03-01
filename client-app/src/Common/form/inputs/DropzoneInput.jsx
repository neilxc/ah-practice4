import React, {Fragment} from 'react';
import {observer} from "mobx-react";
import {action} from 'mobx';
import Dropzone from "react-dropzone";
import classNames from "classnames";
import {Header, Icon} from "semantic-ui-react";

const openDropzone = field => (e) => {
    e.preventDefault();
    field.state.extra('dropzone').open();
};

const destroyPreview = (file, field) => (e) => {
    e.preventDefault();
    window.URL.revokeObjectURL(file.preview);
    const index = field.files[0].indexOf(file);
    action(() => field.files[0].splice(index, 1))();
};

export default observer(({field}) => (
    <Fragment>
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
    </Fragment>
))