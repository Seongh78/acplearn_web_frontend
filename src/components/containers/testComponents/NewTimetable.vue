<template lang="html">
<div class="">

    <!-- ======================== 페이지 타이릍 ============================ -->
    <div class="cardbox" style="margin:10px 0; padding:25px; ">
        <h2>
            상세시간표
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
               전체
            </a>
            <a class=" item"
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
        <div class="container" style="text-align:center;" v-if="sessions.length<1">
            <no-contents header-text="등록된 회차정보가 없습니다." icon="edit" />
        </div>

        <div v-else>
            <!--
            전체현황에 대한 정보 표시와 수정가능한 디자인 제작해야함
            -->
            <h3>전체 학습기간</h3>
            <hr class="opacity3">
            <table class="ui table celled form centerLayout">
                <colgroup>
                    <col width="30%">
                    <col width="30%">
                    <col width="22%">
                    <col width="18%">
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
                    <td class="center aligned">2018-01-02</td>
                    <td class="center aligned">2018-02-03</td>
                    <td class="center aligned">13시간</td>
                    <td class="center aligned">
                        총 {{ sessions.length }}회
                    </td>
                </tr>
                </tbody>
            </table>


            <br>
            <br>


            <!-- 회차목록 -->
            <h3>회차별 학습시간</h3>
            <hr class="opacity3">
            <table class="ui table celled form centerLayout">
                <colgroup>
                    <col width="10%">
                    <col width="10%">
                    <col width="40%">
                    <col width="33%">
                    <col width="7%">
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
                        <td><input placeholder="" type="date" style="font-size:0.85em; " v-model="session.ls_startDate"></td>
                        <td><input placeholder="" type="date" style="font-size:0.85em;" v-model="session.ls_endDate"></td>
                        <td><input placeholder="회차 제목을 입력해 주세요" type="text" style="font-size:0.85em;" v-model="session.ls_title"></td>
                        <td><input placeholder="강의장소를 입력해 주세요" type="text" style="font-size:0.85em;" v-model="session.ls_location"></td>
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

        <div class="ui grid" style="margin-top:12px; padding-botton:0;">
            <div class="sixteen wide column field">
                <label class="opacity5">회차제목</label>
                <input placeholder="" type="text" v-model="session.ls_title">
            </div>
        </div>

        <div class="ui grid" style="margin-top:0;">
            <div class="ten wide column" >
                <label class="opacity5">강의장소</label>
                <input placeholder="" type="text" v-model="session.ls_location">
            </div>
            <div class="three wide column field">
                <label class="opacity5">시작일</label>
                <input placeholder="First Name" type="date" v-model="session.ls_startDate">
            </div>
            <div class="three wide column field">
                <label class="opacity5">종료일</label>
                <input placeholder="First Name" type="date" v-model="session.ls_endDate">
            </div>
        </div>

        <div
            class="ui top right attached label red basic cursorPointer"
            @click.prevent="removeSessionFunc(sessions.length-1)"
            v-if="thisTab == sessions.length-1">
            회차정보 삭제
        </div>

        <br>
        <br>
        <br>


        <!-- ========= 시간표 활성화 플래그 ========= -->
        <div class="ui grid">
            <div class=" two wide column" style="">
                <h3>상세시간표</h3>
            </div>
            <div class="field fourteen wide column right aligned" style="">
                <div class="ui toggle checkbox checked" v-bind:class="[ timetableFlag ? 'checked' : '' ]" @click="timetableFlag = !timetableFlag">
                    <label>시간표 사용</label>
                    <input type="checkbox" name="gift" tabindex="0" class="hidden" v-model="timetableFlag" style="background:red;">
                </div>
            </div>
        </div>
        <!-- ========= 시간표 활성화 플래그 ========= -->
        <hr class="opacity3">



        <!-- ========= 시간표가 없는 경우 ========= -->
        <div class="container " style="text-align:center;" v-if="session.timetables.length<1">
            <br>
            <no-contents header-text="시간표를 등록해 주세요" sub-text=" " icon="edit" />
        </div>
        <!-- ========= 시간표가 없는 경우 ========= -->





        <!-- ========= 시간표가 있는 경우 ========= -->
        <div class="container " v-else>

            <br>
            <timeline class="container33 " v-for="(timetable, tid)  in  session.timetables"  :key="tid" >
                <!-- 세션헤더 -->
                <h4>&nbsp;09:00 ~ 12:30</h4>
                <table class="ui table cardbox" style="padding:0;">
                    <colgroup>
                        <col width="9%">
                        <col >
                        <col width="9%">
                        <col width="9%" v-if="session.timetables.length-1 == tid">
                    </colgroup>
                    <thead>
                        <tr>
                            <td class="center aligned borderBottom" style="border-right:1px solid #e1e1e1; background:#37474F; ">
                                <h3 class="ui header" style="color:#fff">
                                    03
                                    <div class="sub header" style="color:#fff">시간</div>
                                </h3>
                            </td>
                            <td class="borderBottom">
                                <h4 class="ui header">
                                    {{ timetable.lt_title }}
                                </h4>
                            </td>
                            <td class="center aligned borderBottom addModule" style="border-left: 1px solid #e1e1e1; color:#b1b1b1;" @click.prevent="modal.addModule = true , thisTimetable = tid">
                                <i class="plus icon"></i><br>시간표 수정
                            </td>
                            <td class="center aligned borderBottom removeModule" style="border-left: 1px solid #e1e1e1; color:#b1b1b1;" @click.prevent="removeTimetable(tid)" v-if="session.timetables.length-1 == tid">
                                <i class="minus circle icon"></i><br>시간표 삭제
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="borderTop" colspan="4">



                                <!--  -->
                                <div class="" v-if="timetable.modules.length==0">
                                    <h5 class="ui header sixteen wide column center aligned opacity4">등록된 모듈이 없습니다.</h5>
                                    <br>
                                    <!-- 모듈추가 버튼 -->
                                    <div class="ui grid" style="margin-left:-12px; margin-bottom:-11px;">
                                        <button type="button" class="ui button fluid  mini" @click.prevent="modal.addModule = true , thisTimetable = tid">모듈추가</button>
                                    </div>
                                </div>

                                <div class="" v-else>
                                    <!-- 모듈헤더 -->
                                    <div class="ui grid" style="">
                                        <div class="two wide column center aligned">
                                            <label>유형</label>
                                        </div>
                                        <div class="two wide column center aligned">
                                            <label>시작시간</label>
                                        </div>
                                        <div class="two wide column center aligned">
                                            <label>종료시간</label>
                                        </div>
                                        <div class="seven wide column">
                                            <label>주제</label>
                                        </div>
                                        <div class="three wide column center aligned">
                                            <label>-</label>
                                        </div>
                                    </div>




                                    <!-- 모듈리스트 -->
                                    <div
                                        class="ui grid viewLoadAnimation "
                                        style=" border-top:1px solid #f1f1f1;"

                                    v-for="(module, mid)  in  timetable.modules">
                                        <div class="two wide column center aligned">
                                            {{ module.lm_type }}
                                        </div>
                                        <div class="two wide column center aligned">
                                            {{ module.lm_startTime }}
                                        </div>
                                        <div class="two wide column center aligned">
                                            {{ module.lm_endTime }}
                                        </div>
                                        <div class="seven wide column">
                                            {{ module.lm_title }}
                                        </div>
                                        <div class="three wide column center aligned" style="padding:6.5px;">
                                            <div class="ui buttons mini basic">
                                              <button class="ui button">수정</button>
                                              <button class="ui button" @click.prevent="removeModuleFunc(tid , mid)">삭제</button>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 모듈추가 버튼 -->
                                    <div class="ui grid" style="margin-left:-12px; margin-bottom:-11px;">
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
        <!-- ========= 시간표가 있는 경우 ========= -->

        <br>
        <button type="button" class="ui button basic green fluid" @click.prevent="modal.addTimetable=true">시간표 추가</button>


    </div>
    <!-- ========= 회차상세정보 ========= -->


    <!-- ======================== 회차정보 ============================ -->




























    <!-- ======================== 모달영역 ============================ -->

    <!-- 세션추가 -->
    <modal v-if="modal.addSession" @close="modal.addSession = false" w="w-50">
        <h3 slot="header">
            <i class="calendar alternate outline icon"></i> 차시 등록
        </h3>
        <div slot="body" class="content">


            <div class="ui form">
                <div class="three fields">
                    <div class="field">
                        <label>시작일</label>
                        <input placeholder="First Name" type="date" v-model="temp.session.ls_startDate">
                    </div>
                    <div class="field">
                        <label>종료일</label>
                        <input placeholder="Last Name" type="date" v-model="temp.session.ls_endDate">
                    </div>
                </div>


                <div class="field">
                    <label>회차제목</label>
                    <input placeholder="" type="text" v-model="temp.session.ls_title">
                </div>

                <div class="field">
                    <label>강의장소</label>
                    <input placeholder="" type="text" v-model="temp.session.ls_location">
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
                        <input placeholder="First Name" type="date" v-model="temp.timetable.lt_startTime='2018-01-23'">
                    </div>
                    <div class="field">
                        <label>종료시간</label>
                        <input placeholder="Last Name" type="date" v-model="temp.timetable.lt_endTime='2018-02-28'">
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


                <div class="field">
                    <label>주제</label>
                    <input placeholder="" type="text" v-model="temp.module.lm_title='대인관계능력 실습'">
                </div>

                <div class="two fields">
                    <div class="field">
                        <label>시작시간</label>
                        <!-- <input placeholder="First Name" type="date" v-model="temp.module.lm_startTime='2018-01-23'"> -->
                        <timepicker />
                    </div>
                    <div class="field">
                        <label>종료시간</label>
                        <input placeholder="Last Name" type="date" v-model="temp.module.lm_endTime='2018-02-28'">
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
import {
    Modal,
    Timepicker,
    Timeline ,
    Feed ,
    NoContents,
} from '../../components'
const page = 'NewTimetable';

