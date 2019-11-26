Ext.define('AM.view.EditForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.useredit',

    title: 'Edit User',
    layout: 'fit',
    autoShow: true,

    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                items: [{
                    xtype: 'numberfield',
                    name: 'id',
                    fieldLabel: 'ID',
                    id: 'id'
                },
                    {
                        xtype: 'textfield',
                        name: 'name',
                        fieldLabel: 'Name',
                        id: 'name'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'price',
                        fieldLabel: 'price',
                        id: 'price'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'change',
                        fieldLabel: 'Change',
                        id: 'change'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'pctChange',
                        fieldLabel: '% Change',
                        id: 'pctChange'
                    },
                    {
                        xtype: 'datefield',
                        name: 'lastChange',
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
                id: 'saveButton'
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