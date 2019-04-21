<template>
  <div class="z_nav">
    <!-- 高斯模糊的背景 -->
    <div class="z_nav_img">
    </div>
    <!-- 居中的内容区域 -->
    <div class="z_nav_con">
      <h2>{{navName}}</h2>
      <p class="z_nav_tilte">{{navTilte}}</p>
      <!-- 下面一排有 ico 和 文字的 导航栏 -->
      <ul>
        <template v-for="(item, index) in navs">
          <li :key="index">
            <a :href="item.url">
              <p>{{item.name}}</p>
            </a>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      navName:'朱 昆 鹏',
      navTilte:'To Be a Beffer Me',
      // nav 分类，以及上面Icon小图标的地址, 图片添加还是有问题的
      navs:[
        {name:'首页', icoPath:'', url:'/a'},
        {name:'分类', icoPath:'', url:'/b'},
        {name:'归档', icoPath:'', url:'/c'},
        {name:'项目', icoPath:'', url:'/d'},
        {name:'作者', icoPath:'', url:'/e'}
      ]
    }
  }
}
</script>

<style scoped>

/* 
 * ======= 最外层 ========
 */
.z_nav {
  width: 100%;
  height: 450px;
  /* flex居中对齐 */
  display: flex;
  flex-direction:column;/* 决定主轴的方向（即项目的排列方向）column是从左到右的 */
  justify-content: center;/* 项目在主轴上的对齐方式：从左到右的对齐方式 */
  align-items:center;/* 属性定义项目在交叉轴上如何对齐：从上到下的对齐方式*/
}

.z_nav .z_nav_img {
  width: 100%;
  /* min-width: 460px; */
  height: 100%;
  /* 为了防止图片加载不出来，造成的背景颜色突兀 */
  background-color: #6600CC;
  background-image: url('./img/bj.jpeg');
  /* background-image: url('../Card/card.png'); */
  /* background-size:150% 150%; */
  filter: blur(5px);
}

/* 
 * ======= 居中的内容区域 ========
 */
 .z_nav .z_nav_con {
   position: absolute;
   color: #e8e5fb;
   max-width: 460px;

   height: 230px;
   text-align: center;
 }

 .z_nav .z_nav_con h2 {
   font-size: 48px;
   font-weight: 700;
 }

 .z_nav .z_nav_con .z_nav_tilte {
   font-size: 14px;
   margin-top: 32px;
   margin-bottom: 45px;
 }
 .z_nav .z_nav_con ul {
  /* display: flex; */
  /* flex-direction: row; */
 }
 .z_nav .z_nav_con ul li {
   font-size: 22px;
   display: inline-block;
   margin: 0px 10px;
 }
 .z_nav .z_nav_con ul li a {
   color: #e8e5fb;
   text-decoration: none;
 }
 .z_nav .z_nav_con ul li a:hover {
   color: #fff;
 }

</style>
