import React from 'react';
import { observer } from 'mobx-react';
import { Form, Label } from 'semantic-ui-react'
import { DateTimePicker } from 'react-widgets';

export default observer(({field, width}) => (
    <Form.Field width={width}>
        <label
            htmlFor={field.id}
        >
            {field.label}
        </label>
        <DateTimePicker
            id={field.id}
            value={field.value || null}
            onChange={field.sync}
            date={false}
            placeholder={field.placeholder}
        />
        {field.error && <Label pointing color='red'>{field.error}</Label>}
    </Form.Field>
));
