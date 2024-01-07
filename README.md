# 主頁面九宮格動畫
- 請使用兩種以上的動畫執行方式，來繪製動畫：
Vue3可以使用`<Transition>`組建來製作簡單的動畫，或是安裝第三方套件`gsap`，而這次使用的是`@keyframes`的方式

# 側邊選單
- 另提供一個下拉選單，需包含所有種類。從下拉選單中選取任一項目時，等同點擊該項目：
會使用`pinia`或`vuex`儲存目前的分類,當點擊一個項目就記錄下來分類的文字,同一層的話就會清除此層級子層的項目。
- 請實作記憶功能，關閉分頁後再開啟，可以顯示上次選取的項目：此次點擊一次就會儲存到localStorage，並使用map紀錄，但我想更好的方式是在元件卸載時才把所有分類存進localStorage，一般點擊時一樣可以使用`pinia`或`vuex`儲存目前的分類。
- 請在效能考量下，設計可收合、展開最多一百層的選單：通常需要到一百層的選單可能會開一個新的分類頁比較能讓使用者更清楚，像是嵌套的頁面，路徑也可以記錄分類的id，再顯示Breadcrumbs


## Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
