Ext.define('Ext.ux.form.RefTreeBase', {
	extend: 'Ext.form.field.Trigger',
	alias: ['widget.reftreebase'],
    alternateClassName: ['Ext.ux.RefTreeBase'],
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',
	config:{
		selectFolder:false,
		editable:false,
		searchFieldName:'id',
		searchEmptyText: 'Поиск по ID'
	},
    selectText:'select',
    cancelText:'cancel',
    _displayedText:null,
    store:null,
    win:null,
    requires: ['Ext.ux.form.ASearchPanel'],
    initComponent: function(){    	
        this.callParent(arguments);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
	            	this.nextField();
            }else if(e.getKey() == e.DOWN){
            	this.onTrigger2Click();
            }
        }, this);
	    this.on('focus', function( me, e, eOpts ){
	    	me.setFieldStyle('background-color: #FFFFCC;background-image:none;');
	    },this);
	    this.on('blur', function( me, e, eOpts ){
	    	me.setFieldStyle('background-color: #FFFFFF;background-image:none;');
	    },this);
    },
    getValue: function(){
    	return this._value;
    },
    getSubmitValue: function() {    	
        return this.getValue();
    },    
	setDisplayValue: function(displayedText){
		this._displayedText=displayedText;
	},
	getDisplayValue: function(){
		if (this._value){
			return this._displayedText;
		}else{
			return null;
		}
	},
    onTrigger1Click: function() {
		this.setValue(null);
	},
    onTrigger2Click: function() {
    	this.getWindow().show();
	},
	getWindow: function(){
		return this.win || this.createWin(this);
	},
	nextField:function(){
		Ext.util.Format.nextField(this);
	},
	createWin: function(me){
		var raw;
		
		var selectBtn=Ext.create('Ext.button.Button',{
			text:this.selectText,
			disabled:true,
			handler: function() {
    			me.setDisplayValue(raw.text);	
    			me.setValue(raw.id);			            		 
           		me.win.hide();
            }
        });


		var tree = Ext.create('Ext.tree.Panel', {
			xtype:'treepanel',
			region: 'center',
			store: me.store,
			rootVisible: false,
		    useArrows: true,
		    listeners:{
		    	'itemclick' : function(me1, record,item,index, e,eOpts) {
		    			raw=record.raw;
						if (me.selectFolder){
							selectBtn.setDisabled(false);
						}else{
							if (record.raw.leaf){
								selectBtn.setDisabled(false);
							}else{
								selectBtn.setDisabled(!record.raw.leaf);
							}
						}
		    		},
		    	'itemdblclick': function(dv, record, item, index, e) {   				
		    			raw=record.raw;
		    			if (me.selectFolder || record.raw.leaf){
		        			me.setDisplayValue(raw.text);	
		        			me.setValue(raw.id);            		 

			           		me.win.hide();
			           		me.nextField();
		    			}
		    	    }
		    }
		});

		if(me.gridStore) {

			me.grid = Ext.create('Ext.grid.Panel', {
				store: me.gridStore,
				region: 'south',
				border: false,
				defaults : {
					collapsible : true,
					split : true
				},
				height: 100,
				title: 'Результаты поиска',
				columns: [{
					text: "id",
					dataIndex:"id",
					hidden: true
				}, {
					text: "Код",
					dataIndex: "code",
					flex:1
				}, {
					text:"Наименование",
					dataIndex:"name",
					flex:3
				}],
			    listeners:{
//			    	'itemclick' : function(me1, record,item,index, e,eOpts) {
//			    			raw=record.raw;
//							console.log(record);
//			    		},
			    	'itemdblclick': function(dv, record, item, index, e) {   				
			    			raw=record.raw;
		    				var fp=record.raw.path;
		    				var s=fp.split('/');
		    				var s1='/root';
		    				for(var i=0;i< s.length-1;++i){
		    					s1+='/'+s[i]
		    				}
		    				me.searchPanel.treepanel.expandPath(s1, null, null,
		    					function(success, node) {
		    						this.selectPath(s1);
		    					}, me.searchPanel.treepanel);
			    	    }
			    }
			});
			me.searchPanel = Ext.create('Ext.ux.form.ASearchPanel', {
	        	xtype: 'asearchpanel',
	        	region: 'north',
	        	store :me.gridStore,
	        	treepanel: tree,
	        	gridpanel: me.grid,
	        	hidden: me.filterHidden,
	    		searchFieldName: me.searchFieldName,
	    		searchEmptyText: me.searchEmptyText,
	        	searchCallback: me.searchCallbackFunc,
	        	fields: [
	        	        {
	        	        	xtype: 'textfield',
	        	        	fieldLabel: 'Наименование',
	        	        	name: 'name'
	        	        },
	        	        {
	        	        	xtype: 'textfield',
	        	        	fieldLabel: 'Код',
	        	        	name: 'code'
	        	        }
	        	]
			})
		}

		me.win=Ext.create('Ext.window.Window', {
		    title: this.title,
		    width: 600,
		    height: 400,
		    layout: 'border',
		    modal:true,
		    closable:true,
		    closeAction:'hide',
		    items: [me.searchPanel,
			        tree,
		            me.grid
		    ],
		    buttons:[
		             	selectBtn,
		             	{
			            	text:this.cancelText,
		            		handler: function() {
		            			me.win.hide();
		 					}
			            }
		             ]
		});

		return me.win;
	},
	searchCallbackFunc: function(filterPanel) {
		console.log(filterPanel.grid);
//		filterPanel.treepanel, filterPanel.treepanel.store.getRootNode().expandChildren(true);
//		filterPanel.treepanel.doLayout();
	}
});