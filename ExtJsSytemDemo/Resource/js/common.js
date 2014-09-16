///<reference path="../vswd-ext.js" />
var $ajaxInfo, $ajaxData, _isIE = navigator.userAgent.indexOf("MSIE") >= 0, w = window,
$args = w.lastArguments,

VMODE = {};  //new Ext.ux.plugin.VisibilityMode({ hideMode: 'nosize' });

Ext.useShims = true;
Ext.Ajax.timeout = 300000;

//var App = new Ext.App();
var Cookie = new Ext.state.CookieProvider({
    path: "/",
    expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30)) //30 days
});


//#region AF
function $AF(o) {
    return $AF.ctor.call($AF, o);
}

$AF.toParam = function (obj) {
    var pm = obj;
    if (Ext.isObject(obj)) {
        var arr = [];
        for (var p in obj) {
            //��include�������⴦��,�Զ���ȡhandle
            if (p.toLowerCase() == 'include' && obj[p].$AF) {
                obj[p] = obj[p].func("GetHandle", "");
            }

            arr.push(p);
            arr.push("=");
            //args.push(typeof aij[p] == 'string' ? aij[p].replace(/\r\n/g, '\\r\\n') : aij[p]);
            arr.push(obj[p]);
            arr.push(";");
        }
        pm = arr.join('');
    }
    return pm;
};

$AF.create = function (pobj) {
    var o, path = location.href.substr(0, location.href.indexOf(C_ROOT, 7)) + C_ROOT + "NG2/supcan/",
        cfg = pobj.ObjConfig,
        zipurl = path + "BCV1.bin",
        typeid = _isIE ? 'CLASSID="clsid:619F1AC0-2644-40D3-9EB1-22F81C5FE097" Codebase="' + path + 'supcan2.cab#Version=1,0,0,3"' : 'type="application/supcan-plugin" Codebase="' + path + 'supcan.xpi"';

    if (cfg.type == "LuxForm")
        zipurl += "," + path + "LuxForm.bin";
    else if (cfg.type.indexOf("BCV4") >= 0)
        zipurl += "," + path + "BCV4.bin";

       try {
               cfg.ver = SupCanVersion;    
       } catch (e) {}
     
    cfg.param = 'Border=0;';


    if ($sessionid) {
        document.cookie = 'ASP.NET_SessionId=' + escape($sessionid);
    }
    
    $$(pobj).innerHTML = ['<Object id=', cfg.id, ' Width=100% height=100% ', typeid, '>',
             '<param Name="CtlName" Value="', cfg.type, '">',
             '<param Name="CtlVersion" Value="', cfg.ver, '">',
             '<param Name="ZipUrl" Value="', zipurl, '">',
             '<param Name="id" Value="', cfg.id, '">',
             '<param Name="Cookie" Value="', document.cookie, '">',
             '<param Name="CtlPara" Value="dynaloadVersion=2;', cfg.param, '"></Object>'
            ].join('');
    o = $$(pobj).firstChild;
    //}
    o.Template = pobj.Template;
    o.Cfg = cfg;
    return o;
}

