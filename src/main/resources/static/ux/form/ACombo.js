Ext.define('Ext.ux.form.ACombo', {
    extend: 'Ext.form.field.ComboBox',    
    alias: ['widget.acombo'],
    initComponent: function(){    	
	    this.callParent(arguments);
   
	    this.on('specialkey', function(me, e){
	    	if(e.getKey() == e.ENTER){	    			
	    		if (!me.isExpanded) {
	    			//if (this.getValue()==null){
	    			//	me.onTriggerClick();
	    			//}else{
	    				this.nextField();
	    			//}	    				
	    		}
	        }
	    }, this);
	    this.on('focus', function( me, e, eOpts ){
	    	me.setFieldStyle('background-color: #FFFFCC;background-image:none;');
	    },this);
	    this.on('blur', function( me, e, eOpts ){
	    	me.setFieldStyle('background-color: #FFFFFF;background-image:none;');
	    },this);	
	},
    nextField:function(){    	
    	Ext.util.Format.nextField(this);
    },
    onCollapse: function() {
    	this.nextField();
    }
});