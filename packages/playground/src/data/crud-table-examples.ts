// 代码示例数据，包含转义处理
export const codeExamples = {
    basic: {
        'template.vue': `<template>
  <CrudTable :data="tableData" :columns="columns" :has-pagination="false" />
</template>

<script setup>
import { ref } from 'vue'
import CrudTable from '@/components/CrudTable'

const tableData = ref([
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 28, address: '广州市天河区' }
])

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'address', label: '地址' }
]
<\/script>`
    },

    empty: {
        'template.vue': `<template>
  <CrudTable :data="[]" :columns="columns" :has-pagination="false">
    <template #empty>
      <div class="empty-state">
        <div class="empty-icon">📄</div>
        <p>暂无数据</p>
      </div>
    </template>
  </CrudTable>
</template>

<script setup>
import { ref } from 'vue'
import CrudTable from '@/components/CrudTable'

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'address', label: '地址' }
]
<\/script>

<style>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
}
.empty-icon {
  font-size: 40px;
  margin-bottom: 10px;
}
</style>`
    },

    selection: {
        'template.vue': `<template>
  <div class="selection-demo">
    <div class="selection-controls">
      <ElButton @click="clearSelection">清空选择</ElButton>
      <ElButton @click="toggleFirstRow">切换第一行选择</ElButton>
      <span class="selection-count">已选择: {{ selectedCount }} 项</span>
    </div>

    <CrudTable
      ref="tableRef"
      :data="tableData"
      :columns="columns"
      :has-pagination="false"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange">
    </CrudTable>

    <div class="selection-result">
      <h4>选中的行:</h4>
      <pre>{{ JSON.stringify(selectedRows, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import CrudTable from '@/components/CrudTable'

const tableRef = ref()
const selectedRows = ref([])
const selectedCount = ref(0)

const tableData = ref([
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 28, address: '广州市天河区' },
  { id: 4, name: '赵六', age: 32, address: '深圳市南山区' }
])

const columns = [
  { type: 'selection', width: 55 },
  { type: 'index', label: '序号', width: 80 },
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'address', label: '地址' }
]

const handleSelectionChange = (rows) => {
  selectedRows.value = rows
  selectedCount.value = rows.length
}

const handleCurrentChange = (currentRow) => {
  console.log('当前行变化:', currentRow)
}

const clearSelection = () => {
  tableRef.value?.clearSelection()
}

const toggleFirstRow = () => {
  if (tableData.value.length > 0) {
    tableRef.value?.toggleRowSelection(tableData.value[0])
  }
}
<\/script>

<style>
.selection-controls {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.selection-count {
  margin-left: 10px;
  font-weight: bold;
}
.selection-result {
  margin-top: 15px;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
}
</style>`
    },

    toolbar: {
        'template.vue': `<template>
  <CrudTable
    :data="tableData"
    :columns="columns"
    :toolbar="toolbarConfig"
    :has-pagination="false"
    @selection-change="handleSelectionChange">
    <template #toolbar-left="{ selection }">
      <div class="selection-info">已选择 {{ selection.length }} 项</div>
    </template>
    <template #toolbar-right>
      <ElButton size="small" type="info">自定义按钮</ElButton>
    </template>
  </CrudTable>
</template>

<script setup>
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import { Delete, Edit, View, Plus, Refresh } from '@element-plus/icons-vue'
import CrudTable from '@/components/CrudTable'

const tableData = ref([
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 28, address: '广州市天河区' }
])

const columns = [
  { type: 'selection', width: 55 },
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'address', label: '地址', width: 180 },
  {
    prop: 'actions',
    label: '操作',
    width: 200,
    render: (row) => (
      <>
        <ElButton size="small" type="primary" onClick={() => handleView(row)}>
          查看
        </ElButton>
        <ElButton size="small" type="success" onClick={() => handleEdit(row)}>
          编辑
        </ElButton>
        <ElButton size="small" type="danger" onClick={() => handleDelete(row)}>
          删除
        </ElButton>
      </>
    )
  }
]

const toolbarConfig = {
  show: true,
  left: {
    title: '用户数据列表',
    actions: [
      {
        key: 'add',
        label: '新增',
        type: 'primary',
        icon: Plus,
        onClick: handleAdd
      },
      {
        key: 'batchDelete',
        label: '批量删除',
        type: 'danger',
        disabled: (selection) => selection.length === 0,
        onClick: (selection) => handleBatchDelete(selection)
      }
    ]
  },
  right: {
    actions: [
      {
        key: 'refresh',
        label: '刷新',
        icon: Refresh,
        onClick: handleRefresh
      }
    ],
    settings: {
      columns: true,
      fullscreen: true,
      refresh: true
    }
  }
}

function handleSelectionChange(rows) {
  console.log('选中:', rows)
}

function handleView(row) {
  console.log('查看:', row)
}

function handleEdit(row) {
  console.log('编辑:', row)
}

function handleDelete(row) {
  console.log('删除:', row)
}

function handleAdd() {
  console.log('新增用户')
}

function handleBatchDelete(selection) {
  console.log('批量删除:', selection)
}

function handleRefresh() {
  console.log('刷新数据')
}
<\/script>`
    },

    render: {
        'template.vue': `<template>
  <CrudTable
    :data="tableData"
    :columns="columns"
    :has-pagination="false">
    <template #status="{ row }">
      <ElTag :type="row.status === 'active' ? 'success' : 'danger'">
        {{ row.status === 'active' ? '正常' : '禁用' }}
      </ElTag>
    </template>
  </CrudTable>
</template>

<script setup>
import { ref } from 'vue'
import { ElTag } from 'element-plus'
import CrudTable from '@/components/CrudTable'

const tableData = ref([
  { id: 1, name: '张三', age: 25, status: 'active', score: 85 },
  { id: 2, name: '李四', age: 30, status: 'disable', score: 92 },
  { id: 3, name: '王五', age: 28, status: 'active', score: 78 }
])

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  {
    prop: 'status',
    label: '状态',
    width: 120
  },
  {
    prop: 'score',
    label: '分数',
    width: 150,
    render: (row, column, cellValue) => {
      const color = cellValue >= 90 ? '#67C23A' : 
                  cellValue >= 80 ? '#409EFF' : '#E6A23C'
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            width: '100px',
            height: '8px',
            borderRadius: '4px',
            backgroundColor: '#f0f0f0',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: \`\${cellValue}%\`,
              backgroundColor: color
            }}></div>
          </div>
          <span style={{ marginLeft: '8px' }}>{cellValue}</span>
        </div>
      )
    }
  }
]
<\/script>`
    },

    pagination: {
        'template.vue': `<template>
  <CrudTable
    :data="tableData"
    :columns="columns"
    :total="100"
    v-model:page="currentPage"
    v-model:page-size="pageSize"
    :pagination="paginationConfig"
    @update:page="handlePageChange"
    @update:page-size="handlePageSizeChange">
  </CrudTable>

  <div class="pagination-info">
    <p>当前页: {{ currentPage }}</p>
    <p>每页条数: {{ pageSize }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CrudTable from '@/components/CrudTable'

const currentPage = ref(1)
const pageSize = ref(10)
const tableData = ref([
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 28, address: '广州市天河区' },
  { id: 4, name: '赵六', age: 32, address: '深圳市南山区' },
  { id: 5, name: '钱七', age: 35, address: '杭州市西湖区' }
])

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'address', label: '地址' }
]

const paginationConfig = {
  pageSizes: [5, 10, 20, 50],
  layout: 'total, sizes, prev, pager, next, jumper',
  background: true
}

const handlePageChange = (page) => {
  console.log('页码变更:', page)
}

const handlePageSizeChange = (size) => {
  console.log('每页条数变更:', size)
}
<\/script>

<style>
.pagination-info {
  margin-top: 15px;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
}
</style>`
    },

    // 修正expand示例代码
expand: {
    'template.vue': `<template>
  <CrudTable
    :data="tableData"
    :columns="columns"
    :has-pagination="false">
  </CrudTable>
</template>

<script setup>
import { ref } from 'vue'
import CrudTable from '@/components/CrudTable'

const tableData = ref([
  { 
    id: 1, 
    name: '项目A', 
    status: '进行中', 
    progress: 75, 
    description: '这是一个重要的项目，需要团队协作完成',
    createTime: '2023-08-15 10:30:00'
  },
  { 
    id: 2, 
    name: '项目B', 
    status: '已完成', 
    progress: 100,
    description: '常规维护项目，按计划顺利完成',
    createTime: '2023-07-20 14:20:00'
  },
  { 
    id: 3, 
    name: '项目C', 
    status: '未开始', 
    progress: 0,
    description: '新立项项目，等待资源分配',
    createTime: '2023-09-05 09:15:00'
  }
])

const columns = [
  { 
    type: 'expand', 
    width: 50,
    render: (row) => {
      return (
        <div class="expand-detail">
          <div class="detail-item">
            <span class="label">详细说明:</span>
            <span class="value">{row.description}</span>
          </div>
          <div class="detail-item">
            <span class="label">创建时间:</span>
            <span class="value">{row.createTime}</span>
          </div>
        </div>
      )
    }
  },
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '项目名称', width: 120 },
  { prop: 'status', label: '状态', width: 100 },
  { 
    prop: 'progress', 
    label: '进度', 
    width: 150,
    render: (row, column, cellValue) => {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '100px',
            height: '6px',
            backgroundColor: '#f0f0f0',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: \`\${cellValue}%\`,
              backgroundColor: '#409EFF'
            }}></div>
          </div>
          <span>{cellValue}%</span>
        </div>
      )
    }
  }
]
<\/script>

<style>
.expand-detail {
  padding: 20px;
  background-color: #fafafa;
}
.detail-item {
  margin-bottom: 10px;
}
.detail-item .label {
  font-weight: bold;
  margin-right: 10px;
}
</style>`
},

// 树形表格示例
tree: {
    'template.vue': `<template>
  <CrudTable
    :data="tableData"
    :columns="columns"
    row-key="id"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    :has-pagination="false">
  </CrudTable>
</template>

<script setup>
import { ref } from 'vue'
import CrudTable from '@/components/CrudTable'

const tableData = ref([
  {
    id: 1,
    name: '研发部',
    manager: '张三',
    headcount: 8,
    children: [
      {
        id: 11,
        name: '前端组',
        manager: '李四',
        headcount: 4,
        children: [
          { id: 111, name: '开发工程师', manager: '王五', headcount: 2 },
          { id: 112, name: 'UI设计师', manager: '赵六', headcount: 1 }
        ]
      },
      {
        id: 12,
        name: '后端组',
        manager: '钱七',
        headcount: 3,
        children: [
          { id: 121, name: 'Java开发', manager: '孙八', headcount: 2 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '市场部',
    manager: '周九',
    headcount: 6,
    children: [
      { id: 21, name: '销售组', manager: '吴十', headcount: 4 },
      { id: 22, name: '市场策划', manager: '郑十一', headcount: 2 }
    ]
  }
])

const columns = [
  { prop: 'name', label: '部门名称', width: 180 },
  { prop: 'manager', label: '负责人', width: 120 },
  { prop: 'headcount', label: '人数', width: 100 }
]
<\/script>`
},

// 合计行示例
summary: {
    'template.vue': `<template>
  <CrudTable
    :data="tableData"
    :columns="columns"
    :has-pagination="false"
    :summary-method="getSummaries"
    show-summary>
  </CrudTable>
</template>

<script setup>
import { ref } from 'vue'
import CrudTable from '@/components/CrudTable'

const tableData = ref([
  { id: 1, name: '办公用品', category: '日常物品', price: 299, count: 2, amount: 598 },
  { id: 2, name: '显示器', category: '电子设备', price: 1299, count: 5, amount: 6495 },
  { id: 3, name: '键盘', category: '电子设备', price: 499, count: 10, amount: 4990 },
  { id: 4, name: '鼠标', category: '电子设备', price: 199, count: 8, amount: 1592 },
  { id: 5, name: '打印纸', category: '日常物品', price: 49, count: 20, amount: 980 }
])

const columns = [
  { prop: 'id', label: '编号', width: 80 },
  { prop: 'name', label: '物品名称', width: 120 },
  { prop: 'category', label: '类别', width: 120 },
  { prop: 'price', label: '单价', width: 100 },
  { prop: 'count', label: '数量', width: 100 },
  { prop: 'amount', label: '金额', width: 120 }
]

// 合计方法
const getSummaries = (param) => {
  const { columns, data } = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '总计'
      return
    }
    if (index === 5) { // 金额列
      const values = data.map(item => Number(item.amount))
      sums[index] = \`￥\${values.reduce((prev, curr) => prev + curr, 0)}\`
      return
    }
    sums[index] = ''
  })
  return sums
}
<\/script>`
},

// 单元格合并示例
merge: {
    'template.vue': `<template>
  <CrudTable
    :data="tableData"
    :columns="columns"
    :has-pagination="false"
    :span-method="objectSpanMethod">
  </CrudTable>
</template>

<script setup>
import { ref } from 'vue'
import CrudTable from '@/components/CrudTable'

const tableData = ref([
  { id: 1, name: '商品A', category: '电子产品', area: '华北', q1: 120, q2: 150, q3: 140, q4: 160 },
  { id: 2, name: '商品A', category: '电子产品', area: '华南', q1: 90, q2: 110, q3: 100, q4: 120 },
  { id: 3, name: '商品A', category: '电子产品', area: '华东', q1: 110, q2: 130, q3: 110, q4: 140 },
  { id: 4, name: '商品B', category: '办公用品', area: '华北', q1: 80, q2: 70, q3: 90, q4: 85 },
  { id: 5, name: '商品B', category: '办公用品', area: '华南', q1: 60, q2: 65, q3: 70, q4: 75 }
])

const columns = [
  { prop: 'name', label: '商品名称', width: 120 },
  { prop: 'category', label: '类别', width: 120 },
  { prop: 'area', label: '区域', width: 120 },
  { prop: 'q1', label: 'Q1销量', width: 100 },
  { prop: 'q2', label: 'Q2销量', width: 100 },
  { prop: 'q3', label: 'Q3销量', width: 100 },
  { prop: 'q4', label: 'Q4销量', width: 100 }
]

// 单元格合并方法
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (columnIndex === 0) {
    // 根据相同商品名称合并单元格
    if (rowIndex % 3 === 0) {
      return {
        rowspan: 3,
        colspan: 1
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0
      }
    }
  }
  
  if (columnIndex === 1) {
    // 根据相同类别合并单元格
    if (rowIndex % 3 === 0) {
      return {
        rowspan: 3,
        colspan: 1
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0
      }
    }
  }
}
<\/script>`
},

// 固定列/表头示例
fixed: {
    'template.vue': `<template>
  <CrudTable
    :data="tableData"
    :columns="columns"
    :has-pagination="false"
    height="300"
    style="width: 100%">
  </CrudTable>
</template>

<script setup>
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import CrudTable from '@/components/CrudTable'

// 生成模拟数据
const tableData = ref(Array.from({ length: 20 }).map((_, index) => {
  return {
    id: index + 1,
    name: \`商品\${index + 1}\`,
    date: \`2023-09-\${10 + index % 20}\`,
    address: \`北京市朝阳区某某路\${index + 1}号\`,
    province: ['北京', '上海', '广州', '深圳'][index % 4],
    city: \`城市\${index + 1}\`,
    zip: \`10000\${index}\`,
    desc: \`这是一段很长的描述文字，这是一段很长的描述文字，这是一段很长的描述文字，这是一段很长的描述文字第\${index + 1}段\`
  }
}))

const columns = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'name', label: '商品名称', width: 120, fixed: 'left' },
  { prop: 'date', label: '日期', width: 120 },
  { prop: 'province', label: '省份', width: 120 },
  { prop: 'city', label: '城市', width: 120 },
  { prop: 'address', label: '地址', width: 300 },
  { prop: 'zip', label: '邮编', width: 120 },
  { prop: 'desc', label: '描述', width: 400 },
  { 
    prop: 'operations', 
    label: '操作', 
    width: 150, 
    fixed: 'right',
    render: (row) => (
      <>
        <ElButton size="small" type="primary">编辑</ElButton>
        <ElButton size="small" type="danger">删除</ElButton>
      </>
    )
  }
]
<\/script>`
},

    sortFilter: {
        'template.vue': `<template>
  <CrudTable
    :data="tableData"
    :columns="columns"
    :has-pagination="false"
    @sort-change="handleSortChange"
    @filter-change="handleFilterChange">
  </CrudTable>

  <div class="sort-filter-info">
    <p>排序信息: {{ JSON.stringify(sortInfo) }}</p>
    <p>过滤信息: {{ JSON.stringify(filterInfo) }}</p>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import CrudTable from '@/components/CrudTable'

const sortInfo = ref({})
const filterInfo = ref({})

const tableData = ref([
  { id: 1, name: '张三', age: 25, department: '技术部', joinDate: '2022-01-15' },
  { id: 2, name: '李四', age: 30, department: '市场部', joinDate: '2021-08-20' },
  { id: 3, name: '王五', age: 28, department: '技术部', joinDate: '2022-03-10' },
  { id: 4, name: '赵六', age: 32, department: '人事部', joinDate: '2021-05-18' },
  { id: 5, name: '钱七', age: 35, department: '市场部', joinDate: '2020-11-22' }
])

const columns = [
  { prop: 'id', label: 'ID', width: 80, sortable: true },
  { prop: 'name', label: '姓名', width: 120 },
  { 
    prop: 'age', 
    label: '年龄', 
    width: 100, 
    sortable: true 
  },
  { 
    prop: 'department', 
    label: '部门', 
    width: 120,
    filters: [
      { text: '技术部', value: '技术部' },
      { text: '市场部', value: '市场部' },
      { text: '人事部', value: '人事部' }
    ],
    filterMethod: (value, row) => {
      return row.department === value
    }
  },
  { 
    prop: 'joinDate', 
    label: '入职日期', 
    sortable: true,
    sortMethod: (a, b) => {
      return new Date(a.joinDate) - new Date(b.joinDate)
    }
  }
]

const handleSortChange = (sort) => {
  sortInfo.value = sort
  console.log('排序变化:', sort)
}

const handleFilterChange = (filters) => {
  filterInfo.value = filters
  console.log('过滤变化:', filters)
}
<\/script>

<style>
.sort-filter-info {
  margin-top: 15px;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
}
</style>`
    }
};