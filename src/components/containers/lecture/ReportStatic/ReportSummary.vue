<template lang="html">
<div >





    <div class="ui segment" style="padding:250px 55px 30px 55px; text-align:center;">
        <hr class="opacity3">
        <h1>
            {{ lecture.lec_title }}
            <br>
            <small style="color:#a1a1a1;">액션플랜러닝 기업용 보고서</small>
        </h1>
        <hr class="opacity3">

        <h4><참여기업></h4>
        <span v-for="(com,i) in companies">
            <div class="ui basic tiny" @click.prevent="modal.companyDetail = true, companyDetailFunc(com.com_code)">
            {{ com.com_name }}
            </div>
        </span>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>

        <h4>(주)비전플랜</h4>
    </div>





    <div class="ui segment" style="padding:50px;">
        <h2 class="ui dividing header">1. 강의정보</h2>

        <h3>1) 강의목표</h3>
        <p style="white-space: pre-line">{{ lecture.lec_goal }}</p>
        <br>

        <h3>2) 내용</h3>
        <p style="white-space: pre-line">{{ lecture.lec_content }}</p>
        <br>

        <h3>3) 기대효과</h3>
        <p style="white-space: pre-line">{{ lecture.lec_effect }}</p>
        <br>

        <h3>4) 강의대상</h3>
        <p>{{ lecture.lec_target | capitalize }}</p>


        <br>
        <br>
        <br>
        <h5 style=" color: #a1a1a1; text-align:center; margin-bottom: -25px;">- 2 -</h5>
    </div>








    <div class="ui segment" style="padding:50px;">
        <h2 class="ui dividing header">2. 일정/시간표</h2>

        <h3>1) 일정</h3>
        <p>
            <span><b>강좌기간 :</b> {{ lecture.lec_startDate }} ~ {{ lecture.lec_endDate }}</span>
            <br>
            <br>
            <span v-for="(sess, ii) in lecture.sessions"><b>{{ ii+1 }}차수 :</b> {{ lecture.lec_startDate }} ~ {{ lecture.lec_endDate }}<br><br></span><br>
        </p>



        <h3>2) 상세 시간표</h3>
        <br>
        <div class="">






<div v-for="(sess, jj) in lecture.sessions" style="padding-left:25px;">
<!-- === 집합교육 - 레이아웃 === -->
<div >

    <!-- === 집합교육 - 타이틀 === -->
    <div >
        <h4 class="ui header" >
            {{ jj+1 }}회차 - {{ sess.ls_title }}
            <div class="sub header"  style="line-height:210%;">
                <i class="icon calendar outline"></i>
                <b>강의일정 :</b> {{ sess.ls_startDate }}
                    &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                <i class="icon clock outline"></i>
                <b>시간 :</b> {{ sess.startTime }} ~ {{ sess.endTime }} (00시간)
            </div>
        </h4>
        <hr class="opacity4">




    <div style="text-align:center;" v-if="sess.ls_timetableFlag<1">
        <br>
        집합교육 일정이 없습니다.
        <br>
    </div>


    <!-- === 집합교육 - 목록 탭 === -->
    <div  v-if="sess.ls_timetableFlag>0">


        <div style="width:100%;">
            <!-- 강의회차 탭-->
            <h4
                class="item"
                v-for="(sClass, scid) in sess.sessionClass"
                v-bind:class="[classTab==scid?'active':'']"
                @click.prevent="classTab=scid">
                {{scid+1}}차 교육 - {{ sClass.lsc_date }}
            </h4>
            <!-- 강의회차 탭-->
        </div>




    <!-- === 집합교육 - 상세보기 타임라인 === -->
    <div >
        <div v-for="(sClass, scid) in sess.sessionClass" style="padding:0 !important; border:none; ">

            <!-- 타임라인 -->
            <div
                class="container33"
                v-for="(timetable, tid)  in  sClass.timetables"
                v-if="timetable.lsc_idx === sClass.lsc_idx"
                :key="timetable.lt_idx">

                <table class="ui table celled structured">
                    <colgroup>
                        <col width="8.5%">
                        <col >
                    </colgroup>
                    <tbody>
                        <tr>
                            <th class="borderTop center aligned">주제</th>
                            <td>{{ timetable.lt_title }}</td>
                        </tr>
                        <tr>
                            <th class="borderTop center aligned">시간</th>
                            <td>{{ timetable.start ? timetable.start : '00:00' }} ~ {{ timetable.end ? timetable.end : '00:00' }}</td>
                        </tr>
                        <tr>
                            <th class="borderTop center aligned">내용</th>
                            <td style="padding:0;">
                                <table class="ui line table " style="border:none; margin-bottom:0;">
                                    <colgroup>
                                        <col width="10%">
                                        <col width="16%">
                                        <col>
                                        <col width="15%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th class="center aligned "  style="border-right:none; border-left:none;">유형</th>
                                            <th class="center aligned" style="border-right:none; border-left:none;">시간</th>
                                            <th style="border-right:none; border-left:none;">주제</th>
                                            <th class="center aligned" style="border-right:none; border-left:none;">강사</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(module, mid)  in  timetable.modules" class="">
                                            <td class="center aligned " style="border-right:none; border-left:none;">
                                                &nbsp;
                                                <div class="ui label small middle aligned horizontal" style="margin-top:5px; padding:5px 8px;" v-bind:class="[ module.lm_type=='강의' ? 'blue' :  module.lm_type=='미션' ? 'green' : 'orange' ]">
                                                    {{ module.lm_type }}
                                                </div>
                                            </td>
                                            <td class="center aligned " style="border-right:none; border-left:none;">{{ module.lm_startTime }} ~ {{ module.lm_endTime }}</td>
                                            <td class="" style="border-right:none; border-left:none;">{{ module.lm_title }}</td>
                                            <td class="center aligned " style="border-right:none; border-left:none;">{{ module.lm_teacher }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <!-- 강의내용 -->
        </div>

        </div>
        <!-- === 집합교육 - 목록 탭 === -->
    </div>
    <!-- === 집합교육 - 상세보기 타임라인 === -->


    </div>
    <!-- === 집합교육 - 타이틀 === -->
</div>
<!-- === 집합교육 레이아웃 === -->
</div>



        </div>

        <br>
        <br>
        <br>
        <h5 style=" color: #a1a1a1; text-align:center; margin-bottom: -25px;">- 3 -</h5>
    </div>




















<!-- ====================

3. 출석률

==================== -->
<!-- <div class="ui segment" style="padding:50px;">
    <h2>4. 교육진행</h2>
    <hr class="opacity4">
</div> -->








<!-- ====================

5. 통계

==================== -->
<!-- <div class="ui segment" style="padding:50px;">
    <h2>4. 교육진행</h2>
    <hr class="opacity4">
</div>


    <h3>5. 통계</h3>
    <h3>6. 설문조사</h3> -->



</div>
</template>





<script>
const name = 'Summary'
export default {
    name: name,


    // ===== Props ===== //
    props:['lecture', 'companies'],



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
