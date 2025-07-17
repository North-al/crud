<script setup lang="tsx">
    import { ref, reactive, computed } from 'vue'
    import { ElMessage, ElMessageBox, ElTag, ElButton, ElSwitch } from 'element-plus'
    import { CrudTable } from '@northal/crud-element-plus'
    import type { CrudTableColumn } from '@northal/crud-element-plus'
    import '@northal/crud-element-plus/index.css'

    // 模拟用户数据
    interface User {
        id: number
        name: string
        age: number
        email: string
        status: 'active' | 'inactive'
        role: string
        createTime: string
        avatar?: string
        department: string
        salary: number
        skills: string[]
        description: string
        children?: User[]
        parentId?: number
    }

    const tableData = ref<User[]>([
        {
            id: 1,
            name: '张三',
            age: 25,
            email: 'zhangsan@example.com',
            status: 'active',
            role: '管理员',
            createTime: '2024-01-15',
            department: '技术部',
            salary: 15000,
            skills: ['Vue', 'React', 'Node.js'],
            description: '资深前端开发工程师，负责前端架构设计和团队管理。'
        },
        {
            id: 2,
            name: '李四',
            age: 30,
            email: 'lisi@example.com',
            status: 'inactive',
            role: '用户',
            createTime: '2024-01-16',
            department: '产品部',
            salary: 12000,
            skills: ['Python', 'Django', 'MySQL'],
            description: '后端开发工程师，专注于API开发和数据库优化。'
        },
        {
            id: 3,
            name: '王五',
            age: 28,
            email: 'wangwu@example.com',
            status: 'active',
            role: '编辑',
            createTime: '2024-01-17',
            department: '设计部',
            salary: 10000,
            skills: ['Photoshop', 'Figma', 'Sketch'],
            description: 'UI/UX设计师，负责产品界面设计和用户体验优化。'
        },
        {
            id: 4,
            name: '赵六',
            age: 32,
            email: 'zhaoliu@example.com',
            status: 'active',
            role: '管理员',
            createTime: '2024-01-18',
            department: '技术部',
            salary: 18000,
            skills: ['Java', 'Spring', 'Docker'],
            description: '后端架构师，负责系统架构设计和技术选型。'
        },
        {
            id: 5,
            name: '孙七',
            age: 26,
            email: 'sunqi@example.com',
            status: 'inactive',
            role: '用户',
            createTime: '2024-01-19',
            department: '市场部',
            salary: 8000,
            skills: ['市场营销', '数据分析', 'PPT'],
            description: '市场专员，负责市场调研和营销活动策划。'
        },
        {
            id: 6,
            name: '李八',
            age: 29,
            email: 'liba@example.com',
            status: 'active',
            role: '编辑',
            createTime: '2024-01-20',
            department: '技术部',
            salary: 13000,
            skills: ['Vue', 'TypeScript', 'Webpack'],
            description: '前端开发工程师，负责前端功能开发和维护。'
        },
        {
            id: 7,
            name: '周九',
            age: 24,
            email: 'zhoujiu@example.com',
            status: 'active',
            role: '用户',
            createTime: '2024-01-21',
            department: '设计部',
            salary: 9000,
            skills: ['UI设计', 'Sketch', 'Principle'],
            description: '初级UI设计师，负责界面设计和交互原型。'
        },
        {
            id: 8,
            name: '吴十',
            age: 35,
            email: 'wushi@example.com',
            status: 'active',
            role: '管理员',
            createTime: '2024-01-22',
            department: '产品部',
            salary: 25000,
            skills: ['产品设计', '数据分析', '项目管理'],
            description: '产品总监，负责产品规划和团队管理。'
        }
    ])

    // 分页数据
    const pagination = reactive({
        page: 1,
        pageSize: 5,
        total: 50
    })

    const loading = ref(false)
    const selectedRows = ref<User[]>([])

    // 过滤选项
    const statusOptions = [
        { text: '激活', value: 'active' },
        { text: '禁用', value: 'inactive' }
    ]

    const roleOptions = [
        { text: '管理员', value: '管理员' },
        { text: '编辑', value: '编辑' },
        { text: '用户', value: '用户' }
    ]

    const departmentOptions = [
        { text: '技术部', value: '技术部' },
        { text: '产品部', value: '产品部' },
        { text: '设计部', value: '设计部' },
        { text: '市场部', value: '市场部' }
    ]

    // 树形数据
    const treeData = ref<User[]>([
        {
            id: 1,
            name: '技术部',
            role: '部门',
            email: 'tech@example.com',
            status: 'active',
            department: '技术部',
            salary: 0,
            age: 0,
            createTime: '2024-01-01',
            skills: [],
            description: '技术部门',
            children: [
                {
                    id: 11,
                    name: '张三',
                    role: '前端组长',
                    email: 'zhangsan@example.com',
                    status: 'active',
                    department: '技术部',
                    salary: 15000,
                    age: 25,
                    createTime: '2024-01-15',
                    skills: ['Vue', 'React'],
                    description: '前端开发'
                },
                {
                    id: 12,
                    name: '李四',
                    role: '后端工程师',
                    email: 'lisi@example.com',
                    status: 'active',
                    department: '技术部',
                    salary: 12000,
                    age: 28,
                    createTime: '2024-01-16',
                    skills: ['Java', 'Spring'],
                    description: '后端开发'
                }
            ]
        },
        {
            id: 2,
            name: '产品部',
            role: '部门',
            email: 'product@example.com',
            status: 'active',
            department: '产品部',
            salary: 0,
            age: 0,
            createTime: '2024-01-01',
            skills: [],
            description: '产品部门',
            children: [
                {
                    id: 21,
                    name: '王五',
                    role: '产品经理',
                    email: 'wangwu@example.com',
                    status: 'active',
                    department: '产品部',
                    salary: 18000,
                    age: 30,
                    createTime: '2024-01-17',
                    skills: ['产品设计', '需求分析'],
                    description: '产品设计'
                }
            ]
        }
    ])

    // 固定表头列配置
    const fixedColumns: CrudTableColumn[] = [
        { type: 'selection', fixed: 'left' },
        {
            type: 'expand',
            width: 50,
            fixed: 'left',
            render: (row: any) => (
                    <div style='padding: 20px; background: #f8f9fa'>
                        <h4 style='margin: 0 0 12px 0; color: #333'>{row.name} 的详细信息</h4>
                        <div style='display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px'>
                            <div>
                                <p><strong>技能:</strong></p>
                                <div style='display: flex; gap: 8px; flex-wrap: wrap'>
                                    {row.skills.map((skill: string) => (
                                        <ElTag key={skill} size='small'>
                                            {skill}
                                        </ElTag>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p><strong>描述:</strong></p>
                                <p style='color: #666; line-height: 1.5'>{row.description}</p>
                            </div>
                        </div>
                    </div>
                )
        },
        {
            type: 'index',
            label: '序号',
            width: 80,
            fixed: 'left'
        },
        { prop: 'name', label: '姓名', width: 120, sortable: true, fixed: 'left' },
        { prop: 'age', label: '年龄', width: 80, sortable: true },
        { prop: 'email', label: '邮箱', width: 250, showOverflowTooltip: true },
        {
            prop: 'status',
            label: '状态',
            width: 100,
            filters: statusOptions,
            filterMethod: (value: string, row: User) => row.status === value,
            render: row => (
                <ElTag type={row.status === 'active' ? 'success' : 'danger'}>
                    {row.status === 'active' ? '激活' : '禁用'}
                </ElTag>
            )
        },
        {
            prop: 'role',
            label: '角色',
            width: 120,
            filters: roleOptions,
            filterMethod: (value: string, row: User) => row.role === value
        },
        {
            prop: 'department',
            label: '部门',
            width: 120,
            filters: departmentOptions,
            filterMethod: (value: string, row: User) => row.department === value
        },
        {
            prop: 'salary',
            label: '薪资',
            width: 120,
            sortable: true,
            render: row => `¥${row.salary.toLocaleString()}`
        },
        { prop: 'createTime', label: '创建时间', width: 120, sortable: true },
        { prop: 'description', label: '描述', width: 200, showOverflowTooltip: true },
        {
            prop: 'actions',
            label: '操作',
            width: 200,
            fixed: 'right',
            render: row => (
                <div style='display: flex; gap: 8px;'>
                    <ElButton size='small' type='primary' onClick={() => handleEdit(row)}>
                        编辑
                    </ElButton>
                    <ElButton size='small' type='danger' onClick={() => handleDelete(row)}>
                        删除
                    </ElButton>
                </div>
            )
        }
    ]

    // 树形表格列配置
    const treeColumns: CrudTableColumn[] = [
        { type: 'selection' },
        { prop: 'name', label: '名称', width: 200 },
        { prop: 'role', label: '角色/职位', width: 150 },
        { prop: 'email', label: '邮箱', width: 200 },
        {
            prop: 'status',
            label: '状态',
            width: 100,
            render: row => (
                <ElTag type={row.status === 'active' ? 'success' : 'danger'}>
                    {row.status === 'active' ? '激活' : '禁用'}
                </ElTag>
            )
        },
        {
            prop: 'salary',
            label: '薪资',
            width: 120,
            render: row => (row.salary > 0 ? `¥${row.salary.toLocaleString()}` : '-')
        }
    ]

    const filterColumns: CrudTableColumn[] = [
        { type: 'selection' },
        { prop: 'name', label: '姓名', width: 120, sortable: 'custom' },
        { prop: 'age', label: '年龄', width: 80, sortable: true },
        {
            prop: 'status',
            label: '状态',
            width: 100,
            filters: statusOptions,
            filterMethod: (value: string, row: User) => row.status === value,
            filterMultiple: false,
            render: row => (
                <ElTag type={row.status === 'active' ? 'success' : 'danger'}>
                    {row.status === 'active' ? '激活' : '禁用'}
                </ElTag>
            )
        },
        {
            prop: 'role',
            label: '角色',
            width: 120,
            filters: roleOptions,
            filterMethod: (value: string, row: User) => row.role === value
        },
        {
            prop: 'department',
            label: '部门',
            width: 120,
            filters: departmentOptions,
            filterMethod: (value: string, row: User) => row.department === value
        },
        {
            prop: 'salary',
            label: '薪资',
            width: 120,
            sortable: true,
            render: row => `¥${row.salary.toLocaleString()}`
        }
    ]

    // 合并行列配置
    const mergeColumns: CrudTableColumn[] = [
        { prop: 'department', label: '部门', width: 120 },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'role', label: '角色', width: 120 },
        {
            prop: 'salary',
            label: '薪资',
            width: 120,
            render: row => `¥${row.salary.toLocaleString()}`
        },
        { prop: 'createTime', label: '创建时间', width: 120 }
    ]

    // 合计行数据
    const summaryData = computed(() => {
        const totalSalary = tableData.value.reduce((sum, item) => sum + item.salary, 0)
        const avgAge = Math.round(tableData.value.reduce((sum, item) => sum + item.age, 0) / tableData.value.length)

        return {
            totalSalary,
            avgAge,
            totalCount: tableData.value.length
        }
    })

    // 合并行列方法
    const spanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
        if (columnIndex === 0) {
            // 按部门合并第一列
            const department = row.department
            const data = tableData.value.slice(0, 6)
            const firstIndex = data.findIndex(item => item.department === department)
            const count = data.filter(item => item.department === department).length

            if (rowIndex === firstIndex) {
                return {
                    rowspan: count,
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

    // 合计行方法
    const getSummaries = (param: any) => {
        const { columns, data } = param
        const sums: string[] = []
        columns.forEach((column: any, index: number) => {
            if (index === 0) {
                sums[index] = '合计'
                return
            }

            if (column.property === 'salary') {
                const total = data.reduce((sum: number, item: User) => sum + item.salary, 0)
                sums[index] = `¥${total.toLocaleString()}`
            } else if (column.property === 'age') {
                const avg = Math.round(data.reduce((sum: number, item: User) => sum + item.age, 0) / data.length)
                sums[index] = `平均: ${avg}岁`
            } else {
                sums[index] = ''
            }
        })

        return sums
    }

    // 事件处理函数
    const handleSelectionChange = (selection: User[]) => {
        selectedRows.value = selection
        console.log('选中的行:', selection)
    }

    const handleRowClick = (row: User) => {
        console.log('点击行:', row)
        ElMessage.info(`点击了: ${row.name}`)
    }

    const handleEdit = (row: User) => {
        ElMessage.success(`编辑: ${row.name}`)
    }

    const handleDelete = async (row: User) => {
        try {
            await ElMessageBox.confirm(`确定要删除 ${row.name} 吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })

            const index = tableData.value.findIndex(item => item.id === row.id)
            if (index > -1) {
                tableData.value.splice(index, 1)
                ElMessage.success('删除成功')
            }
        } catch {
            ElMessage.info('已取消删除')
        }
    }

    const handleSortChange = ({ prop, order }: { prop: string; order: string | null }) => {
        console.log('排序变化:', { prop, order })
        ElMessage.info(`按 ${prop} ${order === 'ascending' ? '升序' : order === 'descending' ? '降序' : '取消'} 排序`)
    }

    const handleFilterChange = (filters: Record<string, any[]>) => {
        console.log('过滤变化:', filters)
        ElMessage.info(`应用过滤条件: ${JSON.stringify(filters)}`)
    }

    const handleExpandChange = (row: User, expandedRows: User[]) => {
        console.log('展开变化:', row, expandedRows)
    }

    // 表格引用
    const tableRef = ref()
    const fixedTableRef = ref()
    const treeTableRef = ref()

    // 清除所有过滤器
    const clearAllFilters = () => {
        tableRef.value?.clearFilter()
        fixedTableRef.value?.clearFilter()
        treeTableRef.value?.clearFilter()
        ElMessage.success('已清除所有过滤器')
    }
</script>

<template>
    <div style="padding: 20px">
        <h1>CrudTable 高级功能演示</h1>

        <!-- 操作栏 -->
        <div style="margin-bottom: 16px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap">
            <ElButton @click="clearAllFilters"> 清除所有过滤器 </ElButton>

            <div style="margin-left: auto; color: #666">已选择: {{ selectedRows.length }} 条数据</div>
        </div>

        <!-- 固定表头和列 -->
        <div style="margin-bottom: 32px">
            <h2>固定表头和列（左右固定）</h2>
            <div style="height: 400px">
                <CrudTable
                    ref="fixedTableRef"
                    :data="tableData"
                    :columns="fixedColumns"
                    height="350"
                    @selection-change="handleSelectionChange"
                    @row-click="handleRowClick"
                    @sort-change="handleSortChange"
                    @filter-change="handleFilterChange"
                    @expand-change="handleExpandChange">
                </CrudTable>
            </div>
        </div>

        <!-- 树形表格 -->
        <div style="margin-bottom: 32px">
            <h2>树形表格</h2>
            <CrudTable
                ref="treeTableRef"
                :data="treeData"
                :columns="treeColumns"
                row-key="id"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                @selection-change="handleSelectionChange"
                @row-click="handleRowClick" />
        </div>

        <!-- 合并行列表格 -->
        <div style="margin-bottom: 32px">
            <h2>合并行列表格</h2>
            <CrudTable
                :data="tableData.slice(0, 6)"
                :columns="mergeColumns"
                :span-method="spanMethod"
                border
                @selection-change="handleSelectionChange"
                @row-click="handleRowClick" />
        </div>

        <!-- 带合计行的表格 -->
        <div style="margin-bottom: 32px">
            <h2>带合计行的表格</h2>
            <CrudTable
                :data="tableData"
                :columns="[
                    { prop: 'name', label: '姓名', width: 120 },
                    { prop: 'age', label: '年龄', width: 80 },
                    { prop: 'department', label: '部门', width: 120 },
                    {
                        prop: 'salary',
                        label: '薪资',
                        width: 120,
                        render: row => `¥${row.salary.toLocaleString()}`
                    },
                    { prop: 'createTime', label: '创建时间', width: 120 }
                ]"
                show-summary
                :summary-method="getSummaries"
                border />
        </div>

        <!-- 筛选功能演示 -->
        <div style="margin-bottom: 32px">
            <h2>高级筛选功能</h2>
            <CrudTable
                ref="tableRef"
                :data="tableData"
                :columns="filterColumns"
                @selection-change="handleSelectionChange"
                @sort-change="handleSortChange"
                @filter-change="handleFilterChange" />
        </div>

        <!-- 调试信息 -->
        <div style="margin-top: 32px; padding: 16px; background: #f5f5f5; border-radius: 4px">
            <h3>统计信息</h3>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px">
                <div>
                    <p><strong>总人数:</strong> {{ summaryData.totalCount }}</p>
                </div>
                <div>
                    <p><strong>总薪资:</strong> ¥{{ summaryData.totalSalary.toLocaleString() }}</p>
                </div>
                <div>
                    <p><strong>平均年龄:</strong> {{ summaryData.avgAge }}岁</p>
                </div>
                <div>
                    <p><strong>选中人数:</strong> {{ selectedRows.length }}</p>
                </div>
            </div>

            <details style="margin-top: 12px">
                <summary>选中的数据</summary>
                <pre style="margin-top: 8px; font-size: 12px; max-height: 200px; overflow-y: auto">{{
                    JSON.stringify(selectedRows, null, 2)
                }}</pre>
            </details>
        </div>
    </div>
</template>

<style scoped>
    h1,
    h2,
    h3 {
        color: #333;
        margin-bottom: 16px;
    }

    h2 {
        font-size: 18px;
        border-bottom: 1px solid #eee;
        padding-bottom: 8px;
    }

    .el-button + .el-button {
        margin-left: 0;
    }

    :deep(.el-table .el-table__expand-icon) {
        color: #409eff;
    }

    :deep(.el-table__expanded-cell) {
        padding: 0;
    }

    :deep(.el-table .el-table__cell) {
        padding: 8px 0;
    }
</style>
