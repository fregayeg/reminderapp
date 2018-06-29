import React, { Component } from 'react'
import '../App.css'

import { connect } from 'react-redux'

import { addReminder } from '../actions'
import { Button } from 'react-bootstrap'

import { deleteReminder } from '../actions'

import moment from 'moment'

import { modifyReminder } from '../actions'
import { clearReminders } from '../actions'

class App extends Component {
  // as usual we add our constructor to make states
  constructor(props) {
    super(props)

    // make states !
    // NOTE: the dueDate key was added recently
    this.state = {
      text: '',
      dueDate: '',
      newText: ''
    }
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate)
  }

  deleteReminder(id) {
    this.props.deleteReminder(id)
  }
  modifyReminder = id => {
    this.props.modifyReminder(id)
  }
  renderReminders() {
    const { reminders } = this.props
    console.log('Reminders as list', reminders)

    // return jsx
    return (
      // <ul> html tag for lists
      <ul className="list-group col-sm-4">
        {// we map our list, getting a value by a key
        reminders.map(reminder => {
          // list item
          return (
            <li key={reminder.id} className="list-group-item">
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
                onClick={() => this.deleteReminder(reminder.id)}
              >
                {/*THIS IS THE REMINDER DELETION*/}
                <div className="btn delete-item">&#x2715;</div>
              </div>

              <div
                className="Modify-item"
                onClick={() => this.modifyReminder(reminder.id)}
              >
                Modify
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    console.log('this.props ', this.props) // this will show props every time render() is called

    //const lastName = 'Firas';
    //console.log(`Hello mr.${lastName}`)
    return (
      <div className="App">
        {/* this is ou title */}
        <div className="Title">My Reminder</div>
        <div className="form-inline">
          <div className="form-group">
            {/*this is the reminder tag*/}
            <input
              className="form-contol"
              placeholder="I have to..."
              onChange={event => this.setState({ text: event.target.value })}
            />

            {/*this is the date tag*/}
            <input
              className="form-contol"
              type="datetime-local"
              onChange={event => this.setState({ dueDate: event.target.value })}
            />
          </div>
          {/* this is the button */}
          <Button
            type="button"
            className="btn btn-success"
            onClick={() => this.addReminder()}
          >
            Add reminder
          </Button>
        </div>
        {/*THIS IS THE REMINDERS LIST, IT WIL BE SHOWN WHEN WE ADD REMINDERs
					THIS function will be called everytime render() is called */}
        {this.renderReminders()}
        <div
          className="btn bnt-danger"
          onClick={() => this.props.clearReminders()}
        >
          Clear Reminders
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // I hided this and replace it under render() method
  //console.log('state ', state);
  return {
    reminders: state
  }
}

export default connect(
  mapStateToProps,
  { addReminder, deleteReminder, modifyReminder, clearReminders }
)(App)
