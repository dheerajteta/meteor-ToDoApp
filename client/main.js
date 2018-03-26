import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.js';
import '../imports/startup/accounts-config.js';

/** 
 * Meteor.startup(func)
 * runs function on startup of client server.
 * 
 */

/**
 * following code RUNS <App/> (react.js  class ) from file located at '../imports/ui/App.js'.
 * 
 * making changes in div having id = 'render-target'
 */

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});