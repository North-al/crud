import { computed, defineComponent, ref } from 'vue'
import { ElPagination, ElTable, ElTableColumn } from 'element-plus'
import type { PropType } from 'vue'
import type { PaginationProps } from 'element-plus'
import type { CrudTableColumn } from '../types/table'
import '../styles/table.scss'

export default defineComponent({
    name: 'CrudTable',
    props: {
        data: {
            type: Array as PropType<any[]>,
            default: () => []
        },
        columns: {
            type: Array as PropType<CrudTableColumn[]>,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        },
        hasPagination: {
            type: Boolean,
            default: true
        },
        total: {
            type: Number,
            default: 0
        },
        page: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pagination: {
            type: Object as PropType<Partial<PaginationProps>>,
            default: () => ({})
        }
    },
    emits: {
        'update:page': (page: number) => typeof page === 'number',
        'update:pageSize': (pageSize: number) => typeof pageSize === 'number',
        'selection-change': (rows: any[]) => Array.isArray(rows),
        'current-change': (currentRow: any, oldCurrentRow: any) => true,
        'row-click': (row: any, column: any, event: Event) => true,
        'row-dblclick': (row: any, column: any, event: Event) => true,
        'sort-change': (sortInfo: { prop: string; order: string | null }) => true,
        'filter-change': (filters: Record<string, any[]>) => true
    },
    setup(props, { emit, slots, attrs, expose }) {
        const tableRef = ref()

        // 监听 props 变化
        const internalPage = computed({
            get: () => props.page,
            set: value => emit('update:page', value)
        })

        const internalPageSize = computed({
            get: () => props.pageSize,
            set: value => emit('update:pageSize', value)
        })

        // 分离表格属性和事件
        const tableAttrs = computed(() => {
            const {
                onSelectionChange,
                onCurrentChange,
                onRowClick,
                onRowDblclick,
                onSortChange,
                onFilterChange,
                ...rest
            } = attrs
            return rest
        })

        // 可见列
        const visibleColumns = computed(() => props.columns.filter(col => col.visible !== false))

        // 分页配置
        const paginationConfig = computed(() => {
            return {
                pageSizes: [10, 20, 50, 100],
                layout: 'total, sizes, prev, pager, next, jumper',
                background: true,
                ...props.pagination
            }
        })

        // 表格事件处理
        const handleSelectionChange = (selection: any[]) => {
            emit('selection-change', selection)
        }

        const handleCurrentChange = (currentRow: any, oldCurrentRow: any) => {
            emit('current-change', currentRow, oldCurrentRow)
        }

        const handleRowClick = (row: any, column: any, event: Event) => {
            emit('row-click', row, column, event)
        }

        const handleRowDblclick = (row: any, column: any, event: Event) => {
            emit('row-dblclick', row, column, event)
        }

        const handleSortChange = ({ prop, order }: { prop: string; order: string | null }) => {
            emit('sort-change', { prop, order })
        }

        const handleFilterChange = (filters: Record<string, any[]>) => {
            emit('filter-change', filters)
        }

        // 提取列属性
        const extractColumnProps = (col: CrudTableColumn) => {
            const { visible, render, slots, ...rest } = col
            return rest
        }

        // 渲染列内容 插槽 > render > slots.default
        const renderColumnContent = (col: CrudTableColumn) => {
            return ({ row, column, $index }: any) => {
                const slotName = col.prop

                // 优先使用插槽
                if (slotName && slots[slotName]) {
                    return slots[slotName]!({ row, column, index: $index, cellValue: row[col.prop!] })
                }

                // 使用 render 函数（优先级高于 slots.default）
                if (col.render) {
                    return col.render(row, column, row[col.prop!], $index)
                }

                // 使用列配置的 slots.default
                if (col.slots?.default) {
                    return col.slots.default({ row, column, $index, cellValue: row[col.prop!] })
                }

                // 默认显示
                return row[col.prop!]
            }
        }

        // 渲染列插槽
        const renderColumnSlots = (col: CrudTableColumn) => {
            const columnSlots: Record<string, any> = {}

            // 默认插槽
            columnSlots.default = renderColumnContent(col)

            // 其他插槽
            if (col.slots) {
                Object.keys(col.slots).forEach(slotName => {
                    if (slotName !== 'default' && col.slots![slotName as keyof typeof col.slots]) {
                        columnSlots[slotName] = col.slots![slotName as keyof typeof col.slots]
                    }
                })
            }

            return columnSlots
        }

        // 处理插槽传递
        const tableSlots = computed(() => {
            const result: Record<string, any> = {}

            // 默认插槽特殊处理
            result.default = () => [
                ...visibleColumns.value.map((col, index) => (
                    <ElTableColumn
                        key={col.prop || index}
                        {...extractColumnProps(col)}
                        v-slots={renderColumnSlots(col)}
                    />
                )),
                slots.default?.()
            ]

            // 动态传递其他所有插槽，保持作用域参数
            Object.keys(slots).forEach(slotName => {
                if (slotName !== 'default') {
                    result[slotName] = (slotProps: any) => slots[slotName]!(slotProps)
                }
            })

            return result
        })

        // 暴露表格实例方法
        const clearSelection = () => tableRef.value?.clearSelection()
        const getSelectionRows = () => tableRef.value?.getSelectionRows() || []
        const toggleRowSelection = (row: any, selected?: boolean) => tableRef.value?.toggleRowSelection(row, selected)
        const clearSort = () => tableRef.value?.clearSort()
        const clearFilter = (columnKeys?: string[]) => tableRef.value?.clearFilter(columnKeys)
        const doLayout = () => tableRef.value?.doLayout()

        expose({
            clearSelection,
            getSelectionRows,
            toggleRowSelection,
            clearSort,
            clearFilter,
            doLayout
        })

        return () => (
            <div class='north-crud-table'>
                {/* 表格主体 */}
                <ElTable
                    ref={tableRef}
                    v-loading={props.loading}
                    data={props.data}
                    border={false}
                    stripe={false}
                    rowKey='id'
                    style={{ width: '100%' }}
                    header-row-class-name='crud-header-row'
                    header-cell-class-name='crud-header-cell'
                    highlightCurrentRow
                    showOverflowTooltip
                    onSelection-change={handleSelectionChange}
                    onCurrent-change={handleCurrentChange}
                    onRow-click={handleRowClick}
                    onRow-dblclick={handleRowDblclick}
                    onSort-change={handleSortChange}
                    onFilter-change={handleFilterChange}
                    {...tableAttrs.value}
                    v-slots={{ ...tableSlots.value }}></ElTable>

                {/* 分页器 */}
                {paginationConfig.value && (
                    <div class='north-crud-pagination'>
                        <ElPagination
                            v-model:current-page={internalPage.value}
                            v-model:page-size={internalPageSize.value}
                            total={props.total}
                            // onCurrent-change={handlePageChange}
                            // onSize-change={handlePageSizeChange}
                            {...paginationConfig.value}
                        />
                    </div>
                )}
            </div>
        )
    }
})
