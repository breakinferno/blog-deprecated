<template>
    <div id="footer"
         class="footer"
         :style="{position: isFixed? 'fixed':'static'}">
        <div class="footer-inner">
            <div class="copyright"> © 1996 -
                <span itemprop="copyrightYear">2019</span>
                <span class="with-love">
                    <i class="fa fa-superpowers"></i>
                </span>
                <span class="author"
                      itemprop="copyrightHolder">
                    <a href="#">Breakinferno</a>
                </span>
            </div>
            <div class="busuanzi-count">
                <span class="site-uv">
                    <i class="fa fa-user">This site's UV:</i>
                    <span class="busuanzi-value"
                          id="uv">10917</span>
                </span>
                <span class="site-pv">
                    <i class="fa fa-eye">This site's PV:</i>
                    <span class="busuanzi-value"
                          id="pv">35672</span>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isFixed: false
    }
  },
  mounted () {
    this.$bus.$on('headerover', (state) => {
      this.isFixed = true
    })
  }
}
</script>

<style lang="less" scoped>
.footer {
  background: rgba(255, 255, 255, 0.5) none repeat scroll !important;
  margin-top: 80px;
  padding: 10px 0;
  color: #666;
  font-size: 14px;
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 50px;
  .footer-inner {
    color: #000;
    margin: 0 auto;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: middle;
    display: flex;
    height: 50px;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    .copyright {
      .with-love {
        display: inline-block;
        margin: 0 5px;
        i {
          display: inline-block;
          font: normal normal normal 14px/1 FontAwesome;
          font-size: inherit;
          text-rendering: auto;
          -webkit-font-smoothing: antialiased;
        }
      }
      .author a {
        color: #555;
        text-decoration: none;
        border-bottom: 1px solid #999;
        word-wrap: break-word;
      }
    }
  }
  .site-pv,
  .site-uv {
    display: inline-block;
    margin: 0 20px;
  }
}
</style>
