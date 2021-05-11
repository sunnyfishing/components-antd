/*
 * @Author: your name
 * @Date: 2021-04-19 15:52:36
 * @LastEditTime: 2021-04-20 11:41:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \common-components-antd\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css';  // 引入antd样式文件

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
