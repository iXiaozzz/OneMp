<template>
  <div class="x-header">
    <div class="date" @tap.stop="handleClickDate">
      <span class="day">16</span>
      <span class="ym">03.2019</span>
    </div>
    <div class="weather" v-html="weatherInfo"></div>
    <van-popup
      :show="popupShow"
      position="bottom"
      custom-style="height: 240px;"
      @close="handleClickClose"
    >
      <select-date></select-date>
    </van-popup>
  </div>
</template>

<script>
import BMap from '@/libs/bmap-wx.js'
import SelectDate from './SelectDate'
export default {
  components: {
    SelectDate
  },
  data() {
    return {
      weatherInfo: '',
      bmap: null,
      popupShow: true
    }
  },
  computed: {},
  created() {
    this.bmap = new BMap({ ak: 'd6KGbQ7m9ImkVZuh9icOzsKF6cgxsEfK' })
    this.getWeatherInfoFn()
  },
  onShow() {
    this.getWeatherInfoFn()
  },
  async onPullDownRefresh() {
    this.getWeatherInfoFn()
  },
  methods: {
    handleClickDate() {
      this.popupShow = !this.popupShow
    },
    handleClickClose() {
      this.popupShow = false
    },
    getWeatherInfoFn() {
      const _this = this
      _this.bmap.weather({
        success(data) {
          let weather = data.currentWeather[0]
          _this.weatherInfo = weather.currentCity + '&nbsp;' + weather.date
        },
        fail(err) {
          throw new Error(err)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../style/index');
.x-header {
  .flex(spce-between, center);
  padding: 10px 6px;
  .date {
    .flex-num(1);
    .day {
      .font-c(27px, #000);
      padding: 0 3px 0 0;
      font-weight: 600;
    }
    .ym {
      font-weight: 600;
    }
  }
  .weather {
    .font-c(13px, #aeaeae);
  }
}
</style>
