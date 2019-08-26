<template>
    <div id="app">
        <header></header>
        <header class="hd fixed" style="font-size:2vh;letter-spacing: 5px;">微闻世界，专属你的生活app</header>

        <router-view/>

        <!--footNav-->
        <footer class="ft">
            <router-link class="link" id="indexDefault" :to="{name:'index'}">
                <div class="svg iconfont icon-shouye"></div>
                <p>首页</p>
            </router-link>

            <router-link class="link"  :to="{name:'map'}">
                <div class="svg iconfont icon-ditu" ></div>
                <p >地图</p>
            </router-link>
            <router-link class="link"  :to="{name:'weather'}">
                <div class="svg iconfont icon-tianqichaxun"></div>
                <p>天气</p>
            </router-link>
            <router-link class="link"  :to="{name:'shopcart'}">
                <div class="svg iconfont icon-gouwuche count"><i class="showNum" v-if="this.pickNum">{{pickNum}}</i></div>
                <p>购物车</p>
            </router-link>
            <router-link class="link" :to="{name:'my'}">
                <div class="svg iconfont icon-weibiaoti2fuzhi12"></div>
                <p>我的课程</p>
            </router-link>
        </footer>
        <!--footNav-->
    </div>
</template>

<script>
    import connect from './components/common/connect'
    import shopTools from './components/common/shopTools'
    import { MessageBox } from 'mint-ui';
    import Index from './components/index'

    export default {
        data(){
            return {
                title:'',
                pickNum:shopTools.getShopCount(),
            }
        },
        computed:{
          // 监听状态
          num(){
              return this.$store.state.num
          }
        },
        created(){
            //适配
            remChange();
            window.addEventListener('resize',remChange);
            function remChange(){
                var html = document.getElementsByTagName('html')[0];
                var witdh = html.getBoundingClientRect().width;
                if( witdh >= 750 ){
                    witdh = 750;
                }
                html.style.fontSize = witdh / 10 +'px';
            }


            // let self = this;
            // // 父组件对子组件进行监听，子组件在点击加入购物车后将具体数值num传给父组件,父组件将值渲染在导航栏底部的购物车上
            // connect.$on('addCart',function (num) {
            //     //pickNum为页面渲染的值,num为用户选中商品加减的数值
            //     self.pickNum += num
            // });

            //ES6 获取上下文的变量,功能同上
            // 父组件对子组件进行监听，子组件在点击加入购物车后将具体数值num传给父组件,父组件将值渲染在导航栏底部的购物车上
            connect.$on('addCart',(num)=>{
                //pickNum为页面渲染的值,num为用户选中商品加减的数值
                this.pickNum += num;
            })
        },
        methods:{
            changeCityName(){
                console.log('gagagagag')
                MessageBox.prompt('', '确定执行此操作');
                MessageBox.prompt('请输入您要更换的城市名').then(({ value, action }) => {
                    MessageBox({
                        title: '',
                        message: '确定执行此操作?',
                        showCancelButton: true
                    });
                });
            }
        },

        component: {
            Index: Index
        }


    }
</script>

    <!--scoped 定义样式只在此模板有效-->
<style scoped lang="less">
    @rem:750/10rem;

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        max-width: 750px;
        height: 100%;
        margin: auto;
        position: relative;
        header{
            height: 10.5vw;
            line-height: 10.5vw;
            font-size: 30/@rem;
            color: white;
            background: #26a2ff;
        }
        header.fixed{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            margin: auto;
            height: 10.5vw;
            line-height: 10.5vw;
            width: 100%;
            z-index: 999;
            background: linear-gradient(90deg,rgba(255,160,135,1),rgba(239,128,109,1),rgba(197,117,194,1));
            color: #fff;
            box-shadow: 0px 8px 12px 0px rgba(239, 109, 128, 0.35);
        }
    }



    .ft{
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9;
        height: 13vw;
        background-image: -webkit-gradient(linear, left top, left bottom, from(#d9d9d9), color-stop(50%, #d9d9d9), color-stop(50%, transparent));
        background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 100% 1px;
        background-repeat: no-repeat;
        background-position: top left;

        background-color: #fafafa;
        display: flex;
        text-align: center;

        a{
            color: #18b4ed;
            text-decoration: none;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
        .link{
            display: block;
            /*padding: 7px 0;*/
            flex: 1;
            text-decoration: none;

        }
        .link .svg{
            margin: 1vw auto 0;
            font-size: 6vw;
        }

        .link p{
            color: inherit;
            font-size: 24/@rem;
            line-height: 1;
        }
        .icon {
            width: 1em;
            height: 1em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        }
        .count{
            position: relative;
        }
        .count .showNum{
            position: absolute;
            margin: auto;
            width: 4vw;
            height: 4vw;
            line-height: 4vw;
            background: red;
            color: #fff;
            font-size: 12px;
            border-radius: 50%;
            font-style: normal;
        }

        .fade-enter-active, .fade-leave-active {
            transition: opacity 0.2s;
        }
        .fade-enter, .fade-leave-to , .fade-leave-active below version  {
            opacity: 0;
        }

    }
</style>
