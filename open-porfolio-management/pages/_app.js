import '../styles/globals.css';
import React, { useState } from 'react';
import Layout from '../components/Layout';

import GlobalContext, {
    initialGlobalState,
} from './../lib_client/globalContext';

function MyApp({ Component, pageProps }) {
    const [state, setState] = useState({
        ...initialGlobalState,
        update,
    });

    function update(data) {
        setState(Object.assign({}, state, data));
    }

    return (
        <GlobalContext.Provider value={state}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </GlobalContext.Provider>
    );
}

export default MyApp;
