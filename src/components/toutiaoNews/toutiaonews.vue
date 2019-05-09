<template>
    <div class="newsList mb">
        <head-nav title="新闻列表"></head-nav>
        <ul>
            <li v-for="(item) in newsList">
                <a :href="item.url">
                    <div class="pic ">
                        <img :src="item.thumbnail_pic_s" v-lazy="item.thumbnail_pic_s" alt="" width="100%" height="100%">
                    </div>
                    <div class="con ">
                        <h2 v-text="item.title"></h2>
                        <p>
                            <span class="fl" v-text="item.date"></span>
                            <span class="fr">来源 {{item.author_name}}</span>
                        </p>
                    </div>
                </a>
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
            this.$ajax.get('/api/toutiao/index',{
                params:{
                    key: '95aae9eeea9e263289e02359e55e83a8'
                }
            })
                .then((res) => {
                    for(var i in res.data.result.data){
                        this.newsList.push(res.data.result.data[i])
                    }
                })

        },
        mounted(){

        },
    }
</script>

<style scoped lang="less">
    @rem:750/10rem;
    .mb{
        margin-bottom: 130/@rem;
    }
    .newsList{
        text-align: left;
        ul li{
            padding: 25/@rem 0;
            border-bottom: 1px solid #ddd;
        }
        a{
            /*display: block !important;*/
            display: flex;
            justify-content: center;
        }
        .pic{
            width: 130/@rem;
            height: 100/@rem;
            margin-right: 25/@rem;
        }
        .con{
            width: 550/@rem;
            height: 110/@rem;

            display: flex;
            flex-flow: wrap;
            align-content:space-between;
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
