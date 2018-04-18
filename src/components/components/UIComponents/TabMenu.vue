<template lang="html">
<div class="">


<div class="ui top attached tabular menu eight item custom-tab" :class="[align?align:'center aligned']">
    <div
        class="item"
        :key="mid"
        v-for="(menu, mid)  in  menus"
        :class="[thisTab==menu.id ? 'active ' : '']"
        @click.prevent="selectTabFunc(menu.id)">
        {{ menu.name }}
    </div>
</div>
<br>

</div>
</template>

<script>
export default {
    name : 'TabMenu',


    props : [
        'menus', // 메뉴목록
        'startTab', // == thisTab
        'tabStyle', // 탭디자인
        'align', // 정렬
    ],


    data(){
        return {
            thisTab: ''
        }
    },//data



    created(){
        var startId = this.menus[0].id
        this.$set(this, 'thisTab', startId)
        this.selectTabFunc(this.thisTab)
    },

    updated(){
        // this.selectTabFunc(this.thisTab)
    },


    methods: {


        // 선택된 탭의 아이디 반환
        selectTabFunc(mid) {
            this.$set(this, 'thisTab', mid)
            this.$emit('input', mid)
        }


    }, // methods
}
</script>

<style lang="css">

    .custom-tab .item{
        cursor: pointer;
    }
    .custom-tab .item:hover{
        background: rgba(0, 0, 0, 0.035) !important;
    }



</style>
