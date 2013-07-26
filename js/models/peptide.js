define(["backbone", "models/peptideComponent"], function(Backbone, PeptideComponent) {

	return Backbone.Collection.extend({
		model: PeptideComponent
	});

});