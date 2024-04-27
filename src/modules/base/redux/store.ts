import { createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ReducerRegistry from "./ReducerRegistry";
import MiddlewareRegistry from "./MiddlewareRegistry";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const reducers = ReducerRegistry.combineReducers(persistConfig);

MiddlewareRegistry.register(thunk);
const middleware = MiddlewareRegistry.applyMiddleware();
const store = createStore(reducers, middleware);
const persistor = persistStore(store, {}, () => {});

export { persistor };

export default store;
