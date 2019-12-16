<template>
  <div class="page-index">
    <x-header></x-header>
    <div class="graphic-container">
      <div>
        <image class="img" :src="defaultBlank" alt="文章图片" />
        <p class="photo-by">xxxxxx</p>
      </div>
      <div class="words-box">
        <p class="words">我用她的相机在我过生日那天拍了些照片.我用她的相机在我过生日那天拍了些照片.我用她的相机在我过生日那天拍了些照片.</p>
        <p class="author-by">xxxxxx</p>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import XHeader from '@/components/indexCp/XHeader'
import Api from '@/api/'

const defaultBlank = require('../../assets/img/default_err.jpg')
export default {
  data() {
    return {
      defaultBlank: defaultBlank
    }
  },
  components: {
    card,
    XHeader
  },
  created() {
    this.$MinPromise.login().then(res => {
      console.log(res)
    })
  },
  onShow() {
    // if (!this.isFirst) return false
    Api.getNewsLatest().then(res => {
      console.log('新闻：', res)
    })
  },
  async onPullDownRefresh() {
    // to doing..
    this.$utils.delay(2000).then(() => {
      console.log(111)
      // 停止下拉刷新
      mpvue.stopPullDownRefresh()
    })
  },
  methods: {
    bindViewTap() {},
    clickHandle(ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index');
</style>
