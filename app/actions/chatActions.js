import * as Reflux from 'reflux'

let chatActions = Reflux.createActions([
	'sendMessage',
	'fetchMessages',
])

export default chatActions
