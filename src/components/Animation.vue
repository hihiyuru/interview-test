<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap';

onMounted(() => {
    const flashTimeline = gsap.timeline({
        repeat: -1, // 無限重複整個時間線
        onRepeat: () => {
            gsap.set('.flash', { opacity: 0 }); // 在每次重複前將不透明度重置為 1
        }
    });
    // 添加一個 yoyo 動畫
    flashTimeline.to('.flash', {
        opacity: 0.3,
        duration: 0.3,
        repeat: 8, // 來回共8次，一次4次
        yoyo: true,
    });
    // 添加一個暫停
    flashTimeline.to('.flash', {
        opacity: 0,
        duration: 3, // 3 秒的暫停
        immediateRender: false // 防止在時間線開始時立即渲染這一部分
    });
    gsap.to('.ball', {
        x: '60vw',
        duration: 2,
        repeat: -1, // 無限重複
        ease: 'linear'
    });

    gsap.to('.noRepeatBall', {
        x: '60vw',
        duration: 2,
        repeat: 0,
        ease: 'linear'
    });




    const ballTimeline = gsap.timeline({ repeat: -1, ease: 'linear' });
    // 第一階段：移動到 60vw
    ballTimeline.to('.ball', {
        x: '60vw',
        duration: 2
    });
    // 第二階段：停留 1 秒
    ballTimeline.to('.ball', {
        x: '60vw',
        duration: 1
    });
    // 第三階段：移動到 110vw
    ballTimeline.to('.ball', {
        x: '110vw',
        duration: 1
    });
});

</script>

<template>
    <div class="relative w-11/12 h-80 flex flex-wrap">
        <div v-for="(_index, key) in 9" :key="key" class="relative w-[32%] m-0.5 border-[2px] border-black border-solid">
            <div class="gradient h-[100px] relative">
                <div v-show="key === 2 || key === 4 || key === 8" class="flash h-[100px] relative z-10">
                </div>
                <div v-show="key === 0 || key === 2 || key === 6 || key === 8"
                    class="h-[30px] w-[30px] rounded-full bg-green absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
                    :class="[(key === 0 || key === 6) && 'ball', (key === 2 || key === 8) && 'noRepeatBall']">
                    <p>0</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
.gradient {
    background: radial-gradient(circle, rgba(113, 81, 95, 1) 81%, rgba(0, 0, 0, 1) 100%);
}

.flash {
    background: rgba(255, 255, 255, 0.3);
}
</style>
  