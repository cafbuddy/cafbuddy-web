import * as React from 'react'
import * as _ from 'lodash'
import {State} from 'react-router'

let Meal = React.createClass({
	mixins: [State],

	getInitialState() {
		return {
			meal: {},
			messages: [],
		}
	},

	componentWillRecieveProps(nextProps) {
		let id = this.getParams().mealId
		let meal = _.find(window.meals, {objectId: id})
		this.setState({meal})

		if (meal.matched) {
			let matchId = meal.matchId
			let query = new Parse.Query('Chat')
			query.equalTo('matchId', matchId)
			query.find().then((messages) => {
				console.log(messages)
				this.setState({messages})
			})
		}
	},
	componentWillMount() {
		this.componentWillRecieveProps(this.props)
	},

	render() {
		console.log(this.state.meal)
		let id = this.getParams().mealId
		let title = React.createElement('h1', {className: 'view-title'}, `Active Meal (id: ${id})`)

		let msgs = _.map(this.state.messages, (msg, index) => React.createElement('p', {key: index}, msg.get('text')))

		return React.createElement('div',
			{id: 'meal'},
			title,
			msgs)
	},
})

export default Meal
