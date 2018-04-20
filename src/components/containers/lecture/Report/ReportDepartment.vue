<template lang="html">
<div class="">

    <!-- 부서별 - 통계 -->
    <div v-for="(dept, gid)  in  from.departments" :key="gid">
        <h3 class="ui block attached header" style="border-top:1px solid #d7d7d7;">
            {{ dept.stu_department }} 부서
            <hr class="opacity3">
            <small>
                <a v-for="(std,stdId) in  from.students" v-if="std.stu_department===dept.stu_department">
                     [{{ std.stu_name }}] &nbsp;
                </a>
            </small>
        </h3>


        <div class="ui attached segment" style="padding:0; overflow-x: scroll;">
            <slide-graph :chart="allAvgFunc(lec_idx, dept.stu_departmen)" />
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
        chartData:[]

    }},



    // ===== Created ===== //
    created(){
        var lid = this.$router.history.current.params.id
        this.$set(this, 'lec_idx', lid)
        this.allAvgFunc()
    },



    // ===== Updated ===== //
    updated(){

    },



    // ===== Methods ===== //
    methods:{



        // === 전체 평균데이터 === //
        allAvgFunc(lec_idx, _value){
            // base URL
            var baseURL = '/api/plans/score/'+lec_idx+'?_filter=department&_value='+_value

            this.$http.get(baseURL)
            .then(resp=>{
                console.log(resp.data.score);
                return resp.data.score
                // this.$set(this, 'chartData', resp.data.score)
                // console.log(this.chartData);
            })
            .catch(err=>{
                alert('Error - '+err)
                console.log(err);
            })
        },



    },

}
</script>








<style lang="css">
</style>
