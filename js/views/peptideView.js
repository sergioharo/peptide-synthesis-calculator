define(["jquery", "backbone", "underscore", "data", "models/aminoAcid"], function ($, Backbone, _, aaMap, AminoAcid) {

	var peptideView = Backbone.View.extend({

		template: '#item_template',

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
			return !this.model.isNull() ? this.model.get("aminoAcid").get("name") : "";
		},

		getMW: function () {
			return !this.model.isNull() ? this.model.get("aminoAcid").get("mw") : "";
		},

		getEquiv: function () {
			return !this.model.isNull() ? this.model.get("equiv") : "";
		},

		getMmol: function () {
			return !this.model.isNull() ? this.model.mmol() : "";
		},

		getWT: function () {
			return !this.model.isNull() ? this.model.wt() : "";
		},

		events: {
			'change .aaInput': 'amountChanged'
		},

		amountChanged: function (e) {
			var aaCode = this.$('.aaInput').val();

			var aa = aaMap[aaCode];
			if (!aa)
				return false;

			aa = new AminoAcid(aa);
			this.model.set('aminoAcid', aa);
			this.model.set("equiv", this.settings(aa.get("type")));
			return false;
		}

	});

	return peptideView;
});