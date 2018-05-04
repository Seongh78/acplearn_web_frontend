<template>
  <div >








    <div class="ui grid">
        <div class="eleven wide column">
            <!-- 타이틀 -->
            <h2 class="ui header" @click.prevent="modal.aadd=true">
                <div
                    class="ui right pointing  basic label"
                    style="margin-left:0;"
                    v-bind:class="(lecture.lec_flag==='진행중'?'green': (lecture.lec_flag=='승인대기')? 'grey' : 'red' )">
                    {{ lecture.lec_flag }}
                </div>
                {{ lecture.lec_title }}
            </h2>
        </div>
        <div class="five wide column" style="text-align:right;">
            <div class="ui basic buttons small">
              <div class="ui button basic green " v-if="lecture.lec_flag=='임시저장'">
                  <i class="icon check circle"></i>승인요청
              </div>
              <router-link tag="div" class="ui button" :to="{ path:'/new/summary', query:{flag:lec_idx} }">
                  <i class="icon edit"></i>수정
                  <!-- , query: {flag:'edit'} -->
              </router-link>
              <div class="ui button" @click.prevent="removeLecture">
                  <i class="icon minus circle"></i>삭제
              </div>
              <!-- <div class="ui button">Three</div> -->
            </div>
        </div>
    </div>



    <!-- 강의정보 -->
    <table class="ui celled table lectureInfo">
        <colgroup>
            <col width="10%;">
            <col width="45%;">

            <col width="10%;">
            <col width="35%;">
        </colgroup>
        <tbody>
            <tr>
                <td>강의기간</td>
                <td>{{ lecture.lec_startDate }} ~ {{ lecture.lec_endDate }}</td>
                <td>시간</td>
                <td>매일 13:00~17:00</td>
            </tr>
            <tr>
                <td>참여기업</td>
                <td>
                    <span v-for="(com,i) in companies">
                        <div class="ui basic button tiny" @click.prevent="modal.companyDetail = true, companyDetailFunc(com.com_code)">
                        {{ com.com_name }}
                        </div>
                    </span>
                </td>
                <td>인원</td>
                <td>{{ students.length }}명</td>
            </tr>
            <tr>
                <td>KPI</td>
                <!-- <td colspan="3" class="ui tag labels"> -->
                <td colspan="3">
                        <div class="ui basic button tiny" v-for="k  in  kpi" :title="k.lk_idx">{{ k.cc2_name }} ({{k.lk_idx}})</div>
                </td>
            </tr>
        </tbody>
    </table>







    <!-- ======================== 탭메뉴 ============================ -->
    <!-- <div class="ui top attached tabular  menu"> -->
    <!-- <div class="ui eight item attached tabular menu"> -->
    <div class="ui eight item attached   menu lectureMenu" style=" top:0;">
        <a class="item" v-bind:class="[tab==0?'active':'']" v-on:click.prevent="selectTab(0)">강의개요</a>
        <a class="item" v-bind:class="[tab==1?'active':'']" v-on:click.prevent="selectTab(1)">일정/시간표</a>
        <a class="item" v-bind:class="[tab==2?'active':'']" v-on:click.prevent="selectTab(2)">팀/수강생</a>
        <a class="item" v-bind:class="[tab==3?'active':'']" v-on:click.prevent="selectTab(3)">교육진행</a>
        <a class="item" v-bind:class="[tab==4?'active':'']" v-on:click.prevent="selectTab(4)">참여점수</a>
        <a class="item" v-bind:class="[tab==5?'active':'']" v-on:click.prevent="selectTab(5)">액션플랜</a>
        <a class="item" v-bind:class="[tab==6?'active':'']" v-on:click.prevent="selectTab(6)">리포트</a>
        <a class="item" v-bind:class="[tab==7?'active':'']" v-on:click.prevent="selectTab(7)">설문결과</a>
    </div>
    <!-- ======================== 탭메뉴 ============================ -->





    <!-- 컨텐츠 -->




    <!-- ======================== 강의개요 ============================ -->
    <div class="ui bottom attached tab segment viewLoadAnimation" v-bind:class="[tab==0?'active viewAnimate':'']" >


        <h3><i class="align left icon"></i> 강의목표</h3>
        <p style="white-space: pre-line">{{ lecture.lec_goal }}</p>
        <br>

        <h3><i class="align left icon"></i> 내용</h3>
        <p style="white-space: pre-line">{{ lecture.lec_content }}</p>
        <br>

        <h3><i class="align left icon"></i> 기대효과</h3>
        <p style="white-space: pre-line">{{ lecture.lec_effect }}</p>
        <br>

        <h3><i class="align left icon"></i> 강의대상</h3>
        <p>{{ lecture.lec_target | capitalize }} ppp</p>
        <br>
    </div>
    <!-- ======================== 강의개요 ============================ -->























    <!-- ======================== 일정/시간표 ============================ -->
    <div class="ui bottom attached tab segment viewLoadAnimation" v-bind:class="[tab==1?'active viewAnimate':'']" >
        <h3><i class="align left icon"></i> 강의정보</h3>
        <table class="ui table celled">
            <colgroup>
                <col width="13%">
                <col >
                <col width="13%">
            </colgroup>
            <tr>
                <th>회차정보</th>
                <td>총 {{ lecture.sessions.length }}회</td>
            </tr>
            <tr>
                <th class="borderTop">액션러닝 시작일</th>
                <td>총 {{ lecture.sessions.length }}회</td>
                <th class="borderTop">액션러닝 종료일</th>
                <td>총 {{ lecture.sessions.length }}회</td>
            </tr>
            <tr>
                <th class="borderTop">교육일자</th>
                <td colspan="3">
                    <p v-for="(sess, ii) in lecture.sessions">{{ii+1}}회({{sess.ls_idx}}) - {{sess.ls_startDate}} (강의장소: {{sess.ls_location}})</p>
                </td>
            </tr>
        </table>

        <br>



        <h3><i class="align left icon"></i> 상세일정</h3>

        <!-- ===== 회차 탭메뉴 ===== -->
        <div class="ui top secondary pointing menu">
            <a class="item" v-bind:class="[sessionTab < 0?'active':'']" @click.prevent="sessionTabChange(-1)">전체</a>
            <a
                class="item"
                v-for="(sess, jj) in lecture.sessions"
                v-bind:class="[sessionTab==jj?'active':'']"
                @click.prevent="sessionTabChange(jj)"
                :title="sess.ls_idx">
                {{ jj+1 }}회
            </a>
        </div>




        <!-- ===== 탭 - 전체 ===== -->
        <div class="ui bottom tab segment viewLoadAnimation" v-bind:class="[sessionTab < 0?'active':'']">
            <h3 class="ui header">전체일정</h3>
            <hr class="opacity3">
            <!-- <table>

            </table> -->
        </div>
        <!-- ===== 탭 - 전체 ===== -->





        <!-- ===== 회차 탭 - 목록 ===== -->
        <div
            class="ui bottom tab segment viewLoadAnimation"
            v-for="(sess, jj) in lecture.sessions"
            v-bind:class="[sessionTab==jj?'active':'']"
            style="">


            <!-- === 집합교육 - 레이아웃 === -->
            <div class="ui grid verticalTab">

                <!-- === 집합교육 - 타이틀 === -->
                <div class="sixteen wide column">
                    <h3 class="ui header" >
                        {{ jj+1 }}회차 - {{ sess.ls_title }}
                        <div class="sub header"  style="line-height:210%;">
                            <i class="icon calendar outline"></i>
                            <b>강의일정 :</b> {{ sess.ls_startDate }}
                                &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                            <i class="icon clock outline"></i>
                            <b>시간 :</b> {{ sess.startTime }} ~ {{ sess.endTime }} (00시간)
                        </div>
                    </h3>
                    <hr class="opacity4">
                </div>
                <!-- === 집합교육 - 타이틀 === -->


                <!-- === 집합교육 - 목록 탭 === -->
                <div class="three wide column" >
                    <h3><i class="align left icon"></i> 교육목록</h3>
                    <div class="ui secondary vertical menu" style="width:100%;">
                        <!-- 강의회차 탭-->
                        <a
                            class="item"
                            v-for="(sClass, scid) in sess.sessionClass"
                            v-bind:class="[classTab==scid?'active':'']"
                            @click.prevent="classTab=scid">
                            {{scid+1}}차 교육 - {{ sClass.lsc_date }}
                        </a>
                        <!-- 강의회차 탭-->
                    </div>
                </div>
                <!-- === 집합교육 - 목록 탭 === -->



                <!-- === 집합교육 - 상세보기 타임라인 === -->
                <div class="thirteen wide  column ">
                    <h3><i class="align left icon"></i> 시간표</h3>
                    <div
                        class="ui segment tab attached contentTab viewLoadAnimation"
                        v-for="(sClass, scid) in sess.sessionClass"
                        v-bind:class="[classTab==scid?'active':'']"
                        style="padding:0 !important; border:none; ">

                        <!-- 타임라인 -->
                        <timeline
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
                            <br>
                            <br>
                        </timeline>
                        <!-- 강의내용 -->
                    </div>
                </div>
                <!-- === 집합교육 - 상세보기 타임라인 === -->

            </div>
            <!-- === 집합교육 레이아웃 === -->




        </div>
        <!-- ===== 회차 탭 - 목록 ===== -->


    </div>
    <!-- ======================== 일정/시간표 ============================ -->






















    <!-- ======================== 팀/수강생 ============================ -->
    <div class="ui bottom attached tab segment viewLoadAnimation" v-bind:class="[tab==2?'active viewAnimate':'']" >
        <h3><i class="align left icon"></i> 출석률</h3>
        <div class="ui basic message container" style="text-align:center;" v-if="students.length < 1">
            <no-contents header-text="등록된 수강생이 없습니다." />
        </div>
        <div class="" v-else>
            <table class="ui celled table" >
            <colgroup>
                <col width="15%">
                <col width="65%">
                <col width="35%">
            </colgroup>
            <thead>
                <tr>
                    <th class="center aligned">차시/인원</th>
                    <th class="center aligned">출석률</th>
                    <th class="center aligned">전체평균</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(sess,sid)  in  lecture.sessions">
                    <td class="center aligned">1차 - 총 145명</td>
                    <td>
                        <div class="ui basic olive progress" style="margin:0;">
                            <div  class="bar" v-bind:style="{ width: attendancePercent(sid) + '%' }">
                                <div class="progress">{{ lecture.sessions[sid].apa=attendancePercent(sid) }}%</div>
                            </div>
                        </div>
                    </td>
                    <td
                        v-if="sid==0"
                        v-bind:rowspan="lecture.sessions.length"
                        style="text-align:center;">
                        <div class="ui small statistic">
                          <div class="label">평균 출석률</div>
                          <div class="value">  {{ attendancePercentAvg() }}%</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>

        <br>
        <br>

        <br>
        <br>



        <div class="ui grid">
            <!-- 팀목록 -->
            <div class="three wide column">
                <h3><i class="align left icon"></i> 팀</h3>
                <div class="ui secondary vertical menu " style="width:100%;">
                <!-- <div class="ui vertical pointing menu " style="width:95%;"> -->
                    <a class="item" v-bind:class="[groupTab==''?'active':'']" @click.prevent="chooseGroup('')">전체</a>
                    <a class="item" v-for="(group, gid)  in  groups" v-bind:class="[group.group_idx==groupTab?'active':'']" @click.prevent="chooseGroup(group.group_idx)">
                        {{ group.group_name }}
                    </a>
                    <a class="item" v-bind:class="[groupTab==null?'active':'']" @click.prevent="chooseGroup(null)">팀미지정</a>
                    <a class="tiny button ui blue active" style="width:100%;" @click.prevent="$EventBus.$emit('onModal', 'addGroup', true)" >
                        <i class="icon plus square"></i>팀생성</a>
                </div>
            </div>

            <!--수강생목록 -->
            <div class="thirteen wide column">
                <!-- <div class=""  v-if="groupTab==-1"> -->
                <div class=""  >
                    <h3>{{ groupTab=='' ? '전체' : '조별' }} 수강생</h3>
                    <table class="ui celled table">
                        <colgroup>
                            <col width="13%">
                            <col width="18%">
                            <col width="15%">
                            <col width="7%">
                            <col width="12%">
                            <col width="5%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th rowspan="2">팀</th>
                                <th rowspan="2">소속</th>
                                <th rowspan="2">부서</th>
                                <th rowspan="2" class="center aligned">직급</th>
                                <th rowspan="2" class="center aligned">이름</th>
                                <th rowspan="2" class="center aligned">성별</th>
                                <th class="center aligned" v-bind:colspan="lecture.sessions.length">강의출결 </th>
                            </tr>
                            <tr>
                                <th class="center aligned" style="border-left:1px solid #e1e1e1;" v-for="(c1, c2)  in  (lecture.sessions)">{{c2+1}}차시</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(std, stdId)  in  students" v-if="std.group_idx==groupTab || groupTab==''" :title="std.stu_idx">
                                <td> {{ std.group_idx }} </td>
                                <td>{{ std.com_name  }}</td>
                                <td>{{ std.stu_department }}</td>
                                <td class="center aligned">{{ std.stu_position }}</td>
                                <td class="center aligned">{{ std.stu_name }}</td>
                                <td class="center aligned">-</td>
                                <!-- 출석관리 -->
                                <td class="center aligned ui form" v-for="(atd, atdId)  in  attendanceParser(std.stu_attendance)">
                                    <div class="inline field">
                                        <div class="ui checkbox " @click.prevent="attendanceCheck(stdId, atdId)">
                                            <input type="checkbox" tabindex="0" class="hidden" :checked="atd">
                                            <label></label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>
        </div>



    </div>
    <!-- ======================== 팀/수강생 ============================ -->






















    <!-- ======================== 교육진행 ============================ -->
    <div class="ui bottom attached tab segment viewLoadAnimation" v-bind:class="[tab==3?'active viewAnimate':'']" >
        <h3>
            <i class="align left icon"></i> 교육진행
        </h3>

        <!-- 탭메뉴 -->
        <div class="ui top secondary pointing menu">
            <a class="item" v-bind:class="[sessionTab2 < 0?'active':'']" @click.prevent="sessionTabChange2(-1)">전체</a>
            <a class="item" v-for="(sess, jj) in lecture.sessions" v-bind:class="[sessionTab2==jj?'active':'']" @click.prevent="sessionTabChange2(jj)">{{ jj+1 }}회</a>
        </div>
        <br>



        <!-- 상세시간표 -->
        <div class="ui bottom attached  tab segment viewLoadAnimation" v-for="(sess, jj) in lecture.sessions" v-bind:class="[sessionTab2==jj?'active':'']" style="padding:13px 8px !important; border:none;">

            <!-- 세션헤더 -->
            <h3 class="ui header block">
                {{ jj+1 }}회차 - {{ sess.ls_title }}
                <div class="sub header" style="margin-top:8px;">
                    <i class="icon calendar outline"></i>
                    <b>강의일정 :</b> {{ sess.ls_startDate }}
                    &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                    <i class="icon clock outline"></i>
                    <b>시간 :</b> {{ sess.startTime }} ~ {{ sess.endTime }} (00시간)</div>
            </h3>

            <!-- 집합교육 탭메뉴 -->
            <div class="ui grid verticalTab" style="padding:10px 0;">


                <!-- === 집합교육 - 목록 탭 === -->
                <div class="three wide column" >
                    <h3><i class="align left icon"></i> 교육목록</h3>
                    <div class="ui secondary vertical menu" style="width:100%;">
                        <!-- 강의회차 탭-->
                        <a
                            class="item"
                            v-for="(sClass2, scid2) in sess.sessionClass"
                            v-bind:class="[classTab2==scid2?'active':'']"
                            @click.prevent="classTab2=scid2">
                            {{scid2+1}}차 교육 - {{ sClass2.lsc_date }}
                        </a>
                        <!-- 강의회차 탭-->
                    </div>
                </div>
                <!-- === 집합교육 - 목록 탭 === -->

                <div class="thirteen wide stretched column ">
                    <div
                        class="ui segment tab attached contentTab viewLoadAnimation"
                        style="padding:0 !important; border:none; "
                        v-for="(sClass2, scid2) in sess.sessionClass"
                        v-bind:class="[classTab2==scid2?'active':'']"
                        :key="scid2">
                        <!-- 강의내용 -->
                        <timeline class="container33" v-for="(timetable, tid)  in  sClass2.timetables" :key="timetable.lt_idx">
                            <table class="ui table celled structured">
                                <!-- 상세시간표가 있을 경우 -->
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
                                            <table class="ui selectable single line table " style="border:none; margin-bottom:0;">
                                                <colgroup>
                                                    <col width="10%">
                                                    <col width="15%">
                                                    <col>
                                                    <col width="9%">
                                                    <col width="9%">
                                                    <col width="7.5%">
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th class="center aligned" style="border-right:none; border-left:none;">유형</th>
                                                        <th class="center aligned" style="border-right:none; border-left:none;">시간</th>
                                                        <th style="border-right:none; border-left:none;">주제</th>
                                                        <th class="center aligned" style="border-right:none; border-left:none;">피드</th>
                                                        <th class="center aligned" style="border-right:none; border-left:none;">이미지</th>
                                                        <th class="center aligned" style="border-right:none; border-left:none;">-</th>
                                                    </tr>
                                                </thead>
                                                <tbody v-for="(module, mid)  in  timetable.modules">
                                                    <tr
                                                        class=""
                                                        @click="accordionOpen(module.lm_idx)">

                                                        <td class="center aligned " style="border-right:none; border-left:none;">
                                                            &nbsp;
                                                            <div class="ui label small middle aligned horizontal" style="margin-top:5px; padding:5px 8px;" v-bind:class="[ module.lm_type=='강의' ? 'blue' :  module.lm_type=='미션' ? 'green' : 'orange' ]">
                                                                {{ module.lm_type }}
                                                            </div>
                                                        </td>
                                                        <td class="center aligned " style="border-right:none; border-left:none;">
                                                            {{ module.lm_startTime }} ~ {{ module.lm_endTime }}
                                                        </td>
                                                        <td class="" style="border-right:none; border-left:none;">
                                                            {{ module.lm_title }}
                                                        </td>
                                                        <td class="center aligned " style="border-right:none; border-left:none;">
                                                            12건
                                                        </td>
                                                        <td class="center aligned " style="border-right:none; border-left:none;">
                                                            12건
                                                        </td>
                                                        <td class="center aligned " style="border-right:none; border-left:none;">
                                                            <a v-if="module.lm_idx!=accordion">열기 <i class="icon angle down"></i></a>
                                                            <a v-else>닫기 <i class="icon angle up"></i></a>
                                                        </td>
                                                    </tr>
                                                    <!-- 해당 모듈에 대한 피드들  -->
                                                    <tr v-bind:style="{'display':(module.lm_idx==accordion?'':'none')}">
                                                        <td colspan="6" style="padding:0 27px 20px 27px; border-top:none;">
                                                            <div class="ui divider" style="margin-top:0;"></div>

                                                            <!-- 로딩이미지 -->
                                                            <loading v-if="comments.length<1" />
                                                            <!-- 강의모듈이 토론/미션일경우 그룹별 정보조회 가능 -->
                                                            <div class="" v-if="comments.length>0 && module.lm_type !== '강의'">
                                                                <div id="context2">
                                                                    <div class="ui secondary menu">
                                                                        <a class="item" v-bind:class="[groupCommentTab==-1?'active':'']" @click.prevent="groupCommentTab = -1">전체</a>
                                                                        <a class="item" v-for="(group, gid)  in  groups" v-bind:class="[group.group_idx==groupCommentTab?'active':'']" @click.prevent="groupCommentTab = group.group_idx">
                                                                            {{ group.group_name }}
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- <comment class="viewLoadAnimationTop" v-bind:contents="comments" v-bind:group-filter="groupCommentTab"  /> -->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>

                                <!-- 상세시간표가 없을 경우 -->
                                <!-- <tbody v-else>
                                    <tr>
                                        <td class="center aligned" colspan="3">
                                            <no-contents />
                                        </td>
                                    </tr>
                                </tbody> -->
                            </table>
                            <br>
                            <br>
                        </timeline>
                        <!-- 강의내용 -->
                    </div>
                </div>

            </div>
            <!-- 집합교육 탭메뉴 -->




        </div>



    </div>
    <!-- ======================== 교육진행 ============================ -->


























    <!-- ======================== 참여점수 ============================ -->
    <div class="ui bottom attached tab segment viewLoadAnimation" v-bind:class="[tab==4?'active viewAnimate':'']" >
        <h3>참여점수</h3>
        <table class="ui celled padded table">
            <colgroup>
                <col width="20%">
                <col>
                <!-- <col> -->
                <col width="47%">
                <col width="8%">
            </colgroup>
            <thead>
                <tr>
                    <th class="single line center aligned">팀명</th>
                    <th class="single line center aligned">팀점수</th>
                    <!-- <th class="single line center aligned">전체합계</th> -->
                    <th>개별점수</th>
                    <th class="single line center aligned">개인합계</th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr  v-for="(group, gid)  in  groups" :key="gid" @click.prevent="$EventBus.$emit('groupScoreModal', group.group_idx)"> -->
                <tr  v-for="(group, gid)  in  groups" :key="gid" >
                    <td class="single line center aligned">
                        <h3 class="ui center aligned header grey">{{ group.group_name }}</h3>
                        <!-- {{ group }} -->
                    </td>
                    <td class="single line center aligned">
                        <h4 class="ui header grey">{{ group.group_score }}점</h4>
                        <div class="ui basic buttons mini icon ">
                            <div class="ui button" @click.prevent="plusScore('group', group.group_idx, 1)">1점</div>
                            <div class="ui button" @click.prevent="plusScore('group', group.group_idx, 2)">2점</div>
                            <div class="ui button" @click.prevent="plusScore('group', group.group_idx, 3)">3점</div>
                            <div class="ui button" @click.prevent="plusScore('group', group.group_idx, 4)">4점</div>
                            <div class="ui button" @click.prevent="plusScore('group', group.group_idx, 5)">5점</div>
                        </div>
                    </td>
                    <!-- <td class="center aligned">
                        <h4 class="ui header grey">{{gid+54}}점</h4>
                    </td> -->
                    <td>

                        <div class="ui middle aligned divided list">
                            <div class="item"  v-for="(std, stdId)  in  students" v-if="std.group_idx==group.group_idx ">
                                <div class="right floated content">
                                    <div class="ui basic buttons mini icon ">
                                        <div class="ui button" @click.prevent="plusScore('registration', std.stu_idx, 1)">1점</div>
                                        <div class="ui button" @click.prevent="plusScore('registration', std.stu_idx, 2)">2점</div>
                                        <div class="ui button" @click.prevent="plusScore('registration', std.stu_idx, 3)">3점</div>
                                        <div class="ui button" @click.prevent="plusScore('registration', std.stu_idx, 4)">4점</div>
                                        <div class="ui button" @click.prevent="plusScore('registration', std.stu_idx, 5)">5점</div>
                                    </div>
                                </div>
                                <i class="  middle aligned icon" style="color:#BDBDBD; margin-right:17px;">
                                    <b>{{ std.stu_score<10?'0':'' }}{{ std.stu_score }}</b>점
                                </i>
                                <div class="content">
                                    <div class="header">{{std.stu_name}}</div>
                                    {{std.stu_company}} {{std.stu_department}} - {{std.stu_position}}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="single line center aligned">
                        <h4 class="ui header grey"></h4>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="single line center aligned">
                        <h4 class="ui center aligned header grey">팀 미지정</h4>
                    </td>
                    <td>

                        <div class="ui middle aligned divided list">
                            <div class="item"  v-for="(std, stdId)  in  students" v-if="std.group_idx==undefined || std.group_idx==''">
                                <div class="right floated content">
                                    <div class="ui basic buttons mini icon ">
                                        <div class="ui button" @click.prevent="plusScore('registration', std.stu_idx, 1)">1점</div>
                                        <div class="ui button" @click.prevent="plusScore('registration', std.stu_idx, 2)">2점</div>
                                        <div class="ui button" @click.prevent="plusScore('registration', std.stu_idx, 3)">3점</div>
                                        <div class="ui button" @click.prevent="plusScore('registration', std.stu_idx, 4)">4점</div>
                                        <div class="ui button" @click.prevent="plusScore('registration', std.stu_idx, 5)">5점</div>
                                    </div>
                                </div>
                                <i class="  middle aligned icon" style="color:#BDBDBD; margin-right:17px;">
                                    <b>{{ std.stu_score<10?'0':'' }}{{ std.stu_score }}</b>점
                                </i>
                                </i>
                                <div class="content">
                                    <div class="header">{{std.stu_name}}</div>
                                    {{std.stu_department}} - {{std.stu_position}}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="center aligned">0</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th class="center aligned">평균</th>
                    <th class="center aligned">100</th>
                    <th class="center aligned">100</th>
                    <th class="center aligned">100</th>
                </tr>
            </tfoot>
        </table>
    </div>
    <!-- ======================== 참여점수 ============================ -->


























    <!-- ======================== #액션플랜 ============================ -->
    <div class="ui bottom attached tab segment viewLoadAnimation" v-bind:class="[tab==5?'active viewAnimate':'']" >

        <h3><i class="icon filter"></i> 분류</h3>

        <!-- 탭메뉴 -->
        <tab-menu @input="thisCategoryFunc" v-model="thisCategory" :menus="reportMenus" />
        <br>


        <!-- === 행동역량 셀렉트 === -->
        <div class="ui form">
            <div class="inline fields" style="font-size:1.1em;">
                <div class="field">
                    <h3>행동역량</h3>
                </div>
                <div class="two field">
                    <select class="ui fluid search dropdown" style="padding: 15px 25px; width:180px;" @change="kpiChange" v-model="actionplanKpi">
                        <option value="-1">&nbsp;전체&nbsp;&nbsp;&nbsp;</option>
                        <option v-for="(k, kid)  in  kpi" :value="k.lk_idx">&nbsp;{{k.cc2_name}}&nbsp;&nbsp;&nbsp;</option>
                    </select>
                </div>
            </div>
            <br>
        </div>
        <!-- === 행동역량 셀렉트 === -->


        <!-- === 강의차수 === -->
        <div class="">
            <table class="ui table fluid celled">
                <tr>
                    <th class="center aligned">강의차수</th>
                    <th class="center aligned" v-for="(sess, ii) in lecture.sessions" :key="ii">
                        <span class="center aligned ui form">
                            <div class="inline field">
                                <div class="ui checkbox ">
                                    <input type="checkbox" tabindex="0"  v-model="checkedSessions" :value="sess.ls_idx" :id="'cs-'+sess.ls_idx">
                                    <label :for="'cs-'+sess.ls_idx">{{ii+1}}차</label>
                                </div>
                            </div>
                        </span>
                    </th>
                </tr>
                <tr>
                    <th  class="center aligned borderTop">APL기간</th>
                    <td  class="center aligned" v-for="(sess, jj) in lecture.sessions" >
                        <label :for="'cs-'+sess.ls_idx">{{sess.ls_startDate}} ~ {{sess.ls_endDate}}</label>
                    </td>
                </tr>
            </table>

            <br>
            <br>
        </div>
        <!-- === 강의차수 === -->




        <!-- === 리포트 === -->
        <div class="ui  tab  active viewLoadAnimation" v-for="(menu, mid)  in  reportMenus" v-if="thisCategory===menu.id">
            {{ checkedSessions }}
            <!-- 리포트 컴포넌트 동적 바인딩 -->
            <component :is="menu.component" :from="menu.from" :kpi="actionplanKpi" :checked-sessions="checkedSessions"></component>
            <!-- 리포트 컴포넌트 동적 바인딩 -->

        </div>
        <!-- === 리포트 === -->


        <br>
        <br>



    </div>
    <!-- ======================== #액션플랜 ============================ -->



















    <!-- ======================== 리포트 ============================ -->
    <div class="ui bottom attached tab segment viewLoadAnimation" v-bind:class="[tab==6?'active viewAnimate':'']" >
        <br>
        <br>
        <div class="container" style="text-align:center;">
            <no-contents header-text="리포트 컨텐즈를 준비중입니다." icon="signal" />
        </div>
        <br>
        <br>
    </div>
    <!-- ======================== 리포트 ============================ -->


















    <!-- ======================== 설문조사 ============================ -->
    <div class="ui bottom attached tab segment viewLoadAnimation" v-bind:class="[tab==7?'active viewAnimate':'']" >
        <br>
        <br>
        <div class="container" style="text-align:center;">
            <no-contents header-text="설문조사 기간이 아닙니다." icon="edit" />
        </div>
        <br>
        <br>
    </div>
    <!-- ======================== 설문조사 ============================ -->
























