<template>
    <div class="">

        <h1>APL강의 상세</h1>



        <div class="thirteen wide column centered rightContents " >


            <!-- <div class="cardbox" style="margin:0; padding: 25px 20px;"> -->
            <div class="cardbox" style="margin:0; padding: 0; border:1px solid #eaeaea;">
                <table class="ui celled table lectureInfo " style="padding:0; border-radius:0; border:none;">
                    <colgroup>
                        <col width="10%;">
                        <col width="45%;">

                        <col width="10%;">
                        <col width="35%;">
                    </colgroup>
                    <tbody>
                        <tr>
                            <td class="tdTitle">강의기간</td>
                            <td>{{ recruitment.rec_date }}</td>
                            <td class="tdTitle">시간</td>
                            <td>{{ recruitment.rec_time }}</td>
                        </tr>
                        <tr>
                            <td class="tdTitle">장소</td>
                            <td>부산광역시 남구 수영대로 99-1 부산본사</td>
                            <td class="tdTitle">강의시간</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td class="tdTitle">가격</td>
                            <td>{{ recruitment.rec_price }}</td>
                            <td class="tdTitle">인원</td>
                            <td>{{ recruitment.rec_count }}명</td>
                        </tr>
                        <tr>
                            <td class="tdTitle">강의대상</td>
                            <td colspan="3">{{ recruitment.rec_spec }}</td>
                        </tr>
                        <tr>
                            <td class="tdTitle">강의내용</td>
                            <td colspan="3">
                                <br>
                                <p>{{ recruitment.rec_content }}</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <br>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>



            <br>




            <!-- 신청자 -->
            <h3>신청현황</h3>
            <!-- <div class="cardbox " style="margin:0; padding: 0px;"> -->
                <!-- <h3 class="ui dividing header">신청자관리</h3> -->
                <table class="ui single line table selectable cardbox" style="padding:0; border-radius:0;">
                    <colgroup>
                        <col width="5%">
                    </colgroup>

                    <thead>
                        <tr>
                            <th >ID</th>
                            <th >소속</th>
                            <th style="text-align:center;">이름</th>
                            <th style="text-align:center;">연락처</th>
                            <th style="text-align:center;">강의분야</th>
                            <th style="text-align:center;">프로필 완성도</th>
                            <th class="center aligned">상태</th>
                        </tr>
                    </thead>
                    <tbody v-if="students.length>0">
                        <tr v-for="(std, sid)  in  students" :key="std.tutor_idx" @click.prevent="selectStudent(std.tutor_idx)">
                            <td >{{ std.tutor_idx }}</td>
                            <td >{{ std.tutor_company }}</td>
                            <td style="text-align:center;">{{ std.tutor_name }}</td>
                            <td style="text-align:center;">{{ std.tutor_phone }}</td>
                            <td style="text-align:center;">-</td>
                            <td style="text-align:center;">75%</td>
                            <td class="center aligned">{{ std.app_status }}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="7">수강생이 없습니다</td>
                        </tr>
                    </tbody>
                </table>
            <!-- </div> -->
            <br>






            <!-- 댓글관리 -->
            <h3>댓글관리</h3>
            <div class="cardbox " style="margin:0; padding: 25px 20px;">
                <!-- <h3 class="ui dividing header">댓글</h3> -->
                <div class="ui feed">
                    <div class="event">
                        <div class="label">
                            <img src="https://semantic-ui.com/images/avatar/small/elliot.jpg">
                        </div>
                        <div class="content">
                            <div class="summary">
                                <a class="user">Elliot Fu</a> added you as a friend
                                <div class="date">1 Hour Ago</div>
                            </div>
                            <div class="meta">
                                <a class="like"><i class="like icon"></i> 4 Likes</a>
                            </div>
                        </div>
                    </div>


                    <div class="event">
                        <div class="label">
                            <img src="https://semantic-ui.com/images/avatar/small/joe.jpg">
                        </div>
                        <div class="content">
                            <div class="summary">
                                <a>Joe Henderson</a> posted on his page
                                <div class="date">3 days ago</div>
                            </div>
                            <div class="extra ">
                                Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all over again. Even if we don't run extra laps that day, we surely will come back for more of the same another day soon.
                            </div>
                            <div class="meta">
                                <a class="like"><i class="like icon"></i> 5 Likes</a>
                            </div>
                        </div>
                    </div>
                </div>


        <form class="ui reply form">
            <div class="field">
                <textarea></textarea>
            </div>
            <div class="ui primary submit labeled icon button">
                <i class="icon edit"></i> Add Reply
            </div>
        </form>



        </div>



        </div>



<!-- ======================== Modal ============================ -->

<!-- 수강생 상세보기 모달 -->
<modal v-if="modal.student" @close="modal.student = false" w="w-40" h="">
    <h3 slot="header">수강생 정보</h3>
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
            <div class="ui button" @click.prevent="modal.student=false">확인</div>
        </div>
    </div>
</modal>

<!-- ======================== Modal ============================ -->


    </div>
</template>



<!-- Script -->
<script>
import { Navbar, Modal, Card, PageTitle, TopLayout, PageLayout } from '@/components/components'
const page = 'AplDetail';

export default {
    name: page,

    components: {
        'nav-bar' : Navbar,
        'modal'   : Modal,
        'card' : Card,
        'page-title' : PageTitle,
        'top-layout' : TopLayout,
        'page-layout' : PageLayout
    },

    data () {
        return {
            rec_idx : -1, // 강의아이디
            applicationFlag : false, // 수강신청여부

            modal: {
                student : false
            },

            recruitment : {}, // 강의정보
            students : [], // 수강생정보 - list
            student : {} , // 수강생 개별 정보
            msg : page,
            notices : [
                {title:'공지사항 테스트', date:'2018-01-22', writer: '관리자'},
            ]//
        }
    }, // data()






    created(){
        this.$set(this, 'rec_idx', this.$ro.history.current.params.id)
        this.getRec()
        this.$set(this, 'applicationFlag', this.applicationCheck())
    }, //created()







    methods: {

        getRec(){
            console.log("this.rec_idx : ", this.rec_idx);
            this.$http.get('/api/recruitment/'+this.rec_idx)
            .then(resp=>{
                console.log(resp.data.students);
                this.$set(this, 'recruitment', resp.data.rec)
                this.$set(this, 'students', resp.data.students)
            })
            .catch(err=>{
                console.log(err);
            })
        }, // getRec







        // 수강신청여부 확인
        applicationCheck(){
            this.$http.get('/api/recruitment/check/'+this.rec_idx)
            .then(resp=>{
                if (resp.data.status==208){
                    this.$set(this, 'applicationFlag', true)
                    return
                }
                this.$set(this, 'applicationFlag', false)
            })
            .catch(err=>{
                alert('Error')
                return
            })
        }, // applicationCheck









        // 수강생 상세보기 - 모달
        selectStudent(sid){
            this.$set(this.modal , 'student' , true)
            return
            this.$http.get('/api/students/'+sid)
            .then(resp=>{
                console.log(resp.data);
            })
            .catch(err=>{
                console.log(err);
                alert('Error')
            })
        }, // selectStudent








    }// methods
}
</script>






<!-- Style -->
<style scoped>
    a {
        color: #42b983;
    }

    div.cardbox{
        border: 1px solid #f1f1f1;
    }


    .applicationButton{
        position:fixed;
        bottom:35px;
        right: 30px;
        font-size:1.35em;
        box-shadow:1px 1px 1px 1px rgba(0,0,0,0.1);
        padding:15px 20px;
    }




</style>
