import validatorjs from 'validatorjs';

import MobxReactForm from 'mobx-react-form';

import dvrExtend from './extension/dvr';

export default class Form extends MobxReactForm {
    // constructor(arg1, arg2) {
    //     super(arg1, arg2);
    // };

    // hooks() {
    //     return hooks;
    // }

    plugins() {
        return {
            dvr: {
                package: validatorjs,
                extend: dvrExtend,
            },
        };
    }

    options() {
        return {
            defaultGenericError: 'Invalid Data',
            autoParseNumbers: true,
            validateOnChange: true
        };
    }
}