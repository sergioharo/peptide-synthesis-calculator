define(["underscore", "backbone", "views/updatingCollectionView", "views/peptideView", "models/peptideComponent", "data"],
	function(_, Backbone, UpdatingCollectionView, PeptideView, PeptideComponent, aaMap) {

	var peptideCollectionView = Backbone.View.extend({
		template: '#peptide_template',
		autocompleteTemplate: "#autocomplete_template",

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

			this.data = [];
			for(var key in aaMap) {
				var aminoAcid = aaMap[key];
				var datum = {
					value: aminoAcid.code + " - " + aminoAcid.name,
					data: aminoAcid,
					tokens: aminoAcid.name.replace(/\(|\)/g, "-").replace(/fmoc-\w-/gi,"").split("-")
				};
				datum.tokens.splice(0,0, aminoAcid.code);
				this.data.push(datum);
			}

			this.templateFn = _.template( $(this.template).html());
			this.autocompleteTemplateFn = _.template( $(this.autocompleteTemplate).html());
		},

		render: function() {
			var template = this.templateFn({});
			this.$el.html(template);
			this._collectionView.render();

			this.input = this.$(".aaInput").typeahead({
				autoselect: true,
				sections: [{
					name: 'aminoAcids',
					source: new Dataset({
						local: this.data
					}),
					templates: {
						suggestion: this.autocompleteTemplateFn
					}
				}]
			});
			return this;
		},

		events: {
			'typeahead:selected .aaInput': 'aaAdd',
			'click .delete': 'aaDelete'
		},

		aaAdd: function (e, datum) {
			var aa = datum.data;
			if (aa) {
				this.collection.add(new PeptideComponent({
					"name": aa.name,
					"code": aa.code,
					"mw": aa.mw,
					"type": aa.type,
					"settings": this.settings
				}));

				this.input.typeahead("val", "");
			}			
		},

		aaDelete: function (e) {
			var target = e.currentTarget;
			var cid = $(target).data("cid");
			var model = this.collection.get(cid);
			if (model)
				this.collection.remove(model);
		}

	});

	return peptideCollectionView;
});