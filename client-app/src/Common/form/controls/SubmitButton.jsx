import React from 'react'
import {observer} from "mobx-react";
import {Button} from "semantic-ui-react";

export default observer (({form, children, onClick, content, loading}) =>
    <Button
        positive
        type={'submit'}
        content={content}
        onClick={onClick || form.onSubmit}
        disabled={form.isPristine || form.submitting || form.hasError}
        loading={form.submitting || loading}
    >
        {children}
    </Button>)
    