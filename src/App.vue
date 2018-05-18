<template>
    <div id="app " class="">
        <router-view />
    </div>
</template>

<script>
    // import  {Footer}  from '@/components/components'
    export default {
        name: 'App',
        // components: { "foot-bar":Footer }

        created(){
            // this.autoLogin()
        },

        updated(){
            // this.autoLogin()
        },

        methods: {
            // 자동로그인
            autoLogin(){
                this.$http.get('/api/users/session')
                .then(res=>{
                    console.log('Auto Login OK');
                }).catch(e=>{
                    this.$http.post('/api/users/login', {id:'admin',pw:'123123'})
                    .then(resp=>{
                    })
                })
            }
        }// methods
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        min-width: 1100px !important;
    }

    .container-limit{
        max-width: 1200px;
    }

    .mainBanner{
        background: #3b485f;
        color:#fff;
        background-image: url('http://localhost:3000/images/newbg.png');
        background-size: cover;
        background-position: top center;
    }

    #mcon{
        width: 100%;
        min-width: 900px;
        margin:0 auto;
        padding:0;
        /*height: 100%;*/
    }
        .sloganWrap{
            color:#fff;
            width: 70%;
            margin:0 auto;
            padding: 3.5% 5%;
            text-align: center;
        }
        .sch{
            width:100%; padding:15px;
            background: rgba(255,255,255,0.07);
            border:1px solid #fff;
            color: #fff;

        }

    .cardbox{
        background: #fff;
        margin:10px;
        padding:10px;
        box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.08) !important;
    }


    .tdTitle{
        font-weight: bold;
        background: #f7f7f7;
    }




    th{
        background: #F9FAFB;
        padding:0.92857143em 0.78571429em;
    }
    .borderBottom{
        border-bottom: 1px solid rgba(34, 36, 38, 0.1) !important;
    }
    .borderTop{
        border-top: 1px solid rgba(34, 36, 38, 0.1) !important;
    }



    .viewLoadAnimation {
        animation:fade-in-fwd .55s cubic-bezier(.39,.575,.565,1.000) both
    }
    @keyframes fade-in-fwd{
        0%{
            transform:translateZ(-80px);
            opacity:0
            }
            100%{
                transform:translateZ(0);
                opacity:1
            }
    }



    .cursorPointer {
        cursor: pointer !important;
    }

    .nonePadding{
        padding:0 !important;
    }
    .noneMargin{
        margin:0 !important;
    }
    .noneBorder{
        border:none !important;
    }
    .noneBorder-vertical{
        border-top:none !important;
        border-bottom:none !important;
    }
    .noneBorder-horizental{
        border-left:none !important;
        border-right:none !important;
    }


    .opacity2{ opacity: .2; }
    .opacity3{ opacity: .3; }
    .opacity4{ opacity: .4; }
    .opacity5{ opacity: .5; }
    .opacity6{ opacity: .6; }
    .opacity7{ opacity: .7; }
    .opacity8{ opacity: .8; }




    .viewLoadAnimationTop { animation:fade-in-top .3s cubic-bezier(.39,.575,.565,1.000) both }
    @keyframes fade-in-top{0%{transform:translateY(-30px);opacity:0}100%{transform:translateY(0);opacity:1}}
</style>
