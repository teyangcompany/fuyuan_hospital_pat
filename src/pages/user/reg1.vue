<template>
    <div class="userform">
        <dl>
            <dt>
                手机号
            </dt>
            <dd class="">
                <div class="hd">
                    <input type="text" placeholder="请输入手机号">
                </div>
            </dd>
        </dl>
        <dl>
            <dt>
                验证码
            </dt>
            <dd class="">
                <div class="hd">
                    <input type="password" placeholder="请输入验证码">
                </div>
                <div class="ht">
                    <send-code></send-code>
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
