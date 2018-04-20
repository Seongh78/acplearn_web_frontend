<template lang="html">
<div class="">

    <!-- 직급별 - 통계 -->
    <div v-for="(po, gid)  in  from.position" :key="gid">
        <h3 class="ui block attached header" style="border-top:1px solid #d7d7d7;">
            {{ po.stu_position }}
            <hr class="opacity3">
            <small>
                <a v-for="(std,stdId) in  from.students" v-if="std.stu_position===po.stu_department">
                     {{ std.stu_name }} ,
                </a>
            </small>
        </h3>


        <div class="ui attached segment" style="padding:0; overflow-x: scroll;">
            <slide-graph :chart="allAvgFunc(lec_idx, po.stu_position)" />
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
        this.allAvgFunc(lid)

        console.log(this.from.position);
    },



    // ===== Updated ===== //
    updated(){

    },



    // ===== Methods ===== //
    methods:{



        // === 전체 평균데이터 === //
        allAvgFunc(lec_idx, _value){
            // base URL
            var baseURL = '/api/plans/score/'+lec_idx+'?_filter=position&_value='+_value

            this.$http.get(baseURL)
            .then(resp=>{
                // this.$set(this, 'chartData', resp.data.score)
                // console.log(resp.data.score);
                return resp.data.score
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
