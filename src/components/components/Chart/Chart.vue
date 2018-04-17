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

    <table style="width:100%; margin:0; border:none;" class="structured ui table celled">
        <colgroup>
            <col width="12%">
            <col>
            <col>
            <col>
            <col>
            <col>
        </colgroup>
        <tbody v-if="chartData.length>0">
            <tr>
                <th class="borderTop">자가평가</th>
                <td class="center aligned borderTop" v-for="(self, sid)  in  chartData[0].data">{{ self.toFixed(1) }}</td>
            </tr>
            <tr v-if="chartData.length>2">
                <th class="borderTop">GAP</th>
                <td class="center aligned" v-for="(gap, gid)  in  chartData[2].data">{{ gap.toFixed(1) }}</td>
            </tr>
            <tr>
                <th class="borderTop">팀원평가</th>
                <td class="center aligned" v-for="(others, oid)  in  chartData[1].data">{{ others.toFixed(1) }}</td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr>
                <th class="borderTop">자가평가</th>
                <td class="center aligned" >asdasds</td>
            </tr>
        </tbody>
    </table>

</div>
</template>












<script>
// Highcharts - 그래프
import VueHighcharts from 'vue2-highcharts'

export default {
    name : 'chart',


    // ===== Components ===== //
    components: {
        VueHighcharts,
    },


    // ===== Props ===== //
    props : [
        'series', // 차트데이터,
        'table', // 필터
        'value', //필터의 값
    ],


    // ===== Data ===== //
    data(){
        return {

            chartData:[], // 차트데이터
            options: {
                chart: {},
                title: { text: null },
                subtitle: { text: null },
                xAxis: {
                    // categories: ['2018-01-01', '2018-01-02', '2018-01-03', '2018-01-03', '2018-01-04'],
                    categories: [],
                    lineWidth:1,
                    min: 0,
                    max: 15,
                    scrollbar: {
                         height: 30
                    },
                    tickLength: 0
                },
                yAxis: {
                    title: { text: null },
                    max: 5, // 최대값
                    min:-5,
                    tickAmount: 5, // 표시할 줄의 수
                    labels: {
                        formatter () { return this.value + '점'; }
                    },

                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },

                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },


                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    },
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

                series : [] // series

            }// option

        }
    },// data






    // ===== Created ===== //
    created(){
        // 차트데이터 로드
        this.allAvgFunc()

    },












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
                    data: [8.5, 2.1, 1.5, 1.5, 4.7] ,
                    name: 'GAP',
                    color:'#FF8224'
                }
            ] // series
              let lineCharts = this.$refs.lineCharts;
              for(var ii  in  series){
                lineCharts.addSeries(series[ii]);
              }
        },




        // === 전체 평균데이터 === //
        allAvgFunc(){
            // base URL
            var baseURL = '/api/plans/score/'+14
            if (this.table) {  baseURL += '?_filter='+String(this.table)  }
            if (this.value) {  baseURL += '&_value='+Number(this.value)  }

            this.$http.get(baseURL)
            .then(resp=>{
                var score = resp.data.score // 찾은 데이터
                var lineCharts = this.$refs.lineCharts; // 그래프 아이디

                // 차트 데이터만들기
                var series = [], selfScore=[], othersScore=[], gap=[], xAxis=[]
                var scoreKeys = Object.keys(score)
                for(var sid  in  scoreKeys){
                    xAxis.push(score[sid].lad_date)
                    selfScore.push(score[sid].avgSelfScore) // 자가평가
                    othersScore.push(score[sid].avgOthersScore) // 자가평가
                    gap.push(score[sid].avgSelfScore - score[sid].avgOthersScore) // GAP
                }

                // 그래프 모델로 푸시
                series.push({
                    data: selfScore ,
                    name: '자가평가',
                    color:'#7cb5ec',
                    type: 'column'
                })
                series.push({
                    data: othersScore ,
                    name: '팀원평가',
                    color:'#90ed7d',
                    type: 'column'
                })
                series.push({
                    data: gap ,
                    name: 'GAP',
                    color:'#FF7012'
                })

                // 그리기
                for(var ii  in  series){
                    lineCharts.addSeries(series[ii]);
                }
                this.$set(this,'chartData',series)
                this.$set(this.options.xAxis,'categories',xAxis)
            })
            .catch(err=>{
                alert('Error - '+err)
                console.log(err);
            })
        },


    }// methods
}
</script>

<style lang="css">
</style>
