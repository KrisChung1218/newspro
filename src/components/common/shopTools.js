
// 封装方法 用于点击加入购物车后生成一个字符串以供子组件与父组件之间的通讯
let shopTools = {};
let shop = JSON.parse(window.localStorage.getItem('shopInfo') || '{}');

// 增加
shopTools.addUpdate = function (goods) {
    //判断是否存在,点击购物车则调用此方法
    if(shop[goods.id]){
        shop[goods.id] += goods.num
    }else{
        shop[goods.id] = goods.num
    }
    // 调用saveShops方法存储数据
    this.saveShops(shop)
};

// 删除
shopTools.delete = function (id) {
    delete shop[id];
    //删除后保存
    this.saveShops(shop)
};

// 获取
shopTools.getShop = function () {
    return JSON.parse(window.localStorage.getItem('shopInfo') || '{}')
};

// 获取购物车存放总数
shopTools.getShopCount = function () {
    let sum = 0;
    for(let id in shop){
        sum += shop[id];
    }
    return sum;
};

// 存储
shopTools.saveShops = function () {
    //以字符串的形式存储在本地缓存中  shopInfo:{...}
    window.localStorage.setItem('shopInfo',JSON.stringify(shop))
};


export default shopTools








