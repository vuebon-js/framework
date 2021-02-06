<template>
    <div class="ldio-container" :class="{active: $loader.visible}">
        <div class="loadingio-spinner-double-ring-6xc9l9f96g4">
            <div class="ldio-4flrpm22lx4">
            <div></div>
            <div></div>
            <div><div></div></div>
            <div><div></div></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Loader",
    }
</script>

<style scoped>
    @keyframes ldio-4flrpm22lx4 {
        0% { transform: rotate(0) }
        100% { transform: rotate(360deg) }
    }
    .ldio-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        background: #fff;
        position: absolute;
        left: 0;
        top: 0;
        transition: .15s ease-out all;
        will-change: opacity, z-index;
        opacity: 0;
        z-index: -1;
    }
    .ldio-container.active {
        z-index: 9999;
        opacity: 1;
        transition: unset;
    }
    .ldio-4flrpm22lx4 div { box-sizing: border-box!important }
    .ldio-4flrpm22lx4 > div {
        position: absolute;
        width: 104px;
        height: 104px;
        top: 48px;
        left: 48px;
        border-radius: 50%;
        border: 4px solid #000;
        border-color: #3be8b0 transparent #3be8b0 transparent;
        animation: ldio-4flrpm22lx4 0.9803921568627451s linear infinite;
    }

    .ldio-4flrpm22lx4 > div:nth-child(2), .ldio-4flrpm22lx4 > div:nth-child(4) {
        width: 92px;
        height: 92px;
        top: 54px;
        left: 54px;
        animation: ldio-4flrpm22lx4 0.9803921568627451s linear infinite reverse;
    }
    .ldio-4flrpm22lx4 > div:nth-child(2) {
        border-color: transparent #1aafd0 transparent #1aafd0
    }
    .ldio-4flrpm22lx4 > div:nth-child(3) { border-color: transparent }
    .ldio-4flrpm22lx4 > div:nth-child(3) div {
        position: absolute;
        width: 100%;
        height: 100%;
        transform: rotate(45deg);
    }
    .ldio-4flrpm22lx4 > div:nth-child(3) div:before, .ldio-4flrpm22lx4 > div:nth-child(3) div:after {
        content: "";
        display: block;
        position: absolute;
        width: 4px;
        height: 4px;
        top: -4px;
        left: 46px;
        background: #3be8b0;
        border-radius: 50%;
        box-shadow: 0 100px 0 0 #3be8b0;
    }
    .ldio-4flrpm22lx4 > div:nth-child(3) div:after {
        left: -4px;
        top: 46px;
        box-shadow: 100px 0 0 0 #3be8b0;
    }

    .ldio-4flrpm22lx4 > div:nth-child(4) { border-color: transparent; }
    .ldio-4flrpm22lx4 > div:nth-child(4) div {
        position: absolute;
        width: 100%;
        height: 100%;
        transform: rotate(45deg);
    }
    .ldio-4flrpm22lx4 > div:nth-child(4) div:before, .ldio-4flrpm22lx4 > div:nth-child(4) div:after {
        content: "";
        display: block;
        position: absolute;
        width: 4px;
        height: 4px;
        top: -4px;
        left: 40px;
        background: #1aafd0;
        border-radius: 50%;
        box-shadow: 0 88px 0 0 #1aafd0;
    }
    .ldio-4flrpm22lx4 > div:nth-child(4) div:after {
        left: -4px;
        top: 40px;
        box-shadow: 88px 0 0 0 #1aafd0;
    }
    .loadingio-spinner-double-ring-6xc9l9f96g4 {
        width: 200px;
        height: 200px;
        display: inline-block;
        overflow: hidden;
        background: none;
    }
    .ldio-4flrpm22lx4 {
        width: 100%;
        height: 100%;
        position: relative;
        transform: translateZ(0) scale(1);
        backface-visibility: hidden;
        transform-origin: 0 0; /* see note above */
    }
    .ldio-4flrpm22lx4 div { box-sizing: content-box; }
</style>