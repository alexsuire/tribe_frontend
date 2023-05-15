import '../styles/globals.css';
import Head from 'next/head';

import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import users from '../reducers/users';

const reducers = combineReducers({ users });
const persistConfig = { key: 'Tribe', storage, whitelist: ['users'], };


const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
 return (
   <Provider store={store}>
     <PersistGate persistor={persistor}>
        <Head>
            <title>User</title>
        </Head>
        <Component {...pageProps} />
     </PersistGate>
   </Provider>
 );
}

export default App;