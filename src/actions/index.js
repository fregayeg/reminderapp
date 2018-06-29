// Welcome to actions/index.js file !
// First we need to get the action from ../constants.js
import { ADD_REMINDER} from '../constants';

// NOTE: this is related to deletion of list item, its not related to redux setup
// we imported our type of action (delete) from ../constants.js file
import { DELETE_REMINDER } from '../constants';

import { MODIFY_REMINDER } from '../constants';
import { CLEAR_REMINDERS } from '../constants'
/**
* This is our action creator, it's called addReminder,
* its assigned by an ANONYMOUS ARROW function that will have - in our case - 
* 1 parameter, its a text that we'll pass to our addReminder action creator
*/
export const addReminder = ( text , dueDate ) => { // it should be written as (text) if it has more than one arg

	// here we define the Action ( Plain JS object)
	const action = {
		type: ADD_REMINDER, // this type name was imported from the constants.js file

		// we can use ES6 syntax feature if the key and value are same (text.equals(text))
		// so just write text.
		// or text: text ( both are correct)
		text: text,
		dueDate: dueDate,
	}

	// Log the action through the action creator into the console, this will show, later,
	// whether our action is connected to the application or not
	console.log('Action in addRemider :',action );

	// return the action
	return action;
}

// NOTE: this is related to redux setup:
// Now we go to App.jsx file, and after running the code, an error occurs telling that
// "Expected the reducer to be a function", so let's go to create reducers/index.js file


// NOTE: the next step is considered after the step in which we show the reminders list.

/**
* TODO: make a logic to delete a list item
* -> we need to identify the item to delete it, luckily we created an id for each item so we can specify them
* so our argument in this function will  be an id
*/
export const deleteReminder = id => {

	const action = {
		type: DELETE_REMINDER,
		id:id // id here is the arg in our function deleteReminder()
	}
	
	console.log('Deleting in actions', action)
	
	return action
}

export const modifyReminder = (id, newText) => {

	const action = {
		type: MODIFY_REMINDER,
		id,
		newText
	}
	
	console.log('Modifying in actions', action)
	
	return action
}

export const clearReminders = () => {
	return {
		type: CLEAR_REMINDERS
	}
}