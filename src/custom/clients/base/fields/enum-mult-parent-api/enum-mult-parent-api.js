/**
 * @class View.Fields.Base.EnumMultParentApiField
 * @alias SUGAR.App.view.fields.BaseEnumParentApiField
 * @extends View.Fields.Base.EnumApiField
 */
({
	extendsFrom: 'EnumApiField',

	parentValues: {},

	_method: 'create',

	initialize: function(options) {
		this._super('initialize', [options]);

		_.each(this.def.parents, function(to, from) {
			this.model.on("change:" + this.def.parents[from], this.resetOptions, this);
		}, this);
	},

	resetOptions: function(model, value) {
		_.each(this.def.parents, function(to, from) {
			if(_.isEmpty(this.model.get(from))) this.model.set(this.name, "");
		}, this);

		this._super('resetOptions', [model, value]);
	},

	loadParameters: function() {
		var val = null;

		this.parentValues = {};

		_.each(this.def.parents, function(to, from) {
			val = this.model.get(this.def.parents[from]);

			if(!_.isUndefined(val) && !_.isNull(val) && !_.isEmpty(val)) this.parentValues[to] = val;
		}, this);
	},

	shouldProcess: function() {
		return (Object.keys(this.def.parents).length == Object.keys(this.parentValues).length);
	},

	_checkForDefaultValue: function(currentValue, optionsKeys) {
		this.model.setDefault(this.name, "");
	},

	getPostData: function() {
		return this.parentValues;
	}
});
