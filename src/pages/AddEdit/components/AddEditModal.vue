<!--
 * @Author: your name
 * @Date: 2021-05-14 10:04:57
 * @LastEditTime: 2021-05-14 15:46:07
 * @LastEditors: Please set LastEditors
 * @Description: 弹框页
 * @FilePath: \components-antd\src\pages\AddEdit\components\AddEditModal.vue
-->
<template>
  <a-modal
    v-model="isShowModal"
    :title="`${data.id?data.isCheck?'查看':'编辑':'新增'}数据`"
    :width="600"
    @ok="submit(true)"
    @cancel="submit(false)"
    :footer="data.isCheck&&null"
    >
    <a-form-model ref="ruleForm" layout="horizontal" :model="data" :rules="addRules">
      <a-form-model-item label="专题名称：" :labelCol="{ span: 6 }" :wrapperCol="{ span: 12 }" prop="name">
        <a-input style="width:200px" placeholder="请输入专题名称" v-model="data.name" :readonly='data.isCheck' />
      </a-form-model-item>
      <a-form-model-item label=" 排序：" :labelCol="{ span: 6 }" :wrapperCol="{ span: 12 }" prop="sort">
        <a-input-number :max="999" style="width:200px" placeholder="请输入排序" v-model="data.sort" :readonly='data.isCheck' />
      </a-form-model-item>
      <a-form-model-item label="备注：" :labelCol="{ span: 6 }" :wrapperCol="{ span: 12 }" prop="note">
        <a-input style="width:200px" placeholder="请输入备注" v-model="data.note" :readonly='data.isCheck' />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import _ from 'lodash'
export default {
  name:'AddEdit',
  props:{
    updateRow:{
      type:Object,
      default:()=>({})
    },
    isShowModal:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      data:this.updateRow || {},
    }
  },
  // watch
  methods:{
    // 提交
    submit:_.debounce(function(isSubmit){
      // isSubmit：true——提交；false——取消
      if (isSubmit) {
        // 提交——调新增或者编辑的接口进行保存
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            // 根据data改变接口和传参
            const url = this.data.id ? '/.../update' : '/.../add'
            try {
              this.$http.post(url, this.data)
                .then((res) => {
                if (res && res.code === 10000) {
                    // 提交完成后
                  this.$emit('addEdit',false, true)
                }
                })
            } catch {
              console.log('error')
            }
          }
        })
      } else {
        // 取消——调关闭弹框的函数
        this.$emit('addEdit',false)
      }
    },500)
  }
}
</script>