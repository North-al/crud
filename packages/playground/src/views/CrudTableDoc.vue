<template>
    <div class="crud-table-doc">
        <!-- 页面标题 -->
        <div class="doc-header">
            <h1>CrudTable 组件</h1>
            <p class="doc-description">
                基于 Element Plus Table 封装的高级表格组件，支持 CRUD 操作、工具栏、分页、排序、筛选等功能
            </p>
        </div>

        <!-- 基础演示 -->
        <div class="doc-section">
            <h2>基础演示</h2>
            <p>最简单的表格用法，支持基本的数据展示</p>

            <div class="demo-block">
                <CrudTable :data="basicData" :columns="basicColumns" :has-pagination="false" />
            </div>

            <CodeBlock :files="basicCodeFiles" />
        </div>

        <!-- 空状态 -->
        <div class="doc-section">
            <h2>空状态</h2>
            <p>当表格没有数据时的展示状态</p>

            <div class="demo-block">
                <CrudTable :data="[]" :columns="basicColumns" :has-pagination="false">
                    <template #empty>
                        <div class="empty-state">
                            <div class="empty-icon">📄</div>
                            <p>暂无数据</p>
                        </div>
                    </template>
                </CrudTable>
            </div>

            <CodeBlock :files="emptyCodeFiles" />
        </div>

        <!-- 单选多选 -->
        <div class="doc-section">
            <h2>单选多选</h2>
            <p>支持单选和多选功能，可以获取选中的行数据</p>

            <div class="demo-block">
                <div class="selection-demo">
                    <div class="selection-controls">
                        <ElButton @click="clearSelection">清空选择</ElButton>
                        <ElButton @click="toggleFirstRow">切换第一行选择</ElButton>
                        <span class="selection-count">已选择: {{ selectedCount }} 项</span>
                    </div>

                    <CrudTable
                        ref="selectionTableRef"
                        :data="selectionData"
                        :columns="selectionColumns"
                        :has-pagination="false"
                        @selection-change="handleSelectionChange"
                        @current-change="handleCurrentChange">
                    </CrudTable>

                    <div class="selection-result">
                        <h4>选中的行:</h4>
                        <pre>{{ JSON.stringify(selectedRows, null, 2) }}</pre>
                    </div>
                </div>
            </div>

            <CodeBlock :files="selectionCodeFiles" />
        </div>

        <!-- 带工具栏的表格 -->
        <div class="doc-section">
            <h2>工具栏</h2>
            <p>支持工具栏操作、自定义插槽等功能</p>

            <div class="demo-block">
                <CrudTable
                    :data="toolbarData"
                    :columns="toolbarColumns"
                    :toolbar="toolbarConfig"
                    :has-pagination="false"
                    @selection-change="handleToolbarSelectionChange">
                    <template #toolbar-left="{ selection }">
                        <div class="selection-info">已选择 {{ selection.length }} 项</div>
                    </template>

                    <template #toolbar-right>
                        <ElInput
                            v-model="searchKeyword"
                            placeholder="搜索用户..."
                            style="width: 200px"
                            prefix-icon="Search"
                            clearable />
                    </template>
                </CrudTable>
            </div>

            <CodeBlock :files="toolbarCodeFiles" />
        </div>

        <!-- 筛选过滤 -->
        <div class="doc-section">
            <h2>筛选过滤</h2>
            <p>支持列筛选和排序功能</p>

            <div class="demo-block">
                <CrudTable
                    :data="filterData"
                    :columns="filterColumns"
                    :has-pagination="false"
                    @sort-change="handleSortChange"
                    @filter-change="handleFilterChange" />
            </div>

            <CodeBlock :files="filterCodeFiles" />
        </div>

        <!-- 合并行列 -->
        <div class="doc-section">
            <h2>合并行列</h2>
            <p>支持合并行和列的功能</p>

            <div class="demo-block">
                <CrudTable
                    :data="mergeData"
                    :columns="mergeColumns"
                    :has-pagination="false"
                    :span-method="spanMethod" />
            </div>

            <CodeBlock :files="mergeCodeFiles" />
        </div>

        <!-- 表头分组 -->
        <div class="doc-section">
            <h2>表头分组</h2>
            <p>支持多级表头分组</p>

            <div class="demo-block">
                <CrudTable :data="groupData" :columns="groupColumns" :has-pagination="false" />
            </div>

            <CodeBlock :files="groupCodeFiles" />
        </div>

        <!-- 固定列 -->
        <div class="doc-section">
            <h2>固定列</h2>
            <p>支持固定左侧和右侧列</p>

            <div class="demo-block">
                <div style="width: 100%; overflow: auto">
                    <CrudTable
                        :data="fixedData"
                        :columns="fixedColumns"
                        :has-pagination="false"
                        style="width: 1200px" />
                </div>
            </div>

            <CodeBlock :files="fixedCodeFiles" />
        </div>

        <!-- 自定义列渲染 -->
        <div class="doc-section">
            <h2>自定义列渲染</h2>
            <p>支持 render 函数、slots 配置、操作列等多种自定义方式</p>

            <div class="demo-block">
                <CrudTable :data="customData" :columns="customColumns" :has-pagination="false" />
            </div>

            <CodeBlock :files="customCodeFiles" />
        </div>

        <!-- 展开行 -->
        <div class="doc-section">
            <h2>展开行</h2>
            <p>支持展开行显示详细信息，可以嵌套其他组件</p>

            <div class="demo-block">
                <CrudTable :data="expandData" :columns="expandColumns" :has-pagination="false" />
            </div>

            <CodeBlock :files="expandCodeFiles" />
        </div>

        <!-- 树形表格 -->
        <div class="doc-section">
            <h2>树形表格</h2>
            <p>支持树形数据展示，可展开/收起子节点</p>

            <div class="demo-block">
                <CrudTable
                    :data="treeData"
                    :columns="treeColumns"
                    :has-pagination="false"
                    row-key="id"
                    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" />
            </div>

            <CodeBlock :files="treeCodeFiles" />
        </div>

        <!-- 总计行 -->
        <div class="doc-section">
            <h2>总计行</h2>
            <p>支持显示总计行</p>

            <div class="demo-block">
                <CrudTable
                    :data="summaryData"
                    :columns="summaryColumns"
                    :has-pagination="false"
                    :summary-method="getSummaries"
                    show-summary />
            </div>

            <CodeBlock :files="summaryCodeFiles" />
        </div>

        <!-- 分页表格 -->
        <div class="doc-section">
            <h2>分页</h2>
            <p>支持前端分页和后端分页两种模式</p>

            <div class="demo-block">
                <CrudTable
                    :data="paginationData"
                    :columns="paginationColumns"
                    :has-pagination="true"
                    :total="paginationTotal"
                    :page="currentPage"
                    :page-size="pageSize"
                    @update:page="handlePageChange"
                    @update:page-size="handleSizeChange" />
            </div>

            <CodeBlock :files="paginationCodeFiles" />
        </div>

        <!-- API 文档 -->
        <div class="doc-section">
            <h2>API 文档</h2>

            <h3>CrudTable Props</h3>
            <div class="api-table">
                <table>
                    <thead>
                        <tr>
                            <th>参数</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>data</td>
                            <td>表格数据</td>
                            <td>Array</td>
                            <td>[]</td>
                        </tr>
                        <tr>
                            <td>columns</td>
                            <td>表格列配置</td>
                            <td>CrudTableColumn[]</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>loading</td>
                            <td>是否显示加载状态</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>has-pagination</td>
                            <td>是否显示分页</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>total</td>
                            <td>数据总数</td>
                            <td>number</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>page</td>
                            <td>当前页码</td>
                            <td>number</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>page-size</td>
                            <td>每页显示条数</td>
                            <td>number</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>toolbar</td>
                            <td>工具栏配置</td>
                            <td>CrudTableToolbar</td>
                            <td>{}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>CrudTable Events</h3>
            <div class="api-table">
                <table>
                    <thead>
                        <tr>
                            <th>事件名</th>
                            <th>说明</th>
                            <th>参数</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>selection-change</td>
                            <td>选择项发生变化时触发</td>
                            <td>selection: any[]</td>
                        </tr>
                        <tr>
                            <td>current-change</td>
                            <td>当前行发生变化时触发</td>
                            <td>currentRow: any, oldCurrentRow: any</td>
                        </tr>
                        <tr>
                            <td>row-click</td>
                            <td>行点击事件</td>
                            <td>row: any, column: any, event: Event</td>
                        </tr>
                        <tr>
                            <td>row-dblclick</td>
                            <td>行双击事件</td>
                            <td>row: any, column: any, event: Event</td>
                        </tr>
                        <tr>
                            <td>sort-change</td>
                            <td>排序变化时触发</td>
                            <td>{ column: any, prop: string, order: string | null }</td>
                        </tr>
                        <tr>
                            <td>filter-change</td>
                            <td>筛选变化时触发</td>
                            <td>filters: Record&lt;string, any[]&gt;</td>
                        </tr>
                        <tr>
                            <td>update:page</td>
                            <td>页码变化时触发</td>
                            <td>page: number</td>
                        </tr>
                        <tr>
                            <td>update:page-size</td>
                            <td>每页条数变化时触发</td>
                            <td>pageSize: number</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>CrudTableColumn 配置</h3>
            <div class="api-table">
                <table>
                    <thead>
                        <tr>
                            <th>参数</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>prop</td>
                            <td>对应列内容的字段名</td>
                            <td>string</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>label</td>
                            <td>显示的标题</td>
                            <td>string</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>width</td>
                            <td>对应列的宽度</td>
                            <td>string | number</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>min-width</td>
                            <td>对应列的最小宽度</td>
                            <td>string | number</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>fixed</td>
                            <td>列是否固定</td>
                            <td>'left' | 'right' | boolean</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>sortable</td>
                            <td>对应列是否可以排序</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>filters</td>
                            <td>数据过滤的选项</td>
                            <td>Array&lt;{text: string, value: any}&gt;</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>filter-method</td>
                            <td>数据过滤使用的方法</td>
                            <td>Function</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td>对应列的类型</td>
                            <td>'selection' | 'index' | 'expand'</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>visible</td>
                            <td>列是否可见</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>render</td>
                            <td>自定义渲染函数</td>
                            <td>Function</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>slots</td>
                            <td>自定义插槽</td>
                            <td>Object</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>children</td>
                            <td>子列配置（用于表头分组）</td>
                            <td>CrudTableColumn[]</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>CrudTable Methods</h3>
            <div class="api-table">
                <table>
                    <thead>
                        <tr>
                            <th>方法名</th>
                            <th>说明</th>
                            <th>参数</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>clearSelection</td>
                            <td>清空选择</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>getSelectionRows</td>
                            <td>获取选中的行</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>toggleRowSelection</td>
                            <td>切换某一行的选中状态</td>
                            <td>row: any, selected?: boolean</td>
                        </tr>
                        <tr>
                            <td>clearSort</td>
                            <td>清空排序条件</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>clearFilter</td>
                            <td>清空过滤条件</td>
                            <td>columnKeys?: string[]</td>
                        </tr>
                        <tr>
                            <td>doLayout</td>
                            <td>重新布局表格</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>CrudTable Slots</h3>
            <div class="api-table">
                <table>
                    <thead>
                        <tr>
                            <th>插槽名</th>
                            <th>说明</th>
                            <th>参数</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>toolbar-left</td>
                            <td>工具栏左侧内容</td>
                            <td>{ selection: any[] }</td>
                        </tr>
                        <tr>
                            <td>toolbar-right</td>
                            <td>工具栏右侧内容</td>
                            <td>{ selection: any[] }</td>
                        </tr>
                        <tr>
                            <td>empty</td>
                            <td>空数据时的内容</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>[prop]</td>
                            <td>自定义列内容（prop 为列的字段名）</td>
                            <td>{ row: any, column: any, index: number, cellValue: any }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="tsx">
    import { ref, computed } from 'vue'
    import { ElMessage, ElTag, ElButton, ElMessageBox, ElAvatar } from 'element-plus'
    import { CrudTable } from '@northal/crud-element-plus'
    import type { CrudTableColumn } from '@northal/crud-element-plus'
    import CodeBlock from '../components/CodeBlock.vue'

    // 基础数据
    const basicData = ref([
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', department: '技术部' },
        { id: 2, name: '李四', age: 28, email: 'lisi@example.com', department: '产品部' },
        { id: 3, name: '王五', age: 30, email: 'wangwu@example.com', department: '设计部' }
    ])

    const basicColumns: CrudTableColumn[] = [
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', width: 80 },
        { prop: 'email', label: '邮箱', minWidth: 200 },
        { prop: 'department', label: '部门', width: 120 }
    ]

    // 单选多选数据
    const selectionTableRef = ref()
    const selectedRows = ref<any[]>([])
    const selectedCount = computed(() => selectedRows.value.length)

    const selectionData = ref([
        { id: 1, name: '张三', age: 25, department: '技术部', salary: 15000 },
        { id: 2, name: '李四', age: 28, department: '产品部', salary: 12000 },
        { id: 3, name: '王五', age: 30, department: '设计部', salary: 18000 },
        { id: 4, name: '赵六', age: 26, department: '技术部', salary: 14000 }
    ])

    const selectionColumns: CrudTableColumn[] = [
        { type: 'selection', width: 55 },
        { type: 'index', label: '序号', width: 60 },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', width: 80 },
        { prop: 'department', label: '部门', width: 120 },
        {
            prop: 'salary',
            label: '薪资',
            width: 120,
            render: (row: any) => `¥${row.salary.toLocaleString()}`
        }
    ]

    // 选择相关方法
    const handleSelectionChange = (selection: any[]) => {
        selectedRows.value = selection
        console.log('选择变化:', selection)
    }

    const handleCurrentChange = (currentRow: any, oldCurrentRow: any) => {
        console.log('当前行变化:', currentRow, oldCurrentRow)
    }

    const clearSelection = () => {
        selectionTableRef.value?.clearSelection()
    }

    const toggleFirstRow = () => {
        if (selectionData.value.length > 0) {
            selectionTableRef.value?.toggleRowSelection(selectionData.value[0])
        }
    }

    // 工具栏数据
    const searchKeyword = ref('')
    const toolbarData = ref([
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', status: 'active', role: 'admin' },
        { id: 2, name: '李四', age: 28, email: 'lisi@example.com', status: 'inactive', role: 'user' },
        { id: 3, name: '王五', age: 30, email: 'wangwu@example.com', status: 'active', role: 'user' },
        { id: 4, name: '赵六', age: 26, email: 'zhaoliu@example.com', status: 'pending', role: 'user' }
    ])

    const toolbarColumns: CrudTableColumn[] = [
        { type: 'selection', width: 55 },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', width: 80 },
        { prop: 'email', label: '邮箱', minWidth: 200 },
        {
            prop: 'status',
            label: '状态',
            width: 100,
            render: row => {
                const statusMap = {
                    active: { type: 'success', text: '激活' },
                    inactive: { type: 'danger', text: '禁用' },
                    pending: { type: 'warning', text: '待审核' }
                }
                const status = statusMap[row.status as keyof typeof statusMap]
                return <ElTag type={status.type as any}>{status.text}</ElTag>
            }
        }
    ]

    // 筛选过滤数据
    const filterData = ref([
        { id: 1, name: '张三', age: 25, department: '技术部', level: 'P6', salary: 15000 },
        { id: 2, name: '李四', age: 28, department: '产品部', level: 'P7', salary: 18000 },
        { id: 3, name: '王五', age: 30, department: '设计部', level: 'P5', salary: 12000 },
        { id: 4, name: '赵六', age: 26, department: '技术部', level: 'P6', salary: 16000 },
        { id: 5, name: '钱七', age: 32, department: '产品部', level: 'P8', salary: 22000 }
    ])

    const filterColumns: CrudTableColumn[] = [
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
                { text: '产品部', value: '产品部' },
                { text: '设计部', value: '设计部' }
            ],
            filterMethod: (value: string, row: any) => row.department === value
        },
        {
            prop: 'level',
            label: '级别',
            width: 100,
            filters: [
                { text: 'P5', value: 'P5' },
                { text: 'P6', value: 'P6' },
                { text: 'P7', value: 'P7' },
                { text: 'P8', value: 'P8' }
            ],
            filterMethod: (value: string, row: any) => row.level === value
        },
        {
            prop: 'salary',
            label: '薪资',
            width: 120,
            sortable: true,
            render: row => `¥${row.salary.toLocaleString()}`
        }
    ]

    const handleSortChange = (sortInfo: any) => {
        console.log('排序变化:', sortInfo)
        ElMessage.info(`按 ${sortInfo.prop} ${sortInfo.order === 'ascending' ? '升序' : '降序'} 排序`)
    }

    const handleFilterChange = (filters: any) => {
        console.log('筛选变化:', filters)
        const filterTexts = Object.entries(filters)
            .filter(([, values]) => (values as any[]).length > 0)
            .map(([key, values]) => `${key}: ${(values as any[]).join(', ')}`)

        if (filterTexts.length > 0) {
            ElMessage.info(`筛选条件: ${filterTexts.join('; ')}`)
        } else {
            ElMessage.info('已清除所有筛选条件')
        }
    }

    // 合并行列数据
    const mergeData = ref([
        { id: 1, name: '张三', department: '技术部', position: '前端工程师', project: '项目A' },
        { id: 2, name: '李四', department: '技术部', position: '后端工程师', project: '项目A' },
        { id: 3, name: '王五', department: '技术部', position: '测试工程师', project: '项目B' },
        { id: 4, name: '赵六', department: '产品部', position: '产品经理', project: '项目B' },
        { id: 5, name: '钱七', department: '产品部', position: '产品设计师', project: '项目C' }
    ])

    const mergeColumns: CrudTableColumn[] = [
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'department', label: '部门', width: 120 },
        { prop: 'position', label: '职位', width: 150 },
        { prop: 'project', label: '项目', width: 120 }
    ]

    const spanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
        // 合并部门列相同的单元格
        if (columnIndex === 1) {
            // 部门列
            if (rowIndex === 0 || rowIndex === 1 || rowIndex === 2) {
                if (rowIndex === 0) {
                    return [3, 1] // 合并3行1列
                } else {
                    return [0, 0] // 隐藏
                }
            }
            if (rowIndex === 3 || rowIndex === 4) {
                if (rowIndex === 3) {
                    return [2, 1] // 合并2行1列
                } else {
                    return [0, 0] // 隐藏
                }
            }
        }
        // 合并项目列
        if (columnIndex === 3) {
            // 项目列
            if (rowIndex === 0 || rowIndex === 1) {
                if (rowIndex === 0) {
                    return [2, 1] // 合并2行1列
                } else {
                    return [0, 0] // 隐藏
                }
            }
            if (rowIndex === 2 || rowIndex === 3) {
                if (rowIndex === 2) {
                    return [2, 1] // 合并2行1列
                } else {
                    return [0, 0] // 隐藏
                }
            }
        }
    }

    // 表头分组数据
    const groupData = ref([
        { id: 1, name: '张三', basicSalary: 10000, bonus: 5000, allowance: 2000, department: '技术部' },
        { id: 2, name: '李四', basicSalary: 12000, bonus: 6000, allowance: 2500, department: '产品部' },
        { id: 3, name: '王五', basicSalary: 8000, bonus: 4000, allowance: 1500, department: '设计部' }
    ])

    const groupColumns: CrudTableColumn[] = [
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'department', label: '部门', width: 120 },
        {
            label: '薪资详情',
            children: [
                {
                    prop: 'basicSalary',
                    label: '基本工资',
                    width: 120,
                    render: (row: any) => `¥${row.basicSalary.toLocaleString()}`
                },
                {
                    prop: 'bonus',
                    label: '奖金',
                    width: 120,
                    render: (row: any) => `¥${row.bonus.toLocaleString()}`
                },
                {
                    prop: 'allowance',
                    label: '津贴',
                    width: 120,
                    render: (row: any) => `¥${row.allowance.toLocaleString()}`
                }
            ]
        },
        {
            label: '总计',
            width: 120,
            render: row => `¥${(row.basicSalary + row.bonus + row.allowance).toLocaleString()}`
        }
    ]

    // 固定列数据
    const fixedData = ref([
        {
            id: 1,
            name: '张三',
            age: 25,
            department: '技术部',
            skill1: 'Vue',
            skill2: 'React',
            skill3: 'Angular',
            skill4: 'Node.js',
            skill5: 'TypeScript',
            project1: '项目A',
            project2: '项目B',
            project3: '项目C',
            salary: 15000
        },
        {
            id: 2,
            name: '李四',
            age: 28,
            department: '产品部',
            skill1: 'Figma',
            skill2: 'Sketch',
            skill3: 'Axure',
            skill4: 'Photoshop',
            skill5: 'Illustrator',
            project1: '项目D',
            project2: '项目E',
            project3: '项目F',
            salary: 12000
        },
        {
            id: 3,
            name: '王五',
            age: 30,
            department: '设计部',
            skill1: 'UI设计',
            skill2: 'UX设计',
            skill3: '交互设计',
            skill4: '视觉设计',
            skill5: '用户研究',
            project1: '项目G',
            project2: '项目H',
            project3: '项目I',
            salary: 18000
        }
    ])

    const fixedColumns: CrudTableColumn[] = [
        { prop: 'id', label: 'ID', width: 60, fixed: 'left' },
        { prop: 'name', label: '姓名', width: 100, fixed: 'left' },
        { prop: 'age', label: '年龄', width: 80 },
        { prop: 'department', label: '部门', width: 120 },
        { prop: 'skill1', label: '技能1', width: 120 },
        { prop: 'skill2', label: '技能2', width: 120 },
        { prop: 'skill3', label: '技能3', width: 120 },
        { prop: 'skill4', label: '技能4', width: 120 },
        { prop: 'skill5', label: '技能5', width: 120 },
        { prop: 'project1', label: '项目1', width: 120 },
        { prop: 'project2', label: '项目2', width: 120 },
        { prop: 'project3', label: '项目3', width: 120 },
        {
            prop: 'salary',
            label: '薪资',
            width: 120,
            fixed: 'right',
            render: row => `¥${row.salary.toLocaleString()}`
        },
        {
            prop: 'actions',
            label: '操作',
            width: 150,
            fixed: 'right',
            slots: {
                default: ({ row }) => (
                    <div style='display: flex; gap: 8px'>
                        <ElButton size='small' type='primary'>
                            编辑
                        </ElButton>
                        <ElButton size='small' type='danger'>
                            删除
                        </ElButton>
                    </div>
                )
            }
        }
    ]

    // 总计行数据
    const summaryData = ref([
        { id: 1, name: '张三', department: '技术部', sales: 12000, commission: 1200 },
        { id: 2, name: '李四', department: '销售部', sales: 15000, commission: 1500 },
        { id: 3, name: '王五', department: '销售部', sales: 18000, commission: 1800 },
        { id: 4, name: '赵六', department: '技术部', sales: 8000, commission: 800 }
    ])

    const summaryColumns: CrudTableColumn[] = [
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'department', label: '部门', width: 120 },
        {
            prop: 'sales',
            label: '销售额',
            width: 120,
            render: row => `¥${row.sales.toLocaleString()}`
        },
        {
            prop: 'commission',
            label: '提成',
            width: 120,
            render: row => `¥${row.commission.toLocaleString()}`
        }
    ]

    const getSummaries = (param: any) => {
        const { columns, data } = param
        const sums: string[] = []
        columns.forEach((column: any, index: number) => {
            if (index === 0) {
                sums[index] = '总计'
                return
            }
            if (index === 1) {
                sums[index] = ''
                return
            }

            const values = data.map((item: any) => Number(item[column.property]))
            if (!values.every((value: any) => Number.isNaN(value))) {
                sums[index] = `¥${values
                    .reduce((prev: number, curr: number) => {
                        const value = Number(curr)
                        if (!Number.isNaN(value)) {
                            return prev + curr
                        } else {
                            return prev
                        }
                    }, 0)
                    .toLocaleString()}`
            } else {
                sums[index] = ''
            }
        })
        return sums
    }

    const toolbarConfig = {
        show: true,
        left: {
            title: '用户管理',
            actions: [
                {
                    key: 'add',
                    label: '新增用户',
                    type: 'primary' as const,
                    icon: 'Plus',
                    onClick: () => ElMessage.success('新增用户功能')
                },
                {
                    key: 'delete',
                    label: '批量删除',
                    type: 'danger' as const,
                    icon: 'Delete',
                    disabled: (selection: any[]) => selection.length === 0,
                    onClick: async (selection: any[]) => {
                        try {
                            await ElMessageBox.confirm(`确定要删除选中的 ${selection.length} 条数据吗？`, '批量删除')
                            ElMessage.success(`成功删除 ${selection.length} 条数据`)
                        } catch {
                            ElMessage.info('已取消删除')
                        }
                    }
                }
            ]
        },
        right: {
            settings: {
                columns: true,
                refresh: true,
                fullscreen: true
            }
        }
    }

    const handleToolbarSelectionChange = (selection: any[]) => {
        console.log('工具栏选择变化:', selection)
    }

    // 自定义列数据
    const customData = ref([
        {
            id: 1,
            name: '张三',
            salary: 15000,
            skills: ['Vue', 'React', 'TypeScript'],
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            createTime: '2023-01-15'
        },
        {
            id: 2,
            name: '李四',
            salary: 12000,
            skills: ['Java', 'Spring', 'MySQL'],
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            createTime: '2023-02-20'
        },
        {
            id: 3,
            name: '王五',
            salary: 18000,
            skills: ['Python', 'Django', 'PostgreSQL'],
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            createTime: '2023-03-10'
        }
    ])

    const handleEdit = (row: any) => {
        ElMessage.success(`编辑用户: ${row.name}`)
    }

    const handleDelete = async (row: any) => {
        try {
            await ElMessageBox.confirm(`确定要删除用户 ${row.name} 吗？`, '删除确认')
            ElMessage.success(`删除用户: ${row.name}`)
        } catch {
            ElMessage.info('已取消删除')
        }
    }

    const customColumns: CrudTableColumn[] = [
        {
            prop: 'avatar',
            label: '头像',
            width: 80,
            slots: {
                default: ({ row }) => <ElAvatar src={row.avatar} size={40} />
            }
        },
        { prop: 'name', label: '姓名', width: 120 },
        {
            prop: 'salary',
            label: '薪资',
            width: 120,
            render: row => <span style='color: #f56c6c; font-weight: bold'>¥{row.salary.toLocaleString()}</span>
        },
        {
            prop: 'skills',
            label: '技能',
            minWidth: 200,
            slots: {
                default: ({ row }) => (
                    <div style='display: flex; gap: 4px; flex-wrap: wrap'>
                        {row.skills.map((skill: string) => (
                            <ElTag key={skill} size='small' type='info'>
                                {skill}
                            </ElTag>
                        ))}
                    </div>
                )
            }
        },
        { prop: 'createTime', label: '创建时间', width: 120 },
        {
            prop: 'actions',
            label: '操作',
            width: 180,
            fixed: 'right',
            slots: {
                default: ({ row }) => (
                    <div style='display: flex; gap: 8px'>
                        <ElButton size='small' type='primary' onClick={() => handleEdit(row)}>
                            编辑
                        </ElButton>
                        <ElButton size='small' type='danger' onClick={() => handleDelete(row)}>
                            删除
                        </ElButton>
                    </div>
                )
            }
        }
    ]

    // 展开行数据
    const expandData = ref([
        {
            id: 1,
            name: '张三',
            age: 25,
            department: '技术部',
            details: {
                address: '北京市朝阳区xxx街道xxx号',
                phone: '13800138000',
                projects: ['项目A', '项目B', '项目C'],
                description: '资深前端开发工程师，擅长Vue、React等前端技术栈，有5年以上开发经验。'
            }
        },
        {
            id: 2,
            name: '李四',
            age: 28,
            department: '产品部',
            details: {
                address: '上海市浦东新区xxx路xxx号',
                phone: '13900139000',
                projects: ['产品X', '产品Y'],
                description: '高级产品经理，负责多个核心产品的规划和设计，具有丰富的用户体验设计经验。'
            }
        }
    ])

    const expandColumns: CrudTableColumn[] = [
        {
            type: 'expand',
            width: 50,
            slots: {
                default: ({ row }) => (
                    <div style='padding: 20px; background: #f8f9fa; margin: 0 20px; border-radius: 4px'>
                        <h4 style='margin: 0 0 16px 0; color: #333; border-bottom: 1px solid #e4e7ed; padding-bottom: 8px'>
                            {row.name} 的详细信息
                        </h4>
                        <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px'>
                            <div>
                                <p style='margin: 8px 0'>
                                    <strong>联系方式:</strong>
                                </p>
                                <p style='margin: 4px 0; color: #666'>地址: {row.details.address}</p>
                                <p style='margin: 4px 0; color: #666'>电话: {row.details.phone}</p>
                            </div>
                            <div>
                                <p style='margin: 8px 0'>
                                    <strong>参与项目:</strong>
                                </p>
                                <div style='display: flex; gap: 8px; flex-wrap: wrap; margin: 8px 0'>
                                    {row.details.projects.map((project: string) => (
                                        <ElTag key={project} size='small' type='success'>
                                            {project}
                                        </ElTag>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div style='margin-top: 16px'>
                            <p style='margin: 8px 0'>
                                <strong>个人描述:</strong>
                            </p>
                            <p style='color: #666; line-height: 1.6; margin: 8px 0'>{row.details.description}</p>
                        </div>
                    </div>
                )
            }
        },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', width: 80 },
        { prop: 'department', label: '部门', width: 120 }
    ]

    // 树形数据
    const treeData = ref([
        {
            id: 1,
            name: '技术部',
            type: 'department',
            memberCount: 15,
            children: [
                { id: 11, name: '张三', type: 'user', role: '前端工程师', level: 'P6' },
                { id: 12, name: '李四', type: 'user', role: '后端工程师', level: 'P7' },
                {
                    id: 13,
                    name: '前端组',
                    type: 'group',
                    memberCount: 8,
                    children: [
                        { id: 131, name: '王五', type: 'user', role: '前端工程师', level: 'P5' },
                        { id: 132, name: '赵六', type: 'user', role: '前端工程师', level: 'P6' }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: '产品部',
            type: 'department',
            memberCount: 8,
            children: [
                { id: 21, name: '钱七', type: 'user', role: '产品经理', level: 'P6' },
                { id: 22, name: '孙八', type: 'user', role: '产品设计师', level: 'P5' }
            ]
        }
    ])

    const treeColumns: CrudTableColumn[] = [
        {
            prop: 'name',
            label: '名称',
            minWidth: 200,
            slots: {
                default: ({ row }) => (
                    <div style='display: flex; align-items: center; gap: 8px'>
                        <span>{row.name}</span>
                        {row.type === 'department' && (
                            <ElTag size='small' type='primary'>
                                部门
                            </ElTag>
                        )}
                        {row.type === 'group' && (
                            <ElTag size='small' type='success'>
                                小组
                            </ElTag>
                        )}
                        {row.type === 'user' && <ElTag size='small'>成员</ElTag>}
                    </div>
                )
            }
        },
        {
            prop: 'role',
            label: '角色/职位',
            width: 150,
            render: row => row.role || '-'
        },
        {
            prop: 'level',
            label: '级别',
            width: 100,
            render: row => row.level || '-'
        },
        {
            prop: 'memberCount',
            label: '成员数',
            width: 100,
            render: row => (row.memberCount ? `${row.memberCount}人` : '-')
        }
    ]

    // 分页数据
    const currentPage = ref(1)
    const pageSize = ref(10)
    const paginationTotal = ref(100)

    const paginationData = computed(() => {
        const start = (currentPage.value - 1) * pageSize.value
        return Array.from({ length: pageSize.value }, (_, i) => ({
            id: start + i + 1,
            name: `用户${start + i + 1}`,
            age: 20 + Math.floor(Math.random() * 20),
            email: `user${start + i + 1}@example.com`,
            department: ['技术部', '产品部', '设计部'][Math.floor(Math.random() * 3)]
        }))
    })

    const paginationColumns: CrudTableColumn[] = [
        { prop: 'id', label: 'ID', width: 80 },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', width: 80 },
        { prop: 'email', label: '邮箱', minWidth: 200 },
        { prop: 'department', label: '部门', width: 120 }
    ]

    const handlePageChange = (newPage: number) => {
        currentPage.value = newPage
        ElMessage.info(`切换到第 ${newPage} 页`)
    }

    const handleSizeChange = (newSize: number) => {
        pageSize.value = newSize
        currentPage.value = 1
        ElMessage.info(`每页显示 ${newSize} 条`)
    }

    // 代码文件定义 - 使用模板字符串避免标签解析问题
    const templateStartTag = '<' + 'template>'
    const templateEndTag = '</' + 'template>'
    const templateSlotStart = '<' + 'template'
    const scriptStartTag = '<' + 'script setup lang="ts">'
    const scriptEndTag = '</' + 'script>'

    const basicCodeFiles = {
        template: {
            name: 'Template',
            lang: 'vue',
            code: `${templateStartTag}
  <CrudTable :data="data" :columns="columns" :has-pagination="false" />
${templateEndTag}`
        },
        script: {
            name: 'Script',
            lang: 'typescript',
            code: `${scriptStartTag}
import { ref } from 'vue'
import { CrudTable } from '@northal/crud-element-plus'
import type { CrudTableColumn } from '@northal/crud-element-plus'

const data = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', department: '技术部' },
  { id: 2, name: '李四', age: 28, email: 'lisi@example.com', department: '产品部' },
  { id: 3, name: '王五', age: 30, email: 'wangwu@example.com', department: '设计部' }
])

const columns: CrudTableColumn[] = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'email', label: '邮箱', minWidth: 200 },
  { prop: 'department', label: '部门', width: 120 }
]
${scriptEndTag}`
        }
    }

    const emptyCodeFiles = {
        template: {
            name: 'Template',
            lang: 'vue',
            code: `${templateStartTag}
  <CrudTable :data="[]" :columns="columns" :has-pagination="false">
    ${templateSlotStart} #empty>
      <div class="empty-state">
        <div class="empty-icon">📄</div>
        <p>暂无数据</p>
      </div>
    ${templateEndTag}
  </CrudTable>
${templateEndTag}`
        },
        script: {
            name: 'Script',
            lang: 'typescript',
            code: `${scriptStartTag}
import { CrudTable } from '@northal/crud-element-plus'
import type { CrudTableColumn } from '@northal/crud-element-plus'

const columns: CrudTableColumn[] = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'email', label: '邮箱', minWidth: 200 },
  { prop: 'department', label: '部门', width: 120 }
]
${scriptEndTag}`
        },
        style: {
            name: 'Style',
            lang: 'css',
            code: `<style scoped>
.empty-state {
  text-align: center;
  padding: 40px 0;
  color: #909399;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-state p {
  margin: 16px 0 0 0;
  font-size: 14px;
}
</style>`
        }
    }

    const selectionCodeFiles = {
        template: {
            name: 'Template',
            lang: 'vue',
            code: `<template>
  <div class="selection-demo">
    <div class="selection-controls">
      <ElButton @click="clearSelection">清空选择</ElButton>
      <ElButton @click="toggleFirstRow">切换第一行选择</ElButton>
      <span class="selection-count">已选择: {{ selectedCount }} 项</span>
    </div>

    <CrudTable
      ref="tableRef"
      :data="data"
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
</template>`
        },
        script: {
            name: 'Script',
            lang: 'typescript',
            code: `<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElButton } from 'element-plus'
import { CrudTable } from '@northal/crud-element-plus'
import type { CrudTableColumn } from '@northal/crud-element-plus'

const tableRef = ref()
const selectedRows = ref<any[]>([])
const selectedCount = computed(() => selectedRows.value.length)

const data = ref([
  { id: 1, name: '张三', age: 25, department: '技术部', salary: 15000 },
  { id: 2, name: '李四', age: 28, department: '产品部', salary: 12000 },
  { id: 3, name: '王五', age: 30, department: '设计部', salary: 18000 },
  { id: 4, name: '赵六', age: 26, department: '技术部', salary: 14000 }
])

const columns: CrudTableColumn[] = [
  { type: 'selection', width: 55 },
  { type: 'index', label: '序号', width: 60 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'department', label: '部门', width: 120 },
  {
    prop: 'salary',
    label: '薪资',
    width: 120,
    render: (row) => \`¥\${row.salary.toLocaleString()}\`
  }
]

const handleSelectionChange = (selection: any[]) => {
  selectedRows.value = selection
  console.log('选择变化:', selection)
}

const handleCurrentChange = (currentRow: any, oldCurrentRow: any) => {
  console.log('当前行变化:', currentRow, oldCurrentRow)
}

const clearSelection = () => {
  tableRef.value?.clearSelection()
}

const toggleFirstRow = () => {
  if (data.value.length > 0) {
    tableRef.value?.toggleRowSelection(data.value[0])
  }
}
${scriptEndTag}`
        },
        style: {
            name: 'Style',
            lang: 'css',
            code: `<style scoped>
.selection-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.selection-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.selection-count {
  color: #666;
  font-size: 14px;
}

.selection-result {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
}

.selection-result h4 {
  margin: 0 0 12px 0;
  color: #333;
}

.selection-result pre {
  margin: 0;
  font-size: 12px;
  color: #666;
  max-height: 200px;
  overflow: auto;
}
</style>`
        }
    }

    const filterCodeFiles = {
        template: {
            name: 'Template',
            lang: 'vue',
            code: `<template>
  <CrudTable
    :data="data"
    :columns="columns"
    :has-pagination="false"
    @sort-change="handleSortChange"
    @filter-change="handleFilterChange" />
</template>`
        },
        script: {
            name: 'Script',
            lang: 'typescript',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { CrudTable } from '@northal/crud-element-plus'
import type { CrudTableColumn } from '@northal/crud-element-plus'

const data = ref([
  { id: 1, name: '张三', age: 25, department: '技术部', level: 'P6', salary: 15000 },
  { id: 2, name: '李四', age: 28, department: '产品部', level: 'P7', salary: 18000 },
  { id: 3, name: '王五', age: 30, department: '设计部', level: 'P5', salary: 12000 },
  { id: 4, name: '赵六', age: 26, department: '技术部', level: 'P6', salary: 16000 },
  { id: 5, name: '钱七', age: 32, department: '产品部', level: 'P8', salary: 22000 }
])

const columns: CrudTableColumn[] = [
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
      { text: '产品部', value: '产品部' },
      { text: '设计部', value: '设计部' }
    ],
    filterMethod: (value: string, row: any) => row.department === value
  },
  {
    prop: 'level',
    label: '级别',
    width: 100,
    filters: [
      { text: 'P5', value: 'P5' },
      { text: 'P6', value: 'P6' },
      { text: 'P7', value: 'P7' },
      { text: 'P8', value: 'P8' }
    ],
    filterMethod: (value: string, row: any) => row.level === value
  },
  {
    prop: 'salary',
    label: '薪资',
    width: 120,
    sortable: true,
    render: (row) => \`¥\${row.salary.toLocaleString()}\`
  }
]

const handleSortChange = (sortInfo: any) => {
  console.log('排序变化:', sortInfo)
  ElMessage.info(\`按 \${sortInfo.prop} \${sortInfo.order === 'ascending' ? '升序' : '降序'} 排序\`)
}

const handleFilterChange = (filters: any) => {
  console.log('筛选变化:', filters)
  const filterTexts = Object.entries(filters)
    .filter(([, values]) => (values as any[]).length > 0)
    .map(([key, values]) => \`\${key}: \${(values as any[]).join(', ')}\`)

  if (filterTexts.length > 0) {
    ElMessage.info(\`筛选条件: \${filterTexts.join('; ')}\`)
  } else {
    ElMessage.info('已清除所有筛选条件')
  }
}
${scriptEndTag}`
        }
    }

    const mergeCodeFiles = {
        template: {
            name: 'Template',
            lang: 'vue',
            code: `<template>
  <CrudTable
    :data="data"
    :columns="columns"
    :has-pagination="false"
    :span-method="spanMethod" />
</template>`
        },
        script: {
            name: 'Script',
            lang: 'typescript',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { CrudTable } from '@northal/crud-element-plus'
import type { CrudTableColumn } from '@northal/crud-element-plus'

const data = ref([
  { id: 1, name: '张三', department: '技术部', position: '前端工程师', project: '项目A' },
  { id: 2, name: '李四', department: '技术部', position: '后端工程师', project: '项目A' },
  { id: 3, name: '王五', department: '技术部', position: '测试工程师', project: '项目B' },
  { id: 4, name: '赵六', department: '产品部', position: '产品经理', project: '项目B' },
  { id: 5, name: '钱七', department: '产品部', position: '产品设计师', project: '项目C' }
])

const columns: CrudTableColumn[] = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'department', label: '部门', width: 120 },
  { prop: 'position', label: '职位', width: 150 },
  { prop: 'project', label: '项目', width: 120 }
]

const spanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
  // 合并部门列相同的单元格
  if (columnIndex === 1) { // 部门列
    if (rowIndex === 0 || rowIndex === 1 || rowIndex === 2) {
      if (rowIndex === 0) {
        return [3, 1] // 合并3行1列
      } else {
        return [0, 0] // 隐藏
      }
    }
    if (rowIndex === 3 || rowIndex === 4) {
      if (rowIndex === 3) {
        return [2, 1] // 合并2行1列
      } else {
        return [0, 0] // 隐藏
      }
    }
  }
  // 合并项目列
  if (columnIndex === 3) { // 项目列
    if (rowIndex === 0 || rowIndex === 1) {
      if (rowIndex === 0) {
        return [2, 1] // 合并2行1列
      } else {
        return [0, 0] // 隐藏
      }
    }
    if (rowIndex === 2 || rowIndex === 3) {
      if (rowIndex === 2) {
        return [2, 1] // 合并2行1列
      } else {
        return [0, 0] // 隐藏
      }
    }
  }
}
${scriptEndTag}`
        }
    }

    const toolbarCodeFiles = {
        template: {
            name: 'Template',
            lang: 'vue',
            code: `<template>
  <CrudTable
    :data="data"
    :columns="columns"
    :toolbar="toolbar"
    :has-pagination="false"
    @selection-change="handleSelectionChange">

    <template #toolbar-left="{ selection }">
      <div class="selection-info">
        已选择 {{ selection.length }} 项
      </div>
    </template>

    <template #toolbar-right>
      <ElInput
        v-model="searchKeyword"
        placeholder="搜索用户..."
        style="width: 200px"
        prefix-icon="Search"
        clearable />
    </template>
  </CrudTable>
</template>`
        },
        script: {
            name: 'Script',
            lang: 'typescript',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElTag, ElInput, ElMessageBox } from 'element-plus'
import { CrudTable } from '@northal/crud-element-plus'
import type { CrudTableColumn } from '@northal/crud-element-plus'

const searchKeyword = ref('')

const data = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', status: 'active', role: 'admin' },
  { id: 2, name: '李四', age: 28, email: 'lisi@example.com', status: 'inactive', role: 'user' },
  { id: 3, name: '王五', age: 30, email: 'wangwu@example.com', status: 'active', role: 'user' }
])

const columns: CrudTableColumn[] = [
  { type: 'selection', width: 55 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'email', label: '邮箱', minWidth: 200 },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    render: (row) => {
      const statusMap = {
        active: { type: 'success', text: '激活' },
        inactive: { type: 'danger', text: '禁用' },
        pending: { type: 'warning', text: '待审核' }
      }
      const status = statusMap[row.status as keyof typeof statusMap]
      return <ElTag type={status.type as any}>{status.text}</ElTag>
    }
  }
]

const toolbar = {
  show: true,
  left: {
    title: '用户管理',
    actions: [
      {
        key: 'add',
        label: '新增用户',
        type: 'primary' as const,
        icon: 'Plus',
        onClick: () => ElMessage.success('新增用户功能')
      },
      {
        key: 'delete',
        label: '批量删除',
        type: 'danger' as const,
        icon: 'Delete',
        disabled: (selection: any[]) => selection.length === 0,
        onClick: async (selection: any[]) => {
          try {
            await ElMessageBox.confirm(\`确定要删除选中的 \${selection.length} 条数据吗？\`, '批量删除')
            ElMessage.success(\`成功删除 \${selection.length} 条数据\`)
          } catch {
            ElMessage.info('已取消删除')
          }
        }
      }
    ]
  },
  right: {
    settings: {
      columns: true,
      refresh: true,
      fullscreen: true
    }
  }
}

const handleSelectionChange = (selection: any[]) => {
  console.log('选择变化:', selection)
}
${scriptEndTag}`
        },
        style: {
            name: 'Style',
            lang: 'css',
            code: `<style scoped>
.selection-info {
  margin-left: 16px;
  color: #666;
  font-size: 14px;
  display: flex;
  align-items: center;
}
</style>`
        }
    }

    const groupCodeFiles = {
        template: {
            name: 'Template',
            lang: 'vue',
            code: `<template>
  <CrudTable
    :data="data"
    :columns="columns"
    :has-pagination="false" />
</template>`
        },
        script: {
            name: 'Script',
            lang: 'typescript',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { CrudTable } from '@northal/crud-element-plus'
import type { CrudTableColumn } from '@northal/crud-element-plus'

const data = ref([
  { id: 1, name: '张三', basicSalary: 10000, bonus: 5000, allowance: 2000, department: '技术部' },
  { id: 2, name: '李四', basicSalary: 12000, bonus: 6000, allowance: 2500, department: '产品部' },
  { id: 3, name: '王五', basicSalary: 8000, bonus: 4000, allowance: 1500, department: '设计部' }
])

const columns: CrudTableColumn[] = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'department', label: '部门', width: 120 },
  {
    label: '薪资详情',
    children: [
      {
        prop: 'basicSalary',
        label: '基本工资',
        width: 120,
        render: (row) => \`¥\${row.basicSalary.toLocaleString()}\`
      },
      {
        prop: 'bonus',
        label: '奖金',
        width: 120,
        render: (row) => \`¥\${row.bonus.toLocaleString()}\`
      },
      {
        prop: 'allowance',
        label: '津贴',
        width: 120,
        render: (row) => \`¥\${row.allowance.toLocaleString()}\`
      }
    ]
  },
  {
    label: '总计',
    width: 120,
    render: (row) => \`¥\${(row.basicSalary + row.bonus + row.allowance).toLocaleString()}\`
  }
]
${scriptEndTag}`
        }
    }

    const fixedCodeFiles = {
        template: {
            name: 'Template',
            lang: 'vue',
            code: `<template>
  <div style="width: 100%; overflow: auto;">
    <CrudTable
      :data="data"
      :columns="columns"
      :has-pagination="false"
      style="width: 1200px;" />
  </div>
</template>`
        },
        script: {
            name: 'Script',
            lang: 'typescript',
            code: `<script setup lang="tsx">
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import { CrudTable } from '@northal/crud-element-plus'
import type { CrudTableColumn } from '@northal/crud-element-plus'

const data = ref([
  {
    id: 1, name: '张三', age: 25, department: '技术部',
    skill1: 'Vue', skill2: 'React', skill3: 'Angular', skill4: 'Node.js', skill5: 'TypeScript',
    project1: '项目A', project2: '项目B', project3: '项目C', salary: 15000
  },
  {
    id: 2, name: '李四', age: 28, department: '产品部',
    skill1: 'Figma', skill2: 'Sketch', skill3: 'Axure', skill4: 'Photoshop', skill5: 'Illustrator',
    project1: '项目D', project2: '项目E', project3: '项目F', salary: 12000
  }
])

const columns: CrudTableColumn[] = [
  { prop: 'id', label: 'ID', width: 60, fixed: 'left' },
  { prop: 'name', label: '姓名', width: 100, fixed: 'left' },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'department', label: '部门', width: 120 },
  { prop: 'skill1', label: '技能1', width: 120 },
  { prop: 'skill2', label: '技能2', width: 120 },
  { prop: 'skill3', label: '技能3', width: 120 },
  { prop: 'skill4', label: '技能4', width: 120 },
  { prop: 'skill5', label: '技能5', width: 120 },
  { prop: 'project1', label: '项目1', width: 120 },
  { prop: 'project2', label: '项目2', width: 120 },
  { prop: 'project3', label: '项目3', width: 120 },
  {
    prop: 'salary',
    label: '薪资',
    width: 120,
    fixed: 'right',
    render: (row) => \`¥\${row.salary.toLocaleString()}\`
  },
  {
    prop: 'actions',
    label: '操作',
    width: 150,
    fixed: 'right',
    slots: {
      default: ({ row }) => (
        <div style="display: flex; gap: 8px">
          <ElButton size="small" type="primary">编辑</ElButton>
          <ElButton size="small" type="danger">删除</ElButton>
        </div>
      )
    }
  }
]
${scriptEndTag}`
        }
    }

    const customCodeFiles = {
        template: {
            name: 'Template',
            lang: 'vue',
            code: `<template>
  <CrudTable :data="data" :columns="columns" :has-pagination="false" />
</template>`
        },
        script: {
            name: 'Script',
            lang: 'typescript',
            code: `<script setup lang="tsx">
import { ref } from 'vue'
import { ElTag, ElButton, ElAvatar, ElMessage, ElMessageBox } from 'element-plus'
import { CrudTable } from '@northal/crud-element-plus'
import type { CrudTableColumn } from '@northal/crud-element-plus'

const data = ref([
  {
    id: 1,
    name: '张三',
    salary: 15000,
    skills: ['Vue', 'React', 'TypeScript'],
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    createTime: '2023-01-15'
  },
  {
    id: 2,
    name: '李四',
    salary: 12000,
    skills: ['Java', 'Spring', 'MySQL'],
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    createTime: '2023-02-20'
  }
])

const columns: CrudTableColumn[] = [
  {
    prop: 'avatar',
    label: '头像',
    width: 80,
    slots: {
      default: ({ row }) => (
        <ElAvatar src={row.avatar} size={40} />
      )
    }
  },
  { prop: 'name', label: '姓名', width: 120 },
  {
    prop: 'salary',
    label: '薪资',
    width: 120,
    render: (row) => (
      <span style="color: #f56c6c; font-weight: bold">
        ¥{row.salary.toLocaleString()}
      </span>
    )
  },
  {
    prop: 'skills',
    label: '技能',
    minWidth: 200,
    slots: {
      default: ({ row }) => (
        <div style="display: flex; gap: 4px; flex-wrap: wrap">
          {row.skills.map((skill: string) => (
            <ElTag key={skill} size="small" type="info">{skill}</ElTag>
          ))}
        </div>
      )
    }
  },
  { prop: 'createTime', label: '创建时间', width: 120 },
  {
    prop: 'actions',
    label: '操作',
    width: 180,
    fixed: 'right',
    slots: {
      default: ({ row }) => (
        <div style="display: flex; gap: 8px">
          <ElButton size="small" type="primary" onClick={() => handleEdit(row)}>
            编辑
          </ElButton>
          <ElButton size="small" type="danger" onClick={() => handleDelete(row)}>
            删除
          </ElButton>
        </div>
      )
    }
  }
]

const handleEdit = (row: any) => {
  ElMessage.success(\`编辑用户: \${row.name}\`)
}

const handleDelete = async (row: any) => {
  try {
    await ElMessageBox.confirm(\`确定要删除用户 \${row.name} 吗？\`, '删除确认')
    ElMessage.success(\`删除用户: \${row.name}\`)
  } catch {
    ElMessage.info('已取消删除')
  }
}
${scriptEndTag}`
        }
    }

    const expandCodeFiles = {
        template: {
            name: 'Template',
            lang: 'vue',
            code: `<template>
  <CrudTable :data="data" :columns="columns" :has-pagination="false" />
</template>`
        },
        script: {
            name: 'Script',
            lang: 'typescript',
            code: `<script setup lang="tsx">
import { ref } from 'vue'
import { ElTag } from 'element-plus'
import { CrudTable } from '@northal/crud-element-plus'
import type { CrudTableColumn } from '@northal/crud-element-plus'

const data = ref([
  {
    id: 1,
    name: '张三',
    age: 25,
    department: '技术部',
    details: {
      address: '北京市朝阳区xxx街道xxx号',
      phone: '13800138000',
      projects: ['项目A', '项目B', '项目C'],
      description: '资深前端开发工程师，擅长Vue、React等前端技术栈。'
    }
  },
  {
    id: 2,
    name: '李四',
    age: 28,
    department: '产品部',
    details: {
      address: '上海市浦东新区xxx路xxx号',
      phone: '13900139000',
      projects: ['产品X', '产品Y'],
      description: '高级产品经理，负责多个核心产品的规划和设计。'
    }
  }
])

const columns: CrudTableColumn[] = [
  {
    type: 'expand',
    width: 50,
    slots: {
      default: ({ row }) => (
        <div style="padding: 20px; background: #f8f9fa; margin: 0 20px; border-radius: 4px">
          <h4 style="margin: 0 0 16px 0; color: #333; border-bottom: 1px solid #e4e7ed; padding-bottom: 8px">
            {row.name} 的详细信息
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px">
            <div>
              <p style="margin: 8px 0"><strong>联系方式:</strong></p>
              <p style="margin: 4px 0; color: #666">地址: {row.details.address}</p>
              <p style="margin: 4px 0; color: #666">电话: {row.details.phone}</p>
            </div>
            <div>
              <p style="margin: 8px 0"><strong>参与项目:</strong></p>
              <div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 8px 0">
                {row.details.projects.map((project: string) => (
                  <ElTag key={project} size="small" type="success">{project}</ElTag>
                ))}
              </div>
            </div>
          </div>
          <div style="margin-top: 16px">
            <p style="margin: 8px 0"><strong>个人描述:</strong></p>
            <p style="color: #666; line-height: 1.6; margin: 8px 0">{row.details.description}</p>
          </div>
        </div>
      )
    }
  },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'department', label: '部门', width: 120 }
]
${scriptEndTag}`
        }
    }

    const summaryCodeFiles = {
        template: {
            name: 'Template',
            lang: 'vue',
            code: `<template>
  <CrudTable
    :data="data"
    :columns="columns"
    :has-pagination="false"
    :summary-method="getSummaries"
    show-summary />
</template>`
        },
        script: {
            name: 'Script',
            lang: 'typescript',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { CrudTable } from '@northal/crud-element-plus'
import type { CrudTableColumn } from '@northal/crud-element-plus'

const data = ref([
  { id: 1, name: '张三', department: '技术部', sales: 12000, commission: 1200 },
  { id: 2, name: '李四', department: '销售部', sales: 15000, commission: 1500 },
  { id: 3, name: '王五', department: '销售部', sales: 18000, commission: 1800 },
  { id: 4, name: '赵六', department: '技术部', sales: 8000, commission: 800 }
])

const columns: CrudTableColumn[] = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'department', label: '部门', width: 120 },
  {
    prop: 'sales',
    label: '销售额',
    width: 120,
    render: (row) => \`¥\${row.sales.toLocaleString()}\`
  },
  {
    prop: 'commission',
    label: '提成',
    width: 120,
    render: (row) => \`¥\${row.commission.toLocaleString()}\`
  }
]

const getSummaries = (param: any) => {
  const { columns, data } = param
  const sums: string[] = []
  columns.forEach((column: any, index: number) => {
    if (index === 0) {
      sums[index] = '总计'
      return
    }
    if (index === 1) {
      sums[index] = ''
      return
    }

    const values = data.map((item: any) => Number(item[column.property]))
    if (!values.every((value: any) => Number.isNaN(value))) {
      sums[index] = \`¥\${values.reduce((prev: number, curr: number) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0).toLocaleString()}\`
    } else {
      sums[index] = ''
    }
  })
  return sums
}
${scriptEndTag}`
        }
    }

    const treeCodeFiles = {
        template: {
            name: 'Template',
            lang: 'vue',
            code: `<template>
  <CrudTable
    :data="data"
    :columns="columns"
    :has-pagination="false"
    row-key="id"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" />
</template>`
        },
        script: {
            name: 'Script',
            lang: 'typescript',
            code: `<script setup lang="tsx">
import { ref } from 'vue'
import { ElTag } from 'element-plus'
import { CrudTable } from '@northal/crud-element-plus'
import type { CrudTableColumn } from '@northal/crud-element-plus'

const data = ref([
  {
    id: 1,
    name: '技术部',
    type: 'department',
    memberCount: 15,
    children: [
      { id: 11, name: '张三', type: 'user', role: '前端工程师', level: 'P6' },
      { id: 12, name: '李四', type: 'user', role: '后端工程师', level: 'P7' },
      {
        id: 13,
        name: '前端组',
        type: 'group',
        memberCount: 8,
        children: [
          { id: 131, name: '王五', type: 'user', role: '前端工程师', level: 'P5' },
          { id: 132, name: '赵六', type: 'user', role: '前端工程师', level: 'P6' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '产品部',
    type: 'department',
    memberCount: 8,
    children: [
      { id: 21, name: '钱七', type: 'user', role: '产品经理', level: 'P6' },
      { id: 22, name: '孙八', type: 'user', role: '产品设计师', level: 'P5' }
    ]
  }
])

const columns: CrudTableColumn[] = [
  {
    prop: 'name',
    label: '名称',
    minWidth: 200,
    slots: {
      default: ({ row }) => (
        <div style="display: flex; align-items: center; gap: 8px">
          <span>{row.name}</span>
          {row.type === 'department' && <ElTag size="small" type="primary">部门</ElTag>}
          {row.type === 'group' && <ElTag size="small" type="success">小组</ElTag>}
          {row.type === 'user' && <ElTag size="small">成员</ElTag>}
        </div>
      )
    }
  },
  {
    prop: 'role',
    label: '角色/职位',
    width: 150,
    render: (row) => row.role || '-'
  },
  {
    prop: 'level',
    label: '级别',
    width: 100,
    render: (row) => row.level || '-'
  },
  {
    prop: 'memberCount',
    label: '成员数',
    width: 100,
    render: (row) => row.memberCount ? \`\${row.memberCount}人\` : '-'
  }
]
${scriptEndTag}`
        }
    }

    const paginationCodeFiles = {
        template: {
            name: 'Template',
            lang: 'vue',
            code: `<template>
  <CrudTable
    :data="data"
    :columns="columns"
    :has-pagination="true"
    :total="total"
    :page="page"
    :page-size="pageSize"
    @update:page="handlePageChange"
    @update:page-size="handleSizeChange" />
</template>`
        },
        script: {
            name: 'Script',
            lang: 'typescript',
            code: `<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { CrudTable } from '@northal/crud-element-plus'
import type { CrudTableColumn } from '@northal/crud-element-plus'

const page = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 模拟分页数据
const data = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return Array.from({ length: pageSize.value }, (_, i) => ({
    id: start + i + 1,
    name: \`用户\${start + i + 1}\`,
    age: 20 + Math.floor(Math.random() * 20),
    email: \`user\${start + i + 1}@example.com\`,
    department: ['技术部', '产品部', '设计部'][Math.floor(Math.random() * 3)]
  }))
})

const columns: CrudTableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'email', label: '邮箱', minWidth: 200 },
  { prop: 'department', label: '部门', width: 120 }
]

const handlePageChange = (newPage: number) => {
  page.value = newPage
  ElMessage.info(\`切换到第 \${newPage} 页\`)
  // 这里可以调用 API 加载数据
}

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize
  page.value = 1
  ElMessage.info(\`每页显示 \${newSize} 条\`)
  // 这里可以调用 API 加载数据
}
${scriptEndTag}`
        }
    }
</script>

<style scoped>
    .crud-table-doc {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }

    .doc-header {
        text-align: center;
        margin-bottom: 40px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e4e7ed;
    }

    .doc-header h1 {
        font-size: 32px;
        color: #2c3e50;
        margin: 0 0 16px 0;
    }

    .doc-description {
        font-size: 16px;
        color: #666;
        line-height: 1.6;
        margin: 0;
    }

    .doc-section {
        margin-bottom: 60px;
    }

    .doc-section h2 {
        font-size: 24px;
        color: #2c3e50;
        margin: 0 0 8px 0;
        padding-bottom: 8px;
        border-bottom: 2px solid #409eff;
    }

    .doc-section h3 {
        font-size: 18px;
        color: #2c3e50;
        margin: 32px 0 16px 0;
        padding-bottom: 4px;
        border-bottom: 1px solid #e4e7ed;
    }

    .doc-section p {
        color: #666;
        line-height: 1.6;
        margin: 0 0 20px 0;
    }

    .demo-block {
        border: 1px solid #e4e7ed;
        border-radius: 6px;
        padding: 20px;
        margin: 20px 0;
        background: #fff;
    }

    .selection-info {
        margin-left: 16px;
        color: #666;
        font-size: 14px;
        display: flex;
        align-items: center;
    }

    .selection-demo {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .selection-controls {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .selection-count {
        color: #666;
        font-size: 14px;
    }

    .selection-result {
        background: #f8f9fa;
        padding: 16px;
        border-radius: 4px;
        border: 1px solid #e4e7ed;
    }

    .selection-result h4 {
        margin: 0 0 12px 0;
        color: #333;
    }

    .selection-result pre {
        margin: 0;
        font-size: 12px;
        color: #666;
        max-height: 200px;
        overflow: auto;
    }

    .empty-state {
        text-align: center;
        padding: 40px 0;
        color: #909399;
    }

    .empty-state p {
        margin: 16px 0 0 0;
        font-size: 14px;
    }

    /* API 表格样式 */
    .api-table {
        margin: 16px 0 32px 0;
        border: 1px solid #e4e7ed;
        border-radius: 6px;
        overflow: hidden;
    }

    .api-table table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
    }

    .api-table th,
    .api-table td {
        padding: 12px 16px;
        text-align: left;
        border-bottom: 1px solid #e4e7ed;
    }

    .api-table th {
        background: #f8f9fa;
        font-weight: 600;
        color: #2c3e50;
    }

    .api-table td:first-child {
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        color: #e83e8c;
        font-weight: 600;
    }

    .api-table td:nth-child(3) {
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        color: #007bff;
    }

    .api-table tr:last-child td {
        border-bottom: none;
    }

    .api-table tr:hover {
        background: #f8f9fa;
    }
</style>
