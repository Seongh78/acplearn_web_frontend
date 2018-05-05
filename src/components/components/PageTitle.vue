<template>
    <div class="container ">
    <div class="sloganWrap">
        <h1>{{ mainTitle }}</h1>
        <p>{{ subTitle ? subTitle : '' }}</p>
        <slot></slot>
    </div>
    </div>
</template>


<!--  -->
<script>
const page = "PageTitle"

export default {
    name: page,
    props:['mainTitle','subTitle'],
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
