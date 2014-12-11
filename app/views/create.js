import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
import Toolbar from '../components/toolbar'

let Create = React.createClass({
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Create New ...')

		return React.createElement('div',
			{id: 'create'},
			title,
			React.createElement(Toolbar, {tools: ['Create new Game', 'Create new Map']}))
	},
})

export default Create
