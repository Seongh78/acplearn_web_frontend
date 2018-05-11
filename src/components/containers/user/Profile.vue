<template lang="html">
<div class="viewLoadAnimation">

    <div class="ui grid">
        <div class="eleven wide column">
            <h1 class="ui header">
                내 정보관리
            </h1>
        </div>
        <div class="five wide column" style="text-align:right;">
            <div class="ui basic buttons small">
              <div class="ui button basic " >
                  <i class="icon check circle"></i>정보수정
              </div>
              <!-- <div class="ui button">강사탈퇴</div> -->
            </div>
        </div>
    </div>
    <!-- <hr style="opacity:0.3;"> -->



    <table class="ui celled table lectureInfo cardbox" style="padding:0;">
        <colgroup>

            <col width="12%">
            <col width="30%">
            <col width="12%">
            <col width="30%">
            <col width="16%">
        </colgroup>
        <tbody>
            <tr>
                <th>이름</th>
                <td>{{ profile.tutor_name }}</td>
                <th>생년월일</th>
                <td>{{ profile.tutor_birthday }}</td>
                <td rowspan="5" v-bind:style="{'background-image':'url('+profile.tutor_img+')'}" class="profileImg"></td>
            </tr>
            <tr>
                <th class="borderTop">성별</th>
                <td>{{ profile.tutor_gender=='M'? '남자' : '여자' }}</td>
                <th class="borderTop">연락처</th>
                <td>{{ profile.tutor_phone }}</td>
            </tr>
            <tr>
                <th class="borderTop">소속</th>
                <td>{{ profile.tutor_company }}</td>
                <th class="borderTop">직급</th>
                <td>{{ profile.tutor_position }}</td>
            </tr>
            <tr>
                <th class="borderTop">이메일</th>
                <td>{{ profile.tutor_email }}</td>
                <th class="borderTop">홈페이지</th>
                <td>{{ profile.tutor_url }}</td>
            </tr>
            <tr>
                <th class="borderTop">자격취득일</th>
                <td colspan="3">

                </td>
            </tr>
        </tbody>
    </table>

    <br>
    <table class="ui celled table lectureInfo cardbox" style="padding:0;">
        <colgroup>
            <col width="12%">
        </colgroup>
        <tr>
            <th>강의분야</th>
            <td><br>{{ profile.tutor_category }}</br></br></td>
        </tr>
        <tr>
            <th class="borderTop">학력</th>
            <td><br>{{ profile.tutor_education }}</br></br></td>
        </tr>
        <tr>
            <th class="borderTop">자격/경력</th>
            <td><br>{{ profile.tutor_career }}</br></br></td>
        </tr>
        <tr>
            <th class="borderTop">수상/저서</th>
            <td><br>{{ profile.tutor_awards }}</br></br></td>
        </tr>
        <tr>
            <th class="borderTop">소개글</th>
            <td><br>{{ profile.tutor_intro }}</br></br></td>
        </tr>
    </table>

</div>
</template>






<script>
const name = 'Profile'
export default {
    name: name,

    data(){
        return {
            profile:{} // 개인정보
        }
    }, // data()



    created(){
        this.getProfile()
    },// created




    methods: {

        getProfile(){
            this.$http.get('/api/users/session')
            .then(resp => {
                console.log(resp.data);
                this.$set(this, 'profile', resp.data.admin.user)
            })
            .catch(err => {

            })
        },// getProfile()

    }, // methods
}
</script>






<style lang="css">

    .profileImg{
        text-align: center;
        background-size:cover !important;
        background-position:center center !important;
        cursor: pointer;
    }

    .profileImg:hover{
        opacity: 0.35 !important;
    }
    .profileImg:hover::after{
        text-align: center;
        opacity: 1 !important;
        content: "사진변경" !important;
    }


</style>
