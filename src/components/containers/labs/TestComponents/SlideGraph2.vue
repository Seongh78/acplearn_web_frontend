<template lang="html">
<div class="graphContainer" style="position:relative;">


    <div class="" style="display:flex; position:relative;">


        <!-- ===== 사전 ===== -->
        <div style="position:fixed; margin-left:-1px;  z-index:99; background:#fff; box-shadow:3px 1px 4.5px 0 rgba(0,0,0, 0.15); " >
            <div class="sessionHeader" style="width:100%; min-width:100px; height:64px; padding:20px;">
                <p>사전점수</p>
            </div>

            <div class="" style="display:flex; width:100%; margin">
                <div class="scoreRepeat" style="widh:100%;">
                    <div class="">

                        <div class="graphBody">
                            <div class="back">
                                <hr class="bgLine">
                                <hr class="bgLine">
                                <hr class="bgLine">
                                <hr class="bgLine">
                                <hr class="bgLine">
                            </div>

                            <div class="selfScore" style="margin-left:0;"></div>
                            <!-- <div class="othersScore"></div> -->
                        </div>
                    </div>

                    <!--  -->
                    <div class="scoreTable">
                        <p class="gapTitle">GAP</p>
                        <p class="selfTitle">자가평가</p>
                        <p class="othersTitle">팀원평가</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- ===== 사전 ===== -->








        <div class="scsc" style="display:flex; width:100%;">
            <div style="border-right:1px solid rgba(0,0,0,0.2);"  v-for="(sess, sid)  in  sessions" >
                <div class="sessionHeader" style="width:100%;">
                    <p>{{ sess.ls_seq }}차시 - {{ sess.ls_startDate }} ~ {{ sess.ls_endDate }}</p>
                </div>

                <div class="" style="display:flex; width:100%;">
                    <div class="scoreRepeat" v-for="(sc, scid) in  score" v-if="sc.ls_seq===sess.ls_seq">
                            <div class="">
                                <div class="graphHeader">
                                    <p>{{sc.lad_date}}</p>
                                </div>

                                <div class="graphBody">
                                    <div class="back">
                                        <hr class="bgLine">
                                        <hr class="bgLine">
                                        <hr class="bgLine">
                                        <hr class="bgLine">
                                        <hr class="bgLine">
                                    </div>

                                    <div class="selfScore" :style="{height: sc.avgSelfScore.toFixed(1)/5*100 +'%'}"></div>
                                    <div class="othersScore" :style="{height: sc.avgOthersScore.toFixed(1)/5*100 +'%'}"></div>
                                </div>
                            </div>

                            <!--  -->
                            <div class="scoreTable">
                                <p class="gapTitle">{{( sc.avgOthersScore.toFixed(1) - sc.avgSelfScore.toFixed(1)).toFixed(1) }}</p>
                                <p class="selfTitle">{{ sc.avgSelfScore.toFixed(1) }}</p>
                                <p class="othersTitle">{{ sc.avgOthersScore.toFixed(1) }}</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>








        <!-- ===== 평균 ===== -->
        <div style=" z-index:99; background:#fff; box-shadow:-3px 1px 4.5px 0 rgba(0,0,0, 0.15);" >
            <div class="sessionHeader" style="width:100%; min-width:100px; height:64px; padding:20px;">
                <p>평균</p>
            </div>

            <div class="" style="display:flex; width:100%;">
                <div class="scoreRepeat" style="widh:100%;">
                    <div class="">

                        <div class="graphBody">
                            <div class="back">
                                <hr class="bgLine">
                                <hr class="bgLine">
                                <hr class="bgLine">
                                <hr class="bgLine">
                                <hr class="bgLine">
                            </div>

                            <div class="selfScore"></div>
                            <div class="othersScore"></div>
                        </div>
                    </div>

                    <!--  -->
                    <div class="scoreTable">
                        <p class="gapTitle">GAP</p>
                        <p class="selfTitle">자가평가</p>
                        <p class="othersTitle">팀원평가</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- ===== 평균 ===== -->




    </div>
</div>
</template>





<script>
const name = ''

