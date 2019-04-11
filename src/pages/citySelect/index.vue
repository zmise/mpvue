<template>
  <div class="container">
    <div class="ub-box ub-between ub-ver-v" style="height:50px">
      <div style="color:#000;font-size:24px;margin-left:15px">选发货日期</div>
      <div
        style="padding-right:15px;width:30px;height:50px;font-size:40px;color:#ccc;line-height:50px;text-align:center;"
        @click="$navigateBack()"
      >×</div>
    </div>
    <div class="search-body ub-box ub-ver">
      <div class="text-body ub-box ub-ver">
        <i class="search-icon">
          <i class="circle bg-white iconfont icon-sousuo"></i>
        </i>
        <input class="text" type="text" placeholder="请输入城市名">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.search-body {
  height: 60px;
  background-color: #fff;
}
.text-body {
  height: 40px;
  margin: 0 18px;
  background-color: #f9f9f8;
  color: #999;
  flex:1;
  border-radius: 40px
}
</style>
