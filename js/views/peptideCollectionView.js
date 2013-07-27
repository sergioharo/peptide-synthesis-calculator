define(["underscore", "backbone", "views/updatingCollectionView", "views/peptideView", "models/peptideComponent"], 
	function(_, Backbone, UpdatingCollectionView, PeptideView, PeptideComponent) {

	var peptideCollectionView = Backbone.View.extend({
		tagName: "table",
		className: 'peptide',
		template: '#peptide_template',

		initialize: function (options) {
			_.bindAll(this, ['setupItems']);

			this._items = this.collection;
			this.settings = options.settings;
			this._collectionView = new UpdatingCollectionView({
				tagName: "tbody",
				className: 'components',
				collection: this._items,
				childViewConstructor: PeptideView,
				childViewOptions: {
					tagName: 'tr',
					className: 'component',
					settings: this.settings
				}
			});

			this._items.on('change', this.setupItems);
		},

		render: function() {
			this.setupItems();

			var template = _.template( $(this.template).html(), {});
			this.$el.html(template)
					.append(this._collectionView.render().el);

			return this;
		},

		removeEmptyItems: function (exceptFor) {
			var items = this._items;
			var empty = items.filter(function (item) { return item.isNull(); });
			_.each(empty, function (item) { if (item != exceptFor) items.remove(item); });
		},

		setupItems: function () {
			var lastItem = this._items.last();
			this.removeEmptyItems(lastItem);

			if (!lastItem || !lastItem.isNull() )
				this._items.add(new PeptideComponent({settings: this.settings}));
		}
	});

	return peptideCollectionView;
});