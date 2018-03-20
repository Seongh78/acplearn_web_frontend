<template>
    <div class="">

        <top-layout bg="true">
            <nav-bar bg="true"/>
            <page-title mainTitle="공지사항" subTitle=" " />
        </top-layout>




        <page-layout>
            <div class="ui secondary  menu" style="padding:0;">
              <div class="left menu" style="padding:0;">
                <div class="item" style="padding:0;">
                  <div class="ui icon input">
                    <input type="text" placeholder="Search...">
                    <i class="search link icon"></i>
                  </div>
                </div>
              </div>
            </div>


            <table class="ui single line table selectable cardbox" style="padding:0; border-radius:0;">
                <colgroup>
                    <col width="5%">
                    <col width="53%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                </colgroup>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>제목</th>
                        <th style="text-align:center;">등록일</th>
                        <th style="text-align:center;">작성자</th>
                        <th style="text-align:center;">조회수</th>
                    </tr>
                </thead>
                <tbody v-if="notices.length>0">
                    <tr v-for="(n, ii) in notices" @click.prevent="move(n.notice_idx)">
                        <td>{{ ii+1 }}</td>
                        <td><a href="">{{ n.notice_title }}</a></td>
                        <td style="text-align:center;">{{ n.notice_date }}</td>
                        <td style="text-align:center;">관리자</td>
                        <td style="text-align:center;">{{ n.notice_count }}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td class="center aligned" colspan="5">
                            <h4>공지사항이 없습니다.</h4>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>


            <div class="ui two column centered grid">
                <div class="ui centered pagination menu">
                    <a class="icon item"><i class="left chevron icon"></i></a>
                    <a class="item">1</a>
                    <a class="item">2</a>
                    <a class="item">3</a>
                    <a class="item">4</a>
                    <a class="icon item"><i class="right chevron icon"></i></a>
                </div>
            </div>
        </page-layout>




    </div>
</template>



<!-- Script -->
<script>
import { Navbar, Card, PageTitle, TopLayout, PageLayout } from '@/components/components'
const page = 'Notice';

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
            msg: page,
            notices: []
        }
    }, // Data




    created(){
        this.getNotices()
    }, // created





    methods: {

        getNotices(){
            this.$http.get('/api/notices')
            .then(resp=>{
                console.log(resp.data.notices);
                this.$set(this, 'notices', resp.data.notices)
            })
            .catch(err=>{
                console.log(err);
            })
        }, // getNotices


        move(id){
            this.$ro.push({path:'/notices/'+id})
        }, // move

    }, // methods
}
</script>



<!-- Style -->
<style scoped>
    a {
        color: #42b983;
    }

    .cardbox td{
        padding:20px 18px;
        cursor: pointer;
    }
</style>
