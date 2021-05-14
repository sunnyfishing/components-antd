<!--
 * @Author: your name
 * @Date: 2021-05-14 10:04:41
 * @LastEditTime: 2021-05-14 15:51:51
 * @LastEditors: Please set LastEditors
 * @Description: table页
 * @FilePath: \components-antd\src\pages\AddEdit\components\index.vue
-->
<!--
 * @Author: your name
 * @Date: 2021-05-10 17:24:12
 * @LastEditTime: 2021-05-14 10:01:40
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
      <AddEditModal
        :updateRow='updateRow'
        :isShowModal='isShowModal'
        @addEdit = 'addEdit'
      />
    </div>
</template>
<script>
import _ from 'lodash'
import AddEditModal from './AddEditModal'
export default {
  name: 'warMap',
  components:{
    AddEditModal
  },
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
            if (this.tableData.length === 1 && this.pageInfo.pageNum !== 1) {
              // 当删除最后一页的最后一条数据后，页面未自动跳转到前一页的bug修复
              this.pageInfo.pageNum = this.pageInfo.pageNum - 1
            }
            this.getData()
          }
        })
    },
    // 获取表格数据
    getData () {
      this.$http.post('/.../list', { ...this.search, ...this.pageInfo })
        .then((res) => {
          if (res && res.code === 10000) {
            this.tableData = res.data.records || []
            this.pageInfo={
              page:res.page,
              size:res.size,
              total:res.total,
            }
          }
        })
    },
    
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
