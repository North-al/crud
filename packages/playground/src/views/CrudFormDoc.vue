<template>
  <div class="crud-form-doc">
    <div class="doc-header">
      <h1>CrudForm 表单组件</h1>
      <p class="doc-description">
        CrudForm 是一个功能强大的表单组件，支持多种字段类型、验证规则、动态配置、数据回显等特性。
      </p>
    </div>

    <div class="doc-content">
      <!-- 基础用法 -->
      <section class="doc-section">
        <h2>1. 基础用法</h2>
        <p>最简单的表单配置，包含常用的输入字段。</p>
        <div class="example-container">
          <h4>示例效果：</h4>
          <CrudForm 
            :fields="basicFields"
            :model="basicModel"
            @update:model="handleBasicModelUpdate"
            @submit="handleBasicSubmit"
          />
          <div class="result" v-if="basicResult">
            <h4>提交结果：</h4>
            <pre>{{ JSON.stringify(basicResult, null, 2) }}</pre>
          </div>
        </div>
        <CodeBlock :files="formCodeExamples.basic" />
      </section>

      <!-- 字段类型 -->
      <section class="doc-section">
        <h2>2. 字段类型</h2>
        <p>支持多种字段类型：文本、数字、日期、选择器、开关等。</p>
        <div class="example-container">
          <h4>示例效果：</h4>
          <CrudForm 
            :fields="typeFields"
            :model="typeModel"
            @update:model="handleTypeModelUpdate"
            @submit="handleTypeSubmit"
            :gutter="16"
            :colSpan="12"
          />
        </div>
        <CodeBlock :files="formCodeExamples.fieldTypes" />
      </section>

      <!-- 动态表单 -->
      <section class="doc-section">
        <h2>3. 动态表单</h2>
        <p>根据条件动态显示/隐藏字段，支持函数式配置。</p>
        <div class="example-container">
          <h4>示例效果：</h4>
          <CrudForm 
            :fields="dynamicFields"
            :model="dynamicModel"
            @update:model="handleDynamicModelUpdate"
            @submit="handleDynamicSubmit"
          />
        </div>
        <CodeBlock :files="formCodeExamples.dynamic" />
      </section>

      <!-- 验证规则 -->
      <section class="doc-section">
        <h2>4. 验证规则</h2>
        <p>支持内置验证规则和自定义验证函数。</p>
        <div class="example-container">
          <h4>示例效果：</h4>
          <CrudForm 
            :fields="validationFields"
            :model="validationModel"
            @update:model="handleValidationModelUpdate"
            @submit="handleValidationSubmit"
            @validate="handleValidationError"
          />
          <div class="result" v-if="validationError">
            <h4>验证错误：</h4>
            <pre>{{ JSON.stringify(validationError, null, 2) }}</pre>
          </div>
        </div>
        <CodeBlock :files="formCodeExamples.validation" />
      </section>

      <!-- 接口数据回显 -->
      <section class="doc-section">
        <h2>5. 接口数据回显</h2>
        <p>演示如何从接口获取数据并回显到表单中，支持编辑模式。</p>
        <div class="example-container">
          <h4>示例效果：</h4>
          <div class="control-buttons">
            <el-button @click="loadUserData(1)" type="primary">加载用户1数据</el-button>
            <el-button @click="loadUserData(2)" type="success">加载用户2数据</el-button>
            <el-button @click="clearApiData" type="info">清空数据</el-button>
            <el-button @click="mockSubmitData" type="warning" :loading="submitLoading">模拟提交</el-button>
          </div>
          <div class="loading-indicator" v-if="apiLoading">
            <el-icon class="is-loading"><Loading /></el-icon>
            正在加载数据...
          </div>
          <CrudForm 
            :fields="apiFields"
            :model="apiModel"
            @update:model="handleApiModelUpdate"
            @submit="handleApiSubmit"
            :loading="submitLoading"
          />
          <div class="result" v-if="apiResult">
            <h4>当前表单数据：</h4>
            <pre>{{ JSON.stringify(apiModel, null, 2) }}</pre>
          </div>
        </div>
        <CodeBlock :files="formCodeExamples.apiData" />
      </section>

      <!-- 自定义渲染 -->
      <section class="doc-section">
        <h2>6. 自定义渲染</h2>
        <p>支持自定义字段渲染和插槽。</p>
        <div class="example-container">
          <h4>示例效果：</h4>
          <CrudForm 
            :fields="customFields"
            :model="customModel"
            @update:model="handleCustomModelUpdate"
            @submit="handleCustomSubmit"
          >
            <template #customField="{ model, field }">
              <div style="border: 1px dashed #ccc; padding: 10px; border-radius: 4px;">
                <p>这是自定义渲染的字段</p>
                <el-input v-model="model.customField" placeholder="自定义输入框" />
              </div>
            </template>
          </CrudForm>
        </div>
        <CodeBlock :files="formCodeExamples.custom" />
      </section>

      <!-- API 参考 -->
      <section class="doc-section">
        <h2>7. API 参考</h2>
        
        <h3>Props</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>属性名</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>fields</td><td>表单字段配置</td><td>CrudFormField[]</td><td>[]</td></tr>
            <tr><td>model</td><td>表单数据对象</td><td>Record&lt;string, any&gt;</td><td>{}</td></tr>
            <tr><td>labelWidth</td><td>标签宽度</td><td>string</td><td>'100px'</td></tr>
            <tr><td>inline</td><td>是否行内表单</td><td>boolean</td><td>false</td></tr>
            <tr><td>loading</td><td>提交按钮加载状态</td><td>boolean</td><td>false</td></tr>
            <tr><td>disabled</td><td>是否禁用表单</td><td>boolean</td><td>false</td></tr>
            <tr><td>gutter</td><td>栅格间隔</td><td>number</td><td>20</td></tr>
            <tr><td>colSpan</td><td>默认栅格占位</td><td>number</td><td>24</td></tr>
          </tbody>
        </table>

        <h3>Events</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>事件名</th>
              <th>说明</th>
              <th>回调参数</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>update:model</td><td>表单数据更新</td><td>(model: Record&lt;string, any&gt;)</td></tr>
            <tr><td>submit</td><td>表单提交</td><td>(model: Record&lt;string, any&gt;)</td></tr>
            <tr><td>cancel</td><td>取消操作</td><td>-</td></tr>
            <tr><td>validate</td><td>验证失败</td><td>(errors: any)</td></tr>
          </tbody>
        </table>

        <h3>Field Configuration</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>属性名</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>field</td><td>字段名</td><td>string</td><td>-</td></tr>
            <tr><td>label</td><td>字段标签</td><td>string</td><td>-</td></tr>
            <tr><td>type</td><td>字段类型</td><td>FieldType</td><td>-</td></tr>
            <tr><td>placeholder</td><td>占位符</td><td>string</td><td>-</td></tr>
            <tr><td>rules</td><td>验证规则</td><td>FormItemRule[]</td><td>-</td></tr>
            <tr><td>options</td><td>选项列表</td><td>Option[]</td><td>-</td></tr>
            <tr><td>props</td><td>组件属性</td><td>Record&lt;string, any&gt;</td><td>-</td></tr>
            <tr><td>span</td><td>栅格占位</td><td>number</td><td>24</td></tr>
            <tr><td>disabled</td><td>是否禁用</td><td>boolean | Function</td><td>false</td></tr>
            <tr><td>hidden</td><td>是否隐藏</td><td>boolean | Function</td><td>false</td></tr>
            <tr><td>render</td><td>自定义渲染</td><td>Function</td><td>-</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import { CrudForm } from '@northal/crud-element-plus'
