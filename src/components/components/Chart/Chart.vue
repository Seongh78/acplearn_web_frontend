<template lang="html">
<div class="">

    <!-- 차트 뷰 -->
    <vue-highcharts
        :options="options"
        ref="lineCharts"
        style="
            box-shadow:none;
            border:none;
            margin:0;
            height:255px;
            width:100%; ">
    </vue-highcharts>

</div>
</template>

<script>
// Highcharts - 그래프
import VueHighcharts from 'vue2-highcharts'

export default {
    name : 'chart',


    // ===== Props ===== //
    components: {
        VueHighcharts,
    },


    // ===== Props ===== //
    props : [
        'series', // 차트데이터
    ],


    // ===== Created ===== //
    created(){
         var lineCharts = this.$refs.lineCharts;
         // var series = this.series
         var series= [
             {
                 data: [2.5, -1.9, 1.5, -0.5, 4.2] ,
                 name: '자가평가',
                 color:'#7cb5ec',
                 type: 'column'
             },
             {
                 data: [3.5, 2.3, 1.5, -2.5, 5.2] ,
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
         this.$set(this.options, 'series', series)
    },


    // ===== Updated ===== //
    updated(){

         // lineCharts.addSeries(series);
    },


    // ===== Data ===== //
    data(){
        return {

            chartData: {}, // 차트데이터
            options: {
                chart: {},
                title: { text: '' },
                subtitle: { text: '' },
                xAxis: {
                    categories: ['2018-01-01', '2018-01-02', '2018-01-03', '2018-01-03', '2018-01-04'],
                    lineWidth:1
                },
                yAxis: {
                    title: { text: '' },
                    max: 5, // 최대값
                    min:-5,
                    tickAmount: 5, // 표시할 줄의 수
                    labels: {
                        formatter () { return this.value + '점'; }
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
                    column: {
                        borderWidth: 0,
                        // pointWidth: 15
                    },
                    spline: {
                        marker: {
                            radius: 5,
                            lineColor: '#fff',
                            symbolColor:'#FF5E00',
                            lineWidth: 1
                        }
                    }
                },

                series : [
                    // {
                    //     // pointWidth: 5,
                    //     data: [-2.5, 1.9, 1.5, 0.5, 4.2] ,
                    //     name: '자가평가',
                    //     color:'#7cb5ec',
                    //     type: 'column'
                    // },
                    // {
                    //     // pointWidth: 5,
                    //     data: [3.5, 2.3, 1.5, 2.5, 5] ,
                    //     name: '팀원평가',
                    //     color:'#90ed7d',
                    //     type: 'column'
                    // },
                    // {
                    //     data: [2.5, 2.1, 1.5, 1.5, 4.7] ,
                    //     name: 'GAP',
                    //     color:'#FF8224'
                    // },
                ] // series
            }// option

        }
    },// data


    // ===== Methods ===== //
    methods:{


        // 하이차트 테스트
        chartLoad(){
            var series= [
                {
                    data: [2.5, 1.9, 1.5, 0.5, 4.2] ,
                    name: '자가평가',
                    color:'#7cb5ec',
                    type: 'column'
                },
                {
                    data: [3.5, 2.3, 1.5, 2.5, 5.2] ,
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
              for(var ii  in  series){
                // lineCharts.addSeries(series[ii]);
                this.options.series.push(series[ii])
              }
              // lineCharts.addSeries(asyncData);
              // lineCharts.hideLoading();
        },


    }// methods
}
</script>

<style lang="css">
</style>
