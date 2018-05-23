<template lang="html">
<div class="">

    <!-- 전체 - 통계  -->
    <h4 class="ui block attached header " style="border-top:1px solid #d7d7d7;">
        전체 평균
        &nbsp;&nbsp;<button type="button" class="ui button blue mini" @click.prevent="getPlanListFunc()">액션플랜보기</button>

        <!-- <hr class="opacity3"> -->
        <!-- 사전점수 : {{ avgBeforeScore }} -->

    </h4>
    <!-- === 평가자료 === -->
    <table class="ui table attached" >
        <colgroup>
            <col width="10%">
            <col width="23.3%">
            <col width="10%">
            <col width="23.3%">
            <col width="10%">
            <col width="23.3%">
        </colgroup>
        <tr>
            <th>참여일</th>
            <td>자가:{{ participationSelfScore.length }}(팀:{{ participationOthersScore.length }})일 / {{ filteredScore.length }}일</td>

            <th>사전점수</th>
            <td>{{ avgBeforeScore }}점</td>

            <th>참여팀원</th>
            <td></td>
        </tr>
        <tr>
            <th class="borderTop">진행율</th>
            <td>{{ participationRate }}%</td>

            <th class="borderTop">수행평균</th>
            <td>{{ (selfAvg/participationSelfScore.length).toFixed(1) }}점</td>

            <th class="borderTop">팀원평균</th>
            <td>{{ (othersAvg/participationOthersScore.length).toFixed(1) }}점</td>
        </tr>
        <tr>
            <th class="borderTop">참여율</th>
            <td>
                자가:{{ ((participationSelfScore.length*100) / filteredScore.length).toFixed(1) }}%
                (팀:{{ ((participationOthersScore.length*100) / filteredScore.length).toFixed(1) }}%)
            </td>

            <th class="borderTop">역량향상</th>
            <td>{{ ((selfAvg/participationSelfScore.length) - avgBeforeScore).toFixed(1) }}점</td>

            <th class="borderTop">평가GAP</th>
            <td>
                {{ ((othersAvg/participationOthersScore.length).toFixed(1) - (selfAvg/participationSelfScore.length).toFixed(1)).toFixed(1) }}점
            </td>
        </tr>
        <tr>
            <th class="borderTop">자가성취율</th>
            <td>{{ ((selfAvg/participationSelfScore.length)*25).toFixed(1) }}</td>

            <th class="borderTop">역량향상률</th>
            <td>
                {{ (((selfAvg/participationSelfScore.length) - avgBeforeScore) * 25).toFixed(1) }}%
            </td>

            <th class="borderTop">팀원신뢰율</th>
            <td>
                {{ (((othersAvg/participationOthersScore.length) *100) / (selfAvg/participationSelfScore.length)).toFixed(1) }}%
            </td>
        </tr>
    </table>
    <!-- === 평가자료 === -->


    <div class="ui attached  grid" style="padding:0;">
        <div class="eleven wide column">
            <div class="ui attached segment" style="padding:0; overflow-x:scroll;" >
                <slide-graph :chart="filteredScore"></slide-graph>

                <!-- <ul>
                    <li v-for="cs  in  filteredScore" >{{ cs }}</li>
                </ul> -->
            </div>
        </div>

        <div class="five wide column" >
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
// import SlideGraph from '../../../components/Chart/SlideGraph'







export default {
    name: 'ReportAll',


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
    props:[
        'sessionData',
        'kpi', // 선택된 KPI
        'checkedSessions', // 선택된 회차목록 - 배열
        'groups', // 그룹평균내기 위한 그룹정보
    ],



    // ===== Data ===== //
    data(){ return {
        lec_idx : -1,
        sess : [],
        chartData : [], // 차트데이터
        kpiAvg: [],
        avgBeforeScore:-1, // 사전점수

        selfAvg:0, // 자가평균점수
        othersAvg:0, // 팀원평균점수

        participationSelfScore :[], // 실제 데이터가 있는 날만 담음
        participationOthersScore :[], // 실제 데이터가 있는 날만 담음


        participationRate:0, //참여율
        participationDay:0, //참여일수
        acplearnDay:0, //총일수

    }},











    // ===== Watch ===== //
    watch: {
        kpi(val){
            this.allAvgFunc(val)
        }
    },











    // ===== Computed ===== //
    computed:{
        // 차시별 데이터
        filteredScore() {
            if (this.checkedSessions.length<1) {
                return []
            }

            // 정렬
            this.checkedSessions.sort(function(a, b) { // 오름차순
                return a.ls_seq < b.ls_seq ? -1 : a.ls_seq > b.ls_seq ? 1 : 0;
            });
            // this.checkedSessions.sort()

            // 날짜비교
            var sd = new Date(this.checkedSessions[0].ls_startDate)
            var ed = new Date(this.checkedSessions[this.checkedSessions.length-1].ls_endDate)
            var dd
            var selfAvg = 0 // 자가평균점수
            var othersAvg = 0 // 팀원평균점수

            // 필터링
            var arr = this.chartData.filter(cd => {
                dd = new Date(cd.originalDate)

                if (dd >= sd && dd <=ed){
                    // 수행일 찾기
                    if (cd.avgSelfScore != null) {
                        // 평균점수 구하기
                        selfAvg += cd.avgSelfScore
                        this.participationSelfScore.push(cd)
                    }
                    if (cd.avgOthersScore != null) {
                        // 평균점수 구하기
                        othersAvg += cd.avgOthersScore
                        this.participationOthersScore.push(cd)
                    }

                    return dd // 해당 차시의 데이터 반환
                }
            })
            this.$set(this, 'selfAvg', selfAvg)
            this.$set(this, 'othersAvg', othersAvg)
            return arr
        },



    },






    // ===== Created ===== //
    created(){
        var lid = this.$router.history.current.params.id
        this.$set(this, 'lec_idx', lid)
        this.$set(this, 'sess', this.sessionData)
        this.allAvgFunc(this.kpi)

    },



    // ===== Updated ===== //
    updated(){
        // console.log(this.checkedSessions);
    },



    // ===== Methods ===== //
    methods:{




        // === 전체 평균데이터 === //
        allAvgFunc(kpi){
            /*
            kpi : 선택한 KPI - 기본은 null
            */

            // base URL
            var baseURL = '/api/plans/score/'+this.lec_idx
            baseURL+= (kpi===null) ? '' : '?kpi='+kpi

            this.$http.get(baseURL)
            .then(resp=>{
                // console.log(resp.data.score);
                this.$set(this, 'chartData', resp.data.score)
                this.$set(this, 'kpiAvg', resp.data.kpiAvg)
                this.$set(this, 'avgBeforeScore', resp.data.avgBeforeScore)

                this.$set(this, 'participationRate', resp.data.participationRate)
                this.$set(this, 'participationDay', resp.data.participationDay)
                this.$set(this, 'acplearnDay', resp.data.acplearnDay)

            })
            .catch(err=>{
                alert('Error - '+err)
                console.log(err);
            })
        },





        // ===== 해당 차트의 플랜목록 ===== //
        getPlanListFunc(){
            this.$http.get('/api/plans/ap/'+this.lec_idx)
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




        // === 하이차트 로드 === //
        load(){

        },






    },// ===== Methods ===== //

}
</script>







<!-- ===== Style ==== -->
<style lang="css">
</style>
