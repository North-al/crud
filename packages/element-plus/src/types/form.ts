import type { FormItemRule } from 'element-plus'

export interface CrudFormField {
  field: string
  label: string
  type: 'input' | 'textarea' | 'select' | 'date' | 'datetime' | 'switch' | 'radio' | 'checkbox' | 'number' | 'custom'
  defaultValue?: any
  placeholder?: string
  rules?: FormItemRule | FormItemRule[]
  options?: { label: string; value: any }[]
  props?: Record<string, any>
  span?: number
  disabled?: boolean | ((model: Record<string, any>) => boolean)
  hidden?: boolean | ((model: Record<string, any>) => boolean)
  render?: (model: Record<string, any>) => any
}

export interface CrudFormProps {
  fields: CrudFormField[]
  model?: Record<string, any>
  labelWidth?: string
  inline?: boolean
  submitText?: string
  cancelText?: string
  showCancel?: boolean
  loading?: boolean
  disabled?: boolean
  gutter?: number
  colSpan?: number
}

export interface CrudFormExpose {
  validate: () => Promise<boolean>
  resetFields: () => void
  getFormRef: () => any
  getModel: () => Record<string, any>
}

export interface CrudFormEmits {
  'update:model': [model: Record<string, any>]
  'submit': [model: Record<string, any>]
  'cancel': []
  'validate': [error: any]
}