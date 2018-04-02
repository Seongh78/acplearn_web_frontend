<template lang="html">
<div class="ui comments">
    <div class="comment" v-for="(content, cid)  in  contents">
        <a class="avatar">
          <img src="https://semantic-ui.com/images/avatar/small/matt.jpg">
        </a>
        <div class="content">
          <a class="author">{{ content.stu_name }}</a>
          <div class="metadata">
            <span class="date">{{ content.lc_date }}</span>
          </div>
          <div class="text">
            {{ content.lc_text }}
          </div>
          <div class="extra images">
            <!-- <a><img v-bind:src="'../../assets/lecture_comments/cm'+cid+'.jpg'" width="25%"></a> -->
            <a><img src="../../assets/lecture_comments/cm1.jpg" width="32%"></a>
            <!-- <a><img src="/images/wireframe/image.png"></a> -->
          </div>
          <div class="actions">
            <a class="reply">Reply</a>
          </div>
        </div>
      </div>
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
    props: ['contents'],

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


    }, // methods
}
</script>




<style lang="css">

    .profileImg{
        opacity: 0.28;
    }







</style>
