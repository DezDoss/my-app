Ext.define('Ext.ux.form.ANumber', {
    extend: 'Ext.form.field.Number',    
    alias: ['widget.anumber'],
    initComponent: function(){  	
	    
    	this.callParent(arguments);
    	
	    this.on('specialkey', function(me, e){
	        if(e.getKey() == e.ENTER){	            
	        	Ext.util.Format.nextField(this);
	        }
	    }, this);
	    
	    this.on('focus', function( me, e, eOpts ){
	    	me.setFieldStyle('background-color: #FFFFCC;background-image:none;');
	    },this);
	    
	    this.on('blur', function( me, e, eOpts ){
	    	me.setFieldStyle('background-color: #FFFFFF;background-image:none;');
	    },this);
	    
	}
});