<!-- ======================== Modal ============================ -->



<!-- 기업별 상세정보 모달 -->
<modal v-if="modal.companyDetail" @close="modal.companyDetail = false" w="w-40" h="">
    <h3 slot="header">기업정보</h3>
    <div slot="body" class="ui form">

        <table width="100%" class="ui table celled">
            <colgroup>
                <col width="17%">
            </colgroup>
            <tr>
                <th class="borderTop">기업명</th>
                <td>{{ company.com_name }}</td>
            </tr>
            <tr>
                <th class="borderTop">업종</th>
                <td>{{ company.com_category }}</td>
            </tr>
            <tr>
                <th class="borderTop">주소</th>
                <td>{{ company.com_location }}</td>
            </tr>
            <tr>
                <th class="borderTop">담당자</th>
                <td>{{ company.mg_name }}</td>
            </tr>
            <tr>
                <th class="borderTop">연락처</th>
                <td>{{ company.mg_phone }}</td>
            </tr>
        </table>

    </div>
    <div slot="footer">
        <div class="ui two bottom attached buttons">
            <div class="ui button" @click.prevent="modal.companyDetail=false">닫기</div>
        </div>
    </div>
</modal>














<!-- 플랜상세 모달 -->
<modal v-if="modal.actionPlan" @close="modal.actionPlan = false" w="w-50" h="h-70">
    <h3 slot="header">플랜정보</h3>
    <div slot="body" class="ui form">

        <table class="ui table celled" style="padding:0;">
            <colgroup>
                <col width="13%">
                <col width="38%">
                <col width="13%">
                <col width="35%">
            </colgroup>
            <tbody>
                <tr>
                    <th class="borderTop">플랜명</th>
                    <td colspan="3"><h4>{{ plan.lap_text }}</h4>  </td>
                </tr>
                <tr>
                    <th class="borderTop">KPI</th>
                    <td><div class="ui basic label">{{ plan.cc2_name }}</div></td>
                    <th class="borderTop">진행율</th>
                    <td>72%</td>
                </tr>
                <tr>
                    <th class="borderTop">평점</th>
                    <td>
                        <rating v-bind:score="Number(plan.lap_othersAverage)" />
                    </td>
                    <th class="borderTop">평가진행</th>
                    <td>3명 / 5명</td>
                </tr>
            </tbody>
        </table>

        <table style="width:100%; margin:0; " class="structured ui table celled">
            <colgroup><col width="15%"></colgroup>
            <thead>
                <tr>
                    <th class="center aligned borderTop">점수표</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding:0;">
                        <!-- <vue-highcharts :options="options" ref="lineCharts" style="box-shadow:none; margin:0; height:450px;"></vue-highcharts> -->
                        <vue-highcharts :options="chartData" ref="lineCharts" style="box-shadow:none; border:none; height:330px; padding-bottom:5px; margin:0;"></vue-highcharts>
                    </td>
                </tr>

                <tr>
                    <td class="center aligned" style="padding:0;">
                        <table style="width:100%; margin:0; border:none;" class="structured ui table celled">
                            <colgroup>
                                <col width="15%">
                                <col width="3%">
                                <col>
                                <col>
                                <col>
                                <col>
                                <col>
                                <col width="3%">
                            </colgroup>
                            <tr>
                                <th class="borderTop">자가평가</th>
                                <td class="center aligned planScoreBtn" rowspan="3">
                                    <i class="icon chevron left"></i>
                                </td>
                                <td class="center aligned">2</td>
                                <td class="center aligned">2</td>
                                <td class="center aligned">2</td>
                                <td class="center aligned">2</td>
                                <td class="center aligned">2</td>
                                <td class="center aligned planScoreBtn" rowspan="3">
                                    <i class="icon chevron right"></i>
                                </td>
                            </tr>
                            <tr>
                                <th class="borderTop">GAP</th>
                                <td class="center aligned">-</td>
                                <td class="center aligned">2</td>
                                <td class="center aligned">2</td>
                                <td class="center aligned">2</td>
                                <td class="center aligned">2</td>
                            </tr>
                            <tr>
                                <th class="borderTop">팀원평가</th>
                                <td class="center aligned">-</td>
                                <td class="center aligned">2</td>
                                <td class="center aligned">2</td>
                                <td class="center aligned">2</td>
                                <td class="center aligned">2</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <br>

        <h3 class="ui header">Comments</h3>
        <div class="ui grid">
            <div class="thirteen wide column" style="padding-right:0;">
                <textarea name="name" rows="3" cols="80" style="border-radius:0" placeholder="내용을 입력해 주세요"></textarea>
            </div>
            <div class="three wide column" style="padding-left:0;">
                <button type="button" class="ui blue button" style="width:100%; height:100%; border-radius:0;">등록</button>
            </div>
        </div>

        <div class="ui comments">
            <div class="comment">
                <a class="avatar">
                  <img src="https://semantic-ui.com/images/avatar/small/matt.jpg">
                </a>
                <div class="content">
                  <a class="author">Matt</a>
                  <div class="metadata">
                    <span class="date">Today at 5:42PM</span>
                  </div>
                  <div class="text">
                    How artistic!
                  </div>
                  <div class="actions">
                    <a class="reply">Reply</a>
                  </div>
                </div>
              </div>
        </div>

    </div>
    <div slot="footer">
        <div class="ui two bottom attached buttons">
            <div class="ui button" @click.prevent="modal.actionPlan=false">확인</div>
        </div>
    </div>
