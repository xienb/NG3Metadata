///<reference path="../../extjs/ext-all-debug.js">
Ext.useShims = true;
Ext.define('Ext.ng.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.ngToolbar', //����,��ͨ������xtype����,����ͨ��Ext.widget()��������         
    pageSize: 20,
    itemWidth: 60,
    rightName: "", //Ȩ������
    ngbuttons: [],   //��ť
    //��ѡ��ť
    candidateButtons: [{ id: "add", text: "����", width: this.itemWidth, iconCls: "icon-New" },
                               { id: "edit", text: "�޸�", width: this.itemWidth, iconCls: "icon-Edit" },
                               { id: "delete", text: "ɾ��", width: this.itemWidth, iconCls: "icon-delete" },
                               { id: "view", text: "�鿴", width: this.itemWidth, iconCls: "icon-View" },
                               { id: "save", text: "�ύ", width: this.itemWidth, iconCls: "icon-save" },
                               { id: "query", text: "��ѯ", width: this.itemWidth, iconCls: "icon-Query" },
                               { id: "refresh", text: "ˢ��", width: this.itemWidth, iconCls: "icon-Refresh" },
                               { id: "clear", text: "���", width: this.itemWidth, iconCls: "icon-Clear" },
                               { id: "copy", text: "���ݿ���", width: this.itemWidth, iconCls: "icon-Copy" },
                               { id: "import", text: "����", width: this.itemWidth, iconCls: "icon-Import" },
                               { id: "export", text: "����", width: this.itemWidth, iconCls: "icon-Export" },
                               { id: "create", text: "����", width: this.itemWidth, iconCls: "icon-create" },
                               { id: "verify", text: "���", width: this.itemWidth, iconCls: "icon-Verify" },
                               { id: "valid", text: "����", width: this.itemWidth, iconCls: "icon-Valid" },
                               { id: "unvalid", text: "ȥ����", width: this.itemWidth, iconCls: "icon-Unvalid" },
                               { id: "addrow", text: "����", width: this.itemWidth, iconCls: "icon-AddRow" },
                               { id: "deleterow", text: "ɾ��", width: this.itemWidth, iconCls: "icon-DeleteRow" },
                               { id: "assign", text: "����", width: this.itemWidth, iconCls: "icon-Assign" },
                               { id: "config", text: "����", width: this.itemWidth, iconCls: "icon-Setup" },
                               { id: "compute", text: "����", width: this.itemWidth, iconCls: "icon-Compute" },
                               { id: "location", text: "��λ", width: this.itemWidth, iconCls: "icon-Location" },
                               { id: "subbill", text: "�¼�ҵ��", width: this.itemWidth, iconCls: "icon-Backbill" },
                               { id: "relabill", text: "��ص���", width: this.itemWidth, iconCls: "icon-Relabill" },
                               { id: "check", text: "����", width: this.itemWidth, iconCls: "icon-Check" },
                               { id: "checkview", text: "����鿴", width: this.itemWidth, iconCls: "icon-CheckView" },
                               { id: "history", text: "������ʷ", width: this.itemWidth, iconCls: "icon-History" },
                               { id: "ok", text: "ȷ��", width: this.itemWidth, iconCls: "icon-Confirm" },
                               { id: "cancel", text: "ȡ��", width: this.itemWidth, iconCls: "icon-Cancel" },
                               { id: "help", text: "����", width: this.itemWidth, iconCls: "icon-Help" },
                               { id: "print", text: "��ӡ", width: this.itemWidth, iconCls: "icon-Print" },
                               { id: "exit", text: "�˳�", width: this.itemWidth, iconCls: "icon-Exit" },
                               { id: "back", text: "����", width: this.itemWidth, iconCls: "icon-back" },
                               { id: "editrow", text: "�޸�", width: this.itemWidth, iconCls: "icon-EditRow" },
                               { id: "first", text: "��", width: this.itemWidth, iconCls: "icon-Firstrec" },
                               { id: "pre", text: "ǰ", width: this.itemWidth, iconCls: "icon-PriorRec" },
                               { id: "next", text: "��", width: this.itemWidth, iconCls: "icon-NextRec" },
                               { id: "last", text: "β", width: this.itemWidth, iconCls: "icon-LastRec" },
                               { id: "deal", text: "����", width: this.itemWidth, iconCls: "icon-Operate" },
                               { id: "note", text: "���±�", width: this.itemWidth, iconCls: "icon-Note" },
                               { id: "orgselect", text: "��֯ѡ��", width: this.itemWidth, iconCls: "icon-Boo" },
                               { id: "addbrother", text: "ͬ������", width: this.itemWidth, iconCls: "icon-AddBrother" },
                               { id: "addchild", text: "�¼�����", width: this.itemWidth, iconCls: "icon-AddChild" },
                               { id: "attachment", text: "����", width: this.itemWidth, iconCls: "icon-Attachment" },
                               { id: "hide", text: "����", width: this.itemWidth, iconCls: "icon-Close" },
                               { id: "close", text: "�ر�", width: this.itemWidth, iconCls: "icon-Close", handler: function () { $CloseTab(); } }
                               ],

    initComponent: function () {
        this.border = false;
        this.height = 26;
        this.minSize = 26;
        this.maxSize = 26;

        //Ext.Toolbar.superclass.initComponent.call(this);
        this.callParent();

        //this.on("beforerender", this.beforeRender); //����Ȩ��

        this.createButton(); //������ť        
    },

    createButton: function () {
        for (var i = 0; i < this.ngbuttons.length; i++) {
            var button = this.ngbuttons[i];

            if (button === '->') {
                this.add({ xtype: 'tbfill' });
                continue;
            }
            else if (button === '-') {
                this.add({ xtype: 'tbseparator' });
                continue;
            }

            var stdbutton;
            if (typeof (button) == "object") {

                if (button.groupitem) {//����������
                    var menu = Ext.create('Ext.menu.Menu', {});

                    for (var j = 0; j < button.items.length; j++) {                       
                       
                        var subbotton = button.items[j];
                        if (subbotton.id) {
                            tempbutton = this.findButton(subbotton.id);
                            if (tempbutton) {
                                if (subbotton.text) {
                                    tempbutton.text = subbotton.text;
                                }
                                if (subbotton.iconCls) {
                                    tempbutton.iconCls = subbotton.iconCls;
                                }

                                menu.add(tempbutton);
                            }
                            else {//object,�Զ���İ�ť
                                if (typeof (subbotton) == "object") {
                                    var tempbutton = new Object();
                                    if (subbotton.text) {                                        
                                        tempbutton.text = subbotton.text;
                                    }
                                    if (subbotton.iconCls) {
                                        tempbutton.iconCls = subbotton.iconCls;
                                    }
                                    menu.add(tempbutton);
                                }
                            }
                        }
                        else {
                            tempbutton = this.findButton(subbotton); //ngbotton��id
                            menu.add(tempbutton);
                        }                       
                    }
                    button.menu = menu;
                    this.add(button);
                }
                else {
                    if (button.id) {
                        stdbutton = this.findButton(button.id);
                        if (stdbutton) {
                            if (button.text) {
                                stdbutton.text = button.text;
                            }
                            if (button.iconCls) {
                                stdbutton.iconCls = button.iconCls;
                            }
                        }
                    }

                    if (stdbutton) {
                        this.add(stdbutton);
                    }
                    else {
                        this.add(button); //��׼��ť�б�û�ҵ�
                    }
                }
            }
            else {
                stdbutton = this.findButton(button); //�ַ���

                if (stdbutton) {
                    this.add(stdbutton);
                }
            }

        }
    },

    findButton: function (buttonid) {
        var items = this.candidateButtons;
        for (var i = 0; i < items.length; i++) {
            var btn = items[i];

            if ((buttonid === btn.id) || ((btn.id == undefined) && (buttonid === btn))) {
                return btn;
            }
        }
    },

    beforeRender: function (toolbar) {
        //alert(this.items.keys.toString());

        var me = this;

        //

        if (!toolbar) return; //����¼��ᱻ��������


        //        //��ťȨ�޿���
        //        Ext.Ajax.request({
        //            url: 'SendList/GetRight', //?rightname=' + me.rightName,
        //            params: { rightname: me.rightName },
        //            success: function (response, opts) {

        //                var disablebtn = response.responseText;

        //                var arr = disablebtn.split(',');
        //                for (var i = 0; i < arr.length; i++) {
        //                    var btn = me.items.get(arr[i]);
        //                    if (btn) {
        //                        if (btn.disable) {
        //                            btn.disable();
        //                        }
        //                    }
        //                    else {
        //                        btn = Ext.getCmp(arr[i]); //��������İ�ť
        //                        if (btn.disable) {
        //                            btn.disable();
        //                        }
        //                    }

        //                    //this.get(arr[i]).disable();
        //                }
        //            }
        //        });

    },

    doLoad: function (start) {
        this.AF.OpenLoadMask(500);
        this.load.params = this.load.params || {};
        this.load.params.rows = this.pageSize;
        this.load.params.startRow = start;
        Ext.applyIf(this.load.params, { custom: this.AF.getCustom() });
        var oldsecc = this.load.success;

        this.load.success = function (res, opts) {

            oldsecc(res, opts);
            this.AF.CloseLoadMask();
            var obj = Ext.decode(res.responseText);
            if (obj.totalRows)
                this.AF.totalCount = obj.totalRows;
            else if (obj.Record)
                this.AF.totalCount = obj.Record.length;

            //            this.onLoad(this.load.params)
        } .createDelegate(this);

        if (this.fireEvent('beforechange', this, this.load.params) !== false) {
            Ext.Ajax.request(this.load);
        }
    },

    get: function (id) {
        var button = this.items.get(id);

        if (!button) {
            button = Ext.getCmp(id);
        }
        return button;
    }

})

