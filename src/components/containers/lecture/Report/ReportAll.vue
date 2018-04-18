<template lang="html">
<div class="">

    <!-- 전체 - 통계 -->
    <h4 class="ui block attached header " style="border-top:1px solid #d7d7d7;">액플런 전체 평균</h4>

    <div class="ui attached segment" style="padding:0; overflow-x:scroll;">
        <slide-graph />
    </div>

    <br>
    <div class="ui attached segment" style="padding:0;">
        <chart />
    </div>



    <br>
    <br>

</div>
</template>




<!-- ===== Script ==== -->
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
    SlideGraph,
} from '../../../components'


const name = 'ReportAll'


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
        SlideGraph,
    },



    // ===== Props ===== //
    props:[],



    // ===== Data ===== //
    data(){ return {

        //

    }},



    // ===== Created ===== //
    created(){

    },



    // ===== Updated ===== //
    updated(){

    },



    // ===== Methods ===== //
    methods:{

    },

}
</script>







<!-- ===== Style ==== -->
<style lang="css">
</style>
