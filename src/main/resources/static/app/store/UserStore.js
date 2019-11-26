Ext.define('AM.store.UserStore', {
    extend: 'Ext.data.Store',
    model: 'AM.model.User',
    proxy: {
        type: 'ajax',
        url: 'http://localhost:8080/data/company'
    },
    reader: {
        type: 'json',
        root: 'users',
        successProperty: 'success'
    },
    autoLoad: true
});



