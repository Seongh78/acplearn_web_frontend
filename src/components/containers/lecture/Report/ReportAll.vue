<template lang="html">
<div class="">

    <!-- 전체 - 통계 -->
    <h4 class="ui block attached header " style="border-top:1px solid #d7d7d7;">액플런 전체 평균</h4>


    <div class="ui grid">
        <div class="eleven wide column">
            <div class="ui attached segment" style="padding:0; overflow-x:scroll;" >
                <slide-graph :chart="chartData" />
            </div>
        </div>

        <div class="five wide column">
            <loading v-if="kpiAvg.length<1" />
            <polar-chart :data="kpiAvg" size="100%" v-else />
        </div>
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
    SlideGraph,
    PolarChart,
} from '../../../components'







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
        PolarChart
    },



    // ===== Props ===== //
    props:['sessionData'],



    // ===== Data ===== //
    data(){ return {
        sess : [],
        chartData : [], // 차트데이터
        kpiAvg: [],

options: {
    chart: {
        polar: true,
        type: 'line'
    },

    title: {
        text: null,
        // x: -80
    },

    pane: {
        size: '75%'
    },

    xAxis: {
        categories: ['Sales', 'Marketing', 'Development', 'Customer', 'Admin'],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
    },

    legend: {
        align: 'right',
        // layout: 'vertical'
    },

    series: [
        {
            name: '자가',
            data: [5, 2, 3, 4, 5],
            pointPlacement: 'on',
            color:'#7cb5ec'
        },
        {
            name: '팀원',
            data: [2, 3, 4, 4, 2],
            pointPlacement: 'on',
            color:'#90ed7d'
        },
        {
            name: 'GAP',
            data: [5, 3, 4, 3, 2],
            pointPlacement: 'on',
            color:'#FF8224'
        }
    ]
}


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
                this.$set(this, 'kpiAvg', resp.data.kpiAvg)
            })
            .catch(err=>{
                alert('Error - '+err)
                console.log(err);
            })
        },


        // === 하이차트 로드 === //
        load(){

        },// === 하이차트 로드 === //


    },

}
</script>







<!-- ===== Style ==== -->
<style lang="css">
</style>
