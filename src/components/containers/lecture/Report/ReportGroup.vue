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
                <td>자가: {{ group.analysis.selfParticipationDay }} 일(팀: {{ group.analysis.othersParticipationDay }}) / {{ group.analysis.participationDay }} 일</td>

                <th>사전점수</th>
                <td>{{ group.analysis.avgBeforeScore }}점</td>

                <th>참여팀원</th>
                <td></td>
            </tr>
            <tr>
                <th class="borderTop">진행율</th>
                <td>{{ group.analysis.participationRate }}%</td>

                <th class="borderTop">수행평균</th>
                <td>{{ group.analysis.selfParticipationAvg }}점</td>

                <th class="borderTop">팀원평균</th>
                <td>{{ group.analysis.othersParticipationAvg }}점</td>
            </tr>
            <tr>
                <th class="borderTop">참여율</th>
                <td>
                    자가:{{ ((group.analysis.selfParticipationDay*100) / group.analysis.participationDay).toFixed(1) }}%
                    (팀:{{ ((group.analysis.othersParticipationDay*100) / group.analysis.participationDay).toFixed(1) }}%)
                </td>

                <th class="borderTop">역량향상</th>
                <td>{{ (group.analysis.selfParticipationAvg - group.analysis.avgBeforeScore).toFixed(1) }}점</td>

                <th class="borderTop">평가GAP</th>
                <td> {{ (group.analysis.othersParticipationAvg - group.analysis.selfParticipationAvg).toFixed(1) }}점</td>
            </tr>
            <tr>
                <th class="borderTop">자가성취율</th>
                <td>{{ (group.analysis.selfParticipationAvg*25) }}%</td>

                <th class="borderTop">역량향상률</th>
                <td>{{ ((group.analysis.selfParticipationAvg - group.analysis.avgBeforeScore)*25).toFixed(1) }}%</td>

                <th class="borderTop">팀원신뢰율</th>
                <td>{{ ((group.analysis.othersParticipationAvg*100) / group.analysis.selfParticipationAvg).toFixed(1) }}%</td>
            </tr>
        </table>
        <!-- === 평가자료 === -->

        <div class="ui grid">
            <div class="eleven wide column">
                <div class="ui attached segment" style="padding:0; overflow-x:scroll;" >
                    <loading v-if="group.score==null" style="height:373px;" />
                    <slide-graph :chart="group.score" v-else />
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
    props:['from', 'kpi'],



    // ===== Data ===== //
    data(){ return {
        lec_idx : null,


        groups:[],
        chartData:[],

        selectKpi:-1,

        avgBeforeScore:-1, // 사전점수

    }},






    // ===== Computed ===== //
    computed:{
        // 차시별 데이터
        filteredScore(){
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

            // 필터링
            var arr = this.chartData.filter(cd => {
                dd = new Date(cd.originalDate)
                return dd >= sd && dd <=ed
            })
            return arr
        }
    },
















    // ===== Created ===== //
    created(){

        // 강의아이디
        var lid = this.$router.history.current.params.id
        this.$set(this, 'lec_idx', lid)
        this.$set(this, 'groups', this.from.groups)
        this.$set(this, 'selectKpi', this.kpi)


        this.groups.forEach(g=>{
            this.allAvgFunc(g.group_idx, this.selectKpi)
        })

    },



    // ===== Updated ===== //
    updated(){
        // console.log("this.kpi : ", this.kpi);
    },






    // ===== Watch ===== //
    watch:{
        kpi (val){
            this.groups.forEach(g=>{
                this.allAvgFunc(g.group_idx, val)
            })
        }
    },








    // ===== Methods ===== //
    methods:{



        // === 전체 평균데이터 === //
        allAvgFunc(val, kpi){
            /*
            val : 찾을값
            kpi : 선택한 kpi
            session : 차수
            */
            // base URL - 그룹별
            var baseURL = '/api/plans/score/'+this.lec_idx+'/group/'+val
            baseURL += kpi != null ? '?kpi='+kpi : ''

            var rid = this.groups.findIndex(g=>{
                return g.group_idx == val
            })
            this.groups[rid].score=null // 애니메이션처리

            this.$http.get(baseURL)
            .then(resp=>{
                this.$set(this.groups[rid], 'score', resp.data.score)
                this.$set(this.groups[rid], 'kpi', resp.data.kpiAvg)
                this.$set(this, 'avgBeforeScore', resp.data.avgBeforeScore)

                // 자가평균
                var selfParticipationAvg=0
                var selfParticipationDay = resp.data.score.filter((sc)=>{
                    if (sc.avgSelfScore != null) {
                        selfParticipationAvg += sc.avgSelfScore
                        return true
                    }
                })
                // 팀원평균
                var othersParticipationAvg=0
                var othersParticipationDay = resp.data.score.filter((sc)=>{
                    if(sc.avgOthersScore != null){
                        othersParticipationAvg += sc.avgOthersScore
                        return true
                    }
                })

                selfParticipationAvg = (selfParticipationAvg/selfParticipationDay.length).toFixed(1)
                othersParticipationAvg = (othersParticipationAvg/othersParticipationDay.length).toFixed(1)

                // 통계표 만들기
                this.$set(this.groups[rid], 'analysis', {
                    participationDay : resp.data.score.length,
                    selfParticipationDay: selfParticipationDay.length,
                    othersParticipationDay: othersParticipationDay.length,
                    participationRate: resp.data.participationRate,
                    avgBeforeScore: resp.data.avgBeforeScore,
                    selfParticipationAvg,
                    othersParticipationAvg
                })
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
                console.log(resp);
                //누적데이터
                var allAvg = resp.data.allAvg.length<1 ? [] : resp.data.allAvg
                var kpiAvg = resp.data.kpiAvg.length<1 ? [] : resp.data.kpiAvg
                // var beforeAvg = resp.data.kpiAvg.length<1 ? [] : resp.data.kpiAvg
                // this.$set(this, 'avgBeforeScore', resp.data.avgBeforeScore)
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








        // === 날짜계산 === //




    },

}
</script>








<style lang="css">
</style>
