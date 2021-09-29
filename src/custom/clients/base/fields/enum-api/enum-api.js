/**
 * @class View.Fields.Base.EnumApiField
 * @alias SUGAR.App.view.fields.BaseEnumApiField
 * @extends View.Fields.Base.EnumField
 */
({
	extendsFrom: 'EnumField',

	_itemsKey: null,

	_key: null,

	_method: 'read',

	initialize: function(options) {
		app.view.Field.prototype.initialize.call(this, options);

		this.type = 'enum-api';
		this._itemsKey = 'cache:' + this.module + ':' + this.name + ':' + this.cid + ':items';
		this._key = 'request:' + this.module + ':' + this.name + ':' + this.cid;

		console.log("initialize");

		this.model.on("change:" + this.name, this.triggerChange, this);

		this.listenTo(this.model, "sync", function(model) {
			this.resetOptions(model, undefined);
		});
	},

	triggerChange: function(model, value) {
		if(this.model.fields[this.name].type == 'id') {
			var self = this, relate = _.findWhere(this.model.fields, {id_name: this.name});

			if(!_.isUndefined(relate) && _.has(relate, 'populate_list')) {
				app.data.createBean(relate.module, {id: value}).fetch({
					success: function(model) {
						var attributes = {};

						_.each(relate.populate_list, function(to, from) {
							attributes[to] = model.get(from);
						}, this);

						self.model.set(attributes);
					}
				});
			}
		}
	},

	resetOptions: function(model, value) {
		this.items = {};
		this.context.set(this._itemsKey, this.items);
		this.context.unset(this._key);
		this.loadEnumOptions(false, function() {
				this.isFetchingOptions = false;             

				if(!this.disposed) this.render();
			}
		);
	},

	loadEnumOptions: function(fetch, callback, error) {
		var self = this;

		this.items = this.context.get(this._itemsKey) || {};

		fetch = fetch || false;

		if((fetch || _.isEmpty(this.items))) {
			this.loadParameters();

			if(this.context.get(this._key)) {
				var request = this.context.get(this._key);
				request.xhr.done(_.bind(function(o) {
					if (this.items !== o) {
						this.items = o;
						callback.call(this);
					}
				}, this));
			} else if(this.shouldProcess()) {
				this.isFetchingOptions = true;

				var request = app.api.call(this._method, app.api.buildURL(this.getUrl(), false, false, {}), this.getPostData(), {
					success: function(o) {
						if(self.disposed) return;
						if(self.items !== o) {
							var keys = Object.keys(o), value = self.model.get(self.name);

							if((_.isEmpty(value) || _.isUndefined(value) || _.isNull(value)) && !_.isUndefined(o[""])) {
								self.model.set(self.name, "");
							} else if(keys.length == 1) {
								self.model.set(self.name, keys[0]);
							} else if(!_.isUndefined(value) && !_.isEmpty(value) && _.indexOf(keys, value) === -1){
								self.model.set(self.name, "");
							}

							self.items = o;
							self.context.set(self._itemsKey, self.items);
						}
					},
					error: function(e) {
						if(self.disposed) return;
						if(error) error(e);
						if(_.isFunction(app.api.defaultErrorHandler)) app.api.defaultErrorHandler(e);

						self.items = {'': app.lang.get('LBL_NO_DATA', self.module)};
					},
					complete: function() {
						if(!self.disposed) {
							self.context.unset(self._key);
							callback.call(self);
						}
					}
				});

				this.context.set(this._key, request);
			}
		}
	},

	loadParameters: function() {
	},

	shouldProcess: function() {
		return true;
	},

	getUrl: function() {
		return this.def.api;
	},

	buildRoute: function(module, link, id) {
		if(_.isUndefined(id) || _.isEmpty(module)) return;

		if((link && app.acl.hasAccess('view', module, {acls: link._acl})) || !link) {
			this.href = '#' + app.router.buildRoute(module, id);
		} else {
			this.href = undefined;
		}
	},

	_buildRoute: function () {
        var relate = _.findWhere(this.model.fields, {id_name: this.name});

		this.buildRoute(relate.module, this.model.get(relate.link), this.model.get(this.name));
	},

	getSearchModule: function () {
		if(this.def.module) return this.def.module;

		var link = this.fieldDefs.link && this.model.fields && this.model.fields[this.fieldDefs.link] || {};

		if(link.module) return link.module;

		return app.data.getRelatedModule(this.model.module, this.fieldDefs.link);
	},

	format: function(value) {
		if(this.model.fields[this.name].type == 'id') this._buildRoute();

		return value;
	},

	getPostData: function() {
		return {};
	}
});
