import validatorjs from 'validatorjs';

import MobxReactForm from 'mobx-react-form';

import hooks from './hooks';
import dvrExtend from './extension/dvr';

export default class Form extends MobxReactForm {

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