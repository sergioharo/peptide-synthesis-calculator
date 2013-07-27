define(["backbone", "underscore", "data"], function (Backbone, _, aaMap) {

	var peptideView = Backbone.View.extend({

		template: '#item_template',

		initialize: function (options) {
			this.settings = options.settings;
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.settings, "change", this.render);
		},

		render: function() {
			var template = _.template( $(this.template).html(), { 
				name: this.getName(),
				mw: this.getMW(),
				equiv: this.getEquiv(),
				mmol: this.getMmol(),
				wt: this.getWT()
			});
			this.$el.html( template );
			return this;
		},

		getName: function () {
			return !this.model.isNull() ? this.model.get("name") : "";
		},

		getMW: function () {
			return !this.model.isNull() ? this.model.get("mw") : "";
		},

		getEquiv: function () {
			return !this.model.isNull() ? this.model.equiv() : "";
		},

		getMmol: function () {
			return !this.model.isNull() ? this.model.mmol().toFixed(2) : "";
		},

		getWT: function () {
			return !this.model.isNull() ? this.model.wt().toFixed(2) : "";
		},

		events: {
			'change .aaInput': 'amountChanged'
		},

		amountChanged: function (e) {
			var aaCode = this.$('.aaInput').val();

			var aa = aaMap[aaCode];
			if (!aa)
				return false;

			this.model.set({
				"name": aa.name,
				"code": aaCode,
				"mw": aa.mw,
				"type": aa.type
			});
			return false;
		}

	});

	return peptideView;
});