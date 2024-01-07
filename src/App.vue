<script setup lang="ts">
import { onMounted } from 'vue'
import Nav from '@/components/Nav.vue'
import Animation from '@/components/Animation.vue'
import { MenuItems, MenuMap } from '@/type/menu'
import { menuData } from "@/data/menuData"
let mappedObject = {} as MenuMap

/**
 * 將 MenuItems 陣列轉換為物件形式。
 * 並包含額外的屬性，如 uniqueId 和 depth。
 */
const arrayToObject = (MenuArr: MenuItems[]) => {
  const result: Record<string, any> = {};

  /**
   * @param arr 要處理的 MenuItems 陣列
   * @param result 存儲結果的物件
   * @param parentKey 父層的鍵
   * @param depth 當前深度，預設為 1
   */
  const processArray = (arr: MenuItems[], result: Record<string, any>, parentKey?: string, depth: number = 1) => {
    // 遍歷陣列中的每個項目
    arr.forEach((item) => {
      // 提取MenuItems物件的屬性
      const { key, text, children } = item;
      const currentKey: string = key;
      // 生成唯一的識別Id，基於父層的key加上當key
      const uniqueId: string = parentKey ? `${parentKey}-${currentKey}` : currentKey;

      // 將項目添加到結果物件中，包含 key、text、uniqueId 和 depth 屬性
      result[currentKey] = { key, text, uniqueId, depth };

      if (children && children.length > 0) {
        // 初始化 children 屬性
        result[currentKey].children = {};
        processArray(children, result[currentKey].children, uniqueId, depth + 1);
      }
    });
  };

  // 初始時以 MenuArr 為參數呼叫內部處理函式
  processArray(MenuArr, result);

  return result;
};

onMounted(() => {
  mappedObject = { ...arrayToObject(menuData) };
  // 把map存到localStorage
  localStorage.setItem('menu.map', JSON.stringify(mappedObject));
});

</script>

<template>
  <div class="w-[390px] min-h-screen bg-yellow-600 m-auto relative flex items-center justify-center">
    <Nav></Nav>
    <Animation></Animation>
  </div>
</template>