import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { updateProfile } from './actions';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
	key: 'redux',
	storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);

export { updateProfile };

export { default as AmplifyBridge } from './AmplifyBridge';
