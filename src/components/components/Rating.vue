<template lang="html">
<div class="">
    <i
    class="icon ratingScore star"
    v-for="(c) in size"
    :key="c"
    @click.prevent="selectRating(c)"
    v-bind:class="[c>selection? 'outline':'' , privat?'':'select']"></i>
</div>
</template>

<script>
/*
    - size => 별 개수 - 기본값:5
    - privat => true입력시 점수 선택 불가 - 뷰어전용
    - score => 기본값

    - 클릭시 selectRating호출 - 호출된 별의 번지수만큼 노란색으로 표시
    - 클릭한 별의 번지수를 상위로 반환
*/
const name = 'Rating'
export default {
    name: name,
    props:{
        size:{
            type: Number, default: ()=>{ return 5 }
        },
        privat:{
            default: ()=>{ return false }
        },
        score:{
            default: ()=>{ return 0 }
        }
    }, // Props





    data(){
        return {
            selection:0
        }// return
    }, // data




    // created(){
    //     this.$set(this, section, this.score)
    // },
    created(){
        this.$set(this, 'selection', Number(this.score))
    },
    updated(){
        this.$set(this, 'selection', Number(this.score))
    },





    methods: {

        selectRating(c){
            console.log("this.privat : ", this.privat);
            if ( this.privat==false ) {
                this.$set(this, 'selection', Number(c))
            }// if
        }, // selectRating

    }// methods
}
</script>

<style lang="css">

.ratingScore{
    color:#F2CB61;
    font-size:1.35em !important;
    margin:0 -.5px !important;
    padding:0;
}
.ratingScore.outline{
    color:#D5D5D5;
}

.select:hover{
    color:#FFE08C;
}

</style>
