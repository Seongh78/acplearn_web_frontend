<template lang="html">
<div class="ui grid verticalTab">

    <div class="two wide column">
        <div class="ui vertical fluid attached menu listTab">
            <!-- 강의회차 탭-->
            <a
                class="item"
                v-for="(menu, mid)  in  menus"
                v-bind:class="[menu.idx==thisTab?'active':'']"
                @click.prevent="thisTab=menu.idx">
                {{mid+1}}회
            </a>
            <!-- 강의회차 탭-->
        </div>
    </div>

    <div class="fourteen wide stretched column ">
        <div class="ui segment attached contentTab" style="padding: 10px !important;">
            <!-- 강의내용 -->
            <p>{{ menus[thisTab].text }}</p>
            <!-- 강의내용 -->
        </div>
    </div>

</div>
</template>

<script>
export default {
    name: 'VerticalTab',
    data(){
        return {

            thisTab:0,

            menus: [
                { idx: 0, text: '01 This is an stretched grid column' },
                { idx: 1, text: '02 This is an stretched grid column' },
                { idx: 2, text: '03 This is an stretched grid column' },
                { idx: 3, text: '04 This is an stretched grid column' },
            ], // menus

        }
    }, // data()
}
</script>

<style lang="css">

    .verticalTab{
        padding:0;
    }

    .verticalTab div{
        padding:0 !important;
    }
        .listTab{
            text-align: center;
        }
        .listTab .item{
            padding:25px 10px !important;
        }
        .listTab .active{

        }
        .contentTab{
            padding: 10px !important;
            border-left : none !important;
        }


</style>
