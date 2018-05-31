<template lang="html">
<div class="">

    <highcharts :options="options" style="height:300px;"></highcharts>

</div>
</template>

<script>
export default {
    name : 'PolarChart',


    // ===== Props ===== //
    props:[
        'data', // 차트데이터
        'size', // 크기  단위:%
        'marginTop'
    ],




    // ===== Created ===== //
    created(){
        // console.log(this.data);
        this.chartMaker(this.data)

        // 크기를 수동으로 입력했을경우
        if (this.size) {
            this.$set(this.options.pane, 'size', this.size)
            // console.log('this.options.pane.size : ',this.options.pane.size);
        }

        // Margin top size
        if (this.marginTop) {
            this.$set(this.options.chart, 'marginTop', this.marginTop)
            // console.log('this.options.pane.size : ',this.options.pane.size);
        }
    },





    // ===== Data ===== //
    data(){ return {
        sess:[],
        chartData:[], // 차트데이터

        options: {
            // top:110,
            chart: {
                polar: true,
                type: 'line',
                marginTop:50
            },

            title: {
                text: null,
                // x: -80
            },

            pane: {
                // size: '75%'
            },

            credits: {
                enabled: false
            },


            xAxis: {
                categories: ["커뮤니케이션", "고객응대", "상담"],
                tickmarkPlacement: 'on',
                lineWidth: 0
            },

            yAxis: {

                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max:5,
                tickAmount: 5,
                // labels: {
                //         formatter () { return this.value + '점'; }
                //     },
            },

            tooltip: {
                shared: true,
            },


            series: []
        }, // options


    }},
    // ===== Data ===== //






    // ===== Methods ===== //
    methods : {

        chartMaker(cd){
            /*
            cd : 차트데이터가 담긴 객체배열
            */
            var tempSeries = []
            var tempCategories = []
            var avgSelfScore=[] , avgOthersScore=[], avgGap=[], beforeScore=[]

            // 하이차트 데이터 형태로 변환
            var self=0, others=0
            for(var ii  in  cd){
                // 자가평가 점수
                self = (cd[ii].avgSelfScore==null || cd[ii].avgSelfScore==undefined) ? 0 : cd[ii].avgSelfScore
                // 팀원평가 점수
                others = (cd[ii].avgOthersScore==null || cd[ii].avgOthersScore==undefined) ? 0 : cd[ii].avgOthersScore
                // 사전평가 점수
                beforeScore = (cd[ii].avgBeforeScore==null || cd[ii].avgBeforeScore==undefined) ? 0 : cd[ii].avgBeforeScore

                // 임시모델로 푸시
                avgSelfScore.push( self )
                avgOthersScore.push(others)
                // avgGap.push( others - self )
                avgGap.push( beforeScore )
                // 항목푸시
                tempCategories.push(cd[ii].cc2_name)
            }// for

            tempSeries = [
                {
                    name: '자가',
                    data: avgSelfScore,
                    pointPlacement: 'on',
                    color:'#7cb5ec'
                },
                {
                    name: '팀원',
                    data: avgOthersScore,
                    pointPlacement: 'on',
                    color:'#90ed7d'
                },
                {
                    name: '사전점수',
                    data: avgGap,
                    pointPlacement: 'on',
                    color:'#FF8224'
                }
            ]

            // for(var ii  in  tempSeries){
            //     console.log('sid : ', ii);
            // }
            // console.log(this.tempSeries);
            this.$set(this.options, 'series', tempSeries)
            this.$set(this.options.xAxis, 'categories', tempCategories)
        }// chartMaker

    },
}
</script>

<style lang="css">
</style>
