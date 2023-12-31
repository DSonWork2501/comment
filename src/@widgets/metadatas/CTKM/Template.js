// Không có button
export const ImageTemplate= (entity) => {
    return `<div id="goto" class="landing-section" data-v-093160d5="" data-v-7e576160="">
                <div class="landing-section__overlay landing-section__overlay--disabled" data-v-093160d5=""></div>
                    <div class="landing-section__background" data-v-093160d5="">
                        <img src="${entity.desktopImageLink}" alt="" class="xs:hidden lg:block" data-v-093160d5="" />
                        <img src="${entity.mobileImageLink}" alt="" class="xs:block lg:hidden" data-v-093160d5="" />
                    </div>
                    <div class="landing-custom__wrapper" data-v-093160d5="">
                        <div class="landing-custom" style="margin-top: 30%; width: 56%;" data-v-093160d5=""></div>
                    </div>
            </div>`
}
// Web canh trái và mobile canh giữa
export const ImageButtonTemplate = (entity) => {
    return `<div id="" class="landing-section" data-v-093160d5="" data-v-4101ec36="">
                <div class="landing-section__overlay landing-section__overlay--left" data-v-093160d5=""></div>
                <div class="landing-section__background" data-v-093160d5="">
                    <img src="${entity.desktopImageLink}" alt="" class="xs:hidden lg:block" data-v-093160d5="" />
                    <img src="${entity.mobileImageLink}" alt="" class="xs:block lg:hidden" data-v-093160d5="" />
                </div>
                <div class="landing-container landing-container--lg" data-v-093160d5="">
                    <div class="landing-section__body landing-section__body--left mb:landing-section--mobile-middle" data-v-093160d5="">
                        <a href="${entity.buttons[0].url}" data-ela="${entity.buttons[0].name}" data-eca="ui" data-eac="click" class="landing-mt-4 lg:landing-mt-8 landing-button" data-v-4101ec36="" data-v-093160d5="">
                            ${entity.buttons[0].name}
                        </a>
                        <a href="${entity.buttons[1].url}" data-ela="Xem ngay" data-eca="ui" data-eac="click" class="landing-mt-4 lg:landing-mt-8 landing-button landing-ml-4 nuxt-link-active" data-v-4101ec36="" data-v-093160d5="">
                            ${entity.buttons[1].name}
                        </a>
                        <p class="landing-text-white-60 landing-tracking-wide landing-text-lg landing-mt-4" data-v-093160d5="" data-v-4101ec36="">
                            ${entity.short_description}
                        </p>
                    </div>
                </div>
            </div>`
}
// Hình ảnh và button canh giữa
export const ImageButtonTemplate2 = (entity) => {
    return `<div id="" class="landing-section" data-v-093160d5="" data-v-11983fc4="">
                <div class="landing-section__overlay landing-section__overlay--left" data-v-093160d5=""></div>
                <div class="landing-section__background" data-v-093160d5=""><img src="${entity.desktopImageLink}" alt="" class="xs:hidden lg:block" data-v-093160d5=""><img src="${entity.mobileImageLink}" alt="" class="xs:block lg:hidden" data-v-093160d5=""></div>
                <div class="landing-container landing-container--lg" data-v-093160d5="">
                <div class="landing-section__body landing-section__body--center mb:landing-seciont__body--mobile-bottom " data-v-093160d5="">
                    <a href="${entity.buttons[0].url}" data-ela="${entity.buttons[0].name}" data-eca="ui" data-eac="click" class="landing-mt-4 xs:landing-mt-8 lg:landing-mt-8 landing-button" data-v-11983fc4="" data-v-093160d5="">
                    ${entity.buttons[0].name}
                    </a>
                    <a href="${entity.buttons[1].url}" data-ela="${entity.buttons[1].name}" data-eca="ui" data-eac="click" class="landing-mt-4 lg:landing-mt-8 landing-button landing-ml-4" data-v-11983fc4="" data-v-093160d5="">
                    ${entity.buttons[1].name}
                    </a>
                    <p class="
                        landing-text-white-60
                        landing-tracking-wide
                        landing-text-lg
                        landing-mt-4
                        " data-v-093160d5="" data-v-11983fc4="">
                        ${entity.short_description}
                    </p>
                </div>
                </div>
            </div>`
}
// Web canh trái và mobile canh dưới
export const ImageButtonTemplate3 = (entity) => {

    return `<div id="" class="landing-section" data-v-093160d5="" data-v-4101ec36="">
                <div class="landing-section__overlay landing-section__overlay--left" data-v-093160d5=""></div>
                <div class="landing-section__background" data-v-093160d5="">
                    <img src="${entity.desktopImageLink}" alt="" class="xs:hidden lg:block" data-v-093160d5="" />
                    <img src="${entity.mobileImageLink}" alt="" class="xs:block lg:hidden" data-v-093160d5="" />
                </div>
                <div class="landing-container landing-container--lg" data-v-093160d5="">
                    <div class="landing-section__body landing-section__body--left mb:landing-section--mobile-bottom" data-v-093160d5="">
                        <a href="${entity.buttons[0].url}" data-ela="${entity.buttons[0].name}" data-eca="ui" data-eac="click" class="landing-mt-4 lg:landing-mt-8 landing-button" data-v-4101ec36="" data-v-093160d5="">
                            ${entity.buttons[0].name}
                        </a>
                        <a href="${entity.buttons[1].url}" data-ela="Xem ngay" data-eca="ui" data-eac="click" class="landing-mt-4 lg:landing-mt-8 landing-button landing-ml-4 nuxt-link-active" data-v-4101ec36="" data-v-093160d5="">
                            ${entity.buttons[1].name}
                        </a>
                        <p class="landing-text-white-60 landing-tracking-wide landing-text-lg landing-mt-4" data-v-093160d5="" data-v-4101ec36="">
                            ${entity.short_description}
                        </p>
                    </div>
                </div>
            </div>`
}
// thông tin khuyến mãi
export const PromotionTemplate = (entity, isTitle) => {
    let button_html = !isTitle && Array.isArray(entity.buttons) && entity.buttons.length > 0 ? entity.buttons.map(item => (
        `<a href="${item.url}" data-ela="Mua ngay" data-eca="ui" data-eac="click" class="landing-mt-4 xs:landing-mt-16 lg:landing-mt-8 landing-button">
            ${item.name}
        </a>`
    )).join('<br/>') : ''
    let image = !isTitle && entity.desktopImageLink  ? `<div class="center"><img src="${entity.desktopImageLink}" alt="${entity.title || entity.desktopImageLink}" /></div>` : ''
    let description = entity.description  ? entity.description : ''
    return `<div>
                ${image}
                <div>
                    ${description}
                </div>
                <div class="center">
                    <div>
                        ${button_html}
                    </div>
                </div>
                <div class="center landing-pb-4">
                <strong>------------------------------------</strong>
                </div>
    </div>`
}
// bóng đá
export const SoccerTemplate = (entity) => {
    return `<html><head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="author" content="FPT Play">
    <meta name="keywords" content="Xem trực tiếp bóng đá, thể thao, Xem Ngoại Hạng Anh, Serie A, World Cup, Việt Nam, Park Hang-Seo, Messi, Ronaldo, Barcelona, Juventus, Manchester United, Liverpool">
    <meta name="viewport" content="width=960, user-scalable=no">
    <title>Trực Tiếp | FPT Play</title>
    <meta content="" name="">
    <meta property="fb:app_id" content="1583620945254783">
    <link rel="schema.DC" href="http://purl.org/dc/elements/1.1/">
    <link href="https://fptplay.vn/favicon.ico" rel="shortcut icon" type="image/x-icon">
    <meta property="og:site_name" content="fptplay.vn">
    <link rel="alternate" href="https://fptplay.vn" hreflang="vi-vn">
  
    <meta name="description" content="Trực Tiếp | FPT Play">
    <meta property="og:title" content="Trực Tiếp | FPT Play">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://fptplay.vn/bong-da.html">
    <meta property="og:image" content="https://fptplay.vn/images/image-share-fb.jpg">
    <meta property="og:description" content="Trực Tiếp | FPT Play">
  
    <meta name="DC.Title" content="Trực Tiếp | FPT Play">
    <meta name="DC.Creator" content="Fptplay">
    <meta name="DC.Subject" content="Xem trực tiếp bóng đá, thể thao, Xem Ngoại Hạng Anh, Serie A, World Cup, Việt Nam, Park Hang-Seo, Messi, Ronaldo, Barcelona, Juventus, Manchester United, Liverpool">
    <meta name="DC.Description" content="Trực Tiếp | FPT Play">
    <meta name="DC.Publisher" content="Fptplay">
    <meta name="DC.Contributor" content="Fptplay">
    <meta name="DC.Date" content="07/06/2019">
    <meta name="DC.type" scheme="DCTERMS.DCMIType" content="Text">
    <meta name="DC.format" content="text/html; charset=UTF-8">
    <meta name="DC.format" content="89804 bytes">
    <meta name="DC.identifier" scheme="DCTERMS.URI" content=" https://fptplay.vn">
    <meta name="DC.language" scheme="DCTERMS.RFC1766" content="vi">
    <meta name="geo.region" content="VN">
    <script async="" src="https://www.google-analytics.com/analytics.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js"></script>
  
    <!-- Google Analytics -->
    <script>
      (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
          (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
          m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  
      ga('create', 'UA-124500027-1', 'auto');
      ga('set', 'page', window.location.pathname)
      ga('send', 'pageview');
  
    </script>
    <!-- End Google Analytics -->
  
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    html, body {
      height: 100%;
    }
    .container{
      background: no-repeat top center;
      background-size: 100% 100%;
      width:100%;
      height: 100%;
      position:relative;
      overflow:hidden;
      cursor: pointer;
    }
    .ice{
      height:264px;
      width: 100%;
      background:url(/landing-tructiep/images/ice-1.png) no-repeat top center;
      position: absolute;
      bottom: 0px;
      z-index:2;
      background-size: 100% 100%;
    }
    .tg-left{
      background:url(/landing-tructiep/images/tg-l.png) no-repeat top left;
      width:211px;
      height: 815px;
      position:absolute;
      bottom: 52px;
      left: 133px;
      z-index: 1;
    }
    .tg-right{
      background:url(/landing-tructiep/images/tg-r.png) no-repeat top left;
      width:212px;
      height: 815px;
      position:absolute;
      bottom: 52px;
      right: 153px;
      z-index: 1;
    }
    .wrapper-video{
      width:700px;
      position:absolute;
      z-index:3;
      left: 50%;
      top: 15px;
      margin-left: -350px;
    }
    .wrapper-video .video{
      width:700px;
      height: 395px;
      /* box-shadow: 0 10px 16px 0 rgba(0,0,0,0.6),0 6px 20px 0 rgba(0,0,0,0.6); */
    }
    .beer{
      display: none;
    }
    .button{
      width: 320px;
      margin: 120px auto 0px auto;
    }
    .btn{
      color: #fff;
      font-family:"Lucida Sans Unicode", "Lucida Grande", sans-serif;
      font-weight:bold;
      font-size: 1.2em;
      padding: 15px 10px;
      text-decoration:none;
      width: 300px;
      display:block;
      border-radius: 28px;
      text-align:center;
      margin-bottom: 20px;
      background-size: 100% 100%;
      background: -moz-linear-gradient(45deg, #ec211d 0%, #e85b2d 100%);
      background: -webkit-linear-gradient(45deg, #ec211d 0%, #e85b2d 100%);
      background: linear-gradient(45deg, #ec211d 0%, #e85b2d 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ec211d', endColorstr='#e85b2d', GradientType=1);
      box-shadow: 0 5px 10px 0 rgba(0,0,0,0.6),0 5px 10px 0 rgba(0,0,0,0.6);
  
    }
    .btn:hover{
      background: #ec211d;
    }
    .btn span{
      border-left: 1px solid #696969;
      padding: 0px 20px;
      display:inline-block;
      float:right;
      display:none;
    }
    .disable{
      background: #ededed !important;
      color: #696969;
      cursor: not-allowed;
      text-decoration: none;
    }
    .disable span{
      display:block;
    }
  
    @media screen and (min-width: 1500px) and (max-width: 1600px) {
      .container {
        background-size: 100% 100%;
      }
      .ice{
        height:210px;
      }
      .tg-left{
        width:160px;
        height: 615px;
        bottom: 42px;
        left: 112px;
        background-size: 100% 100%;
      }
      .tg-right{
        width: 160px;
        height: 615px;
        bottom: 42px;
        right: 112px;
        background-size: 100% 100%;
      }
      .wrapper-video{
        width:587px;
        top: 15px;
        margin-left: -288px;
      }
      .wrapper-video .video{
        width:587px;
        height: 330px;
      }
    }
  
    @media screen and (min-width: 1367px) and (max-width: 1499px) {
      .container {
        background-size: 100% 100%;
      }
      .ice{
        height:190px;
        width: 102%;
      }
      .tg-left{
        width:140px;
        height: 540px;
        bottom: 40px;
        left: 98px;
        background-size: 100% 100%;
      }
      .tg-right{
        width: 140px;
        height: 540px;
        bottom: 40px;
        right: 98px;
        background-size: 100% 100%;
      }
      .wrapper-video{
        width:587px;
        top: 15px;
        margin-left: -290px;
      }
      .wrapper-video .video{
        width:587px;
        height: 330px;
      }
      .button{
        width: 320px;
        margin: 115px auto 0px auto;
      }
      .btn{
        padding: 10px 7px;
        font-size: 18px;
      }
    }
  
    @media screen and (min-width: 999px) and (max-width: 1367px) {
      .container {
        background-size: 100% 100%;
      }
      .ice{
        height:190px;
        width: 102%;
      }
      .tg-left{
        width:140px;
        height: 540px;
        bottom: 40px;
        left: 98px;
        background-size: 100% 100%;
      }
      .tg-right{
        width: 140px;
        height: 540px;
        bottom: 40px;
        right: 98px;
        background-size: 100% 100%;
      }
      .wrapper-video{
        width:500px;
        top:15px;
        margin-left: -250px;
      }
      .wrapper-video .video{
        width:500px;
        height: 281px;
      }
      .button{
        width: 320px;
        margin: 100px auto 0px auto;
      }
      .btn{
        padding: 5px 7px;
        font-size: 18px;
      }
    }
  
    @media screen and (min-width: 480px) and (max-width: 998px) {
      .container{
        background-size: 100% 100% !important;
        background: #ddeef2 no-repeat top center;
      }
      .mb-footer{
        background-size: 100% auto !important;
        background: no-repeat bottom center;
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 2;
        bottom: 0px;
        left: 0px;
      }
      .button {
  
        margin: 60px auto 0px auto;
      }
      .ice{
        height:360px;
        background-size: contain;
        background-position: -188px 30px;
      }
      .tg-left{
        width: 173px;
        height: 700px;
        bottom: -5px;
        left: 80px;
        background-size: 100% 100%;
        -ms-transform: rotate(10deg); /* IE 9 */
        -webkit-transform: rotate(10deg); /* Safari prior 9.0 */
        transform: rotate(10deg);
      }
      .tg-right{
        width: 173px;
        height: 700px;
        bottom: -95px;
        left: 380px;
        background-size: 100% 100%;
        -ms-transform: rotate(-16deg); /* IE 9 */
        -webkit-transform: rotate(-16deg); /* Safari prior 9.0 */
        transform: rotate(-16deg);
      }
      .wrapper-video{
        width:90%;
        top: 50px;
        margin-left:-45%;
      }
      .wrapper-video .video{
        width:100%;
        height: 486px;
      }
      .beer{
        background:url(/landing-tructiep/images/beer.png) no-repeat top left;
        background-size: 100% 100%;
        width: 300px;
        height: 470px;
        position:absolute;
        bottom: 52px;
        right: 70px;
        z-index: 1;
        display:block ;
      }
      .button{
        width: 620px;
      }
      .button .btn{
        width:630px;
        font-size: 2.8em;
      }
      .btn{
        padding: 15px 7px;
      }
  
    }
  
    @media screen and (max-width: 999px) and (orientation:landscape) {
      .container {
        background-size: cover !important;
        background: #ddeef2 no-repeat top center;
      }
    }
  
    @media (max-device-width: 960px) and (orientation:landscape) {
      .tg-left, .tg-right, .beer{
        display:none;
      }
      .wrapper-video{
        width: 60%;
        top: 20px;
        margin-left: -30%;
      }
      .wrapper-video .video {
        height: 328px;
      }
      .button{
        width: 280px;
        margin: 20px auto;
      }
      .button .btn{
        width:280px;
        font-size: 1em;
      }
    }
  
    .no-btn{
      background: none;
    }
  
    .no-btn:hover{
      color: #e85b2d;
      background: none;
    }
  </style></head>
  
  
  
  <body cz-shortcut-listen="true">
  <div class="container" id="container" onclick="clickQC()" style="background-image: url("${entity.banner_soccer}");">
    <div class="wrapper-video">
      <div class="video">
        <ins class="adsplay-placement adsplay-placement-relative" data-aplpm="11010801-11030801"></ins>
      </div>
      <div class="button" id="button" style="margin-top: 20px;">
        <a id="button1" class="btn" onclick="event.stopPropagation()" href="/truc-tiep-bong-da.html">TRỰC TIẾP</a>
        <a id="button2" class="btn" onclick="event.stopPropagation()" href="/danh-muc/phim-bo/55701c1517dc1321ee85857a">TRANG CHỦ</a>
      </div>
    </div>
  <!--  <div id="mb-footer" class="mb-footer"></div>-->
  </div>
  
  <script>
    // Jotun
    var bg_1_pc = "https://static.fptplay.net/static/img/eball/team_files/Q9QDzBva5xn1xl6hmR584uMFEbtiC5anNJqjSJie.jpeg"
    var bg_1_mb = "https://static.fptplay.net/static/img/eball/team_files/1NEssI8mmMV4H00HuO280EBW1vQqgBs2AYO05poi.jpeg"
    // Sabeco
    var bg_2_pc = "https://static.fptplay.net/static/img/eball/team_files/74cbauA7k3rkc5EmgXxIZzqOZ9EC4jnmPZijmwaL.jpeg"
    var bg_2_mb = "https://static.fptplay.net/static/img/eball/team_files/rdaYRuFNXx1oi6QvRu5q1LtKwmguV6TaIIP0SBGn.jpeg"
    
    if(window.location.href.includes("beta-dev") || window.location.href.includes("my.fptplay")){
      var flight_id_1_pc = "306";
      var flight_id_1_mb = "307";
      var flight_id_2_pc = "302";
      var flight_id_2_mb = "303";
    }else{
      var flight_id_1_pc = "53703";
      var flight_id_1_mb = "53704";
      var flight_id_2_pc = "58303";
      var flight_id_2_mb = "58304";
    }
  
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  
    // Used like so
    var arr = [];
    // const time = new Date();
    // var hours = time.getHours(); 
    // // console.log(hours);
    // if(parseInt(hours) > 12){
      if(screen.width < 999){ // Mobile
        for (var i=0; i<1; i++){
          arr.push(flight_id_1_mb) //Oxy
        }
        for (var i=0; i<1; i++){
          arr.push(flight_id_2_mb) //Oxy
        }
      }else{ //Desktop
        for (var i=0; i<1; i++){
          arr.push(flight_id_1_pc) //Oxy
        }
        for (var i=0; i<1; i++){
          arr.push(flight_id_2_pc) //Oxy
        }
      }
    // }
    if(arr.length > 0) arr = shuffle(arr);
    var flightId = arr[0];
  
    function change() {
      // console.log(flightId);
      if(flightId==flight_id_1_pc || flightId==flight_id_1_mb){ //Desktop Oxy
        // // console.log('oxy');
        document.getElementById('container').style.backgroundImage = "url("+bg_1_pc+")";
        document.getElementById('button').style.marginTop = '20px';
        if(flightId==flight_id_1_mb){ //Mobile Oxy
          document.getElementById('container').style.backgroundImage = "url("+bg_1_mb+")";
          document.getElementById('button').style.marginTop = '40px';
        }
      } else { //Shopee
        // // console.log('shopee');
        document.getElementById('container').style.backgroundImage = "url("+bg_2_pc+")";
        document.getElementById('button').style.marginTop = '20px';
        if(flightId==flight_id_2_mb){
          document.getElementById('container').style.backgroundImage = "url("+bg_2_mb+")";
          document.getElementById('button').style.marginTop = '40px';
        }
      }
    }
  
    function clickQC() {
      if(flightId==flight_id_1_pc || flightId==flight_id_1_mb){ //Honda
        // window.open("https://apc01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.lazada.vn%2Fshop%2Frohto-mentholatum-vietnam1618567578%2FOxykhuynmi.htm%3Flaz_trackid%3D2%3Amm_150031272_51303051_2010353030%3Aclkgg5q4t1f915og78dmdv%26mkttid%3Dclkgg5q4t1f915og78dmdv&data=04%7C01%7CSonNH76%40fpt.com.vn%7C438c1fb7f27c4f2c281908d937b6563e%7C4ebc9261871a44c593a560eb590917cd%7C1%7C0%7C637602078538638679%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C1000&sdata=qzyWQ%2FN3PGsYEVBKTlVueR6e3bpUj2cANzFswLZ%2BfYg%3D&reserved=0", '_blank');
      } else if(flightId==flight_id_2_pc || flightId==flight_id_2_mb){ //Tiger
        // window.open("https://www.facebook.com/BiaSaigon.official.page", '_blank');
      }
    }
  
    change();
  
    function setTime() {
      localStorage.setItem('view_ads', 'OK');
      var timeCountdown = 5;
      // if(flightId=='26801' || flightId=='26805'){ //Acecook
      //   timeCountdown = 10
      // }else if(flightId=='28106' || flightId=='28108'){ //Sony
      //   timeCountdown = 13
      // }
      document.getElementById("button1").innerHTML = "TRỰC TIẾP<span>" + timeCountdown + "s" + "</span>";
      document.getElementById("button2").innerHTML = "TRANG CHỦ<span>" + timeCountdown + "s" + "</span>";
      interval = setInterval(function () {
        if (timeCountdown > 1) {
          timeCountdown--;
          document.getElementById("button1").innerHTML = "TRỰC TIẾP<span>" + timeCountdown + "s" + "</span>";
          document.getElementById("button2").innerHTML = "TRANG CHỦ<span>" + timeCountdown + "s" + "</span>";
        } else {
          clearInterval(interval)
          document.getElementById("button1").classList.remove("disable");
          document.getElementById("button2").classList.remove("disable");
          document.getElementById("button1").innerHTML = "TRỰC TIẾP";
          document.getElementById("button2").innerHTML = "TRANG CHỦ";
          
          document.getElementById("button1").setAttribute("href", "${entity.button[0].url}");
          document.getElementById("button2").setAttribute("href", "${entity.button[1].url}");
        }
      }, 1000)
    }
  
    function loadAds() {
      if (typeof window.InitAdsPlayBanner === 'function') {
        window.InitAdsPlayBanner();
        return;
      }
      var scr = document.createElement('script');
      scr.src = "https://ads-cdn.fptplay.net/static/sdk/website/fptplay/adsplay-display-ad.js?v=1.33";
      scr.onload = function () {
        window.InitAdsPlayBanner()
      };
      document.body.appendChild(scr);
      setTime();
    }
    if (document.readyState == 'loading') {
      document.addEventListener('DOMContentLoaded', loadAds);
    } else {
      loadAds();
    }
  
    //Tracking
    function randomUuidv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
          v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  
    function getBrowserDetail() {
      let module = {
        options: [],
        header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
        dataos: [{
          name: 'Windows Phone',
          value: 'Windows Phone',
          version: 'OS',
          mobile: true
        },
          {
            name: 'Windows',
            value: 'Win',
            version: 'NT',
            mobile: false
          },
          {
            name: 'iPhone',
            value: 'iPhone',
            version: 'OS',
            mobile: true
          },
          {
            name: 'iPad',
            value: 'iPad',
            version: 'OS',
            mobile: true
          },
          {
            name: 'Kindle',
            value: 'Silk',
            version: 'Silk',
            mobile: true
          },
          {
            name: 'Android',
            value: 'Android',
            version: 'Android',
            mobile: true
          },
          {
            name: 'PlayBook',
            value: 'PlayBook',
            version: 'OS',
            mobile: false
          },
          {
            name: 'BlackBerry',
            value: 'BlackBerry',
            version: '/',
            mobile: false
          },
          {
            name: 'MacOS',
            value: 'Mac',
            version: 'OS X',
            mobile: false
          },
          {
            name: 'Linux',
            value: 'Linux',
            version: 'rv',
            mobile: false
          },
          {
            name: 'Palm',
            value: 'Palm',
            version: 'PalmOS',
            mobile: false
          }
        ],
        databrowser: [{
          name: 'Cốc Cốc',
          value: 'coc_coc_browser',
          version: 'coc_coc_browser'
        },
          {
            name: 'Chrome',
            value: 'Chrome',
            version: 'Chrome'
          },
          {
            name: 'Firefox',
            value: 'Firefox',
            version: 'Firefox'
          },
          {
            name: 'Safari',
            value: 'Safari',
            version: 'Version'
          },
          {
            name: 'Internet Explorer',
            value: 'MSIE',
            version: 'MSIE'
          },
          {
            name: 'Opera',
            value: 'Opera',
            version: 'Opera'
          },
          {
            name: 'BlackBerry',
            value: 'CLDC',
            version: 'CLDC'
          },
          {
            name: 'Mozilla',
            value: 'Mozilla',
            version: 'Mozilla'
          },
        ],
        init: function () {
          var agent = this.header.join(' '),
            os = this.matchItem(agent, this.dataos),
            browser = this.matchItem(agent, this.databrowser);
  
          return {
            os: os,
            browser: browser
          };
        },
        matchItem: function (string, data) {
          let i = 0,
            j = 0,
            html = '',
            regex,
            regexv,
            match,
            matches,
            version;
  
          for (i = 0; i < data.length; i += 1) {
            regex = new RegExp(data[i].value, 'i');
            match = regex.test(string);
            if (match) {
              regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
              matches = string.match(regexv);
              version = '';
              if (matches) {
                if (matches[1]) {
                  matches = matches[1];
                }
              }
              if (matches) {
                matches = matches.split(/[._]+/);
                for (j = 0; j < matches.length; j += 1) {
                  if (j === 0) {
                    version += matches[j] + '.';
                  } else {
                    version += matches[j];
                  }
                }
              } else {
                version = '0';
              }
              return {
                name: data[i].name,
                version: parseFloat(version),
                mobile: data[i].mobile !== undefined ? data[i].mobile : null
              };
            }
          }
          return {
            name: 'unknown',
            version: 0
          };
        }
      };
      return module.init()
    }
  
    function getTimeZone() {
      let offset = new Date().getTimezoneOffset();
      let hours = Math.floor(Math.abs(offset) / 60);
      let hoursStr = hours < 10 ? "0" + hours : hours;
      let minutes = Math.abs(offset) - hours * 60;
      let minutesStr = minutes < 10 ? "0" + minutes : minutes;
      let prefix = offset < 0 ? "+" : "-";
      return "UTC" + prefix + hoursStr + ":" + minutesStr;
    }
  
    function getDateTime() {
      const a = new Date();
      return a.getFullYear() +
        "-" + (parseInt(a.getMonth()) + 1 < 10 ? "0" + (parseInt(a.getMonth()) + 1) : (parseInt(a.getMonth()) + 1)) +
        "-" + (a.getDate() < 10 ? "0" + a.getDate() : a.getDate()) +
        " " + (a.getHours() < 10 ? "0" + a.getHours() : a.getHours()) +
        ":" + (a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes()) +
        ":" + (a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds()) +
        "." + a.getMilliseconds();
    }
  
    function commonParams() {
      let devideId = localStorage.getItem("devideId"); //Lấy chuỗi Id thiết bị lưu trong local storage
      if (!devideId) {
        //Nếu chưa lưu thì tạo mới 1 chuỗi bằng random và lưu xuống
        devideId = randomUuidv4();
        localStorage.setItem("devideId", devideId)
      }
      let tabId = sessionStorage.getItem("tabId"); //Lấy chuỗi Id thiết bị lưu trong local storage
      if (!tabId) {
        //Nếu chưa lưu thì tạo mới 1 chuỗi bằng random và lưu xuống
        tabId = new Date().getTime();
        sessionStorage.setItem("tabId", tabId)
      }
      let eventId = randomUuidv4();
      let browsers = getBrowserDetail() || {};
      return {
        p: "web-playfpt",
        av: "1.0.1",
        tna: "fplay",
        tv: "1.1.0",
        eid: eventId,
        did: devideId,
        tz: getTimeZone(),
        dtm: getDateTime(),
        res: screen.width + "x" + screen.height,
        aid: window.location.host == "fptplay.vn" ? "fptplay:production" : "fptplay_test",
        scid: '/bong-da',
        ast: tabId,
        dmf: browsers.browser.name,
        dml: browsers.browser.version,
        ost: browsers.os.name,
        ov: browsers.os.version,
        dvt: browsers.os.mobile ? "mobile" : "pc",
      };
    }
  
    function sendTrackingView() {
      let params = commonParams()
      params["eac"] = "view"
      params["eca"] = "src"
      params["ela"] = "/bong-da"
      params["iid"] = "landing-page"
      params["iid"] = "landing-page"
      params["inm"] = "landing-page"
      sendTracking(params, "https://ua.fptplay.net/i")
    }
  
    function sendTracking(params, url = "https://ua.fptplay.net/i") {
      axios.get(url, {
        params: params,
        headers: {
          "content-type": "application/json; charset=UTF-8"
        }
      }).catch(function (error) {
        console.error("tracking", error);
      });
    }
  
    sendTrackingView()
  
  </script>
  
  
  
  <script src="https://ads-cdn.fptplay.net/static/sdk/website/fptplay/adsplay-display-ad.js?v=1.33"></script></body></html>
    `
}