<template lang="html">
<div class="">

    <top-layout bg="true">
        <nav-bar bg="true"/>
        <page-title mainTitle="액플런 실험실" subTitle="" />
    </top-layout>



    <page-layout>





        <h3>LectureAcplearnDay</h3>

        <lecture-acplearn-day />


        <hr>
        <br>
        <br>
        <br>











        <h4>Highcharts TEST</h4>
        <date-picker-two v-model="time1" :first-day-of-week="1" lang="en" type="datetime" format="yyyy-MM-dd hh:mm:ss"></date-picker-two>
        <date-picker-two v-model="time2" range :shortcuts="shortcuts"></date-picker-two>
        {{time1}}
        <hr>
        <!-- <date-picker v-model="ddd" placeholder="년-월-일" format="yyyy-MM-dd" type="date" /> -->
        <date-picker v-model="ddd" placeholder="년-월-일"  type="date" :first-day-of-week="1" />
        {{ddd}}
        <br>
        <br>
        <br>



        <h4>Highcharts TEST</h4>
        <div class="">
            <vue-highcharts :options="chartData" ref="lineCharts" style="box-shadow:none;"></vue-highcharts>
            <button @click="load">load</button>
        </div>



        <!-- <h4>Vertical Tab2</h4>
        <time-picker-test v-model="time" />
        <time-picker-test  min-hour="3" />
        <hr>
        <date-picker-test v-model="date"></date-picker-test>
        <p>
          Month: {{date.month}}
          Year: {{date.year}}
        </p>
        <br>
        <br>
        <br>

        <h4>Vertical Tab</h4>
        <div class="">

            <vertical-tab />

        </div> -->



        <!-- <h4>Timepicker</h4>
        <date-picker v-model="date" format="yyyy-MM-dd" minimumView="day" maximumView="day" language="ko"></date-picker>
        {{date}}
        <hr>



        <br>
        <br>
        <br>


        <h4>페이징 테스트</h4>
        <paging />
        <hr>



        <br>
        <br>
        <br>




        <button type="button" class="ui green button" @click="callTest">call test{{ddd}}</button>
        <button type="button" class="ui blue button" @click="callTest2">call test2 {{ddd}}</button>
        <button type="button" class="ui red button" @click="$EventBus.$emit('close')">to child</button>

        <event-bus >
            <h3>{{ items }}</h3>
        </event-bus>

        <br>
        <br>
        <br>

         <react /> -->


        <h4>Timepicker TEST</h4>


        <hr>
        <h4>Rating TEST</h4>
        <rating />


    </page-layout>





</div>
</template>

<script>
import {
    Navbar,
    Card,
    PageTitle,
    TopLayout,
    PageLayout ,
    Rating,
    Pagination
} from '@/components/components'
import { LectureAcplearnDay } from './TestComponents'



import Eventbus from './Eventbus'
import Reactivity from './Reactivity'
import Timepicker from './Timepicker'
import TimePickerTest from './TimePickerTest'
import VerticalTab from './VerticalTab'
import DatePickerTwo from 'vue2-datepicker'

// import DatePickerTest from './DatePickerTest.vue';

import DatePicker from 'vuejs-datepicker'
/*
타임피커 형식 format
"d MMM yyyy"           d MMM yyyy           - e.g       12 Feb 2016
"d MMMM yyyy"       d MMMM yyyy        - e.g       12 February 2016
"yyyy-MM-dd"           yyyy-MM-dd            - e.g        2016-02-12
"dsu MMM yyyy"      dsu MMM yyyy        - e.g       12th Feb 2016
"D dsu MMM yyyy"  D dsu MMM yyyy     - e.g       Sat 12th Feb 2016
*/

import VueHighcharts from 'vue2-highcharts'




// 차트 데이터
const asyncData = {
    name: '자가평가',
    marker: {
        symbol: 'round'
    },
    data: [
        { data: [3.5, 2.9, 1.5, 0.5, 4.2] },
        { data: [3.5, 2.9, 1.5, 0.5, 4.2] },
    ]
}







