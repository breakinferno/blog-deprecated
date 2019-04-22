<template>
  <div class="blog-introduction">
    <div class="introduction-header drag-handler"></div>
    <div class="introduction-body">
      <router-link to="/publish">
        <img class="introduction-avatar"
           src="../assets/avatar.png"
           alt=""></router-link>
      <div style="margin-right: 20px">
        <h3>@斯杜痞德</h3>
        <p>好像看见花开</p>
      </div>
    </div>
    <div class="introduction-footer">
      <a href="">
        <span class="introduction-num">23</span>
        <span class="introduction-info">文章</span>
      </a>
      <a href="">
        <span class="introduction-num">22</span>
        <span class="introduction-info">说说</span>
      </a>
    </div>
    <div class="geek-info">
      <span v-for="(geek, index) in geeks"
            :key="index"
            @click="handleUrl(geek.url)">
        <i :class="`fa${geek.fab?'b':''} fa-${geek.code}`"></i>
        {{geek.name}}
      </span>
    </div>
    <!-- <i class="introduction-icon"></i> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      geeks: [
        {
          name: 'Leetcode',
          url: '/',
          code: 'code'
        }, {
          name: 'Github',
          url: '/',
          code: 'github',
          fab: true
        }, {
          name: 'QQ',
          url: '/',
          code: 'qq',
          fab: true
        }, {
          name: 'E-Mail',
          url: '/',
          code: 'at'
        }, {
          name: 'Weibo',
          url: '/',
          code: 'weibo',
          fab: true
        }, {
          name: 'Music',
          url: '/',
          code: 'music'
        }
      ]
    }
  },
  methods: {
    handleUrl (url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
.blog-introduction {
  position: relative;
  .introduction-header {
    background-image: url('../assets/thGeneration.jpg');
    width: 100%;
    background-size: cover;
    height: 75px;
    /* background-attachment: fixed; */
    background-repeat: no-repeat;
    background-size: cover;
  }

  .introduction-body {
    display: flex;
    padding: 10px 0px;
    justify-content: space-around;
    align-items: center;
    h3 {
      font-size: 18px;
      text-align: left;
    }
    p {
      font-size: 12px;
      font-weight: 500;
      padding-top: 7px;
    }
    .introduction-avatar {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      top: 65px;
      left: 20px;
      transition: transform 1s ease;
      &:hover {
        transform: scale(1.3) rotateZ(30deg);
      }
    }
  }

  .introduction-footer {
    display: flex;
    justify-content: space-evenly;
    a {
      margin: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      .introduction-num {
        color: #00a1d6;
      }
      .introduction-info {
        color: #99a2aa;
        margin-top: 10px;
        font-size: 12px;
      }
    }
  }
  .geek-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    span {
      height: 30px;
      display: inline-block;
      color: black;
      width: 50%;
      cursor: pointer;
      font-size: 14px;
      line-height: 30px;
      &:nth-child(2n+1){
          padding-left: 10px;
      }
      &:nth-child(2n){
        //   text-align: right;
          padding-left: 10px;
      }
    }
  }
}
</style>
