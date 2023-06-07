import React, {useReducer} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.5.0";
import "assets/css/demo.css";

import App from "layouts/App";


// import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
// import { legacy_createStore as createStore} from "redux";
// import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const initialState = {
  authenticated: false,
  token: null
}

//state 수정방법 정의
const reducer = (state, action) => {
  switch(action.type) {
      case 'SET_TOKEN':
        alert("리듀서 작동" + action.token);
        return {...state, token: action.token, authenticated: action.result};
      default:
        return state;
  }
};

// const [state, dispatch] = useReducer(reducer, initialState);
// const { authenticated } = state;

// const 체중 = 100;
// const reducer = (state=체중, action) =>{
//   return state;
// }

let store = createStore(reducer)

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
