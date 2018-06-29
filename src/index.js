import React from 'react';
import ReactDOM from 'react-dom'; //ReactDOm 
import App from './components/App'; // this is ur App
import { Provider } from 'react-redux';// Provider will make the applicaton under the store
import { createStore } from 'redux'; // a store is a Provider prop
import reducer from './reducers';
import './index.css'; // notice how we import css file

// NOTE: When we import the Provider and place our App into it, the console will 
// throw an error asking to define a store, a store prop belongs to Provider, so we need to createStore() 
// to create the store, and later we'll pass a param to this function, that takes states in an
// an action, and return new state
//const store = createStore(); // this line was added without reducers at the beginning
const store = createStore(reducer);

ReactDOM.render(
	/* 
	  A store that stores all the data and provides methods to manipulate this data.
	  The store is created with the createStore() function
	*/
	/*
	  A Provider component that makes it possible for any components to take data
	  from the store
	*/
	<Provider store={store}> 
		<App />
	</Provider>,
	document.getElementById('root')
	);
