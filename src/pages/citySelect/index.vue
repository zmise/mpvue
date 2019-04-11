<template>
  <div class="container ub-box ub-col" style="height:100%">
    <div class="ub-box ub-between ub-ver-v" style="height:50px">
      <div style="color:#000;font-size:24px;margin-left:15px">选发货日期</div>
      <div
        style="padding-right:15px;width:30px;height:50px;font-size:40px;color:#ccc;line-height:50px;text-align:center;"
        @click="$navigateBack()"
      >×</div>
    </div>
    <div class="search-body ub-box ub-ver">
      <div class="text-body ub-box ub-ver-v">
        <i class="search-icon ub-box ub-ver">
          <van-icon name="search" style="font-size:20px;color:#ccc"/>
        </i>
        <input class="text" type="text" v-model="searchText" placeholder="请输入城市名(如北京/BEIJING/BJ)">
      </div>
    </div>
    <div class="content-body ub-flex-1 ub-box">
      <div
        style="width:90px;min-heigth:100%;border-right: 1px solid #e4e4e4;"
        class="ub-box ub-col"
      >
        <div
          v-for="(item, index) in switchClass"
          :key="item"
          :class="item.flag? 'tbar-item ub-box ub-ver tbar-current':'tbar-item ub-box ub-ver'"
          @click="changeBar(index,item.name)"
        >{{item.name}}</div>
        <!-- <div class="tbar-item ub-box ub-ver">国际/港澳台</div> -->
      </div>
      <div class="ub-flex-1 ub-flex-1 ub-box ub-col">
        <div class="ub-box ub-col" v-for="(items , index) in cityArr" :key="index">
          <div class="ub-box ub-ver-v" style="height:25px;padding-left:15px">{{items.initial}}</div>
          <div class="ub-box ub-wrap" style="background-color: #fff;">
            <div
              class="ub-box ub-ver-v city-content"
              v-for="(item , index1) in items.list"
              :key="index1"
            >
              <div class="city-item ub-box ub-ver">{{item}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: "",
      switchClass: [],
      chainCityArr: [],
      otherCityArr: [],
      cityArr: []
    };
  },
  mounted() {
    this.initData();
    this.switchClass = [
      { name: "国内", flag: 1 },
      { name: "国际/港澳台", flag: 0 }
    ];
    this.chainCityArr = [
      { initial: "a", list: ["三亚", "上海市"] },
      { initial: "b", list: ["北京市", "北海"] }
    ];
    this.otherCityArr = [
      { initial: "a", list: ["埃因霍温 ", " 埃尔帕索 "] },
      { initial: "b", list: [" 不来梅 ", "伯尔尼 "] }
    ];

    this.cityArr = this.chainCityArr;
  },
  methods: {
    initData() {
      this.$get("/search/first/city", { customer_id: 47 })
        .then(({ data }) => {
          // console.log(data);
          //  this.chinaArr = data.china_city_arr;
          // this.ohterArr = data.ohter_city_arr;
        })
        .catch(err => {});
    },
    changeBar(index, val) {
      for (let i = 0; i < this.switchClass.length; i++) {
        if (
          this.switchClass[i].flag === 1 &&
          this.switchClass[i].name !== val
        ) {
          this.switchClass[i].flag = 0;
        }
        if(this.switchClass[i].name === val){
          this.switchClass[i].flag = 1;
        }
      }

      switch (index) {
        case 0:
          this.cityArr = this.chainCityArr;
          break;
        case 1:
          this.cityArr = this.otherCityArr;
          break;

        default:
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.search-body {
  height: 60px;
  background-color: #fff;
  padding-bottom: 10px;
  border-bottom: 1px solid #bbb;
}
.text-body {
  height: 40px;
  margin: 0 18px;
  background-color: #f9f9f8;
  color: #999;
  flex: 1;
  border-radius: 40px;
}
.search-icon {
  height: 40px;
  width: 40px;
  padding-left: 10px;
}
.text {
  flex: 1;
}
.content-body {
  height: calc(100% - 120px);
  background-color: #f9f9f8;
}
.tbar-item {
  height: 43px;
  color: #666;
  font-size: 16px;
  border-bottom: 1px solid #e4e4e4;
}
.tbar-current {
  background-color: #fff;
  color: #228ef7;
}
.city-content {
  background-color: #fff;
  padding-bottom: 10px;
}
.city-item {
  height: 32px;
  margin-top: 10px;
  margin-left: 10px;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  width: 120px;
  font-size: 16px;
  color: #323332;
}
</style>
