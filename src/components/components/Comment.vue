<template lang="html">
<div class="ui comments">
    <!-- <div class="comment" v-for="(content, cid)  in  contents" v-if="sorting==content.group_idx || sorting==-1"> -->
    <div class="comment">

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
    props: ['contents', 'groupFilter'],

    data(){
        return {
            feeds:[],
            sorting:'', // 분류 기준
        }
    }, // data()





    created(){
        // this.getFeeds(this.table, this.idx)
        // console.log('feed : ', this.groupFilter)
        // this.$set(this, 'sorting', this.groupFilter)
    }, // created()


    updated(){
        console.log('feed : ', this.groupFilter)
        this.$set(this, 'sorting', this.groupFilter)
    }, // updated





    methods: {


    }, // methods
}
</script>




<style lang="css">

    .profileImg{
        opacity: 0.28;
    }







</style>
