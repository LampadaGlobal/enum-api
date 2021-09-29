/**
 * @class View.Fields.Base.EnumParentApiField
 * @alias SUGAR.App.view.fields.BaseEnumParentApiField
 * @extends View.Fields.Base.EnumApiField
 */
({
	extendsFrom: 'EnumApiField',

	parentValue: null,

	initialize: function(options) {
		this._super('initialize', [options]);

		this.model.on("change:" + this.def.parent, this.resetOptions, this);
	},

	resetOptions: function(model, value) {
		if(_.isEmpty(this.model.get(this.def.parent))) this.model.set(this.name, "");

		this._super('resetOptions', [model, value]);
	},

	loadParameters: function() {
		this.parentValue = this.model.get(this.def.parent) || null;
	},

	shouldProcess: function() {
		var parent = this.model.get(this.def.parent);

		return (!_.isUndefined(parent) && !_.isNull(parent) && !_.isEmpty(parent));
	},

	getUrl: function() {
		return this.def.api + this.parentValue;
	}
});
