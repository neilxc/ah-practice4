import React, {createContext} from 'react';

export const {Provider, Consumer} = createContext(undefined);

export const withContext = Component =>
    props => <Consumer>
        {value => <Component {...value} {...props} />}
    </Consumer> ;