 Ext.onReady(function() {
		
	 	Ext.apply(Ext.form.VTypes, { 
		    'articleText': 'Статья и часть', 
		    'articleMask': /[0-9]/, 
		    'articleRe': /^[0-9]{5}$/, 
		    'article': function (v) {
		        return this.articleRe.test(v); 
		    }
		});
		
		Ext.apply(Ext.form.VTypes, { 
		    'punktText': 'пункт', 
		    'punktMask': /(А|Б|В|Г|Д|Е|а|б|в|г|д)/, 
		    'punktRe': /^[(А|Б|В|Г|Д|Е|а|б|в|г|д)]{1}$/, 
		    'punkt': function (v) {
		        return this.punktRe.test(v); 
		    }
		});
		
		Ext.apply(Ext.form.VTypes, { 
		    'articleKoText': 'Статья и часть', 
		    'articleKoMask': /[0-9]/, 
		    'articleKoRe': /^[0-9]{6}$/, 
		    'articleKo': function (v) {
		        return this.articleKoRe.test(v); 
		    }
		});		
		
		Ext.apply(Ext.util.Format, {
			validDateDiapason: function(o,v) {				
				var answ=true;				
				p=Ext.util.Format.getPrevField(o);
				if (!o.getValue()){					
					if (p.getValue()){
						answ=false;
						o.markInvalid(['Заполняйте поле']);
					}					
				}else if (!p.getValue()){
					answ=false;
					p.markInvalid(['Заполняйте поле ','или удалите:'+o.fieldLabel]);						
				}else if (p.getValue()>=o.getValue()){
					answ=false;
					p.markInvalid(['Неправильный диапазон']);									
				}				
				if (answ){
					o.clearInvalid();
					p.clearInvalid();					
				}
				return answ;
			},
			validDDoc: function(o,v) {				
				var answ=true;				
				p=Ext.util.Format.getPrevField(o);
				if (!o.getValue()){					
					if (p.getValue()){
						answ=false;
						o.markInvalid(['Заполняйте поле']);
					}					
				}else{
					if (!p.getValue()){
						answ=false;
						p.markInvalid(['Заполняйте поле ','или удалите:'+o.fieldLabel]);						
					}
				}
				if (answ){
					o.clearInvalid();
					p.clearInvalid();					
				}
				return answ;
			},
			selectInList:function(me){
	        	var answ=true;	            
				me.clearInvalid();				
	            var index = me.findRecordByDisplay(me.getValue()) || me.findRecordByValue(me.getValue());	            
	            if(index==false){
	            	me.markInvalid(['Допустимо только значении со списка']);
	            	answ=false;	            	
	            }
	            return answ;
	        },
			getPrevField: function(currentField) {
				var formPanel,
			    	fields,
			    	currentFieldIdx,
			    	prevField=null;
		    	
		    	formPanel= currentField.up('form');
		    	fields = formPanel.getForm().getFields();
		    	currentFieldIdx = fields.indexOf(currentField);
		    	
		    	if (currentFieldIdx>0){
		    		prevField = fields.items[currentFieldIdx - 1];
		    	}
		    	return prevField;		    	
			},			
			getNextField: function(currentField) {
				var formPanel,
			    	fields,
			    	currentFieldIdx,
			    	nextField=null;
		    	
		    	formPanel= currentField.up('form');
		    	fields = formPanel.getForm().getFields();
		    	currentFieldIdx = fields.indexOf(currentField);
		    	
		    	if (currentFieldIdx>0){
		    		nextField = fields.items[currentFieldIdx + 1];
		    	}
		    	return nextField;		    	
			},			
			nextField: function(currentField) {
		    	var formPanel,
			    	fields,
			    	currentFieldIdx,
			    	nextField;

				formPanel= currentField.up('form');				
				
				fields = formPanel.getForm().getFields();	           		
			
				currentFieldIdx = fields.indexOf(currentField);
			
			    if(currentFieldIdx > -1) {  	 
			    	
			    	var i=0;flag=true;
			    	do{				        
			    		i++;
			    		nextField = fields.items[currentFieldIdx + i];
			    		if (nextField){
					        if (!nextField.isDisabled() && !nextField.readOnly){
					        	currentField.setFieldStyle('background-color: #FFFFFF;background-image:none;');
					        	nextField && nextField.focus();
					        	flag=false;
					        }			    			
			    		}else{
			    			flag=false;
			    		}
			    	} while (flag)			    	
			    }
			}
		});
		
		
		Ext.override(Ext.form.Basic, {
		    loadRecord: function(record) {
		        this._record = record;
		        this.setModelValidations(record.validations);
		        return this.setValues(record.data);
		    },
		    setModelValidations: function(validations) {
		        var fields = this.getFields(), i;
		        for(i=0;i<validations.length;i++) {
		            var fieldMatch = this.findField(validations[i].field);
		            if(fieldMatch) {
		                fieldMatch.setModelFieldValidation(validations[i]);
		            }
		        }
		    }
		});
		
		Ext.override(Ext.form.field.Base, {
		    setModelFieldValidation: function(validation) {
		        this.modelValidations = Ext.isArray(this.modelValidations) ? this.modelValidations : [];
		        this.modelValidations.push(validation);
		    },
		    getModelErrors: function(value) {
		        var errors      = Ext.create('Ext.data.Errors'),
		            validations = this.modelValidations,
		            validators  = Ext.data.validations,
		            length, validation, field, valid, type, i;

		        if (validations) {
		            length = validations.length;

		            for (i = 0; i < length; i++) {
		                validation = validations[i];
		                field = validation.field || validation.name;
		                type  = validation.type;
		                valid = validators[type](validation, value);

		                if (!valid) {
		                    errors.add({
		                        field  : field,
		                        message: validation.message || validators[type + 'Message']
		                    });
		                }
		            }
		        }
		        return errors;
		    },
		    validateValue: function(value) {
		        var me = this,
		            errors = me.getErrors(value),
		            modelErrors = me.getModelErrors(value),
		            isValid = Ext.isEmpty(errors) && modelErrors.isValid();
		        if (!me.preventMark) {
		            if (isValid) {
		                me.clearInvalid();
		            }
		            else {
		                if(!modelErrors.isValid()) { 
		                	modelErrors.each(function() { 
		                			errors.push(this.message);		                	
		                		});
		                	}
		                me.markInvalid(errors);
		            }
		        }
		        return isValid;
		    }
		});
		
});