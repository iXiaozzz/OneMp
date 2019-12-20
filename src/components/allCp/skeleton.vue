<template>
  <div class="list-item" :id="'list-item-'+skeletonId" :style="{'min-height': height+'px'}">
    <div v-show="showSlot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import SystemInfo from '../../libs/getSystemInfo'
export default {
  data() {
    return {
      height: 0, //  卡片高度，用来做外部懒加载的占位
      showSlot: true, //  控制是否显示当前的slot内容
      skeletonId: ''
    }
  },
  computed: {},
  created() {
    this.extData = {
      listItemContainer: null
    }
  },

  detached() {
    try {
      this.extData.listItemContainer.disconnect()
    } catch (error) {}
    this.extData = null
  },
  mounted() {
    this.skeletonId = this.randomString(8) //  设置唯一标识
    this.$nextTick(() => {
      // 修改了监听是否显示内容的方法，改为前后showNum屏高度渲染
      // 监听进入屏幕的范围relativeToViewport({top: xxx, bottom: xxx})
      let info = SystemInfo.getInfo()
      console.log(info)
      let { windowHeight = 667 } = info.source.system
      let showNum = 2 //  超过屏幕的数量，目前这个设置是上下2屏
      try {
        this.extData.listItemContainer = mpvue.createIntersectionObserver()
        this.extData.listItemContainer
          .relativeToViewport({
            top: showNum * windowHeight,
            bottom: showNum * windowHeight
          })
          .observe(`#list-item-${this.skeletonId}`, res => {
            let { intersectionRatio } = res
            if (intersectionRatio === 0) {
              console.log(
                '【卸载】',
                this.skeletonId,
                '超过预定范围，从页面卸载'
              )
              this.showSlot = false
            } else {
              console.log(
                '【进入】',
                this.skeletonId,
                '达到预定范围，渲染进页面'
              )
              this.showSlot = true
              this.height = res.boundingClientRect.height
            }
          })
      } catch (error) {
        console.log(error)
      }
    })
  },
  methods: {
    /**
     * 生成随机的字符串
     */
    randomString(len) {
      len = len || 32
      var $chars = 'abcdefhijkmnprstwxyz2345678'
      var maxPos = $chars.length
      var pwd = ''
      for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    }
  }
}
</script>

<style lang="less" scoped>
</style>
