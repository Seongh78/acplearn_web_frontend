<template>
    <div class="cardbox">
        <h2>{{ msg }}</h2>
    </div>
</template>


<!--  -->
<script>
const page = "Tab"

export default {
    name: page,
    props:[],
    data(){
        return {
            msg: page
        }
    } // data()
}
</script>


<!--  -->
<style lang="css">

</style>
