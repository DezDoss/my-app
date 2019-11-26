Ext.application({

    name: 'AM',
    appFolder: '/app',
    controllers: 'Users',
    views: ['List', 'EditForm'],
    stores: ['UserStore'],
    models: ['User'],

    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'userlist',
            }
        });
        console.log('fdafasdfadsfa');
    }
});