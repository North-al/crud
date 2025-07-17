import { defineComponent, type PropType } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import type { CrudTableColumn } from '../types/table'

export default defineComponent({
    name: 'CrudTable',
    props: {
        data: {
            type: Array as PropType<any[]>,
            default: () => []
        },
        columns: {
            type: Array as PropType<CrudTableColumn[]>,
            required: true
        }
    },
    setup(props) {
        return () => (
            <ElTable
                data={props.data}
                border={false}
                stripe={false}
                rowKey='id'
                highlightCurrentRow
                showOverflowTooltip>
                {props.columns.map(column => (
                    <ElTableColumn {...column}></ElTableColumn>
                ))}
            </ElTable>
        )
    }
})
