<template>
  <div>
    <Calendar
      :months="months"
      :value="value"
      :begin="begin"
      :end="end"
      @next="next"
      @prev="prev"
      :events="events"
      lunar
      clean
      @select="select"
      ref="calendar"
      @selectMonth="selectMonth"
      @selectYear="selectYear"
      :arrowLeft="arrowLeft"
      :tileContent="tileContent"
      :almanacs="almanacs"
    />
    <!-- <button @click="setToday">返回今日</button>
    <button @click="dateInfo">日期信息</button>
    <button @click="renderer">重新渲染年月日期</button> -->
  </div>
</template>

<script>
import Calendar from 'mpvue-calendar'
import 'mpvue-calendar/src/style.css'
// import arrowLeft from '../assets/arrowLeft.png' //使用自定义箭头图片

export default {
  data () {
    return {
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      value: [new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()],
      begin:[new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()],
      end:[new Date(new Date().getTime() + 60*24 * 3600 * 1000).getFullYear(),new Date(new Date().getTime() + 60*24 * 3600 * 1000).getMonth()+1,new Date(new Date().getTime() +60* 24 * 3600 * 1000).getDate()],
      events: {'2018-6-7':'今日备注', '2018-6-8':'一条很长的明日备注'},
      almanacs: {'9-3': '抗战胜利日', '11-17': '学生日'},
      tileContent: [
          {date: '2018-9-22', className: 'holiday ', content: '休'},
          {date: '2018-9-23', className: 'holiday ', content: '休'}
      ],
      arrowLeft: ''
    }
  },
  components: {
    Calendar
  },

  methods: {
    prev(year, month, weekIndex) {
      console.log(year, month, weekIndex)
    },
    next(year, month, weekIndex) {
      console.log(year, month, weekIndex)
    },
    selectYear(year) {
      console.log(year)
    },
    selectMonth(month, year) {
      console.log(year, month)
    },
    setToday() {
      this.$refs.calendar.setToday()
    },
    dateInfo() {
      const info = this.$refs.calendar.dateInfo(2018, 8, 23)
      console.log(info);
    },
    renderer() {
      this.$refs.calendar.renderer(2018, 8); //渲染2018年8月份
    },
    select(val, val2) {
            this.$emit("childByValue", val2);

      // console.log(val)
      // console.log(val2)
    }
  },
  mounted() {
    // console.log(this.end)
  },
}
</script>
