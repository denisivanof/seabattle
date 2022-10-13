import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store";
import {BrowserRouter} from "react-router-dom";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import SeaBattle from "./components/SeaBattle";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <DndProvider backend={HTML5Backend}>
                  <SeaBattle cellSize={30}>
                      <App />
                  </SeaBattle>
              </DndProvider>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);
reportWebVitals();
