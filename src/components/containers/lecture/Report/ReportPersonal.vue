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
                    @click.prevent="personalGraph(std.stu_idx)">
                    <!-- @click.prevent="selectStudnetFunc(std.stu_idx)"> -->
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

            <!-- ====================
            전체통계
            ==================== -->
            <div class="" style="width:100%;  ">
                <div>
                    <h3 class="ui block attached header" style="border-top:1px solid #d7d7d7;">
                        {{ thisStudnet>0 ? filteredStudent.stu_name : '전체' }}
                    </h3>
                    <!-- === 평가자료 === -->
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
                            <td class="">자가:00일(팀:00일</td>

                            <th class="borderTop" >사전점수</th>
                            <td class="">00점</td>

                            <th class="borderTop" >참여팀원</th>
                            <td class=""></td>
                        </tr>
                        <tr>
                            <th class="borderTop" >진행률</th>
                            <td class="">00%</td>

                            <th class="borderTop" >수행평균</th>
                            <td class="">00</td>

                            <th class="borderTop" >팀원평균</th>
                            <td class="">00</td>
                        </tr>
                        <tr>
                            <th class="borderTop" >참여율</th>
                            <td class="">
                                자가:00%
                                (팀:00%)
                            </td>

                            <th class="borderTop" >역량향상</th>
                            <td class=""></td>

                            <th class="borderTop" >평가GAP</th>
                            <td class="">00</td>
                        </tr>
                        <tr>
                            <th class="borderTop" >자가성취율</th>
                            <td class="">00 / 00일</td>

                            <th class="borderTop" >역량향상률</th>
                            <td class=""></td>

                            <th class="borderTop" >팀원신뢰율</th>
                            <td class=""></td>
                        </tr>
                    </table>
                    <!-- === 평가자료 === -->

                    <div class="ui attached segment" style="width:100%; padding:0; overflow-x: scroll; position:relative;">

                        <loading v-if="personalData.allAvg==null" />
                        <slide-graph :chart="personalData.allAvg" v-else />
                    </div>

                    <br>
                    <br>
                    <br>
                </div>
            </div>




            <!-- ====================
            플랜목록
            ==================== -->
            <div style="width:100%;"  v-if="personalData.allAvg==null">
                <loading  />
            </div>
            <div style="width:100%;" v-else>
                <div v-for="(sc, scId)  in  personalData.plans" :key="scId">
                    <h3 class="ui block attached header" style="border-top:1px solid #d7d7d7;">
                        {{ sc.lap_text }}
                        <div class="ui basic label small">KPI: {{ sc.cc2_name }}</div>
                    </h3>
                    <!-- === 평가자료 === -->
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
                            <td class="">자가:{{ sc.participationSelfDay }}일(팀:{{ sc.participationOthersDay }})일</td>

                            <th class="borderTop" >사전점수</th>
                            <td class="">{{ sc.lap_beforeScore }}점</td>

                            <th class="borderTop" >참여팀원</th>
                            <td class=""></td>
                        </tr>
                        <tr>
                            <th class="borderTop" >진행률</th>
                            <td class="">{{ sc.progressRate }}%</td>

                            <th class="borderTop" >수행평균</th>
                            <td class="">{{ sc.selfAvg }}점</td>

                            <th class="borderTop" >팀원평균</th>
                            <td class="">{{ sc.othersAvg }}점</td>
                        </tr>
                        <tr>
                            <th class="borderTop" >참여율</th>
                            <td class="">
                                자가:{{ sc.participationSelfRate }}(팀:{{ sc.participationOthersDay }})%
                            </td>

                            <th class="borderTop" >역량향상</th>
                            <td class="">{{ sc.selfAvg - sc.lap_beforeScore }}점</td>

                            <th class="borderTop" >평가GAP</th>
                            <td class="">{{ sc.othersAvg - sc.selfAvg }}점</td>
                        </tr>
                        <tr>
                            <th class="borderTop" >자가성취율</th>
                            <td class="">{{ (sc.selfAvg*25).toFixed(1) }}%</td>

                            <th class="borderTop" >역량향상률</th>
                            <td class="">{{ ((sc.selfAvg - sc.lap_beforeScore)*25).toFixed(1) }}점</td>

                            <th class="borderTop" >팀원신뢰율</th>
                            <td class="">{{ ((sc.othersAvg*100) / sc.selfAvg).toFixed(1) }}%</td>
                        </tr>
                    </table>
                    <!-- === 평가자료 === -->

                    <div class="ui attached segment" style="width:100%; padding:0; overflow-x: scroll; position:relative;">
                        <slide-graph :chart="sc.score" style="position:relative;" />
                    </div>

                    <br>
                    <br>
                    <br>
                </div>
            </div>



            <!-- ====================
            코멘트
            ==================== -->
            <div class="ui feed">
                <div class="event" v-for="(comment, cid)  in  personalData.comments">
                    <div class="label">
                        <img src="https://cdn2.iconfinder.com/data/icons/instagram-ui/48/jee-75-128.png" v-if="comment.stu_gender=='남'">
                        <img src="https://cdn2.iconfinder.com/data/icons/instagram-ui/48/jee-75-128.png" v-if="comment.stu_gender=='여'">
                        <img src="https://cdn2.iconfinder.com/data/icons/instagram-ui/48/jee-75-128.png" v-if="comment.stu_gender=='-' ||  comment.stu_gender==null">
                    </div>
                    <div class="content">
                        <div class="summary">
                            <a class="user">
                                {{ comment.stu_name }}
                                <a class="ui green circular label mini" v-if="comment.ac_flag=='강사'">강사님의 응원글</a>
                            </a><div class="date">{{ comment.ac_date }}</div>
                            <br>
                            {{ comment.ac_contents }}
                        </div>
                        <div class="extra" v-if="comment.ac_img">
                            <a><img :src="comment.ac_img" width="270"></a>
                        </div>
                        <div class="meta">
                            <a class="like"><i class="like icon"></i> 0 Likes</a>
                        </div>
                    </div>
                </div>

            </div>





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
    SlideGraph,
    PolarChart,
} from '../../../components'


