import * as Reflux from 'reflux'
import * as _ from 'lodash'
import chatActions from '../actions/chatActions'
import {ChatMessage} from '../models/chat'

let chatStore = Reflux.createStore({
	listenables: chatActions,

	init() {
		this.messages = [];
		this.pending = [];
		this._updateListFromParse();

		this.listenTo(userStore, this._updateDataFromParse, this._updateDataFromParse);
	},

	_updateListFromParse(user) {
		this.user = _.isUndefined(user) ? this.user : user;

		var receiverQuery = new Parse.Query(ChatMessage);
		receiverQuery.equalTo('Receiver', this.user.id);

		var senderQuery = new Parse.Query(ChatMessage);
		senderQuery.equalTo('Sender', this.user.id);

		var messageQuery = new Parse.Query.or(receiverQuery, senderQuery);
		messageQuery.find()
			.then((results) => {
				this.messages = results;
				let messagesThatFailed = _.reject(this.pending, (msg) => _(this.messages).pluck('id').contains(msg.id))
				this.pending = _.map(messagesThatFailed, (msg) => msg.state = 'error')
				this.messages = this.messages.concat(this.pending)
				this.trigger(this.messages)
			})
	},

	getInitialState() {
		return this.messages;
	},

	sendMessages(msg) {
		msg.state = 'pending';
		this.messages.push(msg);
		this.pending.push(msg);
		this.trigger(this.messages);

		msg.save()
			.then(this._updateListFromParse)
	},

	fetchMessages() {
		this._updateListFromParse()
	},
})

export default chatStore