</modal>








<!-- 플랜추가 모달 -->
<modal v-if="modal.addActionPlan" @close="modal.addActionPlan = false" w="w-40" h="">
    <h3 slot="header">신규 플랜</h3>
    <div slot="body" class="ui form">


        <div class="ui comments">
            <div class="comment">
                <a class="avatar">
                  <img src="https://semantic-ui.com/images/avatar/small/matt.jpg">
                </a>
                <div class="content">
                  <a class="author">Matt</a>
                  <div class="metadata">
                    <span class="date">Today at 5:42PM</span>
                  </div>
                  <div class="text">
                    How artistic!
                  </div>
                  <div class="actions">
                    <a class="reply">Reply</a>
                  </div>
                </div>
              </div>
        </div>

    </div>
    <div slot="footer">
        <div class="ui two bottom attached buttons">
            <div class="ui button" @click.prevent="modal.addActionPlan=false">확인</div>
        </div>
    </div>
</modal>











<!-- 강의 활동내역 모달 -->
<modal v-if="modal.lectureComments" @close="modal.lectureComments = false" w="w-40" h="">
    <h3 slot="header">활동내역</h3>
    <div slot="body" class="ui form">

        <div class="ui comments">
            <div class="comment">
                <a class="avatar">
                  <img src="https://semantic-ui.com/images/avatar/small/matt.jpg">
                </a>
                <div class="content">
                  <a class="author">Matt</a>
                  <div class="metadata">
                    <span class="date">Today at 5:42PM</span>
                  </div>
                  <div class="text">
                    How artistic!
                  </div>
                  <div class="actions">
                    <a class="reply">Reply</a>
                  </div>
                </div>
              </div>
        </div>

    </div>
    <div slot="footer">
        <div class="ui two bottom attached buttons">
            <div class="ui button" @click.prevent="modal.lectureComments=false">확인</div>
        </div>
    </div>
