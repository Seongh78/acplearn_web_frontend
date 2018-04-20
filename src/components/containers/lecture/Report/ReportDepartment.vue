<template lang="html">
<div class="">

    <!-- 직급별 - 통계 -->
    <div v-for="(dep, gid)  in  departments" :key="gid">
        <h3 class="ui block attached header" style="border-top:1px solid #d7d7d7;">
            {{ dep.stu_department }}
            <hr class="opacity3">
            <small>
                <a v-for="(std,stdId) in  from.students" v-if="std.stu_department==dep.stu_department">
                     [{{ std.stu_name }}] &nbsp;
                </a>
            </small>
        </h3>


        <div class="ui attached segment" style="padding:0; overflow-x: scroll;">
            <slide-graph :chart="dep.score" />
        </div>

        <br>
        <br>
        <br>
    </div>

</div>
</template>





<script>
import {
    SlideGraph
} from '../../../components'

const name = ''

export default {
    name: name,


    // ===== Components ===== //
    components:{
        SlideGraph
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
                console.log(val);
                var baseURL = '/api/plans/score/departments/'+this.lec_idx+'/'+val
                // var baseURL = '/api/plans/score/departments/18/사원'

                this.$http.get(baseURL)
                .then((resp)=>{
                    console.log(resp.data);
                    var rid = this.departments.findIndex(po=>{
                        return po.stu_department == val
                    })
                    this.$set(this.departments[rid], 'score', resp.data.score)
                })
                .catch((err)=>{
                    alert('Error - '+err)
                    console.log(err);
                })
        },



    },

}
</script>








<style lang="css">
</style>
