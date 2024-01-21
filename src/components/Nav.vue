<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { MenuItem, MenuMap, MenuItems } from '@/type/menu';
import { menuData } from "@/data/menuData";
import Menu from '@/components/Menu.vue';

const isShowNav = ref<boolean>(false);
const selectParentKey = ref<string | MenuItem>('');
let mappedObject = reactive<MenuMap>({})

// 開關側邊欄
const toggleNav = () => {
    isShowNav.value = !isShowNav.value;
    const cacheUniqueIds = sessionStorage.getItem('cache.unique.id.arr')
    if (cacheUniqueIds && !isShowNav.value) {
        localStorage.setItem('unique.id.arr', cacheUniqueIds)
        sessionStorage.removeItem('cache.unique.id.arr')
    }

};

// 選擇第一層的id
const select = (parent: MenuItems) => {
    selectParentKey.value = parent?.key;
    const uniqueId: string = JSON.stringify({ 'depth_1': parent?.key });
    sessionStorage.setItem('cache.unique.id.arr', uniqueId);
};

onMounted(() => {
    const jsonString = localStorage.getItem('menu.map')
    if (jsonString) {
        try {
            mappedObject = JSON.parse(jsonString)
        } catch (error) {
            console.error('JSON錯誤:', error)
        }
    }
    // 實作記憶功能
    const lastUniqueIds = localStorage.getItem('unique.id.arr')
    if (lastUniqueIds) {
        const uniqueIdsArr: string[] = Object.values(JSON.parse(lastUniqueIds))
        selectParentKey.value = uniqueIdsArr[0]
    }
});
</script>

<template>
    <div class="overflow-hidden">
        <header class="w-full bg-white absolute top-0 left-0 p-1 flex flex-row-reverse">
            <button class="px-3 py-1 border-2 border-gray-400 bg-gray-300" @click="toggleNav()">
                <div class="w-3.5">
                    <span class="h-0.5 w-full my-1 bg-black block"></span>
                    <span class="h-0.5 w-full my-1 bg-black block"></span>
                    <span class="h-0.5 w-full my-1 bg-black block"></span>
                </div>
            </button>
        </header>

        <Transition enter-active-class="transition-all duration-300" leave-active-class="transition-all duration-300"
            enter-from-class="transform translate-x-full" enter-to-class="transform translate-x-0 z-30"
            leave-from-class="transform translate-x-0 z-30" leave-to-class="transform translate-x-full z-30">
            <div v-if="isShowNav" class="min-h-screen absolute top-0 right-0 flex w-full overflow-hidden z-30">
                <div class="w-3/12 relative z-30" @click="toggleNav()"></div>
                <nav class="bg-black w-9/12 p-5 relative z-30">
                    <ul class="min-w-full bg-gray-400 p-4">
                        <li v-for="item in menuData" :key="item.key" class="cursor-pointer mt-4">
                            <p :class="[item.key === selectParentKey ? 'text-yellow-300' : 'text-white']"
                                @click.stop="select(item)">
                                {{ item.text }}
                            </p>
                            <Menu
                                v-if="selectParentKey && item.key === selectParentKey && Object.keys(mappedObject).length > 0"
                                :currentParentKey="selectParentKey" :currentMenuMap="mappedObject" :selectDepth="1">
                            </Menu>
                        </li>
                    </ul>
                </nav>
            </div>

        </Transition>

    </div>
</template>
