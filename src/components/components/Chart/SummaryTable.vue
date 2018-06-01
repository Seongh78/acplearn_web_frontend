<template lang="html">
<div class="" style="width:100%;">

    <!--
    참여일수 - self
    participationSelfDay :

    참여율 - self
    participationSelfRate :

    참여일수 - others
    participationOthersDay :

    참여율 - others
    participationOthersRate :

    사전평균
    lap_beforeScore :

    진행률
    progressRate :

    자가평균 - 수행평균
    selfAvg :

    팀원평균
    othersAvg :
    -->


    <div>
        <!-- ===== 타이틀 ===== -->
        <h3 class="ui block attached header" style="border-top:1px solid #d7d7d7;">
            {{ title ? title : '-' }}
            <div class="ui basic label small" v-if="kpi !== null">KPI: {{ kpi }}</div>
        </h3>

        <!-- ===== 테이블 ===== -->
        <table class="ui table celled attached segment " >
            <colgroup>
                <col width="13%">
                <col width="20.3%">
                <col width="13%">
                <col width="20.3%">
                <col width="13%">
                <col width="20.3%">
            </colgroup>
            <tr>
                <th class="borderTop" >참여일</th>
                <td class="">자가: {{ data.participationSelfDay }}(팀: {{ data.participationOthersDay }})일</td>

                <th class="borderTop" >사전점수</th>
                <td class="">{{ data.lap_beforeScore }}점</td>

                <th class="borderTop" >참여팀원</th>
                <td class=""></td>
            </tr>
            <tr>
                <th class="borderTop" >진행률</th>
                <td class="">{{ data.progressRate }}%</td>

                <th class="borderTop" >수행평균</th>
                <td class="">{{ data.selfAvg }}점</td>

                <th class="borderTop" >팀원평균</th>
                <td class="">{{ data.othersAvg }}</td>
            </tr>
            <tr>
                <th class="borderTop" >참여율</th>
                <td class="">
                    자가:{{ data.participationSelfRate }}(팀:{{ data.participationOthersRate }})%
                </td>

                <th class="borderTop" >역량향상</th>
                <td class="">{{ data.selfAvg - data.lap_beforeScore }}점</td>

                <th class="borderTop" >평가GAP</th>
                <td class="">{{ data.othersAvg - data.selfAvg }}점</td>
            </tr>
            <tr>
                <th class="borderTop" >자가성취율</th>
                <td class="">{{ (data.selfAvg*25).toFixed(1) }}%</td>

                <th class="borderTop" >역량향상률</th>
                <td class="">{{ ((data.selfAvg - data.lap_beforeScore)*25).toFixed(1) }}%</td>

                <th class="borderTop" >팀원신뢰율</th>
                <td class="">{{ ((data.othersAvg*100) / data.selfAvg).toFixed(1) }}%</td>
            </tr>
        </table>


        <!-- ===== 차트 슬롯 ===== -->
        <!-- <slot name="footer" class="ui attached segment" style="width:100%; padding:0; overflow-x: scroll; position:relative;"></slot> -->
        <div name="footer" class="ui attached segment" style="width:100%; padding:0; overflow-x: scroll; position:relative;">
            <slide-graph :chart="data.score" style="position:relative;" />
        </div>
    </div>

</div>
</template>







<script>

import SlideGraph from './SlideGraph'
import NoContents from '../NoContents'
import Loading from '../Loading'


export default {
    name : 'SummaryTable',


    // ========== Props ========== //
    props: {
        title: { type: String },
        subTitle: { type: String },
        data: { type: Object },
        kpi: { type: String }
    },



    // ========== Components ========== //
    components:{
        SlideGraph,
        NoContents,
        Loading
    },







    // ========== Data ========== //
    data(){ return{



    }},





    // ========== Methods ========== //
    methods: {

    }


}
</script>








<!-- ========== Style ========== -->
<style lang="css">





</style>
<!-- ========== Style ========== -->
