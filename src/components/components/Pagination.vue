<template lang="html">
<div class="">


    <table class="ui table celled ">
        <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>age</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(usr, id) in selList">
                <td>{{usr.id}}</td>
                <td>{{usr.name}}</td>
                <td>{{usr.age}}</td>
            </tr>
        </tbody>
    </table>


    <div class="ui centered pagination menu">
        <a class="icon item" @click.prevent="sel(thisPage-1)"><i class="left chevron icon"></i></a>
        <!-- <a class="item" v-for="(ii) in pag.pnTotal" @click.prevent="sel(ii)" v-bind:class="[ii==thisPage?'active':'']">{{ ii }}</a> -->
        <a class="item" v-for="(ii) in pag.pnTotal" @click.prevent="sel(ii)" v-bind:class="[ii==thisPage?'active':'']">{{ ii }}</a>
        <a class="icon item" @click.prevent="sel(thisPage+1)"><i class="right chevron icon"></i></a>
    </div>


    <div class="" v-for="(jj) in  [1,5]">
        {{ jj }}
    </div>

</div>
</template>




<script>
const name = 'Pagination'
export default {
    name: name,

    data(){
        return {
            thisPage:1,

            pag:{},

            selList:[],

            allCount : 13,
            pageLimitCount : 3,
            navLimitCount: 5,
            list : [
                { id:1, name: 'David', age:20 },
                { id:2, name: 'Kelly', age:21 },
                { id:3, name: 'John', age:22 },
                { id:4, name: 'Bakham', age:23 },
                { id:5, name: 'Pirlo', age:24 },
                { id:6, name: 'Ronaldo', age:25 },
                { id:7, name: 'Son', age:26 },
                { id:8, name: 'Sala', age:27 },
                { id:9, name: 'Toress', age:28 },
                { id:10, name: 'Silva', age:29 },
                { id:11, name: 'Kane', age:30 },
                { id:12, name: 'Park', age:31 },
                { id:13, name: 'Rooney', age:32 },
                { id:14, name: 'David', age:20 },
                { id:15, name: 'Kelly', age:21 },
                { id:16, name: 'John', age:22 },
                { id:17, name: 'Bakham', age:23 },
                { id:18, name: 'Pirlo', age:24 },
                { id:19, name: 'Ronaldo', age:25 },
                { id:20, name: 'Son', age:26 },
                { id:21, name: 'Sala', age:27 },
                { id:22, name: 'Toress', age:28 },
                { id:23, name: 'Silva', age:29 },
                { id:24, name: 'Kane', age:30 },
                { id:25, name: 'Park', age:31 },
                { id:26, name: 'Rooney', age:32 },
                { id:27, name: 'David', age:20 },
                { id:28, name: 'Kelly', age:21 },
                { id:29, name: 'John', age:22 },
                { id:30, name: 'Bakham', age:23 },
                { id:31, name: 'Pirlo', age:24 },
                { id:6, name: 'Ronaldo', age:25 },
                { id:7, name: 'Son', age:26 },
                { id:8, name: 'Sala', age:27 },
                { id:9, name: 'Toress', age:28 },
                { id:10, name: 'Silva', age:29 },
                { id:11, name: 'Kane', age:30 },
                { id:12, name: 'Park', age:31 },
                { id:13, name: 'Rooney', age:32 },
            ]
        }
    }, // data




    created(){
        var pageNum = this.thisPage // 현재 페이지 번호 쿼리스트링으로 값을 받는다.

        var contentSize = 5; // 페이지에서 보여줄 컨텐츠 개수 설정
        var totalCount = this.list.length // 전체 개수

        var pnTotal= Math.ceil( totalCount / contentSize ) // 페이지네이션의 전체 카운트 구하기
        var pnSize = 5 // 페이지네이션 보여줄 개수 설정
        var pnStart= ((Math.ceil(pageNum/pnSize) - 1) * pnSize) + 1 // 현재 페이지의 페이지네이션 시작 번호
        var pnEnd= 5 // 현재 페이지의 페이지네이션 끝 번호

        this.$set(this, 'pag', {
            pageNum,
            contentSize,
            totalCount,
            pnTotal,
            pnSize,
            pnStart,
            pnEnd
        })


        this.$set(this, 'selList', this.list.slice(0, contentSize))
        console.log('pnTotal : ', pnTotal);
    }, //created




    methods: {

        sel(id){
            var sel = id-1
            sel = sel * this.pag.contentSize
            this.$set(this, 'selList', this.list.slice(sel, sel+this.pag.contentSize))
            this.$set(this, 'thisPage', id)
        }, // sel

    }, // methods
}
</script>





<style lang="css">
</style>
