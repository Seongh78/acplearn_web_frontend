<template lang="html">
<div class="">



    <div class="graphContainer" style="">
        <!-- <div class="sessionItem">
            <div class="sessionTitle">
                <h4>asd</h4>
            </div>

            <div class="scoreItems">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
            </div>

        </div>


        <div class="sessionItem">
            <div class="sessionTitle">
                <h4>asd</h4>
            </div>

            <div class="scoreItems">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
            </div>

        </div> -->

        <div class="sessionItem start" style="position:fixed; z-index:99; backend:#fff">
            <div class="sessionTitle">
                <h4>사전평가</h4>
            </div>

            <div class="scoreItems">
                <div class="item">
                    <p class="acplearnDay">-</p>
                    <div class="score">
                    </div>

                    <div class="scoreTable">
                        <p class="gapScore">GAP</p>
                        <p class="selfScore">SELF</p>
                        <p class="othersScore">OTHERS</p>
                    </div>
                </div>
            </div>
        </div>



        <!-- 반복데이터 -->
        <div class="repeatSession">
        <div class="sessionItem " v-for="(sess, sid)  in  sessions">

            <div class="sessionTitle">
                <h4>{{ sess.ls_seq }}차시 - {{ sess.ls_startDate }} ~ {{ sess.ls_endDate }}</h4>
            </div>

            <!-- <div class="bgLine"></div> -->
            <div class="scoreItems">

                <div class="item" v-for="(sc, scid) in  score" v-if="sc.ls_seq===sess.ls_seq">

                    <p class="acplearnDay">{{scid+1}}일차</p>
                    <div class="score">
                        <div class="scoreShape self"></div>
                        <div class="scoreShape others"></div>
                    </div>

                    <div class="scoreTable">
                        <p class="gapScore">{{ sc.avgOthersScore.toFixed(0) - sc.avgSelfScore.toFixed(0) }}</p>
                        <p class="selfScore">{{ sc.avgSelfScore.toFixed(0) }}</p>
                        <p class="othersScore">{{ sc.avgOthersScore.toFixed(0) }}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>





        <div class="sessionItem end" style="position:fixed; z-index:99;">
            <div class="sessionTitle">
                <h4>평균</h4>
            </div>

            <div class="scoreItems">
                <div class="item">
                    <p class="acplearnDay">-</p>
                    <div class="score">
                        <!-- <div class="scoreShape self"></div>
                        <div class="scoreShape others"></div> -->
                    </div>
                    <div class="scoreTable">
                        <p class="gapScore">1</p>
                        <p class="selfScore">2</p>
                        <p class="othersScore">3</p>
                    </div>
                </div>
            </div>
        </div>

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
            "lad_date": "2018-04-01",
            "avgSelfScore": 3,
            "avgOthersScore": 4,
            "ls_seq" : 1
            },
            {
            "lad_date": "2018-04-02",
            "avgSelfScore": 2,
            "avgOthersScore": 3,
            "ls_seq" : 1
            },
            {
            "lad_date": "2018-04-03",
            "avgSelfScore": 3,
            "avgOthersScore": 4,
            "ls_seq" : 1
            },
            {
            "lad_date": "2018-04-04",
            "avgSelfScore": 1,
            "avgOthersScore": 2,
            "ls_seq" : 1
            },
            {
            "lad_date": "2018-04-05",
            "avgSelfScore": 4,
            "avgOthersScore": 3,
            "ls_seq" : 1
            },
            {
            "lad_date": "2018-04-06",
            "avgSelfScore": 3,
            "avgOthersScore": 4,
            "ls_seq" : 2
            },
            {
            "lad_date": "2018-04-07",
            "avgSelfScore": 3,
            "avgOthersScore": 2,
            "ls_seq" : 2
            },
            {
            "lad_date": "2018-04-08",
            "avgSelfScore": 3,
            "avgOthersScore": 4,
            "ls_seq" : 2
            },
            {
            "lad_date": "2018-04-09",
            "avgSelfScore": 3,
            "avgOthersScore": 4,
            "ls_seq" : 2
            },
            {
            "lad_date": "2018-04-10",
            "avgSelfScore": 3,
            "avgOthersScore": 3,
            "ls_seq" : 2
            },
            {
            "lad_date": "2018-04-11",
            "avgSelfScore": 3,
            "avgOthersScore": 2,
            "ls_seq" : 2
            },
            {
            "lad_date": "2018-04-12",
            "avgSelfScore": 4,
            "avgOthersScore": 3,
            "ls_seq" : 3
            },
            {
            "lad_date": "2018-04-13",
            "avgSelfScore": 4,
            "avgOthersScore": 5,
            "ls_seq" : 3
            },
            {
            "lad_date": "2018-04-14",
            "avgSelfScore": 3,
            "avgOthersScore": 4,
            "ls_seq" : 3
            },
            {
            "lad_date": "2018-04-15",
            "avgSelfScore": 2,
            "avgOthersScore": 4,
            "ls_seq" : 3
            },
            {
            "lad_date": "2018-04-16",
            "avgSelfScore": 2,
            "avgOthersScore": 3,
            "ls_seq" : 3
            },
            {
            "lad_date": "2018-04-17",
            "avgSelfScore": 4.6667,
            "avgOthersScore": 3.6667,
            "ls_seq" : 4
            },
            {
            "lad_date": "2018-04-18",
            "avgSelfScore": 2.75,
            "avgOthersScore": 3,
            "ls_seq" : 4
            },
            {
            "lad_date": "2018-04-19",
            "avgSelfScore": 2,
            "avgOthersScore": 3,
            "ls_seq" : 4
            },
            {
            "lad_date": "2018-04-20",
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
        height: 375px;
        position: absolute;
        display: flex;
    }
    .graphContainer .sessionItem{
        border: 1px solid #d3d3d3;
        border-right:none;
        background: #fff;
    } .graphContainer .sessionItem:last-child{ border-right: 1px solid #d3d3d3; }

    .sessionTitle{
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #d3d3d3;
        text-align: center;
        padding:1%;
    }


    .scoreItems{
        display: flex;
        text-align: center;

    }
    .repeatSession{
        display: flex;
        margin-left: 83px !important;
    }
    .scoreItems .item{
        width: 85px;
        height: 215px;
        border-bottom: 1px solid #d3d3d3;
        /*padding:10px;*/
    }

    .acplearnDay{
        height: 20px;
        padding:5px;
    }

    /* 점수 */
    .scoreItems .item .score {
        height: 180px;
        display: flex;
        text-align: center;
        justify-content:center;
    }
    /* 점수막대 */
    .scoreItems .item .score .scoreShape{
        width: 10px;
        height: 100px;
        color:#fff;
        margin-left: 1px;
        border-radius: 35px 35px 0 0;
        bottom:120px !important;
        position: absolute;
    }

    .scoreShape.self{ background: #12baed; }
    .scoreShape.others{ background: #95e811; }





</style>
