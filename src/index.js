import React from 'react'
import thunkMiddleware from 'redux-thunk'
import ReactDOM from 'react-dom' //ReactDOm
import App from './components/App' // this is ur App
import { Provider } from 'react-redux' // Provider will make the applicaton under the store
import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from './reducers'
import './index.css' // notice how we import css file

let devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(rootReducer, compose(devTools))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
