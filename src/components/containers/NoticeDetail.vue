<template>
    <div class="">

        <top-layout bg="true">
            <nav-bar bg="true"/>
            <!-- <page-title mainTitle="RecruitmentDetail" subTitle=" " /> -->
            <page-title v-bind:mainTitle="notice.notice_title ? notice.notice_title : '-'" subTitle=" " />
        </top-layout>



        <page-layout >
            <!-- <div class="cardbox" style="margin:0; padding: 25px 20px;"> -->
            <div class="cardbox" style="margin:0; padding: 0;">

                <!-- <h3 >본문</h3> -->
                <table class="ui celled table lectureInfo " style="padding:0; border-radius:0; border-top:none; border-right:none; border-left:none;">
                    <colgroup>
                        <col width="8%;">
                        <col >

                        <col width="8%;">
                        <col width="20%">

                        <col width="8%;">
                        <col width="20%">
                    </colgroup>
                    <tbody>
                        <tr>
                            <td class="tdTitle">작성일</td>
                            <td>{{ notice.notice_date }}</td>
                            <td class="tdTitle">작성자</td>
                            <td>관리자</td>
                            <td class="tdTitle">조회수</td>
                            <td>{{ notice.notice_count }}</td>
                        </tr>
                        <tr>
                            <td class="tdTitle">내용</td>
                            <td colspan="5">
                                <br>
                                <p>{{ notice.notice_text }}</p>
                                <br>
                                <br>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <br>

            <div class="cardbox" style="margin:0; padding: 25px 20px;">

                <h3 class="ui dividing header">댓글</h3>
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

            </div>
        </page-layout>




    </div>
</template>



<!-- Script -->
<script>
import { Navbar, Card, PageTitle, TopLayout, PageLayout } from '@/components/components'
const page = 'NoticeDetail';

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
            notice_idx : -1, // 강의아이디
            notice:{}
        }
    }, // data()






    created(){
        this.$set(this, 'notice_idx', this.$ro.history.current.params.id)
        this.getNotice()
    }, //created()







    methods: {

        getNotice(){
            this.$http.get('/api/notices/'+this.notice_idx)
            .then(resp=>{
                console.log(resp);
                this.$set(this, 'notice', resp.data.notice)
            })
            .catch(err=>{
                console.log(err);
            })
        }, // getRec




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
