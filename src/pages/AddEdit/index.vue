<!--
 * @Author: your name
 * @Date: 2021-05-10 17:24:12
 * @LastEditTime: 2021-05-11 17:44:25
 * @LastEditors: Please set LastEditors
 * @Description: 在同一个组件内实现新增-编辑-查看弹框
 * @FilePath: \components-antd\src\pages\AddEdit\index.vue
-->
<template>
    <div class="table-page-table-wrapper">
      <a-row type="flex" justify="space-between">
        <a-col>
          <a-button type="primary" @click="addEdit(true)">新增数据</a-button>
        </a-col>
        <a-col>
          <a-input placeholder="专题名称" style="width: 300px" v-model="search.name" />
          <a-button type="primary" style="margin-left: 10px" @click="searchFunc">搜索</a-button>
        </a-col>
      </a-row>
      <div class='mt20'>
        <a-table
          class="middle-block-narrow"
          :columns="columns"
          :data-source="tableData"
          @change="onChange"
        >
          <div slot="action" slot-scope="text, record">
            <a @click="addEdit(true, false, {...record,isCheck:true})">查看明细</a>
            <a-divider type="vertical" />
            <a @click="addEdit(true, false, record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm @confirm="deleteSort(record)">
              <a-icon type="warning" slot="icon" />
              <span slot="title"> 删除后不可恢复，是否确<br />认该操作？ </span>
              <a class="warning-text">删除</a>
            </a-popconfirm>
          </div>
        </a-table>

      </div>
      <a-modal
        v-if="isShowModal"
        v-model="isShowModal"
        :title="`${updateRow.id?updateRow.isCheck?'查看':'编辑':'新增'}数据`"
        :width="600"
        @ok="submit(true)"
        @cancel="submit(false)"
        :footer="updateRow.isCheck&&null"
        >
        <a-form-model ref="ruleForm" layout="horizontal" :model="updateRow" :rules="addRules">
          <a-form-model-item label="专题名称：" :labelCol="{ span: 6 }" :wrapperCol="{ span: 12 }" prop="name">
            <a-input style="width:200px" placeholder="请输入专题名称" v-model="updateRow.name" />
          </a-form-model-item>
          <a-form-model-item label=" 排序：" :labelCol="{ span: 6 }" :wrapperCol="{ span: 12 }" prop="sort">
            <a-input-number :max="999" style="width:200px" placeholder="请输入排序" v-model="updateRow.sort" />
          </a-form-model-item>
          <a-form-model-item label="备注：" :labelCol="{ span: 6 }" :wrapperCol="{ span: 12 }" prop="note">
            <a-input style="width:200px" placeholder="请输入备注" v-model="updateRow.note" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'warMap',
  data () {
    return {
      tableData: [],  // 表格数据
      updateRow: {},  // 新增时—— {}；编辑时—— {id:1}；查看时—— {isCheck:true}
      isShowModal: false, // 是否展示弹框
      search: {     // 查询条件
        name: ''
      },
      pageInfo: {     // 分页信息
        pageNum: 1,
        pageSize: 10
      },
      addRules: {},   // 校验规则
      columns: [
        { title: '专题名称', dataIndex: 'name' },
        { title: '排序', dataIndex: 'sort' },
        { title: '关联活动数', dataIndex: 'linkedCount' },
        { title: '创建人', dataIndex: 'createName' },
        { title: '创建时间', dataIndex: 'createTime', scopedSlots: { customRender: 'createTime' } },
        { title: '上次修改时间', dataIndex: 'modifyTime', scopedSlots: { customRender: 'modifyTime' } },
        { title: '操作', dataIndex: 'action', scopedSlots: { customRender: 'action' } }
      ],
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 给搜索按钮加防抖效果；重置页码
    searchFunc: _.debounce(function () {
      this.pageInfo = {
        pageNum: 1,
        pageSize: 10
      }
      this.getData()
    }, 500),
    // 获取表格数据
    getData () {
      this.$http.post('/.../list', { ...this.search, ...this.pageInfo })
        .then((res) => {
          if (res && res.code === 10000) {
            this.tableData = res.data.records || []
          }
        })
    },
    // 新增、编辑、查看
    addEdit (isShowModal, isSubmit = false, row = {}) {
      this.isShowModal = isShowModal    // 是否展示弹框
      this.updateRow = Object.assign({}, row)   // 要编辑的数据
      if (isSubmit) {     // 是否是提交操作
        this.getData()
      }
    },
    // 翻页、改变页数
    onChange (pagination) {
      if (pagination.pageSize !== this.pageInfo.size) {
          // 此处说明pageSize改变了，页码重置为1
        this.pageInfo.page = 1
      } else {
        this.pageInfo.page = pagination.current
      }
      this.pageInfo.size = pagination.pageSize
      this.getData()
    },
    // 删除
    deleteSort (row) {
      this.$http.post('/.../delete', { id: row.id })
        .then(res => {
          if (res.code === 10000) {
            this.$message.success('删除成功')
            this.getData()
          }
        })
    },
    // 提交
    submit:_.debounce(function(isSubmit){
      // isSubmit：true——提交；false——取消
      if (isSubmit) {
        // 提交——调新增或者编辑的接口进行保存
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            // 根据updateRow改变接口和传参
            const url = this.updateRow.id ? '/.../update' : '/.../add'
            try {
              this.$http.post(url, this.updateRow)
                .then((res) => {
                if (res && res.code === 10000) {
                    // 提交完成后
                  this.addEdit(false, true)
                }
                })
            } catch {
              console.log('error')
            }
          }
        })
      } else {
        // 取消——调关闭弹框的函数
        this.addEdit(false)
      }
    },500)
  }
}
</script>
<style lang='less' scoped>
.table-page-table-wrapper {
  padding: 24px;
  background-color: #ffffff;
}
.warning-text {
  color: red;
}
.mt20{
  margin-top: 20px;
}
</style>
