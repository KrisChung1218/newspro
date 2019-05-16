<template>
    <div>
        <header>
            <a href="javascript:;" class="iconfont icon-fanhui2" @click="goBack">
                返回
            </a>
            <span>{{title}}</span>
            <a href="javascript:;" class="iconfont icon-diandian"></a>
        </header>
        <!--
            <mt-header >
                <router-link to="/" slot="left">
                    <mt-button icon="back">返回</mt-button>
                    {{title}}
                </router-link>

                <mt-button icon="more" slot="right"></mt-button>
            </mt-header>
        -->
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props:['title'], // 接收来自父级的参数
        created(){
            //console.log( this.$route.query )

        },
        methods:{
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="less">
    @rem:750/10rem;
    header{
        height: 10vw;
        background: #3c3f41;
        color: white !important;
        font-size: 3.7vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        letter-spacing: 2px;
        text-align: center;
        position: fixed;
        top: 10vw;
        width: 100%;
        z-index: 1000;
    }
    header a{
        width: 18vw;
        color: white !important;
    }
    .icon-fanhui2{
        font-size: 25/@rem
    }
</style>