</modal>








<!-- 액션플랜 개별 통계 -->
<modal v-if="modal.personalGraph" @close="modal.personalGraph = false" w="w-50" h="h-70">
    <h3 slot="header">개별 리포트</h3>
    <div slot="body" class="ui form">


        <table class="ui table celled" style="padding:0;">
            <colgroup>
                <col width="9%">
                <col width="25%">
                <col width="9%">
                <col width="25%">
            </colgroup>
            <thead>
                <tr>
                    <th class="center aligned" colspan="5">수강생 정보</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th class="borderTop center aligned">이름</th>
                    <td>{{ personalProfile.stu_name }} </td>
                    <th class="borderTop center aligned">소속</th>
                    <td>{{ personalProfile.com_name }}</td>
                    <td rowspan="5">
                        <!-- KPI차트 -->
                        <polar-chart :data="personalProfile.kpiAvg" />
                    </td>
                </tr>
                <tr>
                    <th class="borderTop center aligned">부서</th>
                    <td>{{ personalProfile.stu_department }}</td>
                    <th class="borderTop center aligned">직급</th>
                    <td>{{ personalProfile.stu_position }}</td>
                </tr>
                <tr>
                    <th class="borderTop center aligned">성별</th>
                    <td >{{ personalProfile.stu_gender }} </td>
                    <th class="borderTop center aligned">입사년도</th>
                    <td >{{ personalProfile.stu_joinYear }} </td>
                </tr>
                <tr>
                    <th class="borderTop center aligned">플랜</th>
                    <td>{{ personalScore.length }}개 진행중</td>
                    <th class="borderTop center aligned">점수</th>
                    <td>{{ personalProfile.stu_score }}점</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th class="center aligned" colspan="5"></th>
                </tr>
            </tfoot>
        </table>
        <br>



        <div class="ui horizontal divider"> <h4>플랜별 통계</h4> </div>
        <br>

        <div class="" style="width:100%;  ">
            <div>
                <h3 class="ui block attached header" style="border-top:1px solid #d7d7d7;">전체</h3>

                <div class="ui attached segment" style="width:100%; padding:0; overflow-x: scroll; position:relative;">
                    <slide-graph :chart="personalScore.allAvg" style="position:relative;" />
                </div>

                <br>
                <br>
                <br>
            </div>
        </div>

        <!-- <h3 class="ui header">플랜 정보</h3> -->
        <div class="" style="width:100%;  ">
            <div v-for="(sc, scId)  in  personalScore.score" :key="scId">
                <h3 class="ui block attached header" style="border-top:1px solid #d7d7d7;">
                    {{ sc.lap_text }}
                    <div class="ui basic label small">KPI: {{ sc.cc2_name }}</div>
                </h3>

                <div class="ui attached segment" style="width:100%; padding:0; overflow-x: scroll; position:relative;">
                    <slide-graph :chart="sc.score" style="position:relative;" />
                </div>

                <br>
                <br>
                <br>
            </div>
        </div>





        <div class="ui horizontal divider"> <h4>피드</h4> </div>
        <!-- <hr class="opacity3"> -->
        <div style="text-align:center;" v-if="personalScore.comments.length<1">
            <no-contents header-text="등록된 피드가 없습니다." />
        </div>


        <div class="ui feed" v-else>
            <div class="event" v-for="(comment, cid)  in  personalScore.comments">
                <div class="label">
                    <img src="https://cdn2.iconfinder.com/data/icons/scenarium-vol-4/128/006_avatar_worker_employee_man_account_manager_clerk-128.png" v-if="comment.stu_gender=='남'">
                    <img src="https://cdn2.iconfinder.com/data/icons/scenarium-vol-4/128/019_avatar_woman_girl_female_account_profile_user-128.png" v-if="comment.stu_gender=='여'">
                    <img src="https://semantic-ui.com/images/avatar/small/elliot.jpg" v-if="comment.stu_gender=='-' ||  comment.stu_gender==null">
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



        <!-- 댓글 입력 -->
        <form class="ui reply form ">
            <div class="inline fields">
                <div class="fourteen wide field">
                    <textarea placeholder="개발테스트기능 - 댓글을 입력해 주세요" rows="3"></textarea>
                </div>
                <div class="two wide field" style="padding:0; height:100%;">
                    <button type="button" class="ui button green" style="width:100%; height:75px;">등록</button>
                </div>
            </div>



            <div class="ui basic labeled small submit icon button">
                <i class="icon camera"></i> 사진
            </div>

        </form>



    </div>
    <div slot="footer">
        <div class="ui two bottom attached buttons">
            <div class="ui button" @click.prevent="modal.personalGraph=false">확인</div>
        </div>
    </div>
