import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {
    constructor(props){
    super(props);
    this.state={
        hideCompleted: false,
     };
    }
    handleSubmit(event){
       event.preventDefault();

       //find the yexy via the react ref
       const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();


    //    Tasks.insert({
    //        text,
    //        createdAt: new Date(),
    //        owner:Meteor.userID(),
    //        username: Meteor.user().username,
    //    });
       Meteor.call('tasks.insert', text);

       //clear form
       ReactDOM.findDOMNode(this.refs.textInput).value='';
    }
    toggleHideComplete(){
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    /**
     * IDK why we are not using --->function renderTask ()
     * instead of renderTask
     * but i guess when we inherit from React.Component
     * we can use function using {this.function_name}
     * intead of {function_name} as usual 
     * 
     */
    renderTasks() {
        let filtertedTasks = this.props.tasks;
        if(this.state.hideCompleted){
            filtertedTasks=filtertedTasks.filter(task=>!task.checked);
        }
        return filtertedTasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List({this.props.incompleteCount})</h1>

                    <label className="hide-completed">
                    <input
                    type="checkbox"
                    readOnly
                    checked={this.state.hideCompleted}
                    onClick={this.toggleHideComplete.bind(this)}
                    />
                    Hide Completed Task
                    </label>

                    <AccountsUIWrapper />
                    { this.props.currentUser ?
                    

                <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                  <input
                  type='text'
                  ref ='textInput'
                  placeholder='Type to add new tasks'
                  />

                </form> :''
                    }

                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
        incompleteCount: Tasks.find({ checked:{ $ne: true} }).count(),
        currentUser: Meteor.user(),
    };
})(App);