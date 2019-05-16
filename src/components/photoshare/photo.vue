<template>
    <div class="mb">
        <head-nav title="图片详情"></head-nav>
        <div class="photoImgs">
            <img class="preview-img" height="300" :key="index" v-for="(item,index) in picList" :src="item.picUrl"
                 @click="$preview.open(index,picList)" v-lazy="item.picUrl"/>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                picList: []
            }
        },
        created() {
            //请求数据
            let id = this.$route.query.id;
            let title = this.$route.query.title;
            // this.$ajax.get(this.dataURL('vue.php', title, id))
            //     .then((res) => {
            //         res.data.forEach((item, index) => {
            //             item.src = item.picUrl
            //             item.w = 600
            //             item.h = 400
            //         });
            //
            //         this.picList = res.data;
            //     })
            this.$ajax.get('http://47.100.249.59/newsproDatas/photos.php')
                .then((res) => {
                    console.log(res.data)
                    for(var i in res.data){
                        if(i == title){
                            this.picList = res.data[i]
                        }
                    }
                })
        },
        methods: {}
    }
</script>

<style lang="less">
    @rem: 750/10rem;
    .mb {
        margin-bottom: 130/@rem;
        margin-top: 10vw;
    }

    .photoImgs {
        padding: 40/@rem 40/@rem 0;
        background: white;
        position: relative;
        img {
            display: block;
            width: 90vw;
            margin-bottom: 4vw;
            object-fit: cover;
        }
    }
</style>
