Ext.define('Ext.ux.form.RefTree', {
	extend: 'Ext.ux.form.RefTreeBase',
	requires: ['Ext.ux.form.RefTreeBase'],
	alias: ['widget.reftree'],
	url:null,
	selectFolder:false,
    selectText:'select',
    cancelText:'cancel',	
	rootText:'root',
	rootId:'root',
	config: {
		storeClass: 'Ext.data.TreeStore',
        delaultNode:'none'  // none, first. last
    },
    store:null,    
    setValueRef:function(/*SprModel*/ sprModel){
    	this._displayedText=sprModel.name;
    	this.setValue(sprModel.id);    	
    },
    setValue: function(value){
    	this._value=value;
    	if (this._value){
    		this.setDisplayValue(this._displayedText);
    	}else{
    		this.setDisplayValue(null);    		
    	}
    	this.superclass.setValue.call(this, this.getDisplayValue());
	},
	initComponent: function(){
        var me=this;
		this.title=this.fieldLabel;
		if (this.url==null){
			this.url='/';	
		}		
		this.store = Ext.create(this.storeClass, {
			autoLoad:true,
	        proxy: {
	            type: 'rest',
	            url: this.url
	        },
	        root: {
	            text: this.rootText,
	            id: this.rootId,
	            expanded: true
	        },
			listeners: {
				load: function (sender, node, records) {
                    if (me.defaultNode=='first'){
                        me.setValueRef({id:records[0].data.id,name:records[0].data.text});
                    }
				}
			}
	    }),
		this.callParent(arguments);
	}
});