Ext.define('AM.view.SaveForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.adduser',
    title: 'Add User',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        fieldLabel: 'Name',
                        id: 'name'
                    },
                    {
                        xtype: 'numberfield',
                        name : 'price',
                        fieldLabel: 'price',
                        id: 'price'
                    },
                    {
                        xtype: 'numberfield',
                        name : 'change',
                        fieldLabel: 'Change',
                        id: 'change'
                    },
                    {
                        xtype: 'numberfield',
                        name : 'pctChange',
                        fieldLabel: '% Change',
                        id: 'pctChange'
                    },
                    {
                        xtype: 'datefield',
                        name : 'lastChange',
                        fieldLabel: 'Last Change',
                        id: 'lastChange'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save',
                itemId: 'saveButton'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});