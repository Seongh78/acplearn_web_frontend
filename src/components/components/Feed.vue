<template lang="html">
    <div class="ui feed">


        <!-- <div class="event" >
            <div class="label">
                <img src="../../assets/user_sample1.png" class="profileImg">
            </div>
            <div class="content">
                <div class="summary">
                    <a>David - 강사</a>
                    <div class="date">0000-00-00</div><br>
                    교육생들이 너무 열정적으로 참여하고 있습니다. ^^
                </div>
                <div class="extra images">
                    <a><img src="../../assets/lecture_comments/cm01.jpg"></a>
                    <a><img src="../../assets/lecture_comments/cm2.jpg"></a>
                </div>
                <div class="meta">
                    <a class="like">
                    <i class="like icon"></i> 1 Like
                </a>
                </div>
            </div>
        </div> -->


    </div>
</template>





<script>
const name = 'Feed'
export default {
    name: name,

    /*
    propr: {
        table => 찾을 테이블
    }
    */
    props: ['table', 'idx'],

    data(){
        return {
            feeds:[]
        }
    }, // data()





    created(){
        // this.getFeeds(this.table, this.idx)
        // console.log('feed : ', this.idx)
    }, // created()





    methods: {

        getFeeds(table, lec_idx){
            /*
            table       : 찾을 테이블 [ 'feedback' , 'action_check' ]
            lec_idx    : 강의 아이디
            */
            var url = '/api/comments/'+table+'/'+lec_idx
            this.$http.get(url)
            .then (resp =>{
                console.log(resp.data.comments);
                this.$set(this, 'feeds', resp.data.comments)
            })
            .catch (err => {

            })
        }, // getFeeds()

    }, // methods
}
</script>




<style lang="css">

    .profileImg{
        opacity: 0.28;
    }







</style>