</modal>










<!-- 차트별 액션플랜목록 -->
<modal v-if="modal.planList" @close="modal.planList = false" w="w-60" h="h-70">
    <h3 slot="header">액션플랜</h3>
    <div slot="body" class="ui form">

        <table class="ui table celled">
            <colgroup>
                <col width="10%">
            </colgroup>
            <tr>
                <th>차수선택</th>
                <td class="center aligned" v-for="(planSession, psid)  in  lecture.sessions">
                    <div class="ui test checkbox">
                      <input type="checkbox" :id="'cps-'+planSession.ls_idx"  v-model="checkedPlanSessions" v-bind:value="planSession.ls_idx" >
                      <label :for="'cps-'+planSession.ls_idx">{{ psid+1 }}차수</label>
                    </div>
                </td>
            </tr>
        </table>


        <table class="ui single line table selectable celled cursorPointer cardbox" style="padding:0;">
            <colgroup>
                <col width="12%">
                <col width="50%">
                <col width="15%">
                <!-- <col width="6%">
                <col width="6%">
                <col width="6%">
                <col width="6%"> -->
            </colgroup>
            <thead>
                <tr>
                    <th class="center aligned">이름</th>
                    <th>플랜</th>
                    <th class="center aligned">KPI</th>
                    <th class="center aligned">사전평가</th>
                    <th class="center aligned" style="background:#9FC93C; color:#fff;">자가평가</th>
                    <th class="center aligned" style="background:#3DB7CC; color:#fff;">팀원평가</th>
                    <th class="center aligned">GAP</th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr v-for="(plan, pid)  in  plans" :key="plan.lap_idx"> -->
                <tr v-for="(plan, pid)  in  filteredPlans" :key="plan.lap_idx">
                    <td class="center aligned">{{ plan.stu_name }}</td>
                    <td>{{ plan.lap_text }}</td>
                    <td class="center aligned">{{ plan.cc2_name }}</td>
                    <td class="center aligned">{{ plan.beforeScore==undefined ? 0 : plan.beforeScore.toFixed(1) }}</td>
                    <td class="center aligned" style="background:#9FC93C; color:#fff;">{{ plan.selfScore==undefined ? 0 : plan.selfScore.toFixed(1) }}</td>
                    <td class="center aligned" style="background:#3DB7CC; color:#fff;">{{ plan.othersScore==undefined ? 0 : plan.othersScore.toFixed(1) }}</td>
                    <td class="center aligned">{{ (plan.othersScore - plan.selfScore).toFixed(1) }}</td>
                </tr>
            </tbody>
        </table>
        <br>






    </div>
    <div slot="footer">
        <div class="ui two bottom attached buttons">
            <div class="ui button" @click.prevent="modal.planList=false">확인</div>
        </div>
    </div>
