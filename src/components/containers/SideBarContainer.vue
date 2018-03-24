<template>
    <div style="background:#f7f7f7;">

        <!-- Navbar -->
        <top-layout bg="false">
            <nav-bar bg="false"/>
        </top-layout>


        <!-- Content -->
        <div id="sbcWrap" class="ui grid">

            <!-- Sidebar -->
            <side-navi  />
            <!-- Main content -->
            <div class="thirteen wide column centered rightContents " >
                <!-- <router-view class="viewLoadAnimation"/> -->
                <router-view class=""/>
                <!--
                viewLoadAnimation : 있을때 모달이 안먹힘!!!!!
                -->
            </div>

        </div>
        <!-- /Content -->

        <foot-bar/>


        <!-- ======================== Modal영역 ============================ -->

            <!-- 팀생성 모달 -->
            <modal v-if="modal.addGroup" @close="modal.addGroup = false" w="w-40" h="">
                <h3 slot="header">팀생성</h3>
                <div slot="body" class="ui form">

                    <table width="100%">
                        <colgroup>
                            <col width="10%">
                        </colgroup>
                        <tr>
                            <td>팀명</td>
                            <td class="field">
                                  <input type="text" placeholder="미 입력시 생성된 순서의 번호로 자동생성됩니다." >
                            </td>
                        </tr>
                        <tr>
                            <td>설명</td>
                            <td class="field">
                                  <textarea rows="2"></textarea>
                            </td>
                        </tr>
                    </table>

                </div>
                <div slot="footer">
                    <div class="ui two bottom attached buttons">
                        <div class="ui button" @click.prevent="modal.addGroup=false">닫기</div>
                        <div class="ui button blue" @click.prevent="$EventBus.$emit('addTeam')">등록</div>
                    </div>
                </div>
            </modal>




            <!-- 팀생성 모달 -->
            <modal v-if="modal.companyDetail" @close="modal.companyDetail = false" w="w-30" h="">
                <h3 slot="header">기업정보</h3>
                <div slot="body" class="ui form">

                    <table width="100%">
                        <colgroup>
                            <col width="10%">
                        </colgroup>
                        <tr>
                            <td>팀명</td>
                            <td class="field">
                                  <input type="text" placeholder="미 입력시 생성된 순서의 번호로 자동생성됩니다." >
                            </td>
                        </tr>
                        <tr>
                            <td>설명</td>
                            <td class="field">
                                  <textarea rows="2"></textarea>
                            </td>
                        </tr>
                    </table>

                </div>
                <div slot="footer">
                    <div class="ui two bottom attached buttons">
                        <div class="ui button" @click.prevent="modal.companyDetail=false">닫기</div>
                        <div class="ui button blue" >등록</div>
                    </div>
                </div>
            </modal>






            <!-- 그룹별 참여점수 모달 -->
            <modal v-if="modal.groupScoreModal" @close="modal.groupScoreModal = false" w="w-50" h="">
                <h3 slot="header">팀 상세점수</h3>
                <div slot="body" class="ui form">

                    <table width="100%">
                        <colgroup>
                            <col width="10%">
                        </colgroup>
                        <tr>
                            <td>팀명</td>
                            <td class="field">
                                  <input type="text" placeholder="미 입력시 생성된 순서의 번호로 자동생성됩니다." >
                            </td>
                        </tr>
                        <tr>
                            <td>설명</td>
                            <td class="field">
                                  <textarea rows="2"></textarea>
                            </td>
                        </tr>
                    </table>

                </div>
                <div slot="footer">
                    <div class="ui two bottom attached buttons">
                        <div class="ui button" @click.prevent="modal.groupScoreModal=false">닫기</div>
                        <div class="ui button blue">등록</div>
                    </div>
                </div>
            </modal>












            

        <!-- ======================== Modal ============================ -->


    </div>
</template>

<script>
import {
    Navbar,
    Card,
    PageTitle,
    TopLayout,
    PageLayout,
    SideNavi,
    Footer,
    Modal ,
    Rating,
} from '../components'

export default {
  name: 'SideBarContainer',
  components: {
      'nav-bar' : Navbar,
      'card' : Card,
      'page-title' : PageTitle,
      'top-layout' : TopLayout,
      'page-layout' : PageLayout,
      'side-navi' : SideNavi,
      "foot-bar":Footer,
      "modal":Modal,
      'rating' : Rating
  },
    data () {
        return {
            msg: 'LectureContainer',
            modal :{
                addGroup : false,
                companyDetail : false,
                groupScoreModal : false,
                actionPlan : false,
            },// modal

            // ==== 액션플랜 데이터 ==== //
            plan:{}, // 플랜상세보기
            // ==== 액션플랜 데이터 ==== //
        }
    }, // data

    created(){
        // 팀추가 모달 ON
        this.$EventBus.$on('onModal', (name, flag, val)=>{
            this.$set(this.modal, name+'', flag)
        })


        // 기업상세 모달 ON
        this.$EventBus.$on('companyDetail', this.companyInfo)


        // 플랜상세 모달 ON
        this.$EventBus.$on('actionPlan', (v)=>{
            this.$set(this, 'plan', v)
            this.$set(this.modal, 'actionPlan', true)
        })


        // groupScoreModal ON
        this.$EventBus.$on('groupScoreModal', (gid)=>{
            console.log(1);
            this.modal.groupScoreModal= true
        })
    },  // created


    methods : {
        companyInfo(){
            /*
            name : 모달명
            flag : true / false,
            val : 필요한 경우 인자값
            */
            this.$http.get('/api/companies/000-00-00001')
            .then(resp=>{
                console.log(resp.data.company);
                this.$set(this.modal, name+'', flag)
            })
            .catch(err=>{
                alert('Error - company info')
            })

        }, //companyInfo





    }, // methods


}
</script>



<!--  -->
<style scoped>

    #sbcWrap{
        padding:0;
        margin:0;
    }

    .rightContents{
        padding-top: 35px !important;
        padding-bottom: 55px !important;
        min-height: 700px !important;
    }



    th{
        background: #F9FAFB;
        padding:0.92857143em 0.78571429em;
    }
    .borderBottom{
        border-bottom: 1px solid rgba(34, 36, 38, 0.1);
    }
    .borderTop{
        border-top: 1px solid rgba(34, 36, 38, 0.1);
    }


    .tempRow{ cursor: pointer; }
    .tempRow:hover{ background: #f9f9f9 !important; }




    .ratingScore{
        color:#F2CB61;
        font-size:1.35em;
        margin:0;
        padding:0;
    }
    .ratingScore.outline{
        color:#D5D5D5;
    }

    .ratingScore:hover{
        color:#FFE08C;
    }

</style>
