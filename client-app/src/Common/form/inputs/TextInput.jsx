import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import {observer} from "mobx-react";

export default observer(({field, type = 'text'}) => 
        <Form.Field error={field.blurred && field.hasError}>
            {field.label &&
            <label htmlFor="{field.id}">
                {field.label}
            </label>
            }
            <input {...field.bind({type})} autoComplete={'off'}/>
            {field.error && <Label pointing color='red'>{field.error}</Label>}
        </Form.Field>);
