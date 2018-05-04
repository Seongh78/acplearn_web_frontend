<template lang="html">
    <div class="">
        <!-- <h4>SESS: {{ sess }}</h4> -->
        <h4>SESS: {{ checkSessions }}</h4>
    </div>
</template>

<script>
const name = 'LoadingCycle'
export default {
    name: name,

    props:[
        'sess',
        'checkSessions'
    ],

    created(){
        console.log(this.checkSessions);
    },
    updated(){
        console.log(this.checkSessions);
    },
}
</script>

<style lang="css">
</style>
