<template>
    <div>
        <head-nav title="结算购物车"></head-nav>

        <div class="shopArea mb">
            <p class="location clearFix" v-if="location">
                <span class="fl">送到地点: {{location}}</span>
                <span class="fr">编辑地址</span>
            </p>
            <div class="shop " v-for="(item,index) in shopList" :key="index">
                <div class="shopShow">
                    <div class="pic ">
                        <img :src="item.imgUrl" width="100%" height="100%" alt="">
                    </div>
                    <div class="des ">{{item.des}}</div>
                </div>

                <div class="buyNum ">
                    <p class=" buyfont">{{item.symbol}} {{item.price}}</p>
                    <p class="addNum ">
                        <a href="javascript:;" class="reduce" @click="shopReduce(index)">-</a>
                        <a href="javascript:;" class="num" >{{item.num}}</a>
                        <a href="javascript:;" class="add" @click="shopAdd(index)">+</a>
                    </p>
                    <a href="javascript:;" class="del" @click="del(index)">删除</a>
                </div>
            </div>
            <div class="totalPrice">
                <!--一共 {{totalPrice.num}} 件, 共计 {{totalPrice.sum}} 元-->
                <!--<div class="all">
                    <i></i>
                    <span>全选</span>
                </div>-->
                <div class="total">
                    <p class="totalMoney">
                        <span class="font">总计:</span> <span>￥{{totalPrice.sum}}</span>
                    </p>
                    <p class="preferential">
                        总金额￥{{totalPrice.sum}} 优惠￥0.00
                    </p>
                </div>
                <div class="goPayment">
                    <span class="font">去结算</span><span class="num">({{totalPrice.num}}件)</span>
                </div>
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
                location:'',
                shopList:[]
            }
        },
        created(){
            //获取本地缓存中的商品信息
            let shop = shopTools.getShop();
            // 将缓存数据键值对存在一个数组内(用户加入购物车的商品序号)
            let idArr = Object.keys(shop);
            let title = this.$route.query.title || 'likeYou';
            idArr.forEach((item,index)=>{
                // 遍历商品序号查找商品数据并加入到shopList数组中
                this.$ajax.get('hhttp://47.100.249.59/newsproDatas/shopDetails.php')
                    .then((res) => {
                        // 遍历所有商品序号查找被加入购物车的商品
                        for(var i in res.data){
                            if(res.data[i].id == item){
                                // 初始化本地缓存中用户选定的商品件数为购物车初始件数
                                res.data[i].num = shop[item]
                                this.shopList.push(res.data[i])
                            }
                        }
                    })

                // this.$ajax.get(this.dataURL('vue.php',title,item))
                //     .then((res)=>{
                //
                //         this.shopList.push(res.data);
                //         // 获取购物车内商品数量
                //         this.shopList.forEach((item,index)=>{
                //             if(shop[item.id]){
                //                 //$set 方法让对象中属性为num 的数据(item)重置为shop[item.id]的值
                //                 this.$set(item,'num',shop[item.id])
                //             }
                //         })
                //     })
            })


        },
        computed:{
            totalPrice(){
                let sum = 0;
                let num = 0;
                this.shopList.forEach((item)=>{
                    sum += item.num * item.price
                    num += item.num
                });

                return {
                    sum:sum,
                    num:num
                }
            }
        },
        methods:{
            shopReduce(i){   //  商品数量减少(减号事件)
                //通过索引值找到对应的商品条再对其数量进行操作
                if(this.shopList[i].num <= 1) return;
                this.shopList[i].num --;
                //子组件与父组件之间的通信,购物车减少商品数量购物车提示数据也应对应减少
                connect.$emit('addCart',-1);

                //对购物车界面数据操作后的实时更新数据操作
                shopTools.addUpdate({
                    id:this.shopList[i].id,
                    num:-1
                })
            },
            shopAdd(i){     //   商品数量增加(加号事件)
                this.shopList[i].num ++;
                connect.$emit('addCart',1);

                shopTools.addUpdate({
                    id:this.shopList[i].id,
                    num:1
                })
            },
            del(i){
                //获取当前点击删除的商品条
                let shops = this.shopList[i];
                //调用封装方法
                shopTools.delete(shops.id);
                // 子组件传值给父组件让其渲染页面的数据和购物车提示数据做出相应更新
                connect.$emit('addCart',-shops.num) ;
                // 调用splice方法将数组中对应i索引的商品条信息在页面中立即渲染更新
                this.shopList.splice(i,1)
            }
        }
    }
</script>

<style scoped lang="less">
@rem:750/10rem;
.mb{
    margin-bottom: 130/@rem;
    margin-top: 10vw;
}
.shopArea{
    text-align: left;
    background: #fff;
    overflow-y: scroll;
    padding-bottom: 30vw;

    .location{
        font-size: 32/@rem;
        color: #ccc;
        padding: 10/@rem;
        padding: 20/@rem 55/@rem;
    }
    .shop{
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
        padding: 0 55/@rem;
        .shopShow{
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;
            padding: 25/@rem 0;
            .pic{
                width: 25vw;
                height: 28vw;
            }
            .des{
                width: 54vw;
                font-size: 4vw;
            }
        }

        .buyNum{
            border-top: 1px solid #ddd;
            border-left: none;
            border-right: none;
            padding: 3vw 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .buyfont{
                font-size: 4vw;
            }
            .addNum{
                font-size: 3.5vw;
                a{
                    width: 7vw;
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
            .del{
                color: skyblue;
                font-size: 3.5vw;
            }
        }
    }

    .totalPrice{
        height: 13vw;
        text-align: center;
        display: flex;
        line-height: 13vw;
        justify-content: space-between;
        margin-top: 8vw;
        background: rgba(255,255,255,0.7);
        box-shadow: 0 -1px 2px #d7d7d7;
        /*align-items: center;*/

        .total{
            text-align: left;
            text-indent: 4vw;
            p{
                height: 50%;
                font-size: 4vw;
                line-height: 8vw;
                color: #999;
            }
            .totalMoney{
                color: #e4393c;
                font-weight: bold;
                .font{
                    color: #333;
                }
            }
            .preferential{
                font-size: 3vw;
            }
        }
        .goPayment{
            width: 24vw;
            background: #e4393c;
            color: #fff;
            span{
                vertical-align: middle;
            }
            .font{
                font-size: 3.5vw;
            }
            .num{
                font-size: 3.3vw;
            }

        }
    }
}

</style>
