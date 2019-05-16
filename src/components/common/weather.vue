<template>
    <div class="bg">

        <div class="weather">
            <div class="address">{{cityInfo.c9}} {{cityInfo.c7}} {{cityInfo.c5}}</div>

            <div class="clearFix">
                <div id="date" class=" on" >
                    <div class="date_main clearfix">
                        <div class="date_left" @click="adressSelectShow">
                            <div class="location">{{cityname}}</div>
                            <div class="main">
                                <p class="month" id="month"></p>
                                <p class="date" id="day"></p>
                            </div>
                        </div>
                        <div class="date_right">
                            <p class="time" id="time"></p>
                            <p class="date" id="year"></p>
                            <p class="week" id="week"></p>
                        </div>
                    </div>
                    <div class="date_close" id="date_close" ></div>
                </div>
            </div>

            <ul class="weatherList">
                <li>
                    <p class="week">今天 (实时)</p>
                    <p class="day">{{nowDay.month}}{{nowDay.date}}(周{{nowDay.day}} )</p>
                    <div class="pic"><img :src="this.fimg[0]" width="100%" height="100%" alt=""></div>
                    <p class="temperature"> {{f1.temperature}}</p>
                    <p class="nowWeather">{{f1.weather}}</p>
                    <p class="windDir">{{f1.wind_direction}}</p>
                    <p class="humidity">空气湿度 {{this.humidity}}</p>
                </li>
                <li>
                    <p class="week">明天</p>
                    <p class="day">{{Tomorrow.month}}{{Tomorrow.date}}(周{{Tomorrow.day}})</p>
                    <div class="pic"><img :src="this.fimg[1]" width="100%" height="100%" alt=""></div>
                    <p class="temperature">{{f2.temperature}}</p>
                    <p class="nowWeather">{{f2.weather}}</p>
                    <p class="windDir">{{f2.wind_direction}}</p>
                    <p class="humidity">{{f2.wind}}</p>
                </li>
                <li>
                    <p class="week">后天</p>
                    <p class="day">{{twoTomorrow.month}}{{twoTomorrow.date}}(周{{twoTomorrow.day}})</p>
                    <div class="pic"><img :src="this.fimg[2]" width="100%" height="100%" alt=""></div>
                    <p class="temperature">{{f3.temperature}}</p>
                    <p class="nowWeather">{{f3.weather}}</p>
                    <p class="windDir">{{f3.wind_direction}}</p>
                    <p class="humidity">{{f3.wind}}</p>
                </li>
            </ul>
        </div>
        <div style="width: 75%;color: rgb(255, 255, 255);text-align: left;height: 60px;line-height: 1.3;font-size: 3.5vw;text-indent: 7vw;margin:5vw auto">
            tips:{{tips}}
        </div>
        <van-picker style="position: fixed;bottom: 15vw;width: 100%;" v-if="this.adressisShow" :columns="columns" show-toolbar title="请选择城市" @change="onChange" @cancel="onCancel" @confirm="onConfirm"/>
    </div>

</template>

