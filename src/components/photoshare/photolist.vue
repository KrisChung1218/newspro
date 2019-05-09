<template>
    <div class="mb">
        <head-nav title="图文分享"></head-nav>
        <div class="tabItem">
            <a  href="javascript:;" v-for="(item) in photoNav" @click="getImgs(item.tip)" v-text="item.title" :class="item.id==1001?'active':''" :key="item.id"></a>
        </div>
        <div class="tabCon">
            <div class="conList" :class="'show'">
                <ul>
                    <li v-for="(item) in womanStar" :key="item.id">
                        <router-link :to="{name:'photo.details',query:{id:item.id,title:item.tip}}">
                            <div class="pic ">
                                <img :src="item.picUrl" v-lazy="item.picUrl" alt="" width="100%" height="100%">
                            </div>
                            <div class="con ">
                                <h2 v-text="item.produce" style="text-align: left"></h2>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="conList">
                <ul>
                    <li v-for="(item) in manStar" :key="item.id">
                        <router-link :to="{name:'photo.details',query:{id:item.id,title:item.tip}}">
                            <div class="pic ">
                                <img :src="item.picUrl" v-lazy="item.picUrl" alt="" width="100%" height="100%">
                            </div>
                            <div class="con ">
                                <h2 v-text="item.produce" style="text-align: left"></h2>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="conList">
                <ul>
                    <li v-for="(item) in NBAStar" :key="item.id">
                        <router-link :to="{name:'photo.details',query:{id:item.id,title:item.tip}}">
                            <div class="pic ">
                                <img :src="item.picUrl" v-lazy="item.picUrl" alt="" width="100%" height="100%">
                            </div>
                            <div class="con ">
                                <h2 v-text="item.produce" style="text-align: left"></h2>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                photoNav:[],
                womanStar:[],
                manStar:[],
                NBAStar:[],
            }
        },
        created(){
            // 图文分享请求数据
            // this.$ajax.get(this.dataURL('vue.php','shareNav'))
            //     .then((res)=>{
            //         this.photoNav = res.data;
            //     });
            this.$ajax.get('http://127.0.0.1/photoNavList.php')
                .then((res) => {
                    // 请求图文导航栏数据
                    for(var i in res.data){
                       this.photoNav.push(res.data[i])
                    }
                })
            // 初始化请求女明星数据
            this.getImgs('nav1')
        },
        methods:{
            // getImgs(title){
            //     this.$ajax.get(this.dataURL('vue.php',title))
            //         .then((res)=>{
            //             this[title] = res.data;
            //             //调用tabActive方法
            //             this.tabActive();
            //         });
            // },
            getImgs(title){
                if(title == 'nav1'){
                    // 请求女明星数据列表
                    this.manStar = []
                    this.NBAStar = []
                    this.$ajax.get('http://127.0.0.1/womanStarList.php')
                        .then((res) => {
                            console.log(res.data)
                            for(var i in res.data){
                                this.womanStar.push(res.data[i])
                            }
                        })
                }else if(title == 'nav2'){
                    // 请求男明星数据列表
                    console.log('发送请求前')
                    this.womanStar = []
                    this.NBAStar = []
                    this.$ajax.get('http://127.0.0.1/manStarList.php')
                        .then((res) => {
                            console.log(res.data)
                            for(var i in res.data){
                                this.manStar.push(res.data[i])
                            }
                        })
                    console.log( this.manStar)
                    console.log('发送请求后')
                }else if(title == 'nav3'){
                    // 请求NBA球星数据列表
                    this.womanStar = []
                    this.manStar = []
                    this.$ajax.get('http://127.0.0.1/NBAStarList.php')
                        .then((res) => {
                            console.log(res.data)
                            for(var i in res.data){
                                this.NBAStar.push(res.data[i])
                            }
                        })
                }
                this.tabActive();
            },

            tabActive(){
                let tabItem = document.getElementsByClassName('tabItem')[0];
                let tabCon = document.getElementsByClassName('tabCon')[0];
                let conList = tabCon.getElementsByClassName('conList');
                let tabA = tabItem.getElementsByTagName('a');
                for( let i=0;i<tabA.length;i++ ){
                    tabA[i].index = i;
                    tabA[i].onclick = function () {
                        for(let j=0;j<tabA.length;j++){
                            tabA[j].className = '';
                            conList[j].style.display = 'none';
                        }
                        conList[this.index].style.display = 'block';
                        this.className = 'active'
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @rem:750/10rem;
    .mb{
        margin-bottom: 130/@rem;
    }
    .tabItem{
        font-size: 30/@rem;
        display: flex;


        a{
            flex: 1;
            color: #26a2ff;
            padding: 30/@rem 0;
        }
        a.active{
            border-bottom: 3px solid #26a2ff;
            color: #000;
        }


    }
    .tabCon{
        .conList{
            display: none;
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
                width: 140/@rem;
                height: 100/@rem;
                margin-right: 25/@rem;
            }
            .con{
                width: 550/@rem;
                height: 110/@rem;

                display: flex;
                align-items: center;
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
        .conList.show{
            display: block;
        }
    }
</style>
