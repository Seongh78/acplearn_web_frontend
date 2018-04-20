<template lang="html">
<div class="">

    <!-- 직급별 - 통계 -->
    <div v-for="(po, gid)  in  position" :key="gid">
        <h3 class="ui block attached header" style="border-top:1px solid #d7d7d7;">
            {{ po.stu_position }}
            <hr class="opacity3">
            <small>
                <a v-for="(std,stdId) in  from.students" v-if="std.stu_position===po.stu_position">
                     [{{ std.stu_name }}] &nbsp;
                </a>
            </small>
        </h3>


        <div class="ui attached segment" style="padding:0; overflow-x: scroll;">
            <slide-graph :chart="po.score" />
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
                var baseURL = '/api/plans/score/position/'+this.lec_idx+'/'+val
                // var baseURL = '/api/plans/score/position/18/사원'

                this.$http.get(baseURL)
                .then((resp)=>{
                    var rid = this.position.findIndex(po=>{
                        return po.stu_position == val
                    })
                    this.$set(this.position[rid], 'score', resp.data.score)
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
