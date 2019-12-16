<template>
  <div class="x-header">
    <div class="date">
      <span class="day">16</span>
      <span class="ym">03.2019</span>
    </div>
    <div class="weather">深圳*23C</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
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
