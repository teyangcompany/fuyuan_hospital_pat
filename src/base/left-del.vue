<template>
    <div class="left-del overflow-hidden" ref="main"
         @touchstart="touchstart"
         @touchmove="touchmove"
         @touchend="touchend">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            tag: String,
            displacement: [String, Number]
        },
        data() {
            return {
                scole: 3
            };
        },
        computed: {
            maxDisplacement() {
                return parseFloat(this.displacement) * window.rem2px * this.scole;
            }
        },
        components: {},
        created() {
            this.touch = {};
            this.showDel = false;
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            touchstart(e) {
                let touch = e.touches[0];
                this.touch.pageX = touch.pageX;
                this.touch.pageY = touch.pageY;
            },
            touchmove(e) {
                let touch = e.touches[0];
                let displacement = touch.pageX - this.touch.pageX;

                let yDisplacement = touch.pageY - this.touch.pageY;

                if (Math.abs(yDisplacement) / Math.abs(displacement) > Math.tan(Math.PI / 180 * 15)) {
                    return
                }

                this.touch.displacement = displacement;
                let dom = this.$refs.main.querySelector(this.tag);
                if (displacement < 0 && this.showDel === false) {
                    if (displacement > (0 - this.maxDisplacement)) {
                        dom.style.transform = `translateX(${displacement / this.scole}px)`
                    }
                }
                if (displacement > 0 && this.showDel) {
                    if (displacement < this.maxDisplacement) {
                        dom.style.transform = `translateX(${(displacement - this.maxDisplacement) / this.scole}px)`
                    }
                }
            },
            touchend(e) {
                let dis = this.touch.displacement;
                let dom = this.$refs.main.querySelector(this.tag);
                if (dis < 0 && this.showDel === false) {
                    dom.style.transform = `translateX(${(0 - this.maxDisplacement) / this.scole}px)`;
                    this.showDel = true;
                }
                if (dis > 0 && this.showDel) {
                    dom.style.transform = `translateX(0px)`;
                    this.showDel = false;
                }

            },
        }
    };
</script>

<style scoped lang="scss">

</style>
