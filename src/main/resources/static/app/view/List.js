Ext.define('AM.view.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userlist',
    model: 'User',
    store: 'UserStore',
    title: 'All Users',
    id: 'listId',
    // initComponent: function () {

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                text: 'Add',
                itemId: 'addButton'
            },
                {
                    xtype: 'button',
                    text: 'Update',
                    itemId: 'updateButton'
                },
                {
                    xtype: 'button',
                    text: 'Delete',
                    itemId: 'deleteButton'
                }]
        }
    ],

    columns: [
        {header: 'id', dataIndex: 'id', flex: 1},
        {header: 'name', dataIndex: 'name', flex: 1},
        {header: 'price', dataIndex: 'price', flex: 1},
        {header: 'change', dataIndex: 'change', flex: 1},
        {header: 'pctChange', dataIndex: 'pctChange', flex: 1},
        {header: 'lastChange', dataIndex: 'lastChange', flex: 1}
    ]
    //         this.callParent(arguments);
    // },


});