import type { CrudFormField } from '@northal/crud-element-plus'
import CodeBlock from '../components/CodeBlock.vue'
import { formCodeExamples } from '../data/crud-form-examples'

// 基础用法
const basicModel = reactive({
  name: '',
  email: '',
  age: 0
})
const basicResult = ref(null)

const basicFields: CrudFormField[] = [
  {
    field: 'name',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名',
    rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
  },
  {
    field: 'email',
    type: 'input',
    label: '邮箱',
    placeholder: '请输入邮箱',
    rules: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
    ]
  },
  {
    field: 'age',
    type: 'number',
    label: '年龄',
    placeholder: '请输入年龄'
  }
]

const handleBasicModelUpdate = (newModel: any) => {
  Object.assign(basicModel, newModel)
}

const handleBasicSubmit = (data: any) => {
  basicResult.value = data
  console.log('基础表单提交:', data)
}

// 字段类型
const typeModel = reactive({
  input: '',
  textarea: '',
  number: 0,
  select: '',
  date: null,
  datetime: null,
  switch: false,
  radio: '',
  checkbox: []
})

const typeFields: CrudFormField[] = [
  { field: 'input', type: 'input', label: '文本输入', placeholder: '请输入文本' },
  { field: 'textarea', type: 'textarea', label: '多行文本', placeholder: '请输入多行文本' },
  { field: 'number', type: 'number', label: '数字输入', placeholder: '请输入数字' },
  { 
    field: 'select', 
    type: 'select', 
    label: '下拉选择',
    placeholder: '请选择',
    options: [
      { label: '选项一', value: 'option1' },
      { label: '选项二', value: 'option2' },
      { label: '选项三', value: 'option3' }
    ]
  },
  { field: 'date', type: 'date', label: '日期选择', placeholder: '请选择日期' },
  { field: 'datetime', type: 'datetime', label: '日期时间', placeholder: '请选择日期时间' },
  { field: 'switch', type: 'switch', label: '开关' },
  {
    field: 'radio',
    type: 'radio',
    label: '单选按钮',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' }
    ]
  },
  {
    field: 'checkbox',
    type: 'checkbox',
    label: '多选按钮',
    options: [
      { label: '游泳', value: 'swimming' },
      { label: '跑步', value: 'running' },
      { label: '篮球', value: 'basketball' }
    ]
  }
]