export default {
    name: page,
    components : {
        'modal' : Modal,
        'time-picker' : Timepicker,
        'timeline' : Timeline,
        'feed'                : Feed,
        'no-contents'    : NoContents,
    },


    data(){
        return{
            modal: {                             // 모달객체
                addSession : false,
                addTimetable : false,
                addModule:false,
                editModule:false
            },
            thisTab : -1, // 현재 선택된 세션의 아이디
            thisTimetable: -1, //선택된 타임테이블
            timetableFlag: true,           // 시간표 활성화 플래그
            sessions : [],
            timetables : [],
            tempModule : {},
            temp : { // 인풋 모델
                session : {
                    ls_title : '대인관계능력 실습',
                    ls_location : '서울특별시 강남구 테헤란로4길 27 (역삼동) 금성빌딩 5층',
                    ls_startDate : '2018-01-23',
                    ls_endDate : '2018-02-23',
                    timetables: []
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
                    lm_startTime: '',
                    lm_endTime: ''
                }
            }
        }
    }, //data




    methods : {

        // 회차정보 추가
        addSessionFunc(){
            this.sessions.push(this.temp.session) // 모델로 푸시
            this.$set(this.modal , 'addSession', false) // 모달 OFF
            // this.$set(this , 'thisTab', -1)
            this.$set(this , 'thisTab', this.sessions.length-1)
            // 초기화
            this.$set(this.temp, 'session' , {
                ls_title : '대인관계능력 실습',
                ls_location : '서울특별시 강남구 테헤란로4길 27 (역삼동) 금성빌딩 5층',
                ls_startDate : '2018-01-23',
                ls_endDate : '2018-02-23',
                timetables: []
            })
        }, // addSessionFunc()



        // 상세시간표 추가
        addTimetableFunc(){
            // 현재 세션의 상세시간표 모델로 푸시
            this.sessions[this.thisTab].timetables.push(this.temp.timetable)
            // 모달 OFF
            this.$set(this.modal, 'addTimetable', false)
            // 초기화
            this.$set(this.temp, 'timetable', {
                lt_title : '',
                lt_startTime : '',
                lt_endTime : '',
                modules: []
            })
        }, //addTimetableFunc()



        // 모듈추가
        addModuleFunc(){
            // 현재 시간표의 모듈 모델로 푸시
            this.sessions[this.thisTab].timetables[this.thisTimetable].modules.push(this.temp.module)
            // console.log(this.temp.module)
            // 모달 OFF
            this.$set(this.modal, 'addModule', false)
            // 초기화
            this.$set(this, 'thisTimetable', -1)
            this.$set(this.temp, 'module', {
                lt_title : '',
                lt_startTime : '',
                lt_endTime : '',
                lm_type:'강의'
            })
        }, // addModule()





        // 세션 삭제
        removeSessionFunc(sid){
            if( !confirm('삭제한 차시는 복구가 불가능합니다. 삭제하시겠습니까?') )
                return

            this.$set(this, 'thisTab', this.thisTab-1)

            // this.sessions.splice(sid, 1)
            this.sessions.pop()
        }, // 세션 삭제


        // 시간표 삭제
        removeTimetable(tid){
            if( !confirm('삭제한 시간표는 복구가 불가능합니다. 삭제하시겠습니까?') )
                return

            this.sessions[this.thisTab].timetables.splice(tid, 1)
        }, // 시간표 삭제


        // 모듈 삭제
        removeModuleFunc(tid, mid){
            if( !confirm('삭제한 모듈은 복구가 불가능합니다. 삭제하시겠습니까?') )
                return

            this.sessions[this.thisTab].timetables[tid].modules.splice(mid, 1)
        }, // 시간표 삭제

    }, // methods
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

</style>
