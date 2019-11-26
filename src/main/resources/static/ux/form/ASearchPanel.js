Ext.define('Ext.ux.form.ASearchPanel', {
	extend : 'Ext.Panel',
	alias: 'widget.asearchpanel',
	config: {
		/*array*/fields: [],
		/*Ext.Store*/store: null,
		/*function(this)*/searchCallback: null,
		/*Ext.Toolbar*/filterToolbar: null,
		/*string*/searchFieldName : 'id',
		/*layout*/filterLayout : {
			type:'vbox',
			align: 'stretch'
		},
		/*array of {name, value}*/constFilters: [],//постоянные фильтры
		searchEmptyText : 'Поиск',
		filterBtnAlign: null
	},
	filterPanel : null,
	initComponent: function() {
		var me = this;

		this.searchBtn = Ext.create('Ext.Button', {
	        	 text : 'Искать',
//	        	 action: 'searchAction'
		    	 listeners: {
		    		 click: function(e) {
		    			 me.search(me);
		    		 }
		    	 }
	         });
		this.clearBtn = Ext.create('Ext.Button', {
		       	 text : 'Очистить',
//		    	 action: 'clearAction',
		    	 listeners: {
		    		 click: function(e) {
		    			 console.log(me.filterPanel.items);
		    			 Ext.each(me.filterPanel.items.items, function(field) {
		    				 if(field.xtype == 'textfield') {
			    				 field.setValue('');
		    				 }
		    			 }, this);
		    			 me.search(me);
		    		 }
		    	 }
        });
//		items_.push(this.searchBtn);
//		items_.push(this.clearBtn);

		this.filterPanel = Ext.create('Ext.Panel', {
	       	 hidden : true,
	       	 autoHeight: true,
	    	 bodyPadding: 10,
	    	 autoWidth: true,//350,
	    	 region: 'center',
	    	 layout: this.getFilterLayout(),
	    	 buttonAlign: this.filterBtnAlign,
	    	 defaults: {
	    		 labelWidth: 100
	    	 },
			items: this.getFields(),
			buttons: [this.searchBtn, this.clearBtn]
		});
		this.filterBtn = Ext.create('Ext.Button', {
	       	 tooltip : 'Расширенный поиск',
	       	 icon: '/ExtJS/ux/css/images/filter.png',
	       	 region: 'south',
	       	 filterPanel : this.filterPanel,
	       	 me : this,
	    	 listeners: {
	    		 click: this.filterToogle
	    	 }
		});
		this.searchField = Ext.create('Ext.form.TextField', {
			name: this.getSearchFieldName(),
			emptyText: this.getSearchEmptyText(),
			listeners : {
					specialkey : function(f, e) {
						if (e.getKey() == e.ENTER) {
							me.search(me);
						}
					}
			}
		});
		var dockedItems_ = [];
		if(this.getFilterToolbar()) {
			console.log('push current filter');

			this.getFilterToolbar().add(this.searchField);
			this.getFilterToolbar().add(this.filterBtn);
//			dockedItems_.push(this.getFilterToolbar());
		} else {
			console.log('push created filter');
			dockedItems_ = [{
				dock : 'top',
				xtype : 'toolbar',
				items: [this.searchField,this.filterBtn]
			}];
		}
		Ext.apply(me,{
			items : [
//			    this.filterBtn,
			    this.filterPanel
			],
//			dockedItems:[{
//				dock : 'top',
//				xtype : 'toolbar',
//				items: [this.filterBtn]
//			}]
			dockedItems: dockedItems_
		});
		this.callParent(arguments);
	},
	filterToogle: function(e) {
		var visible = e.filterPanel.isVisible();
		e.filterPanel.setVisible(!visible);
		e.setTooltip(visible ? 'Расширенный поиск' : 'Поиск');
		e.setIcon(visible ? '/ExtJS/ux/css/images/filter.png' : '/ExtJS/ux/css/images/search-icon.png');
		e.me.searchField.setDisabled(e.filterPanel.isVisible());
	},
	/*array of {name, value}*/getFilters: function() {
		var result = [];
//		Ext.each(this.getConstFilters(), function(filter) {
////			me.getStore().getProxy().setExtraParam(filter.name,
////					filter.value);
//		}, this);
		if(this.getConstFilters() && this.getConstFilters().length > 0) {
			result = result.concat(this.getConstFilters());
		}
		if (this.filterPanel.isVisible()) {
			Ext.each(this.filterPanel.items.items, function(field) {
//				console.log('field name', field.getName());
//				console.log('field submit value', field.getSubmitValue());
				if (field.getSubmitValue()) {
//					me.getStore().getProxy().setExtraParam(field.getName(),
//							field.getSubmitValue());
					result.push({name: field.getName(), value: field.getSubmitValue()});
				}
				;
			}, this);
		} else {
//			console.log('field name', me.searchField.getName());
//			console.log('field submit value', me.searchField.getSubmitValue());
//			me.getStore().getProxy().setExtraParam(me.searchField.getName(),
//					me.searchField.getSubmitValue());
			result.push({name: this.searchField.getName(), value: this.searchField.getSubmitValue()});
		}
		console.log('filters',result);
		return result;
	},
	search: function(me) {
		me.getStore().getProxy().extraParams = {};
		var filters = me.getFilters();
		Ext.each(filters, function(field) {
			me.getStore().getProxy().setExtraParam(field.name,
					field.value);
		}, this);
		me.getStore().load({
			callback : function(records, options, success) {
	            me.searchCallback(me, records, options, success);
			}
        });
	}
});