<template>
    <div class="">

        <top-layout bg="true">
            <nav-bar bg="true"/>
            <page-title v-bind:mainTitle="record.rec_title" subTitle=" " />
        </top-layout>



        <page-layout  >


            <div class="cardbox" style="margin:0; padding: 0; border:1px solid #eaeaea;">

                <table class="ui celled table lectureInfo " style="padding:0; border-radius:0; border:none;">
                    <colgroup>
                        <col width="13%;">
                        <col width="42%;">

                        <col width="13%;">
                        <col width="32%;">
                    </colgroup>
                    <tbody>
                        <tr>
                            <td class="tdTitle">강의기간</td>
                            <td>{{ record.rec_date }}</td>
                            <td class="tdTitle">시간</td>
                            <td>{{ record.rec_time }}</td>
                        </tr>
                        <tr>
                            <td class="tdTitle">장소</td>
                            <td>부산광역시 남구 수영대로 99-1 부산본사</td>
                            <td class="tdTitle">금액</td>
                            <td>{{ record.rec_price }}</td>
                        </tr>
                        <tr>
                            <td class="tdTitle">수료여부</td>
                            <td>{{ record.app_status }}</td>
                            <td class="tdTitle">결제</td>
                            <td>
                                <div class="ui label"  v-if="record.app_payment=='결제'"> 결제완료 </div>
                                <div class="ui label red" v-if="record.app_payment=='미결제'"> 미결제 </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdTitle">강의대상</td>
                            <td colspan="3">{{ record.rec_spec }}</td>
                        </tr>
                        <tr>
                            <td class="tdTitle">강의내용</td>
                            <td colspan="3">
                                <br>
                                <p>{{ record.rec_content }}</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <br>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

                <br>



        </page-layout>





    </div>
</template>



<!-- Script -->
<script>
import { Navbar, Card, PageTitle, TopLayout, PageLayout } from '@/components/components'
const page = 'RecruitmentRecord';

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
            app_idx:-1,
            msg: page,
            tab:0,
            record : []
        }
    }, // data()



    created(){
        this.$set(this, 'app_idx', this.$ro.history.current.params.id)
        this.getRecruitment()
    },



    methods:{
        getRecruitment(){

            this.$http.get('/api/recruitment/records/'+this.app_idx)
            .then(resp=>{
                this.$set(this, 'record', resp.data.record)
            })
            .catch(err=>{

            })

        }, //getRecruitments()




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
