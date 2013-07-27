define(["views/peptideCollectionView", "views/settingsView", "models/peptide", "backbone"], function(PeptideCollectionView, SettingsView, Peptide, Backbone){

	// creating settings model
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
		settings: settings,
		el: "#peptideContainer"
	});

	var settingsView = new SettingsView({
		model: settings,
		el: "#settingsContainer"
	});

	settingsView.render();
	view.render();
});