<template>
    <div class="mb">
        <head-nav title="新闻详情"></head-nav>
        <div class="con ">
            <h2 class="title" v-text="newsDetails.title" style="margin-top:2vh;margin-bottom: 2vh"></h2>
            <span class="time" v-text="newsDetails.time" style="float: left;"></span>
            <span class="source" style="float: right">{{newsDetails.source}}</span>

            <img :src="newsDetails.picUrl" alt="" class="pic" style="margin-bottom: 2vh">
            <div class="content" v-html="newsDetails.content"></div>
            <p class="editor">
                <span>{{newsDetails.reporter}}</span>
                <span style="margin-bottom: 3vh">责任编辑: {{newsDetails.editor}}</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                newsDetails:{}
            }
        },
        created(){
            // 点击对应的新闻 显示对应的详情
            let id = this.$route.query.id;
            let title = this.$route.query.title;
            //newsList为父组件title
            // this.$ajax.get(this.dataURL('vue.php',title,id))
            //     .then((res)=>{
            //         // console.log(res.data);
            //         this.newsDetails = res.data;
            //     })
            this.$ajax.get('http://47.100.249.59/newsproDatas/newsDetails.php', {
                newsId : id,
                newsTitle : title
            }).then((res) => {
                console.log(res.data)
                console.log(id)
                for(var i in res.data){
                    if(res.data[i].id == id) {
                        this.newsDetails = res.data[i]
                    }
                }
                console.log(this.newsDetails)

            })
        }
    }
</script>

<style scoped lang="less">
    @rem:750/10rem;
    .mb{
        margin-bottom: 20vw;
        margin-top: 10vw;
    }
    .con{
        padding: 0 5vw;
        h2{
            text-align: left;
        }
        .title{
            font-size: 5vw;
            color: #3f4146;
        }
        .source{
            font-size: 4vw;
        }
        .time{
            font-size: 3.5vw;
        }
        .pic{
            display: block;
            margin: auto;
            width: 89vw;
        }
        .content{
            font-size: 4.5vw;
            text-align: left;
            text-indent: 5vw;
            margin-bottom: 5vh;
        }
        .editor{
            display: flex;
            justify-content: space-between;
            color: #9d9ea3;
            font-size: 22/@rem;
            margin-bottom: 5vh;
        }

    }
</style>
