<template>
  <div class="page-index">
    <x-header></x-header>
    <div
      class="graphic-container"
      @touchstart.stop.prevent="toucheStartEvent"
      @touchmove.stop.prevent="touchMoveEvent"
      @touchend.stop.prevent="touchEndEvent"
    >
      <div
        class="wrapper"
        v-for="(item,index) in dataList"
        :key="index"
        :style="{left:item.left+'px'}"
      >
        <div v-show="index===currIndex">
          <div>
            <image class="img" :src="item.imgPath" alt="文章图片" />
            <p class="photo-by">{{item.name}}</p>
          </div>
          <div class="words-box">
            <p class="words">{{item.word}}</p>
            <p class="author-by">{{item.author}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import XHeader from '@/components/indexCp/XHeader'
import Utils from '@/utils/index'
import Api from '@/api/'

export default {
  components: {
    card,
    XHeader
  },
  data() {
    return {
      defaultBlank:
        'https://images.pexels.com/photos/3297502/pexels-photo-3297502.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      left: 0,
      winW: 0,
      dataList: [],
      currIndex: 0,
      imgsUrl: [
        'https://th.wallhaven.cc/lg/5w/5w6319.jpg',
        'https://picjumbo.com/wp-content/uploads/florence-at-night_free_stock_photos_picjumbo_DSC04580-1080x720.jpg',
        'https://th.wallhaven.cc/small/j5/j5k825.jpg',
        'https://w.wallhaven.cc/full/ox/wallhaven-oxwk75.jpg',
        'https://w.wallhaven.cc/full/zm/wallhaven-zm219o.png',
        'https://picjumbo.com/wp-content/uploads/perfect-red-wet-tomatoes-with-room-for-text_free_stock_photos_picjumbo_DSC08451-1080x720.jpg',
        'https://picjumbo.com/wp-content/uploads/little-girl-in-amusement-park_free_stock_photos_picjumbo_IMG_5498-1080x720.jpg'
      ],
      touchData: {
        start: 0,
        move: 0
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.$MinPromise.getSystemInfo().then(res => {
      this.winW = res.windowWidth
      // this.$MinPromise.login().then(res => {
      //   console.log(res)
      // })
      this.createData(0, 2).then(res => {
        this.dataList = this.dataList.concat(res)
      })
      Api.getNewsLatest().then(res => {
        console.log('新闻：', res)
      })
    })
  },
  onShow() {},
  async onPullDownRefresh() {
    // to doing..
    this.$utils.delay(1000).then(() => {
      this.createData(0, 2).then(res => {
        this.dataList = res
        this.currIndex = 0
        // 停止下拉刷新
        mpvue.stopPullDownRefresh()
      })
    })
  },

  methods: {
    bindViewTap() {},
    clickHandle(ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    createData(start = 0, size = 2) {
      let len = start + size
      return new Promise((resolve, reject) => {
        this.$utils.delay(500).then(() => {
          let temp = []
          for (let i = start; i < len; i++) {
            temp.push({
              name: 'iXiaozzz--' + i,
              imgPath: this.imgsUrl[i] || this.defaultBlank,
              word:
                '我时代峰峻设计费束带结发六十几分色无人机哦耳机图时间段放暑假了地方----' +
                i,
              author: 'xxxxx--' + i,
              left: 0
            })
          }
          resolve(temp)
        })
      })
    },
    toucheStartEvent: Utils.throttle(function(e) {
      this.touchData.start = 0
      this.touchData.move = 0
      this.touchData.start = e.touches[0]
    }, 100),
    touchMoveEvent: Utils.throttle(function(e) {
      // 移动过程中，修正index的位置
      // 获取起始点坐标
      let startPoint = {
        x: this.touchData.start.pageX,
        y: this.touchData.start.pageY
      }
      // 获取移动时的坐标点
      let movePoint = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      }
      // 由于页面定位坐标系和指教坐标系有区别，故此y轴需要反过来减
      let _dx = movePoint.x - startPoint.x
      // let _dy = startPoint.y - movePoint.y
      this.dataList[this.currIndex].left = _dx
      this.touchData.move = e.touches[0]
    }, 100),

    touchEndEvent() {
      let directData = this.handleDirectionFn(this.touchData)
      let isHalf = Math.floor(this.winW / 3)
      let moveFn = null
      if (directData.dx > 0) {
        // 向右滑动
        moveFn = directData.dx > isHalf ? this.toRightFn() : this.toLeftFn()
      } else {
        // 向左滑动
        moveFn = directData.dx < -isHalf ? this.toLeftFn1() : this.toRightFn1()
      }
      moveFn && moveFn()
    },
    handleDirectionFn(data) {
      // 手势识别
      if (!data.start || !data.move) return false
      // 获取起始点坐标  结束点坐标
      let [startPoint, endPoint] = [
        {
          x: data.start.pageX,
          y: data.start.pageY
        },
        {
          x: data.move.pageX,
          y: data.move.pageY
        }
      ]
      // 由于页面定位坐标系和直角坐标系有区别，故此y轴需要反过来减
      let _dx = endPoint.x - startPoint.x
      let _dy = startPoint.y - endPoint.y

      // 计算角度
      let backData = {
        direct: '',
        dx: _dx,
        dy: _dy
      }
      // let directorDeg = Math.atan2(_dx, _dy) / Math.PI * 180

      // 对角度进行识别和处理
      // if (Math.abs(directorDeg) <= 45) {
      //   // 向上移动
      //   backData.direct = 'up'
      // } else if (Math.abs(directorDeg) >= 135) {
      //   // 向下移动
      //   backData.direct = 'down'
      // } else if (directorDeg < 135 && directorDeg > 45) {
      //   // 向右移动
      //   backData.direct = 'right'
      // } else if (directorDeg > -135 && directorDeg < -45) {
      //   // 向左移动
      //   backData.direct = 'left'
      // }
      return backData
    },
    toRightFn(t = 10, speed = 15) {
      const move = () => {
        this.$utils.delay(t).then(() => {
          this.dataList[this.currIndex].left += speed
          if (this.dataList[this.currIndex].left < this.winW) {
            move()
          } else {
            if (this.currIndex > 0) {
              this.$utils.delay(200).then(() => {
                this.currIndex -= 1
                this.dataList[this.currIndex].left = 0
              })
            } else {
              this.toLeftFn()()
            }
          }
        })
      }
      return move
    },
    toLeftFn(t = 10, speed = 15) {
      const move = () => {
        this.$utils.delay(t).then(() => {
          this.dataList[this.currIndex].left -= speed
          if (this.dataList[this.currIndex].left > 0) {
            move()
          } else {
            this.dataList[this.currIndex].left = 0
          }
        })
      }
      return move
    },
    toLeftFn1(t = 10, speed = 15) {
      const move = () => {
        const handleNext = () => {
          this.$utils.delay(300).then(() => {
            this.currIndex += 1
            this.dataList[this.currIndex].left = 0
          })
        }
        this.$utils.delay(t).then(() => {
          this.dataList[this.currIndex].left -= speed
          if (this.dataList[this.currIndex].left > -this.winW) {
            move()
          } else {
            if (this.dataList.length > this.currIndex + 1) {
              handleNext()
            } else {
              this.createData(this.currIndex + 1, 2).then(res => {
                this.dataList = this.dataList.concat(res)
                this.$nextTick(() => {
                  if (this.dataList.length > this.currIndex + 1) {
                    handleNext()
                  } else {
                    this.toRightFn1()()
                  }
                })
              })
            }
          }
        })
      }
      return move
    },
    toRightFn1(t = 10, speed = 15) {
      const move = () => {
        this.$utils.delay(t).then(() => {
          this.dataList[this.currIndex].left += speed
          if (this.dataList[this.currIndex].left < 0) {
            move()
          } else {
            this.dataList[this.currIndex].left = 0
          }
        })
      }
      return move
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index');
</style>
