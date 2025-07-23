// CrudForm 组件示例代码片段
export const formCodeExamples = {
  // 基础用法示例
  basic: {
    'template.vue': `<template>
  <CrudForm 
    :fields="basicFields"
    :model="basicModel"
    @update:model="handleBasicModelUpdate"
    @submit="handleBasicSubmit"
  />
</template>`,
    'script.ts': `import { reactive } from 'vue'
import { CrudForm } from '@northal/crud-element-plus'
import type { CrudFormField } from '@northal/crud-element-plus'

const basicModel = reactive({
  name: '',
  email: '',
  age: 0
})

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
  console.log('基础表单提交:', data)
}`
  },

  // 字段类型示例
  fieldTypes: {
    'FieldTypes.vue': `<template>
  <CrudForm 
    :fields="typeFields"
    :model="typeModel"
    @update:model="handleTypeModelUpdate"
    @submit="handleTypeSubmit"
    :gutter="16"
    :colSpan="12"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue'

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

const typeFields = [
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
</script>`
  },

  // 动态表单示例
  dynamic: {
    'DynamicForm.vue': `<template>
  <CrudForm 
    :fields="dynamicFields"
    :model="dynamicModel"
    @update:model="handleDynamicModelUpdate"
    @submit="handleDynamicSubmit"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const dynamicModel = reactive({
  userType: 'personal',
  personalName: '',
  companyName: '',
  hasVip: false,
  vipLevel: ''
})

const dynamicFields = [
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
</script>`
  },

  // 验证规则示例
  validation: {
    'ValidationForm.vue': `<template>
  <CrudForm 
    :fields="validationFields"
    :model="validationModel"
    @update:model="handleValidationModelUpdate"
    @submit="handleValidationSubmit"
    @validate="handleValidationError"
  />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const validationModel = reactive({
  username: '',
  email: '',
  phone: ''
})

const validationFields = [
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
      { pattern: /^1[3-9]\\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
    ]
  }
]
</script>`
  },

  // API数据回显示例
  apiData: {
    'ApiDataForm.vue': `<template>
  <div>
    <!-- 控制按钮 -->
    <div class="control-buttons">
      <el-button @click="loadUserData(1)" type="primary">加载用户1数据</el-button>
      <el-button @click="loadUserData(2)" type="success">加载用户2数据</el-button>
      <el-button @click="clearApiData" type="info">清空数据</el-button>
      <el-button @click="mockSubmitData" type="warning" :loading="submitLoading">模拟提交</el-button>
    </div>
    
    <!-- 加载指示器 -->
    <div class="loading-indicator" v-if="apiLoading">
      <el-icon class="is-loading"><Loading /></el-icon>
      正在加载数据...
    </div>
    
    <!-- 表单 -->
    <CrudForm 
      :fields="apiFields"
      :model="apiModel"
      @update:model="handleApiModelUpdate"
      @submit="handleApiSubmit"
      :loading="submitLoading"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'

const apiModel = reactive({
  id: null,
  username: '',
  email: '',
  phone: '',
  role: '',
  status: true,
  profile: {
    nickname: '',
    avatar: '',
    bio: ''
  },
  preferences: {
    theme: 'light',
    notifications: true
  },
  createdAt: null,
  lastLoginAt: null
})

const apiLoading = ref(false)
const submitLoading = ref(false)

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
    
    const userData = mockUsers[userId]
    if (userData) {
      // 深度合并数据到apiModel
      Object.keys(userData).forEach(key => {
        if (typeof userData[key] === 'object' && userData[key] !== null && !Array.isArray(userData[key])) {
          // 处理嵌套对象
          if (!apiModel[key]) {
            apiModel[key] = {}
          }
          Object.assign(apiModel[key], userData[key])
        } else {
          apiModel[key] = userData[key]
        }
      })
      
      ElMessage.success(\`用户\${userId}数据加载成功\`)
    } else {
      ElMessage.error('用户不存在')
    }
  } catch (error) {
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
    profile: {
      nickname: '',
      avatar: '',
      bio: ''
    },
    preferences: {
      theme: 'light',
      notifications: true
    },
    createdAt: null,
    lastLoginAt: null
  })
  ElMessage.info('数据已清空')
}

const mockSubmitData = async () => {
  submitLoading.value = true
  
  try {
    // 模拟提交API请求
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    ElMessage.success('数据提交成功')
    console.log('提交的数据:', apiModel)
  } catch (error) {
    ElMessage.error('提交失败：' + error.message)
  } finally {
    submitLoading.value = false
  }
}
</script>

<style scoped>
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
</style>`,
    'api.ts': `// API接口定义
export interface User {
  id: number
  username: string
  email: string
  phone: string
  role: string
  status: boolean
  profile: {
    nickname: string
    avatar: string
    bio: string
  }
  preferences: {
    theme: 'light' | 'dark'
    notifications: boolean
  }
  createdAt: string
  lastLoginAt: string
}

export const userApi = {
  // 获取用户详情
  async getUser(id: number): Promise<User> {
    const response = await fetch(\`/api/users/\${id}\`)
    if (!response.ok) {
      throw new Error('获取用户信息失败')
    }
    return response.json()
  },

  // 更新用户信息
  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const response = await fetch(\`/api/users/\${id}\`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('更新用户信息失败')
    }
    return response.json()
  },

  // 创建用户
  async createUser(data: Omit<User, 'id' | 'createdAt' | 'lastLoginAt'>): Promise<User> {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('创建用户失败')
    }
    return response.json()
  }
}`
  },

  // 自定义渲染示例
  custom: {
    'CustomRender.vue': `<template>
  <CrudForm 
    :fields="customFields"
    :model="customModel"
    @update:model="handleCustomModelUpdate"
    @submit="handleCustomSubmit"
  >
    <!-- 使用插槽自定义渲染 -->
    <template #customField="{ model, field }">
      <div style="border: 1px dashed #ccc; padding: 10px; border-radius: 4px;">
        <p>这是自定义渲染的字段</p>
        <el-input v-model="model.customField" placeholder="自定义输入框" />
      </div>
    </template>
  </CrudForm>
</template>

<script setup lang="tsx">
import { reactive } from 'vue'

const customModel = reactive({
  customField: '',
  customRender: 'initial value'
})

const customFields = [
  {
    field: 'customField',
    type: 'input',
    label: '插槽字段'
  },
  {
    field: 'customRender',
    type: 'custom',
    label: '自定义渲染',
    // 使用 render 函数自定义渲染
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
</script>`
  }
}

// 向后兼容的导出（保持原有接口）
export const codeExamples = formCodeExamples