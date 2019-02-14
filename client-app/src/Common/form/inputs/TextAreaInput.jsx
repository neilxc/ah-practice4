import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import {observer} from "mobx-react";

export default observer(({field, rows, width, type, placeholder}) =>
        <Form.Field error={field.blurred && field.hasError}>
            <textarea {...field.bind({type, placeholder})} rows={rows} />
            {field.error && <Label basic color='red'>{field.error}</Label>}
        </Form.Field>
    );