Ext.define('Ext.ng.FormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ngFormPanel', //����,��ͨ������xtype����,����ͨ��Ext.widget()��������         
    initComponent: function () {
        this.callParent();
        var me = this;
        var otype = me.otype;

        //form��Ϊֻ��
        if (otype === 'view') {
            var fields = me.getForm().getFields().items;
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                if (field.setReadOnly) {
                    field.setReadOnly(true);
                }
            }
        }


    },
    getFormData: function () {
        var me = this;
        var json = GetExtJsFormData(me, me.buskey, me.otype);

        return json;
    },
    isValid: function () {
        var me = this;
        var valid = true;

        var fields = me.getForm().getFields().items;
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            //
            if (field.isValid() == false) {
                valid = false;
                //alert('��' + field.fieldLabel + '�����벻�Ϸ�:' + field.activeErrors);

                //NG2.Msg.Error('[' + field.fieldLabel + ']���벻�Ϸ�:' + field.activeErrors);

                Ext.create('Ext.ng.MessageBox').Error('[' + field.fieldLabel + ']���벻�Ϸ�:' + field.activeErrors);

                field.focus();
                break;
            }
        }

        return valid;
    }
})

Ext.define('Ext.ng.QueryPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ngQueryPanel',
    region: 'north',
    autoHeight: true,
    frame: true,
    border: false,
    bodyStyle: 'padding:10px',
    //layout: 'form',
    //hidden: true,
    fieldDefaults: {
        //labelAlign: 'right', //'top',
        labelWidth: 80,
        anchor: '100%',
        margin: '0 10 5 0',
        msgTarget: 'side'
    },
    defaults: {
        anchor: '100%'
    },
    initComponent: function () {

        var me = this;

        //����grid���ɲ�ѯ��
        if (me.grid) {

            var totalColumns = 0;
            //Ԥ������
            var columns = new Array();
            var columnsCount = me.grid.columns.length;
            for (var i = 0; i < columnsCount; i++) {
                var column = me.grid.columns[i];

                if (column.queryCtl && column.queryCtl.colspan) {
                    totalColumns += column.queryCtl.colspan;
                }
                else {
                    totalColumns++;
                }

                if (column.hidden || !column.isNeedQueryField || column.$className === 'Ext.grid.RowNumberer') {
                    continue; //������,�кţ����߷ǲ�ѯ������
                }

                var flag = false;
                if (column.queryCtl) {
                    if ((column.queryCtl.xtype === 'datefield' || column.queryCtl.xtype === 'numberfield') && column.queryCtl.regionQeury != false) {
                        flag = true;
                    }
                    else {
                        flag = column.queryCtl.regionQeury;
                    }
                }
                //���ֻ���������
                if (flag) {

                    var lowColumn = new Object(); //Ext.clone(column);
                    for (var p in column) {

                        if (p === 'text') {
                            lowColumn.text = column.text + '(����)';
                        }
                        else if (p === 'dataIndex') {
                            if (column.queryCtl.xtype === 'datefield') {
                                lowColumn.dataIndex = column.dataIndex + '*date*ngLow'; //�޸������ֶ�����,�����ֶ�:date
                            }
                            else if (column.queryCtl.xtype === 'numberfield') {
                                lowColumn.dataIndex = column.dataIndex + '*num*ngLow'; //�޸������ֶ����ƣ������ֶ�:num
                            }
                            else {
                                lowColumn.dataIndex = column.dataIndex + '*char*ngLow'; //�޸������ֶ����ƣ��ַ��ֶ�:num
                            }
                        }
                        else {
                            lowColumn[p] = column[p];
                        }
                    }
                    columns.push(lowColumn);

                    var upColumn = new Object(); //Ext.clone(column);
                    for (var p in column) {

                        if (p === 'text') {
                            upColumn.text = column.text + '(����)';
                        }
                        else if (p === 'dataIndex') {
                            if (column.queryCtl.xtype === 'datefield') {
                                upColumn.dataIndex = column.dataIndex + '*date*ngUP'; //�޸������ֶ�����
                            }
                            else if (column.queryCtl.xtype === 'numberfield') {
                                upColumn.dataIndex = column.dataIndex + '*num*ngUP'; //�޸������ֶ�����
                            }
                            else {
                                upColumn.dataIndex = column.dataIndex + '*char*ngUP'; //�޸������ֶ�����
                            }
                        }
                        else {
                            upColumn[p] = column[p];
                        }
                    }
                    columns.push(upColumn);
                }
                else {
                    columns.push(column);
                }
            }


            var cols; //��һ�����зֿ�
            var columnWith;

            //Ĭ�ϵ�
            if (!me.columnsPerRow) {
                cols = 3; //��һ�����зֿ�
                columnWith = .3;
                if (columns.length < 6) {
                    cols = 2; //С��6�о�����
                    columnWith = .45;
                }
            }
            else {
                cols = me.columnsPerRow;
                switch (cols) {
                    case 1:
                    case 2: columnWith = 0.4; break;
                    case 3: columnWith = 0.33; break;
                    case 4: columnWith = 0.25; break;
                    default: columnWith = 0.33;
                }
            }

            var rows = Math.ceil(totalColumns / cols); //��������

            var index = 0;
            var outarr = new Array();
            for (var i = 0; i < rows; i++) {

                var outobj = new Object();
                outobj.xtype = 'container';
                outobj.layout = 'column';
                outobj.border = false;
                var inarr = new Array();

                for (var j = 0; j < cols; ) {


                    //var index = (i * cols + j);
                    if (index >= columns.length) {
                        break; //����
                    }

                    var column = columns[index];
                    index++;
                    var inItems = new Object();

                    var tempColumnWith = columnWith;

                    if (column.queryCtl && column.queryCtl.colspan) {
                        tempColumnWith *= column.queryCtl.colspan;
                        j += column.queryCtl.colspan;


                    }
                    else {
                        j++;
                    }

                    inItems.xtype = 'container';
                    inItems.columnWidth = tempColumnWith; //.3;
                    inItems.layout = 'anchor', //'form';
                    inItems.border = false

                    var field = new Object();


                    if (column.queryCtl) {

                        //                        for (var p in column.queryCtl) {
                        //                            if (!field.hasOwnProperty(p)) {
                        //                                field[p] = column.queryCtl[p]; //��ѯ�еĶ���
                        //                            }
                        //                        }

                        field = Ext.clone(column.queryCtl); //���
                        var obj = { fieldLabel: column.header || column.text, name: column.dataIndex }
                        Ext.apply(field, obj); //��������,�ֶ�ֵ                                             
                    }
                    else {
                        field.xtype = 'textfield'; //Ĭ�ϵĿؼ����ı���
                    }

                    inItems.items = [field];
                    inarr.push(inItems);
                }
                outobj.items = inarr;
                outarr.push(outobj);

            }

            me.items = outarr;

            this.callParent();
            //var temp = JSON.stringify(me.items);
        }
    }
})

Ext.define('Ext.ng.TableLayoutForm', {
    extend: 'Ext.ng.FormPanel', //'Ext.form.Panel',
    alias: 'widget.ngTableLayoutForm', //����,��ͨ������xtype����,����ͨ��Ext.widget()�������� 
    region: 'north',
    autoHeight: true,
    frame: true,
    border: false,
    bodyStyle: 'padding:10px',
    //layout: 'form',//Ĭ����anchor
    //hidden: true,
    fieldDefaults: {
        //labelAlign: 'right', //'top',
        labelWidth: 60,
        anchor: '100%',
        margin: '0 10 5 0',
        msgTarget: 'side'
    },
    initComponent: function () {
        var me = this;

        me.items = me.buildTableLayout(me.fields, me.columnsPerRow);

        this.callParent();

    },
    buildTableLayout: function (fields, columnsPerRow) {
        var me = this;

        //debugger;

        var items = fields; //me.fields; //me.items; //���пؼ�
        var totalColumns = 0;

        for (var i = 0; i < fields.length; i++) {

            var tempItem = fields[i];

            if (tempItem.xtype === 'hiddenfield') continue;

            if (tempItem.colspan) {
                totalColumns += tempItem.colspan;
            }
            else {
                totalColumns++;
            }

            //items.push(tempItem);
        }

        var cols; //Ĭ�ϰ�һ�����зֿ�
        var columnWith;

        if (!columnsPerRow) {

            cols = 3; //Ĭ�ϰ�һ�����зֿ�
            columnWith = .3;

            if (items) {
                if (items.length < 6) {
                    cols = 2; //С��6�о�����
                    columnWith = .45;
                }
            }
        }
        else {

            cols = columnsPerRow; //me.columnsPerRow;
            switch (cols) {
                case 1:
                case 2: columnWith = 0.4; break;
                case 3: columnWith = 0.33; break;
                case 4: columnWith = 0.25; break;
                default: columnWith = 0.33;
            }
        }


        var rows = Math.ceil(totalColumns / cols); //��������

        var index = 0;
        var outarr = new Array();
        for (var i = 0; i < rows; i++) {

            var outobj = new Object();
            outobj.xtype = 'container';
            outobj.layout = 'column';
            outobj.border = false;
            var inarr = new Array();

            for (var j = 0; j < cols; ) {

                if (index >= items.length) {
                    break; //����
                }

                var item = items[index];
                index++;

                var tempColumnWith = columnWith;
                if (item && item.colspan) {
                    tempColumnWith *= item.colspan;
                    j += item.colspan;
                }
                else {
                    j++;
                }


                var inItems = new Object();

                inItems.xtype = 'container';
                inItems.columnWidth = tempColumnWith; //.3;
                inItems.layout = 'anchor', //'form';
                inItems.border = false

                if (item.xtype === 'hiddenfield') {//���ؿؼ�������һ���ؼ�һ���
                    var next = items[index];
                    inItems.items = [item, next];
                    index++;
                }
                else {
                    inItems.items = [item];
                }

                inarr.push(inItems);
            }
            outobj.items = inarr;

            outarr.push(outobj);

        }
        //me.items = outarr;

        return outarr;
    }

})

