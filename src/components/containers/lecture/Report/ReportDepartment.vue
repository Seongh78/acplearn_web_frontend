<template lang="html">
<div class="">

    <!-- 직급별 - 통계 -->
    <div v-for="(dep, gid)  in  departments" :key="gid">
        <h4 class="ui block attached header" style="border-top:1px solid #d7d7d7;">
            {{ dep.stu_department }}
            &nbsp;&nbsp;<button type="button" class="ui button blue mini" @click.prevent="getPlanListFunc('departments', dep.stu_department)">액션플랜보기</button>
            <hr class="opacity3">
            <small>
                <a
                    class="cursorPointer"
                    v-for="(std,stdId) in  from.students"
                    v-if="std.stu_department==dep.stu_department"
                    @click.prevent="personalGraph(std.stu_idx)">
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
                <td>자가: {{ dep.analysis.selfParticipationDay }} 일(팀: {{ dep.analysis.othersParticipationDay }}) / {{ dep.analysis.participationDay }} 일</td>

                <th>사전점수</th>
                <td>{{ dep.analysis.avgBeforeScore }}점</td>

                <th>참여팀원</th>
                <td></td>
            </tr>
            <tr>
                <th class="borderTop">진행율</th>
                <td>{{ dep.analysis.participationRate }}%</td>

                <th class="borderTop">수행평균</th>
                <td>{{ dep.analysis.selfParticipationAvg }}점</td>

                <th class="borderTop">팀원평균</th>
                <td>{{ dep.analysis.othersParticipationAvg }}점</td>
            </tr>
            <tr>
                <th class="borderTop">참여율</th>
                <td>
                    자가:{{ ((dep.analysis.selfParticipationDay*100) / dep.analysis.participationDay).toFixed(1) }}%
                    (팀:{{ ((dep.analysis.othersParticipationDay*100) / dep.analysis.participationDay).toFixed(1) }}%)
                </td>

                <th class="borderTop">역량향상</th>
                <td>{{ (dep.analysis.selfParticipationAvg - dep.analysis.avgBeforeScore).toFixed(1) }}점</td>

                <th class="borderTop">평가GAP</th>
                <td> {{ (dep.analysis.othersParticipationAvg - dep.analysis.selfParticipationAvg).toFixed(1) }}점</td>
            </tr>
            <tr>
                <th class="borderTop">자가성취율</th>
                <td>{{ (dep.analysis.selfParticipationAvg*25) }}%</td>

                <th class="borderTop">역량향상률</th>
                <td>{{ ((dep.analysis.selfParticipationAvg - dep.analysis.avgBeforeScore)*25).toFixed(1) }}%</td>

                <th class="borderTop">팀원신뢰율</th>
                <td>{{ ((dep.analysis.othersParticipationAvg*100) / dep.analysis.selfParticipationAvg).toFixed(1) }}%</td>
            </tr>
        </table>
        <!-- === 평가자료 === -->



        <div class="ui grid">
            <div class="eleven wide column">
                <div class="ui attached segment" style="padding:0; overflow-x:scroll;" >
                    <loading style="height:373px;" v-if="dep.score==null" />
                    <slide-graph :chart="dep.score" v-else />
                </div>
            </div>

            <div class="five wide column">
                <loading v-if="dep.kpi==undefined || dep.kpi==null" />
                <polar-chart :data="dep.kpi" size="100%" v-else></polar-chart>
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
    SlideGraph,
    Loading,
    PolarChart,
} from '../../../components'

const name = ''

export default {
    name: name,


    // ===== Components ===== //
    components:{
        SlideGraph,
        Loading,
        PolarChart,
    },


    // ===== Props ===== //
    props:['from', 'kpi'],



    // ===== Data ===== //
    data(){ return {

        lec_idx : null , // 강의아이디
        chartData: [],
        departments : [],
        avgBeforeScore:-1, // 사전점수

    }},



    // ===== Created ===== //
    created(){
        var lid = this.$router.history.current.params.id
        this.$set(this, 'lec_idx', lid)
        this.$set(this, 'departments', this.from.departments)



        this.departments.forEach(dep=>{
            this.allAvgFunc(dep.stu_department, this.kpi)
        })
    },



    // ===== Updated ===== //
    updated(){

    },



    // ===== Watch ===== //
    watch:{
        kpi (val){
            this.departments.forEach(dep=>{
                this.allAvgFunc(dep.stu_department, val)
            })
        }
    },



    // ===== Methods ===== //
    methods:{



        // === 전체 평균데이터 === //
        allAvgFunc(val, kpi=null){
            /*
            val : 찾을값
            kpi : 선택한 kpi
            session : 차수
            */
                // 부서별
                var baseURL = '/api/plans/score/'+this.lec_idx+'/departments/'+val
                baseURL += kpi != null ? '?kpi='+kpi : ''

                // 찾은데이터 푸시할 배열번지 찾기
                var rid = this.departments.findIndex(po=>{
                    return po.stu_department == val
                })
                this.departments[rid].score=null

                this.$http.get(baseURL)
                .then((resp)=>{

                    this.$set(this.departments[rid], 'score', resp.data.score)
                    this.$set(this.departments[rid], 'kpi', resp.data.kpiAvg)
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
                    this.$set(this.departments[rid], 'analysis', {
                        participationDay : resp.data.score.length,
                        selfParticipationDay: selfParticipationDay.length,
                        othersParticipationDay: othersParticipationDay.length,
                        participationRate: resp.data.participationRate,
                        avgBeforeScore: resp.data.avgBeforeScore,
                        selfParticipationAvg,
                        othersParticipationAvg
                    })

                })
                .catch((err)=>{
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
        personalGraph(stu_idx){

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
