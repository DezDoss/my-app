Ext.define('Ext.ux.form.ListEditor', {
	extend: 'Ext.Panel',
	addText: 'Добавить',
	removeText: 'Удалить',
	updateText: 'Обновить',
	alias: 'widget.listeditor',
	mixins: {
        field: 'Ext.form.field.Field'
    },
	config: {
//		addWinClass: 'Ext.Window',
		columns: [],
		store: null,
		selected: null,
		params: null
	},
	labelDock: 'top',
	createWin: function(editor, params) {
		throw new Error('Not implemented');
	},
	updateHidden: false,
	margins: '0 0 5 5',
	autoHeight: true,
	height:90,
	layout: 'fit',
	initComponent: function() {
		var self = this;
		this.center = Ext.create('Ext.grid.Panel', {
			columns: this.getColumns(),
			autoHeight: true,
			border: false,
			defaults : {
				collapsible : false,
				split : true
			},
			layout:'fit',	
			store: this.getStore(),
			multiSelect: true,
			listeners: {
				itemclick: function(me, record, item, index, e, eOpts) {
					self.removeBtn.setDisabled(me.selModel.selected.items.length == 0);
					self.setSelected(me.selModel.selected.items);
				}
			}
		});
		this.addBtn = Ext.create('Ext.Action', {
      	  tooltip: this.addText,
      	  editor: self,
      	  icon:'/ExtJS/ux/css/images/add-icon.png',
    	  listeners: {
    		  click: this.addBtnAction
    	  }
		});
		this.removeBtn = Ext.create('Ext.Action', {
			tooltip : this.removeText,
			icon : '/ExtJS/ux/css/images/delete-icon.png',
			listeners : {
				click : function() {
					self.center.getStore().remove(self.getSelected());
				}
			},
			disabled: true
		});
		this.updateBtn = Ext.create('Ext.Action', {
	      	  tooltip: this.updateText,
	      	  icon:'/ExtJS/ux/css/images/update.png',
	    	  listeners: {
	    		  click: function() {
	    			  self.center.getStore().load();
	    		  }
	    	  },
	    	  hidden: this.updateHidden
			});
		Ext.apply(this, {
			items: [this.center],
			dockedItems: [
							{
								xtype : 'toolbar',
								dock : 'right',
								items : [ this.addBtn, this.updateBtn,this.removeBtn ]
							}, {
								xtype: 'label',
								text: this.label + ': ',
								dock: this.labelDock,
								hidden: this.label == null
							}
			]
		});
		this.callParent(arguments);
		this.initField();
	},
	addBtnAction: function(button) {
//		console.log(button.editor.getAddWinClass());
		this.win = /*Ext.create(button.editor.getAddWinClass(), {
			modal: true,
		});*/button.editor.createWin(button.editor, button.editor.getParams());

		this.win.center();
		this.win.show();
	},
	getSubmitValue: function() {
		var modifiedRecords = this.center.getStore().getRange();
		if (modifiedRecords.length > 0) {
			var jsonData = "[";
			jsonData += Ext.JSON.encode(modifiedRecords[0].data);
			for (var cnt = 1; cnt < modifiedRecords.length; cnt++) {
				var record = modifiedRecords[cnt];
				jsonData += ','	+ Ext.JSON.encode(record.data);
			}
			jsonData = jsonData.substring(0, jsonData.length) + "]";
		}
		console.log(jsonData);
		return jsonData;
	},
	load: function(options) {
		this.center.getStore().load(options);
	},
	loadData: function(data) {
		this.center.getStore().loadData(data);
	}

});