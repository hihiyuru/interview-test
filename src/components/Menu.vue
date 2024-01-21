<script setup lang="ts">
import { onMounted, reactive, toRefs, ref } from 'vue'
import { MenuMap, MenuItem } from '@/type/menu'

const props = defineProps<{
  currentParentKey: string; // 現在展開後已經被點選的key
  currentMenuMap: MenuMap; // 現在展開後的map
  selectDepth: number; // 深度
}>();


const { menuItems } = toRefs(reactive({ menuItems: {} as MenuMap })); // 將 menuItems 轉換為 ref，toRefs解構後才能響應，放置父層傳來的子層
const selectParentKey = ref<string | null>(null); // 選擇的key
const currentDepth = ref<number>(0); // 先在的深度
const existingUniqueIds = ref<string | null>(localStorage.getItem('unique.id.arr')); // 儲存使用者點擊後的數據
let currentMappedObject = reactive<MenuMap>({} as MenuMap); // 儲存使用者點擊後的父層的子層數據

onMounted(() => {
  // 如果有數據被儲存在localStorage
  if (existingUniqueIds.value) {
    // 先把localStorage放回sessionStorage使用者才能正常操作
    sessionStorage.setItem('cache.unique.id.arr', existingUniqueIds.value)
    const existingUniqueIdsObj = JSON.parse(existingUniqueIds.value);
    const existingUniqueIdArr: string[] = Object.values(existingUniqueIdsObj)
    // 放置父層傳來的子層
    menuItems.value = { ...props.currentMenuMap[props.currentParentKey]?.children };
    // 如果傳來的深度小於localStorage的資料長度就可以去點選select，不寫此判斷找不到子層會報錯
    if (props.selectDepth < existingUniqueIdArr.length) {
      select(menuItems.value[existingUniqueIdArr[props.selectDepth]])
    }
    // 如果傳來的深度等於localStorage的資料長度，就可以清除localStorage的資料了
    if (props.selectDepth === existingUniqueIdArr.length) {
      localStorage.removeItem('unique.id.arr')
    }

  } else {
    // 放置父層傳來的子層
    menuItems.value = { ...props.currentMenuMap[props.currentParentKey]?.children };
  }
});

const select = (parent: MenuItem) => {
  // 儲存點擊的key,傳給下一層
  selectParentKey.value = parent.key;
  currentDepth.value = parent.depth

  // 儲存現在在哪個map節點
  currentMappedObject = props.currentMenuMap[props.currentParentKey]?.children || {};

  // 把選擇的選項傳進sessionStorage
  const cacheInSession = sessionStorage.getItem('cache.unique.id.arr')
  if (cacheInSession) {
    const parsedExistingUniqueId = JSON.parse(cacheInSession);
    const addDepth = `depth_${props.selectDepth + 1}`
    const uniqueId: string = JSON.stringify(
      trimObject({ ...parsedExistingUniqueId, [addDepth]: selectParentKey.value }, props.selectDepth + 1)
    );
    sessionStorage.setItem('cache.unique.id.arr', uniqueId);
  }
};

// 父層發生改變就移除子層資料
const trimObject = (obj: Record<string, any>, number: number): Record<string, any> => {
  const trimmedObj: Record<string, any> = {};
  const keys = Object.keys(obj);

  if (number < keys.length) {
    for (let i = 0; i < number; i++) {
      trimmedObj[keys[i]] = obj[keys[i]];
    }
    return trimmedObj;
  }

  // 如果數字不小於物件的鍵的數量，則返回原始物件
  return obj;
};
</script>

<template>
  <ul v-for="(item, key) in menuItems" :key="key" class="mt-4">
    <span v-for="index in props.selectDepth" :key="index" class="w-4 h-full inline-block"></span>
    <li v-if="item?.text" :class="[item.key === selectParentKey ? 'text-yellow-300' : 'text-white', 'inline-block']"
      @click="select(item)">
      {{ item.text }} / {{ item.key }}
    </li>
    <Menu v-if="selectParentKey && item?.key === selectParentKey" :currentParentKey="selectParentKey"
      :currentMenuMap="currentMappedObject" :selectDepth="currentDepth">
    </Menu>
  </ul>
</template>