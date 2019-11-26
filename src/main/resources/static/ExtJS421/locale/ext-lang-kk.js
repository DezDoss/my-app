/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * Russian translation
 * By ZooKeeper (utf-8 encoding)
 * 6 November 2007
 */
Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames =  ["Қаңтар", "Ақпан", "Наурыз", "Сәуір", "Мамыр", "Маусым", "Шілде", "Тамыз", "Қыркүйек", "Қазан", "Қараша", "Желтоқсан"];

        Ext.Date.shortMonthNames =  ["Қаңт", "Ақп", "Наур", "Сәу", "Мам", "Маус", "Шілде", "Тамыз", "Қырк", "Қазан", "Қараша", "Желт"];

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.shortMonthNames[month];
        };

        Ext.Date.monthNumbers = {
            'Янв': 0,
            'Фев': 1,
            'Мар': 2,
            'Апр': 3,
            'Май': 4,
            'Июн': 5,
            'Июл': 6,
            'Авг': 7,
            'Сен': 8,
            'Окт': 9,
            'Ноя': 10,
            'Дек': 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Жексенбі", "Дүйсенбі", "Сейсенбі", "Сәрсенбі", "ейсенбі", "Жұма", "Сенбі"];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u0440\u0443\u0431',
            // Russian Ruble
            dateFormat: 'd.m.Y'
        });
    }
});

Ext.define("Ext.locale.ru.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.ru.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "Таңдалған қатарлар саны {0}"
});

Ext.define("Ext.locale.ru.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Осы қосымша бетті жабу"
});

Ext.define("Ext.locale.ru.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "Бұл өрістегі мәні дұрыс емес"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.ru.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Жүктеу..."
});

Ext.define("Ext.locale.ru.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Бүгін",
    minText: "Бұл дата минималды датадан ерте",
    maxText: "Бұл дата максималды датадан кеш",
    disabledDaysText: "Қолжетімсіз",
    disabledDatesText: "Қолжетімсіз",
    nextText: 'Келесі ай (Control+оң жаққа)',
    prevText: 'Алдыңғы ай (Control+сол жаққа)',
    monthYearText: 'Айды таңдау (Control+жоғары/төмен жылды таңдау үшін)',
    todayTip: "{0} (Пробел)",
    format: "d.m.y",
    startDay: 1
});

Ext.define("Ext.locale.ru.picker.Month", {
    override: "Ext.picker.Month",
    okText: "&#160;OK&#160;",
    cancelText: "Болдырмау"
});

Ext.define("Ext.locale.ru.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "бет",
    afterPageText: " барлығы {0}",
    firstText: "Бірінші бет",
    prevText: "Алдыңғы бет",
    nextText: "Кейінгі бет",
    lastText: "Сонғы бет",
    refreshText: "Жаңарту",
    displayMsg: "{0} қатардан {1} қатарға дейінгілер , Барлығы {2}",
    emptyMsg: 'Көрсетуге мәлемет жоқ'
});

Ext.define("Ext.locale.ru.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "Бұл өрістің минималды ұзындығы {0}",
    maxLengthText: "Бұл өрістің максималды ұзындығы {0}",
    blankText: "Бұл өрісті толтыру міндетті",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.ru.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "Бұл өрістің мәні {0} санынан аз болуы мүмкін емес",
    maxText: "Бұл өрістің мәні {0} санынан көп болуы мүмкін емес {0}",
    nanText: "{0} сан емес",
    negativeText: "мән теріс болмау керек"
});

Ext.define("Ext.locale.ru.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Недоступно",
    disabledDatesText: "Недоступно",
    minText: "Бұл дата максималды датадан ерте {0}",
    maxText: "Бұл дата максималды датадан кеш {0}",
    invalidText: "{0} дұрыс дата болып табылмайды- дата {1} форматында көрсетілуі қажет",
    format: "d.m.y",
    altFormats: "d.m.y|d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
});

Ext.define("Ext.locale.ru.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Жүктеу..."
    });
});

Ext.define("Ext.locale.ru.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'Бұл өрісте "user@example.com" форматында электрондық почтаның мекенжайы болуы қажет"',
    urlText: 'Бұл өрісте  "http:/' + '/www.example.com" форматында  URL болуы қажет',
    alphaText: 'Бұл өрісте тек латын әріптері  "_" астын сызу символы болу қажет ',
    alphanumText: 'Бұл өрісте тек латын әріптері, сандар және "_" астын сызу символы болу қажет'
});

Ext.define("Ext.locale.ru.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Өтінеміз, мекенжайды енгізіңіз:'
}, function() {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Жартылай қалың (Ctrl+B)',
                text: 'Белгіленген мәтінге жартылай қалың жазылуды қолдану',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Курсив (Ctrl+I)',
                text: 'Белгіленген мәтінге курсивті жазылуды қолдану.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Астын сызу (Ctrl+U)',
                text: 'Белгіленген мәтінге астын сызуды жазылуды қолдану.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Әріптің көлемін үлкейту',
                text: 'Әріптің көлемін үлкейту.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Әріптің көлемін кішірейту',
                text: 'Әріптің көлемін кішірейту.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Толтыру',
                text: 'Белгіленген мәтін немесе абзац үшін фонның түсін өзгерту.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Мәтіннің түсі',
                text: 'Мәтіннің түсін өзгерту.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Солға',
                text: 'Сол жақ бойынша мәтінді тегістеу.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Отраға',
                text: 'Орталық бойынша мәтінді тегістеу.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Оңға',
                text: 'Оң жақ бойынша мәтінді тегістеу.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Таңба',
                text: 'Таңбаланған тізімді бастау.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Нөмірлеу',
                text: 'Нөмірленген тізімді бастау.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Сілтеме',
                text: 'Белгіленген мәтіннен сілтеме жасау.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Бастапқы кодқа',
                text: 'Бастапқы кодқа ауысу.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

Ext.define("Ext.locale.ru.form.Basic", {
    override: "Ext.form.Basic",
    waitTitle: "Өтінеміз, күте тұрыңыз..."
});

Ext.define("Ext.locale.ru.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Өсу бойынша сұрыптау",
    sortDescText: "Азаю бойынша сұрыптау",
    lockText: "Бағанды бекіту ",
    unlockText: "Бағанды бекітуді алып тастау",
    columnsText: "Бағандар"
});

Ext.define("Ext.locale.ru.grid.GroupingFeature", {
    override: "Ext.grid.GroupingFeature",
    emptyGroupText: '(Бос)',
    groupByText: 'Осы өріс бойынша топтау',
    showGroupsText: 'Топтар бойынша көрсету'
});

Ext.define("Ext.locale.ru.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Аталуы",
    valueText: "Мәні",
    dateFormat: "d.m.Y"
});

Ext.define("Ext.locale.ru.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "OK",
        cancel: "Болдырмау",
        yes: "Иә",
        no: "Жоқ"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.ru.Component", {	
    override: "Ext.Component"
});

