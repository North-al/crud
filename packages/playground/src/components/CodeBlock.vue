<template>
  <div class="code-block-container">
    <div class="code-header">
      <div class="code-tabs">
        <button 
          v-for="(file, key) in files" 
          :key="key"
          :class="['tab-button', { active: activeTab === key }]"
          @click="activeTab = key">
          {{ file.name }}
        </button>
      </div>
      <div class="code-actions">
        <button class="copy-button" @click="copyCode" :title="copied ? '已复制' : '复制代码'">
          <span v-if="copied">✓</span>
          <span v-else>📋</span>
        </button>
      </div>
    </div>
    <div class="code-content">
      <pre><code :class="`language-${files[activeTab].lang}`" v-html="highlightedCode"></code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { ElMessage } from 'element-plus'

interface CodeFile {
  name: string
  lang: string
  code: string
}

interface Props {
  files: Record<string, CodeFile>
  defaultTab?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultTab: ''
})

const activeTab = ref(props.defaultTab || Object.keys(props.files)[0])
const copied = ref(false)

const highlightedCode = computed(() => {
  const file = props.files[activeTab.value]
  if (!file) return ''
  
  // 简单的语法高亮
  return highlightCode(file.code, file.lang)
})

const copyCode = async () => {
  try {
    const file = props.files[activeTab.value]
    await navigator.clipboard.writeText(file.code)
    copied.value = true
    ElMessage.success('代码已复制到剪贴板')
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    ElMessage.error('复制失败')
  }
}

// 简单的语法高亮函数
function highlightCode(code: string, lang: string): string {
  // 这里可以集成 Prism.js 或其他语法高亮库
  // 现在先做简单的关键字高亮
  let highlighted = code
  
  if (lang === 'vue' || lang === 'html') {
    highlighted = highlighted
      .replace(/(&lt;\/?)([a-zA-Z-]+)/g, '$1<span class="tag">$2</span>')
      .replace(/(v-[a-zA-Z-]+|@[a-zA-Z-]+|:[a-zA-Z-]+)/g, '<span class="directive">$1</span>')
      .replace(/(".*?")/g, '<span class="string">$1</span>')
  }
  
  if (lang === 'javascript' || lang === 'typescript') {
    highlighted = highlighted
      .replace(/\b(const|let|var|function|return|import|export|from|default|if|else|for|while|class|interface|type)\b/g, '<span class="keyword">$1</span>')
      .replace(/('.*?'|".*?"|`.*?`)/g, '<span class="string">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
  }
  
  return highlighted
}
</script>

<style scoped>
.code-block-container {
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  margin: 16px 0;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  border-bottom: 1px solid #e4e7ed;
  padding: 0;
}

.code-tabs {
  display: flex;
}

.tab-button {
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab-button:hover {
  color: #409eff;
  background: rgba(64, 158, 255, 0.1);
}

.tab-button.active {
  color: #409eff;
  border-bottom-color: #409eff;
  background: #fff;
}

.code-actions {
  padding: 8px 12px;
}

.copy-button {
  padding: 6px 8px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.copy-button:hover {
  border-color: #409eff;
  color: #409eff;
}

.code-content {
  background: #fafafa;
  overflow-x: auto;
}

.code-content pre {
  margin: 0;
  padding: 20px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #2c3e50;
}

.code-content code {
  background: none;
  padding: 0;
  font-size: inherit;
  color: inherit;
}

/* 语法高亮样式 */
:deep(.keyword) {
  color: #d73a49;
  font-weight: 600;
}

:deep(.string) {
  color: #032f62;
}

:deep(.comment) {
  color: #6a737d;
  font-style: italic;
}

:deep(.tag) {
  color: #22863a;
  font-weight: 600;
}

:deep(.directive) {
  color: #6f42c1;
  font-weight: 600;
}

/* 响应式 */
@media (max-width: 768px) {
  .code-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .code-tabs {
    overflow-x: auto;
  }
  
  .tab-button {
    white-space: nowrap;
    min-width: 80px;
  }
}
</style>