import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import {observer} from "mobx-react";

export default observer(({field, type, placeholder, width, label}) => 
        <Form.Field error={field.blurred && field.hasError}>
            {label &&
            <label htmlFor="{field.id}">
                {field.label}
            </label>
            }
            <input {...field.bind({type, placeholder})} autoComplete={'off'}/>
            {field.error && <Label basic color='red'>{field.error}</Label>}
        </Form.Field>);
