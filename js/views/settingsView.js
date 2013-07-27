define(["backbone", "underscore"], function (Backbone, _) {

	var settingsView = Backbone.View.extend({

		template: '#settings_template',

		initialize: function (options) {
			this.listenTo(this.model, "change", this.render);
		},

		render: function() {
			var template = _.template( $(this.template).html(), {
				amt: this.model.get("amount"),
				equiv: this.model.get("amino-acid"),
				actEquiv: this.model.get("activator")
			});
			this.$el.html( template );
			return this;
		},

		events: {
			'change .amount': 'amountChanged',
			'change .equiv': 'equivChanged',
			'change .actEquiv': 'actEquivChanged'
		},

		valChanged: function (input, propName)
		{
			var amt = this.$(input).val();

			amt = parseFloat(amt);

			if (!amt || isNaN(amt))
				return false;

			this.model.set(propName, amt);
		},

		amountChanged: function (e) {
			this.valChanged(".amount", "amount");
		},

		equivChanged: function (e) {
			this.valChanged(".equiv", "amino-acid");
		},

		actEquivChanged: function (e) {
			this.valChanged(".actEquiv", "activator");
		}

	});

	return settingsView;
});