$AF.ctor = function (o) {
    var o = $$(o);
    if (!o) alert("Error: $AF(o) == null");
    if (!o.isReady || o.$AF) return o;

    try {
        var ps = o.func('reflectProps', ''), fs = o.func('reflectFuncs', '');

        if (ps.length + fs.length == 0) return;
        ps = ps.split(',');
        fs = fs.split(',');

        _initFuncs(fs);

        _initProps(ps);

        //��ʼ��
        o.init = function () {
        }

        //��̬���һ��get���� ���ص����ӿؼ���id
        o.get = function (id) {
            $AF.Controls = $AF.Controls || {};
            var sub = $AF.Controls[id];
            if (!sub) {
                var type = o.func('GetObjectType', id);
                if (type) {
                    var ps2 = o.func('reflectProps', id).split(','),
                            fs2 = o.func('reflectFuncs', id).split(',');

                    sub = $AF.Controls[id] = { id: id, xtype: type, AF: o };
                    //ע���Ӷ���ķ���������
                    _initFuncs(fs2, sub);
                    _initProps(ps2, sub);
                }
            }
            return sub;
        };

        _ext();

        o.$AF = true;
    }
    catch (e) { }

    return o;

    //��OBJECT���Զ�����չ
    function _ext() {
        o.isChanged = IsChanged = o.getChanged;
        switch (o.Cfg.type) {
            case 'BCV1.TreeList':
                setFunc('getChanged', function (opt) {
                    opt = opt || {};
                    if (opt.level === undefined) opt.level = 1;
                    var r = o.func('toJson', o.GetChangedXML($AF.toParam(opt)));
                    if (r == 0) r = '';
                    return r;
                });
                //����ѡ�е���
                setFunc('getCheckedRows', function (rowname) {
                    rowname = rowname || 'checked';
                    return o.FindAll(rowname + '=1').split(',');
                });
                //��ȡ������ֵ
                setFunc('getKeyValue', function () {
                    var vs = [], a = arguments;
                    for (var i = 0; i < a.length; i++) {
                        if (Ext.isArray(a[i])) {
                            for (var j = 0; j < a[i].length; j++) {
                                _getV(a[i][j]);
                            }
                        }
                        else {
                            _getV(a[i]);
                        }
                    }

                    return vs.length == 1 ? vs[0] : vs.length == 0 ? '' : vs;

                    function _getV(n) {
                        if (n != '' && n != null) {
                            n = Number(n);
                            if (!isNaN(n))
                                n = o.GetRowKey(n);

                            if (n || n != '')
                                vs.push(n);
                        }
                    }
                });
                //��ȡQuery
                setFunc('getQuery', function (bar) {
                    var h = this.GetHandle(bar || "topBar");
                    var xml = o.func(h + "Export", "content=asData;includeEmpty=False");
                    return xml == '' ? '' : o.func("toJSON", xml + "\r\n recordset");
                });
                break;
            case 'BCV1.FreeForm':
                setFunc('getChanged', function (opt) {
                    opt = opt || {};
                    if (opt.level === undefined) opt.level = 1;
                    var r = o.func('toJson', o.GetChangedXML(opt));
                    if (r == 0) r = '';
                    return r;
                });
                //��ȡ��ѯ����
                setFunc('getQuery', function (h) {
                    h = h || '';
                    var xml = o.func(h + "Export", "content=asData;includeEmpty=False");
                    return xml == '' ? '' : o.func("toJSON", xml + "\r\n recordset");
                });
                break;
            case 'BCV1.Tree':
                break;
            case 'LuxForm':
                break;
            case 'BCV1.Chart':
                break;
            default:
                alert('��OBJECT���Զ�����չδʵ��' + o.GetCtlName());
                break;
        }
        o._OpenLoadMask = o.OpenLoadMask;
        setFunc('OpenLoadMask', function (ms) {
            o._OpenLoadMask(ms || 500);
        });

        function setFunc(fname, func) {
            var s1 = fname.slice(0, 1), s2 = fname.slice(1);
            o[s1.toUpperCase() + s2] = o[s1.toLowerCase() + s2] = func;
        }
    }

    function _initProps(props, obj) {
        obj = obj || o;
        _each(props, function (item) {
            var s1 = item.slice(0, 1), s2 = item.slice(1);
            if (obj[s1.toUpperCase() + s2] || obj[s1.toLowerCase() + s2]) s1 = '$' + s1;
            obj[s1.toUpperCase() + s2] = obj[s1.toLowerCase() + s2] = function (v) {
                if (arguments.length == 0) {//get
                    return obj == o ? o.GetProp(item) : o.GetObjectProp(obj.id, item);
                }
                else {
                    obj == obj == o ? o.SetProp(item, v) : o.SetObjectProp(obj.id, item, v);
                }
            }
        });
    }

    function _initFuncs(funcs, obj) {
        obj = obj || o;
        _each(funcs, function (item) {
            var s1 = item.slice(0, 1), s2 = item.slice(1);
            //if (obj[s1.toUpperCase() + s2] || obj[s1.toLowerCase() + s2]) alert(obj.id + '�����ظ�:' + item);
            obj[s1.toUpperCase() + s2] = obj[s1.toLowerCase() + s2] = function () {
                return o.func(item, obj == o ? _args(arguments) : _args(obj.id, arguments));
            };
        });
    }

    function _args() {
        var a = arguments, args = [];
        for (var i = 0; i < a.length; i++) {
            if (typeof a[i] == 'object' && typeof a[i].length == 'number') {
                for (var j = 0; j < a[i].length; j++) {
                    var aij = a[i][j];
                    if (typeof aij == 'string') {
                        args.push(aij);
                    }
                    else if (typeof aij == 'object') {
                        //��objectת���� supcan ����ʶ�Ĳ���
                        //object �Զ���ֳ�  p1=value1;p2=value2 ����ʽ
                        args.push($AF.toParam(aij));
                    }
                    else {
                        args.push(a[i][j]);
                    }
                }
            }
            else {
                args.push(a[i]);
            }
        }
        return args.join("\r\n");
    }

    function _each(arr, func) {
        var i, tmp;
        for (i = 0; i < arr.length; i++) {
            tmp = arr[i];
            if (tmp) {
                func.call(o, tmp, i);
            }
        }
    }
}

