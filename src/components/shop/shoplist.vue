<template>
    <div class="mb">
        <head-nav title="商品"></head-nav>
        <!--likeYou-->
        <section class="likeYou " >
            <ul id="likeYouList" class="aui-refresh-content">
                <li v-for="(item,index) in shopList" :key="index">
                    <router-link :to="{name:'shop.shopdetails',query:{id:(index+1),title:'likeYou'}}" :title="item.des">
                        <div class="pic"><img width="100%" height="100%" :src="item.imgUrl" v-lazy="item.imgUrl" ></div>
                        <p class="des" v-text="item.des"></p>
                        <div class="shopPrice clearFix">
                            <div class="left fl"><span class="symbol" v-text="item.symbol"></span><span class="price" v-text="item.price"></span></div>
                            <div class="alreadyPaid fr" v-text="item.alreadyPaid"></div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import '../../../static/aui/css/aui.2.0.css'
    import '../../../static/aui/css/aui-pull-refresh.css'
    import '../../../static/aui/script/aui-pull-refresh'
    export default {
        data() {
            return {
                shopList:[]
            }
        },
        mounted(){},
        created(){
            // 请求数据
            this.$ajax.get('http://47.100.249.59/newsproDatas/shopList.php')
                .then((res) => {
                    for(var i in res.data){
                        this.shopList.push(res.data[i])
                    }
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
    /*likeYou*/
.likeYou{
        overflow: hidden;
        position: relative;
        padding-top: 4vw;
        background: #eee;
    ul{
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    ul li{
        width: 49vw;
        height: 70vw;
        background: white;
        font-size: 3.5vw !important;
        overflow: hidden;
        margin-bottom: 3vw;
    }
    ul li a{
        display: block;
    }
    ul li .pic{
        height: 50vw;
    }

    ul li .des{
        font-size: 3vw !important;
        padding:0 3vw;
        margin: 2vw 0;
        height: 8vw;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 10vw;
        -webkit-line-clamp: 2;
        word-break: break-all;
        line-height: 1.3;
        color: rgb(51, 51, 51);
    }

    ul li .shopPrice{
        padding: 14/@rem;
        padding-bottom: 0;
    }
    ul li .left{
        color: #ff5000;
    }
    ul li .left span{
        vertical-align: bottom;
    }
    ul li .symbol{
    }
    ul li .price{
    }
    ul li .alreadyPaid{
        color: rgb(153, 153, 153);;
    }
}
</style>