Ext.define('Ext.ng.PagingBar', {
    extend: 'Ext.toolbar.Paging',
    alias: 'widget.ngPagingBar', //����,��ͨ������xtype���� 
    border:false,   
    displayInfo: true,
    displayMsg: '�� {0} - {1}�� �� {2} ������',
    emptyMsg: "û������",
    beforePageText: "��",
    afterPageText: "/{0} ҳ",
    firstText: "��ҳ",
    prevText: "��һҳ",
    nextText: "��һҳ",
    lastText: "βҳ",
    refreshText: "ˢ��",         
    initComponent: function () {
        this.callParent();
    }  
})

Ext.define('Ext.ng.GridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ngGridPanel', //����,��ͨ������xtype����
    initComponent: function () {

        var me = this;
        var otype = me.otype;

        var bbar = me.bbar; //callParent������bbar������Ϊ��
        this.callParent(arguments);

        //�б�����뷽ʽ����
        for (var i = 0; i < me.columns.length; i++) {
            var column = me.columns[i];
            if (!column.hidden) {
                if (column.titleAlign) {
                    column.style = "text-align:" + column.titleAlign;
                }
                else {
                    column.style = "text-align:center"; //Ĭ����ͷ����
                }

                //�����п���
                if (column.mustInput) {
                    column.style += ";color:OrangeRed";
                }
            }
        }

        //�鿴״̬����Ϊֻ��
        if (otype === 'view') {
            //grid��Ϊֻ��
            me.on('beforeedit', function () {
                return false;
            })
        }


        //������ҳ����ҳ��
        if (bbar) {
            me.store.on('load', function (store, records) {
                //debugger;
                //����ҳ��
                var item = bbar.items.get('inputItem');
                var pageindex = item.getValue(); //ҳ��

                if (pageindex > 0) {
                    if (Math.ceil(store.totalCount / store.pageSize) < pageindex) {
                        if (store.totalCount > 0) {
                            item.setValue(1);
                            store.currentPage = 1;
                        }
                        else {
                            item.setValue(0);
                            store.currentPage = 0;
                        }
                    }
                }
                else {
                    item.setValue(0);
                }

            })
        }

        me.on('itemcontextmenu', function (view, record, item, index, e, eOpts) {
            //
            var contextmenu = Ext.create('Ext.menu.Menu', {
                width: 200,
                height: 100,
                margin: '0 0 10 0',
                //floating: false,
                items: [{ text: 'item 1' }, { text: 'item 2' }, { text: 'item 3'}]
            });

            //e.stopEvent();
            e.preventDefault();
            contextmenu.showAt(e.getXY());
            //return false;

        });


    },
    getChange: function () {
        var me = this;
        var json = GetExtJsGridData(me.store, me.buskey);
        return json;
    },
    getAllGridData: function () {
        var json = GetAllGridData(this.store, this.buskey);
        return json;
    },
    isValid: function () {
        var me = this;
        return ValidGridData(me);
    },
    resetPagingBar: function (pagingBar) {        
        var me = this;
        if (pagingBar) {

            var textItem = pagingBar.items.get('inputItem');
            textItem.setValue(1);
            me.store.currentPage = 1;
        }
    }
})

Ext.define('Ext.ng.JsonStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.ngJsonStore', //����,��ͨ������xtype����
    cachePageData:true,//�����ҳ����
    constructor: function (config) {
        //
        config = Ext.apply({
            proxy: {
                type: 'ajax',
                url: config.url,
                reader: {
                    type: 'json',
                    root: 'Record',
                    totalProperty: 'totalRows'
                }
            }
        }, config);

        this.callParent([config]);

        var me = this;

        me.dataContainer = Ext.create('Ext.util.MixedCollection'); //���ݻ���

        me.on('beforeload', function (store, operation, eOpts) {

            Ext.apply(store.proxy.extraParams, { 'page': store.currentPage - 1 }); //�޸�pageIndexΪ��0��ʼ
            if (this.queryObj) {
                Ext.apply(store.proxy.extraParams, this.queryObj); //��ѯ���ڵ�����   
            }

            //            if (this.outQueryObj) {
            //                Ext.apply(store.proxy.extraParams, this.outQueryObj); //�ⲿ�������� 
            //            }

            if (store.cachePageData) {
                if (store.dataContainer.containsKey(store.currentPage)) {

                    var records = store.dataContainer.get(store.currentPage);
                    store.loadData(records);

                    //store.loadRawData(store.dataContainer.get(store.currentPage));//���޸���ҳ��,��ҳ������ֻ��1ҳ

                    //var result = store.proxy.reader.read(store.dataContainer.get(store.currentPage));
                    //var records = result.records;
                    //store.loadRecords(records, { addRecords: false });

                    store.fireEvent('load', me, records, true); //����load�¼������·�ҳ����ҳ��

                    return false; //��ֹajax����ȥ����˶�ȡ����
                }
            }

        });

        me.on('load', function (store, records, successful, eOpts) {

            
            if (records){
                //debugger;
                var pageIndex = store.currentPage;
                store.dataContainer.add(pageIndex, records);
            }

        });

    }
})

Ext.define('Ext.ng.TreePanel', {
    extend: 'Ext.tree.TreePanel',
    alias: 'widget.ngTreePanel',
    //autoScroll: true,
    //enableTabScroll: true,
    rootVisible: false,
    lines: true,
    useArrows: true,
    width: 220,
    minSize: 220,
    maxSize: 220,
    initComponent: function () {
        var me = this;

        var thestore = Ext.create('Ext.data.TreeStore', {
            //autoLoad: true,
            fields: me.treeFields,
            proxy: {
                type: 'ajax',
                url: me.url
            }
        });

        me.store = thestore;

        me.callParent(arguments);
    }
})

