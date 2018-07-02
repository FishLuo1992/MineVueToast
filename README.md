# MineVueToast

### 一个关于vue的toast组件 可以按自己的需求更改

### main.js配置    
    import 'amfe-flexible' // rem 配置
	import ToastA from './components/toast' // 全局通知组件
	Vue.use(ToastA);   
###  使用    
	 this.$toast({
          message:"密码格式不正确，请重新输入",
          duration:1000,
          iconSrc:{show:true,src:'url('+require('../../icons/img/bad.png')+')'},
        });


