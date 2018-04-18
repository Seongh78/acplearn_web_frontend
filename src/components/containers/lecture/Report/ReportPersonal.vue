<template lang="html">
<div class="">

    <!-- 개별 - 통계 -->
    <div class="ui grid">
        <!-- Registration목록 -->
        <div class="four wide column">
            <div class="ui list secondary vertical menu actionPlanUserList" style="width:100%;">
                <div
                    class="item"
                    v-for="(std, sid)  in  students"
                    v-bind:class="[std.stu_idx==selectedStudent?'active':'']"
                    @click.prevent="getActionPlan(std.stu_idx)">
                    <img class="ui avatar image" src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_female2-64.png">
                    <div class="content">
                        <div class="header">{{ std.stu_name }}</div>
                        <div class="description">{{ std.stu_department }} {{ std.stu_position }}</div>
                    </div>
                </div>
            </div>
        </div>



        <!--PLAN목록 -->
        <div class="twelve wide column">
            <div class=""  >
                <!-- 탭메뉴 -->
                <div class="ui top secondary pointing menu ">
                    <a
                        class="item"
                        v-bind:class="[actionplanSessionTab < 0?'active':'']"
                        @click.prevent="actionplanSessionTab=(-1)">
                        전체
                    </a>
                    <a
                        class="item"
                        v-for="(sess, jj) in lecture.sessions"
                        v-bind:class="[actionplanSessionTab==jj+1?'active':'']"
                        @click.prevent="actionplanSessionTab=(jj+1)">
                        {{ jj+1 }}회
                    </a>
                </div>

                <div class="ui bottom tab segment" v-bind:class="[actionplanSessionTab < 0?'active viewLoadAnimation':'']">
                    <h4><i class="icon chart line"></i> 조직활성화</h4>
                    <table class="ui table fluid celled">
                        <tr>
                            <th class="center aligned">강의차수</th>
                            <th class="center aligned" v-for="(sess, ii) in lecture.sessions">{{ii+1}}차</th>
                            <td class="center aligned" rowspan="2">평균</td>
                        </tr>
                        <tr>
                            <td  class="center aligned">APL기간</td>
                            <td  class="center aligned" v-for="(sess, jj) in lecture.sessions">{{sess.ls_startDate}} ~ {{sess.ls_endDate}}</td>
                        </tr>
                    </table>
                    <chart />

                </div>
                <div class="ui bottom tab segment" v-for="(sess, jj) in lecture.sessions"
                v-bind:class="[actionplanSessionTab==jj+1?'active viewLoadAnimation':'']">
                    <!-- <h3>플랜리스트</h3> -->
                    <table class="ui table actionPlan selectable single line " style="padding:0;">
                        <colgroup>
                            <col>
                            <col width="17%">
                            <col width="17%">
                            <col width="15%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th >플랜명</th>
                                <th class="center aligned">KPI</th>
                                <th class="center aligned">평점</th>
                                <th class="center aligned">진행률</th>
                            </tr>
                        </thead>
                        <tbody v-if="plans.length>0" >
                            <tr class="viewLoadAnimation"
                            v-for="(plan, pid)  in  plans"
                            :key="pid"
                            @click.prevent="selectPlan(plan.lap_idx)"
                            v-if="actionplanSessionTab==plan.lec_seq || actionplanSessionTab<0">
                                <td><a>{{ plan.lap_text }}</a> </td>
                                <td class="center aligned"><div class="ui basic label">{{ plan.cc2_name }}</div></td>
                                <td class="center aligned">
                                    <rating privat="true" v-bind:score="plan.lap_othersAverage" />
                                </td>
                                <td class="center aligned">72%</td>
                            </tr>
                            <tr class="viewLoadAnimation" v-else>
                                <td colspan="5"class="center aligned">
                                    <no-contents header-text="해당 회차에 저장된 플랜이 없습니다" icon="users" size="size1" />
                                </td>
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




            </div>


        </div>
    </div>

</div>
</template>





<script>
const name = ''
export default {
    name: name,


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








<style lang="css">
</style>
