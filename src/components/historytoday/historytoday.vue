<template>
    <div class="bg">
        <head-nav title=""></head-nav>
        <div class="top">
            <p style="font-size:25px;color: #000;font-weight: bold;font-family: '楷体'">历史上的今日</p>
            <p style="font-size:20px;color: #000;font-weight: bold;font-family: '楷体'">…………</p>
        </div>
        <div class="box" v-for="(item,index) in messages" :key="index">
            <div class="title">
                {{item.title}}
            </div>
            <div class="content">
                <div class="img" v-if="item.pic">
                    <img :src="item.pic" alt="" style="border-radius: 10px;">
                </div>
                <div class="time">
                    <span style="float: left;margin-left: 1vw;">{{item.lunar}}</span>
                    <span style="float: right;margin-right: 1vw;">{{item.year}}.{{item.month}}.{{item.day}}</span>
                </div>
                <div class="text">
                    {{item.des}}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "historytoday",
        data(){
            return {
                messages:[],
                date: '',
                month: ''
            }
        },
        created(){
            var date = new Date().getDate()
            var month = new Date().getMonth()+1
            this.date = date
            this.month = month
            // 调用数据接口
            this.$ajax.get('/apii/japi/toh',{
                params:{
                    key:'cf4b99e1afa080f2cc93d66114dde526',
                    v:'1.0',
                    month: this.month,
                    day: this.date
                }
            }).then((res) => {
                console.log(res.data.result)
                for(var i of res.data.result){
                    this.messages.push(i)
                }
            })
        }

    }
</script>

<style scoped>
    .bg{
        height: 100%;
        /*background: -webkit-linear-gradient(*/

                /*#394984,*/
                /*#edb46d*/
        /*) !important;*/
        background:#F5F5F5;
    }
    .box{
        width: 95%;
        height: auto;
        /* background-image: linear-gradient(0deg,#fff,#fff),linear-gradient(80deg,rgba(177,218,243,1),rgba(236,125,112,1),rgba(191,138,182,1),rgba(255,246,158,1)); */
        /* background-clip: padding-box,border-box; */
        border: 1px solid transparent;
        border-radius: 7px;
        /* -webkit-box-shadow: 6px 4px 6px 0px rgba(239, 109, 128, 0.35); */
        box-shadow: 1px 0px 12px 2px rgba(43, 43, 43, 0.2);
        margin: 10vw auto;
    }
    .box .title{
        width: 80%;
        height: 12vw;
        margin: 0 auto;
        font-size: 18px;
        font-family: '微软雅黑';
        line-height: 12vw;
        font-weight: bold;
    }
    .box .content{
        width: 95%;
        height: auto;
        margin: 0 auto;
    }
    .box .content .img{
        width:100%;
    }
    .img img{
        width: 100%;
    }
    .time{
        width: 100%;
        height: 30px;
        font-size: 15px;
        line-height: 30px;
        margin-top: -3vw;
        font-family: '微软雅黑';
    }
    .text{
        width: 100%;
        height: auto;
        font-size: 18px;
        border: 1px solid transparent;
        font-family: '微软雅黑';
        margin-top: 2vw;
        margin-bottom: 2vw;
        text-align: left;
    }
    .top{
        margin-top: 5vw;
        margin-right: auto;
        margin-left: auto;
        width: 95%;
        background: beige;
        border-radius: 5px;
        padding:2vw
    }

</style>