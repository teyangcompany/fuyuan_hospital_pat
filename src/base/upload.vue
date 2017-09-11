<template>
    <div class="upload relative">
        <input multiple="multiple" type="file" class="absolute" @change="change($event)">
    </div>
</template>

<script>
    import {fileClass} from "../lib/class"
    import {queue} from "d3-queue"


    export default {
        props: {
            server: String,
            params: Object,
            service: String,
            module: String,
            fileType: String
        },
        data() {
            return {
                queueList: []
            };
        },
        computed: {
            options() {
                let op = Object.assign({}, this.params, {
                    service: this.service
                });
                this.module && (op.module = this.module);
                this.fileType && (op.fileType = this.fileType);
                return op;
            }
        },
        components: {},
        created() {
            this.queue = null;
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            change(e) {
                let files = e.target.files;
                this.queue = queue(1);
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];
                    this.added(file);
                }
                this.queue.awaitAll(this.awaitAll)
            },
            added(file) {
                let fileObj = new fileClass(file);
                this.queue.defer(this.queued, fileObj);
                this.$emit("added", fileObj);
            },
            queued(file, cb) {
                let form = new FormData();
                form.append("file", file.file);

                for (let key in this.options) {
                    form.append(key, this.options[key]);
                }


                let xhr = new XMLHttpRequest();
                xhr.open("POST", this.server);

                xhr.setRequestHeader("sign", "test");

                xhr.onreadystatechange = (res) => {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            let ret = xhr.response || xhr.responseText || {};
                            ret = typeof ret == "string" ? JSON.parse(ret) : ret;
                            if (ret.code == 0) {
                                file.setUrl(ret.obj.attaFileUrl);
                            }
                            this.$emit("success", file, ret);
                            cb(null, ret);
                        }
                    }
                };
                xhr.upload.onprogress = (res) => {
                    this.$emit("progress", file, res);
                };
                xhr.onerror = (error) => {
                    throw error;
                };

                xhr.send(form);
            },
            awaitAll(error, res) {
                this.$emit("complete", res);
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
