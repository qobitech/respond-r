import { applyMiddleware, createStore, compose, Middleware } from "redux";
import thunkMiddleware from 'redux-thunk';
// import logger from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

//pass in middlewares here
const middleware: Middleware[] = [thunkMiddleware];

// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = compose(applyMiddleware(...middleware));

function saveToLocalStorage(state: any) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
    }
}

function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistantState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        return undefined;
    }
}

// const unsubscribe = () => {
//     store.subscribe(() => {console.log(store.getState)})
// };

const store = createStore(rootReducer, loadFromLocalStorage(), enhancer)

store.subscribe(() => saveToLocalStorage(store.getState()));

// unsubscribe();
export default store;