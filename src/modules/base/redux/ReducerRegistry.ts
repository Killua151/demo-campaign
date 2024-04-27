import { persistCombineReducers } from "redux-persist";

class ReducerRegistry {
  _elements: any;

  constructor() {
    this._elements = {};
  }

  combineReducers(persistConfig: any) {
    return persistCombineReducers(persistConfig, {
      ...this._elements,
    });
  }

  register(name: any, reducer: any) {
    this._elements[name] = reducer;
  }
}

export default new ReducerRegistry();
