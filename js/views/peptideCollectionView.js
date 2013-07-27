define(["underscore", "backbone", "views/updatingCollectionView", "views/peptideView", "models/peptideComponent", "data"],
	function(_, Backbone, UpdatingCollectionView, PeptideView, PeptideComponent, aaMap) {

	var peptideCollectionView = Backbone.View.extend({
		template: '#peptide_template',

		initialize: function (options) {
			this.settings = options.settings;
			this._collectionView = new UpdatingCollectionView({
				el: this.el,
				collection: this.collection,
				childViewConstructor: PeptideView,
				childViewOptions: {
					tagName: 'tr',
					className: 'component',
					settings: this.settings
				}
			});
		},

		render: function() {
			var template = _.template( $(this.template).html(), {});
			this.$el.html(template);
			this._collectionView.render();
			return this;
		},

		events: {
			'change .aaInput': 'aaAdd'
		},

		aaAdd: function (e) {
			var aaCode = this.$('.aaInput').val();

			var aa = aaMap[aaCode];
			if (!aa)
				return false;

			this.collection.add(new PeptideComponent({
				"name": aa.name,
				"code": aaCode,
				"mw": aa.mw,
				"type": aa.type,
				"settings": this.settings
			}));
			return false;
		}

	});

	return peptideCollectionView;
});