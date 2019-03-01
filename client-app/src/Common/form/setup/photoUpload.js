export default {
    fields: {
        photo: {
            type: 'file',
            hooks: {
                onDrop: field => {
                    console.log('onDrop', field.files);
                    // field.files.map(file => {
                    //     console.log(file[0]);
                    //     file[0].preview = URL.createObjectURL(file[0]);
                    //     // return file.preview;
                    // });
                    
                    // return field;
                    // console.log('field state', field.state.extra);
                    // field.set({
                    //     files: field.files[0].map(file => ({
                    //         ...file,
                    //         preview: URL.createObjectURL(file)
                    //     }))
                    // });
                    // field.files[0].preview = URL.createObjectURL(field.files[0]);
                    // console.log('addedPreview', field.files);
                }
            }
        }
    }
}