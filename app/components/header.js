import * as React from 'react'
import {ListenerMixin} from 'reflux'

import {isSignedIn} from '../helpers/auth'
import userStore from '../stores/userStore'

import {Link as LinkClass} from 'react-router'
import {Octicon as OcticonClass} from './octicon'

let Link = React.createFactory(LinkClass);
let Octicon = React.createFactory(OcticonClass);

let Header = React.createClass({
	mixins: [ListenerMixin],

	onUserChange() {
		console.log('user changed');
		this.setState({
			isSignedIn: isSignedIn()
		});
	},

	componentDidMount: function() {
		this.listenTo(userStore, this.onUserChange);
    },

	getInitialState() {
		return {
			isSignedIn: isSignedIn()
		}
	},

	render() {

		let loggedInMenuItems = [
			React.createElement('li', {key: 'home'}, Link({to: "meals"}, Octicon({icon: 'home'}))),
			React.createElement('li', {key: 'create'},  Link({to: "create"},  Octicon({icon: 'plus'}))),
			React.createElement('li', {key: 'settings'}, Link({to: "settings"}, Octicon({icon: 'settings'}))),
		]

		let loggedOutMenuItems = [
			React.createElement('li', {key: 'sign-in'}, Link({to: "sign-in"}, Octicon({icon: 'sign-in'}),  ' Sign In')),
			React.createElement('li', {key: 'sign-up'}, Link({to: "sign-up"}, Octicon({icon: 'squirrel'}), ' Sign Up'))
		]

		let menuItems = this.state.isSignedIn ? loggedInMenuItems : loggedOutMenuItems

		return React.createElement('header', {id: 'header'},
			React.createElement('h1', null, 'CafBuddy'),
			React.createElement('ul', null, menuItems)
		)
	}
})

export default Header
