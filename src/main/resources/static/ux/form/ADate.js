Ext.define('Ext.ux.form.ADate', {
    extend: 'Ext.form.field.Date',    
    alias: ['widget.adate'],
    initComponent: function(){
    	
	    this.callParent(arguments);
	    this.on('specialkey', function(me, e){      
	    	if(e.getKey() == e.ENTER){	            
                if (!me.isExpanded) {
                	//if (this.getValue()==null){
                	//	me.onTriggerClick();
                	//}else{
                		me.nextField();
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
	    this.on('change', this.onChange, this);
	},
    onCollapse: function() {
    	this.nextField();
    },
    nextField:function(){
    	Ext.util.Format.nextField(this);    	
    },
    //plugins: new Ext.ux.plugin.FormatDate(),
	date: function(value) {
		var valueStr = ''+value;
		var d = valueStr.replace(/\//g, '').replace(/[^0-9]/g, '');
		if (d != '' && d.length == 8) {					
			return d.substr(0, 2) + '/' + d.substr(2, 2) + '/' + d.substr(4, 4);					
		} else {
			return d;
		}
	},
	onChange: function() {		
		d=this.date(this.getValue());				
		if (d.length==10){
			this.setValue(d);
			this.nextField();
		}
	}

});