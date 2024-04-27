import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Header, NotFoundPage } from "./modules/common";
import { DemoPage } from "./modules/demo";
import { Provider } from "react-redux";
import store, { persistor } from "./modules/base/redux/store";
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          {/* <Header /> */}
          <Routes>
            {/* <Route path="*" element={<NotFoundPage />} /> */}
            <Route path="/" element={<DemoPage />} />
            <Route path="/demo" element={<DemoPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
