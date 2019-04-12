<template>
  <div class="container">
    <div style="position:fixed; background:#fff;z-index:2">
      <div class="ub-box ub-between ub-ver-v" style="height:50px;width: 750rpx;">
        <div style="color:#000;font-size:24px;margin-left:15px">选发货日期</div>
        <div
          style="padding-right:15px;width:30px;height:50px;font-size:40px;color:#ccc;line-height:50px;text-align:center;"
          @click="$navigateBack()"
        >×</div>
      </div>
      <div class="headbox2">
        <div class="headdate currentcolor">日</div>
        <div class="headdate">一</div>
        <div class="headdate">二</div>
        <div class="headdate">三</div>
        <div class="headdate">四</div>
        <div class="headdate">五</div>
        <div class="headdate currentcolor">六</div>
      </div>
    </div>

    <div class="ub-box ub-between ub-ver-v" style="height:50px;">
      <div style="color:#000;font-size:24px;margin-left:15px">选发货日期</div>
      <div
        style="padding-right:15px;width:30px;height:50px;font-size:24px;color:#ccc;line-height:50px;text-align:center;"
        @click="$navigateBack()"
      >x</div>
    </div>
    <div class="headbox">
      <div class="headdate currentcolor">日</div>
      <div class="headdate">一</div>
      <div class="headdate">二</div>
      <div class="headdate">三</div>
      <div class="headdate">四</div>
      <div class="headdate">五</div>
      <div class="headdate currentcolor">六</div>
    </div>
    <div class="mouth" v-for="(items, index) in date" :key="index">
      <div class="mouthhead">{{items[index].year}}年{{items[index].month}}月</div>
      <div class="daybox ub-box ub-wrap">
        <div class="day" v-if="weeks[index]>0"></div>
        <div class="day" v-if="weeks[index]>1"></div>
        <div class="day" v-if="weeks[index]>2"></div>
        <div class="day" v-if="weeks[index]>3"></div>
        <div class="day" v-if="weeks[index]>4"></div>
        <div class="day" v-if="weeks[index]>5"></div>
        <div
          v-if="item.isPastDay"
          class="day past-day"
          v-for="(item,index1) in items"
          :key="item"
          @click="selectday(index,index1)"
        >{{item.day}}</div>
        <div
          v-if="!item.isPastDay"
          :class=" item.selected == 1 ? (item.week == 6||item.week == 0?'day bc currentcolor':'day bc '):(item.week == 6||item.week == 0?'day currentcolor':'day')"
          v-for="(item,index1) in items"
          :key="item"
          @click="selectday(index,index1)"
        >{{item.day}}</div>
         <div class="day" v-if="nullBox[index]>0"></div>
        <div class="day" v-if="nullBox[index]>1"></div>
        <div class="day" v-if="nullBox[index]>2"></div>
        <div class="day" v-if="nullBox[index]>3"></div>
        <div class="day" v-if="nullBox[index]>4"></div>
        <div class="day" v-if="nullBox[index]>5"></div>
      </div>
    </div>
    <!-- <div class="none88" v-if="{{pagetype=='day'}}"></div> -->
    <!-- <div class="fixedbtn" bindtap="submitbtn" wx:if="{{pagetype=='day'}}">确认选择</div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: [],
      weeks: [],
      nullBox:[],
    };
  },
  mounted() {
    this.dateData();
    if (this.$root.$mp.query.initDate !== "") {
      console.log(this.$root.$mp.query.initDate);
      let flag = false;
      for (let i = 0; i < this.date.length; i++) {
        for (let j = 0; j < this.date[i].length; j++) {
          if (this.date[i][j].re === this.$root.$mp.query.initDate) {
            this.date[i][j].selected = 1;
            flag = true;
            break;
          }
        }
        if (flag) {
          break;
        }
      }
    }
  },
  methods: {
    selectday(index, index1) {
      let flag = false;
      for (let i = 0; i < this.date.length; i++) {
        for (let j = 0; j < this.date[i].length; j++) {
          if (
            this.date[i][j].selected === 1 &&
            this.date[i][j].re !== this.date[index][index1].re
          ) {
            this.date[i][j].selected = 0;
            flag = true;
            break;
          }
        }
        if (flag) {
          break;
        }
      }
      if (this.date[index][index1].selected === 1) {
        this.date[index][index1].selected = 0;
      } else {
        this.date[index][index1].selected = 1;
        const that = this;
        this.$reLaunch("index", { date: that.date[index][index1].re });
      }
    },
    dateData() {
      let dataAll = []; //总日历数据
      let dataAll2 = []; //总日历数据
      let dataMonth = []; //月日历数据
      let date = new Date(); //当前日期
      let year = date.getFullYear(); //当前年
      let week = date.getDay(); //当天星期几
      let weeks = [];
      let month = date.getMonth() + 1; //当前月份
      let day = date.getDate(); //当天
      let daysCount = 365; //一共显示多少天
      let dayscNow = 0; //计数器
      let monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; //月份列表
      let nowMonthList = []; //本年剩余年份
      let festival = [
        { "1-1": "元旦" },
        { "3-8": "妇女节" },
        { "3-12": "植树节" },
        { "5-1": "劳动节" },
        { "5-4": "青年节" },
        { "6-1": "儿童节" },
        { "7-1": "建党节" },
        { "8-1": "建军节" },
        { "9-10": "教师节" },
        { "10-1": "国庆节" }
      ];
      for (let i = month; i < 13; i++) {
        nowMonthList.push(i);
      }
      let yearList = [year]; //年份最大可能
      for (let i = 0; i < daysCount / 365 + 1; i++) {
        yearList.push(year + i + 1);
      }
      let leapYear = function(Year) {
        //判断是否闰年
        if ((Year % 4 == 0 && Year % 100 != 0) || Year % 400 == 0) {
          return true;
        } else {
          return false;
        }
      };
      for (let i = 0; i < yearList.length; i++) {
        //遍历年
        let mList;
        if (yearList[i] == year) {
          //判断当前年份
          mList = nowMonthList;
        } else {
          mList = monthList;
        }
        for (let j = 0; j < mList.length; j++) {
          //循环月份
          dataMonth = [];
          let t_days = [
            31,
            28 + leapYear(yearList[i]),
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
          ];
          let t_days_thisYear = [];
          if (yearList[i] == year) {
            for (let m = 0; m < nowMonthList.length; m++) {
              t_days_thisYear.push(t_days[mList[m] - 1]);
            }
            t_days = t_days_thisYear;
          } else {
            t_days = [
              31,
              28 + leapYear(yearList[i]),
              31,
              30,
              31,
              30,
              31,
              31,
              30,
              31,
              30,
              31
            ];
          }
          for (let k = 0; k < t_days[j]; k++) {
            //循环每天
            dayscNow++;
            let nowData;
            if (dayscNow < daysCount) {
              //如果计数器没满
              let days = k + 1;
              if (days < 10) {
                days = "0" + days;
              }
              if (yearList[i] == year && mList[j] == month) {
                //判断当年当月
                if (k + 1 >= day) {
                  nowData = {
                    isPastDay: 0,
                    year: yearList[i],
                    month: mList[j],
                    day: k + 1,
                    date: yearList[i] + "" + mList[j] + days,
                    selected: 0,
                    week: new Date(
                      yearList[i] + "/" + mList[j] + "/" + days
                    ).getDay(),
                    re: yearList[i] + "/" + mList[j] + "/" + days
                  };
                  dataMonth.push(nowData);
                  // if (k + 1 == day) {
                  //   let date = new Date(
                  //     yearList[i] + "/" + mList[j] + "/" + (k + 1)
                  //   );
                  //   let weekss = date.getDay(); //获取每个月第一天是周几
                  //   weeks.push(weekss);
                  // }
                } else {
                  nowData = {
                    isPastDay: 1,
                    year: yearList[i],
                    month: mList[j],
                    day: k + 1,
                    date: yearList[i] + "" + mList[j] + days,
                    selected: 0,
                    week: new Date(
                      yearList[i] + "/" + mList[j] + "/" + days
                    ).getDay(),
                    re: yearList[i] + "/" + mList[j] + "/" + days
                  };
                  dataMonth.push(nowData);
                }
              } else {
                //其他情况
                nowData = {
                  //组装自己需要的数据
                  isPastDay: 0,
                  year: yearList[i],
                  month: mList[j],
                  day: k + 1,
                  date: yearList[i] + "" + mList[j] + days,
                  selected: 0,
                  week: new Date(
                    yearList[i] + "/" + mList[j] + "/" + days
                  ).getDay(),

                  re: yearList[i] + "/" + mList[j] + "/" + days
                };
                dataMonth.push(nowData);
              }
              if (k == 0) {
                let date = new Date(yearList[i] + "/" + mList[j] + "/" + k + 1);
                let weekss = date.getDay(); //获取每个月第一天是周几
                weeks.push(weekss);
              }
            } else {
              break;
            }
          }
          dataAll.push(dataMonth);
        }
      }
      for (let i = 0; i < dataAll.length; i++) {
        if (dataAll[i].length != 0) {
          dataAll2.push(dataAll[i]);
        }
      }

      this.date = dataAll2;
      this.weeks = weeks;
      console.log(this.date)
      console.log(this.weeks)
      for(let k =0;k<this.weeks.length;k++){
        if((7-this.date[k].length%7)>=this.weeks[k]){
          this.nullBox[k] =(7-this.date[k].length%7)-this.weeks[k]

        }else{
          this.nullBox[k] =7+(7-this.date[k].length%7)-this.weeks[k]
        }
      }

    }
  }
};
</script>
<style lang="less" scoped>
.headdate {
  height: 30px;
  background-color: white;
  flex: 1;
  text-align: center;
  line-height: 30px;
  font-size: 13px;
  color: #b3b3b3;
}
.headbox {
  display: flex;
  display: -webkit-flex;
  border-bottom: 1px solid #e5e5e5;
}
.headbox2 {
  display: flex;
  // position: fixed;
  width: 750rpx;
  display: -webkit-flex;
  border-bottom: 1px solid #e5e5e5;
  background-color: white;
  // z-index: 2;
}
.mouthhead {
  height: 88rpx;
  background-color: #f4f4f4;
  width: 750rpx;
  line-height: 88rpx;
  text-align: center;
}
.mouth {
  /* background-color: white; */
  /* padding-top: 10rpx;
  padding-bottom: 10rpx;  */
}
.daybox {
  // border-top: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  background-color: white;
  // padding-top: 10rpx;
}
.day {
  width: 107rpx;
  height: 107rpx;
  line-height: 107rpx;
  text-align: center;
  display: inline-block;
  // position: relative;
  // top: 0;
  // margin-top: -10rpx;
  overflow: hidden;
  color: #323332;
  font-size: 13px;
  font-weight: 700;
  // border-bottom: 1px solid #bbb;
  border-top: 1px solid #bbb;
}
.day2 {
  color: #04babe;
  width: 107rpx;
  height: 107rpx;
  line-height: 107rpx;
  text-align: center;
  display: inline-block;
  position: relative;
  bottom: 0;
  margin-top: 0;
}
.actname {
  color: #04babe;
  position: absolute;
  font-size: 20rpx;
  top: -30rpx;
  width: 107rpx;
  text-align: center;
}
.actname2 {
  color: #04babe;
  position: absolute;
  font-size: 20rpx;
  bottom: -30rpx;
  width: 107rpx;
  text-align: center;
}
.bc {
  background-color: #3a84ee;
  color: white !important;
}
.bc2 {
  color: white !important;
}
.none88 {
  height: 88rpx;
  width: 750rpx;
}

.currentcolor {
  color: #ff3a2f;
}
.past-day {
  color: #b3b3b3;
}
</style>