//����ĺ���(�ؼ��ᷴ����ã���;:�л�����)
function focusIE(o) {
    //debugger;
    var ae = document.activeElement;
    if (ae) {
        if (!_isIE) {
            ae.blur();
            return;
        }

        if (typeof (o) == 'object') {
            if (ae == o) return;
            o.focus();
        }
        else {
            if (ae.id == o) return;
            var o = $$(o);
            try {
                if (o != null) o.focus();
            }
            catch (err) {
                //alert("focus�쳣:" + err.message  );
            } 	
        } 
    }
}

function OnReady(id) {
    var o = $$(id);
    if (o) {
        if (!o.$AF) {
            o.Template = o.Template || '1';
            o.isReady = true;
            o = $AF(o);
            //console.log(id + ' try to onready');
        }

        if (o.$AF) {
            //console.log(id + ' try to Build Width:'+o.offsetWidth);
            if (o.Template && o.Template.length > 1) {
                o.Template = o.func("Build", o.Template);
            }
            if (o.OnReady) {
                try { o.OnReady(); } catch (e) { }
                o.OnReady = null;
            }
            if (o.bakPNode && o.offsetWidth == 1 && o.offsetHeight == 1) {
                o.style.width = o.bakWidth || '100%';
                o.style.height = o.bakHeight || '100%';
                o.bakPNode.appendChild(o);
                //console.log('ieAF:' + o.id);
            }
        }
    }
}
var __allReadyInterval;
window.onload = function () {
    __allReadyInterval = __allReadyInterval || setInterval(function () {
        var objs = document.getElementsByTagName("object"), r = true; all = 0; allready = 0;
        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];
            if (obj.codeBase.indexOf("supcan") >= 0 && obj.Cfg && !obj.$AF) {
                if (_isIE && (obj.offsetWidth == 0 || obj.offsetHeight == 0)) {
                    obj.bakPNode = obj.parentNode;
                    obj.bakWidth = obj.style.width;
                    obj.bakHeight = obj.style.height;
                    obj.style.width = obj.style.height = "1px";
                    debugger;
                    (document.body || document.documentElement).insertBefore(obj);
                }

                try { OnReady(obj.id); } catch (e) { }
                r = false;
              }
           //}
        }

        if (r) {
            clearInterval(__allReadyInterval);
            //console.log('all ready');
            AllReady();
        }
    }, 500);
}

function AllReady() { }

function OnEvent(id, Event, p1, p2, p3, p4) {
    //console.log('id=' + id + ' EventName=' + Event + ' | ' + p1 + ' | ' + p2 + ' | ' + p3 + ' | ' + p4);
    //����ִ������js
    //alert('id:' + id + '\nEvent:' + Event);
    var o = $AF(id);
    if (o) {
        if (Event.slice(0, 2) != 'On') Event = 'On' + Event;
        var evt = o[Event];
        if (o.GetCtlName() == 'FreeForm') {
            //'FreeForm'�� p1 Ϊ�ӿؼ��� id
            var sub = o.get(p1);
            if (sub) {
                evt = sub[Event];
                o = sub;
            }
        }

        if (typeof evt == 'function')
            evt.call(o, p1, p2, p3, p4);
    }
}
//#endregion

