<script setup lang="tsx">
    import { ref } from 'vue'
    import CrudTableDoc from './views/CrudTableDoc.vue'

    const showDoc = ref(true)
</script>

<template>
    <div style="padding: 20px">
        <div style="margin-bottom: 20px; text-align: center">
            <button 
                @click="showDoc = !showDoc"
                style="padding: 8px 16px; background: #409eff; color: white; border: none; border-radius: 4px; cursor: pointer">
                {{ showDoc ? '查看示例' : '查看文档' }}
            </button>
        </div>

        <!-- 文档页面 -->
        <CrudTableDoc v-if="showDoc" />

        <!-- 原有示例 -->
        <div v-else>
            <h1>CrudTable 高级功能演示</h1>
            <!-- 这里保留你原有的示例代码 -->
        </div>
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


