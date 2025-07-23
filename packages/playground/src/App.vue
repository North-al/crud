<script setup lang="tsx">
    import { ref } from 'vue'
    import CrudTableDoc from './views/CrudTableDoc.vue'
    import CrudFormDoc from './views/CrudFormDoc.vue'

    const showDoc = ref(true)
    const activeComponent = ref<'table' | 'form'>('table')
    const handleChange = () => {
        activeComponent.value = 'form'
    }
</script>

<template>
    <div style="padding: 20px">
        <div style="margin-bottom: 20px; text-align: center">
            <button 
                @click="showDoc = !showDoc"
                style="padding: 8px 16px; background: #409eff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px">
                {{ showDoc ? '查看示例' : '查看文档' }}
            </button>
            
            <button 
                v-if="showDoc"
                @click="activeComponent = 'table'"
                :style="{
                    padding: '8px 16px', 
                    background: activeComponent === 'table' ? '#409eff' : '#f5f7fa',
                    color: activeComponent === 'table' ? 'white' : '#606266',
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    marginRight: '10px'
                }">
                表格组件
            </button>
            
            <button 
                v-if="showDoc"
                @click="handleChange"
                :style="{
                    padding: '8px 16px', 
                    background: activeComponent === 'form' ? '#409eff' : '#f5f7fa',
                    color: activeComponent === 'form' ? 'white' : '#606266',
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer'
                }">
                表单组件
            </button>
        </div>

        <!-- 文档页面 -->
        <CrudTableDoc v-if="showDoc && activeComponent === 'table'" />
        <CrudFormDoc v-if="showDoc && activeComponent === 'form'" />
    </div>
</template>

<style scoped>
    h1,
    h2,
    h3 {
        color: #333;
        margin-bottom: 16px;
    }

    h2 {
        font-size: 18px;
        border-bottom: 1px solid #eee;
        padding-bottom: 8px;
    }

    .el-button + .el-button {
        margin-left: 0;
    }

    :deep(.el-table .el-table__expand-icon) {
        color: #409eff;
    }

    :deep(.el-table__expanded-cell) {
        padding: 0;
    }

    :deep(.el-table .el-table__cell) {
        padding: 8px 0;
    }
</style>