//#region ��Ext����չ

//QueryString
Ext.getUrlParam = function (param) {
    var params = Ext.urlDecode(location.search.substring(1));
    return param ? params[param] : params;
};

//�� Ajax.request �� url �� @ �滻�� ��ǰҳ������
Ext.Ajax.on('beforerequest', function (conn, opts) {
    opts.url = $url(opts.url);
    //opts.params ��һ���Ӷ���ת��Ϊ�ַ���
    if (Ext.isObject(opts.params)) {
        for (var p in opts.params) {
            if (Ext.isArray(opts.params[p]) || Ext.isObject(opts.params[p])) {
                opts.params[p] = Ext.encode(opts.params[p]);
            }
        }
    }
});
//��Ajax���ش�������Ч����֤
Ext.Ajax.on('requestcomplete', function (conn, res, opts) {
    res.options = opts;
    res.text = res.responseText
    try {
        $ValidateResponse(res);
    }
    catch (e) {
        Ext.Msg.alert(e.message, res.responseText);
    }
});
//����������ʱ,ͳһ����
Ext.Ajax.on('requestexception', function (conn, res, opts) {
    if (res.status == 0)
        Ext.Msg.alert('requestexception', 'url:' + opts.url + '<br/>' + res.statusText);
});
//#endregion

//#region Panel ��չ
Ext.Panel.prototype.updateIframe = function (url) {
    this.html = "<iframe src='" + url + "' width=100% height=100% frameborder=0></iframe>";
    this.update(this.html);
}
//#endregion

//#region Window ��չ


Ext.override(Ext.window.Window, {

    //ΪWindow���һ�� waitIframe ����
    waitIframe: function (url, func, funcMustDo) {

        this.isIframeInited = this.isIframeInited || false;
        if (!this.rendered) {
            this.render(Ext.getBody());
        }
        if (this.isIframeInited) {
            //����ִ�еĺ���
            if (this.isIframeReady && funcMustDo) funcMustDo.call(this);
        }
        else {
            this.updateIframe(url);
            var iframe = this.body.dom.childNodes[0];
            this.dw = iframe.contentWindow;
            this.dw.winCmp = this;
            iframe.winCmp = this;
            var count = 0;           

            //debugger;

//            var interval = interval ||
//			setInterval(function () {
//			    if (!this.dw.isReady) {
//			        if (++count >= 6000) {
//			            clearInterval(interval);
//			        }
//			        return;
//			    }
//			    clearInterval(interval);

//			    this.isIframeReady = true;
//			    func.call(this);

//			    //����ִ�еĺ���
//			    if (funcMustDo) funcMustDo.call(this);
//			} .createDelegate(this), 50);

             var interval = interval ||
			 setInterval(Ext.Function.bind(function () {
			    if (!this.dw.isReady) {
			        if (++count >= 6000) {
			            clearInterval(interval);
			        }
			        return;
			    }
			    clearInterval(interval);

			    this.isIframeReady = true;
			    func.call(this);

			    //����ִ�еĺ���
			    if (funcMustDo) funcMustDo.call(this);
			},this), 50);

            this.isIframeInited = true;
        }
    },

    //centerToScreen
    centerToScreen: function () {
        var xy = this.el.getAlignToXY(this.container, 'c-c');
        this.setPagePosition(xy[0], xy[1] - xy[1] * 0.25);
        return this;
    },

    //#region Cover ActiveX
    maskObj: function (b) {
        this.objArr = $mask(b, this);
    },

    //        beforeShow: Ext.Window.prototype.beforeShow.createSequence(function () {
    //            if (this.autoScreen) this.centerToScreen();

    //            if (this.modal) this.maskObj(true);
    //        }),
    //        hide: Ext.Window.prototype.hide.createSequence(function () {
    //            if (this.modal) {
    //                this.maskObj(false);
    //            }
    //        })

        beforeShow: Ext.Function.createSequence(Ext.Window.prototype.beforeShow,function () {
            if (this.autoScreen) this.centerToScreen();

            if (this.modal) this.maskObj(true);
        }, this),     

        hide: Ext.Function.createSequence(Ext.Window.prototype.hide,function () {
            if (this.modal) {
                this.maskObj(false);
            }
        },this)
 

 //��������������ز���
//    beforeShow: function () {

//        if (this.autoScreen) this.centerToScreen();

//        if (this.modal) this.maskObj(true);       
//    },
//    hide: function () { 
//        if (this.modal) {
//            this.maskObj(false);
//        }       
//    }

    //#endregion

});

