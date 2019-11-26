Ext.define('Ext.ux.form.GridSelectWin', {
		extend: 'Ext.window.Window',
		layout: 'fit',
	    bodyPadding: 0,
	    modal:true,
		store:null,
		storeSelect:null,
	    selectText:'select',
	    cancelText:'cancel',
		closeText:'close',
		onSelectItemCurrent: function() {
			this.onSelectItem(this.current);
	    },		
	    onSelectItem: function(/*Record*/ record) {
	        this.fireEvent('selectItem', record);			
	    },				
		initComponent: function(){
			this.addEvents('selectItem');			
			var me= this; 
			this.myGrid=Ext.create('Ext.grid.Panel', {
			    border:true,			    
				store: this.store,
				viewConfig: {
			        getRowClass: function(record, index) {
						var c = record.get('code');			            
						if (me.storeSelect.findRecord('code',c)) {
			                return 'price-rise';
			            } else {
			                return '';
			            }
			        }
    			},	
			    columns: [
			        {header: "Код",  dataIndex: 'code',tdCls: 'x-change-cell'},
			        {header: "Наименование", dataIndex: 'name',flex:1,tdCls: 'x-change-cell'}
				],	
			    listeners:{
			        scope:this,
					'selectionchange': function(view, selections, options) {		    
			        	this.current=selections[0];
			        },
					'itemdblclick': function(view,record,item,index, e, eOpts ){
						//this.hide();
						this.onSelectItem(record);
						this.myGrid.getView().refresh();			
																				
					}
			    }	
			});
						
			Ext.apply(this, {
				items: [this.myGrid],
			    buttons:[
					/*
	             	{
		            	text:this.selectText,
	            		handler: function() {
	            			this.up('window').hide();
							this.up('window').onSelectItemCurrent();
	 					}
		            },
		            */
	             	{
		            	text:this.closeText,						
	            		handler: function() {
							this.up('window').hide();	
	 					}
		            }
	             ]
			});
			this.callParent(arguments);
		}	    
	}
);