const handleTypeModelUpdate = (newModel: any) => {
  Object.assign(typeModel, newModel)
}

const handleTypeSubmit = (data: any) => {
  console.log('字段类型表单提交:', data)
}

// 动态表单
const dynamicModel = reactive({
  userType: 'personal',
  personalName: '',
  companyName: '',
  hasVip: false,
  vipLevel: ''
})

const dynamicFields: CrudFormField[] = [
  {
    field: 'userType',
    type: 'radio',
    label: '用户类型',
    options: [
      { label: '个人用户', value: 'personal' },
      { label: '企业用户', value: 'business' }
    ]
  },
  {
    field: 'personalName',
    type: 'input',
    label: '个人姓名',
    placeholder: '请输入姓名',
    hidden: (model) => model.userType !== 'personal'
  },
  {
    field: 'companyName',
    type: 'input',
    label: '公司名称',
    placeholder: '请输入公司名称',
    hidden: (model) => model.userType !== 'business'
  },
  {
    field: 'hasVip',
    type: 'switch',
    label: '是否VIP'
  },
  {
    field: 'vipLevel',
    type: 'select',
    label: 'VIP等级',
    options: [
      { label: '黄金', value: 'gold' },
      { label: '白金', value: 'platinum' },
      { label: '钻石', value: 'diamond' }
    ],
    hidden: (model) => !model.hasVip,
    disabled: (model) => !model.hasVip
  }
]

const handleDynamicModelUpdate = (newModel: any) => {
  Object.assign(dynamicModel, newModel)
}

const handleDynamicSubmit = (data: any) => {
  console.log('动态表单提交:', data)
}

// 验证规则
const validationModel = reactive({
  username: '',
  email: '',
  phone: ''
})
const validationError = ref(null)