//#endregion

//#region �Զ�����չ

Ext.FitDiv = function (id) {
    var obj = $$(id), w = window, doc = document, de = 'documentElement',
        r = obj.getAttribute('right'), b = obj.getAttribute('bottom'),
        rr = Math.abs(parseInt(r, 10)), bb = Math.abs(parseInt(b, 10));

    Ext.EventManager.addListener(w, 'resize', initSize);
    initSize();
    return obj;

    function initSize() {
        //debugger;
        extobj = Ext.get(obj);
        width = w.innerWidth ? w.innerWidth : (doc[de] && doc[de].clientWidth) ? doc[de].clientWidth : doc.body.offsetWidth;
        height = w.innerHeight ? w.innerHeight : (doc[de] && doc[de].clientHeight) ? doc[de].clientHeight : doc.body.offsetHeight;

        if (r != null) {
            if (r.indexOf('%') >= 0)
                extobj.setWidth(width * (100 - rr) / 100 - extobj.getLeft() - 1);
            else
                extobj.setWidth(width - rr - extobj.getLeft() - 1);
        }

        if (b != null) {
            height = b.indexOf('%') >= 0 ? height * (100 - bb) / 100 - extobj.getTop() - 1 : height - bb - extobj.getTop() - 1;
            extobj.setHeight(height);
            if(_isIE && extobj.first())
                extobj.first().setHeight(height);
        }

    }
}

//#region $ShowHelp
function $ShowHelp(opts) {
    if (!Ext.isObject(opts)) {
        alert('$ShowHelp: opts must be a object');
        return;
    }
    opts.$params = opts.$params || {};
    opts.$params.callback = opts.$params.callback || opts.callback;
    opts.$params.ctrl = opts.$params.ctrl || opts.ctrl;
    opts.$params.codeField = opts.$params.codeField;
    opts.$params.nameField = opts.$params.nameField;

    opts.$params.id = opts.$params.id || opts.$params.helpid || opts.id || opts.helpid
    if (opts.$params.id == null || opts.$params.id == '') {
        alert('$ShowHelp: id is null or empty');
        return;
    }
    delete opts.id;

    //opts.url = C_ROOT + "SUP/Base/CommHelp.aspx?id=" + opts.$params.id + "&codeField=" + opts.$params.codeField + "&nameField=" + opts.$params.nameField;

    opts.url = C_ROOT + "SUP/CommonHelp?helpid=" + opts.$params.id + "&selectMode=" + opts.$params.selectMode
                               + "&codeField=" + opts.$params.codeField + "&nameField=" + opts.$params.nameField;

    $ShowDialog(opts)
}
//#endregion

