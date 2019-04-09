<template>
  <div class="container">
    <div class="img-box">
      <img v-show="loading" src="../../assets/img/header.png" alt>
      <img v-show="!loading" src="../../assets/img/header2.png" alt>
    </div>
    <div class="tab-style">
      <div class="tabs">
        <div v-bind:class="{ active: loading, 'tab-box': showBox }" @click="loading=true">智能报价</div>
        <div v-bind:class="{ active: !loading, 'tab-box': showBox }" @click="loading=false">仓位查询</div>
      </div>
      <div class="content" v-show="loading">
        <van-popup :show="show" position="bottom" overlay="false">
          <van-picker
            show-toolbar
            title=" "
            :columns="columns"
            @change="onChange(1,$event)"
            @cancel="onClose(1)"
            @confirm="onConfirm(1)"
          />
        </van-popup>
        <div class="store-line"></div>
        <van-cell-group class="vcg">
          <van-field
            :value="destinationCountry"
            disabled
            label="目的国"
            @click="show=true"
            icon="arrow"
            class="dtct"
          />
          <van-field :value="piece" clearable label="件数" type="number" placeholder="请输入件数"/>
          <van-field
            :value="weight"
            clearable
            label="重量"
            type="number"
            placeholder="请输入大于100KG的重量"
            border="false"
          />
          <van-field
            :value="volume"
            clearable
            label="体积"
            type="number"
            placeholder="m³"
            border="false"
            class="teshu"
          />
        </van-cell-group>
        <van-button round type="danger" size="large">搜索</van-button>
      </div>
      <div class="content" v-show="!loading">
        <van-popup :show="show2" position="bottom" overlay="false">
          <van-picker
            show-toolbar
            title=" "
            :columns="columns2"
            @change="onChange(2,$event)"
            @cancel="onClose(2)"
            @confirm="onConfirm(2)"
          />
        </van-popup>
        <van-popup :show="show3" position="bottom" overlay="false">
          <van-picker
            show-toolbar
            title=" "
            :columns="columns3"
            @change="onChange(3,$event)"
            @cancel="onClose(3)"
            @confirm="onConfirm(3)"
          />
        </van-popup>

        <div class="ub-box ub-ver" style="height:70px ;width: 100%;margin-top:10px">
          <div class="ub-box ub-col ub-flex-1 ub-ver-v ub-ver">
            <p style="font-size: 15px;color: #999">交货城市</p>
            <input
              :value="deliveryCity"
              disabled
              placeholder="城市"
              @click="show2=true"
              style="height: 40px;width: 100%;text-align:center;font-size: 24px;font-weight: 700;color: #323332"
            >
          </div>
          <i
            class="iconfont icon-feiji- ub-box ub-col ub-flex-1 ub-ver-v ub-end"
            style="height: 40px;font-size: 22px;font-weight: 700;color: #323332"
          ></i>

          <div class="ub-box ub-col ub-flex-1 ub-ver-v ub-ver">
            <p style="font-size: 15px;color: #999">目的城市</p>
            <input
              :value="destinationCity"
              disabled
              placeholder="城市"
              @click="show3=true"
              style="height: 40px;width: 100%;text-align:center;font-size: 24px;font-weight: 700;color: #323332"
            >
          </div>
        </div>
        <van-popup :show="show4" position="bottom" overlay="false">
          <van-datetime-picker
            type="date"
            :value="currentDate"
            :min-date="minDate"
            @change="change"
            @cancel="onClose(4)"
            @confirm="confirm"
          />
        </van-popup>
        <div class="itmebox ub-box ub-ver ub-between" @click="show4=true">
          <div style="font-size: 24px;font-weight: 600;color: #323332" class="ft-f">{{date}}</div>
          <div style="font-size:15px;color:#bbb;margin-right: 80px;" class="ft-f">{{week}}</div>
          <van-icon name="arrow" style="font-size:24px;color:#bbb"/>
        </div>
        <div class="itmebox ub-box ub-ver ub-between">
          <div style="font-size: 15px;font-weight: 600;" class="ft-f">飞行方式</div>
          <van-checkbox-group :value="result" @change="onSelect(1,$event)" class="ub-box ub-ver">
            <van-checkbox
              :wx:for="list"
              :wx:key="index"
              :name="item"
              style="font-size:15px;color:#323332;width:100px;font-weight: 600"
              class="ft-f"
            >{{ item }}</van-checkbox>
          </van-checkbox-group>
        </div>
        <div
          class="itmebox ub-box ub-ver ub-between"
          style="border-bottom: .5px solid #efefef;margin-bottom: 5px;"
        >
          <div style="font-size: 15px;font-weight: 600;" class="ft-f">机型</div>
          <van-checkbox-group :value="result1" @change="onSelect(2,$event)" class="ub-box ub-ver">
            <van-checkbox
              :wx:for="list1"
              :wx:key="index"
              :name="item"
              style="font-size:15px;color:#323332;width:100px;font-weight: 600"
              class="ft-f"
            >{{ item }}</van-checkbox>
          </van-checkbox-group>
        </div>

        <van-button round type="danger" size="large">搜索</van-button>
      </div>
    </div>
    <div class="query-list ub-box ub-col">
      <div class="title">快捷查询</div>
      <div class="content ub-box z-scroll-type ub-flex-1">
        <div v-for="item in continent_info" class="itme ub-box ub-col ub-ver-v ub-ver">
          <img :src="item.image" alt class="z-circle">
          <p class="txt">{{item.name}}</p>
        </div>
      </div>
    </div>
    <div class="route-list ub-box ub-col">
      <div class="title">热门航线</div>
      <div class="content ub-box ub-flex-1 ub-wrap">
        <div class="itme ub-box ub-wrap" v-for="(item, index) in airline_arr" :key="item" :data-index="index">
          <div class="ub-box box ub-ver-v">
            <img src="../../assets/img/user.png" alt class="image">
          </div>
          <div class="txt-content ub-box ub-col">
            <strong>{{item.fly_site}}-{{item.stopovers_site!==''?item.stopovers_site+'':''}}{{item.arrive_site}}</strong>
            <p>25元/kg</p>
          </div>
          <div class="date">
            <p>3月11日</p>
          </div>
        </div>
      </div>
    </div>
    <footer class="ub-box ub-ver">
      <i>----------</i>
      <i style="margin:0 1px;">到底了</i>
      <i>----------</i>
    </footer>
  </div>
