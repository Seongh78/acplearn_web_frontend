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



        <div class="ui grid">
            <div class="eleven wide column">
                <div class="ui attached segment" style="padding:0; overflow-x:scroll;" >
                    <slide-graph :chart="dep.score" />
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
    props:['from'],



    // ===== Data ===== //
    data(){ return {

        lec_idx : null , // 강의아이디
        chartData: [],
        departments : []

    }},



    // ===== Created ===== //
    created(){
        var lid = this.$router.history.current.params.id
        this.$set(this, 'lec_idx', lid)
        this.$set(this, 'departments', this.from.departments)



        this.departments.forEach(dep=>{
            this.allAvgFunc(dep.stu_department)
        })
    },



    // ===== Updated ===== //
    updated(){

    },



    // ===== Methods ===== //
    methods:{



        // === 전체 평균데이터 === //
        allAvgFunc(val){
                // 부서별
                var baseURL = '/api/plans/score/'+this.lec_idx+'/departments/'+val
                // var baseURL = '/api/plans/score/departments/18/사원'

                this.$http.get(baseURL)
                .then((resp)=>{
                    // 찾은데이터 푸시할 배열번지 찾기
                    var rid = this.departments.findIndex(po=>{
                        return po.stu_department == val
                    })
                    this.$set(this.departments[rid], 'score', resp.data.score)
                    this.$set(this.departments[rid], 'kpi', resp.data.kpiAvg)
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
