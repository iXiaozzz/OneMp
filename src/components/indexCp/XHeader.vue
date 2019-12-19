<template>
  <div class="x-header">
    <picker
      class="date"
      mode="date"
      :value="date"
      start="1993-01-01"
      :end="todayDate"
      @change="bindDateChange"
    >
      <span class="day">{{dateObj.day}}</span>
      <span class="ym">{{dateObj.month}}.{{dateObj.year}}</span>
    </picker>

    <div class="weather" v-html="weatherInfo"></div>
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
      popupShow: true,
      date: '2019-07-01',
      todayDate: '',
      dateObj: { year: '2019', month: '07', day: '01' }
    }
  },
  computed: {},
  created() {
    this.bmap = new BMap({ ak: 'd6KGbQ7m9ImkVZuh9icOzsKF6cgxsEfK' })
    this.getWeatherInfoFn()
    this.getCurrentDate()
  },
  onShow() {
    this.getWeatherInfoFn()
  },
  async onPullDownRefresh() {
    this.getWeatherInfoFn()
  },
  methods: {
    bindDateChange(e) {
      this.date = e.mp.detail.value
      let dateArr = this.date.split('-')
      this.dateObj.year = dateArr[0]
      this.dateObj.month = dateArr[1]
      this.dateObj.day = dateArr[2]
    },
    getCurrentDate() {
      let D = new Date()
      this.dateObj.year = D.getFullYear()
      this.dateObj.month = D.getMonth() + 1
      this.dateObj.day = D.getDate()
      this.todayDate =
        this.dateObj.year + '-' + this.dateObj.month + '-' + this.dateObj.day
      this.date = this.todayDate
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
