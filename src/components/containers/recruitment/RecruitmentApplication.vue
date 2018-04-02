<template>
    <div class="">

        <top-layout bg="true">
            <nav-bar bg="true"/>
            <page-title mainTitle="수강신청서 작성" subTitle=" " />
        </top-layout>



        <page-layout>


            <div class="ui  steps" style="width:100%;">

                <div
                class="step"
                style="cursor:pointer;"
                v-bind:class="[step=='agree'?'active':'', agreeValue==true?'completed':'']"
                @click.prevent="selectStep('agree')">

                    <i class="clipboard outline icon"></i>
                    <div class="content">
                        <div class="title">약관동의</div>
                        <div class="description">Agree</div>
                    </div>
                </div>

                <div
                class="step"
                style="cursor:pointer;"
                v-bind:class="[step=='application'?'active':'', step=='payment'?'completed':'']"
                @click.prevent="selectStep('application')">

                    <i class="edit outline icon"></i>
                    <div class="content">
                        <div class="title">신청서</div>
                        <div class="description">Application</div>
                    </div>
                </div>

                <div
                class="step"
                style="cursor:pointer;"
                v-bind:class="[step=='payment'?'active':'']"
                @click.prevent="selectStep('payment')">

                    <i class="credit card icon"></i>
                    <div class="content">
                        <div class="title">결제</div>
                        <div class="description">Payment</div>
                    </div>
                </div>
            </div>

            <br>
            <br>



            <!-- ==== 이용약관 ==== -->
            <div class="cardbox" v-if="step=='agree'" >
                <div class="ui form">
                    <h3>이용안내</h3>
                    <div class="" style=" overflow:auto; padding:15px 10px; background:#f5f5f5; height:150px;">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <br>

                    <h3>개인정보 취급방침</h3>
                    <div class="" style=" overflow:auto; padding:15px 10px; background:#f5f5f5; height:150px;">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>

                </div>
                <br>
                <div class="ui two bottom attached buttons">
                    <div class="ui button" @click.prevent="agreeValue=false" >동의하지 않습니다</div>
                    <div class="ui button green" @click.prevent="step='application', agreeValue=true">동의합니다</div>
                </div>
            </div>
            <!-- ==== 이용약관 ==== -->




            <!-- ==== 신청양식 ==== -->
            <div class="cardbox" v-if="step=='application'" >
                <h3>신청서</h3>
                <table class="ui table celled form">
                    <colgroup>
                        <col width="18%">
                        <col>
                    </colgroup>
                    <tr>
                        <td class="tdTitle center aligned">가입유형</td>
                        <td>
                            <a class="ui basic label " v-if="tutor.tutor_type=='default'">액플런계정</a>
                            <a class="ui basic label green" v-if="tutor.tutor_type=='naver'">네이버계정 연동</a>
                            <a class="ui basic label yellow" v-if="tutor.tutor_type=='kakao'">카카오계정 연동</a>
                            <a class="ui basic label red" v-if="tutor.tutor_type=='google'">구글계정 연동</a>
                            <a class="ui basic label blue" v-if="tutor.tutor_type=='facebook'">페이스북계정 연동</a>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdTitle center aligned">강사사진</td>
                        <td>
                            <a class="ui image label large circular">
                              <img v-bind:src="tutor.tutor_img">
                              파일선택
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdTitle center aligned">이름</td>
                        <td>
                            <!-- <div class="ui  input right labeled" style="width:50%;"> -->
                            <div class="ui  input " style="width:50%;">
                                <input type="text" value="이름을 입력해 주세요" v-model="tutor.tutor_name">
                                <!-- <div class="ui  label">변경하기</div> -->
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdTitle center aligned">이메일</td>
                        <td>
                            <div class="ui  input" style="width:100%;">
                                <input type="text" placeholder="이메일을 입력해 주세요" v-model="tutor.tutor_email" >
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdTitle center aligned">연락처</td>
                        <td>
                            <div class="ui  input" style="width:50%;">
                                <input type="text" placeholder="' - '(하이픈) 없이 연락처를 입력해 주세요" v-model="tutor.tutor_phone" >
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdTitle center aligned">성별</td>
                        <td>
                            <div class="field">
                                &nbsp;
                                <input type="radio" name="gender" value="M" v-model="tutor.tutor_gender">&nbsp;남자
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" name="gender" value="F" v-model="tutor.tutor_gender">&nbsp;여자
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdTitle center aligned">소속/직급</td>
                        <td>
                            <div class="ui  input" style="width:58%;">
                                <input type="text" placeholder="소속기업" v-model="tutor.tutor_company" >
                            </div>
                            <div class="ui  input" style="width:40%;">
                                <input type="text" placeholder="직급" v-model="tutor.tutor_position" >
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdTitle center aligned">경력사항</td>
                        <td>
                            <div class="ui  input" style="width:100%;">
                                <textarea rows="5" placeholder="경력사항을 입력해 주세요" v-model="tutor.tutor_profileFile"></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdTitle center aligned">자기소개</td>
                        <td>
                            <div class="ui  input" style="width:100%;">
                                <textarea rows="5" placeholder="자기소개를 입력해 주세요" v-model="tutor.tutor_intro"></textarea>
                            </div>
                        </td>
                    </tr>
                </table>
                <br>

                <div class="ui two bottom attached buttons">
                    <div class="ui button" @click.prevent="step='agree', agreeValue=false">뒤로</div>
                    <div class="ui button green" @click.prevent=" step='payment' ">확인</div>
                </div>
            </div>
            <!-- ==== 신청양식 ==== -->










            <!-- ==== 결제/완료 ==== -->
            <div class="cardbox" v-if="step=='payment'" >
                <h3 class="ui dividing header">결제</h3>
                <br>
                <form class="ui form">

                  <div class="field">
                    <label>Billing Address</label>
                    <div class="fields">
                      <div class="twelve wide field">
                        <input type="text" name="shipping[address]" placeholder="Street Address">
                      </div>
                      <div class="four wide field">
                        <input type="text" name="shipping[address-2]" placeholder="Apt #">
                      </div>
                    </div>
                  </div>
                  <div class="two fields">
                    <div class="field">
                      <label>State</label>
                      <select class="ui fluid dropdown">
                        <option value="">State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                      </select>
                    </div>
                    <div class="field">
                      <label>Country</label>
                      <div class="ui fluid search selection dropdown">
                        <input type="hidden" name="country">
                        <i class="dropdown icon"></i>
                        <div class="default text">Select Country</div>
                        <div class="menu">
                    <div class="item" data-value="af"><i class="af flag"></i>Afghanistan</div>
                    <div class="item" data-value="ax"><i class="ax flag"></i>Aland Islands</div>
                    <div class="item" data-value="al"><i class="al flag"></i>Albania</div>
                  </div>
                       </div>
                    </div>
                  </div>

                  <br>

                  <h4 class="ui dividing header">카드정보</h4>
                  <div class="field">
                    <label>Card Type</label>
                    <div class="ui selection dropdown">
                      <input type="hidden" name="card[type]">
                      <div class="default text">Type</div>
                      <i class="dropdown icon"></i>
                      <div class="menu">
                        <div class="item" data-value="visa">
                          <i class="visa icon"></i>
                          Visa
                        </div>
                        <div class="item" data-value="amex">
                          <i class="amex icon"></i>
                          American Express
                        </div>
                        <div class="item" data-value="discover">
                          <i class="discover icon"></i>
                          Discover
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="fields">
                    <div class="seven wide field">
                      <label>Card Number</label>
                      <input type="text" name="card[number]" maxlength="16" placeholder="Card #">
                    </div>
                    <div class="three wide field">
                      <label>CVC</label>
                      <input type="text" name="card[cvc]" maxlength="3" placeholder="CVC">
                    </div>
                    <div class="six wide field">
                      <label>Expiration</label>
                      <div class="two fields">
                        <div class="field">
                          <select class="ui fluid search dropdown" name="card[expire-month]">
                            <option value="">Month</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                          </select>
                        </div>
                        <div class="field">
                          <input type="text" name="card[expire-year]" maxlength="4" placeholder="Year">
                        </div>
                      </div>
                    </div>
                  </div>
                   <div class="ui segment">
                    <div class="field">
                      <div class="ui toggle checkbox">
                        <input type="checkbox" name="gift" tabindex="0" class="hidden">
                        <label>Do not include a receipt in the package</label>
                      </div>
                    </div>
                  </div>
                </form>

                <br>
                <div class="ui two bottom attached buttons">
                    <div class="ui button" @click.prevent="step='application'">뒤로</div>
                    <div class="ui button green" @click.prevent="payment">결제완료</div>
                </div>
            </div>
            <!-- ==== 결제/완료 ==== -->




        </page-layout>





    </div>
