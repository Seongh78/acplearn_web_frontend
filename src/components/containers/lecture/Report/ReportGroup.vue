<template lang="html">
<div class="">

    <!-- 팀별 - 통계 -->

    <div v-for="(group, gid)  in  from.groups" :key="gid">
        <h3 class="ui block attached header" style="border-top:1px solid #d7d7d7;">
            {{ group.group_name }}(조) 평균
            <hr class="opacity3">
            <small>
                <a v-for="(std,stdId) in  from.students" v-if="std.group_idx===group.group_idx">
                     [{{ std.stu_name }}] &nbsp;
                </a>
            </small>
        </h3>


        <div class="ui attached segment" style="padding:0; overflow-x: scroll;">
            <slide-graph :chart="chartData" />
        </div>

        <br>
        <br>
        <br>
    </div>

</div>
</template>





<script>
import {
    Modal,
    Timeline,
    Feed ,
    NoContents,
    Rating,
    Comment,
    Loading,
    Chart,
    TabMenu,
    SlideGraph
} from '../../../components'

const name = 'ReportGroup'

export default {
    name: name,



    // ===== Components ===== //
    components:{
        Modal,
        Timeline,
        Feed ,
        NoContents,
        Rating,
        Comment,
        Loading,
        Chart,
        TabMenu,
        SlideGraph
    },


    // ===== Props ===== //
    props:['from'],



    // ===== Data ===== //
    data(){ return {

        groups:[],
        chartData:[]

    }},



    // ===== Created ===== //
    created(){
        this.allAvgFunc()
    },



    // ===== Updated ===== //
    updated(){

    },



    // ===== Methods ===== //
    methods:{



        // === 전체 평균데이터 === //
        allAvgFunc(){
            // base URL
            var baseURL = '/api/plans/score/'+14+'?_filter=kpi&_value=52'

            this.$http.get(baseURL)
            .then(resp=>{
                this.$set(this, 'chartData', resp.data.score)
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
