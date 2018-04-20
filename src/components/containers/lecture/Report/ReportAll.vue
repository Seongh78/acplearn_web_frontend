<template lang="html">
<div class="">

    <!-- 전체 - 통계 -->
    <h4 class="ui block attached header " style="border-top:1px solid #d7d7d7;">액플런 전체 평균</h4>

    <!-- 데이터가 있는경우 -->
    <div class="ui attached segment" style="padding:0; overflow-x:scroll;" >
        <slide-graph :chart="chartData" />
    </div>



    <br>



    <br>
    <br>

</div>
</template>




<!-- ===== Script ==== -->
<script>
import {
    Modal,
    Timeline,
    Feed ,
    NoContents,
    Rating,
    Comment,
    Loading,
    Chart,
    TabMenu,
    SlideGraph
} from '../../../components'


// import  SlideGraph  from '../../../components/Chart/SlideGraph'


const name = 'ReportAll'


export default {
    name: name,


    // ===== Components ===== //
    components:{
        Modal,
        Timeline,
        Feed ,
        NoContents,
        Rating,
        Comment,
        Loading,
        TabMenu,
        SlideGraph,
    },



    // ===== Props ===== //
    props:['sessionData'],



    // ===== Data ===== //
    data(){ return {
        sess:[],
        chartData:[], // 차트데이터
        xAxis:[],
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

    }},



    // ===== Created ===== //
    created(){
        this.$set(this, 'sess', this.sessionData)
        this.allAvgFunc()
    },



    // ===== Updated ===== //
    updated(){

    },



    // ===== Methods ===== //
    methods:{



        // === 전체 평균데이터 === //
        allAvgFunc(){
            // 강의아이디
            var lid = this.$router.history.current.params.id

            // base URL
            var baseURL = '/api/plans/score/'+lid

            this.$http.get(baseURL)
            .then(resp=>{
                // console.log(resp.data.score);
                this.$set(this, 'chartData', resp.data.score)
            })
            .catch(err=>{
                alert('Error - '+err)
                console.log(err);
            })
        },


    },

}
</script>







<!-- ===== Style ==== -->
<style lang="css">
</style>
