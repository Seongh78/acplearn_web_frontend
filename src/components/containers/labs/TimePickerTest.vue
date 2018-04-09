<template lang="html">
<div class="ui form" style="border-radius: 0 !important;">

    <div class="fields">
        <!-- 시간 -->
        <select class="eight wide field hour ui dropdown"  @input="updateTime()" ref="hourPicker">
            <option value="0">시간</option>
            <option v-for="(h) in  timeLimit.hour" :value="h">{{h<10?'0':''}}{{ h }}</option>
        </select>
        <!-- 분 -->
        <select class="eight wide field minute ui dropdown"  @input="updateTime()" ref="minutePicker">
            <option value="0">분</option>
            <option v-for="(m) in  timeLimit.minute" :value="m">{{m<10?'0':''}}{{ m }}</option>
        </select>
    </div>

</div>
</template>

<script>
export default {
    name : 'TimePickerTest',


    // ===== Props ===== //
    props:[
        'value',
        'maxHour',
        'minHour',
        'maxMinute',
        'minMinute'
    ],


    // ===== created ===== //
    data(){
        return {

            timeLimit:{
                hour:[] , minute:[]
            },//timeLimit

        }
    }, // data()


    // ===== created ===== //
    created(){
        var startHour = Number(this.minHour),
              endHour = Number(this.maxHour),
              startMinute = Number(this.minMinute),
              endMinute = Number(this.maxMinute)

        // 초기값 설정
        if(!startHour)       { startHour        = 1 }
        if(!endHour)        { endHour         = 24 }
        if(!startMinute)   { startMinute     = 0 }
        if(!endMinute)    { endMinute      = 59 }


        // 시간
        for(var v=startHour; v<=endHour; v++){
            this.timeLimit.hour.push(v)
        }
        // 분
        for(var v=startMinute; v<=endMinute; v++){
            this.timeLimit.minute.push(v)
        }

    },


    // ===== updated ===== //
    updated(){
    },


    // ===== Methods ===== //
    methods: {

        updateTime() {
            // TIME형태로 변환 후 리턴
            var result   = (this.$refs.hourPicker.value<10?'0':'')+this.$refs.hourPicker.value
                  result += ":"
                  result += (this.$refs.minutePicker.value<10?'0':'')+this.$refs.minutePicker.value
            // this.$emit('input', {
            //     hour : +this.$refs.hourPicker.value,
            //     minute : +this.$refs.minutePicker.value
            // })
            this.$emit('input', result)
        }// updateTime

    }, // methods
}
</script>

<style lang="css">

    .hour, .minute{
        border: 1px solid #e3e3e3 !important;
    }
    .hour , .hour option{
        border-radius: 3.5px 0 0 3.5px !important;
    }

</style>