</modal>

<!-- ======================== Modal ============================ -->




  </div>
</template>





<script>
// 공통 컴포넌트
import {
    Modal,
    SearchForm,
    CardTitle,
    Timeline ,
    Feed ,
    NoContents,
    Rating,
    Comment,
    Loading,
    TabMenu,
    SlideGraph,
    PolarChart,
} from '../../components'

// 리포트 뷰
import {
    ReportAll,
    ReportGroup,
    ReportDepartment,
    ReportPosition,
    ReportGender,
    ReportAge,
    ReportJoinYear,
    ReportPersonal,
} from './Report'


import LectureModule from './LectureModule'



// Highcharts - 그래프
// import VueHighcharts from 'vue2-highcharts'

export default {
    name: 'LectureDetail',


    // ===== Components ===== //
    components : {
        Modal,
        SearchForm,
        Timeline,
        Feed,
        NoContents,
        Rating,
        Comment,
        LectureModule,
        Loading,



        TabMenu,

        ReportAll,
        ReportGroup,
        ReportDepartment,
        ReportPosition,
        ReportGender,
        ReportAge,
        ReportJoinYear,
        ReportPersonal,

        SlideGraph,
        PolarChart,
    },



    // ===== Data ===== //
    data () {
        return {
            modal: {
                aadd:false, // 테스트모달
                companyDetail : false,
                actionPlan : false, //액션플랜 상세보기
                addActionPlan : false, //액션플랜 추가 상세보기
                lectureComments : false, //강의활동내역 상세보기
                personalGraph : false, // 액션플랜 개별 통계
                planList : false, // 차트별 플랜목록
            },
            // msg: '감성안전을 위한 우리조직 안전리더십 개발 - TEST',


            // === 강의기본정보 === //
            lec_idx:null,
            lecture:{},
            company: {}, // 선택된 기업정보
            companies: [], // 강의에 참여하는 기업들
            departments: [],
            position: [],
            groups:[],
            students: [],
            tempStudents:[] ,  // 렌더링 전용 학생목록
            kpi:[],
            // === 강의기본정보 === //


            sessionTab:-1,
            sessionTab2:-1, // 교육진행 내 차시 탭
            groupTab:'' , // 선택한 그룹아이디
            chooseTeam:{}, // 선택한 그룹 정보
            companyTab:0,
            tab:5, // 현재 활성화 탭
            attendanceCount : 0, // 출석 카운트
            avgAttendancePercent : 0, // 평균출석률



            // === 일정/시간표 === //
            classTab:0, // 집합교육 탭
            // === 일정/시간표 === //





            // === 교육진행 === //
            accordion : -1 , // 펼쳐보기 탭
            comments : [], // 선택된 모듈의 내용들
            groupCommentTab : -1,
            classTab2 : 0, // 집합교육 탭
            // === 교육진행 === //




            // === 액션플랜 === //
            selectedStudent : -1, // 선택된 수강생
            plans : [], // 선택된 수강생의 플랜들
            plan : {}, // 선택된 수강생의 상세플랜
            thisCategory : 'all',
            reportMenus : [ // 리포트용 메뉴 - 탭관리
                { id: 'all', name: '전체' , component: 'ReportAll' },
                { id: 'group', name: '조별' , component: 'ReportGroup', },
                { id: 'department', name: '부서별' , component: 'ReportDepartment', },
                { id: 'position', name: '직급별' , component: 'ReportPosition' },
                { id: 'gender', name: '성별' , component: 'ReportGender' },
                { id: 'age', name: '연령별-개발' , component: 'ReportAge' },
                { id: 'joinYear', name: '입사연차별-개발' , component: 'ReportJoinYear' },
                { id: 'personal', name: '개인별' , component: 'ReportPersonal' },
            ],
            personalScore : {
                all : [],
                score : []
            }, // 개별점수  - 모달에 표시
            personalProfile : [], // 개별점수  - 모달에 표시
            actionplanKpi : -1,
            checkedSessions : [], // 선택된 차시
            checkedPlanSessions : [], // 선택된 차시 - 차시별액션플랜 모달에 있음
          // === 액션플랜 === //

        }
    },// data







    // ===== Fillters ===== //
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },




    // ===== Computed ===== //
    computed:{
        filteredPlans(){
            if (!this.checkedPlanSessions.length){
               return []
            }
            return this.plans.filter(p => this.checkedPlanSessions.includes(p.ls_idx))
        }
    },






    // ===== Created ===== //
    created(){
        var id = this.$ro.history.current.params.id

        // this.$set(this, 'lec_idx', id)
        this.$set(this, 'lec_idx', id)  //  테스트 컨텐츠

        this.getLecture(id) // 강의정보
        this.getComments('feedback', id) // 활동내역


        // $On
        this.$EventBus.$on('addTeam', this.addTeam)

        // Modal ON
        this.$EventBus.$on('modal', (data) => {
            switch (data.name) {
                case 'personalGraph': // 개별통계
                    // 수강생아이디 찾기
                    var sid = this.students.findIndex((std)=>{
                        return std.stu_idx == data.stu_idx
                    })
                    // 모달 데이터
                    this.students[sid].kpiAvg = data.kpiAvg // 방사형 데이터
                    this.$set(this, 'personalProfile', this.students[sid]) // 유저정보
                    this.$set(this.personalScore, 'allAvg', data.allAvg) // 전체평균 점수표
                    this.$set(this.personalScore, 'score', data.score) // 점수표
                    this.$set(this.personalScore, 'comments', data.comments) // 피드데이터
                    // this.modal.personalGraph = true
                break;

                case 'planList': // 플랜리스트
                    this.plans =  data.plans
                    // 초기 전체선택을 위한 데이터
                    this.lecture.sessions.forEach((sess)=>{
                        this.checkedPlanSessions.push(sess.ls_idx)
                    })
                break;
            }// switch

            this.$set(this.modal, data.name, true) // 모달 ON
        }) // 통계 상세리포트 모달

    },






    // ===== Mounted ===== //
    mounted(){
        // this.getActionPlanFunc() // 액션플랜목록


    },








    // ===== Methods ===== //
    methods: {

        // === 그룹선택 === //
        chooseGroup(id){
            if(id != -1){
                var sid = this.groups.findIndex((g)=>{
                    return g.group_idx==id
                })
                this.$set(this, 'tempStudents', this.groups[sid])
            }// if
            this.$set(this, 'groupTab', id)

        },



        // === 탭메뉴선택 === //
        selectTab(s) {
            this.tab=s;
        },



        // === 세션 선택/변경 === //
        sessionTabChange(jj){
            this.$set(this, 'sessionTab', jj)
            this.$set(this, 'classTab', 0)
        },






        // === 교육진행 세션 선택/변경 === //
        sessionTabChange2(jj){
            this.$set(this, 'sessionTab2', jj)
        },





        // === 기업정보 상세 === //
        companyDetailFunc(com_code){
            var fid = this.companies.findIndex(com=>{
                return com.com_code === com_code
            })
            this.$set(this, 'company', this.companies[fid])
        },






        // === 강의정보 조회 === //
        getLecture(id){
            // alert(typeof id)
            // return
            this.$http.get('/api/lectures/detail/'+Number(id))
            .then(resp=>{
                // console.log(resp.data.departments);
                this.$set(this, 'lecture', resp.data.lecture)
                this.$set(this, 'companies', resp.data.companies)
                this.$set(this, 'departments', resp.data.departments)
                this.$set(this, 'position', resp.data.position)
                this.$set(this, 'groups', resp.data.groups)
                this.$set(this, 'students', resp.data.students)
                this.$set(this, 'kpi', resp.data.kpi)

                // 액션플랜 - 디폴트설정 - 모든차시선택
                resp.data.lecture.sessions.forEach((sess)=>{
                    this.checkedSessions.push(sess.ls_idx)
                })
            }).catch(err=>{
                console.log(err);
                alert('Error')
            })
        }, // getLecture















        // ========== 출석 ========== //

        // 출석데이터 파서
        attendanceParser(atd){
            /*
            atd : 출석원본데이터 - ex) 0,0,1,0
            */
            var parseAtd = JSON.parse('['+atd+']')
            return parseAtd
        },

        // 차시별 출석률 퍼센테이지 구하기
        attendancePercent(sid){
            var stds = this.students
            var all = stds.length

            var temp
            var sum=0
            for(var ii  in  stds){
                temp = JSON.parse('['+stds[ii].stu_attendance+']')
                sum+=temp[sid] ? 1 : 0
            }
            var ff = (sum/all) * 100

            // 결과가 0일경우 소수점 X
            if (ff==0 || ff==100.0) {
                return ff.toFixed(0)
            }else{
                return ff.toFixed(1)
            }//else

            this.attendancePercentAvg()
        }, // attendancePercent




        // 평균 출석률
        attendancePercentAvg(){
            var sum=0,avg=0; // 합, 평균
            var leng = this.lecture.sessions.length // 차시 수
            var keys = Object.keys(this.lecture.sessions) // 키

            for(var i=0;  i<keys.length; i++){
                sum += Number(this.lecture.sessions[i].apa)
            }

            avg = sum/leng
            if (avg==0 || avg==100.0) {
                return avg.toFixed(0)
            }else{
                return avg.toFixed(1)
            }//else
        }, // attendancePercentAvg



        // 출석체크
        attendanceCheck(stdId, atdId){
            /*
            stdId : 학생 아이디
            atdId : 체크한 출석배열 번지수 - 차시와 같음
            */

            var attd = JSON.parse('['+this.students[stdId].stu_attendance+']') // 출석 형변환
            attd[atdId] = attd[atdId]==1 ? 0 : 1
            attd = JSON.stringify(attd)
            attd = attd.substring(attd.length-1, 1) // 디비포맷


            // 서버로
            this.$http.put('/api/students/attendance', {
                lec_idx : this.lec_idx,
                stu_idx : this.students[stdId].stu_idx,
                attendance : attd
            })
            .then(resp=>{
                this.$set(this.students[stdId], 'stu_attendance', attd)
            })
            .catch(err=>{
                console.log("통신에러");
                console.log(err);
                alert("Error - ")
            })

        }, // 출석체크

        // ========== 출석 ========== //
















        // 팀 추가
        addTeam(){
            alert(1)
        }, // addTeam()




        // 강의삭제
        removeLecture(){
            if ( !confirm('삭제된 강의는 복구가 불가능합니다. 삭제하시겠습니까?') )
                return


            this.$http.delete('/api/lectures/'+this.lec_idx)
            .then(resp=>{
                alert('강의가 삭제되었습니다. 확인을 누르면 진행강의현황 페이지로 이동합니다.')
                this.$ro.push({ path:'/lectures' })
            })
            .catch(err=>{
                alert('Error - r')
            })
        },// removeLecture()








        // ========== 교육진행 / 코멘트 / 활동내용 ========== //


        // === 활동내용 리스트 === //
        getComments( table , lec_idx ){
            /*
            table       : 찾을 테이블 [ 'feedback' , 'action_check' ]
            lec_idx    : 강의 아이디
            */
            var url = '/api/comments/'+table+'/'+lec_idx
            this.$http.get(url)
            .then (resp =>{
                // console.log(resp.data.comments);
                this.$set(this, 'comments', resp.data.comments)
            })
            .catch (err => {

            })
        },


        // === 아코디언 탭 === //
        accordionOpen(lm_idx){
            this.$set(this, 'comments', [])
            var val = lm_idx==this.accordion?-1:lm_idx
            this.$set(this, 'accordion', val) // 모듈 아이디
            this.getComments('modules', lm_idx)
        }, // accordionOpen()



        // ========== 교육진행 / 코멘트 / 활동내용 ========== //







        // ========== 액션플랜 ========== //

        // 점수추가
        plusScore(table, id, score){
            /*
            table   :   유형 ( ex- group, student )
            id        :   바꿀데이터 아이디
            score  :   점수
            */
            if ( !confirm(score+'점을 추가하시겠습니까?') ) {
                return
            }

            var url = '/api/students/score'
            this.$http.put(url, { table, id, score })
            .then(resp => {

                switch (table) {
                    case 'group':
                        // 점수표시 변경
                        var rid = this.groups.findIndex(group=>{
                            return group.group_idx == id
                        })
                        //점수누적
                        this.$set(this.groups[rid], 'group_score', this.groups[rid].group_score+score)
                        break;

                    case 'registration':
                        // 점수표시 변경
                        var rid = this.students.findIndex(std=>{
                            return std.stu_idx == id
                        })
                        //점수누적
                        this.$set(this.students[rid], 'stu_score', this.students[rid].stu_score+score)
                        break;
                }// switch

            })
            .catch(err => {
                console.log(err);
                alert('error')
            })
        },// 점수추가



        // 액션플랜 목록 조회
        getActionPlanFunc(){
            var url = '/api/plans/'+this.lec_idx
            // alert(url)
            // return
            this.$http.get("/api/plans/18")
            .then(resp=>{
                console.log(resp.data.plans);
                // this.$set(this, 'plans', resp.data.plans)
                this.plans = resp.data.plans
            })
            .catch(err=>{
                alert('error')
                console.log(err);
            })
        },


        // 액션플랜 상세
        selectPlan( id ) {
            this.$http.get('/api/plans/detail/'+id)
            .then(resp=>{
                // console.log(resp.data);
                this.$set(this, 'plan', resp.data.plan)
                this.$set(this.modal, 'actionPlan', true)
                this.$set(this, 'chartData', this.options)
            })
            .catch(err=>{
                console.log(err);
                alert('Error - ')
            })
        },// 액션플랜 상세



        // 탭메뉴 선택시  리포트에 들어갈 데이터 바인딩
        thisCategoryFunc(){
            // 해당 리포트메뉴의 아이디 찾기
            var category = this.thisCategory
            var idx = this.reportMenus.findIndex((m)=>{
                return m.id === category
            })

            // 리포트로 바인딩시킬 데이터 맵핑
            var temp={}
            switch (category) {
                case 'group':
                    temp= {
                        groups: this.groups,
                        students: this.students,
                    }
                    break;
                case 'department':
                    temp= {
                        departments: this.departments,
                        students: this.students,
                    }
                    break;
                case 'position':
                    temp= {
                        position: this.position,
                        students: this.students,
                    }
                    break;
                case 'personal':
                    temp= {
                        sessions: this.lecture.sessions,
                        students: this.students,
                    }
                    break;
                case 'gender':
                    temp= {
                        gender: [
                            {text:'남', socre:[], kpi:[]},
                            {text:'여', socre:[], kpi:[]},
                        ],
                        students: this.students,
                    }
                    break;
                default:

            }
            this.$set(this.reportMenus[idx], 'from', temp)
        },



        kpiChange(){
            alert(this.actionplanKpi)
        },



        // ========== 액션플랜 ========== //






    }// methods
}
</script>




