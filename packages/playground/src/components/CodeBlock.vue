<template>
  <div class="code-block">
    <!-- 文件标签切换 -->
    <div class="code-tabs" v-if="fileNames.length > 1">
      <div 
        v-for="fileName in fileNames" 
        :key="fileName" 
        class="code-tab" 
        :class="{ 'active': currentFile === fileName }"
        @click="currentFile = fileName"
      >
        {{ fileName }}
      </div>
    </div>
    
    <!-- 代码展示区域 -->
    <div class="code-content">
      <div class="code-header">
        <span class="file-name">{{ currentFile }}</span>
        <button class="copy-button" @click="copyCode">
          <span v-if="!copied">复制代码</span>
          <span v-else>复制成功 ✓</span>
        </button>
      </div>
      <pre class="code-pre"><code class="code" v-html="highlightedCode"></code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const props = defineProps({
  files: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// 文件名列表
const fileNames = computed(() => Object.keys(props.files))

// 当前选中的文件
const currentFile = ref(fileNames.value[0] || '')

// 复制状态
const copied = ref(false)

// 高亮处理的代码
const highlightedCode = computed(() => {
  if (!currentFile.value || !props.files[currentFile.value]) {
    return ''
  }
  
  const code = props.files[currentFile.value]
  const language = getLanguageFromFileName(currentFile.value)
  
  try {
    if (language && hljs.getLanguage(language)) {
      return hljs.highlight(code, { language }).value
    }
    return hljs.highlightAuto(code).value
  } catch (error) {
    console.error('代码高亮失败:', error)
    return code
  }
})

// 根据文件名获取语言
function getLanguageFromFileName(fileName) {
  const ext = fileName.split('.').pop().toLowerCase()
  
  const languageMap = {
    vue: 'html',
    js: 'javascript',
    ts: 'typescript',
    jsx: 'jsx',
    tsx: 'tsx',
    css: 'css',
    scss: 'scss',
    less: 'less',
    md: 'markdown',
    json: 'json',
    html: 'html',
    xml: 'xml',
  }
  
  return languageMap[ext] || ''
}

// 复制代码
async function copyCode() {
  if (!navigator.clipboard) {
    fallbackCopyToClipboard(props.files[currentFile.value])
    return
  }

  try {
    await navigator.clipboard.writeText(props.files[currentFile.value])
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('复制失败:', error)
    fallbackCopyToClipboard(props.files[currentFile.value])
  }
}

// 兼容性处理：创建一个临时textarea来复制内容
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  textArea.style.padding = '0'
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.style.background = 'transparent'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  
  try {
    const successful = document.execCommand('copy')
    if (successful) {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    }
  } catch (err) {
    console.error('复制失败:', err)
  }
  
  document.body.removeChild(textArea)
}

// 文件列表为空时的处理
watch(fileNames, (newNames) => {
  if (newNames.length > 0 && !currentFile.value) {
    currentFile.value = newNames[0]
  }
})

// 组件挂载后初始化当前文件
onMounted(() => {
  if (fileNames.value.length > 0) {
    currentFile.value = fileNames.value[0]
  }
})
</script>

<style scoped>
.code-block {
  margin: 16px 0;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #f8f9fa;
  overflow: hidden;
}

.code-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f1f1f1;
  overflow-x: auto;
  white-space: nowrap;
}

.code-tab {
  padding: 8px 16px;
  cursor: pointer;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 14px;
  user-select: none;
}

.code-tab.active {
  background-color: #fff;
  border-bottom: 2px solid #409eff;
  font-weight: 500;
}

.code-tab:hover:not(.active) {
  background-color: #e8e8e8;
}

.code-content {
  position: relative;
  background-color: #fafafa;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
}

.file-name {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  color: #666;
}

.copy-button {
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.copy-button:hover {
  background-color: #e6f7ff;
  border-color: #1890ff;
  color: #1890ff;
}

.code-pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
}

.code {
  white-space: pre;
  color: #333;
}

/* 让代码块内的滚动条更美观 */
.code-pre::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.code-pre::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

.code-pre::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}

.code-pre::-webkit-scrollbar-thumb:hover {
  background-color: #ccc;
}
</style>