Ext.define('Ext.ng.MessageBox', { 
       
        /*******************************
        ����Ի���,��ʾ��,��ģ̬,һ��ʱ����Զ���ʧ
        msg:�Ի�����Ϣ��
        hold:�Ի�����ʾ����ʱ��
        ********************************/
        Error: function (msg, hold) {
            this.Show('Error', msg, hold, 'alert-error');
        },

        /*******************************
        ��Ϣ�Ի���,��ʾ��,��ģ̬,һ��ʱ����Զ���ʧ
        msg:�Ի�����Ϣ��
        hold:�Ի�����ʾ����ʱ��
        ********************************/
        Info: function (msg, hold) {
            this.Show('Info', msg, hold, 'alert-information');
        },

        /*******************************
        ����Ի���,��ʾ��,��ģ̬,һ��ʱ����Զ���ʧ
        msg:�Ի�����Ϣ��
        hold:�Ի�����ʾ����ʱ��
        ********************************/
        Warning: function (msg, hold) {
            this.Show('Warning', msg, hold, 'alert-warn');
        },

        /*******************************
        �ɹ��Ի���,��ʾ��,��ģ̬,һ��ʱ����Զ���ʧ
        msg:�Ի�����Ϣ��
        hold:�Ի�����ʾ����ʱ��
        ********************************/
        Success: function (msg, hold) {
            this.Show('Sccess', msg, hold, 'alert-success');
        },

        /*******************************
        ȷ�϶Ի���,��ʾ��,ģ̬,�����Զ���ʧ
        ����ֵ yes/no
        msg:�Ի�����Ϣ��
        ********************************/
        Confirm: function (msg) {
            Ext.MessageBox.confirm('Confirm', msg);
        },

        /*******************************
        ������ĶԻ���,��ʾ��,ģ̬,�����Զ���ʧ
        ����ֵ �����value
        title:������
        msg:��ʾ����Ϣ
        ********************************/
        Prompt: function (title, msg) {
            Ext.MessageBox.prompt(title, msg, true,'alert-information');
        },

        /*******************************
        ����������ĶԻ���,��ʾ��,ģ̬,�����Զ���ʧ
        ����ֵ �����value
        title:������
        msg:��ʾ����Ϣ
        width:��Ϣ����
        ********************************/
        MultilinePrompt: function (title, msg, width) {
            Ext.MessageBox.show({
                title: title,
                msg: msg,
                width: width,
                buttons: Ext.MessageBox.OKCANCEL,
                multiline: true,
                icon: 'alert-information'
            });
        },

        /*******************************
        ����ť�ĶԻ���,��ʾ��,ģ̬,�����Զ���ʧ
        ����ֵ ����İ�ť��Ӧ��ֵ
        title:������
        msg:��ʾ����Ϣ
        buttons:Ҫ��ʾ�İ�ť,��Ext.MessageBox.YESNOCANCEL,
        ********************************/
        ButtonDialog: function (title, msg, buttons) {
            Ext.MessageBox.show({
                title: title,
                msg: msg,
                buttons: buttons,
                icon: 'alert-information'
            });
        },

        /*******************************
        �������Ի���,��ʾ��,ģ̬,������ɺ��Զ���ʧ
        ����ֵ 
        title:������
        msg:��ʾ����Ϣ
        progressText:��������Ҫ��ʾ����Ϣ
        ********************************/
        ProgressDialog: function (title, msg, progressText) {
            Ext.MessageBox.show({
                title: title,
                msg: msg,
                progressText: progressText,
                width: 300,
                progress: true,
                closable: false,
                icon: 'alert-information'
            });

            // this hideous block creates the bogus progress
            var f = function (v) {
                return function () {
                    if (v == 12) {
                        Ext.MessageBox.hide();
                        Ext.example.msg('Done', 'Your fake items were loaded!');
                    } 
                    else {
                        var i = v / 11;
                        Ext.MessageBox.updateProgress(i, Math.round(100 * i) + '% completed');
                    }
                };
            };
            for (var i = 1; i < 13; i++) {
                setTimeout(f(i), i * 500);
            }
        },

        /*******************************
        �ȴ��Ի���,��ʾ��,ģ̬,�����Զ���ʧ
        ����ֵ ����İ�ť��Ӧ��ֵ
        msg:��ʾ����Ϣ
        progressText:��������Ҫ��ʾ����Ϣ
        ********************************/
        WaitDialog: function ( msg, progressText) {
            Ext.MessageBox.show({
                msg: msg,
                progressText: progressText,
                width: 300,
                wait: true,
                waitConfig: { interval: 200 },
                icon: 'alert-information'
            });
        },

        /*******************************
        ��ʾ�Ի���,��ʾ��,��ģ̬,һ��ʱ����Զ���ʧ
        title:�Ի������
        msg:�Ի�����Ϣ��
        hold:�Ի�����ʾ����ʱ��
        icon:Ҫ��ʾ��ͼƬ
        ********************************/
        Show: function (title, msg, hold, icon) {
            Ext.MessageBox.show({
                title: title,
                msg: msg,
                width: 300,
                icon: icon,
                modal: false
            });
            this.Hold(hold);
        },
        Hold: function Hold(hold) {
            var h = 5000;
            if (hold != undefined) {
                h = hold;
            }
            setTimeout(function () {
                Ext.MessageBox.hide();
            }, h);
        }
})

// #region Ext.ng.form.field

//����
Ext.define('Ext.ng.form.field.Base', {
    extend: 'Ext.form.field.Base',
    initComponent: function () {
        var me = this;
        me.callParent();

        if (me.mustInput)//������
        {
            //me.labelStyle = 'color:RoyalBlue';
            me.labelStyle = 'color:OrangeRed'; //'color:RoyalBlue';
            me.allowBlank = false;
        }
    }
})

