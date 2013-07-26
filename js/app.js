define(["views/peptideCollectionView", "models/peptide"], function(PeptideCollectionView, Peptide){
	var Settings = Backbone.Model.extend({
		defaults: {
			"amino-acid": 4,
			"activator": 3.9,
			"amount": 0.1
		}
	});

	var settings = new Settings();

	var view = new PeptideCollectionView({
		collection: new Peptide(),
		settings: settings
	});

	$(".wrapper").append(view.render().el);
});