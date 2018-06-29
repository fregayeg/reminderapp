// Welcome to reducers/index.js file
// First, as we saw in actions/index.js, we need to import the type from constants file
import {
  ADD_REMINDER /*, ADD_FAVORITE*/,
  DELETE_REMINDER,
  MODIFY_REMINDER,
  CLEAR_REMINDERS
} from '../constants'

import { bake_cookie, read_cookie } from 'sfcookies' // cookies are used to save some data locally

/**
 * Step 2 define a helper reminder() function which takes 1 arg ( action )
 */
const reminder = action => {
  let { text, dueDate } = action
  // we return an object as a reminder, with a text and a random ID ( for example )
  return {
    id: Math.random(), // check Math JS class on google for better information
    text: text,
    dueDate: dueDate
  }
}

/** Step 3 removeById function
 * we'll have an arrow function that will have 2 args:
 * 1 - state = [] -> the list of our reminders
 * 2 - id -> the id of the concerned item to delete
 * the function is going to filter the list
 * then only returns the IDs that are not equal to the clicked list item id
 */
const removeById = (state = [], id) => {
  const reminders = state.filter(reminder => reminder.id !== id)

  // this will show the filtered list
  console.log('new reduced reminders', reminders)

  return reminders
}

const modifyById = (state = [], id) => {
  const reminders = state.find(reminder => reminder.id === id)

  console.log('new reduced reminders', reminders)

  return reminders
}

/** Step 1 Reducer creation: it will be an ANONYMOUS ARROW function,
 * it has 2 parameters:
 * ( state[] - preinitialized to an empty array -  , - and a second arg which is - action )
 * -> (state[],action)
 */
const reminders = (state = [], action) => {
  // it can be written as state = [] without if parentheses if there is only arg

  // We initialize a variable here within our reminders reducer to null
  let reminders = null

  state = read_cookie('reminders')

  // Generally we can expect more than one type of action entered here in the future,
  // besides addReminder() (the action creator)
  // so let's use a switch statement
  switch (action.type) {
    // we consider our first case as our ADD_REMINDER defined in constants.js file
    case ADD_REMINDER:
      // -> in this case we set our reminders to an array
      // -> Here we are using a NEAT ES6 trick
      // Our first element will be a spread object ( like varargs in Java ) which was our state array
      // Our second element will be a reminder() that will take an action parameter, check Step 2
      reminders = [...state, reminder(action)]

      // Log the reminder as state through the reducer into the console, this will show if our reducer is connected
      // to the application or not
      //console.log('reminders as state', reminders);

      // save cookie to our browser
      bake_cookie('reminders', reminders)

      // we return the reminders tht we've gotten
      return reminders

    // we consider our second case as our DELETE_REMINDER defined in constants.js file
    case DELETE_REMINDER:
      // in this, we move to declare our removeId function first
      reminders = removeById(state, action.id)
      bake_cookie('reminders', reminders)
      return reminders

    case MODIFY_REMINDER: {
      // TODO: I should have a method here to be assigned to reminders
      reminders = modifyById(state, action.id)
      const newR = [reminders]
      bake_cookie('reminders', newR)
      return newR
    }

    case CLEAR_REMINDERS:
      reminders = []
      bake_cookie('reminders', reminders)
      return reminders

    // otherwise, if we got other types than "ADD_REMINDER"
    default:
      return state
  }
}

export default reminders
