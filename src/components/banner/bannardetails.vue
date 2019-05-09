<template>
    <div class="mb">
        <head-nav title=""></head-nav>
        <div class="con">
            <h2 class="title" v-text="bannerDetails.title"></h2>
            <span class="source">{{bannerDetails.source}}</span>
            <span class="time" v-text="bannerDetails.time"></span>
            <img :src="bannerDetails.bannerUrl" alt="" class="pic">
            <div class="content" v-html="bannerDetails.des"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bannerDetails:{}
            }
        },
        created(){
            // 点击对应的轮播图 显示对应的详情
            // $route.query获取前端匹配后台数据的路由参数
            let id = this.$route.query.id;
            let title = this.$route.query.title;
            // console.log( this.dataURL('vue.php',title,id) )
            // this.$ajax.get(this.dataURL('vue.php',title,id))
            //     .then((res)=>{
            //         this.bannerDetails = res.data;
            //     })
            this.$ajax.get('http://127.0.0.1/bannerDetails.php', {
                bannerId : id,
                bannerTitle : title
            }).then((res) => {
                for(var i in res.data){
                    if(res.data[i].id == id){
                        this.bannerDetails = res.data[i]
                    }
                }
                console.log(this.bannerDetails)
            })
        }
    }
</script>

<style scoped lang="less">
    @rem:750/10rem;
    .mb{
        margin-bottom: 130/@rem;
    }
.con{
    padding: 0 40/@rem;

    h2{
        text-align: left;
    }
    .title{
        font-size: 40/@rem;
        color: #3f4146;
    }
    .source{
        font-size: 24/@rem;
    }
    .time{
        font-size: 20/@rem;
    }
    .pic{
        display: block;
        margin: auto;
        width: 670/@rem;
    }
    .content{
        font-size: 32/@rem;
        text-align: left;
        text-indent: 2em;
    }

}
</style>
