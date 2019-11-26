Ext.define("Ext.ux.form.TreeCombo", {
	extend : "Ext.form.field.Picker",
	alias : 'widget.treecombo',
	rootVisible : null,
	rootText : 'root',
	rootId : 'root',
	store : null,
	setValueRef : function(/*SprModel*/sprModel) {
		console.dir(sprModel);
		this.setValue(sprModel.name);
		this.setSelected(sprModel);
	},
	config: {
		selected: null
	},
	initComponent : function() {
		var me = this;
		this.store = Ext.create('Ext.data.TreeStore', {
			autoLoad : true,
			proxy : {
				type : 'rest',
				url : this.url
			},
			root : {
				text : this.rootText,
				id : this.rootId,
				expanded : true
			},
			listeners : {
				scope : this,
				select : this.valueSelected,
				beforeload : function(store, operation, eOpts) {
					me.fireEvent('beforeload', me, store, operation, eOpts);
				}
			}
		});

		var self = this;
		Ext.apply(self, {
			fieldLabel : self.fieldLabel,
			labelWidth : self.labelWidth
		// pickerAlign : "tl"
		});
		self.addEvents('groupSelected');
		self.callParent();

	},
	createPicker : function() {
		var self = this;

//		console.dir(self.getSize());

		self.picker = new Ext.tree.Panel({
			width : self.getSize().width - self.labelWidth,
			height : 400,
			autoScroll : true,
			floating : true,
			resizable : false,
			focusOnToFront : false,
			shadow : true,
			ownerCt : this.ownerCt,
			useArrows : true,
			store : self.store,//self.store,
			root : self.root,
			rootVisible : self.rootVisible,
			listeners : {
				scope : this,
				select : this.valueSelected,
			}
		});
		return self.picker;
	},
	alignPicker : function() {
		// override the original method because otherwise the height of the treepanel would be always 0
		var me = this, picker, isAbove, aboveSfx = '-above';
		if (this.isExpanded) {
			picker = me.getPicker();
			if (me.matchFieldWidth) {
				// Auto the height (it will be constrained by min and max width) unless there are no records to display.
				if (me.bodyEl.getWidth() > this.treeWidth) {
					picker.setWidth(me.bodyEl.getWidth());
				} else {
					picker.setWidth(this.treeWidth);
				}

			}
			if (picker.isFloating()) {
				picker.alignTo(me.inputEl, "", me.pickerOffset);// ""->tl
				// add the {openCls}-above class if the picker was aligned above the field due to hitting the bottom of the viewport
				isAbove = picker.el.getY() < me.inputEl.getY();
				me.bodyEl[isAbove ? 'addCls' : 'removeCls'](me.openCls
						+ aboveSfx);
				picker.el[isAbove ? 'addCls' : 'removeCls'](picker.baseCls
						+ aboveSfx);
			}
		}
	},
	getSubmitValue: function() {
		if(this.getSelected()){
			return this.getSelected().id;
		}
	},
	valueSelected : function(picker, value, options) {
		this.setValue(value.data.text);
		this.setSelected(value.data);
		this.fireEvent('valueSelected', this, value.data.id);
		this.collapse();
	}
});