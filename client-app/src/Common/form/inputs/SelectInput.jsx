import React from 'react';
import {Form, Label, Select} from 'semantic-ui-react';
import {observer} from "mobx-react";

export default observer(({field, multiple}) =>
    <Form.Field>
        <Select
            {...field.bind()}
            options={field.extra}
            onChange={(e, data) => field.sync(data.value)}
            multiple={multiple}
        />
        {field.error && <Label color='red'>{field.error}</Label>}
    </Form.Field>
)