<script>
    import '../../../static/css/date.css';
    export default {
        data() {
            return {
                cityInfo:{},
                now:{},
                f1:{},
                f2:{},
                f3:{},
                adressisShow:false,
                fimg:[],
                nowDay:{},
                Tomorrow:{},
                twoTomorrow:{},
                tips:'',
                columns: [],
                images:[
                    '../../../static/image/duoyun.png',
                    '../../../static/image/leizhenyu.png',
                    '../../../static/image/qing.png',
                    '../../../static/image/wu.png',
                    '../../../static/image/xue.png',
                    '../../../static/image/yin.png',
                    '../../../static/image/yujiaxue.png',
                    '../../../static/image/zhenyu.png'
                ],
                cityname: '黄山市',
                citySelected:'',
                humidity: null
            }
        },
        created(){
            let dataArr = [this.nowDay,this.Tomorrow,this.twoTomorrow];
            let arr = ['天','一','二','三','四','五','六','七','八','九','十','十一','十二'];
            let date = new Date;
            dataArr.forEach((item,index)=>{
                item['day'] = arr[(date.getDay()+index)%7];
                item['month'] = (date.getMonth()+1) + '月';
                item['date'] = (date.getDate()+index) +'日';
            });

            let timePlay = ()=>{
                date = new Date;
                this.$jq('#time').html(zero(date.getHours())+' : '+zero(date.getMinutes())+' : '+zero(date.getSeconds()));
                this.$jq('#year').html(date.getFullYear() + '年' + zero((date.getMonth()+1)) + '月' + zero(date.getDate()) + '日');
                this.$jq('#week').html('星期' + arr[date.getDay()]);
                this.$jq('#month').html(arr[(date.getMonth()+1)] + '月');
                this.$jq('#day').html(date.getDate());
            };

            setInterval(timePlay,1000);
            timePlay();

            function zero( num ){
                if ( num < 10 ){
                    return '0'+num;
                }else{
                    return num;
                }
            };


            // 页面加载调用一次天气数据请求
            // this.ajaxWeatherInfo()

            //获取所有城市名列表
            this.$ajax.get('../../../static/area.json').then((res) => {
                for(var i of res.data.city){
                    if(i.text.includes('市')){
                        this.columns.push(i.text)
                    }
                }
            })



        },
        methods: {
            onChange(picker, value, index) {
                this.citySelected = value
            },
            onConfirm(){
                this.cityname = this.citySelected;
                this.adressisShow = false
                // 获取天气预报接口数据
                // this.$ajax.get('api/weather/index',{
                //     params:{
                //         "cityname": this.cityname,
                //         "dtype": "",
                //         "format": "2",
                //         "key": "c2c2a7e911d13ea33cd2456ff3a6fb3f"
                //     }
                // }).then((res) => {
                //     this.f1 = res.data.result.future[0]
                //     this.f2= res.data.result.future[1]
                //     this.f3 = res.data.result.future[2]
                //     this.humidity = res.data.result.sk.humidity
                //     this.tips = res.data.result.today.dressing_advice
                //     for(var i=0;i<3;i++){
                //         if(res.data.result.future[i].weather == '多云'){
                //             this.fimg[i] = this.images[0]
                //         }else if(res.data.result.future[i].weather.includes('雷')){
                //             this.fimg[i] = this.images[1]
                //         }else if(res.data.result.future[i].weather.includes('晴')){
                //             this.fimg[i] = this.images[2]
                //         }else if(res.data.result.future[i].weather.includes('雾')){
                //             this.fimg[i] = this.images[3]
                //         }else if(res.data.result.future[i].weather.includes('雪')){
                //             this.fimg[i] = this.images[4]
                //         }else if(res.data.result.future[i].weather.includes('阴')){
                //             this.fimg[i] = this.images[5]
                //         }else if(res.data.result.future[i].weather.includes('雨夹雪')){
                //             this.fimg[i] = this.images[6]
                //         }else if(res.data.result.future[i].weather.includes('雨') && res.data.result.future[0].weather.indexOf('雷') == -1){
                //             this.fimg[i] = this.images[7]
                //         }else{
                //             this.fimg[i] = this.images[5]
                //         }
                //     }
                // })
            },
            onCancel(){
                this.adressisShow = false
            },
            adressSelectShow(){
                // 默认选中第一个地点
                this.citySelected = this.columns[0]
                this.adressisShow = true
            },
            ajaxWeatherInfo(){
                // 获取天气预报接口数据
                this.$ajax.get('api/weather/index',{
                    params:{
                        "cityname": this.cityname,
                        "dtype": "",
                        "format": "2",
                        "key": "c2c2a7e911d13ea33cd2456ff3a6fb3f"
                    }
                }).then((res) => {
                    this.f1 = res.data.result.future[0]
                    this.f2= res.data.result.future[1]
                    this.f3 = res.data.result.future[2]
                    this.humidity = res.data.result.sk.humidity
                    this.tips = res.data.result.today.dressing_advice
                    for(var i=0;i<3;i++){
                        if(res.data.result.future[i].weather == '多云'){
                            this.fimg[i] = this.images[0]
                        }else if(res.data.result.future[i].weather.includes('雷')){
                            this.fimg[i] = this.images[1]
                        }else if(res.data.result.future[i].weather.includes('晴')){
                            this.fimg[i] = this.images[2]
                        }else if(res.data.result.future[i].weather.includes('雾')){
                            this.fimg[i] = this.images[3]
                        }else if(res.data.result.future[i].weather.includes('雪')){
                            this.fimg[i] = this.images[4]
                        }else if(res.data.result.future[i].weather.includes('阴')){
                            this.fimg[i] = this.images[5]
                        }else if(res.data.result.future[i].weather.includes('雨夹雪')){
                            this.fimg[i] = this.images[6]
                        }else if(res.data.result.future[i].weather.includes('雨') && res.data.result.future[0].weather.indexOf('雷') == -1){
                            this.fimg[i] = this.images[7]
                        }else{
                            this.fimg[i] = this.images[5]
                        }
                    }
                })
            }
        }

    }
</script>

<style scoped lang="less">

    @rem:750/10rem;
    .bg{
        height: 100%;
        background: -webkit-linear-gradient(
                top,
                #394984,
                #edb46d
        ) !important;
        position: fixed;
        width: 100%;
        top: 20vw;
    }
    .weather{
        overflow: hidden;
        zoom:1;
        padding-top: 10/@rem;

        .address{
            color: #fff;
            font-size: 28/@rem;
        }
        .location{
            font-size: 2px ;
            color: #eee;
            text-shadow: 1px 1px 1px #555;
            -webkit-text-size-adjust: 100% ;
        }
        .weatherList{
            display: flex;
            height: 45vw;
            border-top: 1px solid rgba(255,255,255,0.1);
            li{
                flex: 1;
                border-right: 1px solid rgba(255,255,255,0.1);
                padding: 3vw 0;
                overflow: hidden;
                p{
                    color: #fff ;
                    text-shadow: 1px 1px 1px #555;;
                    font-size: 3.5vw;
                    margin: 6/@rem 0;
                }
                .week{

                }
                .day{
                    font-size: 3vw;
                    opacity: 0.5;
                }
                .pic{
                    width: 14vw;
                    height: 13vw;
                    margin: auto;
                }
                .temperature{
                }
                .nowWeather{

                }
                .windDir{

                }
                .humidity{

                }

            }
            li:first-child{
                flex: 1.5;
                p{

                    margin: 0;
                }
                .pic{
                    width: 17vw;
                    height: 16vw;
                }
            }
            li:last-child{
                border: none;
            }
        }
    }
    #date .date_left .main{
        background:#FA967F;
    }
    #date .date_left{
        width: 55px;
        height: 75px;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 5px;
        float: left;
    }
    #date .date_main{
        width: 200px;
    }
    #date .date_right{
        width: 130px;
        height: 75px;
        float: right;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 5px;
    }


</style>
