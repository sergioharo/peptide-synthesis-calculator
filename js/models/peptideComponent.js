define(["backbone"], function(Backbone) {

	return Backbone.Model.extend({
		defaults: {
			aminoAcid: null,
			equiv: 0,
			settings: null
		},

		mmol: function () {
			return this.get("equiv") * this.get("settings").get("amount");
		},

		wt: function () {
			return this.mmol() * this.get("aminoAcid").get("mw");
		},

		isNull : function () {
			return this.get("aminoAcid") ? false : true;
		}
	});

});