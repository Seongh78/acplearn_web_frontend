<template lang="html">
<div class="graphContainer" style="position:relative;">


<!--

사용데이터 :

props

    'chart' , //=> 표시할 데이터
    예시)
    [
        {
            lad_date: '2018-01-01' ,
            avgSelfScore: 5,
            avgOthersScore: 4
        },
        {
            lad_date: '2018-01-02' ,
            avgSelfScore: 3,
            avgOthersScore: 5
        }
    ]
 -->




    <div class="" style="display:flex; position:relative;">


        <!-- ===== 사전 ===== -->
        <div style=" margin-left:-1px;  z-index:99; background:#fff; box-shadow:3px 1px 4.5px 0 rgba(0,0,0, 0.15); " >
            <div class="sessionHeader" style="width:100%; min-width:50px; height:50px; padding:15px 0;">
                <p>사전</p>
            </div>

            <div class="" style="display:flex; width:100%; margin">
                <div class="scoreRepeat" style="widh:100%;">
                    <div class="">

                        <div class="graphBody">
                            <div class="back ">
                                <hr class="bgLine ">
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
                        <p class="gapTitle">-</p>
                        <p class="selfTitle">자가</p>
                        <p class="othersTitle">-</p>
                    </div>
                </div>
            </div>
        </div>


        <!-- <div style="position:fixed; margin-left:-1px;  z-index:99; background:#fff; box-shadow:3px 1px 4.5px 0 rgba(0,0,0, 0.15); " > -->
        <div style=" margin-left:-1px;  z-index:99; background:#fff; box-shadow:3px 1px 4.5px 0 rgba(0,0,0, 0.15); " >
            <div class="sessionHeader" style="width:100%; min-width:50px; height:50px; padding:20px 15px; ">
                <p>&nbsp;</p>
            </div>

            <div class="" style="display:flex; width:100%; margin">
                <div class="scoreRepeat" style="widh:100%;">
                    <div class="">

                        <div class="graphBody">
                            <div class="back ">
                                <hr class="bgLine ">
                                <hr class="bgLine">
                                <hr class="bgLine">
                                <hr class="bgLine">
                                <hr class="bgLine">
                            </div>

                            <ui class="scoreNumber">
                                <li>5</li>
                                <li>4</li>
                                <li>3</li>
                                <li>2</li>
                                <li>1</li>
                                <!-- <li>0</li> -->
                            </ui>

                            <div class="selfScore" style="margin-left:0;"></div>
                            <!-- <div class="othersScore"></div> -->
                        </div>
                    </div>

                    <!--  -->
                    <div class="scoreTable">
                        <p class="gapTitle">GAP</p>
                        <p class="selfTitle">자가</p>
                        <p class="othersTitle">팀원</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- ===== 사전 ===== -->








        <div class="scsc" style="display:flex; width:100%;">

            <!-- 월 또는 회차 반복 시 Props로 받아서 이 부분에서 반복 -->
            <div style="border-right:1px solid rgba(0,0,0,0.2);"  >
                <div class="sessionHeader" style="width:100%;">
                    <!-- <p>{{ sess.ls_seq }}차시 - {{ sess.ls_startDate }} ~ {{ sess.ls_endDate }}</p> -->
                    <p>-</p>
                </div>

                <div class="scale-in-hor-left" style="display:flex; width:100%;">

                    <!-- 일별 데이터 반복부분 -->
                    <div class="scoreRepeat "  v-for="(sc, scid)  in  chart" :key="scid">
                            <div class="">
                                <div class="graphHeader">
                                    <p>{{ sc.lad_date }}</p>
                                </div>

                                <div class="graphBody">
                                    <!-- 배경라인 -->
                                    <div class="back viewLoadAnimationTop">
                                        <hr class="bgLine">
                                        <hr class="bgLine">
                                        <hr class="bgLine">
                                        <hr class="bgLine">
                                        <hr class="bgLine">
                                    </div>

                                    <!-- 막대 그래프 -->

                                        <!-- 자가평가 -->
                                        <div class="selfScore viewLoadAnimation" :style="{height: (sc.avgSelfScore!=null || sc.avgSelfScore!=undefined ? (sc.avgSelfScore.toFixed(1)/5*100) : 0) +'%'} "></div>

                                        <!-- 팀원평가 -->
                                        <div class="othersScore viewLoadAnimation" :style="{height: (sc.avgOthersScore!=null ? (sc.avgOthersScore.toFixed(1)/5*100) : 0) +'%'}"></div>

                                    <!-- 막대 그래프 -->

                                </div>
                            </div>

                            <!-- 점수표 -->
                            <div class="scoreTable">
                                <p class="gapTitle">
                                {{
                                    (sc.avgSelfScore != null  ||  sc.avgSelfScore != undefined) &&
                                    (sc.avgOthersScore != null  ||  sc.avgOthersScore != undefined) ?
                                    (sc.avgOthersScore.toFixed(1) - sc.avgSelfScore.toFixed(1)).toFixed(1) :
                                    0
                                }}
                                </p>
                                <p class="selfTitle">
                                    {{ sc.avgSelfScore!=null  ||  sc.avgSelfScore!=undefined ? (sc.avgSelfScore.toFixed(1)) : 0 }}
                                </p>
                                <p class="othersTitle">
                                    {{ sc.avgOthersScore!=null  ||  sc.avgOthersScore!=undefined ? (sc.avgOthersScore.toFixed(1)) : 0 }}
                                </p>
                            </div>
                    </div>
                    <!-- 일별 데이터 반복부분 -->

                </div>
            </div>
        </div>








        <!-- ===== 평균 ===== -->
        <div style=" z-index:99; background:#fff; box-shadow:-3px 1px 4.5px 0 rgba(0,0,0, 0.15);" >
            <div class="sessionHeader" style="width:100%; min-width:80px; height:50px; padding:20px;">
                <p>평균</p>
            </div>

            <div class="" style="display:flex; width:100%;">
                <div class="scoreRepeat" style="widh:100%;">
                    <div class="">

                        <div class="graphBody">
                            <div class="back viewLoadAnimationTop">
                                <hr class="bgLine">
                                <hr class="bgLine">
                                <hr class="bgLine">
                                <hr class="bgLine">
                                <hr class="bgLine">
                            </div>

                            <div class="selfScore viewLoadAnimation" :style="{height: avgSelfAll.toFixed(1)/5*100 +'%'}"></div>
                            <div class="othersScore viewLoadAnimation" :style="{height: avgOthersAll.toFixed(1)/5*100 +'%'}"></div>
                        </div>
                    </div>

                    <!--  -->
                    <div class="scoreTable">
                        <p class="gapTitle">{{ (avgOthersAll - avgSelfAll).toFixed(1) }}</p>
                        <p class="selfTitle">{{ avgSelfAll.toFixed(1) }}</p>
                        <p class="othersTitle">{{ avgOthersAll.toFixed(1) }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- ===== 평균 ===== -->




    </div>



</div>
</template>





<script>
export default {
    name: 'SlideGraph',


    // ===== Props ===== //
    props:[
        'chart', // 그래프데이터
        'sessionData', // 회차정보

    ],



    // ===== Data ===== //
    data(){ return {
        avgSelfAll : 0, // 전체평균
        avgOthersAll : 0, // 전체평균

        ddd:[]
    }},



    // ===== Created ===== //
    created(){
        // this.avgFunc()
    },



    // ===== Updated ===== //
    updated(){
        // this.avgFunc()

    },




    // ===== Mounted ===== //
    mounted(){
    },





    // ===== Methods ===== //
    methods:{

        // 전체평균
        avgFunc(){
            var sumSelf = 0, sumOthers=0
            // var temp = Object.keys(this.chart)
            for(var ii  in  this.chart){
                sumSelf+=Number(this.chart[ii].avgSelfScore)
                sumOthers+=Number(this.chart[ii].avgOthersScore)
            }
            this.$set(this, 'avgSelfAll', sumSelf / this.chart.length)
            this.$set(this, 'avgOthersAll', sumOthers / this.chart.length)
        }//

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
        /*margin-left:100px;*/
    }


    /* 그래프 */
    .scoreRepeat{
        position:relative;
        min-width:50px;
        width:100%;
        border-left:1px solid rgba(0,0,0, 0.05);
    }
        .graphHeader{
            padding:0px;
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
                height: 0%;
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


            .scoreNumber{
                position: absolute;
                list-style: none;
                line-height: 180%;
                margin-top: -8px;
                right:-3px;
                text-align: right;
                padding-right: 4.5px;
                font-size: 1.45em;
                opacity: .25;
                z-index: 95;
            }

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



    .scale-in-hor-left{-webkit-animation:scale-in-hor-left .5s cubic-bezier(.25,.46,.45,.94) both;animation:scale-in-hor-left .5s cubic-bezier(.25,.46,.45,.94) both}

    @-webkit-keyframes scale-in-hor-left{0%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:0 0;transform-origin:0 0;opacity:1}100%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:0 0;transform-origin:0 0;opacity:1}}@keyframes scale-in-hor-left{0%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:0 0;transform-origin:0 0;opacity:1}100%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:0 0;transform-origin:0 0;opacity:1}}
</style>
