"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactReconciler = _interopRequireDefault(require("react-reconciler"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var REACT_MINI_APP_ROOT = '$$REACT_MINI_APP_ROOT';
var REACT_MINI_APP_ROOT_BACKUP = '$$REACT_MINI_APP_ROOT_BACKUP';
var REACT_MINI_APP_METHOD = '$$REACT_MINI_APP_METHOD';
var TYPE_TEXT = Symbol('text');
var instanceCount = 0;

function setData(rootContext) {
  function clone(item) {
    var result = {};

    if (Array.isArray(item)) {
      result = item.map(function (item) {
        return clone(item);
      });
    } else if (_typeof(item) === 'object') {
      for (var _i = 0, _Object$keys = Object.keys(item); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];

        if (key !== 'rootContext') {
          result[key] = clone(item[key]);
        }
      }
    } else {
      result = item;
    }

    return result;
  }

  var pureObject = clone(rootContext[REACT_MINI_APP_ROOT_BACKUP]);
  rootContext.setData(_defineProperty({}, REACT_MINI_APP_ROOT, [pureObject]));
}

function processProps(newProps, rootContext, id) {
  var props = {};

  for (var _i2 = 0, _Object$keys2 = Object.keys(newProps); _i2 < _Object$keys2.length; _i2++) {
    var propKey = _Object$keys2[_i2];

    if (typeof newProps[propKey] === 'function') {
      var contextKey = "".concat(REACT_MINI_APP_METHOD, "_").concat(id, "_").concat(propKey);
      rootContext[contextKey] = newProps[propKey];
      props[propKey] = contextKey;
    } else if (propKey === 'children') {// pass
    } else {
      props[propKey] = newProps[propKey];
    }
  }

  return props;
}

var rootHostContext = {};
var childHostContext = {};
var HostConfig = {
  now: Date.now,
  supportsMutation: true,
  // 获取根容器的上下文信息, 只在根节点调用一次
  getRootHostContext: function getRootHostContext(rootContainer) {
    console.log('getRootHostContext');
    return rootHostContext;
  },
  // 获取子节点的上下文信息, 每遍历一个节点都会调用一次
  getChildHostContext: function getChildHostContext(parentHostContext, type, rootContainer) {
    console.log('getChildHostContext');
    return childHostContext;
  },
  // 渲染阶段执行
  shouldSetTextContent: function shouldSetTextContent(type, props) {
    console.log('shouldSetTextContent');
    return typeof props.children === 'string' || typeof props.children === 'number';
  },
  resetTextContent: function resetTextContent() {
    console.log('resetTextContent');
  },
  prepareForCommit: function prepareForCommit() {
    console.log('prepareForCommit');
  },
  resetAfterCommit: function resetAfterCommit() {
    console.log('resetAfterCommit');
  },
  // 准备节点更新. 如果返回空则表示不更新，这时候commitUpdate则不会被调用
  prepareUpdate: function prepareUpdate(instance, type, oldProps, newProps, rootContainer, hostContext) {
    console.log('prepareUpdate');
    return true;
  },
  // 文本节点提交
  commitTextUpdate: function commitTextUpdate(textInstance, oldText, newText) {
    console.log('commitTextUpdate');
    textInstance.text = newText;
    setData(textInstance.rootContext);
  },
  createInstance: function createInstance(type, newProps, rootContainerInstance, _currentHostContext, workInProgress) {
    console.log('createInstance');
    var rootContext = rootContainerInstance;
    var id = instanceCount;
    instanceCount += 1;
    var props = processProps(newProps, rootContext, id);
    var ins = {
      type: type === 'div' ? 'view' : type,
      props: props,
      children: [],
      rootContext: rootContext,
      id: id
    };
    return ins;
  },
  createTextInstance: function createTextInstance(text) {
    console.log('createTextInstance');
    return {
      type: TYPE_TEXT,
      text: text
    };
  },
  commitUpdate: function commitUpdate(targetIns, updatePayload, type, oldProps, newProps) {
    console.log('commitUpdate');
    var props = processProps(newProps, targetIns.rootContext, targetIns.id);
    targetIns.props = props;
    setData(targetIns.rootContext);
  },
  appendInitialChild: function appendInitialChild(parent, child) {
    console.log('appendInitialChild');
    child.rootContext = parent.rootContext;
    parent.children.push(child);
  },
  appendChild: function appendChild(parent, child) {
    console.log('appendChild');
    child.rootContext = parent.rootContext;
    parent.children.push(child);
  },
  appendChildToContainer: function appendChildToContainer(_parent, child) {
    console.log('appendChildToContainer');
    var parent = null;

    if (_parent._rootContainer) {
      // append to root
      parent = {
        type: 'view',
        children: [],
        rootContext: _parent
      };
      parent.children.push(child);
      child.rootContext[REACT_MINI_APP_ROOT_BACKUP] = parent;
      console.log(child.rootContext);
      setData(child.rootContext);
    }
  },
  removeChild: function removeChild(parentInstance, child) {
    console.log('removeChild');
    parentInstance.children.splice(parentInstance.indexOf(child), 1);
  },
  finalizeInitialChildren: function finalizeInitialChildren() {
    console.log('finalizeInitialChildren');
  },
  clearContainer: function clearContainer() {
    console.log('clearContainer');
  }
};
var mpRender = (0, _reactReconciler["default"])(HostConfig);

var MP = _objectSpread(_objectSpread({}, _react["default"]), {}, {
  React: _react["default"],
  render: function render(reactElement, container, callback) {
    if (!container._rootContainer) {
      container._rootContainer = mpRender.createContainer(container, false);
    } // update the root Container


    return mpRender.updateContainer(reactElement, container._rootContainer, null, callback);
  }
});

var _default = MP;
exports["default"] = _default;