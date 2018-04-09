<template lang="html">
<div class="">



    <!-- ======================== 페이지 타이릍 ============================ -->
    <div class="cardbox" style="margin:10px 0; padding:25px; ">
        <h2>
            일정/시간표
            <button class="ui icon button tiny " style="margin: 4px 0 0 5px; padding:7px; font-size:.5em; position:absolute;">
                <i class="help circle icon"></i> 가이드
            </button>
        </h2>

    </div>
    <!-- ======================== 페이지 타이릍 ============================ -->







    <!-- ======================== 회차정보 ============================ -->
    <div class="cardbox " style="margin:0; padding:0; ">

        <div class="ui top attached menu big lectureMenu" >
            <a class=" item" v-bind:class="[thisTab==-1?'active':'']" v-on:click.prevent="thisTab=-1">
               전체일정
            </a>
            <a
                class=" item"
                v-for="(sess, sid) in sessions"
                :key="sid"
                v-bind:class="[thisTab==sid?'active':'']"
                v-on:click.prevent="thisTab=(sid)">
                 {{ sid+1 }}회차
            </a>
            <a class=" item" @click.prevent="removeSessionFunc(sessions.length-1)" v-if="sessions.length>0">
                <i class="icon minus circle red" ></i>회차삭제
            </a>
            <div class=" menu" @click.prevent="modal.addSession=true">
                <a class="item "  style="color:green;">
                    <i class="add icon"></i> 회차등록
                </a>
            </div>
        </div>

    </div>






    <!-- ========= 전체회차 ========= -->
    <div class="ui bottom attached tab segment cardbox viewLoadAnimation" v-bind:class="[thisTab<0?'active viewAnimate':'']" style="border-top:none; padding:25px;">
        <h3>전체 학습기간</h3>
        <hr class="opacity3">
        <table class="ui table celled form centerLayout">
            <colgroup>
                <col width="27%">
                <col width="27%">
                <col width="23%">
                <col width="23%">
            </colgroup>
            <thead>
                <tr>
                    <th class="center aligned">시작일</th>
                    <th class="center aligned">종료일</th>
                    <th class="center aligned">시간</th>
                    <th class="center aligned">회차</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td class="center aligned">
                    <date-picker format="yyyy-MM-dd" v-model="lecture.lec_startDate" />
                </td>
                <td class="center aligned">
                    <date-picker format="yyyy-MM-dd" v-model="lecture.lec_endDate" />
                </td>
                <td class="center aligned">0시간</td>
                <td class="center aligned">
                    총 {{ sessions.length }}회
                </td>
            </tr>
            </tbody>
        </table>


        <br>
        <br>

        <div class="container" style="text-align:center;" v-if="sessions.length<1">
            <no-contents header-text="등록된 회차정보가 없습니다." icon="edit" />
            <button type="button" class="ui button green large" @click.prevent="modal.addSession=true">회차등록</button>
        </div>

        <div v-else>
            <!--
            전체현황에 대한 정보 표시와 수정가능한 디자인 제작해야함
            -->



            <!-- 회차목록 -->
            <h3>회차별 학습시간</h3>
            <hr class="opacity3">
            <table class="ui table celled form centerLayout">
                <colgroup>
                    <col width="15%">
                    <col width="15%">
                    <col >
                    <col width="31.5%">
                    <col width="8.5%">
                </colgroup>
                <thead>
                    <tr>
                        <th>시작일</th>
                        <th>종료일</th>
                        <th>주제</th>
                        <th>장소</th>
                        <th class="center aligned">-</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(session, sid) in  sessions">
                        <td><date-picker format="yyyy-MM-dd" v-model="session.ls_startDate" /></td>
                        <td><date-picker format="yyyy-MM-dd" v-model="session.ls_endDate" /></td>
                        <td><input placeholder="회차 제목을 입력해 주세요" type="text" v-model="session.ls_title"></td>
                        <td><input placeholder="강의장소를 입력해 주세요" type="text" v-model="session.ls_location"></td>
                        <td class="center aligned"><button type="button" class="ui button red mini">삭제</button></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="5" style="padding:0;">
                            <button type="button" class="ui button fluid basic green mini" @click.prevent="modal.addSession=true">회차등록</button>
                        </td>
                    </tr>
                </tfoot>
            </table>

        </div>
    </div>
    <!-- ========= 전체회차 ========= -->










    <!-- ========= 회차상세정보 ========= -->
    <div
        class="ui bottom attached tab segment form segment cardbox viewLoadAnimation"
        v-bind:class="[thisTab==sid?'active viewAnimate':'']"
        style="border-top:none; padding:25px;"
        v-for="(session , sid)  in  sessions">

        <h3>{{sid+1}}회차 정보</h3>
        <hr class="opacity3">



        <!-- ===== 회차 헤더 ===== -->
        <div class="ui grid" style="margin-top:12px; padding-botton:0;">
            <!-- 회차 제목 -->
            <div class="ten wide column field">
                <label class="opacity5">회차제목</label>
                <input placeholder="" type="text" v-model="session.ls_title">
            </div>

            <!-- 회차 시작일 -->
            <div class="three wide column field">
                <label class="opacity5">회차 시작일</label>
                <date-picker format="yyyy-MM-dd" v-model="session.ls_startDate" />
            </div>

            <!-- 회차 종료일 -->
            <div class="three wide column field">
                <label class="opacity5">회차 종료일</label>
                <date-picker format="yyyy-MM-dd" v-model="session.ls_endDate" />
            </div>
        </div>


        <div class="ui grid" style="margin-top:0;">
            <!-- 회차 장소 -->
            <div class="ten wide column field" >
                <label class="opacity5">강의장소</label>
                <input placeholder="" type="text" v-model="session.ls_location">
            </div>
            <!-- 회차 시작일 -->
            <div class="three wide column field">
                <label class="opacity5">액플런 시작일</label>
                <date-picker format="yyyy-MM-dd" v-model="session.ls_aplDate" />
            </div>
        </div>
        <!-- ===== 회차 헤더 ===== -->



        <!-- ===== 회차 삭제버튼 ===== -->
        <div
            class="ui top right attached label red basic cursorPointer"
            @click.prevent="removeSessionFunc(sessions.length-1)"
            v-if="thisTab == sessions.length-1">
            회차정보 삭제
        </div>
        <!-- ===== 회차 삭제버튼 ===== -->

        <br>
        <br>




        <!-- ========= 집합교육 탭메뉴 ========= -->
        <h3>집합교육</h3>
        <div class="ui classBtn pointing  secondary  menu">
            <!-- <a class="item" v-for="(class, cid)  in  session">1차</a> -->
            <a
                class="item"
                v-for="(sClass, cid)  in  session.sessionClass"
                @click.prevent="thisClass=cid"
                :class="[thisClass==cid?'active':'']">
                {{cid+1}}일차
            </a>
            <!-- {
                lsc_title : '',
                lsc_date : '',
                timetables : []
            } -->
            <a class="item" @click.prevent="modal.addClass=true">
                교육추가  <i class="icon plus"></i>
            </a>
            <a class="right item">
                <div class="ui toggle checkbox checked" v-bind:class="[ timetableFlag ? 'checked' : '' ]" @click="timetableFlag = !timetableFlag">
                    <label>시간표 사용</label>
                    <input type="checkbox" name="gift" tabindex="0" class="hidden" v-model="timetableFlag" style="background:red;">
                </div>
            </a>
        </div>
        <!-- ========= 집합교육 탭메뉴 ========= -->

        <!-- ========= 집합교육 내용 ========= -->
        <div
            class="ui bottom  tab  viewLoadAnimation"
            :class="[thisClass==cid?'active':'']"
            v-for="(sClass, cid)  in  session.sessionClass">

            <!-- 교육 헤더 -->
            <div class="ui message" style="padding:3px 20px;">
                <div class="ui grid" style="margin-top:0; ">
                    <div class="ten wide column field" >
                        <label class="opacity5">교육주제</label>
                        <input placeholder="주제를 입력해 주세요" type="text" v-model="sClass.lsc_title">
                    </div>
                    <div class="four wide column field">
                        <label class="opacity5">교육날짜</label>
                        <date-picker v-model="sClass.lsc_date" format="yyyy-MM-dd"  />
                    </div>
                    <div class="two wide column field center aligned">
                        <label class="opacity5"></label>
                        <button type="button" class="ui red basic button" style="margin-top:19px;" @click.prevent="removeClassFunc(cid)">교육삭제</button>
                    </div>
                </div>
            </div>


            <!-- ========= 시간표가 없는 경우 ========= -->
            <div class="container " style="text-align:center;" v-if="sClass.timetables.length<1">
                  <no-contents header-text="시간표를 등록해 주세요" sub-text=" " icon="edit" />
            </div>


            <!-- ========= 시간표가 있는 경우 ========= -->
            <div class="container " v-else>

                <br>
                <timeline v-for="(timetable, tid)  in  sClass.timetables"  :key="tid" >
                    <!-- 세션헤더 -->
                    <!-- <h4>&nbsp;09:00 ~ 12:30</h4> -->
                    <table class="ui table cardbox" style="padding:0;">
                        <colgroup>
                            <col width="8%">
                            <col>
                            <col width="17%">
                            <col width="17%">
                            <col width="8%">
                        </colgroup>
                        <thead>
                            <!-- <tr>
                                <td colspan="5" class="right aligned" >
                                    <a
                                        style="color:red; cursor:pointer;"
                                        v-if="sClass.timetables.length-1 == tid"
                                        @click.prevent="removeTimetable(tid)">
                                        삭제 <i class="icon minus circle"></i>
                                    </a>
                                </td>
                            </tr> -->
                            <tr>
                                <td class="center aligned" style="background:#3b485f; color:#fff;">
                                    <h4>03<br>시간</h4>
                                </td>
                                <td class="borderBottom borderTop">
                                    <input type="text" v-model="timetable.lt_title" placeholder="주제를 입력해 주세요">
                                </td>
                                <td class="borderBottom borderTop"  >
                                    <time-picker v-model="timetable.lt_startTime" style="margin-top:11px;" />
                                </td>
                                <td class="borderBottom borderTop">
                                    <time-picker v-model="timetable.lt_endTime" style="margin-top:11px;" />
                                </td>
                                <td class="borderBottom borderTop center aligned">
                                    <a
                                        style="color:red; cursor:pointer;"
                                        v-if="sClass.timetables.length-1 == tid"
                                        @click.prevent="removeTimetable(tid)">
                                        삭제 <i class="icon minus circle"></i>
                                    </a>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="borderTop" colspan="5" style="padding:0;">
                                    <!--  -->
                                    <div class="" v-if="timetable.modules.length==0">
                                        <br>
                                        <h5 class="ui header sixteen wide column center aligned opacity4">등록된 모듈이 없습니다.</h5>
                                        <br>
                                        <!-- 모듈추가 버튼 -->
                                        <div >
                                            <button type="button" class="ui button fluid  mini" @click.prevent="modal.addModule = true , thisTimetable = tid">모듈추가</button>
                                        </div>
                                    </div>

                                    <div class="" v-else>

                                        <table class="ui table " style="border:none; margin-bottom:0;">
                                            <colgroup>
                                                <col width="10%">
                                                <col width="13%">
                                                <col>
                                                <col width="15%">
                                                <col width="15%">
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th class="center aligned " >유형</th>
                                                    <th class="center aligned">시간</th>
                                                    <th>주제</th>
                                                    <th class="center aligned">강사</th>
                                                    <th class="center aligned">-</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(module, mid)  in  timetable.modules" class="">
                                                    <td class="center aligned ">
                                                        <div class="ui label small middle aligned horizontal" style="margin-top:5px; padding:5px 8px;" v-bind:class="[ module.lm_type=='강의' ? 'blue' :  module.lm_type=='미션' ? 'green' : 'orange' ]">
                                                            {{ module.lm_type }}
                                                        </div>
                                                    </td>
                                                    <td class="center aligned ">{{ module.lm_startTime }} ~ {{ module.lm_endTime }}</td>
                                                    <td class="">{{ module.lm_title }}</td>
                                                    <td class="center aligned ">{{ module.lm_teacher }}</td>
                                                    <td class="center aligned ">
                                                        <div class="ui buttons mini basic">
                                                            <button class="ui button">수정</button>
                                                            <button class="ui button" @click.prevent="removeModuleFunc(tid , mid)">삭제</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <!-- <br> -->

                                        <!-- 모듈추가 버튼 -->
                                        <div>
                                            <button type="button" class="ui button fluid  mini" @click.prevent="modal.addModule = true , thisTimetable = tid">모듈추가</button>
                                        </div>
                                    </div>

                                </td>
                            </tr>
                        </tbody>
                    </table>



                    <br>
                    <br>
                </timeline>
            </div>



        </div>
        <!-- ========= 집합교육 내용 ========= -->










        <br>
        <button type="button" class="ui button basic green fluid" @click.prevent="modal.addTimetable=true" v-if="session.sessionClass.length>0">시간표 추가</button>


    </div>
    <!-- ========= 회차상세정보 ========= -->


    <!-- ======================== 회차정보 ============================ -->








    <!-- ======================== 하단 ============================ -->
    <div class="cardbox" style="margin:10px 0; padding:25px; text-align:center;">
        <button class="ui basic large button" @click="save('summary')">이전페이지</button>
        <!-- <button class="ui button" @click.prevent="save">저장</button> -->
        <button class="ui basic large button" @click="save('kpi')">다음페이지</button>
    </div>
    <!-- ======================== 하단 ============================ -->





















    <!-- ======================== 모달영역 ============================ -->

    <!-- 세션추가 -->
    <modal v-if="modal.addSession" @close="modal.addSession = false" w="w-50">
        <h3 slot="header">
            <i class="calendar alternate outline icon"></i> 차시 등록
        </h3>
        <div slot="body" class="content">


            <div class="ui form">
                <div class="field">
                    <label>회차제목</label>
                    <input placeholder="" type="text" v-model="temp.session.ls_title">
                </div>

                <div class="field">
                    <label>강의장소</label>
                    <input placeholder="" type="text" v-model="temp.session.ls_location">
                </div>

                <div class="three fields">
                    <div class="field">
                        <label>시작일</label>
                        <date-picker v-model="temp.session.ls_startDate" format="yyyy-MM-dd" />
                    </div>
                    <div class="field">
                        <label>종료일</label>
                        <date-picker v-model="temp.session.ls_endDate" format="yyyy-MM-dd" />
                    </div>
                </div>

                <div class="three fields">
                    <div class="field">
                        <label>액플런 시작일</label>
                        <date-picker v-model="temp.session.ls_aplDate" format="yyyy-MM-dd" />
                    </div>
                </div>

                <!-- <div class="field">
                    <label>설명</label>
                    <textarea  rows="3" placeholder="내용을 입력해 주세요" v-model="temp.session.ls_text"></textarea>
                </div> -->
            </div>


        </div>

        <div slot="footer" class="ui two bottom attached buttons">
            <div class="ui button" @click="modal.addSession=false">닫기</div>
            <div class="ui button blue" @click="addSessionFunc">등록</div>
        </div>
    </modal>
    <!-- 세션추가 -->





    <!-- 교육추가 -->
    <modal v-if="modal.addClass" @close="modal.addClass = false" w="w-30">
        <h3 slot="header">
            <i class="calendar alternate outline icon"></i> 교육추가
        </h3>
        <div slot="body" class="content">


            <div class="ui form">
                <div class="fields">
                    <!-- <div class="field eleven wide">
                        <label>시작일</label>
                        <input placeholder="주제를 입력해 주세요" type="text" v-model="temp.sessionClass.lsc_title">
                    </div> -->
                    <div class="field sixteen wide">
                        <label>교육일</label>
                        <date-picker v-model="temp.sessionClass.lsc_date" format="yyyy-MM-dd" />
                    </div>
                </div>
            </div>


        </div>

        <div slot="footer" class="ui two bottom attached buttons">
            <div class="ui button" @click="modal.addClass=false">닫기</div>
            <div class="ui button blue" @click="addClassFunc">등록</div>
        </div>
    </modal>
    <!-- 교육추가 -->









    <!-- 시간표추가 -->
    <modal v-if="modal.addTimetable" @close="modal.addTimetable = false" w="w-50">
        <h3 slot="header">
            <i class="columns icon"></i> 시간표 등록
        </h3>
        <div slot="body" class="content">


            <div class="ui form">
                <div class="field">
                    <label>강의주제</label>
                    <input placeholder="" type="text" v-model="temp.timetable.lt_title='대인관계능력 실습'">
                </div>

                <div class="two fields">
                    <div class="field">
                        <label>시작시간</label>
                        <time-picker v-model="temp.timetable.lt_startTime"  />
                    </div>
                    <div class="field">
                        <label>종료시간</label>
                        <time-picker v-model="temp.timetable.lt_endTime" />
                    </div>
                </div>

            </div>


        </div>

        <div slot="footer" class="ui two bottom attached buttons">
            <div class="ui button" @click="modal.addTimetable=false">닫기</div>
            <div class="ui button blue" @click="addTimetableFunc">등록</div>
        </div>
    </modal>
    <!-- 시간표추가 -->





    <!-- 모듈추가 -->
    <modal v-if="modal.addModule" @close="modal.addModule = false" w="w-50">
        <h3 slot="header">
            <i class="columns icon"></i> 강의모듈 등록
        </h3>
        <div slot="body" class="content">

            <div class="ui form">
                <label>강의유형</label>
                <div class="inline fields">
                    <div class="field">
                        <div class="ui radio checkbox">
                            <input id="rr1" type="radio" v-model="temp.module.lm_type" value="토론" checked="checked">
                            <label for="rr1">토론</label>
                        </div>
                    </div>

                    <div class="field">
                        <div class="ui radio checkbox">
                            <input id="rr2" type="radio" v-model="temp.module.lm_type" value="미션">
                            <label for="rr2">미션</label>
                        </div>
                    </div>

                    <div class="field">
                        <div class="ui radio checkbox">
                            <input id="rr3" type="radio" v-model="temp.module.lm_type" value="강의">
                            <label for="rr3">강의</label>
                        </div>
                    </div>
                </div>

                <div class="two fields">
                    <div class="field">
                        <label>강사명</label>
                        <input placeholder="" type="text" v-model="temp.module.lm_teacher">
                    </div>
                </div>

                <div class="field">
                    <label>주제</label>
                    <input placeholder="" type="text" v-model="temp.module.lm_title='대인관계능력 실습'">
                </div>

                <div class="three fields">
                    <div class="field">
                        <label>시작시간</label>
                        <time-picker v-model="temp.module.lm_startTime" />
                    </div>
                    <div class="field">
                        <label>종료시간</label>
                        <time-picker v-model="temp.module.lm_endTime"  />
                    </div>
                </div>

            </div>


        </div>

        <div slot="footer" class="ui two bottom attached buttons">
            <div class="ui button" @click="modal.addModule=false">닫기</div>
            <div class="ui button blue" @click="addModuleFunc">등록</div>
        </div>
    </modal>
    <!-- 모듈추가 -->


    <!-- ======================== 모달영역 ============================ -->



