define(["backbone"], function(Backbone) {

	return Backbone.Model.extend({
		defaults: {
			name: null,
			code: null,
			mw: 0,
			type: null,
			equiv: 0,
			settings: null
		},

		equiv: function () {
			return this.get("settings").get(this.get("type"));
		},

		mmol: function () {
			return this.equiv() * this.get("settings").get("amount");
		},

		wt: function () {
			return this.mmol() * this.get("mw");
		},

		isNull : function () {
			return this.get("code") ? false : true;
		}
	});

});