//#region $ShowDialog
//url ��ַ  isWFrame�Ƿ��ǿ�ܼ� modal�Ƿ�ģ̬  width height
function $createDialog(opts) {
    if (Ext.isString(opts)) opts = { url: opts };
    if (Ext.isEmpty(opts.url)) {
        alert('$ShowDialog:url is null');
        return;
    }
    var autoId = 'dialog_' + opts.url.replace(/[\/\.\?=]/g, '');
    //console.log(autoId);

//    var winCmp = $WinMgr.get(autoId), backupClosable = opts.closable;
//    if (winCmp != null && !winCmp.isIframeReady) {
//        winCmp.destroy();
//        winCmp = null;
//    }     

    var winCmp = null, backupClosable = opts.closable;
    //��֤winCmp�ǿɹرյ�,����������ʧ��ʱ�û����Թرմ���      
    opts.closable = true;

    if (winCmp == null) {
        winCmp = new Ext.Window(Ext.apply({
            //id: autoId, //id�����ظ�
            //plugins: VMODE,
            closeAction: 'hide',
            modal: true,
            autoScreen: true,
            title: '&nbsp;',
            initHidden: true,
            width: 500,
            height: 300,
            layout: 'fit',
            open: function () {
                //��ʾ����
                this.show();

                //���ô�����ⱻ����
                if (this.y < 0) this.setPagePosition(this.x, 1);

                this.waitIframe(this.url,
	            function () {
	                //debugger;
	                //this.buttons[0].destroy();
	                this.getDockedItems()[1].getComponent(0).destroy(); //ext4
	                if (!backupClosable) {

	                    //this.getTool('close').hide();
	                    //this.tools.close.hide();
	                    this.getDockedItems()[0].getComponent(1).hide(); //ext4
	                }
	                var dw = this.dw;
	                if (dw.init) dw.init.call(this, this);
	                //if (dw.hideAction) this.on('hide', this.dw.hideAction.createDelegate(winCmp, [winCmp.$params]));
	                if (dw.hideAction) this.on('hide', Ext.Function.bind(this.dw.hideAction, winCmp, [winCmp.$params]));
	            },
	            function () {
	                var dw = this.dw;
	                if (dw && dw.dealAction) {
	                    dw.dealAction.call(winCmp, winCmp.$params);
	                }
	            }
            );
            },
            listeners: {
                move: function (me, x, y) {
                    //���ô�����ⱻ����
                    if (y < 0) me.setPagePosition(me.x, 1);
                }
            },
            buttons: [{ text: '��������...'}]
        }, opts));
  
        //$WinMgr.register(winCmp);
    }
    else {
        winCmp.$params = opts.$params;
    }

    return winCmp;
}

function $ShowDialog(opts) {
    $createDialog(opts).open();
}
//#endregion

//�ж��Ƿ����ֶζ���
function $IsField(obj) {
    return obj.isFormField;
}

//items : Container.items
//validate: �Ƿ���֤��
//idRegex: id1|id2  ƥ���������ʽ
//return: params
function $BuildFieldParmas(items, validate, idRegex) {
    var params = {};
    _buildValues(items);
    return params;

    function _buildValues(items) {
        if (items === undefined) {
            alert('$BuildFieldParmas: ��ȷ��container.items��ֵ');
            return {};
        }
        items.each(function () {
            if (this.items) {
                _buildValues(this.items);
            }

            var id = this.getId();
            if (checkID(id) && $IsField(this)) {
                if (validate && !this.validate()) {
                    //��֤ʧ��
                    params = false;
                    return;
                }
                params[id] = this.getValue();
            }
        });
    }

    function checkID(id) {
        if (idRegex == null) return true;
        return idRegex.test(id);
    }
}

function $ValidateResponse(xhr) {
    //debugger;       
    if (xhr.valid === undefined) {
        var info = $ajaxInfo = $GetAjaxInfo(xhr);
        if (!$ajaxInfo) return true;
        $ajaxData = $ajaxInfo.data;
        if ($ajaxData && $ajaxData.NeedLogin) { 
                    
            //��ʾ��½����
            var f = parent.WFrame || w.WFrame;
            if (f) {
                var opts = xhr.options;
                if (opts.url && opts.url.charAt(0) != '/') {
                    opts.url = $path(C_PATH + opts.url);
                }
                f.Login.open(opts);
                return true;
            }
        }
        if (info.msgtype && info.msg) {
            var msg = unescape(info.msg);
            var title = unescape(info.msgtitle);
            //var icon = Ext.MessageBox[info.msgicon.toUpperCase()];
            switch (info.msgtype) {
                case 'Alert':
                    alert(msg);
                    break;
                default:
                    alert(info.msgtype + ' δʵ��,��common.js');
                    break;
            }
        }
        xhr.valid = info.type == 'Succ';
    }
    return xhr.valid;
}

//response: ResponseText
//validate: �Ƿ�Է��ص�json������֤,�����������ʾ,Ĭ��=false
function $DecodeResponse(response, validate) {
    //ss(response);
    var rtn = response.valid;
    if (validate && !$ValidateResponse(response)) {//��Ҫ��֤ʱ ���� ��֤ʧ��ʱ,ֱ�ӷ���,������ת��
        rtn = 0;
    }
    else {
        //responseText Ϊ��ʱ,����1 ��:true
        rtn = Ext.decode(response.responseText || rtn);
    }

    return rtn;
}

