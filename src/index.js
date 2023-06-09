import React, {useReducer} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.5.0";
import "assets/css/demo.css";

import App from "layouts/App";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import {store} from './_reducers/store';


// const initialState = {
//   authenticated: false,
//   token: null
// }

// //state 수정방법 정의
// const reducer = (state, action) => {
//   switch(action.type) {
//       case 'SET_TOKEN':
//         alert("리듀서 작동" + action.token);
//         return {...state, token: action.token, authenticated: action.result};
//       case 'LOGOUT':
//         return {...state, token: null , authenticated : false}
//       default:
//         return state;
//   }
// };


// let store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <App {...props} />} />
        <Redirect to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  </Provider>
);
