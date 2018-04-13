<template lang="html">
<div class="">

</div>
</template>

<script>
export default {
    name : 'LectureAcplearnDay',

    // ===== components ===== //
    components : [],



    // ===== props ===== //
    props:[],



    // ===== data ===== //
    data(){
        return{
            date : {
                start : '2018-02-16',
                end : '2019-02-16'
            },
            lad:0
        }
    },// data



    // ===== created ===== //
    created(){
        var sdt //= new Date(this.date.start);
        var edt //= new Date(this.date.end);
        var dateDiff //= Math.ceil((edt.getTime()-sdt.getTime())/(1000*3600*24));
        var tempDate, tempString = ''
        var tempLad = []
        // alert(dateDiff)
        var q = ''
        var sessions = [
            { ls_idx : 1, start : '2018-04-09' , end : '2018-04-13' },
            { ls_idx : 2, start : '2018-04-16' , end : '2018-04-20' },
            { ls_idx : 3, start : '2018-04-23' , end : '2018-04-27' }
        ]

        // 액플런데이 일수 구하기
        var keys = Object.keys(sessions)
        for(var ii  in  keys){
            sdt = new Date(sessions[ii].start);
            edt = new Date(sessions[ii].end);
            dateDiff = Math.ceil((edt.getTime()-sdt.getTime())/(1000*3600*24));
            console.log((Number(ii)+Number(1))+"차 : ");


            for(var jj=0;  jj <= dateDiff;  jj++){
                tempDate = new Date(sdt)
                tempDate.setDate(sdt.getDate()+jj)
                // console.log( tempDate.getFullYear() + "-" + tempDate.getMonth() + "-" + tempDate.getDate() )

                // 날짜포맷
                tempString     = tempDate.getFullYear()+"-"
                tempString   += (tempDate.getMonth()+1) + "-"
                tempString   += tempDate.getDate()
                tempLad.push([
                    tempString,
                    sessions[ii].ls_idx,
                ])
                console.log(tempString);

            }//
        }//

        console.log(tempLad);

    },



    // ===== updated ===== //
    updated(){

    },



    // ===== methods ===== //
    methods: {

    }, // methods
}
</script>

<style lang="css">
</style>
