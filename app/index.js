import * as keys from './data/parse-api-key.json'
Parse.initialize(keys.app_id, keys.js_key);

import * as attachFastClick from 'fastclick'
attachFastClick(document.body);

import * as React from 'react'

import * as Router from 'react-router'
import {Route, DefaultRoute} from 'react-router'

import App       from './views/app'
import Auth      from './views/auth'
import Create    from './views/create'
import Meal      from './views/meal'
import Meals     from './views/meals'
import Settings  from './views/settings'

let routes = (
	React.createElement(Route, {handler: App, name: 'App', path: "/"},
		React.createElement(DefaultRoute, {handler: Meals, name: 'meals'}),
		React.createElement(Route, {handler: Auth, name: 'sign-up'}),
		React.createElement(Route, {handler: Auth, name: 'sign-in'}),
		React.createElement(Route, {handler: Meal, name: 'meal', path: 'meal/:mealId'}),
		React.createElement(Route, {handler: Settings, name: 'settings'}),
		React.createElement(Route, {handler: Create, name: 'create'})))

Router.run(routes, (Handler) => {
	React.render(React.createElement(Handler, null), document.getElementById('container'))
})
