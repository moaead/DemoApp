import {createStore, applyMiddleware} from "redux"
import rootReducer from "../reducers"
import createSagaMiddleware from "redux-saga"
import {compose} from "redux";

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    let composeRes;

    if (window.devToolsExtension) {
        composeRes = compose(
            applyMiddleware(...middlewares),
            window.devToolsExtension()
        );
    } else {
        composeRes = compose(
            applyMiddleware(...middlewares)
        );
    }
    const store = createStore(rootReducer,
        composeRes);

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers').default)
        );
    }
    return store;
    //return Object.assign({}, store, { runSaga: sagaMiddleware.run });
}