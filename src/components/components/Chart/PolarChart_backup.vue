<template lang="html">
<div class="">

    <highcharts :options="options" style="height:250px;"></highcharts>

</div>
</template>

<script>
export default {



    // ===== Data ===== //
    data(){ return {
        sess:[],
        chartData:[], // 차트데이터

        options: {
            chart: {
                polar: true,
                type: 'line'
            },

            title: {
                text: null,
                // x: -80
            },

            pane: {
                size: '75%'
            },

            credits: {
                enabled: false
            },


            xAxis: {
                categories: ['Sales', 'Marketing', 'Development', 'Customer', 'Admin'],
                tickmarkPlacement: 'on',
                lineWidth: 0
            },

            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },

            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
            },

            // legend: {
            //     // x: -100,
            //     y: -140
            // },

            series: [
                {
                    name: '자가',
                    data: [5, 2, 3, 4, 5],
                    pointPlacement: 'on',
                    color:'#7cb5ec'
                },
                {
                    name: '팀원',
                    data: [2, 3, 4, 4, 2],
                    pointPlacement: 'on',
                    color:'#90ed7d'
                },
                {
                    name: 'GAP',
                    data: [5, 3, 4, 3, 2],
                    pointPlacement: 'on',
                    color:'#FF8224'
                }
            ]
        }, // options


    }},
    // ===== Data ===== //
}
</script>

<style lang="css">
</style>
