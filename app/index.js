// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import * as keys from './data/parse-api-key.json'
Parse.initialize(keys.app_id, keys.js_key);
// jscs:enable

import * as attachFastClick from 'fastclick'
attachFastClick(document.body);

import 'fetch'
import {status} from './helpers/fetch'
window.rawfetch = window.fetch
window.fetch = (url, opts) => window.rawfetch(url, opts).then(status)

import * as React from 'react'
import * as Router from 'react-router'

import userStore from './stores/userStore'

import App       from './views/app'
import Auth      from './views/auth'
import Create    from './views/create'
import Meal      from './views/meal'
import Meals     from './views/meals'
import Settings  from './views/settings'

let routes = (
	React.createElement(Router.Route, {handler: App, name: 'App', path: '/'},
		React.createElement(Router.DefaultRoute, {handler: Meals, name: 'meals'}),
		React.createElement(Router.Route, {handler: Auth, name: 'sign-up'}),
		React.createElement(Router.Route, {handler: Auth, name: 'sign-in'}),
		React.createElement(Router.Route, {handler: Meal, name: 'meal', path: 'meal/:mealId'}),
		React.createElement(Router.Route, {handler: Settings, name: 'settings'}),
		React.createElement(Router.Route, {handler: Create, name: 'create'})))

Router.run(routes, (Handler) => {
	React.render(React.createElement(Handler, null), document.getElementById('container'))
})