function $GetAjaxInfo(response) {

    //�������trim,IE�е�BUG,���ں����һ���ո�
    return Ext.decode(response.getResponseHeader("AjaxInfo"));
}

function $GetWFrame() {
    try {
        var cw = w;
        while (cw != top) {
            if (cw.WFrame)
                break;
            else
                cw = cw.parent;
        }
    } catch (e) { }
    return cw.WFrame;
}

function $OpenTab(title, url, params) { 
    var f = $GetWFrame();
    if (f && f.Center) {
        f.Center.openTab(title, url, params);
    }
    else {
        var nw = window.open($path(url), title, 'toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no');
                
        nw.lastArguments = params || {};
    }
}

function $CloseTab(n) {
    var f = $GetWFrame();
    if (f && f.Center) {

        //debugger;

        //f.Checker.fireEvent('checkin', f.Checker);//����ǩ�����

        //var tab = f.Center.get(n) || f.Center.getActiveTab();
        var tab = f.Center.getComponent(n) || f.Center.getActiveTab();        

        f.Center.remove(tab);
    }
    else {
        w.close();
    }
}

//#endregion

//#region ҵ����չ
//#region ��ť״̬����
//UIType NotControl=Ĭ�ϲ�����,View=�鿴,Add=����,Edit=�༭,Verify=���,��ϵ�ʱ�����һ��д,��AddEdit=��ʾ�����༭
function $SetUIState(cont, state, hide) {
    var funcName;
    if (cont) {
        if (cont.cascade) {
            funcName = hide ? 'setVisible' : 'setDisabled';
            cont.cascade(function (item) {
                if (item[funcName] && item.UIType && !item.UIType.match(/NotControl/i)) {
                    var b = item.UIType.match(new RegExp(state, "i"));
                    if(!hide) b = !b;
                    item[funcName](b);
                }
            });
        }
        else if (cont.GetObjectID) {
            funcName = hide ? 'Visible' : 'Enable';
            for (var i = 0; i < 9999; i++) {
                var id = cont.GetObjectID(i);
                if (id) {
                    var uitype = cont.GetObjectProp(id, 'UIType');
                    if (uitype && !uitype.match(/NotControl/i)) {
                        cont.SetObjectProp(id, funcName, item.UIType.match(new RegExp(state, "i")));
                    }
                }
                else
                    break;
            }
        }
    }
}
//#endregion
//#endregion

//#region Util

function HTMLDecode(strHtml) {

    var div = document.createElement('div');
    div.innerHTML = strHtml;

    var str = div.firstChild.nodeValue;   
    return str;

    //           if (div.innerText == undefined) {
    //              return  div.TextContent;//firefox
    //           }
    //           else {
    //               return div.innerText;//IE
    //           }

}

//-------��ȡExt.form.Panel���������-----
//
//form: ��Ext.form.Panel����
//key: ���ݵ�����,��������","��Ϊ�ָ���
//optype:��������, ������new,�޸ģ�edit
//����json��ʽ����
//----------------------------------------------
function GetExtJsFormData(form, key, optype) {

    if (optype === 'new') {
        optype = 'newRow';
    }
    else {
        optype = 'modifiedRow';
    } 

    var formdata = form.getForm();
    var data = formdata.getValues();
    
    var obj = new Object();
    obj['key'] = key;
    obj[optype] = data;
    obj = { 'row': obj };
    data = { 'form': obj };

    var json = JSON.stringify(data);//Ext.encode(data);
    return json;
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

        //debugger;
        var newobj = record.data;
        newobj["key"] = null;
        newobj = { 'row': newobj }; //�б��
        newdata.push(newobj);
    });


    var modifydata = [];
    Ext.Array.each(modifyRecords, function (record) {
        debugger;

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
        modifyobj["key"] = values;

        //�����޸ĵ��ֶ�,ֻ���޸ĵĲ���,�������ݴ�����
        var modified = new Object();
        for (var p in record.modified) {
            modified[p] = record.data[p];
        }
        modifyobj = { 'row': modified }; //�б��

        modifydata.push(modifyobj);
       
    });

    var removedata = [];
    Ext.Array.each(removeRecords, function (record) {
        //debugger;

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

    //debugger;
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

//#endregion


