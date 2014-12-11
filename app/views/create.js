import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'

let Create = React.createClass({
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Create New ...')

		return React.createElement('div',
			{id: 'create'},
			title)
	},
})

export default Create
