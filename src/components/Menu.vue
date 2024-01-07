<script setup lang="ts">
import { onMounted, reactive, toRefs, ref, watch } from 'vue'
import { MenuMap, MenuItem } from '@/type/menu'

const props = defineProps<{
    currentParentKey: string; // 現在展開後已經被點選的key
    currentMenuMap: MenuMap; // 現在展開後的map
    uniqueId: string; // 由父層加子層組合成的ID
    selectDepth: number; // 深度
}>();

// 將 menuItems 轉換為 ref
const { menuItems } = toRefs(reactive({ menuItems: {} as MenuMap }));
const selectParentKey = ref<string | null>(null);
const currentDepth = ref<number>(0);
let mappedObject = reactive<MenuMap>({} as MenuMap);
const existingUniqueIds = ref<string | null>(localStorage.getItem('unique.id.arr')); //實作記憶功能未完成

onMounted(() => {
    // 尋找現在在哪個map節點
    menuItems.value = { ...props.currentMenuMap[props.currentParentKey]?.children };
});

const select = (parent: MenuItem) => {
    // 儲存點擊的key,傳給下一層
    selectParentKey.value = parent.key;
    // 儲存現在在哪個map節點
    mappedObject = props.currentMenuMap[props.uniqueId]?.children || {};

    // 實作記憶功能未完成
    if (existingUniqueIds.value) {
        const parsedExistingUniqueId = JSON.parse(existingUniqueIds.value);
        const addDepth = `depth_${props.selectDepth + 1}`
        const uniqueId: string = JSON.stringify({ ...parsedExistingUniqueId, [addDepth]: selectParentKey.value });
        localStorage.setItem('unique.id.arr', uniqueId);
        currentDepth.value = parent.depth
    }
};

// 實作記憶功能未完成，監聽 existingUniqueIds 的變化
watch(existingUniqueIds, (newValue: Record<string, any>, oldValue: Record<string, any>) => {
    // 檢查所有的深度屬性，並找到第一個改變的深度
    let changedDepth: string | null = null;
    for (let i = 1; i <= Object.keys(oldValue).length; i++) {
        const depthKey = "depth" + i;
        if (newValue[depthKey] !== oldValue[depthKey]) {
            changedDepth = depthKey;
            break;
        }
    }

    // 如果有改變，刪除該深度之後的屬性
    if (changedDepth !== null) {
        const startIndex: number = Number(changedDepth.slice(5)); // 提取深度數字部分
        const keysToDelete: string[] = Object.keys(oldValue).slice(startIndex);
        keysToDelete.forEach(key => {
            delete newValue[key];
        });
    }
});
</script>

<template>
    <ul v-for="(item, key) in  menuItems" :key="key" class="mt-4">
        <span v-for="index in props.selectDepth" :key="index" class="w-4 h-full inline-block"></span>
        <li v-if="item?.text" :class="[item.key === selectParentKey ? 'text-yellow-300' : 'text-white', 'inline-block']"
            @click="select(item)">
            {{ item.text }}</li>
        <Menu v-if="selectParentKey && item?.key === selectParentKey" :currentParentKey="selectParentKey"
            :currentMenuMap="mappedObject" :uniqueId="selectParentKey" :selectDepth="currentDepth">
        </Menu>
    </ul>
</template>
