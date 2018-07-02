import Vue from 'vue';
import testTost from "./toast.vue";

const ToastConstructor = Vue.extend(testTost); // vue 的extend方法，继承

let toastPool = [];

// 保证页面只有一个实例，如果没有new一个
let getAnInstance = () => {
  if (toastPool.length > 0) {
    let instance = toastPool[0];
    toastPool.splice(0, 1);
    return instance;
  }
  return new ToastConstructor({
    el: document.createElement('div')
  });
};

let returnAnInstance = instance => {
  if (instance) {
    toastPool.push(instance);
  }
};

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target);
  }
};

// toast 的close方法
ToastConstructor.prototype.close = function() {
  this.visible = false;
  this.$el.addEventListener('transitionend', removeDom);
  this.closed = true;
  returnAnInstance(this);
};

// Toast函数
let Toast = (options = {}) => {
  let duration = options.duration || 2500;
  // 实例对象
  let instance = getAnInstance();
  instance.closed = false;
  clearTimeout(instance.timer); // 清除显示
  // 实例的方法
  instance.message = typeof options === 'string' ? options : options.message;
  instance.position = options.position || '';
  instance.className = options.className || '';
  instance.iconSrc = options.iconSrc || {};
  // 挂载到body上
  document.body.appendChild(instance.$el);
  // nextTick是DOM更新完毕的API，保证元素在DOM上
  Vue.nextTick(function() {
    instance.visible = true;
    instance.$el.removeEventListener('transitionend', removeDom);
    instance.timer = setTimeout(function() {
      if (instance.closed) return;
      instance.close();
    }, duration);
  });
  return instance;
};

// 使插件可以全局调用
function MineToast() {
   Vue.$toast = Vue.prototype.$toast = Toast;
 }

export default MineToast;
