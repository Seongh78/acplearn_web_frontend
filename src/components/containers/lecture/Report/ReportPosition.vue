<template lang="html">
<div class="">

    <!-- 직급별 - 통계 -->
    <div v-for="(po, gid)  in  position" :key="gid">
        <h4 class="ui block attached header" style="border-top:1px solid #d7d7d7;">
            {{ po.stu_position }}
            &nbsp;&nbsp;<button type="button" class="ui button blue mini" @click.prevent="getPlanListFunc('position', po.stu_position)">액션플랜보기</button>
            <hr class="opacity3">
            사전점수 : {{ avgBeforeScore }}
            <hr class="opacity3">
            <small>
                <a
                    class="cursorPointer"
                    v-for="(std,stdId) in  from.students"
                    v-if="std.stu_position===po.stu_position"
                    @click.prevent="personalGraph(std.stu_idx)">
                     [{{ std.stu_name }}] &nbsp;
                </a>
            </small>
        </h4>



        <div class="ui grid">
            <div class="eleven wide column">
                <div class="ui attached segment" style="padding:0; overflow-x:scroll;" >
                    <loading style="height:373px;" v-if="po.score==null" />
                    <slide-graph :chart="po.score" v-else />
                </div>
            </div>

            <div class="five wide column">
                <loading v-if="po.kpi==undefined || po.kpi==null" />
                <polar-chart :data="po.kpi" size="100%" v-else></polar-chart>
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
        position : [],
        avgBeforeScore:-1, // 사전점수

    }},



    // ===== Created ===== //
    created(){
        var lid = this.$router.history.current.params.id
        this.$set(this, 'lec_idx', lid)
        this.$set(this, 'position', this.from.position)
        // console.log(this.position);

        this.position.forEach(po=>{
            this.allAvgFunc(po.stu_position, this.kpi)
        })
    },



    // ===== Updated ===== //
    updated(){

    },



    // ===== Watch ===== //
    watch:{
        kpi (val){
            this.position.forEach(po=>{
                this.allAvgFunc(po.stu_position, val)
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
                console.log(val);
                var baseURL = '/api/plans/score/'+this.lec_idx+'/position/'+val
                baseURL += kpi != null ? '?kpi='+kpi : ''

                // 찾은데이터 푸시할 배열번지 찾기
                var rid = this.position.findIndex(po=>{
                    return po.stu_position == val
                })
                this.position[rid].score=null

                this.$http.get(baseURL)
                .then(resp=>{


                    this.$set(this.position[rid], 'score', resp.data.score)
                    this.$set(this.position[rid], 'kpi', resp.data.kpiAvg)
                    this.$set(this, 'avgBeforeScore', resp.data.avgBeforeScore)
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
