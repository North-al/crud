import type { TableProps, TableColumnCtx, PaginationProps } from 'element-plus'
import type { VNode, Component } from 'vue'

export interface CrudTableColumn extends Partial<TableColumnCtx<any>> {
    visible?: boolean
    render?: (
        row: any,
        column: TableColumnCtx<any>,
        cellValue: any,
        index: number
    ) => VNode | VNode[] | Component | Component[] | string | number
    slots?: {
        default?: (scope: any) => any
        header?: (scope: any) => any
        'filter-icon'?: (scope: any) => any
        expand?: (scope: any) => any
    }
}

export interface CrudTableToolbar {
    // 工具栏配置
    show?: boolean
    title?: string
    // 左侧内容
    left?: {
        title?: string | VNode
        actions?: CrudTableAction[]
    }
    // 右侧内容  
    right?: {
        actions?: CrudTableAction[]
        settings?: {
            columns?: boolean // 列设置
            density?: boolean // 密度设置
            fullscreen?: boolean // 全屏
            refresh?: boolean // 刷新
        }
    }
}

export interface CrudTableAction {
    key?: string
    label?: string
    icon?: string | Component
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
    size?: 'large' | 'default' | 'small'
    disabled?: boolean | ((selection: any[]) => boolean)
    visible?: boolean | ((selection: any[]) => boolean)
    onClick?: (selection: any[]) => void
    render?: (selection: any[]) => VNode | string
}

// 精确的事件定义
export interface CrudTableEmits<T extends any = any> {
    // v-model 事件
    'update:page': [page: number]
    'update:pageSize': [pageSize: number]

    // 分页事件
    'page-change': [page: number, pageSize: number]

    // 选择事件 - 只保留最常用的
    'selection-change': [rows: T[]]
    'current-change': [currentRow: T | null, oldCurrentRow: T | null]

    // 行操作事件
    'row-click': [row: T, column: TableColumnCtx, event: Event]
    'row-dblclick': [row: T, column: TableColumnCtx, event: Event]

    // 排序和过滤
    'sort-change': [{ prop: string; order: 'asc' | 'desc' | null }]
    'filter-change': [{ [key: string]: any[] }]
}

