/**
 * Created by s.begimov on 22.09.2015.
 */
Ext.define('Ext.ux.form.FilteredTreeWin', {
    extend: 'Ext.window.Window',
    config:{
        selectText:'Выбрать',
        cancelText:'Отмена',
        selectFolder:true,
        treeColumn: [],
        filterFields: [],
		searchFieldName:'name',
		searchEmptyText: 'Поиск по наименованию',
		store:null,
		filterStore: null,
    },
    width: 900,
    height: 400,
    layout: 'border',
    modal:true,
    navigatorVisible: true,
    closable:true,
    closeAction:'hide',
    _sField:null,
    _sText:null,
    _sNumber:null,
    _sTotal:null,
    _sRec:null,
//    model:null,

    setPath:function(tree,fullpath){
        var fp=fullpath;
        var s=fp.split('/');
        var s1='/root';
        for(var i=0;i< s.length-1;++i){
            s1+='/'+s[i]
        }
        tree.expandPath(s1, null, null,
            function(success, node) { // analyse method execution
                var record = this.getStore().getNodeById(s[s.length-1]);
                this.selectPath(record.getPath());

            }, tree);

    },
    initComponent: function(){

        var me=this;

//        this.modelFactory();
//        this.storeFactory()

        this.selectBtn=Ext.create('Ext.button.Button',{
            text:this.selectText,
            disabled:true,
            scope:this,
            handler: function() {
                this.fireEvent('customEvent',{select:this.tree.selected});
            }
        });

 

        this.searchPriv=Ext.create('Ext.button.Button',{
            text:'<',
            disabled:true,
            handler: function() {
                --this._sNumber;
                this.searchNext.setDisabled(false);
                if (this._sNumber==0){
                    this.searchPriv.setDisabled(true);
                }
                this.searchInfo.setText(Ext.String.format('{1} из {0} найденных',this._sTotal,this._sNumber+1));
                this.setPath(tree,this._sRec[this._sNumber].path);
            }
        });

        this.searchNext=Ext.create('Ext.button.Button',{
            text:'>',
            disabled:false,
            scope:this,
            handler: function() {
                if (this._sRec==null || this._sRec.length==0 || this.searchFields.getValue()!=this._sField || this.searchText.getValue()!=this._sText){

                    Ext.Ajax.request({
                        url: this.url+'/find',
                        method:'GET',
                        params: {
                            sField: me.searchFields.getValue(),
                            sText:  me.searchText.getValue()
                        },
                        scope:this,
                        success: function(response, opts) {

                            this._sRec = Ext.decode(response.responseText);
                            this._sField=this.searchFields.getValue();
                            this._sText=this.searchText.getValue();
                            this._sTotal= this._sRec.length;

                            if (this._sTotal>0){
                                this._sNumber=0;
                                this.searchInfo.setText(Ext.String.format('{1} из {0} найденных',this._sTotal,this._sNumber+1));
                                this.setPath(tree,this._sRec[this._sNumber].path);
                            }else{
                                this.searchInfo.setText(Ext.String.format('Не найден'));
                            }
                        },
                        failure: function(response, opts) {
                            alert('server-side failure with status code ' + response.status);
                        }
                    });

                }else{
                    ++this._sNumber;
                    this.searchPriv.setDisabled(false);
                    if (this._sNumber+1==this._sTotal){
                        this.searchNext.setDisabled(true);
                    }
                    this.searchInfo.setText(Ext.String.format('{1} из {0} найденных',this._sTotal,this._sNumber+1));
                    this.setPath(tree,this._sRec[this._sNumber].path);
                }
            }
        });

		this.topToolbar = Ext.create('Ext.Toolbar', {
			dock : 'top'
		});

//        this.searchInfo=Ext.create('Ext.toolbar.TextItem',{
//            text:''
//        });
		var storeInstance = this.getFilterStore() ? Ext.data.StoreManager.get(this.getFilterStore()) : Ext.data.StoreManager.get(this.getStore());
		this.filter = Ext.create('Ext.ux.form.ASearchPanel', {
			filterToolbar: this.topToolbar,
        	store : storeInstance,
			searchFieldName: this.searchFieldName,
			searchEmptyText: this.searchEmptyText,
        	region: 'north',
        	searchCallback: me.searchCallback,
        	filterBtnAlign: 'left',
        	filterLayout: {
        		type: 'table',
        		columns: 3,
        		tableAttrs: {
        		    style: {
        		        width: '100%',
        		    }
        		}
        	},
        	hidden: false,
        	fields: this.filterFields
		});

		this.tree=Ext.create('Ext.tree.Panel', {
            rootVisible: false,
            border: false,
            useArrows: true,
            store: this.getStore(),
            selected:null,
            region: 'center',
            columns: this.getTreeColumn(),
            dockedItems: [{
                              xtype: 'toolbar',
                              dock: 'bottom',
                              hidden: !this.navigatorVisible,
                              items: [
                                  me.searchPriv,
                                  me.searchNext,
                                  '->',
                                  me.searchInfo

                              ]
                          }
                      ],
            listeners: {
                'itemclick': function (me1, record, item, index, e, eOpts) {
                    this.selected=record.raw;
                    if (me.selectFolder) {
                        me.selectBtn.setDisabled(false);
                    } else {
                        if (record.raw.leaf) {
                            me.selectBtn.setDisabled(false);
                        } else {
                            me.selectBtn.setDisabled(!record.raw.leaf);
                        }
                    }
                }
            },

        });

        Ext.apply(this, {
                items: [this.filter, this.tree],
                buttons:[
                    me.selectBtn,
                    {
                        text:this.cancelText,
                        handler: function() {
                            me.hide();
                        }
                    }
                ],
        		dockedItems: [this.topToolbar]
            }
        );

        this.callParent(arguments);

    },
    searchCallback : function(me, records, options, success){
    	
    }
});