</template>



<!-- Script -->
<script>
import { Navbar, Card, PageTitle, TopLayout, PageLayout } from '@/components/components'
const page = 'RecruitmentApplication';

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
            rec_idx:-1, // 수강강의 아이디
            msg: page,
            // step:'agree',
            // agreeValue: false
            step:'application',
            agreeValue: true,
            tutor: {},
        }
    }, // data





    created(){
        this.$set(this, 'rec_idx', this.$ro.history.current.params.id)
        this.getUser()
    },






    methods: {
        selectStep(val){
            if ( !this.agreeValue ) {
                alert('이용약관에 동의해 주세요')
                return;
            }
            this.$set(this, 'step', val)
        },// selectStep


        agreeCheck(){
            this.$set(this, 'agreeValue', true)
            this.$set(this, 'step', 'application')
        }, // agreeCheck


        getUser(){
            this.$http.get('/api/users/session')
            .then(resp=>{
                // console.log(resp.data.admin);
                this.$set(this, 'tutor', resp.data.admin.user)
            })
            .catch(err=>{
                console.log(err);
                alert('Error - getUser')
            })
        }, // getUser


        // 최종확인
        payment(){
            // console.log(this.tutor);
            // return

            this.$http.post('/api/recruitment/application', {
                tutor : this.tutor, // 튜터정보
                rec_idx : this.rec_idx // 강의아이디
            })
            .then(resp=>{
                // console.log(resp.data);
                alert('수강신청이 완료되었습니다.')
                this.$router.replace('/apl/record/'+resp.data.insertId)
            })
            .catch(err=>{
                console.log(err);
                alert('Error - application')
            })
        }, // payment

    }// methods
}
</script>



<!-- Style -->
<style scoped>
    a {
        color: #42b983;
    }

    .cardbox{
        width:100%; border:1px solid #f3f3f3; margin:0; padding:  20px;
    }
</style>
