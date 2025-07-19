/**
 * 判断对象是否为空
 * @param obj 要检查的对象
 * @returns boolean
 */
export function isEmpty(obj: unknown): boolean {
    if (obj === null || obj === undefined) return true
    if (typeof obj === 'string') return obj.trim().length === 0
    if (Array.isArray(obj)) return obj.length === 0
    if (obj instanceof Map || obj instanceof Set) return obj.size === 0
    if (typeof obj === 'object') return Object.keys(obj).length === 0
    return false
}
