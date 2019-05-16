<template>
    <div class="newsList mb">
        <head-nav title="新闻列表"></head-nav>
        <ul>
            <li v-for="(item) in newsList" :key="item.id">
                <router-link :to="{name:'news.details',query:{id:item.id,title:'newsList'}}">
                    <div class="pic ">
                        <img :src="item.picUrl" v-lazy="item.picUrl" alt="" width="100%" height="100%">
                    </div>
                    <div class="con ">
                        <h2 v-text="item.title"></h2>
                        <p>
                            <span class="fl" v-text="item.time"></span>
                            <span class="fr">来源 {{item.source}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                newsList:[],
            }
        },
        created(){
            //  新闻列表
            // console.log( this.dataURL('vue.php','newsList') )
            // this.$ajax.get(this.dataURL('vue.php','newsList'))
            //     .then((res)=>{
            //         this.newsList = res.data;
            //     })
            this.$ajax.get('http://47.100.249.59/newsproDatas/newsList.php')
                .then((res) => {
                    console.log(res.data)
                    for(var i in res.data){
                        this.newsList.push(res.data[i])
                    }
                    console.log(this.newsList)
                })



        },
        mounted(){

        },
    }
</script>

<style scoped lang="less">
    @rem:750/10rem;
    .mb{
        margin-bottom: 20vw;
        margin-top: 10vw;
    }
    .newsList{
        text-align: left;
        ul li{
            padding: 3vw 0;
            border-bottom: 1px solid #ddd;
        }
        a{
            /*display: block !important;*/
            display: flex;
            justify-content: center;
        }
        .pic{
            width: 18vw;
            height: 13vw;
            margin-right: 3vw;
        }
        .con{
            width: 70vw;
            height: 14vw;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-flow: wrap;
            flex-flow: wrap;
            -ms-flex-line-pack: justify;
            align-content: space-between;
        }
        h2{
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #555;
            font-weight: normal;
            font-size: 25/@rem;
        }
        p{
            width: 100%;
            color: #999;
            font-size: 22/@rem;
        }
        p span{
            /*-padding: 0 25/@rem;*/
        }
    }
</style>
