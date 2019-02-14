import React from 'react';
import {Form, Label, Select} from 'semantic-ui-react';
import {observer} from "mobx-react";

export default observer(({field, type, placeholder, multiple}) =>
    <Form.Field>
        <Select
            {...field.bind({type, placeholder})}
            options={field.extra}
            onChange={(e, data) => field.onChange(data.value)}
            multiple={multiple}
        />
        {field.error && <Label basic color='red'>{field.error}</Label>}
    </Form.Field>
)