import React from 'react';
import {Form, Button} from 'semantic-ui-react';
import {observer} from "mobx-react";
import TextAreaInput from "../../../Common/form/inputs/TextAreaInput";

export default observer(({form}) => {
    console.log(form);
    return (
        <Form>
            <TextAreaInput rows={2} field={form.$('body')} />
            <Button
                disabled={form.$('body').isEmpty}
                content="Add Comment"
                labelPosition="left"
                icon="edit"
                primary
                onClick={form.onSubmit}
            />
        </Form>)
})