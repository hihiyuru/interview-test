<script setup lang="ts">
import { ref } from 'vue';
import Menu from '@/components/Menu.vue'

const isShowNav = ref<boolean>(false);

const toggleNav = () => {
    isShowNav.value = !isShowNav.value;
};
</script>

<template>
    <div class="overflow-hidden">
        <header class="w-full bg-white absolute top-0 p-1 flex flex-row-reverse">
            <button class="px-3 py-1 border-2 border-slate-600 bg-slate-400" @click="toggleNav()">
                <div class="w-3.5">
                    <span class="h-0.5 w-full my-1 bg-black block"></span>
                    <span class="h-0.5 w-full my-1 bg-black block"></span>
                    <span class="h-0.5 w-full my-1 bg-black block"></span>
                </div>
            </button>
        </header>



        <Transition enter-active-class="transition-all duration-300" leave-active-class="transition-all duration-300"
            enter-from-class="transform translate-x-full" enter-to-class="transform translate-x-0"
            leave-from-class="transform translate-x-0" leave-to-class="transform translate-x-full">
            <div v-if="isShowNav" class="min-h-screen absolute top-0 right-0 flex w-full overflow-hidden">
                <div class="w-3/12" @click="toggleNav()"></div>
                <nav class="bg-black w-9/12 p-5">
                    <Menu></Menu>
                </nav>
            </div>

        </Transition>

    </div>
</template>
