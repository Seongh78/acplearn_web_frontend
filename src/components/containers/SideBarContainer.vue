<template>
    <div class="hash" style="background:#f7f7f7;">

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
                <router-view class="viewLoadAnimation"/>
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












            <!-- 플랜상세 모달 -->
            <modal v-if="modal.actionPlan" @close="modal.actionPlan = false" w="w-40" h="">
                <h3 slot="header">플랜정보</h3>
                <div slot="body" class="ui form">

                    <table class="ui table celled" style="padding:0;">
                        <colgroup>
                            <col width="15%">
                            <col width="38%">
                            <col width="15%">
                            <col width="32%">
                        </colgroup>
                        <tr>
                            <th class="borderTop">플랜명</th>
                            <td colspan="3">일 1회 배선점검/전원분리</td>
                        </tr>
                        <tr>
                            <th class="borderTop">KPI</th>
                            <td><div class="ui basic label">산업안전</div></td>
                            <th class="borderTop">진행율</th>
                            <td>72%</td>
                        </tr>
                        <tr>
                            <th class="borderTop">평점</th>
                            <td>
                                <rating  />
                            </td>
                            <th class="borderTop">평가진행</th>
                            <td>3명 / 5명</td>
                        </tr>
                        <tr>
                            <th class="center aligned borderTop" colspan="4">점수표</th>
                        </tr>
                        <tr>
                            <td colspan="4" style="padding:0;">
                                <table style="width:100%; margin:0; border:none;" class="structured ui table celled">
                                    <colgroup><col width="15%"></colgroup>
                                    <tr>
                                        <th class="borderTop">자가평가</th>
                                        <td class="center aligned">2</td>
                                        <td class="center aligned">2</td>
                                        <td class="center aligned">2</td>
                                        <td class="center aligned">2</td>
                                        <td class="center aligned">2</td>
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
                    <hr style="opacity:.2;">
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
            }
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
        this.$EventBus.$on('actionPlan', (v)=>{ this.$set(this.modal, 'actionPlan', v) })


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