</div>
</template>




<script>
// ========== Imports ========== //
import {
    Modal,
    Timepicker,
    Timeline ,
    Feed ,
    NoContents,
} from '../../components'


// 데이트픽커
import DatePicker from 'vuejs-datepicker'



export default {

    name: "NewTimetable",


    // ========== Components ========== //
    components : {
        'modal'             : Modal,
        'timeline'          : Timeline,
        'feed'                : Feed,
        'no-contents'   : NoContents,
        DatePicker,
        'time-picker' : Timepicker,
    },




    // ========== Data ========== //
    data(){
        return{
            modal: {                             // 모달객체
                addSession : false,
                addClass : false,
                addTimetable : false,
                addModule:false,
                editModule:false
            },

            thisTab : -1, // 현재 선택된 세션의 아이디
            thisClass : -1, // 현재 선택된 집합교육의 아이디
            thisTimetable: -1, //선택된 타임테이블
            timetableFlag: true,           // 시간표 활성화 플래그
            tp: '',           // 시간표 활성화 플래그

            lec_idx:-1, // 강의아이디
            lecture : {}, // 강의상세 - 기간때문에 필요
            sessions : [], // 일정표 메인모델
            timetables : [],

            tempModule : {},
            temp : { // 인풋 모델
                session : {
                    ls_title : '대인관계능력 실습',
                    ls_location : '서울특별시 강남구 테헤란로4길 27 (역삼동) 금성빌딩 5층',
                    ls_startDate : '2018-01-23',
                    ls_endDate : '2018-02-23',
                    ls_aplDate : '2018-02-03',
                    // timetables: [],
                    sessionClass: []
                },

                sessionClass : {
                    lsc_title : '',
                    lsc_date : '',
                    timetables : []
                },

                timetable : {
                    lt_title : '',
                    lt_startTime : '',
                    lt_endTime : '',
                    modules: []
                },

                module : {
                    lm_type:'강의',
                    lm_title: '',
                    lm_text: '',
                    lm_teacher: '',
                    lm_startTime: '',
                    lm_endTime: ''
                }
            }
        }
    }, //data





    // ========== Created ========== //
    created(){
        var id = sessionStorage.getItem('lecture-idx') // 강의아이디
        id = (id !== null) ? id : -1
        var storageLecture = JSON.parse(sessionStorage.getItem('lecture-summary'))
        var storageSessions  =  JSON.parse(sessionStorage.getItem('lecture-sessions'))

        this.$set(this, 'lec_idx', id)

        if (storageLecture!==null && storageLecture!==undefined)
            this.$set(this, 'lecture' , storageLecture)
        if (storageSessions!==null && storageSessions!==undefined)
            this.$set(this, 'sessions' , storageSessions)
    },





    // ========== Methods ========== //
    methods : {


        // ===== 회차정보 추가 ===== //
        addSessionFunc(){
            this.sessions.push(this.temp.session) // 모델로 푸시
            this.$set(this.modal , 'addSession', false) // 모달 OFF
            this.$set(this , 'thisTab', -1)
            // this.$set(this , 'thisTab', this.sessions.length-1)
            // 초기화
            this.$set(this.temp, 'session' , {
                ls_title : '대인관계능력 실습',
                ls_location : '서울특별시 강남구 테헤란로4길 27 (역삼동) 금성빌딩 5층',
                ls_startDate : '2018-01-23',
                ls_endDate : '2018-02-23',
                ls_aplDate : '2018-02-03',
                timetables: [],
                sessionClass: []
            })
        },




        // ===== 교육정보 추가 ===== //
        addClassFunc(){
            this.sessions[this.thisTab].sessionClass.push(this.temp.sessionClass) // 모델로 푸시
            this.$set(this.modal , 'addClass', false) // 모달 OFF
            this.$set(this , 'thisClass',  this.sessions[this.thisTab].sessionClass.length-1) // 모달 OFF

            // 초기화
            this.$set(this.temp, 'sessionClass' , {
                lsc_title : '',
                lsc_date : '',
                timetables : []
            })
        },





        // ===== 상세시간표 추가 ===== //
        addTimetableFunc(){
            console.log("this.thisClass : ", this.thisClass);
            // return
            // 현재 세션의 상세시간표 모델로 푸시
            this.sessions[this.thisTab].sessionClass[this.thisClass].timetables.push(this.temp.timetable)
            // 모달 OFF
            this.$set(this.modal, 'addTimetable', false)
            // 초기화
            this.$set(this.temp, 'timetable', {
                lt_title : '',
                lt_startTime : '',
                lt_endTime : '',
                modules: []
            })
        },





        // ===== 모듈추가 ===== //
        addModuleFunc(){
            // 현재 시간표의 모듈 모델로 푸시
            this.sessions[this.thisTab].sessionClass[this.thisClass].timetables[this.thisTimetable].modules.push(this.temp.module)
            // console.log(this.temp.module)
            // 모달 OFF
            this.$set(this.modal, 'addModule', false)
            // 초기화
            this.$set(this, 'thisTimetable', -1)
            this.$set(this.temp, 'module', {
                lt_title : '',
                lt_startTime : '',
                lt_endTime : '',
                lm_type : '강의',
                lm_teacher:''
            })
        },





        // ===== 세션 삭제 ===== //
        removeSessionFunc(sid){
            if( !confirm('삭제한 차시는 복구가 불가능합니다. 삭제하시겠습니까?') )
                return

            this.$set(this, 'thisTab', this.thisTab-1)

            // this.sessions.splice(sid, 1)
            this.sessions.pop()
        },


        // ===== 교육 삭제 ===== //
        removeClassFunc(cid){
            if( !confirm('삭제한 교육은 복구가 불가능합니다. 삭제하시겠습니까?') )
                return

            // this.sessions.splice(sid, 1)
            this.sessions[this.thisTab].sessionClass.splice(cid, 1)
            this.$set(this, 'thisClass', cid-1)
        },





        // ===== 시간표 삭제 ===== //
        removeTimetable(tid){
            if( !confirm('삭제한 시간표는 복구가 불가능합니다. 삭제하시겠습니까?') )
                return

            this.sessions[this.thisTab].sessionClass[this.thisClass].timetables.splice(tid, 1)
        },





        // ===== 모듈 삭제 ===== //
        removeModuleFunc(tid, mid){
            if( !confirm('삭제한 모듈은 복구가 불가능합니다. 삭제하시겠습니까?') )
                return

            this.sessions[this.thisTab].sessionClass[this.thisClass].timetables[tid].modules.splice(mid, 1)
        },




        // ===== 저장 ===== //
        save(url){
            // console.log("this.lec_idx : ", this.lecture);
            // return
            this.$http.post('/api/lectures/create/sessions', {
                sessions                : this.sessions,
                lec_idx                  : this.lec_idx,
                lec_startDate        : this.lecture.lec_startDate,
                lec_endDate         : this.lecture.lec_endDate
            })
            .then(resp=>{
                var id = resp.data.lec_idx // 신규등록일 경우  -  리턴 아이디
                if(this.lec_idx<0){
                    this.$set(this, 'lec_idx', id)
                    sessionStorage.setItem('lec_idx', id)
                }// if
                // alert('저장되었습니다.')
                this.$router.push('/new/'+url)
            })
            .catch(err=>{
                console.log(err);
                alert('Error')
            })
        },


    }, // ========== Methods ========== //

}
</script>




<style lang="css">

    .sessionInfo h4{
        margin-top: 10px;
    }



    .lectureMenu {

        border-radius: 0 !important;
    }
    .lectureMenu .active{
        border-left:none !important;
        border-right:none !important;
        border-top:none !important;
        color: #fff !important;
        background: #3b485f !important;
        border-radius: 0 !important;
    }



    .addModule , .removeModule{
        font-size: 0.9em;
    }


    .addModule{
        cursor: pointer;
        color:#9FC93C !important;
    }
    .addModule:hover{
        background :#9FC93C !important;
        color :#fff !important;
    }
    .removeModule{
        cursor: pointer;
        color:#F15F5F !important;
    }
    .removeModule:hover{
        background :#F15F5F !important;
        color :#fff !important;
    }





    .classBtn .item:last-child{
        color:green !important;
    }
    .classBtn{
        /*overflow: scroll;*/
    }



</style>