Ext.define('Ext.ng.CommonHelp', {
    extend: 'Ext.form.field.ComboBox',
    mixins: { base: 'Ext.ng.form.field.Base' },
    requires: ['Ext.ng.form.field.Base'],
    alias: ['widget.ngCommonHelp'],
    pageSize: 10,
    minChars: 1, //�����������ٶ��ٸ��ַ���ʱ���ȡ����
    helpType: 'simple', //Ĭ����simple,�Զ�����棺rich
    helpWidth: 600, //�������
    helpHeight: 400, //�����߶�
    outFilter: {}, //�ⲿ��ѯ����
    selectMode: 'single', //multiple  
    //valueField: 'code',
    //displayField: 'name',
    //forceSelection: true,
    selectOnFoucus: true,
    typeAhead: true, //��ʱ��ѯ
    typeAheadDelay: 500, //�ӳ�500���룬Ĭ����250
    //valueNotFoundText: 'Select a Country!!...',
    queryMode: 'remote',
    triggerAction: 'all', //'query'  
    //    listConfig: {
    //        //tpl: '<div><table width="100%" ><tr><th class="x-column-header-inner x-column-header-over" >����</th><th class="x-column-header-inner x-column-header-over">����</th></tr><tpl for="."><tr class="x-boundlist-item"><td>{provinceno}</td><td>{prvcname}<td></tr></tpl></table></div>',
    //        //        itemSelector:'span.item'
    //        getInnerTpl: function () {
    //            //return '<div data-qtip="{code}. {slogan}">{ocode}  ({oname})</div>';
    //            return '<div data-qtip="{' + this.pickerField.valueField + '}. {slogan}">{' + this.pickerField.valueField + '}  ({' + this.pickerField.displayField + '})</div>';
    //            // return '{' + this.pickerField.valueField + '} {' + this.pickerField.displayField + '}';
    //        }
    //    },
    initComponent: function () {
        //
        var me = this;
        this.callParent();
        this.mixins.base.initComponent.call(me); //��callParent�������ɵ���

        //me.tpl = '<div><table width="100%" ><tr><th class="x-column-header-inner x-column-header-over" >����</th><th class="x-column-header-inner x-column-header-over">����</th></tr><tpl for="."><tr class="x-boundlist-item"><td>{' + this.valueField + '}</td><td>{' + this.displayField + '}<td></tr></tpl></table></div>';

        if (me.listFields && me.listHeadTexts) {

            var listheaders = '';
            var listfields = '';

            var heads = me.listHeadTexts.split(','); //��ͷ 
            var fields = me.listFields.split(','); //�����ֶ�              

            for (var i = 0; i < heads.length; i++) {
                listheaders += '<th class="x-column-header-inner x-column-header-over">' + heads[i] + '</th>';
            }

            var modelFields = new Array();
            for (var i = 0; i < fields.length; i++) {
                modelFields.push({
                    name: fields[i],
                    type: 'string',
                    mapping: fields[i]
                });

                listfields += '<td>{' + fields[i] + '}</td>';
            }

            var temp = '<div><table width="100%" ><tr>' + listheaders + '</tr><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
            me.tpl = temp;


            var rootPath = '../';
            if (me.rootPath) {
                rootPath = me.rootPath;
            }
            store = Ext.create('Ext.data.Store', {
                pageSize: 50,
                fields: modelFields,
                proxy: {
                    type: 'ajax',
                    url: rootPath + 'SUP/CommonHelp/GetHelpList?helpid=' + me.helpid,
                    reader: {
                        type: 'json',
                        root: 'Record',
                        totalProperty: 'totalRows'
                    }
                }
            });

            me.bindStore(store);

        }
        else {

            me.initialListTemplate(); //��ʼ�������б���ʽ 
        }

        //debugger;

        //        me.store.on('beforeload', function () {
        //            
        //            if (me.outFilter) {
        //                Ext.apply(me.store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
        //            }
        //        });


        me.on('expand', function (field, eOpts) {

        });


        me.on('collapse', function (field, eOpts) {


        });


        if (me.isInGrid) {//Ƕ��grid��

            me.addEvents('helpselected'); //����ֵ��ѡ����¼�

            me.on('select', function (combo, records, eOpts) {

                Ext.define('themodel', {
                    extend: 'Ext.data.Model',
                    fields: [me.valueField, me.displayField]
                });

                var code = combo.getValue();
                var name = combo.getRawValue();

                var obj = new Object();
                obj[me.valueField] = name; //��ƭ,grid�Ǳ���ʾ������
                obj[me.displayField] = name;
                var valuepair = Ext.ModelManager.create(obj, 'themodel');
                me.setValue(valuepair); //������ô���ò��ܳɹ�

                //debugger;
                var pobj = new Object();
                pobj.code = code; //combo.getValue();
                pobj.name = name; //combo.getRawValue();
                pobj.type = 'autocomplete';
                me.fireEvent('helpselected', pobj);

            });
        }


    },
    initialListTemplate: function (store) {
        var me = this;

        var allfield;
        var headText;
        var initTpl;
        var template;

        initTpl = function () {

            var modelFields;
            var gridClomns;

            var listheaders = '';
            var listfields = '';

            if (me.helpType === 'rich') {//�û��Զ�������ģ�� 

                modelFields = template.Template.Model.fields;
                gridClomns = template.Template.GridColumns;

                for (var i = 0; i < gridClomns.length; i++) {
                    listheaders += '<th class="x-column-header-inner x-column-header-over">' + gridClomns[i].header + '</th>';
                }

                for (var i = 0; i < modelFields.length; i++) {
                    listfields += '<td>{' + modelFields[i]['name'] + '}</td>';
                }
            }
            else {
                var fields = allfield.split(','); //�����ֶ�
                var heads = headText.split(','); //��ͷ 

                for (var i = 0; i < heads.length; i++) {
                    listheaders += '<th class="x-column-header-inner x-column-header-over">' + heads[i] + '</th>';
                }

                modelFields = new Array();
                for (var i = 0; i < fields.length; i++) {
                    modelFields.push({
                        name: fields[i],
                        type: 'string',
                        mapping: fields[i]
                    });

                    listfields += '<td>{' + fields[i] + '}</td>';
                }
            }

            var rootPath = '../';
            if (me.rootPath) {
                rootPath = me.rootPath;
            }
            //store.fields = modelFields; //����store
            var store = Ext.create('Ext.data.Store', {
                pageSize: 10, //�������ҳ��С                
                fields: modelFields,
                proxy: {
                    type: 'ajax',
                    url: rootPath + 'SUP/CommonHelp/GetHelpList?helpid=' + me.helpid,
                    reader: {
                        type: 'json',
                        root: 'Record',
                        totalProperty: 'totalRows'
                    }
                }
            });
            //me.bindStore(store); //��̬��store
            me.store = store;

            //ֻ��������д�¼����ܴ�����
            store.on('beforeload', function (store) {

                if (me.outFilter) {
                    Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
                }
            })


            var temp = '<div><table width="100%" ><tr>' + listheaders + '</tr><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';

            me.tpl = temp;
        };

        var rootPath = '../';
        if (me.rootPath) {
            rootPath = me.rootPath;
        }

        var url;
        if (me.helpType === 'rich') {
            url = rootPath + 'SUP/CommonHelp/GetHelpTemplate?helpid=' + me.helpid;
        }
        else {
            url = rootPath + 'SUP/CommonHelp/GetHelpInfo?helpid=' + me.helpid;
        }

        Ext.Ajax.request({
            url: url,
            callback: initTpl,
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.status === "ok") {

                    if (me.helpType === 'rich') {
                        //title = resp.Title;
                        template = resp.template; //����ģ��
                    }
                    else {
                        //title = resp.data.Title;
                        allfield = resp.data.AllField;
                        headText = resp.data.HeadText;
                    }

                } else {
                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
                }
            }
        });



    },
    onTriggerClick: function () {
        var me = this;

        //
        var title;
        var allfield;
        var headText;
        var ShowHelp;
        var template;


        var win;
        var querypanel;
        var rootPath = '../';

        if (me.rootPath) {
            rootPath = me.rootPath;
        }

        ShowHelp = function () {

            var queryItems;
            var modelFields;
            var gridClomns;

            if (me.helpType === 'rich') {//�û��Զ�������ģ��            
                queryItems = template.Template.QueryItems;
                modelFields = template.Template.Model.fields;
                gridClomns = template.Template.GridColumns;
            }
            else {
                var fields = allfield.split(','); //�����ֶ�
                var heads = headText.split(','); //��ͷ
                queryItems = new Array();
                for (var i = 0; i < fields.length; i++) {
                    queryItems.push({
                        xtype: 'textfield',
                        fieldLabel: heads[i],
                        name: fields[i]                       
                        //anchor: '95%'
                    });
                }

                modelFields = new Array();
                for (var i = 0; i < fields.length; i++) {

                    modelFields.push({
                        name: fields[i],
                        type: 'string',
                        mapping: fields[i]
                    });
                }

                gridClomns = new Array();
                for (var i = 0; i < fields.length; i++) {
                    gridClomns.push({
                        header: heads[i],
                        flex: 1,
                        //sortable: true,
                        dataIndex: fields[i]
                    });
                }
            }

            var toolbar = Ext.create('Ext.Toolbar', {
                region: 'north',
                border: false,
                //split: true,
                height: 26,
                minSize: 26,
                maxSize: 26,
                items: [
								{
								    id: "help_query",
								    text: "��ѯ",
								    iconCls: 'add'
								},
                                 "->",
							   {
							       id: "help_close",
							       text: "�ر�",
							       iconCls: 'cross'
							   }
							 ]
            });

            querypanel = Ext.create('Ext.ng.TableLayoutForm', {
                region: 'north',
                fields: queryItems
            })


            Ext.define('model', {
                extend: 'Ext.data.Model',
                fields: modelFields
            });


            var store = Ext.create('Ext.ng.JsonStore', {
                model: 'model',
                pageSize: 20,
                autoLoad: true,
                url: rootPath + 'SUP/CommonHelp/GetHelpList?helpid=' + me.helpid
            });

            //store.load();//����load��IE�Ľ����Ť��

            var pagingbar = Ext.create('Ext.ng.PagingBar', {
                store: store
            });

            var selModel = Ext.create('Ext.selection.CheckboxModel');

            var grid;
            //��ѡ
            if (me.selectMode === 'multiple') {

                grid = Ext.create('Ext.ng.GridPanel', {
                    region: 'center',
                    frame: true,
                    border: false,
                    store: store,
                    selModel: selModel, //��ѡ
                    columnLines: true,
                    layout: {
                        //type: 'hbox'//,
                        align: 'stretch'
                    },
                    columns: gridClomns,
//                    viewConfig: {
//                        forceFit: true,
//                        scrollOffset: 0
//                    },
                    bbar: pagingbar
                });
            }
            else {//��ѡ
                grid = Ext.create('Ext.ng.GridPanel', {
                    region: 'center',
                    frame: true,
                    border: false,
                    store: store,
                    columnLines: true,
                    layout: {
                        //type: 'hbox', //�������ֺ�����������ѿ�
                        //align: 'stretch'
                    },
                    columns: gridClomns,
//                    viewConfig: {
//                        forceFit: true,
//                        scrollOffset: 0
//                    },
                    bbar: pagingbar
                });
            }

            grid.on('itemdblclick', function () {

                //
                var data = grid.getSelectionModel().getSelection();

                if (data.length > 0) {
                    var code = data[0].get(me.valueField);
                    var name = data[0].get(me.displayField);

                    var obj = new Object();
                    obj[me.valueField] = code;
                    obj[me.displayField] = name;

                    var valuepair = Ext.ModelManager.create(obj, 'model');

                    me.setValue(valuepair); //������ô���ò��ܳɹ�


                    win.hide();
                    win.destroy();

                    if (me.isInGrid) {
                        var pobj = new Object();
                        pobj.code = code;
                        pobj.name = name;
                        pobj.type = 'fromhelp';
                        me.fireEvent('helpselected', pobj);
                    }

                }
            }, this)

            //��ʾ��������
            win = Ext.create('Ext.window.Window', {
                title: title, //'Hello',
                border: false,
                height: me.helpHeight,
                width: me.helpWidth,
                layout: 'border',
                modal: true,
                items: [toolbar, querypanel, grid]
            });

            win.show();

            //store.load();//�ֹ������ᴥ��beforeload�¼�


            toolbar.items.get('help_query').on('click', function () {
                store.cachePageData = false;
                store.load();
                store.cachePageData = true;

            })

            toolbar.items.get('help_close').on('click', function () {

                win.hide();
                win.destroy();

            })

            store.on('beforeload', function () {
                var formdata = querypanel.getForm();
                var data = formdata.getValues();

                //debugger;
                if (me.outFilter) {
                    Ext.apply(store.proxy.extraParams, { 'queryfilter': JSON.stringify(data), 'outqueryfilter': JSON.stringify(me.outFilter) });
                }
                else {
                    Ext.apply(store.proxy.extraParams, { 'queryfilter': JSON.stringify(data) });
                }

                //return true;
            })
        };

        //        else {//�Զ����������

        //            ShowHelp = function () {

        //                var frame = document.createElement("IFRAME");
        //                frame.id = "frame1";
        //                frame.frameBorder = 0;
        //                frame.src = '../SUP/CommonHelp/ExtHelp?helpid=' + me.helpid;
        //                frame.height = "100%";
        //                frame.width = "100%";

        //                //��ʾ��������
        //                win = Ext.create('Ext.window.Window', {
        //                    title: title, //'Hello',
        //                    border: false,
        //                    height: me.helpHeight,
        //                    width: me.helpWidth,
        //                    layout: 'border',
        //                    contentEl: frame
        //                    //items: [querypanel, grid]
        //                }).show();

        //                frame.parentContainer = win; //�������ڿؼ�����iframe
        //                frame.combox = me;

        //            };

        //        }


        var url;


        if (me.helpType === 'rich') {
            url = rootPath + 'SUP/CommonHelp/GetHelpTemplate?helpid=' + me.helpid;
        }
        else {
            url = rootPath + 'SUP/CommonHelp/GetHelpInfo?helpid=' + me.helpid;
        }

        Ext.Ajax.request({
            //params: { 'id': busid },
            url: url,
            callback: ShowHelp,
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.status === "ok") {



                    if (me.helpType === 'rich') {
                        title = resp.Title;
                        template = resp.template; //����ģ��
                    }
                    else {
                        title = resp.data.Title;
                        allfield = resp.data.AllField;
                        headText = resp.data.HeadText;
                    }

                } else {
                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
                }
            }
        });

    },
    bindData: function () {
        var me = this;

        var rootPath = '../';

        if (me.rootPath) {
            rootPath = me.rootPath;
        }

        Ext.Ajax.request({
            //params: { 'id': busid },
            url: rootPath + 'SUP/CommonHelp/GetName?helpid=' + me.helpid + '&code=' + me.getValue(),
            success: function (response) {

                var resp = Ext.JSON.decode(response.responseText);
                if (resp.status === "ok") {

                    Ext.define('model', {
                        extend: 'Ext.data.Model',
                        fields: [{
                            name: me.valueField, //'code',
                            type: 'string',
                            mapping: me.valueField//'code'
                        }, {
                            name: me.displayField, //'name',
                            type: 'string',
                            mapping: me.displayField//'name'
                        }
                     ]
                    });

                    var obj = new Object();
                    obj[me.valueField] = me.getValue();
                    obj[me.displayField] = resp.name; //��ʾֵ
                    var provincepair = Ext.ModelManager.create(obj, 'model');
                    me.setValue(provincepair);

                } else {
                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
                }
            }
        });

    }, //bindData
    getCodeName: function (value) {
        var me = this;
        var name;
        //

        Ext.Ajax.request({
            url: '../SUP/CommonHelp/GetName?helpid=' + me.helpid + '&code=' + value,
            async: false, //ͬ������
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.status === "ok") {
                    name = resp.name; //��ʾֵ                    
                } else {
                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
                    name = 'error';
                }
            }
        });

        return name;
    },
    setOutFilter: function (obj) {
        this.outFilter = obj;

        //this.store.outQueryObj = { 'outqueryfilter': JSON.stringify(obj) };
        //Ext.apply(this.getStore().proxy.extraParams, { 'outqueryfilter': JSON.stringify(obj) });
    }
})

