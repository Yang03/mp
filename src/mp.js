import Reconciler from 'react-reconciler'
import React from 'react'

const REACT_MINI_APP_ROOT = '$$REACT_MINI_APP_ROOT'
const REACT_MINI_APP_ROOT_BACKUP = '$$REACT_MINI_APP_ROOT_BACKUP'
const REACT_MINI_APP_METHOD = '$$REACT_MINI_APP_METHOD'
const TYPE_TEXT = Symbol('text')


let instanceCount = 0;

function setData(rootContext) {
  function clone(item) {
    let result = {}
    if (Array.isArray(item)) {
      result = item.map(item => clone(item))
    } else if (typeof item === 'object') {
      for (const key of Object.keys(item)) {
        if (key !== 'rootContext') {
          result[key] = clone(item[key])
        }
      }
    } else {
      result = item
    }

    return result
  }

  const pureObject = clone(rootContext[REACT_MINI_APP_ROOT_BACKUP]);

  rootContext.setData({
    [REACT_MINI_APP_ROOT]: [pureObject],
  })
}

function processProps(newProps, rootContext, id) {
  const props = {}
  for (const propKey of Object.keys(newProps)) {
    if (typeof newProps[propKey] === 'function') {
      const contextKey = `${REACT_MINI_APP_METHOD}_${id}_${propKey}`
      rootContext[contextKey] = newProps[propKey];
      props[propKey] = contextKey
    } else if (propKey === 'children') {
      // pass
    } else {
      props[propKey] = newProps[propKey]
    }
  }
  return props
}

const rootHostContext = {}
const childHostContext = {}



const HostConfig = {
  now: Date.now,
  supportsMutation: true,
  // 获取根容器的上下文信息, 只在根节点调用一次
  getRootHostContext: (rootContainer) => {
    console.log('getRootHostContext')
   return rootHostContext;
 },
 // 获取子节点的上下文信息, 每遍历一个节点都会调用一次
  getChildHostContext: (parentHostContext, type, rootContainer) => {
    console.log('getChildHostContext')
    return childHostContext;
  },
  // 渲染阶段执行
  shouldSetTextContent: (type, props) => {
    // console.log('shouldSetTextContent', type, typeof props.children)
    // return typeof props.children === 'string' || typeof props.children === 'number';
  },
  resetTextContent: () => {
    console.log('resetTextContent')
  },
  prepareForCommit: () => {
    console.log('prepareForCommit')
  },
  resetAfterCommit: () => {
    console.log('resetAfterCommit')
  },
  // 准备节点更新. 如果返回空则表示不更新，这时候commitUpdate则不会被调用
  prepareUpdate: (instance, type, oldProps, newProps, rootContainer, hostContext) => {
    console.log('prepareUpdate')
    return true;
  },
  // 文本节点提交
  commitTextUpdate: (textInstance, oldText, newText) => {
    console.log('commitTextUpdate')
    textInstance.text = newText;
    setData(textInstance.rootContext);
  },
  createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
    console.log('createInstance')
   const rootContext = rootContainerInstance;
   const id = instanceCount;
   instanceCount += 1;

   const props = processProps(newProps, rootContext, id);

   const ins = {
     type: type === 'div' ? 'view' : type,
     props,
     children: [],
     rootContext,
     id,
   };

   return ins;
 },
 createTextInstance: (text) => {
   console.log('createTextInstance')
   return {
     type: TYPE_TEXT,
     text,
   };
 },
 commitUpdate: (targetIns, updatePayload, type, oldProps, newProps) => {
   console.log('commitUpdate')
   const props = processProps(newProps, targetIns.rootContext, targetIns.id);

   targetIns.props = props;

   setData(targetIns.rootContext);
 },
 appendInitialChild:(parent, child) => {
   console.log('appendInitialChild')
   child.rootContext = parent.rootContext;
   parent.children.push(child);
 },
 appendChild:(parent, child) => {
   console.log('appendChild')
   child.rootContext = parent.rootContext;
   parent.children.push(child)
 },

  appendChildToContainer: (_parent, child) => {
    console.log('appendChildToContainer')
    let parent = null
    if (_parent._rootContainer) {
      // append to root
      parent = {
        type: 'view',
        children: [],
        rootContext: _parent,
      }


      parent.children.push(child)

      child.rootContext[REACT_MINI_APP_ROOT_BACKUP] = parent
      console.log(child.rootContext)
      setData(child.rootContext)
    }
  },

  removeChild: (parentInstance, child) => {
    console.log('removeChild')
    parentInstance.children.splice(parentInstance.indexOf(child), 1);
  },
  finalizeInitialChildren: () => {
    console.log('finalizeInitialChildren')
  },
  clearContainer: () => {
    console.log('clearContainer')
  }
}

const mpRender = Reconciler(HostConfig)

const  MP = {
  ...React,
  React,
  render(reactElement, container, callback) {
    if (!container._rootContainer) {
      container._rootContainer = mpRender.createContainer(container, false);
    }

    console.log(reactElement)
    // update the root Container
    return mpRender.updateContainer(reactElement, container._rootContainer, null, callback);
  }
}


export default MP
