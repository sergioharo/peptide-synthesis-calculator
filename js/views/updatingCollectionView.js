define(["jquery", "backbone", "underscore"], function ($, Backbone, _) {

	var updatingCollection = Backbone.View.extend({

		tagName: 'ul',
		className: 'collection',

		initialize : function(options) {
			_(this).bindAll('add', 'remove');

			if (!options.childViewConstructor) 
				throw 'no child view constructor provided';

			this._childViewConstructor = options.childViewConstructor;
			this._childViewOptions = options.childViewOptions;

			this._childViews = [];

			this.collection.each(this.add);

			this.collection.bind('add', this.add);
			this.collection.bind('remove', this.remove);
		},

		add : function(model) {
			var options = _.extend(this._childViewOptions, {model : model});
			var childView = new this._childViewConstructor(options);

			this._childViews.push(childView);

			if (this._rendered)
				this.$el.append(childView.render().el);
		},

		remove : function(model) {
			var viewToRemove = _(this._childViews).select(function(cv) { return cv.model === model; })[0];
			this._childViews = _(this._childViews).without(viewToRemove);

			if (this._rendered)
				viewToRemove.$el.remove();
		},

		render : function() {
			var that = this;
			this._rendered = true;

			if(this._childViewOptions.className)
				this.$(this._childViewOptions.className).remove();
			else
				this.$el.empty();

			_(this._childViews).each(function(childView) {
				that.$el.append(childView.render().el);
			});

			return this;
		}
	});

	return updatingCollection;
});