Ext.define('Ext.ng.ComboBox', {
    extend: 'Ext.form.field.ComboBox',
    mixins: { base: 'Ext.ng.form.field.Base' },
    requires: ['Ext.ng.form.field.Base'],
    alias: ['widget.ngComboBox'],
    minChars: 1, //�����������ٶ��ٸ��ַ���ʱ���ȡ����
    typeAhead: true,
    typeAheadDelay: 500,
    triggerAction: "all",
    initComponent: function () {
        var me = this;
        me.callParent();
        this.mixins.base.initComponent.call(me);

        //me.tpl = '<div><table width="100%" ><tr><th class="x-column-header-inner x-column-header-over" >����</th><th class="x-column-header-inner x-column-header-over">����</th></tr><tpl for="."><tr class="x-boundlist-item"><td>{' + this.valueField + '}</td><td>{' + this.displayField + '}<td></tr></tpl></table></div>';

        var store;

        if (me.queryMode === 'remote') {

            if (me.listFields && me.listHeadTexts) {
                           
                var listheaders = '';
                var listfields = '';

                var heads = me.listHeadTexts.split(','); //��ͷ 
                var fields = me.listFields.split(','); //�����ֶ�              

                for (var i = 0; i < heads.length; i++) {
                    listheaders += '<th class="x-column-header-inner x-column-header-over">' + heads[i] + '</th>';
                }

                var modelFields = new Array();
                for (var i = 0; i < fields.length; i++) {
                    modelFields.push({
                        name: fields[i],
                        type: 'string',
                        mapping: fields[i]
                    });

                    listfields += '<td>{' + fields[i] + '}</td>';
                }

                var temp = '<div><table width="100%" ><tr>' + listheaders + '</tr><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
                me.tpl = temp;


                var rootPath = '../';
                if (me.rootPath) {
                    rootPath = me.rootPath;
                }
                store = Ext.create('Ext.data.Store', {
                    pageSize: 50,
                    fields: modelFields,
                    proxy: {
                        type: 'ajax',
                        url: rootPath + 'SUP/CommonHelp/GetHelpList?helpid=' + me.helpid,
                        reader: {
                            type: 'json',
                            root: 'Record',
                            totalProperty: 'totalRows'
                        }
                    }
                });

                me.bindStore(store);

            }
            else {
                me.initialListTemplate();
            }

        }
        else {

            store = Ext.create('Ext.data.Store', {
                fields: [
                { name: me.valueField, type: 'string' },
                { name: me.displayField, type: 'string' }
                ],
                data: me.data
            });

            me.bindStore(store);
        }


        if (me.isInGrid) {//Ƕ��grid��

            me.addEvents('helpselected'); //����ֵ��ѡ����¼�

            me.on('select', function (combo, records, eOpts) {

                Ext.define('themodel', {
                    extend: 'Ext.data.Model',
                    fields: [me.valueField, me.displayField]
                });

                var code = combo.getValue();
                var name = combo.getRawValue();

                var obj = new Object();
                obj[me.valueField] = name; //��ƭ,grid�Ǳ���ʾ������
                obj[me.displayField] = name;
                var valuepair = Ext.ModelManager.create(obj, 'themodel');
                me.setValue(valuepair); //������ô���ò��ܳɹ�

                //debugger;
                var pobj = new Object();
                pobj.code = code; //combo.getValue();
                pobj.name = name; //combo.getRawValue();
                me.fireEvent('helpselected', pobj);

            });
        }


    },
    initialListTemplate: function (store) {
        var me = this;

        var allfield;
        var headText;
        var initTpl;
        var template;

        initTpl = function () {

            var modelFields;
            var gridClomns;

            var listheaders = '';
            var listfields = '';

            if (me.helpType === 'rich') {//�û��Զ�������ģ�� 

                modelFields = template.Template.Model.fields;
                gridClomns = template.Template.GridColumns;

                for (var i = 0; i < gridClomns.length; i++) {
                    listheaders += '<th class="x-column-header-inner x-column-header-over">' + gridClomns[i].header + '</th>';
                }

                for (var i = 0; i < modelFields.length; i++) {
                    listfields += '<td>{' + modelFields[i]['name'] + '}</td>';
                }
            }
            else {

                var heads = headText.split(','); //��ͷ 
                var fields = allfield.split(','); //�����ֶ�              

                for (var i = 0; i < heads.length; i++) {
                    listheaders += '<th class="x-column-header-inner x-column-header-over">' + heads[i] + '</th>';
                }

                modelFields = new Array();
                for (var i = 0; i < fields.length; i++) {
                    modelFields.push({
                        name: fields[i],
                        type: 'string',
                        mapping: fields[i]
                    });

                    listfields += '<td>{' + fields[i] + '}</td>';
                }
            }

            var rootPath = '../';
            if (me.rootPath) {
                rootPath = me.rootPath;
            }
            //store.fields = modelFields; //����store
            var store = Ext.create('Ext.data.Store', {
                pageSize: 10, //�������ҳ��С                
                fields: modelFields,
                proxy: {
                    type: 'ajax',
                    url: rootPath + 'SUP/CommonHelp/GetHelpList?helpid=' + me.helpid,
                    reader: {
                        type: 'json',
                        root: 'Record',
                        totalProperty: 'totalRows'
                    }
                }
            });
            //me.bindStore(store); //��̬��store
            me.store = store;

            //ֻ��������д�¼����ܴ�����
            store.on('beforeload', function (store) {

                if (me.outFilter) {
                    Ext.apply(store.proxy.extraParams, { 'outqueryfilter': JSON.stringify(me.outFilter) });
                }
            })


            var temp = '<div><table width="100%" ><tr>' + listheaders + '</tr><tpl for="."><tr class="x-boundlist-item">' + listfields + '</tr></tpl></table></div>';
            me.tpl = temp;
        };

        var rootPath = '../';
        if (me.rootPath) {
            rootPath = me.rootPath;
        }

        var url;
        if (me.helpType === 'rich') {
            url = rootPath + 'SUP/CommonHelp/GetHelpTemplate?helpid=' + me.helpid;
        }
        else {
            url = rootPath + 'SUP/CommonHelp/GetHelpInfo?helpid=' + me.helpid;
        }

        Ext.Ajax.request({
            url: url,
            callback: initTpl,
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.status === "ok") {

                    if (me.helpType === 'rich') {
                        //title = resp.Title;
                        template = resp.template; //����ģ��
                    }
                    else {
                        //title = resp.data.Title;
                        allfield = resp.data.AllField;
                        headText = resp.data.HeadText;
                    }

                } else {
                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
                }
            }
        });



    },
    bindData: function () {
        var me = this;

        var rootPath = '../';

        if (me.rootPath) {
            rootPath = me.rootPath;
        }

        Ext.Ajax.request({
            //params: { 'id': busid },
            url: rootPath + 'SUP/CommonHelp/GetName?helpid=' + me.helpid + '&code=' + me.getValue(),
            success: function (response) {

                var resp = Ext.JSON.decode(response.responseText);
                if (resp.status === "ok") {

                    Ext.define('model', {
                        extend: 'Ext.data.Model',
                        fields: [{
                            name: me.valueField, //'code',
                            type: 'string',
                            mapping: me.valueField//'code'
                        }, {
                            name: me.displayField, //'name',
                            type: 'string',
                            mapping: me.displayField//'name'
                        }
                     ]
                    });

                    var obj = new Object();
                    obj[me.valueField] = me.getValue();
                    obj[me.displayField] = resp.name; //��ʾֵ
                    var provincepair = Ext.ModelManager.create(obj, 'model');
                    me.setValue(provincepair);

                } else {
                    Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
                }
            }
        });

    },
    setOutFilter: function (obj) {
        this.outFilter = obj;      
    }
})

