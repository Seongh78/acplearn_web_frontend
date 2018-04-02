<template lang="html">
<table>

    <tr
        class="cursorPointer"
        v-for="(module, mid)  in  modules"
        >

        <td class="center aligned singleLineTd">
            <div class="ui label small middle aligned horizontal" style="margin-top:5px; padding:5px 8px;" v-bind:class="[ module.lm_type=='강의' ? 'blue' :  module.lm_type=='미션' ? 'green' : 'orange' ]">
                {{ module.lm_type }}
            </div>
        </td>
        <td class="center aligned singleLineTd">{{ module.lm_startTime }} ~ {{ module.lm_endTime }}</td>
        <td class="singleLineTd">{{ module.lm_title }}</td>
        <td class="center aligned singleLineTd">12건</td>

    </tr>

</table>
</template>

<script>

const name = "LectureModule"
export default {
    name : name,

    props : ['modules'],

    data(){
        return {
            list:[]
        }
    }, // data()

    created(){

    }, // created
}
</script>

<style lang="css">
</style>