export default {
    name: 'ReportPersonal',



    // ===== Components ===== //
    components:{
        Loading,
        TabMenu,
        NoContents,
        SlideGraph,
        PolarChart,
    },



    // ===== Props ===== //
    props:['from'],



    // ===== Data ===== //
    data(){ return {

        lec_idx : null , // 강의아이디
        actionplanSessionTab : -1, // 세션탭
        plans : [], // 플랜목록

        thisStudnet:-1, // 현재 선택학생
        personalData:{
            kpi: null,
            score: null,

            allAvg: null,
            kpiAvg:null,
            plans:null,
        }, // 선택된 학생의 차트데이터

        avgBeforeScore:-1, // 사전점수

        comments : [],
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





    // ===== Computed ===== //
    computed:{
        filteredStudent(){
            if ( !this.from.students.length || this.thisStudnet<0 ){
               return []
            }
            var rid = this.from.students.findIndex(p =>{
                 return p.stu_idx == this.thisStudnet
             })
            return this.from.students[rid]
        }
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
            this.$set(this.personalData, 'allAvg',         null) // 전체
            this.$set(this.personalData, 'kpiAvg',        null) // KPI별
            this.$set(this.personalData, 'plans',           null) // 플랜별
            this.$set(this.personalData, 'comments',  null) // 코멘트

            this.$http.all([
                this.$http.get('/api/plans/personal/'+this.lec_idx+'/'+stu_idx),
                this.$http.get('/api/plans/comments/'+stu_idx)
            ])
            .then(this.$http.spread((resp, resp2)=>{

                //누적데이터
                var allAvg      = resp.data.allAvg.length   <1 ? [] : resp.data.allAvg
                var kpiAvg     = resp.data.kpiAvg.length  <1 ? [] : resp.data.kpiAvg
                var plans        = resp.data.plans.length     <1 ? [] : resp.data.plans
                var comments = resp2.data.comments

                // 모델로 푸시
                this.$set(this.personalData, 'allAvg',         allAvg) // 전체
                this.$set(this.personalData, 'kpiAvg',        kpiAvg) // KPI별
                this.$set(this.personalData, 'plans',           plans) // 플랜별
                this.$set(this.personalData, 'comments',  comments) // 코멘트

                this.$set( this, 'thisStudnet', stu_idx )

            }))
            .catch(err=>{
                console.log(err);
                alert('Error - personal plans')
                // 빈배열 삽입
                this.$set(this.personalData, 'allAvg',         []) // 전체
                this.$set(this.personalData, 'kpiAvg',        []) // KPI별
                this.$set(this.personalData, 'plans',           []) // 플랜별
                this.$set(this.personalData, 'comments',  []) // 코멘트
            })
        },// === 개별데이터 === //





        // === === //
        selectStudnetFunc(val){
            this.$set(this, 'thisStudnet', val )
            this.$set(this.personalData, 'score', null)

            var baseURL = '/api/plans/score/'+this.lec_idx+'/personal/'+Number(val)

            this.$http.get(baseURL)
            .then(resp=>{
                this.$set(this.personalData, 'score', resp.data.score)
                // console.log(resp.data);
                this.personalGraph(Number(val))
            })
            .catch(err => {
                this.$set(this.personalData, 'score', [])
            })
        },


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
