<template>
    <div class="">

        <top-layout bg="true">
            <nav-bar bg="true"/>
            <page-title mainTitle="APL 수강신청" subTitle=" " />
        </top-layout>



        <page-layout  >


                <div class="ui two item    menu lectureMenu" style="margin-bottom:20px;">
                    <a class="item" v-bind:class="[tab==0?'active':'']" v-on:click.prevent="selectTab(0)">모집중</a>
                    <a class="item" v-bind:class="[tab==1?'active':'']" v-on:click.prevent="selectTab(1)">신청내역</a>
                </div>


                <!-- === 탭0 - 모집중 강의 === -->
                <table class="ui single line table selectable cardbox" style="padding:0; border-radius:0;" v-if="tab==0">
                    <colgroup>
                        <col width="5%">
                        <col width="40%">
                        <col >
                        <col >
                        <col width="6%">
                        <col width="6%">
                    </colgroup>
                    <thead>
                        <tr>
                            <th class="center aligned">상태</th>
                            <th >제목</th>
                            <th style="text-align:center;">강의시간</th>
                            <th style="text-align:center;">장소</th>
                            <th style="text-align:center;">차시</th>
                            <th style="text-align:center;">인원</th>
                        </tr>
                    </thead>
                    <tbody v-if="recruitment.length>0">
                        <tr v-for="(rec, ii) in recruitment" @click.prevent="move('/apl/'+rec.rec_idx)">
                            <td>{{ rec.rec_status }}</td>
                            <td>
                                <a href="">{{ rec.rec_title }}</a>
                            </td>
                            <td style="text-align:center;">{{ rec.rec_time }}</td>
                            <td style="text-align:center;">{{ rec.rec_location }}</td>
                            <td style="text-align:center;">{{ rec.rec_count }}</td>
                            <td style="text-align:center;">{{ ii+23}}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td class="center aligned" colspan="6">
                                <h4>모집중인 공고가 없습니다.</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>



                <!-- === 탭1 - 신청내역 === -->
                <table class="ui single line table selectable cardbox" style="padding:0; border-radius:0;" v-if="tab==1">
                    <colgroup>
                        <col width="5%">
                        <col width="40%">
                        <col >
                        <col >
                        <col width="6%">
                        <col width="6%">
                    </colgroup>
                    <thead>
                        <tr>
                            <th class="center aligned">상태</th>
                            <th >제목</th>
                            <th style="text-align:center;">강의시간</th>
                            <th style="text-align:center;">강의상태</th>
                            <th style="text-align:center;">금액</th>
                            <th style="text-align:center;">결제</th>
                        </tr>
                    </thead>
                    <tbody v-if="records.length>0">
                        <tr v-for="(rec, ii) in records" @click.prevent="move('/apl/record/'+rec.app_idx)">
                            <td>{{ rec.app_status }}</td>
                            <td>
                                <a href="">{{ rec.rec_title }}</a>
                            </td>
                            <td style="text-align:center;">{{ rec.rec_time }}</td>
                            <td style="text-align:center;">{{ rec.rec_status }}</td>
                            <td style="text-align:center;">{{ rec.rec_price }}</td>
                            <td style="text-align:center;">{{ rec.app_payment }}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td class="center aligned" colspan="6">
                                <h4>신청내역이 없습니다.</h4>
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
const page = 'AplectureApplication';

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
            tab : 0,
            msg : page,
            recruitment : [],
            records : []
        }
    }, // data()



    created(){
        this.getRecruitment()
        this.getApplication()
    },



    methods:{
        // 모집중인 강의 조회
        getRecruitment(){

            this.$http.get('/api/recruitment')
            .then(resp=>{
                this.$set(this, 'recruitment', resp.data.data)
            })
            .catch(err=>{

            })

        }, //getRecruitments()



        // 신청내역 조회
        getApplication(){
            this.$http.get('/api/recruitment/records')
            .then(resp=>{
                this.$set(this, 'records', resp.data.records)
            })
            .catch(err=>{
                alert('Error')
            })
        }, // getApplication




        selectTab(t){
            this.$set(this, 'tab', t)
        }, // selectTab


        move(path){
            this.$ro.push({path:path})
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
