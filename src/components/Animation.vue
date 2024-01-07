<template>
    <div class="relative w-11/12 h-80 flex flex-wrap">
        <div v-for="(_index, key) in 9" :key="key" class="relative w-[32%] m-0.5 border-[2px] border-black border-solid">
            <div :class="{ 'animate-flash': key === 2 || key === 4 || key === 8 }" class="gradient h-[100px] relative">
                <div v-show="key === 0 || key === 2 || key === 6 || key === 8"
                    class="ball h-[30px] w-[30px] rounded-full bg-green absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
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

@keyframes flash {

    0%,
    20%,
    40%,
    60%,
    80% {
        opacity: 1;
    }

    25%,
    45%,
    65%,
    85% {
        opacity: 0.6;
    }

    100% {
        opacity: 1;
    }
}

.animate-flash {
    animation: flash 3s infinite;
}

.ball {
    animation: slideAnimation 2s linear infinite;
}

.noRepeatBall {
    animation: slideAnimation 2s linear forwards;
    animation-iteration-count: 1;
}

@keyframes slideAnimation {

    0% {
        transform: translateX(0) translateY(-0.8rem);
    }

    65%,
    80% {
        transform: translateX(60vw) translateY(-0.8rem);
    }

    100% {
        transform: translateX(101vw) translateY(-0.8rem);
    }
}
</style>
  