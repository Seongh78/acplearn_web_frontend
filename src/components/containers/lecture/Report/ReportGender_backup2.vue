<template lang="html">
<div class="">

    <!-- 직급별 - 통계 -->
    <div v-for="(g, gid)  in  classificationArray" :key="gid">
        <h4 class="ui block attached header" style="border-top:1px solid #d7d7d7;">
            {{ g.title }}
            &nbsp;&nbsp;<button type="button" class="ui button blue mini" @click.prevent="getPlanListFunc('gender', g.title)">액션플랜보기</button>
            <hr class="opacity3">

            <small>
                <a
                    class="cursorPointer"
                    v-for="(std,stdId) in  from.students"
                    v-if="std.stu_gender===g.title"
                    @click.prevent="personalGraph(std.stu_idx)">
                     [{{ std.stu_name }}] &nbsp;
                </a>
            </small>
        </h4>



        <div class="ui grid">
            <div class="eleven wide column">
                <div class="ui attached segment" style="padding:0; overflow-x:scroll;" >
                    <loading style="height:373px;" v-if="g.score==null" />
                    <slide-graph :chart="g.score" v-else />
                </div>
            </div>

            <div class="five wide column">
                <!-- <loading v-if="g.kpi.length<1" /> -->
                <!-- <polar-chart :data="g.kpi" size="100%" v-else></polar-chart> -->
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

const name = 'ReportGender'

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
        gender : [],
        avgBeforeScore:-1, // 사전점수

        classificationArray:[], // 실 데이터

    }},



    // ===== Created ===== //
    created(){
        var lid = this.$router.history.current.params.id
        this.$set(this, 'lec_idx', lid)
        this.$set(this, 'gender', this.from.gender)
        // console.log(this.position);

        this.allAvgFunc(1)
    },



    // ===== Updated ===== //
    updated(){
        console.log("this.kpi : ",this.kpi);
    },






    // ===== Watch ===== //
    watch:{
        kpi (val){
            console.log(val);
            this.gender.forEach(g=>{
                this.allAvgFunc(g.text, val)
            })
        }
    },




    // ===== Methods ===== //
    methods:{



        // === 전체 평균데이터 === //
        allAvgFunc(val){
                var baseURL = '/api/plans/score2/'+this.lec_idx+'/gender/'+val
                // baseURL+= (kpi===null) ? '' : '?kpi='+kpi

                // var rid = this.gender.findIndex(g=>{
                //     return g.text == val
                // })
                // this.classificationArray[rid].score = null

                this.$http.get(baseURL)
                .then(resp=>{
                    this.classificationArray = resp.data.classificationArray
                    // this.$set(this.gender[rid], 'score', resp.data.score)
                    // this.$set(this.gender[rid], 'kpi', resp.data.kpiAvg)
                    // this.$set(this, 'avgBeforeScore', resp.data.avgBeforeScore)
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
                this.$http.get('/api/plans/comments/'+stu_idx) // 피드데이터
            ])
            .then(this.$http.spread((resp,resp2)=>{
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
