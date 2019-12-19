<template>
  <div class="picker-container">
    <!-- <div class="btn-box">
      <button class="y-btn" size="mini" type="primary">确定</button>
    </div>-->
    <!-- <picker-view
      indicator-style="height: 40px;"
      style="width: 100%; height: 200px;"
      :value="value"
      @change="bindChange"
    >
      <picker-view-column>
        <div class="item" v-for="y in years" :key="y" style="line-height: 50px">{{y}}年</div>
      </picker-view-column>
      <picker-view-column>
        <div class="item" v-for="m in months" :key="m*1000" style="line-height: 50px">{{m}}月</div>
      </picker-view-column>
      <picker-view-column>
        <div class="item" v-for="d in days" :key="d" style="line-height: 50px">{{d}}日</div>
      </picker-view-column>
    </picker-view>-->
    <picker mode="date" :value="date" start="1993-01-01" end="2019-12-21" @change="bindDateChange">
      <div class="picker">当前选择: {{date}}</div>
    </picker>
  </div>
</template>

<script>
const date = new Date()
export default {
  data() {
    return {
      years: [],
      year: date.getFullYear(),
      months: [],
      month: 2,
      days: [],
      day: 2,
      value: [9999, 1, 1],
      dateString: '',
      date: '2016-09-01'
    }
  },
  computed: {},
  created() {
    let tempY = []
    let tempM = []
    let tempD = []
    for (let i = 1990; i <= date.getFullYear(); i++) {
      tempY.push(i)
    }

    for (let i = 1; i <= 12; i++) {
      tempM.push(i)
    }

    for (let i = 1; i <= 31; i++) {
      tempD.push(i)
    }
    this.years = tempY
    this.months = tempM
    this.days = tempD
  },
  methods: {
    bindChange: function(e) {
      console.log(e)
      // const val = e.detail.value
      // this.year = this.data.years[val[0]]
      // this.month = this.data.months[val[1]]
      // this.day = this.data.days[val[2]]
      // this.month = this.dealNumFn(this.month)
      // this.day = this.dealNumFn(this.day)
      // this.dateString = this.year + '-' + this.month + '-' + this.day
      // console.log('dateString:', this.dateString)
    },
    bindDateChange: function(e) {
      console.log('picker发送选择改变，携带值为', e)
      // this.date = e.detail.value
    },
    dealNumFn(num) {
      return num < 10 ? `0${num}` : num
    }
  }
}
</script>

<style lang="less" scoped>
.picker-container {
  position: relative;
  .item {
    text-align: center;
  }
  .btn-box {
    height: 30px;
    padding: 5px 0;
    overflow: hidden;
    .y-btn {
      float: right;
      margin-right: 10px;
    }
  }
}
</style>