export default {
    name: name,


    // ===== Props ===== //
    props:[],



    // ===== Data ===== //
    data(){ return {
        score: [
            {
            "lad_date": "04-01",
            "avgSelfScore": 3,
            "avgOthersScore": 4,
            "ls_seq" : 1
            },
            {
            "lad_date": "04-02",
            "avgSelfScore": 2,
            "avgOthersScore": 3,
            "ls_seq" : 1
            },
            {
            "lad_date": "04-03",
            "avgSelfScore": 3,
            "avgOthersScore": 4,
            "ls_seq" : 1
            },
            {
            "lad_date": "04-04",
            "avgSelfScore": 1,
            "avgOthersScore": 2,
            "ls_seq" : 1
            },
            {
            "lad_date": "04-05",
            "avgSelfScore": 4,
            "avgOthersScore": 3,
            "ls_seq" : 1
            },
            {
            "lad_date": "04-06",
            "avgSelfScore": 3,
            "avgOthersScore": 4,
            "ls_seq" : 2
            },
            {
            "lad_date": "04-07",
            "avgSelfScore": 3,
            "avgOthersScore": 2,
            "ls_seq" : 2
            },
            {
            "lad_date": "04-08",
            "avgSelfScore": 3,
            "avgOthersScore": 4,
            "ls_seq" : 2
            },
            {
            "lad_date": "04-09",
            "avgSelfScore": 3,
            "avgOthersScore": 4,
            "ls_seq" : 2
            },
            {
            "lad_date": "04-10",
            "avgSelfScore": 3,
            "avgOthersScore": 3,
            "ls_seq" : 2
            },
            {
            "lad_date": "04-11",
            "avgSelfScore": 3,
            "avgOthersScore": 2,
            "ls_seq" : 2
            },
            {
            "lad_date": "04-12",
            "avgSelfScore": 4,
            "avgOthersScore": 3,
            "ls_seq" : 3
            },
            {
            "lad_date": "04-13",
            "avgSelfScore": 4,
            "avgOthersScore": 5,
            "ls_seq" : 3
            },
            {
            "lad_date": "04-14",
            "avgSelfScore": 3,
            "avgOthersScore": 4,
            "ls_seq" : 3
            },
            {
            "lad_date": "04-15",
            "avgSelfScore": 2,
            "avgOthersScore": 4,
            "ls_seq" : 3
            },
            {
            "lad_date": "04-16",
            "avgSelfScore": 2,
            "avgOthersScore": 3,
            "ls_seq" : 3
            },
            {
            "lad_date": "04-17",
            "avgSelfScore": 4.6667,
            "avgOthersScore": 3.6667,
            "ls_seq" : 4
            },
            {
            "lad_date": "04-18",
            "avgSelfScore": 2.75,
            "avgOthersScore": 3,
            "ls_seq" : 4
            },
            {
            "lad_date": "04-19",
            "avgSelfScore": 2,
            "avgOthersScore": 3,
            "ls_seq" : 4
            },
            {
            "lad_date": "04-20",
            "avgSelfScore": 2,
            "avgOthersScore": 5,
            "ls_seq" : 4
            }
        ],
        //
        sessions: [
            {
                ls_startDate:'2018-01-01',
                ls_endDate:'2018-01-01',
                ls_seq: 1
            },
            {
                ls_startDate:'2018-02-01',
                ls_endDate:'2018-02-01',
                ls_seq: 2
            },
            {
                ls_startDate:'2018-03-01',
                ls_endDate:'2018-03-01',
                ls_seq: 3
            },
            {
                ls_startDate:'2018-04-01',
                ls_endDate:'2018-04-01',
                ls_seq: 4
            },
        ]

    }},



    // ===== Created ===== //
    created(){

    },



    // ===== Updated ===== //
    updated(){

    },



    // ===== Methods ===== //
    methods:{

    },

}
</script>








<style lang="css">


    .graphContainer{
        height: 100%;
        position: relative;
        /*border: 1px solid #e1e1e1;*/
        display: flex;
        text-align: center;
    }


    /* 회차 기간 */
    .sessionHeader{
        height: 30px;
        padding:5px 15px;
        background: #f1f1f1;
    }


    .scsc{
        margin-left:100px;
    }


    /* 그래프 */
    .scoreRepeat{
        position:relative;
        min-width:70px;
        width:100%;
        border-left:1px solid rgba(0,0,0, 0.05);
    }
        .graphHeader{
            padding:7px;
            border-bottom: 1px solid #f1f1f1;
            position: relative;
        }

        .graphBody {
            display: flex;
            justify-content: center;
            position: relative;
            bottom: 0;
            width: 100%;
            height: 185px;
        }

            .selfScore, .othersScore{
                position: absolute;
                width: 7px;
                height: 20%;
                bottom:0;
                z-index: 50;
                border-radius: 15px 15px 0 0 ;
            }
            .selfScore{
                background-color: #9FC93C;
                margin-left: -3px;
            }
                .selfTitle{
                    color:#fff;
                    background: #9FC93C !important;
                }
            .othersScore{
                background-color: #3DB7CC;
                margin-left: 5px;
            }
                .othersTitle{
                    color:#fff;
                    background: #3DB7CC !important;
                }

            .back{
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 100%;
            }
            .back hr{
                position: absolute;
                margin:0;
                border:none;
                border-top: 1px dotted #333;
                opacity: .12;
            }
                .back hr:nth-child(1){ bottom:100%; }
                .back hr:nth-child(2){ bottom:80%; }
                .back hr:nth-child(3){ bottom:60%; }
                .back hr:nth-child(4){ bottom:40%; }
                .back hr:nth-child(5){ bottom:20%; }

    /* 점수표 */
    .scoreTable{
        /*bottom:0;*/
        position: relative;
    }
        .scoreTable p{
            border-left : none !important;
            border-right : none !important;
            border-bottom : none !important;
            border-top: 1px solid rgba(0, 0, 0, 0.08) !important;
        }



            /* 배경 점수줄 */
            .bgLine{
                border-bottom: 1px dotted #333;
                margin-top: 10px;
                width: 100%;
                /*position: absolute;*/
            }


                .scoreTable p{
                    border-top: 1px solid #d3d3d3;
                    border-right: 1px solid #d3d3d3;
                    background: #fff;
                    padding:10px;
                    margin:0;
                }

</style>
