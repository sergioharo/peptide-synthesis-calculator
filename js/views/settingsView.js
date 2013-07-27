define(["jquery", "backbone", "underscore"], function ($, Backbone, _) {

	var settingsView = Backbone.View.extend({

		template: '#settings_template',

		initialize: function (options) {
			console.log(this.model);
			this.listenTo(this.model, "change", this.render);
		},

		render: function() {
			var template = _.template( $(this.template).html(), { 
				val: this.model.get("amount")
			});
			this.$el.html( template );
			return this;
		},

		events: {
			'change .amtInput': 'amountChanged'
		},

		amountChanged: function (e) {
			var amt = this.$('.amtInput').val();

			amt = parseFloat(amt);

			if (!amt || amt == NaN)
				return false;

			this.model.set({
				"amount": amt
			});
		}

	});

	return settingsView;
});