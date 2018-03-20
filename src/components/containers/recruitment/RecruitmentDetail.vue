<template>
    <div class="">

        <top-layout bg="true">
            <nav-bar bg="true"/>
            <!-- <page-title mainTitle="RecruitmentDetail" subTitle=" " /> -->
            <page-title v-bind:mainTitle="recruitment.rec_title" subTitle=" " />
        </top-layout>



        <page-layout >


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





            <div class="cardbox " style="margin:0; padding: 25px 20px;">

                <h4 class="ui dividing header">댓글</h4>



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



        </page-layout>




        <!-- 신청버튼 -->
        <!-- <router-link tag="button" :to="{ path: '/apl/application/'+rec_idx }" class="circular ui icon orange button tooltip" style="position:fixed; bottom:35px; right: 30px;  font-size:1.35em; box-shadow:1px 1px 1px 1px rgba(0,0,0,0.1); padding:15px 20px;"> -->
        <button class="circular ui icon orange button tooltip applicationButton" @click.prevent="applicationClick(false)" v-if="!applicationFlag">
          <i class="icon edit"></i> 수강신청
        </button>
        <button class="circular ui icon  button tooltip applicationButton" @click.prevent="applicationClick(true)" v-else>
          <i class="icon edit"></i> 신청취소
        </button>
        <!-- </router-link> -->


    </div>
</template>



<!-- Script -->
<script>
import { Navbar, Card, PageTitle, TopLayout, PageLayout } from '@/components/components'
const page = 'RecruitmentDetail';

export default {
    name: page,

    components: {
        'nav-bar' : Navbar,
        'card' : Card,
        'page-title' : PageTitle,
        'top-layout' : TopLayout,
        'page-layout' : PageLayout
    },

    data () {
        return {
            rec_idx : -1, // 강의아이디
            applicationFlag : false, // 수강신청여부
            recruitment:{}, // 강의정보
            msg: page,
            notices: [
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
                // console.log(resp);
                this.$set(this, 'recruitment', resp.data.data)
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







        // 수강신청 버튼 => 신청/취소 기능
        applicationClick(flag){
            // true : 신청취소하기
            if(flag){
                if ( !confirm('수강을 취소하시겠습니까?') )
                    return

                this.$http.delete('/api/recruitment/application/'+this.rec_idx)
                .then(resp=>{
                    this.$set(this, 'applicationFlag', false)
                    alert('수강신청이 취소되었습니다.')
                })
                .catch(err=>{
                    alert('Error - ')
                })
            }else{
                // 신청서 작성페이지로 이동
                this.$ro.push({path: '/apl/application/'+this.rec_idx})
            }// else
        } // applicationClick

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
