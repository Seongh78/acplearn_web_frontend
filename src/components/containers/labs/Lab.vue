<template lang="html">
<div class="">

    <top-layout bg="true">
        <nav-bar bg="true"/>
        <page-title mainTitle="액플런 실험실" subTitle="" />
    </top-layout>



    <page-layout>


        <h4>Vertical Tab2</h4>
        <time-picker-test v-model="time" />
        <!-- <time-picker-test  min-hour="3" /> -->
        {{time}}
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

        </div>



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

        <!-- <react /> -->


        <h4>Timepicker TEST</h4>


        <hr>
        <h4>Rating TEST</h4>
        <rating /> -->


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



import Eventbus from './Eventbus'
import Reactivity from './Reactivity'
import Timepicker from './Timepicker'
import TimePickerTest from './TimePickerTest'
import VerticalTab from './VerticalTab'

import DatePickerTest from './DatePickerTest.vue';

import DatePicker from 'vuejs-datepicker'
/*
타임피커 형식 format
"d MMM yyyy"           d MMM yyyy           - e.g       12 Feb 2016
"d MMMM yyyy"       d MMMM yyyy        - e.g       12 February 2016
"yyyy-MM-dd"           yyyy-MM-dd            - e.g        2016-02-12
"dsu MMM yyyy"      dsu MMM yyyy        - e.g       12th Feb 2016
"D dsu MMM yyyy"  D dsu MMM yyyy     - e.g       Sat 12th Feb 2016
*/






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
        'date-picker' : Datepicker,
        DatePickerTest,
        TimePickerTest,
        'vertical-tab' : VerticalTab,
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
            time:''
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
      },


      updated(){
        // console.log('uuuuuu');
      },



    methods: {

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
