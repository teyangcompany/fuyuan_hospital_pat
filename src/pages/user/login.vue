<template>
    <div class="page">
        <app-header ref="header" class="noflex" title="登录">
            <i slot="back"></i>
        </app-header>
        <div class="wrapper" ref="main">
            <div class="userform">
                <dl>
                    <dt>
                        用户名
                    </dt>
                    <dd class="">
                        <div class="hd">
                            <input type="text" placeholder="请输入账户名">
                        </div>
                    </dd>
                </dl>
                <dl>
                    <dt>
                        密码
                    </dt>
                    <dd class="">
                        <div class="hd">
                            <input type="password" placeholder="请输入密码">
                        </div>
                    </dd>
                </dl>
                <dl class="btn">
                    <dt>
                        <a @click="login" class="weui-btn weui-btn_primary">立即登录</a>
                    </dt>
                </dl>
                <dl class="btn">
                    <dt class="overflow-hidden">
                        <router-link tag="a" to="" class="a float-left">忘记密码</router-link>
                        <router-link tag="a" to="/reg/step1" class="a float-right">立即注册</router-link>
                    </dt>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
    import {mainHeightMixin} from "../../lib/mixin"

    import AppHeader from "../../components/app-header.vue"

    import {tokenCache, fromCache} from "../../lib/cache"

    export default {
        mixins: [mainHeightMixin],
        data() {
            return {};
        },
        computed: {},
        components: {
            AppHeader
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            login() {
                tokenCache.set("demo");
                let from = fromCache.get();
                if (from) {
                    this.$router.push(from);
                } else {
                    this.$router.push("/");
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
