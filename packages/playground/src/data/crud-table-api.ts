// API 文档数据
export const apiData = {
    props: [
        { name: 'data', description: '显示的数据', type: 'Array', default: '[]' },
        { name: 'columns', description: '表格列的配置描述', type: 'CrudTableColumn[]', default: '[]' },
        { name: 'loading', description: '是否显示加载中', type: 'boolean', default: 'false' },
        { name: 'hasPagination', description: '是否显示分页组件', type: 'boolean', default: 'true' },
        { name: 'total', description: '总条目数', type: 'number', default: '0' },
        { name: 'page', description: '当前页码', type: 'number', default: '1' },
        { name: 'pageSize', description: '每页条数', type: 'number', default: '10' },
        { name: 'pagination', description: '分页配置项', type: 'Partial<PaginationProps>', default: '{}' },
        { name: 'toolbar', description: '工具栏配置', type: 'CrudTableToolbar', default: '{}' }
    ],
    
    events: [
        { name: 'update:page', description: '页码改变时触发', params: '(page: number)' },
        { name: 'update:pageSize', description: '每页条数改变时触发', params: '(pageSize: number)' },
        { name: 'selection-change', description: '选中项发生变化时触发', params: '(selection: array)' },
        { name: 'current-change', description: '当前行变化时触发', params: '(currentRow, oldCurrentRow)' },
        { name: 'row-click', description: '行点击时触发', params: '(row, column, event)' },
        { name: 'row-dblclick', description: '行双击时触发', params: '(row, column, event)' },
        { name: 'sort-change', description: '排序条件发生变化时触发', params: '({ column, prop, order })' },
        { name: 'filter-change', description: '筛选条件发生变化时触发', params: '(filters)' }
    ],
    
    methods: [
        { name: 'clearSelection', description: '清空多选项', params: '()' },
        { name: 'getSelectionRows', description: '获取选中的行', params: '()' },
        { name: 'toggleRowSelection', description: '切换行的选中状态', params: '(row, selected)' },
        { name: 'clearSort', description: '清空排序', params: '()' },
        { name: 'clearFilter', description: '清空过滤条件', params: '(columnKeys)' },
        { name: 'doLayout', description: '重新布局表格', params: '()' }
    ],
    
    slots: [
        { name: '(prop名)', description: '自定义列的内容', params: '{ row, column, $index, cellValue }' },
        { name: 'empty', description: '自定义空数据时的显示内容', params: '-' },
        { name: 'toolbar-left', description: '自定义工具栏左侧内容', params: '{ selection }' },
        { name: 'toolbar-right', description: '自定义工具栏右侧内容', params: '{ selection }' },
        { name: 'expand', description: '展开行的内容', params: '{ row, column, $index }' }
    ],
    
    columns: [
        { name: 'prop', description: '对应列内容的字段名', type: 'string', default: '-' },
        { name: 'label', description: '显示的标题', type: 'string', default: '-' },
        { name: 'width', description: '对应列的宽度', type: 'string/number', default: '-' },
        { name: 'visible', description: '是否显示该列', type: 'boolean', default: 'true' },
        { name: 'render', description: '自定义渲染函数', type: 'function(row, column, cellValue, index)', default: '-' },
        { name: 'slots', description: '自定义插槽', type: 'object { default, header, filter-icon, expand }', default: '-' },
        { name: '...', description: '其他 element-plus 表格列原生属性', type: '-', default: '-' }
    ],
    
    toolbar: [
        { name: 'show', description: '是否显示工具栏', type: 'boolean', default: 'false' },
        { name: 'left', description: '左侧工具栏配置', type: 'object', default: '{}' },
        { name: 'left.title', description: '左侧标题', type: 'string | VNode', default: '-' },
        { name: 'left.actions', description: '左侧操作按钮列表', type: 'CrudTableAction[]', default: '[]' },
        { name: 'right', description: '右侧工具栏配置', type: 'object', default: '{}' },
        { name: 'right.actions', description: '右侧操作按钮列表', type: 'CrudTableAction[]', default: '[]' },
        { name: 'right.settings', description: '右侧设置项', type: 'object', default: '{}' },
        { name: 'right.settings.columns', description: '是否显示列设置', type: 'boolean', default: 'false' },
        { name: 'right.settings.density', description: '是否显示密度设置', type: 'boolean', default: 'false' },
        { name: 'right.settings.fullscreen', description: '是否显示全屏设置', type: 'boolean', default: 'false' },
        { name: 'right.settings.refresh', description: '是否显示刷新按钮', type: 'boolean', default: 'false' }
    ]
};