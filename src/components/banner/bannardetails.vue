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
            this.$ajax.get('http://47.100.249.59/newsproDatas/bannerDetails.php', {
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
        margin-top: 10vw;
    }
.con{
    padding: 0 40/@rem;

    h2{
        text-align: left;
    }
    .title{
        font-size: 5vw;
        color: #3f4146;
        margin-top: 3vw;
    }
    .source{
        font-size: 4vw;
        float: left;
    }
    .time{
        font-size: 3.4vw;
        float: right;
    }
    .pic{
        display: block;
        margin: auto;
        width: 90vw;
    }
    .content{
        font-size: 4.5vw;
        text-align: left;
        text-indent: 7vw;
        margin-bottom: 20vw;
    }

}
</style>
