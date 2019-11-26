Ext.define('AM.model.User', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',  type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'price', type: 'int'},
        {name: 'change', type: 'int'},
        {name: 'pctChange', type: 'int'},
        {name: 'lastChange', type: 'Date'}
    ]
});
