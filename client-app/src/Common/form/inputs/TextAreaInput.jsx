import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import {observer} from "mobx-react";

export default observer(({field, rows}) =>
        <Form.Field error={field.blurred && field.hasError}>
            <label htmlFor="{field.id}">
                {field.label}
            </label>
            <textarea {...field.bind()} rows={rows} />
            {field.error && <Label basic color='red'>{field.error}</Label>}
        </Form.Field>
    );
