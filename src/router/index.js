import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'

// 引入模板
import headNav from '../components/common/headNav';
import newsList from '../components/news/newslist';
import photoList from '../components/photoshare/photolist';
import shopList from '../components/shop/shoplist';
import Map from '../components/map/map';
import weaTher from '../components/weather/weather';
import Weather from '../components/common/weather';
import shopCart from '../components/shopcart/shopcart';
import My from '../components/my/my';
import bannerDetails from '../components/banner/bannardetails';
import newsDetails from '../components/news/newsdetails';
import photoDetails from '../components/photoshare/photo';
import shopdetails from '../components/shop/shopdetails';
import Historytoday from '../components/historytoday/historytoday'
import Connect from '../components/phone/connect'
import toutiaoNews from '../components/toutiaoNews/toutiaonews'

// 安装全局组件
Vue.component('headNav',headNav);
Vue.component('dateWeather',Weather);

// 数据请求axios
import Axios from 'axios'
// Axios.defaults.baseURL = 'http://47.96.29.109/vueProject/';
// Axios.defaults.baseURL = 'http://127.0.0.1/';
Vue.prototype.$ajax = Axios;
// // 拼接url
// Vue.prototype.dataURL = function (file,title,id) {
//     id = (id === undefined)?'':id;
//     return file+'?title='+title+id;
// };
//设置响应头类型，解决请求聚合数据api中文乱码的问题
Axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
}


// 数据请求jquery
import $ from 'jquery';
Vue.prototype.$jq = $;

// mint-ui组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);
Vue.use(Router);


// vue2-preview 缩略图
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

export default new Router({
    //Vue.js文档关于处理点击添加类名的语法,rlActive为global中定义的类名
    linkActiveClass:'rlActive',
    mode: 'history',  //去掉url中的#
    routes: [
        {
            //重定向，以解决首页按钮默认选中的情况
            path:'/',
            redirect:{name:'index'}
        },
        {
            path: '/ ',
            name: 'index',
            component: Index
        },
        {
            name:'banner.details',
            path:'/banner/details',
            component:bannerDetails
        },

        {
            //新闻资讯
            name:'news.list',
            path:'/news/list',
            component:newsList,
        },
        {
            //新闻资讯详情
            name:'news.details',
            path:'/news/list/newsDetails',
            component:newsDetails
        },
        {
            //图文分享
            name:'photo.list',
            path:'/photo/list',
            component:photoList
        },
        {
            //商品展示
            name:'shop.list',
            path:'/shop/list',
            component:shopList
        },
        {
            //底部导航 - 地图
            //需要在index.html中导入地图API
            name:'map',
            path:'/map',
            component:Map,
        },
        {
            //底部导航 - 天气
            name:'weather',
            path:'/weather',
            component:weaTher,
        },
        {
            //底部导航 - 购物车
            name:'shopcart',
            path:'/shopcart',
            component:shopCart,
        },
        {
            //底部导航 - 我的
            name:'my',
            path:'/my',
            component:My,
        },
        {
            //图文详情
            name:'photo.details',
            path:'/photo/list/details',
            component:photoDetails
        },
        {
            //商品详情
            name:'shop.shopdetails',
            path:'/shop/list/shopdetails',
            component:shopdetails
        },
        {
            //短信联系
            name:'historytoday',
            path:'/historytoday',
            component:Historytoday
        },
        {
            //电话联系
            name:'phone.connect',
            path:'connect',
            component:Connect
        },
        {
            //头条新闻
            name:'toutiaoNews',
            path:'toutiaonews',
            component:toutiaoNews
        }



    ]
})
