<template>
    <div class="bg">
        <div>
            <head-nav title="电话联系"></head-nav>
            <h2>开发者邮箱:</h2><span>krischung@126.com</span>
            <h2>开发者联系方式:</h2><span>18155925790</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "connect"
    }
</script>

<style scoped>
    .bg{
        height: 100%;
        margin-top: 9vw;
        background: -webkit-linear-gradient(

                #394984,
                #edb46d
        ) !important;
    }
    h2{
        font-size:7vw;
    }
    span{
        color:orange;
        font-size:7vw;
    }


</style>