const validationFields: CrudFormField[] = [
  {
    field: 'username',
    type: 'input',
    label: '用户名',
    placeholder: '请输入用户名',
    rules: [
      { required: true, message: '用户名不能为空', trigger: 'blur' },
      { min: 3, max: 20, message: '用户名长度为3-20个字符', trigger: 'blur' },
      { pattern: /^[a-zA-Z0-9_]+$/, message: '只能包含字母、数字和下划线', trigger: 'blur' }
    ]
  },
  {
    field: 'email',
    type: 'input',
    label: '邮箱',
    placeholder: '请输入邮箱',
    rules: [
      { required: true, message: '邮箱不能为空', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
    ]
  },
  {
    field: 'phone',
    type: 'input',
    label: '手机号',
    placeholder: '请输入手机号',
    rules: [
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
    ]
  }
]

const handleValidationModelUpdate = (newModel: any) => {
  Object.assign(validationModel, newModel)
}

const handleValidationSubmit = (data: any) => {
  console.log('验证表单提交:', data)
  validationError.value = null
}

const handleValidationError = (error: any) => {
  validationError.value = error
}

// 接口数据回显
const apiModel = reactive({
  id: null,
  username: '',
  email: '',
  phone: '',
  role: '',
  status: true,
  nickname: '',
  avatar: '',
  bio: '',
  theme: 'light',
  notifications: true,
  createdAt: null,
  lastLoginAt: null
})

const apiResult = ref<any>(null)
const apiLoading = ref(false)
const submitLoading = ref(false)

const apiFields: CrudFormField[] = [
  {
    field: 'id',
    type: 'number',
    label: 'ID',
    disabled: true
  },
  {
    field: 'username',
    type: 'input',
    label: '用户名',
    placeholder: '请输入用户名',
    rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
  },
  {
    field: 'email',
    type: 'input',
    label: '邮箱',
    placeholder: '请输入邮箱',
    rules: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
    ]
  },
  {
    field: 'phone',
    type: 'input',
    label: '手机号',
    placeholder: '请输入手机号'
  },
  {
    field: 'role',
    type: 'select',
    label: '角色',
    placeholder: '请选择角色',
    options: [
      { label: '管理员', value: 'admin' },
      { label: '普通用户', value: 'user' },
      { label: '访客', value: 'guest' }
    ]
  },
  {
    field: 'status',
    type: 'switch',
    label: '状态'
  },
  {
    field: 'nickname',
    type: 'input',
    label: '昵称',
    placeholder: '请输入昵称'
  },
  {
    field: 'bio',
    type: 'textarea',
    label: '个人简介',
    placeholder: '请输入个人简介'
  },
  {
    field: 'theme',
    type: 'radio',
    label: '主题',
    options: [
      { label: '浅色', value: 'light' },
      { label: '深色', value: 'dark' }
    ]
  },
  {
    field: 'notifications',
    type: 'switch',
    label: '接收通知'
  },
  {
    field: 'createdAt',
    type: 'datetime',
    label: '创建时间',
    disabled: true
  },
  {
    field: 'lastLoginAt',
    type: 'datetime',
    label: '最后登录时间',
    disabled: true
  }
]

// 模拟API数据
const mockUsers = {
  1: {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    phone: '13800138001',
    role: 'admin',
    status: true,
    profile: {
      nickname: 'John',
      avatar: 'https://example.com/avatar1.jpg',
      bio: '前端开发工程师，热爱技术，喜欢分享。'
    },
    preferences: {
      theme: 'dark',
      notifications: true
    },
    createdAt: '2024-01-15T10:30:00',
    lastLoginAt: '2024-03-15T09:20:00'
  },
  2: {
    id: 2,
    username: 'jane_smith',
    email: 'jane@example.com',
    phone: '13900139002',
    role: 'user',
    status: true,
    profile: {
      nickname: 'Jane',
      avatar: 'https://example.com/avatar2.jpg',
      bio: 'UI/UX设计师，专注于用户体验设计。'
    },
    preferences: {
      theme: 'light',
      notifications: false
    },
    createdAt: '2024-02-20T14:45:00',
    lastLoginAt: '2024-03-14T16:30:00'
  }
}

