Ext.define('Ext.ux.form.AddressTree', {
	extend: 'Ext.ux.form.RefTreeBase',
	requires: ['Ext.ux.form.RefTreeBase','ARM.model.rest.Address'],
	alias: ['widget.addresstree'],
	url:null,
    selectText:'select',
    cancelText:'cancel',
    emptyText: 'Выберите адрес',
	rootText:'РК',
	rootId:'root',
	selectFolder:true,
    store:null,
    setValue: function(value){    	
    	this._value=value;
    	if (this._value){
			var organModel = Ext.ModelManager.getModel('ARM.model.rest.Address');
			organModel.load(value,{
				scope:this,
			    success: function(organ){    		    	
					if (organ!='null'){
    		    		this.setDisplayValue(organ.get("name"));
    		    	}else{
    		    		this.setDisplayValue(this._value);
    		    	}    		    	
    		    	this.superclass.setValue.call(this, this.getDisplayValue());
				}
			});
    	}else{
    		this.setDisplayValue(null);
    		this.superclass.setValue.call(this, this.getDisplayValue());
    	}
	},	
	initComponent: function(){
		this.title=this.fieldLabel;
		if (this.url==null){
			this.url='/UDOServices/AddressResource';	
		}		
		this.store = Ext.create('Ext.data.TreeStore', {
	        proxy: {
	            type: 'rest',
	            url: this.url
	        },
	        root: {
	            text: this.rootText,
	            id: this.rootId,
	            expanded: true
	        }
	    }),
		this.callParent(arguments);
	}
});