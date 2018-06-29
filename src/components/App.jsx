import React, { Component } from 'react';
import "../App.css";

/*
* Redux works with Actions ( plain JS object), an Action is able to update the
* state of our app but not without intervention of an Action Creator
* example of an Action:
{
	type: 'ADD_REMINDER',
	payload: {}
}
*/
/* Action Creator, is like a function that returns an Action !
 * example of an Action creator:
function  ()
return {
	type: 'ADD_REMINDER',
	payload: {}
}
*/

// Now we can create a constant of string, which will be later, the type of our actions, 
// -> Check ./constants.js file, actions, reducers folders.


/*
* After setting up Redux:
* now we set up our input field and button, and make some states
* to get the data
*/

// after setting up redux ( actions, reducer, store) , we need to CONNECT  our component to the store, so we take advantage 
//of connect() from react-redux. This function works by hooking ( calling ) up, 2 functions to react
//component: the mapStateToProps() and mapDispatchToProps()
import { connect } from 'react-redux';

// first we'll use mapDispatchToProps() by defining it just after the class App here in this file
// to hook up the addReminder actually created to the application.
// We need to bind the actual creator to this application, by importing: 
//import { bindActionCreators } from 'redux';

// We import the addReminder() from actions folder
import { addReminder } from '../actions';
import { Button } from 'react-bootstrap';

// Note: this is related to deletion of list item step
import { deleteReminder } from '../actions'

//NOTE: this is related to the date format added within a user
import moment from 'moment'

// NOTE: this is a challenge
import { modifyReminder } from '../actions'
import { clearReminders } from '../actions' 

class App extends Component {

	// as usual we add our constructor to make states
	constructor(props){
		super(props);

		// make states !
		// NOTE: the dueDate key was added recently
		this.state= {
			text: '',
			dueDate: '',
			newText: ''
		}

	}

	// Warning: this is not the imported addReminder from ../actions, its the helper function
	addReminder(){
		// I hided this console.log after using it , to show state of our input component 
		//console.log('this.state ', this.state);

		//Note: after making the connect(), we check if our application is connected to the store or not
		// normally we'll find that props are containing our action creator (addReminder()) but without data
		// console.log('this ', this);

		// Now after checking the console, if our action creator is in the props of our App! 
		// so we can call it directly! (remember we have console.log() to show the action in actions folder)
		// Also we will check wheter the reducer is working or not, ( we also have console.log in the reducers folder)
		
		//NOTE: dueDate was added recently
		console.log('this.state.dueDate', this.state.dueDate)
		
		/** HERE WE ARE CALLING THE IMPORTED addReminder() from actions folder**/
		this.props.addReminder(this.state.text, this.state.dueDate);
	}

	// Warning: this is not the imported deleteReminder from ../actions, its the helper function
	deleteReminder(id){

		console.log('deleting in application', id) // outputs the id of the reminder that we click to delete
		console.log('this.props', this.props) // this will prouve that our app is still connected with redux

		/** HERE WE ARE CALLING THE IMPORTED deleteReminder() from actions folder**/
		this.props.deleteReminder(id)
	}
	
	// Need to be handled
	/*
	modifyReminder(id){

		console.log('modifying in application', id)
		console.log('this.props', this.props)

		this.props.modifyReminder(id)
				
	}
	*/
	
	// After making connection between redux and the app,
	// After making reactivity between UI, User and states
	// and then we got our data from states.
	// Now the user doesn't know that yet, so we have to show the list of reminders entered by the user
	renderReminders() {

		// here we declare a const variable, it will contain reminders list from mapStateToProps()
		const {reminders} = this.props;		
		// outputs reminders [id:, text:''] as list
		console.log('Reminders as list', reminders)
		
		// return jsx 
		return (
				// <ul> html tag for lists
				<ul className="list-group col-sm-4">
					{
						// we map our list, getting a value by a key
						reminders.map( ( reminder ) => {	
							// list item					
							return (
										<li key = { reminder.id } className='list-group-item'>
											{/*the list item will have text and a date*/}
											<div className="list-item">
												{/*show the reminder's text*/}
												<div>{reminder.text}</div>
												{/*show the reminder's date, <em> jsx tag is used to emphasize*/}
												{/*install (moment --save) through yarn to format the date and time*/}
												<div>
													<em>
														{moment(new Date(reminder.dueDate)).fromNow()}
													{/* this.setState({alertDate: reminder.dueDate})*/}
													</em>
												</div>
											</div>
										{/* We add a button here to delete a reminder from the list
										1 to create a deletion of an item we must have a logic,
										2 go to constants.js and make a new const */}
										
											<div 
												className="list-item delete-button"
												onClick= {() => this.deleteReminder(reminder.id)}>
												{/*THIS IS THE REMINDER DELETION*/}
												<div className="btn delete-item" >&#x2715;</div>
											</div>
											
											<div className="Modify-item" 
											onClick = {() => this.modifyReminder(reminder.id , this.setState({newText: reminder.text}) )}>
												Modify
											</div>
											
											
										</li>
									)
							})
					}
				</ul>
				)		
	}

	render(){
		console.log('this.props ', this.props); // this will show props every time render() is called
		
		//const lastName = 'Firas';
		//console.log(`Hello mr.${lastName}`)
		return(
				<div className="App">
					{/* this is ou title */}
					<div className="Title">
						My Reminder 
					</div>
					<div className="form-inline">
						
						<div className="form-group">

							{/*this is the reminder tag*/}
							<input className="form-contol"
									placeholder="I have to..."
									onChange={event => this.setState({text: event.target.value})}/>

							{/*this is the date tag*/}
							<input className="form-contol" type="datetime-local"
							onChange={ event => this.setState({dueDate: event.target.value})}/>
						</div>
						{/* this is the button */}
						<Button  type="button" 
								className="btn btn-success" 
								onClick= {() => this.addReminder()}>
							Add reminder
						</Button>
					
					</div>
					{/*THIS IS THE REMINDERS LIST, IT WIL BE SHOWN WHEN WE ADD REMINDERs
					THIS function will be called everytime render() is called */}
					{this.renderReminders()}
					<div className="btn bnt-danger" onClick={() => this.props.clearReminders()}>
						Clear Reminders
					</div>											
				</div>
			)
	}
}

/** TODO: After making the view, and setting up redux search for connect(mapDispatchToProps function, mapStateToProps function) **/

// this function is hooked by connect(), it dispatch the action, it returns a bindActionCreators
// function, that turns an object 

// I hided this function since, I can pass an object instead of the entire function
// so by using addReminder imported from actions folder, mapDispatchToProps is called
// automaticaly and use this object in its bindActionCreators()
/*
function mapDispatchToProps(dispatch){
	return bindActionCreators({addReminder}, dispatch);
}
*/

// We can define states to props, so we can recognize the redux state within this component
// This function will be passed as first arg in connect(), and it will be hoocked by it,
// just like mapDispatchToProps function
function mapStateToProps(state){
	// I hided this and replace it under render() method
	//console.log('state ', state);
	return {
		reminders: state
	}
}

// now we connect it to our component, by connect() from redux
// the first argument should be mapStateToProps(), but we don't have it yet, so we pass it as null
// the second argument is mapDispatchToProps()
// and then we'll have our App component hooked up

// NOTE: deleteReminder was added here after defining it in the actions, after the addReminder()
export default connect(mapStateToProps , {addReminder, deleteReminder, modifyReminder, clearReminders}) (App);

