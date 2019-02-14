import React, {Component} from 'react';
import {observer} from "mobx-react";
import { Form, Label } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import {format, parse} from 'date-fns';

@observer
class DateInput extends Component {
    render() {
        const {field} = this.props;
        const parsedDate = field.value.length === 0 
            ? null 
            : parse(field.value, "yyyy-MM-dd'T'HH:mm:ss", new Date(field.value));
        return (
            <Form.Field>
                <DatePicker
                    {...field.bind()}
                    placeholderText={field.placeholder}
                    autoComplete={'off'}
                    selected={parsedDate}
                    onChange={(date) => field.set(format(date, "yyyy-MM-dd'T'HH:mm:ss"))}
                    showTimeSelect={field.extra.showTimeSelect}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeFormat={field.extra.timeFormat}
                />
                {field.error && <Label basic color='red'>{field.error}</Label>}
            </Form.Field>
        )
    }
}

export default DateInput