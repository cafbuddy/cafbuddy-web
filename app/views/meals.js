import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
import * as moment from 'moment'
import userStore from '../stores/userStore'
import List from '../components/list'

let Meals = React.createClass({
	mixins: [Reflux.listenTo(userStore, 'onUserChanged', 'onUserChanged')],
	getInitialState() {
		return {
			user: undefined,
			upcomingMeals: [],
			pendingMatches: [],
		}
	},
	onUserChanged(user) {
		this.setState({user})
		this.findMeals()
	},
	findMeals() {
		if (this.state.user) {
			Parse.Cloud.run('getMealsToday', {objectID: this.state.user.id})
				.then((results) => {
					results = JSON.parse(results)
					this.setState({upcomingMeals: results})
					window.meals = results
				})
		}
	},
	render() {
		let upcomingMealElements = React.createElement(List, {
			title: 'Upcoming Meals',
			list: this.state.upcomingMeals,
			errorMessage: 'No items.',
		})

		let pendingMatchElements = React.createElement(List, {
			title: 'Pending Matches',
			list: this.state.pendingMatches,
			errorMessage: 'No items.',
		})

		return React.createElement('div', {id: 'meals'},
			upcomingMealElements,
			pendingMatchElements)
	},
})

export default Meals
