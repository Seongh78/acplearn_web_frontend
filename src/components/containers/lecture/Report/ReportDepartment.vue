<template lang="html">
<div class="">


    <loading v-if="departments==undefined || departments==null" />

    <!-- 직급별 - 통계 -->
    <div v-for="(dep, did)  in  departments" :key="did">
        <h4 class="ui block attached header" style="border-top:1px solid #d7d7d7;">
            {{ dep.title }}
            &nbsp;&nbsp;<button type="button" class="ui button blue mini" @click.prevent="getPlanListFunc('departments', dep.title)">액션플랜보기</button>
            <hr class="opacity3">
            <small>
                <a
                    class="cursorPointer"
                    v-for="(std,stdId) in  from.students"
                    v-if="std.stu_department==dep.title"
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
                <td>자가: {{ dep.participationSelfDay }} 일(팀: {{ dep.participationOthersDay }}) / {{ dep.score.length }} 일</td>

                <th>사전점수</th>
                <td>{{ kpiAvgFunc(did) }}점</td>

                <th>참여팀원</th>
                <td></td>
            </tr>
            <tr>
                <th class="borderTop">진행율</th>
                <td>{{  }}%</td>

                <th class="borderTop">수행평균</th>
                <td>{{ dep.avgSelfScore }}점</td>

                <th class="borderTop">팀원평균</th>
                <td>{{ dep.avgOthersScore }}점</td>
            </tr>
            <tr>
                <th class="borderTop">참여율</th>
                <td>
                    자가:{{ dep.participationSelfRate }}%
                    (팀:{{ dep.participationOthersRate }}%)
                </td>

                <th class="borderTop">역량향상</th>
                <td>{{ (dep.avgSelfScore - kpiAvgFunc(did)).toFixed(1) }}점</td>

                <th class="borderTop">평가GAP</th>
                <td> {{ (dep.avgOthersScore - dep.avgSelfScore).toFixed(1) }}점</td>
            </tr>
            <tr>
                <th class="borderTop">자가성취율</th>
                <td>{{ (dep.avgSelfScore*25) }}%</td>

                <th class="borderTop">역량향상률</th>
                <td>{{ ((dep.avgSelfScore - kpiAvgFunc(did))*25).toFixed(1) }}%</td>

                <th class="borderTop">팀원신뢰율</th>
                <td>{{ ((dep.avgOthersScore*100) / dep.avgSelfScore).toFixed(1) }}%</td>
            </tr>
        </table>
        <!-- === 평가자료 === -->



        <div class="ui grid">
            <div class="eleven wide column">
                <div class="ui attached segment" style="padding:0; overflow-x:scroll;" >
                    <!-- <loading style="height:373px;" v-if="dep.score==null" /> -->
                    <slide-graph :chart="dep.score"  />
                </div>
            </div>

            <div class="five wide column">
                <!-- <loading v-if="dep.kpi==undefined || dep.kpi==null" /> -->
                <polar-chart :data="dep.kpiAvg" size="100%" ></polar-chart>
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
        departments : null,
        avgBeforeScore:-1, // 사전점수

        analysis:{ // 통계데이터
            participationDay : null,
            selfParticipationDay: null,
            othersParticipationDay: null,
            participationRate: null,
            avgBeforeScore: null,
            selfParticipationAvg: null,
            othersParticipationAvg: null
        },

    }},



    // ===== Created ===== //
    created(){
        var lid = this.$router.history.current.params.id
        this.$set(this, 'lec_idx', lid)
        // this.$set(this, 'departments', this.from.departments)



        this.allAvgFunc(this.kpi)
    },



    // ===== Updated ===== //
    updated(){

    },



    // ===== Watch ===== //
    watch:{
        kpi (val){
            this.departments.forEach(dep=>{
                this.allAvgFunc(val)
            })
        }
    },



    // ===== Methods ===== //
    methods:{


        // === kpi 평균 === //
        kpiAvgFunc(did){
            var keys = Object.keys(this.departments[did].kpiAvg)
            var avg=0
            for(var ii  in  keys){
                avg += this.departments[did].kpiAvg[ii].avgBeforeScore == null ? 0 : this.departments[did].kpiAvg[ii].avgBeforeScore;
            }
            // console.log(avg);

            return (avg / this.departments[did].kpiAvg.length).toFixed(1)
        },





        // === 전체 평균데이터 === //
        allAvgFunc(kpi=null){
            /*
            val : 찾을값
            kpi : 선택한 kpi
            session : 차수
            */
                // 부서별
                // var baseURL = '/api/plans/score/'+this.lec_idx+'/departments/'+val
                var baseURL = '/api/plans/score2/'+this.lec_idx+'/departments'
                baseURL += kpi != null ? '?kpi='+kpi : ''

                // 찾은데이터 푸시할 배열번지 찾기
                // var rid = this.departments.findIndex(po=>{
                //     return po.stu_department == val
                // })
                this.departments=null

                this.$http.get(baseURL)
                .then((resp)=>{
                    var data = resp.data.classificationArray

                    // 평균구하기 로직(자가, 팀원)
                    var selfScore=0, othersScore=0;
                    for(var ii  in  data){
                        selfScore=0
                        othersScore=0
                        for(var jj  in  data[ii].score){ // 점수찾기
                            selfScore       += data[ii].score[jj].avgSelfScore == null ? 0 : data[ii].score[jj].avgSelfScore
                            othersScore  += data[ii].score[jj].avgOthersScore == null ? 0 : data[ii].score[jj].avgOthersScore
                        }// for
                        data[ii].avgSelfScore = (selfScore / data[ii].participationSelfDay).toFixed(1)
                        data[ii].avgOthersScore = (othersScore / data[ii].participationOthersDay).toFixed(1)
                    }// for


                    this.$set(this, 'departments', data)


                })
                .catch((err)=>{
                    alert('Error - '+err)
                    console.log(err);
                    this.departments=[]
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
