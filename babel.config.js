/*
 * @Author: your name
 * @Date: 2021-04-19 15:52:36
 * @LastEditTime: 2021-04-20 11:44:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \common-components-antd\babel.config.js
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins:[
    [
      "import",
      {libraryName:"ant-design-vue",libraryDirectory:"es",style:true}
    ]
  ]
}
