Ext.define('Ext.ux.form.GridSelect', {
		extend: 'Ext.grid.Panel',
		alias: ['widget.gridselect'],
	    selectText:'select',
	    cancelText:'cancel',
		closeText:'close',
		padding:'5,5,5,5',
		height: 200,
		winWidth: 600,
		winHeight: 400,
		itemStore:null,
	    columns: [
	        {header: "Код",  dataIndex: 'code'},
	        {header: "Наименование", dataIndex: 'name',flex:1}
		],		
	    listeners:{
			'selectionchange': function(view, selections, options) {						    
	        	this.setCurrent(selections[0]);
	        },
			//deselect( Ext.selection.RowModel this, Ext.data.Model record, Number index, Object eOpts )
			'deselect': function(rowModel,record,index,eOpts) {		    
	        	this.setCurrent(null);
	        }			
		},
		setCurrent:function(record){
			this.current=record;
			if (record==null){
				this.down('#btnRemove').disable();				
			}else{
				this.down('#btnRemove').enable();	
			}			
		},
		setValue:function(list){
			Ext.Array.forEach(list,function(item){
				this.store.add(this.itemStoreObj.getById(item));
			},this);			
		},
	    getValue: function(){
			answ='';
	    	this.store.each(
				function(record){
					if (answ!=''){
						answ+=',';
					}
					answ+=record.get('code');
				}
			);
			return answ;
	    },
		removeRecord:function(){
			this.store.remove([this.current]);
		},
		openWin:function(){
			win=Ext.create('Ext.ux.form.GridSelectWin',{
				title:this.title,
				store:this.itemStore,
				storeSelect:this.store,
				width:this.winWidth,
				height:this.winHeight,
			    selectText:this.selectText,
			    cancelText:this.cancelText,
				closeText:this.closeText,
			    listeners:{
			        scope:this,
					'selectItem': function(record){
						if (this.store.getById(record.get('code')) == null) {
							this.store.add(record);
						}else{
							this.store.remove(record);				
						}						
					}						
				}				
			});
			win.show();
		},	
	    tbar:{
			xtype : 'toolbar',
			dock : 'top',
			items : [{
				text : 'Добавить',
				disabled:this.readOnly,			
				handler: function() {
					this.up('gridselect').openWin();
				}
			},{
				text : 'Удалить',
				itemId:'btnRemove',
				disabled:true,
				handler: function() {						
					this.up('gridselect').removeRecord();
				}
			}]
		},
		initComponent: function(){
			this.itemStoreObj=Ext.data.StoreManager.lookup(this.itemStore);
			this.store = Ext.create('Ext.data.Store', {
			    model: 'ARM.model.SRef'
			});
			this.callParent(arguments);
		}	    
	}
);
