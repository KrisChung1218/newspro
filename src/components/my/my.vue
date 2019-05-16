<template>
    <div class="mb">
        <head-nav title="网易云课堂"></head-nav>
        <div  id='write'  class = 'is-node'>
            <p><a href="https://study.163.com/course/introduction/1005740010.htm?from=study">web前端开发vuejs及JavaScript课</a></p>
            <p><a href="https://study.163.com/course/introduction/1003664020.htm">Bootstrap前端开发</a></p>
            <p><a href="https://study.163.com/course/introduction/704122.htm">Javascript前端开发</a></p>
            <p><a href="https://study.163.com/course/introduction/1004483001.htm">HTML5前端开发基础到实战</a></p>
            <p><a href="https://study.163.com/course/introduction/1005231035.htm">【项目实战】电子商务网站前端开发</a></p>
            <p><a href="https://study.163.com/series/1001477001.htm">极速上手Python和分布式爬虫</a></p>
            <p><a href="https://study.163.com/course/courseMain.htm?courseId=1003285002">Python网络爬虫实战</a></p>
            <p><a href="https://study.163.com/course/courseMain.htm?courseId=320022">Python Django 快速Web开发入门</a></p>
            <p><a href="https://study.163.com/course/introduction/1005220017.htm">从零玩转jQuery原理和Ajax</a></p>
            <p><a href="https://study.163.com/series/1001470006.htm">Node.JS经典课程高级整合包</a></p>
            <p><a href="https://study.163.com/course/introduction/1003228034.htm">Node.js进阶教程第一步(基础篇)</a></p>
            <p><a href="https://study.163.com/course/introduction/1003274017.htm">Node.js进阶教程第二步（Express框架）</a></p>
            <p><a href="https://study.163.com/course/introduction/1003340005.htm">Node.js进阶教程第三步：Sails.Js</a></p>
            <p><a href="https://study.163.com/course/introduction/1003413009.htm">Node.js进阶教程第四步：WebSocket</a></p>
            <p><a href="https://study.163.com/course/introduction/1003622009.htm">Node.js进阶教程第五步:MongoDB</a></p>
            <p><a href="https://study.163.com/course/introduction/1003842426.htm">Node.js进阶教程第七步：koa框架</a></p>
            <p><a href="">...</a></p>




        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style scoped lang="less">
    @rem:750/10rem;
    .mb{
        margin-bottom: 17vw;
        margin-top: 9vw;

    }
    #write{
        background-color: #15131E;
        p{
            font-size: 4vw;
            color: rgba(128,118,212,1);
        }
    }
    .is-node > p{
        padding-top:25px;
    }

    .is-node p a{
        color:orange;
    }
</style>