const loadUserData = async (userId: number) => {
  apiLoading.value = true
  
  try {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const userData = mockUsers[userId as keyof typeof mockUsers]
    if (userData) {
      // 扁平化数据结构，匹配表单字段
      Object.assign(apiModel, {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        status: userData.status,
        nickname: userData.profile.nickname,
        avatar: userData.profile.avatar,
        bio: userData.profile.bio,
        theme: userData.preferences.theme,
        notifications: userData.preferences.notifications,
        createdAt: userData.createdAt,
        lastLoginAt: userData.lastLoginAt
      })
      
      ElMessage.success(`用户${userId}数据加载成功`)
      apiResult.value = { ...userData } // 保持原始嵌套结构用于显示
    } else {
      ElMessage.error('用户不存在')
    }
  } catch (error: any) {
    ElMessage.error('加载失败：' + error.message)
  } finally {
    apiLoading.value = false
  }
}

const clearApiData = () => {
  // 重置为初始状态
  Object.assign(apiModel, {
    id: null,
    username: '',
    email: '',
    phone: '',
    role: '',
    status: true,
    nickname: '',
    avatar: '',
    bio: '',
    theme: 'light',
    notifications: true,
    createdAt: null,
    lastLoginAt: null
  })
  apiResult.value = null
  ElMessage.info('数据已清空')
}

const mockSubmitData = async () => {
  submitLoading.value = true
  
  try {
    // 模拟提交API请求
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    ElMessage.success('数据提交成功')
    console.log('提交的数据:', apiModel)
  } catch (error: any) {
    ElMessage.error('提交失败：' + error.message)
  } finally {
    submitLoading.value = false
  }
}

const handleApiModelUpdate = (newModel: any) => {
  Object.assign(apiModel, newModel)
}

const handleApiSubmit = (data: any) => {
  console.log('接口表单提交:', data)
}

// 自定义渲染
const customModel = reactive({
  customField: '',
  customRender: 'initial value'
})

const customFields: CrudFormField[] = [
  {
    field: 'customField',
    type: 'input',
    label: '插槽字段'
  },
  {
    field: 'customRender',
    type: 'custom',
    label: '自定义渲染',
    render: (model) => (
      <div style="border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
        <p>当前值: {model.customRender}</p>
        <el-button onClick={() => model.customRender = 'clicked'}>
          点击设置值
        </el-button>
      </div>
    )
  }
]

const handleCustomModelUpdate = (newModel: any) => {
  Object.assign(customModel, newModel)
}

const handleCustomSubmit = (data: any) => {
  console.log('自定义表单提交:', data)
}
</script>

<style scoped>
.crud-form-doc {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.doc-header {
  text-align: center;
  margin-bottom: 40px;
}

.doc-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 16px;
}

.doc-description {
  font-size: 1.1rem;
  color: #7f8c8d;
  line-height: 1.6;
}

.doc-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.doc-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 24px;
}

.doc-section h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 12px;
}

.doc-section p {
  color: #7f8c8d;
  margin-bottom: 20px;
  line-height: 1.6;
}

.example-container {
  background: white;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid #e9ecef;
}

.result {
  margin-top: 20px;
  padding: 16px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 4px;
}

.result h4 {
  margin: 0 0 8px 0;
  color: #0369a1;
}

.result pre {
  margin: 0;
  padding: 12px;
  background: #fff;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.api-table th,
.api-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.api-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #495057;
  font-size: 14px;
}

.api-table td {
  color: #6c757d;
  font-size: 14px;
}

.api-table tr:hover {
  background: #f8f9fa;
}

.api-table tr:last-child td {
  border-bottom: none;
}

h3 {
  color: #2c3e50;
  margin: 24px 0 16px 0;
  font-size: 1.2rem;
}

.control-buttons {
  margin-bottom: 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.loading-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 4px;
  margin-bottom: 20px;
  color: #0369a1;
}
</style>
