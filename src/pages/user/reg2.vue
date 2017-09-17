<template>
    <div class="userform">
        <dl>
            <dt>
                身份证号
            </dt>
            <dd class="">
                <div class="hd">
                    <input type="text" placeholder="请输入身份证号">
                </div>
            </dd>
        </dl>
    </div>
</template>

<script>
    import SendCode from '../../components/code.vue'

    export default {
        data() {
            return {};
        },
        computed: {},
        components: {
            SendCode
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {}
    };
</script>

<style scoped lang="scss">

</style>