</template>
<script>
export default {
  components: {},
  computed: {},
  data() {
    return {
      show: false,
      show4: false,
      show3: false,
      show2: false,
      showBox: true,
      loading: true,
      piece: "",
      weight: "",
      volume: "",
      destinationCountry: "",
      deliveryCity: "",
      destinationCity: "",
      columns: ["", "杭州", "宁波", "温州", "嘉兴", "湖州"],
      columns2: ["", "香港"],
      columns3: ["", "杭州"],
      value: "",
      value2: "",
      value3: "",
      value4: "",
      list: ["直飞", "转飞"],
      result: [],
      list1: ["纯货机", "客机腹舱"],
      result1: [],
      currentDate: new Date().getTime(),
      minDate: new Date().getTime(),
      week: "",
      date: "",
      continent_info: [],
      airline_arr: [], //推荐航线
      flight_img_arr: [] //航空公司图片
    };
  },
  methods: {
    initData() {
      // let request = this.$get("/get/all/continent", "");
      this.continent_info = [
        {
          id: 0,
          name: "全部"
        },
        {
          id: 1,
          image:
            "http://yh8.topodoo.com/wechat/attach/image/yhb.continent/1/upload_picture",
          name: "亚洲",
          count: 0,
          img_url:
            "http://yh8.topodoo.com/wechat/continent/image?item_id=1&time=9654440017"
        },
        {
          id: 2,
          image:
            "http://yh8.topodoo.com/wechat/attach/image/yhb.continent/2/upload_picture",
          name: "大洋洲",
          count: 0,
          img_url:
            "http://yh8.topodoo.com/wechat/continent/image?item_id=2&time=4764978223"
        },
        {
          id: 3,
          image:
            "http://yh8.topodoo.com/wechat/attach/image/yhb.continent/3/upload_picture",
          name: "北美洲",
          count: 0,
          img_url:
            "http://yh8.topodoo.com/wechat/continent/image?item_id=3&time=7609313667"
        },
        {
          id: 4,
          image:
            "http://yh8.topodoo.com/wechat/attach/image/yhb.continent/4/upload_picture",
          name: "南美洲",
          count: 0,
          img_url:
            "http://yh8.topodoo.com/wechat/continent/image?item_id=4&time=4085266879"
        },
        {
          id: 5,
          image:
            "http://yh8.topodoo.com/wechat/attach/image/yhb.continent/5/upload_picture",
          name: "欧洲",
          count: 0,
          img_url:
            "http://yh8.topodoo.com/wechat/continent/image?item_id=5&time=4336403151"
        }
      ];

      this.airline_arr = [
        {
          ricetype: "",
          add_day: 0,
          weeks: "D1.2.3.4.5",
          arrive_site: "LAX",
          price: 13.5,
          indate: "2019-09-01",
          hour: "09小时33分钟",
          currency_name: "¥",
          arrive_continent_id: 3,
          flight_id: 541,
          airline_id: 1,
          flight_name: "ZH4524",
          fly_site_name: "长沙",
          airline_company_id: 1,
          airline_company_name: "深航",
          fly_date: "2019-04-08",
          fly_site: "CSX",
          id: "",
          fly_time: "06:30",
          stopovers_continent_id: false,
          flight_type: "货机",
          stopovers_site: "",
          arrive_sitename: "洛杉矶",
          stopovers_site_name: "",
          time_limit: 8.5,
          sequence: 10,
          arrive_time: "08:03"
        },
        {
          ricetype: "",
          add_day: 0,
          weeks: "D1.2.3.4.5.6",
          arrive_site: "PEK",
          price: 5,
          indate: "2019-12-02",
          hour: "12小时00分钟",
          currency_name: "¥",
          arrive_continent_id: 1,
          flight_id: 2,
          airline_id: 4,
          flight_name: "ZH5697",
          fly_site_name: "长沙",
          airline_company_id: 1,
          airline_company_name: "深航",
          fly_date: "2019-04-08",
          fly_site: "CSX",
          id: "",
          fly_time: "10:03",
          stopovers_continent_id: false,
          flight_type: "客机",
          stopovers_site: "",
          arrive_sitename: "北京首都",
          stopovers_site_name: "",
          time_limit: 8.01,
          sequence: 3,
          arrive_time: "14:03"
        },
        {
          ricetype: "",
          add_day: 0,
          weeks: "D1.2.3.4.5.6",
          arrive_site: "CAN",
          price: 4.5,
          indate: "2019-12-04",
          hour: "11小时00分钟",
          currency_name: "¥",
          arrive_continent_id: 1,
          flight_id: 5,
          airline_id: 5,
          flight_name: "ZH9623",
          fly_site_name: "长沙",
          airline_company_id: 1,
          airline_company_name: "深航",
          fly_date: "2019-04-08",
          fly_site: "CSX",
          id: "",
          fly_time: "14:03",
          stopovers_continent_id: false,
          flight_type: "货机",
          stopovers_site: "",
          arrive_sitename: "广州",
          stopovers_site_name: "",
          time_limit: 8.01,
          sequence: 2,
          arrive_time: "17:03"
        },
        {
          ricetype: "",
          add_day: 1,
          weeks: "D1.3.5.7",
          arrive_site: "LAX",
          price: 12,
          indate: "2019-10-01",
          hour: "26小时00分钟",
          currency_name: "¥",
          arrive_continent_id: 3,
          flight_id: 5,
          airline_id: 2,
          flight_name: "ZH9623",
          fly_site_name: "长沙",
          airline_company_id: 1,
          airline_company_name: "深航",
          fly_date: "2019-04-08",
          fly_site: "CSX",
          id: "",
          fly_time: "14:03",
          stopovers_continent_id: 1,
          flight_type: "货机",
          stopovers_site: "CAN",
          arrive_sitename: "洛杉矶",
          stopovers_site_name: "广州",
          time_limit: 8.01,
          sequence: 2,
          arrive_time: "08:03"
        },
        {
          ricetype: "",
          add_day: 1,
          weeks: "D2.4.6",
          arrive_site: "LAX",
          price: 14.5,
          indate: "2019-09-14",
          hour: "37小时0分钟",
          currency_name: "¥",
          arrive_continent_id: 3,
          flight_id: 2,
          airline_id: 3,
          flight_name: "ZH5697",
          fly_site_name: "长沙",
          airline_company_id: 1,
          airline_company_name: "深航",
          fly_date: "2019-04-08",
          fly_site: "CSX",
          id: "",
          fly_time: "03:03",
          stopovers_continent_id: 1,
          flight_type: "客机",
          stopovers_site: "PEK",
          arrive_sitename: "洛杉矶",
          stopovers_site_name: "北京首都",
          time_limit: 8.01,
          sequence: 2,
          arrive_time: "08:03"
        },
        {
          ricetype: "",
          add_day: 0,
          weeks: "D1.2.3.4",
          arrive_site: "LAX",
          price: 0,
          indate: "",
          hour: "19小时56分钟",
          currency_name: "",
          arrive_continent_id: 3,
          flight_id: 1,
          airline_id: 167,
          flight_name: "ZH5696",
          fly_site_name: "长沙",
          airline_company_id: 1,
          airline_company_name: "深航",
          fly_date: "2019-04-08",
          fly_site: "CSX",
          id: "",
          fly_time: "06:08",
          stopovers_continent_id: false,
          flight_type: "货机",
          stopovers_site: "",
          arrive_sitename: "洛杉矶",
          stopovers_site_name: "",
          time_limit: 8.01,
          sequence: 0,
          arrive_time: "18:04"
        },
        {
          ricetype: "",
          add_day: 0,
          weeks: "D1.2.3.4.5",
          arrive_site: "LAX",
          price: 0,
          indate: "",
          hour: "13小时01分钟",
          currency_name: "",
          arrive_continent_id: 3,
          flight_id: 1,
          airline_id: 170,
          flight_name: "ZH5696",
          fly_site_name: "长沙",
          airline_company_id: 1,
          airline_company_name: "深航",
          fly_date: "2019-04-08",
          fly_site: "CSX",
          id: "",
          fly_time: "03:03",
          stopovers_continent_id: false,
          flight_type: "货机",
          stopovers_site: "",
          arrive_sitename: "洛杉矶",
          stopovers_site_name: "",
          time_limit: 8.01,
          sequence: 0,
          arrive_time: "08:04"
        },
        {
          ricetype: "",
          add_day: 0,
          weeks: "Daily",
          arrive_site: "SFO",
          price: 150,
          indate: "2019-03-30",
          hour: "20小时50分钟",
          currency_name: "¥",
          arrive_continent_id: 3,
          flight_id: 248,
          airline_id: 33,
          flight_name: "BR0018",
          fly_site_name: "深圳",
          airline_company_id: 11,
          airline_company_name: "长荣航空",
          fly_date: "2019-04-08",
          fly_site: "SZX",
          id: "",
          fly_time: "19:40",
          stopovers_continent_id: false,
          flight_type: "货机",
          stopovers_site: "",
          arrive_sitename: "圣弗朗西斯",
          stopovers_site_name: "",
          time_limit: 1.33,
          sequence: 0,
          arrive_time: "16:30"
        },
        {
          ricetype: "",
          add_day: 6,
          weeks: "Daily",
          arrive_site: "YVR",
          price: 17.7,
          indate: "2019-03-15",
          hour: "165小时5分钟",
          currency_name: "¥",
          arrive_continent_id: 3,
          flight_id: 586,
          airline_id: 155,
          flight_name: "CZ329",
          fly_site_name: "广州",
          airline_company_id: 15,
          airline_company_name: "南航",
          fly_date: "2019-04-08",
          fly_site: "CAN",
          id: "",
          fly_time: "14:00",
          stopovers_continent_id: false,
          flight_type: "客机",
          stopovers_site: "",
          arrive_sitename: "温哥华",
          stopovers_site_name: "",
          time_limit: 0,
          sequence: 0,
          arrive_time: "11:05"
        },
        {
          ricetype: "",
          add_day: 1,
          weeks: "Daily",
          arrive_site: "VIE",
          price: 13,
          indate: "2019-03-30",
          hour: "34小时5分钟",
          currency_name: "¥",
          arrive_continent_id: 5,
          flight_id: 341,
          airline_id: 45,
          flight_name: "BR0061",
          fly_site_name: "深圳",
          airline_company_id: 11,
          airline_company_name: "长荣航空",
          fly_date: "2019-04-08",
          fly_site: "SZX",
          id: "",
          fly_time: "22:30",
          stopovers_continent_id: false,
          flight_type: "货机",
          stopovers_site: "",
          arrive_sitename: "维也纳",
          stopovers_site_name: "",
          time_limit: 0,
          sequence: 0,
          arrive_time: "08:35"
        }
      ];
    },
    onSelect(index, val) {
      switch (index) {
        case 1:
          this.result = val.mp.detail;

          break;
        case 2:
          this.result1 = val.mp.detail;
          break;

        default:
          break;
      }
    },
    onClose(index) {
      switch (index) {
        case 1:
          this.show = false;
          break;
        case 2:
          this.show2 = false;
          break;
        case 3:
          this.show3 = false;
          break;
        case 4:
          this.show4 = false;
          break;
        default:
          break;
      }
    },
    onChange(index, val) {
      switch (index) {
        case 1:
          this.value = val.target.value;
          break;
        case 2:
          this.value2 = val.target.value;
          break;
        case 3:
          this.value3 = val.target.value;
          break;
        // case 4:

        // console.log(val.getValues())
        // this.value4 = val.mp.detail.value
        // break
        default:
          break;
      }
    },
    onConfirm(index) {
      switch (index) {
        case 1:
          this.destinationCountry = this.value;
          this.show = false;
          break;
        case 2:
          this.deliveryCity = this.value2;
          this.show2 = false;
          break;
        case 3:
          this.destinationCity = this.value3;
          this.show3 = false;
          break;
        // case 4:
        //   this.currentDate = this.value4
        //   break
        default:
          break;
      }
    },
    confirm(val) {
      this.currentDate = val.mp.detail;
      const date = new Date(val.mp.detail);
      this.date = date.getMonth() + "月" + date.getDate() + "日";
      let day;
      switch (date.getDay()) {
        case 0:
          day = "星期日";
          break;
        case 1:
          day = "星期一";
          break;
        case 2:
          day = "星期二";
          break;
        case 3:
          day = "星期三";
          break;
        case 4:
          day = "星期四";
          break;
        case 5:
          day = "星期五";
          break;
        case 6:
          day = "星期六";
          break;
      }
      this.week = day;
      this.show4 = false;
    },
    change(e) {
      // console.log(e) // 打印出了选中的时间，是个数组
    }
  },
  mounted() {
    this.initData();
  },
  onPullDownRefresh() {},
  onClose() {
    this.show = false;
  }
};
</script>
<style lang="less" scoped>
.img-box {
  height: 235px;
  width: 100%;
  background-color: #2864c6;
  overflow: hidden;
  margin-bottom: 290px;

  /deep/ image {
    margin-top: 10px;
    height: 230px;
    width: 100%;
  }
}

