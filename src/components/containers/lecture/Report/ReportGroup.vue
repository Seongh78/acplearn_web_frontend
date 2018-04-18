<template lang="html">
<div class="">

    <!-- 팀별 - 통계 -->
    <!-- KPI 별 - 그래프 -->
    <!-- <div v-for="(k, kid)  in  kpi" :value="k.lk_idx">
        <h4 class="ui block attached header" style="border-top:1px solid #d7d7d7;">{{k.cc2_name}} 평균</h4>
        <div class="ui attached segment" style="padding:0;">
            <chart table="kpi" :value="k.lk_idx" />
        </div>
        <br>
        <br>
    </div> -->

    <div v-for="(group, gid)  in  from" :key="gid">
        <h4 class="ui block attached header" style="border-top:1px solid #d7d7d7;">{{ group.group_name }} 조 평균</h4>


        <div class="ui attached segment" style="padding:0;">
            <chart table="group" :value="group.group_idx" />
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
    TabMenu
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
        TabMenu
    },


    // ===== Props ===== //
    props:['from'],



    // ===== Data ===== //
    data(){ return {

        groups:[]

    }},



    // ===== Created ===== //
    created(){
        // this.$set(this, 'groups', this.from)
    },



    // ===== Updated ===== //
    updated(){

    },



    // ===== Methods ===== //
    methods:{

    },

}
</script>








<style lang="css">
</style>
