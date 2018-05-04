<template lang="html">
<div class="">

    <!-- 팀별 - 통계 -->

    <div v-for="(group, gid)  in  groups" :key="gid">

        <h4 class="ui block attached header" style="border-top:1px solid #d7d7d7;">
            {{ group.group_name }}(조) 평균
            &nbsp;&nbsp;<button type="button" class="ui button blue mini" @click.prevent="getPlanListFunc('group', group.group_idx)">액션플랜보기</button>
            <hr class="opacity3">
            <small>
                <a
                    class="cursorPointer"
                    v-for="(std,stdId) in  from.students"
                    v-if="std.group_idx===group.group_idx"
                    @click.prevent="personalGraphFunc(std.stu_idx)">
                     [{{ std.stu_name }}] &nbsp;
                </a>
            </small>
        </h4>

        <div class="ui grid">
            <div class="eleven wide column">
                <div class="ui attached segment" style="padding:0; overflow-x:scroll;" >
                    <slide-graph :chart="group.score" />
                </div>
            </div>

            <div class="five wide column">
                <loading v-if="group.kpi==undefined || group.kpi == null" />
                <polar-chart :data="group.kpi" size="100%" v-else></polar-chart>
            </div>
        </div>




        <br>
        <br>
        <br>
    </div>








</div>
</template>





<script>
import {
    Modal,
    Timeline,
    Feed ,
    NoContents,
    Rating,
    Comment,
    Loading,
    TabMenu,
    SlideGraph,
    PolarChart,
} from '../../../components'

const name = 'ReportGroup'

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
    props:['from'],



    // ===== Data ===== //
    data(){ return {
        lec_idx : null,
        modal : {
            personalGraph : true
        },
        groups:[],
        chartData:[],


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
        // 강의아이디
        var lid = this.$router.history.current.params.id
        this.$set(this, 'lec_idx', lid)
        this.$set(this, 'groups', this.from.groups)

        this.groups.forEach(g=>{
            this.allAvgFunc(g.group_idx)
        })
    },



    // ===== Updated ===== //
    updated(){

    },



    // ===== Methods ===== //
    methods:{



        // === 전체 평균데이터 === //
        allAvgFunc(val){
            // base URL - 그룹별
            var baseURL = '/api/plans/score/'+this.lec_idx+'/group/'+val

            this.$http.get(baseURL)
            .then(resp=>{
                var rid = this.groups.findIndex(g=>{
                    return g.group_idx == val
                })
                this.$set(this.groups[rid], 'score', resp.data.score)
                this.$set(this.groups[rid], 'kpi', resp.data.kpiAvg)
            })
            .catch(err=>{
                alert('Error - '+err)
                console.log(err);
            })
        },






        // ===== 해당 차트의 플랜목록 ===== //
        getPlanListFunc(classification, value){
            var url = '/api/plans/ap/'+this.lec_idx+'?classification='+classification+'&value='+value
            this.$http.get(url)
            .then(resp=>{
                this.$EventBus.$emit('modal', {
                    name : 'planList',
                    plans : resp.data.plans
                })
            })
            .catch(err=>{
                alert('plans list error')
            })

        },







        // === 개별데이터 === //
        personalGraphFunc(stu_idx){

            // this.$http.get('/api/plans/personal/'+this.lec_idx+'/'+stu_idx)

            this.$http.all([
                this.$http.get('/api/plans/personal/'+this.lec_idx+'/'+stu_idx),
                this.$http.get('/api/plans/comments/'+stu_idx)
            ])
            .then(this.$http.spread((resp, resp2)=>{

                //누적데이터
                var allAvg = resp.data.allAvg.length<1 ? [] : resp.data.allAvg
                var kpiAvg = resp.data.kpiAvg.length<1 ? [] : resp.data.kpiAvg
                var comments = resp2.data.comments

                // 모달 ON
                this.$EventBus.$emit('modal', {
                    name : 'personalGraph',
                    stu_idx,
                    score : resp.data.plans,
                    kpiAvg,
                    allAvg,
                    comments
                })
            }))
            .catch(err=>{
                console.log(err);
                alert('Error - personal plans')
            })
        },// === 개별데이터 === //

    },

}
</script>








<style lang="css">
</style>
