/*
 * @Author: your name
 * @Date: 2021-04-20 13:46:22
 * @LastEditTime: 2021-04-20 13:51:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \common-components-antd\vue.config.js
 */
module.export = {
  css:{
    loaderOptions:{
      less:{
        lessOptions:{
          modifyVars:{
            'primary-color':'#1DA57A',
            'link-color':'#1DA57A',
            'border-radius-base':'2px',
          },
          javascriptEnabled: true,
        }
      }
    }
  }
}