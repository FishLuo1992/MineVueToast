<template>
  <transition name="toast-pop">
    <div class="toast" v-show="visible">
     <div class="toast-box" :class="customClass">
        <div class="toast-icon" v-if="iconSrc.show" :style="{'backgroundImage':iconSrc.src}"></div>
        <span class="toast-text">{{ message }}</span>
     </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import "@/styles/base.scss";
.toast {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(209, 209, 209, 0.5);
  z-index: 1002;
  transition: opacity 0.3s linear;
  .toast-box {
    position: absolute;
    width: to(200);
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    padding: to(10) to(20);
    background-color: #fff;
    border-radius: to(10);
    color: #101010;
    .toast-icon {
      height: to(36);
      width: to(36);
      margin:  0 auto;
      background-size: 100% 100%;
    }

    .toast-text {
      margin-top: to(5);
      font-size: to(14);
      display: block;
      text-align: center;
      word-wrap: break-word;
      word-break: normal;
    }

    &.is-placetop {
      top: to(186);
      left: 50%;
      -webkit-transform: translate(-50%,0);
      transform: translate(-50%,0);
    }

    &.is-placebottom {
      bottom: to(50);
      left: 50%;
      -webkit-transform: translate(-50%,0);
      transform: translate(-50%,0);
    }

    &.is-placemiddle {
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);
    }
  }

  &.toast-pop-enter,
  &.toast-pop-leave-active {
    opacity: 0;
  }
}
</style>

<script type="text/babel">
export default {
  props: {
    message: String,
    className: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: "middle"
    },
    // icon的src
    iconSrc: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },

  data() {
    return {
      visible: false
    };
  },

  computed: {
    customClass() {
      var classes = [];
      switch (this.position) {
        case "middle":
          classes.push("is-placemiddle");
          break;
        case "bottom":
          classes.push("is-placebottom");
          break;
        default:
          classes.push("is-placetop");
      }
      classes.push(this.className);

      return classes.join(" ");
    }
  }
};
</script>
