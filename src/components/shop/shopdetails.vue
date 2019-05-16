<template>

    <div class="mb ">
        <head-nav title="商品详情"></head-nav>
        <div class="shopdedatils" v-if="newsDetails">
            <img :src="newsDetails.imgUrl" width="80%" >
            <h3 v-text="newsDetails.des"></h3>
            <p class="money">
                <span class="symbol" v-text="newsDetails.symbol"></span>
                <span class="price" v-text="newsDetails.price"></span>
            </p>
            <p class="courier">快递：包邮 <span class="fr" v-text="newsDetails.alreadyPaid"></span></p>
            <div class="buyNum clearFix">
                <p class="fl buyfont">购买数量</p>
                <p class="addNum fr">
                    <a href="javascript:;" class="reduce" @click="shopReduce">-</a>
                    <a href="javascript:;" class="num">{{num}}</a>
                    <a href="javascript:;" class="add" @click="shopAdd">+</a>
                </p>
            </div>
            <div class="buy">
                <a href="javascript:;" class="addCart" @click="addCart">加入购物车</a>
                <router-link :to="{name:'shopcart',query:{title:'likeYou'}}" class="nowBuy" @click="nowBuy">立即购买</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import connect from '../common/connect'
    import shopTools from '../common/shopTools'

    export default {
        data() {
            return {
                newsDetails:{},
                num:0,
                index:0
            }
        },
        computed:{
            // 监听状态变量
          cartCount(){
              // return this.$store.state.num
          }
        },
        created(){
            // 获取商品列表点击后的参数id
            let index = this.$route.query.id;
            if(index){
                //如果参数id存在,即用户点击了商品列表中的商品,则请求数据
                let title = this.$route.query.title;
                // this.$ajax.get( this.dataURL('vue.php',title,index) )
                //     .then((res)=>{
                //         res.data['id'] = index;  //方便把商品加入到购物车,根据id
                //         this.newsDetails = res.data;
                //     })
                this.$ajax.get('http://47.100.249.59/newsproDatas/shopDetails.php')
                    .then((res) => {
                        for(var i in res.data){
                            if(res.data[i].id == index){
                                res.data[i].num = index
                                this.newsDetails = res.data[i]
                            }
                        }
                    })
            }

        },
        methods:{
            addCart(){  //加入购物车
                //子组件传值给父组件，父组件进行监听并将值渲染到页面
                connect.$emit('addCart',this.num);
                //点击加入购物车后将商品信息保存
                shopTools.addUpdate({
                    id:this.newsDetails.id,
                    num:this.num
                })
            },
            nowBuy(){   //立即购买

            },
            shopReduce(){   //商品数量减少
                //提交状态管理事件
                //this.$store.commit('reduceCartCount');
                if(this.num <= 0) return
                this.num --
            },
            shopAdd(){  // 商品数量增加
                //this.$store.commit('addCartCount');
                if(this.num >= 20) return;
                this.num ++
            },
        }
    }
</script>

<style scoped lang="less">
    @rem:750/10rem;
    .mb{
        margin-bottom: 0;
        margin-top: 10vw;
        height: 79%;
    }
    .shopdedatils{
        padding: 22/@rem;
        position: relative;
        text-align: left;
        height: 100%;
        background: white;
        img{
            display: block;
            margin: auto;
        }
        h3{
            font-size: 4.5vw;
        }
        .money{
            color: red;
            margin-top: 6vw;
            .symbol{
                font-size: 5vw;
            }
            .price{
                font-size: 6vw;
            }
        }
        .courier{
            font-size: 3.5vw;
            color: #999;
        }
        .buyNum{
            border: 1px solid #e7e7e7;
            border-left: none;
            border-right: none;

            padding: 2vw;
            .buyfont{
                font-size: 3.5vw;
                line-height: 2.5;
            }
            .addNum{
                font-size: 5vw;
                a{
                    width: 8vw;
                    height: 7vw;
                    line-height: 7vw;
                    background: #f1f1f1;
                    display: inline-block;
                    color: #878787;
                    text-align: center;
                }
                a:active{
                    background: #ddd;
                }
            }
        }
        .buy{
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            height: 9vw;
            text-align: center;
            line-height: 9vw;
            margin-top: 3vw;
            a{
                flex: 1;
                color: white;
                font-size: 3.6vw;
                letter-spacing: 1px;
            }
            .addCart{
                background: #ff9402;
            }
            .nowBuy{
                background: #ff5000;
            }
        }
    }
</style>
