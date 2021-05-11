<!--
 * @Author: your name
 * @Date: 2021-04-19 15:52:36
 * @LastEditTime: 2021-04-20 13:55:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \common-components-antd\src\App.vue
-->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <a-local-provider :local='zh_CN'>
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </a-local-provider>
  </div>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import HelloWorld from './components/HelloWorld.vue'

moment.locale('zh_CN')

export default {
  name: 'App',
  data(){
    return {
      zh_CN,
    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