Ext.define('Ext.ng.TreeComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.ngTreeComboBox',
    store: new Ext.data.ArrayStore({ fields: [], data: [[]] }),
    editable: false,
    //resizable: true,
    minWidth: 100,
    //maxWidth: 350,
    labelAlign: 'right',
    readOnly: false,
    minChars: 1, //����һ���͵�������
    typeAhead: true,
    triggerAction: 'all',
    //matchFieldWidth: false,
    initComponent: function () {

        var me = this;
        this.callParent(arguments);
        this.treeRenderId = Ext.id();

        var height = me.treePanel.height || 300;
        if (me.treeMinHeight) {
            height = (me.treePanel.height < me.treeMinHeight) ? me.treeMinHeight : me.treePanel.height;
        }
        var width = me.pickerWidth || 300;
        if (me.treeMinWidth) {
            width = (me.treePanel.width < me.treeMinWidth) ? me.treeMinWidth : me.treePanel.width;
        }
        //����Ҫ���������tpl
        this.tpl = new Ext.XTemplate('<tpl for="."><div style="height:' + height + 'px;width:' + width + '"><div style="height:' + height + 'px;" id="' + this.treeRenderId + '"></div></div></tpl>');
        //this.tpl = new Ext.XTemplate('<div style="height:' + me.treePanel.height + 'px;" id="' + this.treeRenderId + '"></div>');
        //this.tpl = new Ext.XTemplate('<div style="height:150px;" id="' + this.treeRenderId + '"></div>');

        Ext.define('treemodel', {
            extend: 'Ext.data.Model',
            fields: [
                            {
                                name: me.valueField,
                                type: 'string',
                                mapping: me.valueField
                            }, {
                                name: me.displayField,
                                type: 'string',
                                mapping: me.displayField
                            }]
        });

        me.treePanel.border = false, //ȥ���߿�
        me.treePanel.width = width;
        if (!me.matchFieldWidth) {
            me.getPicker().setWidth(width);
        }

        var treeObj = me.treePanel;

        treeObj.on('itemclick', function (view, rec) {
            if (rec) {


                var isleaf = rec.get('leaf');
                if (me.effectiveNodeType === 'leaf' && (isleaf == false)) {
                    return; //����Ҷ�ӽڵ�
                }

                var code = rec.get(me.treeValueField); //rec.get('id');
                var name = rec.get('text');

                var obj = new Object();
                obj[me.valueField] = code;
                obj[me.displayField] = name;

                var valuepair = Ext.ModelManager.create(obj, 'treemodel');
                me.setValue(valuepair); //������ô���ò��ܳɹ�

                me.collapse();

            }
        });

        this.on({ 'expand': function () {

            if (!treeObj.rendered && treeObj && !this.readOnly) {
                //if (treeObj && !this.readOnly) {
                Ext.defer(function () {
                    treeObj.render(this.treeRenderId);
                }, 100, this);
            }
        }
        });
    }
})

Ext.define('Ext.ng.TreePanel', {
    extend: 'Ext.tree.TreePanel',
    alias: 'widget.ngTreePanel',
    //autoScroll: true,
    //enableTabScroll: true,
    rootVisible: false,
    lines: true,
    useArrows: true,
    width: 220,
    minSize: 220,
    maxSize: 220,
    initComponent: function () {
        var me = this;

        var thestore = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            fields: me.treeFields,
            proxy: {
                type: 'ajax',
                url: me.url 
            }
        });

        me.store = thestore;

        me.callParent(arguments);
    }
})

//Text
Ext.define('Ext.ng.Text', {
    extend: 'Ext.form.field.Text',
    mixins: { base: 'Ext.ng.form.field.Base' },
    alias: 'widget.ngText', //����,��ͨ������xtype����,����ͨ��Ext.widget()�������� 
    initComponent: function () {
        var me = this;
        this.mixins.base.initComponent.call(me);
        me.callParent();       

        //        if (me.mustInput)//������
        //        {
        //            me.labelStyle = 'color:OrangeRed'; //'color:RoyalBlue';
        //            me.allowBlank = false;
        //        }
    }
})


Ext.define('Ext.ng.TextArea', {
    extend: 'Ext.form.field.TextArea',
    mixins: { base: 'Ext.ng.form.field.Base' },
    alias: 'widget.ngTextArea', //����,��ͨ������xtype����,����ͨ��Ext.widget()�������� 
    initComponent: function () {
        var me = this;
        this.mixins.base.initComponent.call(me);
        me.callParent();      
    }
})


Ext.define('Ext.ng.Number', {
    extend: 'Ext.form.field.Number',
    mixins: { base: 'Ext.ng.form.field.Base' },
    alias: 'widget.ngNumber', //����,��ͨ������xtype����,����ͨ��Ext.widget()�������� 
    initComponent: function () {
        var me = this;
        this.mixins.base.initComponent.call(me);
        me.callParent();     
    }
})

Ext.define('Ext.ng.Date', {
    extend: 'Ext.form.field.Date',
    mixins: { base: 'Ext.ng.form.field.Base' },
    alias: 'widget.ngDate', //����,��ͨ������xtype����,����ͨ��Ext.widget()�������� 
    initComponent: function () {
        var me = this;
        this.mixins.base.initComponent.call(me);
        me.callParent();      
    }
})


Ext.define('Ext.ng.Time', {
    extend: 'Ext.form.field.Time',
    mixins: { base: 'Ext.ng.form.field.Base' },
    alias: 'widget.ngTime', //����,��ͨ������xtype����,����ͨ��Ext.widget()�������� 
    initComponent: function () {
        var me = this;
        this.mixins.base.initComponent.call(me);
        me.callParent();
      
    }
})

Ext.define('Ext.ng.Checkbox', {
    extend: 'Ext.form.field.Checkbox',
    mixins: { base: 'Ext.ng.form.field.Base' },
    alias: 'widget.ngCheckbox', //����,��ͨ������xtype����,����ͨ��Ext.widget()��������
    initComponent: function () {
        var me = this;
        this.mixins.base.initComponent.call(me);
        me.callParent();
       
    }
})

Ext.define('Ext.ng.Radio', {
    extend: 'Ext.form.field.Radio',
    mixins: { base: 'Ext.ng.form.field.Base' },
    alias: 'widget.ngRadio', //����,��ͨ������xtype����,����ͨ��Ext.widget()��������
    initComponent: function () {
        var me = this;
        this.mixins.base.initComponent.call(me);
        me.callParent();
      
    }
})


// #endregion

// #region observe

Ext.define('Ext.ng.ListRefresher', {
    mixins: {
        observable: 'Ext.util.Observable'
    },
    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);

        this.addEvents('refreshlist');
    }
});

// #endregion

// #region NG.Util


//-------��ȡExt.form.Panel���������-----
//
//form: ��Ext.form.Panel����
//key: ���ݵ�����,��������","��Ϊ�ָ���
//optype:��������, ������new,�޸ģ�edit
//����json��ʽ����
//----------------------------------------------
function GetExtJsFormData(form, key, optype) {

    
    if (optype === 'new' || optype === 'add') {
        optype = 'newRow';
    }
    else {
        optype = 'modifiedRow';
    } 

    var formdata = form.getForm();
    var data = formdata.getValues();

    //������ЩֵΪ�յ���getValues()ȡ����ֵ�����ܴ�ֵ�Ķ���
    var fields = form.getForm().getFields().items;
    for (var i = 0; i < fields.length; i++) {

        var field = fields[i];
        var classname = field.alternateClassName;
        var fieldname = field.name;//�ֶ�
       
        //combox�ؼ�����
        if (classname === 'Ext.form.field.ComboBox' || classname === 'Ext.form.ComboBox') {
            if (!data.hasOwnProperty(fieldname)) {
                data[fieldname] = '';//��ֵ
            }
        }

        //Checkbox�ؼ�����
        if (classname === 'Ext.form.field.Checkbox' || classname === 'Ext.form.Checkbox') {
            if (!data.hasOwnProperty(fieldname)) {
                data[fieldname] = ''; //��ֵ
            }
        }

        //Radio�ؼ�����
        if (classname === 'Ext.form.field.Radio' || classname === 'Ext.form.Radio') {
            if (!data.hasOwnProperty(fieldname)) {
                data[fieldname] = ''; //��ֵ
            }
        }
    }

    //��������
    var keys = key.split(',');
    var temp = '';
    for (var i = 0; i < keys.length; i++) {

        var keytemp = keys[i];
        var arr = keys[i].split('.');
        if (arr.length > 1) {
            keytemp = arr[1]; 
        }

        if (i < (keys.length - 1)) {
            temp += data[keytemp] + ",";            
        }
        else {
            temp += data[keytemp];      
        }

    }
    data["key"] = temp;  //data[key];//�����е�ֵ
    
    var obj = new Object();
    obj['key'] = key;//������
    obj[optype] = data;    
    data = { 'form': obj };

    var json = JSON.stringify(data);//Ext.encode(data);
    return json;
}


//-------�ϲ�Ext.form.Panel���������-----
//
//forms: ��Ext.form.Panel��������
//key: ���ݵ�����,��������","��Ϊ�ָ���
//optype:��������, ������new,�޸ģ�edit
//����json��ʽ����
//----------------------------------------------
function MergeFormData(forms, key, optype) {

    if (optype === 'new' || optype === 'add') {
        optype = 'newRow';
    }
    else {
        optype = 'modifiedRow';
    } 

    if (forms.length > 0) {

        var formdata = forms[0].getForm();
        var data = formdata.getValues();

        for (var i = 1; i < forms.length; i++) {
            
            var obj = forms[i].getForm().getValues();
            for (var p in obj) {
                if (!data.hasOwnProperty(p)) {
                    data[p] = obj[p];//��ֵ�Լ���data��
                }
            }
        }

        //��������
        var keys = key.split(',');
        var temp = '';
        for (var i = 0; i < keys.length; i++) {

            var keytemp = keys[i];
            var arr = keys[i].split('.');
            if (arr.length > 1) {
                keytemp = arr[1];
            }

            if (i < (keys.length - 1)) {
                temp += data[keytemp] + ",";
            }
            else {
                temp += data[keytemp];
            }

        }
        data["key"] = temp;  //data[key];//�����е�ֵ

        var obj = new Object();
        obj['key'] = key; //������id
        obj[optype] = data;
        data = { 'form': obj };

        var json = JSON.stringify(data); //Ext.encode(data);
        return json;
        
    }
}