<style scoped>
    h1, h2 {
      font-weight: normal;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      display: inline-block;
      margin: 0 10px;
    }
    a {
      color: #42b983;
    }

    .segment{
        padding:20px;
    }


    .lectureInfo a:hover{color:#c1c1c1;}
    .lectureInfo a{color:#333; text-decoration: underline; cursor: pointer;}


    th{
        background: #F9FAFB;
        padding:0.92857143em 0.78571429em;
    }
    /*.borderBottom{
        border-bottom: 1px solid rgba(34, 36, 38, 0.1);
    }
    .borderTop{
        border-top: 1px solid rgba(34, 36, 38, 0.1);
    }*/


    .singleLineTd{
        border-right:none !important;
        border-left:none !important;
    }


    .tempRow{ cursor: pointer; }
    .tempRow:hover{ background: #f9f9f9 !important; }



        .lectureMenu .active{
            color: #fff !important;
            background: #3b485f !important;
            border-radius: 0 !important;
        }

        .tab.segment{
            padding:30px 25px !important;
        }



        .list > .item {
            margin:3px;
            padding-top: 10px;
            padding-bottom: 5px;
        }



        h3 .icon {
            color:rgba(0, 0, 0, 0.45) !important;
            font-size: 0.95em !important;
        }



        .moduleLabel{
            padding:0 !important;
            width:57px !important;
        }
        .moduleContent{
            padding:0 !important;
            width:calc(90% - 60px) !important;
        }


        .fixButton{
            position: absolute;
            top: 0;
            right:0;
            z-index: 99;
        }


        .actionPlan td{
            padding:20px 18px;
            cursor: pointer;
        }


        .actionPlanUserList .item{
            cursor: pointer;
        }
        .actionPlanUserList .item:hover{
            background: #f1f1f1;
        }


        /* ======== 액션플랜 ======== */
        .planScoreBtn{
            cursor: pointer;
            color:#333;
        }
        .planScoreBtn:hover{
            background: #f1f1f1;
        }
        /* ======== 액션플랜 ======== */




</style>