export default {
    name: 'Lab',

    components: {
        'nav-bar' : Navbar,
        'card' : Card,
        'page-title' : PageTitle,
        'top-layout' : TopLayout,
        'page-layout' : PageLayout,
        'event-bus' : Eventbus,
        'react' : Reactivity,
        'time-picker' : Timepicker,
        'rating': Rating,
        'paging' : Pagination,
        'date-picker' : DatePicker,
        // DatePickerTest,
        TimePickerTest,
        'vertical-tab' : VerticalTab,
        VueHighcharts,
        DatePickerTwo,
        LectureAcplearnDay
    },

    data () {
        return {
            items:0,
            ddd:0,
            // tdtd : '2018-02-26 10:00:00'
            tdtd : '10:00:00',
            date: {
                month: 1,
                year: 2017
            },
            time:'',


            chartData: {}, // 차트데이터

            // 하이차트 데이터 옵션
            options: {
                chart: {
                    // type: 'spline'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    // text: 'Source: WorldClimate.com'
                },
                xAxis: {

                    categories: ['1일차', '2일차', '3일차', '4일차', '5일차']
                },
                yAxis: {
                    max:5,
                    title: {
                        text: ''
                    },
                    labels: {
                        formatter: function () {
                            // return this.value + '°';
                            return this.value + '점';
                        }
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    spline: {
                      marker: {
                        radius: 5,
                        lineColor: '#fff',
                        symbolColor:'#FF5E00',
                        lineWidth: 1
                      }
                    }
                },

                series:[]
                // series: [
                //     {
                //         data: [2.5, 1.9, 1.5, 0.5, 4.2] ,
                //         name: '자가평가',
                //         color:'#7cb5ec',
                //         type: 'column'
                //     },
                //     {
                //         data: [3.5, 2.3, 1.5, 2.5, 5.2] ,
                //         name: '팀원평가',
                //         color:'#90ed7d',
                //         type: 'column'
                //     },
                //     {
                //         data: [2.5, 2.1, 1.5, 1.5, 4.7] ,
                //         name: 'GAP',
                //         color:'#FF8224',
                //         // type: 'column'
                //     },
                // ] // series

            },// option

            // ===== vue2-datepicker ===== //
            time1: '',
            time2: '',
            shortcuts: [
                {
                    text: 'Today',
                    start: new Date(),
                    end: new Date()
                }
            ]
            // ===== vue2-datepicker ===== //
        }
    }, //data

    created() {

        var aa = new Date("10:20:32")
        // console.log("aa.getHours : ");
        // console.log(aa.getTime());

        sessionStorage.clear();
        this.$EventBus.$on('add-item', this.addToCart)
        this.$EventBus.$on('save', this.save)
        this.$EventBus.$on('toto', this.toto)
        this.$EventBus.$on('dateTest', this.dtdt)


        // 날짜 일수 차이구하기
        var sdt = new Date('2018-09-10');
        var edt = new Date('2018-09-15');
        // console.log(sdt.getTime());
        // console.log(edt.getTime());
        var dateDiff = Math.ceil((edt.getTime()-sdt.getTime())/(1000*3600*24));
        // var d = diffDate('Tue Jan 16 2018 09:00:00 GMT+0900 (KST)', 'Wed Jan 17 2018 09:00:00 GMT+0900 (KST)')
        console.log( "DATE : ", dateDiff );

        var temDate = new Date();
        for(var ii=0;  ii<=dateDiff;  ii++){
            temDate.setDate(sdt.getDate()+ii)
            console.log(temDate.getFullYear()+"-"+(temDate.getMonth()+1)+"-"+temDate.getDate());
        }
      },









      updated(){
        // console.log('uuuuuu');
      },









    methods: {



        load(){
            var series= [
                {
                    data: [2.5, 1.9, 1.5, 0.5, 4.2] ,
                    name: '자가평가',
                    color:'#7cb5ec',
                    type: 'column'
                },
                {
                    data: [3.5, 2.3, 1.5, 2.5, 4.9] ,
                    name: '팀원평가',
                    color:'#90ed7d',
                    type: 'column'
                },
                {
                    data: [2.5, 2.1, 1.5, 1.5, 4.7] ,
                    name: 'GAP',
                    color:'#FF8224'
                },
            ] // series
              let lineCharts = this.$refs.lineCharts;
              lineCharts.delegateMethod('showLoading', 'Loading...');
              setTimeout(() => {
                  for(var ii  in  series){
                    lineCharts.addSeries(series[ii]);
                  }

                  // lineCharts.addSeries(asyncData);
                  lineCharts.hideLoading();
              }, 1000)
          },






        dtdt(tt){
            this.$set(this, 'tdtd', tt)
            console.log("this.tdtd - ");
            console.log(this.tdtd);
        },

        callTest(){
            this.$http.get('/api/lectures/call/test').then(resp=>{
                if (resp.data.result== 200) {
                    this.$http.get('/api/lectures/call/test').then(r=>{
                        this.$set(this, 'ddd', 10)
                    })
                }
            })
        },

        callTest2(){
            this.$http.get('/api/lectures/call/test').then(resp=>{
                if (resp.data.result== 200) {
                    this.$http.get('/api/lectures/call/test').then(r=>{
                        this.$set(this, 'ddd', this.ddd+1)
                    })
                }
            })
        },

        addToCart(items) {
            this.items = items
        },

        toto(a,b,c){
            // console.log(a+': '+b+' : '+c);
        },

        save(storageName, jsonData) {
            // console.log(storageName+': ', jsonData);
            sessionStorage.setItem(storageName, JSON.stringify(jsonData));
        }
    },
}
</script>

<style lang="css">
</style>
