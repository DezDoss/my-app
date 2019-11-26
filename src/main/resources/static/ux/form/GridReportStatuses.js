Ext.define('Ext.ux.form.GridReportStatuses', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridreportstatuses',
    config:{
        exportLink: null
    },
    width:400,
    height: 350,
    frame: false,
    viewConfig: {
        markDirty: false
    },
    loadAction:null,
    selected: null,
    setSelected: function(rec){
        this.selected = rec;
    },
    getSelected: function(){
        return this.selected;
    },

    initComponent: function() {
        var me = this;

        this.loadAction=new Ext.Action({
            tooltip: 'Выгрузить',
            tooltipType: 'title',
            icon: '/ExtJS/ux/css/images/export-icon.png',
            handler: function () {
                this.setDisabled(true);
                var record = me.getSelected();
                var idDocument=record.data.id;
                window.open(me.exportLink+"?id="+idDocument);
            },
            disabled: true
        });

        Ext.apply(this, {
            listeners:{
                itemClick: this.onDownloadsGrid
            },
            selType: 'rowmodel',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            tooltip: 'Обновить',
                            tooltipType: 'title',
                            icon: '/ExtJS/ux/css/images/update.png',
                            handler: function(){
                                me.getStore().load();
                            }
                        },
                        '-',
                        this.loadAction
                    ]
                }
            ]
        });
        this.callParent();
    },
    onDownloadsGrid:function(me, record){
        if(record.data.status == "success"){
            this.loadAction.setDisabled(false);
            this.setSelected(record);
        } else {
            this.loadAction.setDisabled(true);
        }
    }

});