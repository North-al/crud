import { defineComponent, ref, computed, watch } from 'vue'
import { ElForm, ElFormItem, ElButton, ElInput, ElSelect, ElOption, ElDatePicker, ElSwitch, ElRadio, ElRadioGroup, ElCheckbox, ElCheckboxGroup, ElInputNumber, ElRow, ElCol } from 'element-plus'
import type { PropType } from 'vue'
import type { FormItemRule, FormInstance } from 'element-plus'

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

export default defineComponent({
  name: 'CrudForm',
  props: {
    fields: {
      type: Array as PropType<CrudFormField[]>,
      required: true
    },
    model: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    inline: {
      type: Boolean,
      default: false
    },
    submitText: {
      type: String,
      default: '提交'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    gutter: {
      type: Number,
      default: 20
    },
    colSpan: {
      type: Number,
      default: 24
    }
  },
  emits: ['update:model', 'submit', 'cancel', 'validate'],
  setup(props, { emit, slots, expose }) {
    const formRef = ref<FormInstance>()
    const formModel = ref<Record<string, any>>({})

    // 初始化表单数据
    const initFormModel = () => {
      const model: Record<string, any> = { ...props.model } // 先复制现有的model
      
      // 为未定义的字段设置默认值
      props.fields.forEach(field => {
        if (!(field.field in model)) {
          if ('defaultValue' in field) {
            model[field.field] = field.defaultValue
          } else {
            // 根据类型设置默认值
            switch (field.type) {
              case 'input':
              case 'textarea':
                model[field.field] = ''
                break
              case 'select':
                model[field.field] = undefined
                break
              case 'date':
              case 'datetime':
                model[field.field] = null
                break
              case 'switch':
                model[field.field] = false
                break
              case 'radio':
                model[field.field] = ''
                break
              case 'checkbox':
                model[field.field] = []
                break
              case 'number':
                model[field.field] = 0
                break
              default:
                model[field.field] = null
            }
          }
        }
      })
      
      // 一次性设置整个对象，避免多次触发响应式更新
      formModel.value = model
      
      // 不在初始化时触发更新，避免循环更新
      // emit('update:model', { ...model })
    }

    // 使用标志来防止循环更新
    let isUpdatingFromParent = false
    let isUpdatingFromChild = false
    
    // 监听父组件传入的model变化
    watch(
      () => props.model,
      (newVal) => {
        // 如果是子组件触发的更新，则跳过
        if (isUpdatingFromChild) return
        
        isUpdatingFromParent = true
        
        // 更新表单模型
        Object.keys(newVal).forEach(key => {
          if (formModel.value[key] !== newVal[key]) {
            formModel.value[key] = newVal[key]
          }
        })
        
        isUpdatingFromParent = false
      },
      { deep: true }
    )

    // 初始化表单
    initFormModel()

    // 表单验证规则
    const formRules = computed(() => {
      const rules: Record<string, FormItemRule[]> = {}
      props.fields.forEach(field => {
        if (field.rules) {
          rules[field.field] = Array.isArray(field.rules) ? field.rules : [field.rules]
        }
      })
      return rules
    })

    // 判断字段是否隐藏
    const isFieldHidden = (field: CrudFormField) => {
      if (typeof field.hidden === 'function') {
        return field.hidden(formModel.value)
      }
      return field.hidden === true
    }

    // 判断字段是否禁用
    const isFieldDisabled = (field: CrudFormField) => {
      if (props.disabled) return true
      
      if (typeof field.disabled === 'function') {
        return field.disabled(formModel.value)
      }
      return field.disabled === true
    }

    // 渲染表单项
    const renderFormItem = (field: CrudFormField) => {
      if (isFieldHidden(field)) return null

      // 获取字段插槽
      const fieldSlot = slots[field.field]
      if (fieldSlot) {
        return (
          <ElFormItem 
            label={field.label} 
            prop={field.field}
            rules={field.rules}
          >
            {fieldSlot({ model: formModel.value, field })}
          </ElFormItem>
        )
      }

      // 根据字段类型渲染不同的表单控件
      let formItemContent
      const disabled = isFieldDisabled(field)

      // 创建更新函数，避免直接使用v-model
      const updateFieldValue = (value: any) => {
        // 如果是父组件触发的更新，则跳过
        if (isUpdatingFromParent) return
        
        isUpdatingFromChild = true
        
        // 更新表单模型
        formModel.value[field.field] = value
        
        // 向上同步单个字段的变化
        emit('update:model', { ...formModel.value })
        
        isUpdatingFromChild = false
      }
      
      switch (field.type) {
        case 'input':
          formItemContent = (
            <ElInput
              modelValue={formModel.value[field.field]}
              onUpdate:modelValue={updateFieldValue}
              placeholder={field.placeholder}
              disabled={disabled}
              {...field.props}
            />
          )
          break
        case 'textarea':
          formItemContent = (
            <ElInput
              modelValue={formModel.value[field.field]}
              onUpdate:modelValue={updateFieldValue}
              type="textarea"
              rows={3}
              placeholder={field.placeholder}
              disabled={disabled}
              {...field.props}
            />
          )
          break
        case 'select':
          formItemContent = (
            <ElSelect
              modelValue={formModel.value[field.field]}
              onUpdate:modelValue={updateFieldValue}
              placeholder={field.placeholder}
              disabled={disabled}
              style="width: 100%"
              {...field.props}
            >
              {field.options?.map(option => (
                <ElOption
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </ElSelect>
          )
          break
        case 'date':
          formItemContent = (
            <ElDatePicker
              modelValue={formModel.value[field.field]}
              onUpdate:modelValue={updateFieldValue}
              type="date"
              placeholder={field.placeholder}
              disabled={disabled}
              style="width: 100%"
              {...field.props}
            />
          )
          break
        case 'datetime':
          formItemContent = (
            <ElDatePicker
              modelValue={formModel.value[field.field]}
              onUpdate:modelValue={updateFieldValue}
              type="datetime"
              placeholder={field.placeholder}
              disabled={disabled}
              style="width: 100%"
              {...field.props}
            />
          )
          break
        case 'switch':
          formItemContent = (
            <ElSwitch
              modelValue={formModel.value[field.field]}
              onUpdate:modelValue={updateFieldValue}
              disabled={disabled}
              {...field.props}
            />
          )
          break
        case 'radio':
          formItemContent = (
            <ElRadioGroup
              modelValue={formModel.value[field.field]}
              onUpdate:modelValue={updateFieldValue}
              disabled={disabled}
              {...field.props}
            >
              {field.options?.map(option => (
                <ElRadio
                  key={option.value}
                  label={option.value}
                >
                  {option.label}
                </ElRadio>
              ))}
            </ElRadioGroup>
          )
          break
        case 'checkbox':
          formItemContent = (
            <ElCheckboxGroup
              modelValue={formModel.value[field.field]}
              onUpdate:modelValue={updateFieldValue}
              disabled={disabled}
              {...field.props}
            >
              {field.options?.map(option => (
                <ElCheckbox
                  key={option.value}
                  label={option.value}
                >
                  {option.label}
                </ElCheckbox>
              ))}
            </ElCheckboxGroup>
          )
          break
        case 'number':
          formItemContent = (
            <ElInputNumber
              modelValue={formModel.value[field.field]}
              onUpdate:modelValue={updateFieldValue}
              placeholder={field.placeholder}
              disabled={disabled}
              style="width: 100%"
              {...field.props}
            />
          )
          break
        case 'custom':
          if (field.render) {
            formItemContent = field.render(formModel.value)
          }
          break
        default:
          formItemContent = (
            <ElInput
              modelValue={formModel.value[field.field]}
              onUpdate:modelValue={updateFieldValue}
              placeholder={field.placeholder}
              disabled={disabled}
              {...field.props}
            />
          )
      }

      return (
        <ElFormItem 
          label={field.label} 
          prop={field.field}
        >
          {formItemContent}
        </ElFormItem>
      )
    }

    // 提交表单
    const submitForm = async () => {
      if (!formRef.value) return
      
      try {
        await formRef.value.validate()
        emit('submit', { ...formModel.value })
      } catch (error) {
        emit('validate', error)
        console.error('表单验证失败:', error)
      }
    }

    // 重置表单
    const resetForm = () => {
      if (formRef.value) {
        formRef.value.resetFields()
      }
      initFormModel()
    }

    // 取消操作
    const handleCancel = () => {
      emit('cancel')
    }

    // 暴露方法给父组件
    expose({
      validate: async () => {
        if (!formRef.value) return false
        return formRef.value.validate()
      },
      resetFields: resetForm,
      getFormRef: () => formRef.value,
      getModel: () => ({ ...formModel.value })
    })

    return () => (
      <ElForm
        ref={formRef}
        model={formModel.value}
        rules={formRules.value}
        labelWidth={props.labelWidth}
        inline={props.inline}
        disabled={props.disabled}
      >
        <ElRow gutter={props.gutter}>
          {props.fields.map(field => {
            if (isFieldHidden(field)) return null
            
            const span = field.span || props.colSpan
            
            return (
              <ElCol span={span} key={field.field}>
                {renderFormItem(field)}
              </ElCol>
            )
          })}
        </ElRow>

        {/* 表单按钮 */}
        {(slots.footer || props.submitText || props.showCancel) && (
          <ElFormItem>
            {slots.footer ? (
              slots.footer({ model: formModel.value, submit: submitForm, cancel: handleCancel })
            ) : (
              <div class="crud-form-footer">
                <ElButton 
                  type="primary" 
                  onClick={submitForm} 
                  loading={props.loading}
                >
                  {props.submitText}
                </ElButton>
                {props.showCancel && (
                  <ElButton onClick={handleCancel}>
                    {props.cancelText}
                  </ElButton>
                )}
              </div>
            )}
          </ElFormItem>
        )}
      </ElForm>
    )
  }
})