//----------��ȡExtJs.Grid���������----------
//store : Ext.data.Store����
//key : �����У���������","Ϊ�ָ���
//����json��ʽ����
//------------------------------------------------
function GetExtJsGridData(store, key) {

    var newRecords = store.getNewRecords(); //���������  
    var modifyRecords = store.getUpdatedRecords(); // ��ȡ�޸ĵ��е����ݣ��޷���ȡ��Ӱ���� 
    var removeRecords = store.getRemovedRecords(); //��ȡ�Ƴ�����

   
    var newdata = [];
    Ext.Array.each(newRecords, function (record) {

        //
        var newobj = record.data;
        newobj["key"] = null;
        newobj = { 'row': newobj }; //�б��
        newdata.push(newobj);
    });


    var modifydata = [];
    Ext.Array.each(modifyRecords, function (record) {

        //
        var modifyobj = new Object(); //record.modified;

        //��������
        var keys = key.split(',');
        var values = '';
        for (i = 0; i < keys.length; i++) {
            if (i < (keys.length - 1)) {
                if (record.data[keys[i]]) {
                    values += record.data[keys[i]];
                }
                else {
                    values += "";
                }

                values += ",";
            }
            else {
                if (record.data[keys[i]]) {
                    values += record.data[keys[i]];
                }
                else {
                    values += "";
                }
            }
        }      

        //�����޸ĵ��ֶ�,ֻ���޸ĵĲ���,�������ݴ�����
        var modified = new Object();
        modified["key"] = values;
        for (var p in record.modified) {
            modified[p] = record.data[p];
        }       
        modifyobj = { 'row': modified }; //�б��

        modifydata.push(modifyobj);

    });

    var removedata = [];
    Ext.Array.each(removeRecords, function (record) {
        //

        var object = new Object();
        //object[key] = record.get(key);

        var keys = key.split(',');
        var values = "";
        for (i = 0; i < keys.length; i++) {
            if (i < (keys.length - 1)) {
                if (record.data[keys[i]]) {
                    values += record.data[keys[i]];
                }
                else {
                    values += "";
                }

                values += ",";
            }
            else {
                if (record.data[keys[i]]) {
                    values += record.data[keys[i]];
                }
                else {
                    values += "";
                }
            }
        }
        object["key"] = values;
        object = { 'row': object }; //�б��
        removedata.push(object);
    });

    var data = new Object();
    data['key'] = key;

    //
    if (newdata.length > 0) {
        data['newRow'] = newdata;
    }
    if (modifydata.length > 0) {
        data['modifiedRow'] = modifydata;
    }
    if (removedata.length > 0) {
        data['deletedRow'] = removedata;
    }
    data = { 'table': data };

    var json = JSON.stringify(data);//Ext.encode(data);
    return json;
}

//----------��ȡExtJs.Grid�������������----------
//store : Ext.data.Store����
//key : �����У���������","Ϊ�ָ���
//������״̬ȫ��������json��ʽ����
//------------------------------------------------
function GetAllGridData(store, key) {

    var all = store.getRange();

    var newdata = [];
    Ext.Array.each(all, function (record) {
                 
        var newobj = record.data;
        newobj["key"] = null;
        newobj = { 'row': newobj }; //�б��
        newdata.push(newobj);
    });

    var data = new Object();
    data['key'] = key;

    if (newdata.length > 0) {
        data['newRow'] = newdata;
    }

    data = { 'table': data };

    var json = JSON.stringify(data); //Ext.encode(data);
    return json;

}

//----------У��ExtJs.Grid���������----------
//store : Ext.grid.Panel����
//ͨ��:true,ʧ��:false
//------------------------------------------------
function ValidGridData(grid) {

    //

    var store = grid.store;    
    var newRecords = store.getNewRecords(); //���������  
    var modifyRecords = store.getUpdatedRecords(); // ��ȡ�޸ĵ��е����ݣ��޷���ȡ��Ӱ����

    var removeRecords = store.getRemovedRecords(); //��ȡ�Ƴ�����

    //У��������
    for (var i = 0; i < newRecords.length; i++) {
        var record = newRecords[i];
        var fields = record.fields.keys;

        for (var j = 0; j < fields.length; j++) {
            var name = fields[j];//����
            var value = record.data[name];//ȡ��ֵ

            var colIndex = 0;

            //�����ǵڼ���
            for (var k = 0; k < grid.columns.length; k++) {
                var column = grid.columns[k];
                if (name === column.dataIndex) {
                    colIndex = k;
                    break;
                }
            }

            //var rowIndex = store.find(name,value);//�õ��ڼ���,������ȫ������-1

            var editor = grid.columns[colIndex].getEditor();

            if (editor) {
                if (!editor.validateValue(value)) {

                    var row = 0;
                    if (store.totalCount) {
                        row = ((store.totalCount - removeRecords.length) + i);                       
                    }
                    
                    //alert('��' + (row + 1) + '�У� ��' + column.text + '�������벻�Ϸ���' + editor.activeErrors);

                    //NG2.Msg.Error('��' + (row + 1) + '�У� [' + column.text + ']�����벻�Ϸ���' + editor.activeErrors);

                    Ext.create('Ext.ng.MessageBox').Error('��' + (row + 1) + '�У� [' + column.text + ']�����벻�Ϸ���' + editor.activeErrors);

                    //grid.plugins[0].startEditByPosition({ row: i, column: (j+1) });
                    grid.plugins[0].startEdit(row, (j));

                    return false;
                }
            }
        }
    }

    //У���޸���
    for (var i = 0; i < modifyRecords.length; i++) {
        var record = modifyRecords[i];       

        //ֻ���޸ĵ���
        for (var p in record.modified) {
            var name = p; //����
            var value = record.data[name]; //ȡ��ֵ

            var colIndex = 0;

            //�����ǵڼ���
            for (var k = 0; k < grid.columns.length; k++) {
                var column = grid.columns[k];
                if (name === column.dataIndex) {
                    colIndex = k;
                    break;
                }
            }

            var keyvalue = record.data[grid.buskey];//�����е�ֵ����֧�ֵ�����
            var rowIndex = store.find(grid.buskey, keyvalue); //�õ��ڼ���,�кŲ�һ����λ��׼,������������λ

            var editor = grid.columns[colIndex].getEditor();

            if (editor) {
                if (!editor.validateValue(value)) {
                    alert(' �С�' + column.text + '�����벻�Ϸ���' + editor.activeErrors);

                    //grid.plugins[0].startEditByPosition({ row: i, column: (j+1) });
                    grid.plugins[0].startEdit(colIndex, (rowIndex + 1));

                    return false;
                }
            }
        }
    }

    return true; 
}

function FormatToDate(CurrTime,format) {

    //"Mon Jan 7 15:07:37 UTC+0800 2013";

    //"Thu Jan 03 2013 00:00:00 GMT+0800"

    //

    CurrTime = CurrTime + '';
    var date = '';
    var month = new Array();
    month["Jan"] = 1;
    month["Feb"] = 2;
    month["Mar"] = 3;
    month["Apr"] = 4;
    month["May"] = 5;
    month["Jun"] = 6;
    month["Jul"] = 7;
    month["Aug"] = 8;
    month["Sep"] = 9;
    month["Oct"] = 10;
    month["Nov"] = 11;
    month["Dec"] = 12;

    var str = CurrTime.split(" ");

    if (CurrTime.indexOf('UTC') > 0) {
        if (format === "yyyy-mm-dd") {
            date = str[5] + '-' + month[str[1]] + '-' + str[2];
        }
        else if (format.toLocaleLowerCase() === "yyyy-mm-dd hh:mm:ss") {
            date = str[5] + '-' + month[str[1]] + '-' + str[2] + " " + str[3];
        }
    }
    else if (CurrTime.indexOf('GMT') > 0) {
        if (format.toLocaleLowerCase() === "yyyy-mm-dd") {
            date = str[3] + '-' + month[str[1]] + '-' + str[2];
        }
        else if (format.toLocaleLowerCase() === "yyyy-mm-dd hh:mm:ss") {
            date = str[3] + '-' + month[str[1]] + '-' + str[2] + " " + str[4];
        }
    }
   

    return date;
}

function BindCombox(combox, code, name, helpid, codeValue) {

    //

    Ext.Ajax.request({
        //params: { 'id': busid },
        url: '../SUP/CommonHelp/GetName?helpid=' + helpid + '&code=' + codeValue,
        success: function (response) {
                    
            var resp = Ext.JSON.decode(response.responseText);          
            if (resp.status === "ok") {              

                Ext.define('model', {
                    extend: 'Ext.data.Model',
                    fields: [{
                        name: code, //'code',
                        type: 'string',
                        mapping: code//'code'
                    }, {
                        name: name, //'name',
                        type: 'string',
                        mapping: name//'name'
                    }
                     ]
                });                

                var obj = new Object();
                obj[code] = codeValue;
                obj[name] = resp.name;
                var provincepair = Ext.ModelManager.create(obj, 'model');
                combox.setValue(provincepair);

            } else {
                Ext.MessageBox.alert('ȡ��ʧ��', resp.status);
            }
        }
    });
}


// #endregion