.tab-style {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  position: absolute;
  top: 172px;
  right: 5px;
  left: 5px;
  height: 345px;
}

.tabs {
  display: flex;
  height: 51px;
  border-radius: 6px;
  margin-top: 13px;
}

.tab-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 18px;
  color: #fff;
  font-weight: 700;
}

.tabs .active {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  opacity: 1;
  background-color: #fff;
  color: #030303;
}
.store-line {
  height: 30px;
  border-bottom: 1px solid #efefef;
  margin: 0 15px;
}
.tab-style .content {
  background-color: #fff;
  flex: 1;
  /deep/ .van-cell__title {
    margin-right: 30px;
  }
  /deep/ .van-field__input {
    ::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #bbb;
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #bbb;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #bbb;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #bbb;
    }
  }
  /deep/ .van-button {
    position: absolute;
    bottom: 10px;
    margin: 0 20px;
    border-radius: 8px;
    width: 90%;
    height: 46px;
    line-height: 48px;
    font-size: 24px;
    font-family: STXihei, "Microsoft YaHei";
    color: #fff;
    font-weight: 700;
    background: #ff6a4a;
    background: -moz-linear-gradient(left, #ff6a4a 0%, #ff2567 100%);
    background: -webkit-linear-gradient(left, #ff6a4a 0%, #ff2567 100%);
    background: linear-gradient(to right, #ff6a4a 0%, #ff2567 100%);
  }

  .itmebox {
    border-top: 0.5px solid #efefef;
    height: 40px;
    margin: 0 10px 0 15px;
  }
  .vcg {
    /deep/ .van-cell {
      width: auto;
      margin-right: 15px;
      padding-right: 0;
      font-size: 15px;
    }
  }
  .dtct {
    /deep/ .van-icon {
      font-size: 24px !important;
    }
  }
}

.query-list {
  height: 130px;
  width: 100%;
  margin-bottom: 10px;
  background: #fff;
  overflow: hidden;

  .title {
    margin: 10px 0 0 20px;
    font-size: 18px;
    color: #424242;
    font-weight: 700;
  }

  .content::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }

  .content {
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;

    .itme {
      width: 75px;
      height: 100%;
      -webkit-flex: 0 0 auto;
      -ms-flex: 0 0 auto;
      flex: 0 0 auto;

      .txt {
        color: #424242;
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 5px;
      }

      img {
        width: 60px;
        height: 60px;
      }
    }
  }
}

.route-list {
  height: auto;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .title {
    margin: 10px 0 10px 20px;
    font-size: 18px;
    color: #424242;
    margin-bottom: 5px;
    font-weight: 700;
  }

  .content {
    .itme {
      width: 165px;
      height: 50px;
      min-height: 50px;
      margin-left: 15px;
      border: 0.5px solid #bbbbbb;

      .box {
        height: 100%;
        margin-right: 10px;
        margin-left: 10px;
        .image {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }

      .txt-content {
        // margin-top: 10px;
        margin-right: 20px;
        flex:1;
        justify-content: center;
        color: #424242;

        strong {
          font-size: 12px;
          font-weight: 900;
        }

        p {
          font-size: 9px;
        }
      }

      .date {
        margin-top: 15px;
        font-size: 9px;
        width: 35px;
        color: #999999;
      }
    }
  }
}

footer {
  width: 100%;
  height: 48px;
  font-style: 12px;
  color: #bbbbbb;
}
</style>
