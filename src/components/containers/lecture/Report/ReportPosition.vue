<template lang="html">
<div class="">

    <!-- 직급별 - 통계 -->
    <div v-for="(po, gid)  in  position" :key="gid">
        <h4 class="ui block attached header" style="border-top:1px solid #d7d7d7;">
            {{ po.stu_position }}
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
                    <slide-graph :chart="po.score" />
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
    props:['from'],



    // ===== Data ===== //
    data(){ return {

        lec_idx : null , // 강의아이디
        chartData: [],
        position : []

    }},



    // ===== Created ===== //
    created(){
        var lid = this.$router.history.current.params.id
        this.$set(this, 'lec_idx', lid)
        this.$set(this, 'position', this.from.position)
        // console.log(this.position);

        this.position.forEach(po=>{
            console.log(po.stu_position);
            this.allAvgFunc(po.stu_position)
        })
    },



    // ===== Updated ===== //
    updated(){

    },



    // ===== Methods ===== //
    methods:{



        // === 전체 평균데이터 === //
        allAvgFunc(val){
                console.log(val);
                var baseURL = '/api/plans/score/'+this.lec_idx+'/position/'+val
                // var baseURL = '/api/plans/score/position/18/사원'

                this.$http.get(baseURL)
                .then(resp=>{

                    var rid = this.position.findIndex(po=>{
                        return po.stu_position == val
                    })
                    this.$set(this.position[rid], 'score', resp.data.score)
                    this.$set(this.position[rid], 'kpi', resp.data.kpiAvg)
                })
                .catch((err)=>{
                    alert('Error - '+err)
                    console.log(err);
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
