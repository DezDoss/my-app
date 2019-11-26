Ext.define('AM.controller.Users', {
    extend: 'Ext.app.Controller',
    views: ['List', 'EditForm', 'SaveForm'],
    myParam: [{
        id: '',
        name: '',
        price: '',
        change: '',
        pctChange: '',
        lastChange: ''

    }],
    updateMyParam: [{
        id: '',
        name: '',
        price: '',
        change: '',
        pctChange: '',
        lastChange: ''

    }],

    init: function () {
        this.control({
            'userlist': {
                itemdblclick: this.updateButtonClick,
                itemclick: this.editUser
            },
            'button#addButton': {
                click: this.addButtonClick
            },
            'button#updateButton': {
                click: this.updateButtonClick
            },
            'button#deleteButton': {
                click: this.deleteButtonClick
            },
            'adduser button#saveButton': {
                click: this.addToButtonClick
            },
            'useredit button#saveButton': {
                click: this.updateSave
            }
        });
    },

    editUser: function (grid, record) {
        this.myParam.id = record.get('id');
        this.myParam.name = record.get('name');
        this.myParam.price = record.get('price');
        this.myParam.change = record.get('change');
        this.myParam.pctChange = record.get('pctChange');
        this.myParam.lastChange = record.get('lastChange');
        console.log(this.myParam.name)
    },

    addButtonClick: function (grid, record) {
        var view = Ext.widget('adduser');
    },

    addToButtonClick: function (btn) {
        var win = btn.up('window'),
            form = win.down('form'),
            values = form.getValues(),
            record = form.getRecord();
        console.log(values);
        var store = Ext.data.StoreManager.get('UserStore');

        if (values.name === '' || values.price === '' || values.change === '' || values.pctchange === '' || values.lastchange) {
            Ext.MessageBox.alert('Alert', 'Fields don`t filled fully')
        } else {
            Ext.Ajax.request({
                url: '/data/save',
                params: {
                    name: values.name,
                    price: values.price,
                    change: values.change,
                    pctchange: values.pctChange,
                    lastchange: values.lastChange
                },
                method: 'POST',
                scope: this,
                success: function (resp) {
                    console.log(resp.responseText);
                },
                failure: function (resp, opts) {

                }
            })

            var grid = Ext.getCmp('listId');
            grid.getStore().reload();
            win.close();
            // store.add(values);
        }
    },


    updateButtonClick: function (grid, record) {
        var view = Ext.widget('useredit');
        view.down('form').loadRecord(record);
        this.updateMyParam.id = record.get('id');
        this.updateMyParam.name = record.get('name');
        this.updateMyParam.price = record.get('price');
        this.updateMyParam.change = record.get('change');
        this.updateMyParam.pctChange = record.get('pctChange');
        this.updateMyParam.lastChange = record.get('lastChange');


    },

    updateSave: function () {
        var param = this.updateMyParam;
        Ext.Ajax.request({
            url: '/data/update',
            params: {
                id: param.id,
                name: param.name,
                price: param.price,
                change: param.change,
                pctchange: param.pctChange,
                lastchange: param.lastChange
            },
            method: 'POST',
            scope: this,
            success: function (resp) {
                console.log(resp.responseText);
            },
            failure: function (resp, opts) {

            }
        });
        Ext.MessageBox.alert('Status', param.name + ' company updated succesfully');
    },


    deleteButtonClick: function (btn, grid, record) {
        var param = this.myParam;
        Ext.MessageBox.confirm('Delete', 'Are you sure delete record where id = ' + this.myParam.id, function (btn) {
            if (btn === 'yes') {
                var store = Ext.data.StoreManager.get('UserStore');
                var grid = Ext.getCmp('listId');
                var selection = grid.getView().getSelectionModel().getSelection()[0];

                Ext.Ajax.request({
                    url: '/data/delete',
                    params: {
                        id: param.id,
                        name: param.name,
                        price: param.price,
                        change: param.change,
                        pctchange: param.pctChange,
                        lastchange: param.lastChange
                    },
                    method: 'POST',
                    scope: this,
                    success: function (resp) {
                        console.log(resp.responseText);
                    },
                    failure: function (resp, opts) {

                    }
                }),
                    Ext.MessageBox.alert('Status', selection.get('name') + ' company deleted succesfully');
                store.reload();
            }
            if (btn === 'no') {

            }
        });
    }

});