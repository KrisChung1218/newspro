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
            this.$ajax.get('http://47.100.249.59/newsproDatas/photoNavList.php')
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

                    this.$ajax.get('http://47.100.249.59/newsproDatas/womanStarList.php')
                        .then((res) => {
                            console.log(res.data)
                            for(var i in res.data){
                                this.womanStar.push(res.data[i])
                            }
                            this.manStar = []
                            this.NBAStar = []
                        })
                }else if(title == 'nav2'){
                    // 请求男明星数据列表
                    this.$ajax.get('http://47.100.249.59/newsproDatas/manStarList.php')
                        .then((res) => {
                            for(var i in res.data){
                                this.manStar.push(res.data[i])
                            }
                            this.womanStar = []
                            this.NBAStar = []
                        })
                }else if(title == 'nav3'){
                    // 请求NBA球星数据列表

                    this.$ajax.get('http://47.100.249.59/newsproDatas/NBAStarList.php')
                        .then((res) => {
                            for(var i in res.data){
                                this.NBAStar.push(res.data[i])
                            }
                            this.womanStar = []
                            this.manStar = []
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
        margin-top: 10vw;
    }
    .tabItem{
        font-size: 3.5vw;
        display: flex;


        a{
            flex: 1;
            color: #26a2ff;
            padding: 2.5vw 0;
            height: 11vw;
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
                margin-right: 4vw;
            }
            .con{
                width: 70vw;
                height: 13vw;

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
                font-size: 3.5vw;
            }
        }
        .conList.show{
            display: block;
        }
    }
</style>
