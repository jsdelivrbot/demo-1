function angularBootstrap(e){angular.module("home",["ui.bootstrap","youtube-embed"]).constant("translations",e).config(["$interpolateProvider","$httpProvider",function(e,t){e.startSymbol("[[").endSymbol("]]"),t.defaults.headers.common["X-Requested-With"]="XMLHttpRequest"}]).controller("batallasDestacadasCtrl",["$scope","$uibModal",function(e,t){e.showBattle=function(e){t.open({templateUrl:"modalCompeteHome",windowClass:"modal-full",controller:"modalCompeteHomeCtrl",resolve:{battle:["$http",function(t){return t.get(Routing.generate("web_home_battle",{slug:e})).then(function(e){return e.data})}]}})}}]).controller("modalCompeteHomeCtrl",["$scope","$http","$interval","$uibModalInstance","battle","translations",function(e,t,a,o,l,n){e.battle=l,e.playerVars={controls:1,autoplay:0,rel:0},e.word="",e.player1=null,e.player2=null,e.timeRemaining=60,e.$on("youtube.player.ready",function(t,a){"ytplayer1"===a.id?e.player1=a:"ytplayer2"===a.id&&(e.player2=a)}),e.$on("youtube.player.playing",function(t,a){"ytplayer1"===a.id&&1===a.getPlayerState()&&null!==e.player2&&e.player2.pauseVideo(),"ytplayer2"===a.id&&1===a.getPlayerState()&&null!==e.player1&&e.player1.pauseVideo()});var r=(n.introduction+","+l.words).split(","),u=a(function(){var t=void 0;null!==e.player1&&1===e.player1.getPlayerState()&&(t=e.player1.getCurrentTime()),null!==e.player2&&1===e.player2.getPlayerState()&&(t=e.player2.getCurrentTime()),t&&(e.timeRemaining=Math.floor(Math.max(60-t,0)),e.word=r[Math.min(Math.floor(t/10),5)])},500);e.$on("$destroy",function(){a.cancel(u)})}]),angular.element(document).ready(function(){angular.bootstrap(document,["home"])})}var request=$.ajax({url:Routing.generate("web_dictionary",{domain:"messages"}),method:"GET",dataType:"json"});$.when(request).done(function(e){angularBootstrap(e)});