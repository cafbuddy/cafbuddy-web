import * as React from 'react'
import * as _ from 'lodash'
import * as moment from 'moment'
import {currentUser} from '../helpers/auth'
import List from '../components/list'

let Meals = React.createClass({
	getInitialState() {
		return {
			upcomingMeals: [],
			pendingMatches: [],
		}
	},
	componentWillRecieveProps(nextProps) {
		Parse.Cloud.run('getMealsToday',
			{objectID: Parse.User.current().id}
		).then((results) => {
			this.setState({upcomingMeals: JSON.parse(results)})
			window.meals = JSON.parse(results)
		})
	},
	componentWillMount() {
		this.componentWillRecieveProps(this.props)
	},
	render() {
		let upcomingMealElements = React.createElement(List, {
			title: 'Upcoming Meals',
			list: this.state.upcomingMeals,
			errorMessage: "No items.",
		})

		let pendingMatchElements = React.createElement(List, {
			title: 'Pending Matches',
			list: this.state.pendingMatches,
			errorMessage: "No items.",
		})

		return React.createElement('div', {id: 'meals'},
			upcomingMealElements,
			pendingMatchElements)
	}
})

export default Meals
