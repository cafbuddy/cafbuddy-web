import * as React from 'react'
import * as _ from 'lodash'
import * as moment from 'moment'
import {Link} from 'react-router'
import Subtitle from './subtitle'
import Octicon from './octicon'

let List = React.createClass({
	propTypes: {
		list: React.PropTypes.array.isRequired,
		title: React.PropTypes.string.isRequired,
		errorMessage: React.PropTypes.string.isRequired,
	},
	render() {
		let title = React.createElement(Subtitle, {text: this.props.title});

		let listOfThings = React.createElement('ul', {className: 'meal-list'}, _.map(this.props.list, (meal) =>
			React.createElement('li', {key: meal.objectId},
				React.createElement(Link, {to: 'meal', params: {mealId: meal.objectId}},
					React.createElement('span', {className: 'starts'}, moment(meal.start.iso).calendar()),
					React.createElement('span', {className: 'ends'}, moment(meal.end.iso).calendar()),
					React.createElement(Octicon, {icon: 'chevron-right'})))))

		return React.createElement('section', {className: 'list'},
			title,
			_.isEmpty(this.props.list) ? this.props.errorMessage : listOfThings)
	},
})

export default List
