export const apiData = {
  props: [
    { name: 'fields', description: '表单字段配置', type: 'CrudFormField[]', default: '[]' },
    { name: 'model', description: '表单数据对象', type: 'Record<string, any>', default: '{}' },
    { name: 'labelWidth', description: '表单项标签宽度', type: 'string', default: '100px' },
    { name: 'inline', description: '是否行内表单', type: 'boolean', default: 'false' },
    { name: 'submitText', description: '提交按钮文本', type: 'string', default: '提交' },
    { name: 'cancelText', description: '取消按钮文本', type: 'string', default: '取消' },
    { name: 'showCancel', description: '是否显示取消按钮', type: 'boolean', default: 'true' },
    { name: 'loading', description: '提交按钮加载状态', type: 'boolean', default: 'false' },
    { name: 'disabled', description: '是否禁用整个表单', type: 'boolean', default: 'false' },
    { name: 'gutter', description: '栅格间隔', type: 'number', default: '20' },
    { name: 'colSpan', description: '默认列宽度', type: 'number', default: '24' }
  ],
  events: [
    { name: 'update:model', description: '表单数据更新时触发', params: '(model: Record<string, any>)' },
    { name: 'submit', description: '表单提交且验证通过时触发', params: '(model: Record<string, any>)' },
    { name: 'cancel', description: '点击取消按钮时触发', params: '()' },
    { name: 'validate', description: '表单验证失败时触发', params: '(error: any)' }
  ],
  methods: [
    { name: 'validate', description: '验证表单', params: '() => Promise<boolean>' },
    { name: 'resetFields', description: '重置表单', params: '() => void' },
    { name: 'getFormRef', description: '获取表单实例', params: '() => FormInstance' },
    { name: 'getModel', description: '获取表单数据', params: '() => Record<string, any>' }
  ],
  slots: [
    { name: '[field]', description: '自定义表单项内容', params: '{ model, field }' },
    { name: 'footer', description: '自定义表单底部按钮区域', params: '{ model, submit, cancel }' }
  ],
  fields: [
    { name: 'field', description: '字段名', type: 'string', default: '-' },
    { name: 'label', description: '标签文本', type: 'string', default: '-' },
    { name: 'type', description: '表单项类型', type: 'string', default: '-' },
    { name: 'defaultValue', description: '默认值', type: 'any', default: '-' },
    { name: 'placeholder', description: '占位文本', type: 'string', default: '-' },
    { name: 'rules', description: '验证规则', type: 'FormItemRule | FormItemRule[]', default: '-' },
    { name: 'options', description: '选项配置（用于select/radio/checkbox）', type: '{ label: string; value: any }[]', default: '-' },
    { name: 'props', description: '传递给表单控件的属性', type: 'Record<string, any>', default: '-' },
    { name: 'span', description: '栅格宽度', type: 'number', default: '24' },
    { name: 'disabled', description: '是否禁用', type: 'boolean | ((model) => boolean)', default: 'false' },
    { name: 'hidden', description: '是否隐藏', type: 'boolean | ((model) => boolean)', default: 'false' },
    { name: 'render', description: '自定义渲染函数', type: '(model) => VNode', default: '-' }
  ]
};