/**
 * Created by s.begimov on 07.01.2016.
 */
Ext.ns('Ext.ux.grid');
Ext.ux.grid.NumberOrBlankColumn = Ext.extend(Ext.grid.NumberColumn, {
    blankValue: null,
    blankValueRendered: '[null]',
    constructor: function(cfg){
        Ext.ux.grid.NumberOrBlankColumn.superclass.constructor.call(this, cfg);
        var blankValue = this.blankValue
        var blankValueRendered = this.blankValueRendered
        var renderer = this.renderer;
        this.renderer = function(value){
            return value===blankValue ? blankValueRendered : renderer.apply(this, arguments);
        }
    }
});
Ext.ux.grid.BooleanOrBlankColumn = Ext.extend(Ext.grid.BooleanColumn, {
    blankValue: null,
    blankValueRendered: '[null]',
    constructor: function(cfg){
        Ext.ux.grid.BooleanOrBlankColumn.superclass.constructor.call(this, cfg);
        var blankValue = this.blankValue
        var blankValueRendered = this.blankValueRendered
        var renderer = this.renderer;
        this.renderer = function(value){
            return value===blankValue ? blankValueRendered : renderer.apply(this, arguments);
        }
    }
});
Ext.grid.Column.types['numberorblankcolumn'] = Ext.ux.grid.NumberOrBlankColumn;
Ext.grid.Column.types['booleanorblankcolumn'] = Ext.ux.grid.BooleanOrBlankColumn;
