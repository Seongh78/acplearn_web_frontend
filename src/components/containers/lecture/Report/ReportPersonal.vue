<template lang="html">
<div class="">

    <!-- 개별 - 통계 -->

    <h3><i class="icon users"></i> 수강생</h3>
    <hr class="opacity3">


    <div class="ui grid">
        <!-- Registration목록 -->
        <div class="four wide column">
            <div class="ui list secondary vertical menu actionPlanUserList" style="">
                <div
                    class="item"
                    v-bind:class="[thisStudnet==-1?'active':'']"
                    @click.prevent="thisStudnet = (-1)">
                    <img class="ui avatar image opacity5" src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_female2-64.png">
                    <div class="content">
                        <h4 class="header">전체</h4>
                        <div class="description">{{ from.students.length }}명</div>
                    </div>
                </div>
                <div
                    class="item"
                    v-for="(std, sid)  in  from.students"
                    v-bind:class="[std.stu_idx==thisStudnet?'active':'']"
                    @click.prevent="thisStudnet = (std.stu_idx)">
                    <img class="ui avatar image opacity5" src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_female2-64.png">
                    <div class="content">
                        <div class="header">{{ std.stu_name }}</div>
                        <div class="description">{{ std.stu_department }} {{ std.stu_position }}</div>
                    </div>
                </div>
            </div>
        </div>



        <!--PLAN목록 -->
        <div class="twelve wide column">
            <table class="ui table actionPlan selectable single line " style="padding:0;">
                <colgroup>
                    <col>
                    <col width="18%">
                    <col width="12%">
                    <col width="12%">
                </colgroup>
                <thead>
                    <tr>
                        <th >플랜명</th>
                        <th class="center aligned">KPI</th>
                        <th class="center aligned">자가평가</th>
                        <th class="center aligned">팀원평가</th>
                    </tr>
                </thead>
                <tbody v-if="plans.length>0" >
                    <tr class="viewLoadAnimation"
                    v-for="(plan, pid)  in  plans"
                    :key="pid"
                    v-if="thisStudnet == plan.stu_idx || thisStudnet<0">
                        <td><a>{{ plan.lap_text }}</a> </td>
                        <td class="center aligned"><div class="ui basic label" style="width:75%;">{{ plan.cc2_name }}</div></td>
                        <td class="center aligned">{{ typeof plan.avgSelfScore=='number' ? plan.avgSelfScore.toFixed(1) : 0 }}</td>
                        <td class="center aligned">{{ typeof plan.avgOthersScore=='number' ? plan.avgOthersScore.toFixed(1) : 0 }}</td>
                    </tr>
                </tbody>

                <tbody class="viewLoadAnimation" v-else>
                    <tr>
                        <td colspan="5"class="center aligned">
                            <no-contents header-text="해당 회차에 저장된 플랜이 없습니다" icon="users" size="size1" />
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        <!--PLAN목록 -->

    </div>

</div>
</template>





<script>
import {
    Loading,
    TabMenu,
    NoContents,
    SlideGraph
} from '../../../components'


export default {
    name: 'ReportPersonal',



    // ===== Components ===== //
    components:{
        NoContents,
        SlideGraph,
    },



    // ===== Props ===== //
    props:['from'],



    // ===== Data ===== //
    data(){ return {

        lec_idx : null , // 강의아이디
        actionplanSessionTab : -1, // 세션탭
        plans : [], // 플랜목록

        thisStudnet:-1, // 현재 선택학생
    }},



    // ===== Created ===== //
    created(){
        var lid = this.$router.history.current.params.id
        this.$set(this, 'lec_idx', lid)
        this.getPlans(lid)
    },



    // ===== Updated ===== //
    updated(){

    },



    // ===== Methods ===== //
    methods:{

        // 플랜조회
        getPlans(id){
            this.$http.get('/api/plans/'+id)
            .then(resp=>{
                this.$set(this, 'plans', resp.data.plans)
            })
            .catch(err=>{
                console.log(err);
                alert('Error')
            })
        },





        // === 개별데이터 === //
        personalGraph(stu_idx){

            this.$http.get('/api/plans/personal/'+this.lec_idx+'/'+stu_idx)
            .then(resp=>{
                //누적데이터
                var allAvg = resp.data.allAvg.length<1 ? [] : resp.data.allAvg
                var kpiAvg = resp.data.kpiAvg.length<1 ? [] : resp.data.kpiAvg
                // 모달 ON
                this.$EventBus.$emit('modal', {
                    name : 'personalGraph',
                    stu_idx,
                    score : resp.data.plans,
                    kpiAvg,
                    allAvg
                })
            })
            .catch(err=>{
                console.log(err);
                alert('Error - personal plans')
            })
        },// === 개별데이터 === //

        

    },

}
</script>








<style lang="css">

    .actionPlanUserList{
        width:100% !important;
        cursor:pointer;
    }
    .actionPlanUserList .item:hover{
        background-color: #f1f1f1 !important;
    }

</style>
