<template>
    <div class="userform">
        <dl>
            <dt>
                身份证号
            </dt>
            <dd class="">
                <div class="hd">
                    <input v-model="form.idCard" type="text" placeholder="请输入身份证号">
                </div>
            </dd>
        </dl>
    </div>
</template>

<script>
    import validate from "lmw-validate"
    import {mapGetters, mapMutations} from "vuex"
    import * as types from "../../store/types"

    export default {
        data() {
            return {
                form: {
                    idCard: ""
                }
            };
        },
        computed: {
            ...mapGetters([types.USER_REG_FORM])
        },
        components: {},
        created() {
            this.$watch("form", (val) => {
                let newF = Object.assign({}, this[types.USER_REG_FORM], val);
                this.changeForm(newF);
            }, {deep: true});
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            ...mapMutations({
                changeForm: types.USER_REG_FORM
            })
        }
    };
</script>

<style scoped lang="scss">

</style>
