'use strict';
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
require('./poper.css');
var react_1 = __importDefault(require('react'));
var react_dom_1 = __importDefault(require('react-dom'));
if (!react_1 || !react_dom_1) {
    throw new Error('react-poper must can only work in react project');
}
var Context = react_1.default.createContext({});
var Modal = (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.dismiss = function (finish) {
            if (typeof _this.props.index === 'number') {
                _this.context.pop && _this.context.pop.dismiss(_this.props.index, finish);
            }
        };
        return _this;
    }
    Modal.prototype.modalWillShow = function () {};
    Modal.prototype.modalWillHide = function () {};
    Modal.prototype.modalDidShow = function () {};
    Modal.prototype.modalDidHide = function () {};
    Modal.prototype.modalTapMask = function () {
        this.dismiss();
    };
    Modal.masktap = false;
    Modal.onlyone = true;
    Modal.dimming = -1;
    Modal.fademode = 'all';
    Modal.contextType = Context;
    return Modal;
})(react_1.default.Component);
exports.Modal = Modal;
var Alert = /** @class */ (function (_super) {
    __extends(Alert, _super);
    function Alert() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.state = { scale: 0 };
        return _this;
    }
    Alert.prototype.modalWillShow = function () {
        this.setState({ scale: 1 });
    };
    Alert.prototype.render = function () {
        var _this = this;
        var scale = this.state.scale;
        var confirmText = 'Confirm';
        var confirmBlock;
        var _a = this.props,
            confirm = _a.confirm,
            cancel = _a.cancel,
            message = _a.message,
            title = _a.title,
            theme = _a.theme;
        if (confirm) {
            if (typeof confirm === 'string') {
                confirmText = confirm;
            } else if (typeof confirm === 'function') {
                confirmBlock = confirm;
            } else {
                confirmText = confirm.title || 'Confirm';
                confirmBlock = confirm.block;
            }
        }
        var menus = [
            react_1.default.createElement(
                'a',
                {
                    key: '1',
                    className: 'rp-alert-btn',
                    style: { color: theme || '#fea310' },
                    onClick: function () {
                        _this.dismiss(confirmBlock);
                    },
                },
                confirmText,
            ),
        ];
        if (cancel) {
            var cancelText = 'Cancel';
            var cancelBlock;
            if (typeof cancel === 'string') {
                cancelText = cancel;
            } else if (typeof cancel === 'function') {
                cancelBlock = cancel;
            } else {
                cancelText = cancel.title || 'Cancel';
                cancelBlock = cancel.block;
            }
            menus.push(
                react_1.default.createElement(
                    'a',
                    {
                        key: '2',
                        className: 'rp-alert-btn rp-alert-cancel',
                        onClick: function () {
                            _this.dismiss(cancelBlock);
                        },
                    },
                    cancelText,
                ),
            );
        }
        return react_1.default.createElement(
            'div',
            { className: 'rp-box-all rp-box-alert', style: { transform: 'scale(' + scale + ')' } },
            react_1.default.createElement('div', { className: 'rp-alert-title' }, title),
            react_1.default.createElement('div', { className: 'rp-alert-body' }, message),
            react_1.default.createElement('div', { className: 'rp-alert-btns' }, menus),
        );
    };
    return Alert;
})(Modal);
Alert.defaultProps = { priority: 1000, theme: '#fea310' };
exports.Alert = Alert;
var Remind = /** @class */ (function (_super) {
    __extends(Remind, _super);
    function Remind() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Remind.prototype.modalDidShow = function () {
        var _this = this;
        setTimeout(function () {
            return _this.dismiss();
        }, (this.props.duration || 1) * 1000);
    };
    Remind.prototype.render = function () {
        return react_1.default.createElement('div', { className: 'rp-box-all rp-box-remind' }, this.props.message);
    };
    Remind.dimming = 0;
    return Remind;
})(Modal);
Remind.defaultProps = { priority: 1001, duration: 1 };
exports.Remind = Remind;
var Wait = /** @class */ (function (_super) {
    __extends(Wait, _super);
    function Wait() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.canCancel = false;
        return _this;
    }
    Wait.prototype.modalDidShow = function () {
        var _this = this;
        setTimeout(function () {
            return (_this.canCancel = true);
        }, (this.props.timeout || 20) * 1000);
    };
    Wait.prototype.modalTapMask = function () {
        if (this.canCancel) {
            this.dismiss();
        }
    };
    Wait.prototype.render = function () {
        var items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        var theme = this.props.theme || 'dark';
        return react_1.default.createElement(
            'div',
            { className: 'rp-box-all rp-box-wait rp-wait-' + theme },
            react_1.default.createElement(
                'div',
                { className: 'rp-wait-icon' },
                items.map(function (i) {
                    return react_1.default.createElement('div', { key: i, className: 'rp-wait-icon-item', style: { '--idx': i } });
                }),
            ),
            react_1.default.createElement('div', { className: 'rp-wait-text' }, this.props.message),
        );
    };
    Wait.dimming = 0;
    Wait.masktap = true;
    return Wait;
})(Modal);
Wait.defaultProps = { priority: 1002, timeout: 20 };
exports.Wait = Wait;
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.state = { modals: [] };
        return _this;
    }
    Object.defineProperty(Container.prototype, 'count', {
        get: function () {
            return this.state.modals.filter(function (ele) {
                return !ele.removed;
            }).length;
        },
        enumerable: true,
        configurable: true,
    });
    Container.prototype.addModal = function (meta, metaProps, finish) {
        var _this = this;
        if (meta.onlyone) {
            var index_1 = this.state.modals.findIndex(function (ele) {
                return ele.meta === meta && !ele.removed;
            });
            if (index_1 >= 0) {
                finish();
                return;
            }
        }
        var modals = this.state.modals.concat();
        var index = modals.push({ metaProps: metaProps, meta: meta }) - 1;
        this.setState({ modals: modals });
        setTimeout(function () {
            var ins = _this.refs[index];
            ins.show().then(finish);
        }, 17);
    };
    Container.prototype.delModal = function (meta, finish) {
        var modals = this.state.modals;
        var promises = [];
        for (var index = modals.length - 1; index >= 0; index--) {
            var ele = modals[index];
            if (ele.meta === meta) {
                ele.removed = true;
                var ins = this.refs[index];
                promises.push(ins.hide());
            }
        }
        if (promises.length > 0) {
            Promise.all(promises).then(finish);
        } else {
            finish();
        }
    };
    Container.prototype.delIndex = function (index, finish) {
        var _this = this;
        var ins = this.refs[index + ''];
        if (ins) {
            var modal = _this.state.modals[index];
            modal.removed = true;
            ins.hide().then(finish);
        } else {
            finish();
        }
    };
    Container.prototype.clear = function (finish) {
        this.setState({ modals: [] }, finish);
    };
    Container.prototype.render = function () {
        return this.state.modals.map(function (prop, idx) {
            return react_1.default.createElement(Wrapper, __assign({ ref: idx + '', key: idx }, prop, { index: idx }));
        });
    };
    return Container;
})(react_1.default.Component);
var Wrapper = /** @class */ (function (_super) {
    __extends(Wrapper, _super);
    function Wrapper() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.state = { display: false, removed: _this.props.removed };
        _this.modal = null;
        return _this;
    }
    Wrapper.prototype.hide = function () {
        var _this = this;
        return new Promise(function (reslove) {
            if (_this.state.removed || !_this.state.display) {
                reslove();
                return;
            }
            _this.modal && _this.modal.modalWillHide && _this.modal.modalWillHide();
            _this.setState({ display: false });
            setTimeout(function () {
                if (_this.modal) {
                    if (_this.modal.props.onhide) {
                        _this.modal.props.onhide();
                    }
                    _this.modal.modalDidHide();
                }
                _this.modal = undefined;
                _this.setState({ removed: true });
                reslove();
            }, _this.context.pop.fadedur * 1000);
        });
    };
    Wrapper.prototype.show = function () {
        var _this = this;
        return new Promise(function (reslove) {
            if (_this.state.removed || _this.state.display) {
                reslove();
                return;
            }
            _this.setState({ display: true });
            _this.modal && _this.modal.modalWillShow && _this.modal.modalWillShow();
            setTimeout(function () {
                if (_this.modal) {
                    if (_this.modal.props.onshow) {
                        _this.modal.props.onshow();
                    }
                    _this.modal.modalDidShow();
                }
                reslove();
            }, _this.context.pop.fadedur * 1000);
        });
    };
    Wrapper.prototype.onClick = function () {
        if (this.props.meta.masktap) {
            this.modal && this.modal.modalTapMask && this.modal.modalTapMask();
        }
    };
    Wrapper.prototype.render = function () {
        if (this.state.removed) {
            return react_1.default.createElement('div', { style: { display: 'none' } });
        }
        var _this = this;
        var Meta = this.props.meta;
        var props = this.props.metaProps || {};
        var alpha = Meta.dimming < 0 ? this.context.pop.dimming : Meta.dimming;
        var style = { opacity: 1 };
        var bgstyle = { opacity: 1 };
        var dur = this.context.pop.fadedur;
        var priority = props.priority || (Meta.defaultProps && Meta.defaultProps.priority);
        if (!this.state.display) {
            if (Meta.fademode === 'mask') {
                bgstyle.opacity = 0;
            } else {
                style.opacity = 0;
            }
        }
        if (dur != 0.3) {
            style.transitionDuration = dur + 's';
        }
        if (priority) {
            style.zIndex = priority;
        }
        if (alpha != 0.4) {
            bgstyle.backgroundColor = 'rgba(0,0,0,' + alpha + ')';
        }
        if (dur != 0.3) {
            bgstyle.transitionDuration = dur + 's';
        }
        return react_1.default.createElement(
            'div',
            { style: style, className: 'rp-modal-root' },
            react_1.default.createElement('div', {
                style: bgstyle,
                className: 'rp-modal-mask',
                onClick: function (e) {
                    _this.onClick(e);
                },
            }),
            react_1.default.createElement(
                Meta,
                __assign({}, props, {
                    index: this.props.index,
                    ref: function (ins) {
                        _this.modal = ins;
                    },
                }),
            ),
        );
    };
    Wrapper.contextType = Context;
    return Wrapper;
})(react_1.default.Component);
var Poper = /** @class */ (function () {
    function Poper(config) {
        var _this = this;
        this.opqueue = [];
        this.container = null;
        if (config) {
            this.dimming = config.dimming > 0 ? config.dimming : 0.4;
            this.fadedur = config.fadedur > 0 ? config.fadedur : 0.3;
            this.errmsg = config.errmsg || 'System Error!';
            this.Alert = config.Alert || Alert;
            this.Wait = config.Wait || Wait;
            this.Remind = config.Remind || Remind;
        } else {
            this.dimming = 0.4;
            this.fadedur = 0.3;
            this.errmsg = 'System Error!';
            this.Wait = Wait;
            this.Alert = Alert;
            this.Remind = Remind;
        }
        this.dismiss = function (meta, finish) {
            if (_this.container) {
                _this.add({ type: 'dismiss', meta: meta, finish: finish });
            }
        };
        this.remind = function (props) {
            if (_this.Remind && _this.container && props) {
                if (typeof props === 'string') {
                    props = { message: props };
                }
                _this.add({ type: 'present', meta: _this.Remind, props: props });
            }
        };
        this.alert = function (props) {
            if (_this.Alert && _this.container && props) {
                if (typeof props === 'string') {
                    props = { message: props };
                }
                _this.add({ type: 'present', meta: _this.Alert, props: props });
            }
        };
        this.error = function (error) {
            _this.remind((error && error.message) || _this.errmsg);
        };
        this.wait = function (props) {
            if (_this.Wait) {
                if (typeof props === 'string') {
                    props = { message: props };
                }
                _this.add({ type: 'present', meta: _this.Wait, props: props });
            }
        };
        this.idle = function () {
            if (_this.Wait) {
                _this.add({ type: 'dismiss', meta: _this.Wait });
            }
        };
        this.root = document.createElement('div');
        this.root.className = 'rp-entry-root';
        if (this.fadedur != 0.3) {
            this.root.style.transitionDuration = this.fadedur + 's';
        }
        document.body.append(this.root);
        var dom = react_1.default.createElement(
            Context.Provider,
            { value: { pop: this } },
            react_1.default.createElement(Container, {
                ref: function (ins) {
                    return (_this.container = ins);
                },
            }),
        );
        react_dom_1.default.render(dom, this.root);
    }
    Poper.prototype.present = function (meta, props) {
        if (this.container) {
            this.add({ type: 'present', meta: meta, props: props });
        }
    };
    Poper.prototype.add = function (op) {
        this.opqueue.push(op);
        this.next();
    };
    Poper.prototype.next = function () {
        if (this.current) return;
        this.current = this.opqueue.shift();
        if (!this.current) return;
        var _a = this.current,
            type = _a.type,
            meta = _a.meta,
            finish = _a.finish,
            props = _a.props;
        switch (type) {
            case 'dismiss':
                this._remove(meta, finish);
                break;
            case 'present':
                this._present(meta, props);
                break;
        }
    };
    Poper.prototype._present = function (meta, props) {
        var _this = this;
        this.container.addModal(meta, props, function () {
            _this.current = undefined;
            _this.next();
        });
    };
    Poper.prototype._clear = function (finish) {
        if (this.root.style.opacity == '0') {
            finish();
            return;
        }
        var _this = this;
        this.root.style.opacity = '0';
        setTimeout(function () {
            _this.container.clear(function () {
                _this.root.style.opacity = '1';
                finish();
            });
        }, this.fadedur * 1000);
    };
    Poper.prototype._remove = function (meta, finish) {
        var _this = this;
        var block = function () {
            if (finish) {
                finish();
            }
            _this.current = undefined;
            _this.next();
        };
        if (_this.container.count <= 0) {
            block();
            return;
        }
        switch (typeof meta) {
            case 'number':
                _this.container.delIndex(meta, function () {
                    if (_this.container.count <= 0) {
                        _this.container.clear(block);
                    } else {
                        block();
                    }
                });
                break;
            case 'function':
                _this.container.delModal(meta, function () {
                    if (_this.container.count <= 0) {
                        _this.container.clear(block);
                    } else {
                        block();
                    }
                });
                break;
            default:
                _this._clear(block);
                break;
        }
    };
    return Poper;
})();
exports.Poper = Poper;
