/*--
 Copyright (c) 2022 哈尔滨亿时代数码科技开发有限公司（www.hrbesd.com）. All rights reserved.
  HRBESD PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
--*/
(function($,option){
    var getReady = function(){
        if(typeof($)==='function'){
            articleReaderInit($,option);
        }else{
            var esd_jquery_js = document.createElement('script'); 
            esd_jquery_js.setAttribute('type', 'text/javascript'); 
            esd_jquery_js.setAttribute('src', ' https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js'); 
            esd_jquery_js.setAttribute('charset', 'utf-8'); 
            esd_jquery_js.onload = function(){
                $ = window.jQuery;
                articleReaderInit($,option);
            };	
            document.head.appendChild(esd_jquery_js);
        }
    }


    var articleReaderInit = function(jq_ra,option){
        var contentDom = option.contentDom,  //正文节点标记  使用方式和jquery选择器相同  class用.开头  id用#开头
        volume=0.75,  //初始音量
        audioIsReady = false;
        audioIndex = 0,
        audioTotal = 0,
        audioIsPlay = false,
        audioObj = null,
        textArr = new Array(),
        whileIndex = 0,
        ttsUrl = "https://tts.yunmd.net/ws/textToSound",
        speedVal = 0,  // -1 慢 , 0 普 , 1 快
        timerInterval = null,
        splitNum = 1200; //大于1200 字截断文本
        // splitNum = 30;

        read = function(){
            //创建音频元素
            if(audioObj==null){
                audioObj = document.createElement("audio");
                audioObj.loop = false;
                audioObj.volume = volume;
            }
           
            //处理正文文本信息
            var tempElements = jq_ra(contentDom).clone();
            tempElements.find("style,script").remove();
            var articleContent = tempElements.text();
            articleContent = replaceStr(articleContent," ","");
            articleContent = replaceStr(articleContent,"\n","");
            articleContent = replaceStr(articleContent,"\t","");
            articleContent = replaceStr(articleContent,"\r",""); 
            articleContent = replaceStr(articleContent,"邮箱：wangzhan@qd.shandong.cn","邮箱,网站,艾特,q,d,点,山东,点,cn,"); 
            //console.log(articleContent.length);
            //console.log(articleContent);
            if(jq_ra.trim(articleContent).length==0){
                return false;
            }
             //引入样式
            jq_ra(document.head).append(playStyle);
            //截断文字
            if(articleContent.length>splitNum){
                splitArticleContent(articleContent);
            }else{
                textArr.push(articleContent);
            }
            // console.log(textArr);
            audioTotal = textArr.length;
            jq_ra(contentDom).prepend(playHtml);     
            if(checkUsePhone()){
                jq_ra("#articlePlayer").css("zoom","0.5");
            }
            jq_ra("#ar_play_pause").attr("title","播放");
            jq_ra("#ar_volume_progress").find(".VolumeShow").css("width","75%");

            //多段继续朗读
            audioObj.addEventListener('ended', function(){
                audioIndex++;
                if(audioIndex<audioTotal){
                    var de= base64.e64(textArr[audioIndex]);
                    jq_ra.ajax({
                        type:'GET',
                        url:ttsUrl,
                        dataType:'jsonp',
                        jsonp:"callback",
                        data:{"b":de,"s":speedVal},
                        async: true,
                        success:function(data){
                            audioObj.src = data.u;
                            audioObj.play();
                        }
                    });
                }else{
                    //console.log("全部播放完毕!");
                    var duration = (audioObj.duration).toFixed(0);
                    var durationStr = parseInt(duration/60)+":"+((duration%60)>9? duration%60:"0"+duration%60);
                    if(audioObj!=null){
                        var position = (audioObj.currentTime).toFixed(0);
                        position = parseInt(position/60)+":"+((position%60)>9? position%60:"0"+position%60);
                        jq_ra("#articleTime").html(position+" / "+durationStr)
                        // console.log(position+" / "+durationStr);
                        jq_ra("#ar_mp3_progress").find(".Mp3LongShow").animate({width: ((audioObj.currentTime/audioObj.duration).toFixed(2)*100)+"%"},"fast").css("overflow","visible");
                        //jq_ra("#ar_mp3_progress").find(".Mp3LongShow").css("width",((audioObj.currentTime/audioObj.duration).toFixed(2)*100)+"%");
                    }
                }
            }, false);
            
            //事件处理
            audioObj.onloadedmetadata = function(){
                var duration = (audioObj.duration).toFixed(0);
                var durationStr = parseInt(duration/60)+":"+((duration%60)>9? duration%60:"0"+duration%60);
                if(audioObj!=null){
                    var position = (audioObj.currentTime).toFixed(0);
                    position = parseInt(position/60)+":"+((position%60)>9? position%60:"0"+position%60);
                    jq_ra("#articleTime").html(position+" / "+durationStr)
                    // console.log(position+" / "+durationStr);
                }
            };
            audioObj.onpause = function(){
                audioIsPlay = false;
                // console.log("暂停了");
                jq_ra("#ar_play_pause").attr("title","播放");
                jq_ra("#ar_play_pause").html(imgs.play);
                clearInterval(timerInterval);
            };
            audioObj.onplay = function(){
                audioIsPlay = true;
                // console.log("播放了");
                jq_ra("#articlePlayer").addClass("pauseMouse");
                jq_ra("#ar_play_pause").attr("title","暂停");
                jq_ra("#ar_play_pause").html(imgs.pause);
                startTimer();
            };
            //点击播放
            jq_ra(document).on("click","#ar_play_pause",function(){
                if(audioIsPlay){
                    audioObj.pause();
                }else{
                    if(audioIsReady){
                        audioObj.play();
                    }else{
                        audioIsReady = true;
                        //设置第一个音频信息
                        var de= base64.e64(textArr[0]);
                        jq_ra.ajax({
                            type:'GET',
                            url:ttsUrl,
                            dataType:'jsonp',
                            jsonp:"callback",
                            data:{"b":de,"s":speedVal},
                            async: true,
                            success:function(data){
                                audioObj.src = data.u;
                                audioObj.play();
                                jq_ra("#ar_mp3_progress").find(".Mp3LongShow").show();
                                jq_ra(document).on("keydown","#articlePlayer",function(e){
                                    if(e.keyCode==37){
                                        e.preventDefault();
                                        var tempTime = (audioObj.currentTime).toFixed(0)*1;
                                        if(tempTime-5<0){
                                            audioObj.currentTime=0;
                                        }else{
                                            audioObj.currentTime=tempTime-5;
                                        }
                                    }else if(e.keyCode==39){
                                        e.preventDefault();
                                        var tempTime = (audioObj.currentTime).toFixed(0)*1;
                                        if(tempTime+5>audioObj.duration){
                                            audioObj.currentTime=audioObj.duration;
                                        }else{
                                            audioObj.currentTime=tempTime+5;
                                        }
                                    }else if(e.keyCode==38){
                                        e.preventDefault();
                                        volume = volume+0.1;
                                        if(volume>1){
                                            volume = 1;
                                        }
                                        if(volume==1){
                                            jq_ra("#ar_volume_max").html(imgs.max);
                                        }else{
                                            jq_ra("#ar_volume_max").html(imgs.volumeBig);
                                        }
                                        jq_ra("#ar_volume_mute path:eq(1)").hide();
                                        jq_ra(this).find(".VolumeShow").show();
                                        jq_ra(this).find(".VolumeShow").css("width",(volume*100)+"%");
                                        audioObj.volume = volume;
                                    }else if(e.keyCode==40){
                                        e.preventDefault();
                                        volume = volume-0.1;
                                        if(volume<0){
                                            volume = 0;
                                        }
                                        if(volume==0){
                                            jq_ra("#ar_volume_mute path:eq(1)").show();
                                            jq_ra(this).find(".VolumeShow").hide();
                                        }else{
                                            jq_ra("#ar_volume_mute path:eq(1)").hide();
                                            jq_ra(this).find(".VolumeShow").show();
                                        }
                                        jq_ra("#ar_volume_max").html(imgs.volumeBig);
                                        jq_ra(this).find(".VolumeShow").css("width",(volume*100)+"%");
                                        audioObj.volume = volume;
                                    }
                                });
                            }
                        });
                    }
                }
            });
            //点击重播
            jq_ra(document).on("click","#ar_replay",function(){
                audioObj.pause();
                audioIndex = 0;
                var de= base64.e64(textArr[0]);
                jq_ra.ajax({
                    type:'GET',
                    url:ttsUrl,
                    dataType:'jsonp',
                    jsonp:"callback",
                    data:{"b":de,"s":speedVal},
                    async: true,
                    success:function(data){
                        audioObj.src = data.u;
                        audioObj.play();
                    }
                });
            });
            //点击静音
            jq_ra(document).on("click","#ar_volume_mute",function(){
                volume = 0;
                audioObj.volume = volume;
                jq_ra("#ar_volume_progress").find(".VolumeShow").hide();
                jq_ra(this).find("path:eq(1)").show();
                jq_ra("#ar_volume_max").html(imgs.volumeBig);
            });
            //点击音量最大
            jq_ra(document).on("click","#ar_volume_max",function(){
                volume = 1;
                audioObj.volume = volume;
                jq_ra("#ar_volume_progress").find(".VolumeShow").show();
                jq_ra("#ar_volume_progress").find(".VolumeShow").css("width","100%");
                jq_ra("#ar_volume_mute path:eq(1)").hide();
                jq_ra(this).html(imgs.max);
            });
            //音量条点击
            jq_ra(document).on("click","#ar_volume_progress",function(event){
                var clickX = event.clientX;
                var domRect = this.getBoundingClientRect();
                var backWidth = domRect.right - domRect.left;
                var pointer = clickX - domRect.left;;
                var persents = (pointer/backWidth).toFixed(2);
                //console.log(persents);
                if(persents>1){
                    persents = 1;
                }
                if(persents<0){
                    persents=0;
                }
                jq_ra(this).find(".VolumeShow").show();
                jq_ra(this).find(".VolumeShow").css("width",(persents*100)+"%");
                volume = persents;
                audioObj.volume = volume;
            });
            jq_ra(document).on("mousedown","#ar_volume_progress",function(event){
                jq_ra(document).on("mousemove.arvmove","#ar_volume_progress",function(event){
                    var clickX = event.clientX;
                    var domRect = this.getBoundingClientRect();
                    var backWidth = domRect.right - domRect.left;
                    var pointer = clickX - domRect.left;;
                    var persents = (pointer/backWidth).toFixed(2);
                    // console.log(persents);
                    if(persents>1){
                        persents = 1;
                    }
                    if(persents<0){
                        persents=0;
                    }
                    jq_ra(this).find(".VolumeShow").show();
                    jq_ra(this).find(".VolumeShow").css("width",(persents*100)+"%");
                    if(persents==0){
                        jq_ra("#ar_volume_mute path:eq(1)").show();
                    }else{
                        jq_ra("#ar_volume_mute path:eq(1)").hide();
                    }
                    if(persents==1){
                        jq_ra("#ar_volume_max").html(imgs.max);
                    }else{
                        jq_ra("#ar_volume_max").html(imgs.volumeBig);
                    }
                    volume = persents;
                    audioObj.volume = volume;
                });
            });
            
            jq_ra(document).on("mouseup",function(){
                // console.log("mouseup");
                jq_ra(document).off("mousemove.arvmove");
            });
            //音频进度条点击
            jq_ra(document).on("click","#ar_mp3_progress",function(event){
                if(!audioIsReady){
                    return false;
                }
                var clickX = event.clientX;
                var domRect = this.getBoundingClientRect();
                var backWidth = domRect.right - domRect.left;
                var pointer = clickX - domRect.left;;
                var persents = (pointer/backWidth).toFixed(2);
                //console.log(persents);
                if(persents>1){
                    persents = 1;
                }
                if(persents<0){
                    persents=0;
                }
                jq_ra(this).find(".Mp3LongShow").show();
                jq_ra(this).find(".Mp3LongShow").css("width",(persents*100)+"%");
                var durationTemp = (audioObj.duration).toFixed(0);
                audioObj.currentTime = durationTemp*persents;
            });
            jq_ra(document).on("mousedown","#ar_mp3_progress",function(event){
                if(!audioIsReady){
                    return false;
                }
                jq_ra(this).find(".Mp3LongShow").show();
                jq_ra(document).on("mousemove.armove","#articlePlayer",function(event){
                    var clickX = event.clientX;
                    var domRect = this.getBoundingClientRect();
                    var backWidth = domRect.right - domRect.left;
                    var pointer = clickX - domRect.left;;
                    var persents = (pointer/backWidth).toFixed(2);
                    if(persents>1){
                        persents = 1;
                    }
                    if(persents<0){
                        persents=0;
                    }
                    jq_ra(this).find(".Mp3LongShow").show();
                    jq_ra(this).find(".Mp3LongShow").css("width",(persents*100)+"%");
                    var durationTemp = (audioObj.duration).toFixed(0);
                    audioObj.currentTime = durationTemp*persents;
                });
            });
            
            jq_ra(document).on("mouseup",function(){
                // console.log("mouseup");
                jq_ra(document).off("mousemove.armove");
            });

            //计算时间
            startTimer = function(){
                timerInterval = setInterval(function(){
                    var duration = (audioObj.duration).toFixed(0);
                    var durationStr = parseInt(duration/60)+":"+((duration%60)>9? duration%60:"0"+duration%60);
                    if(audioObj!=null){
                        var position = (audioObj.currentTime).toFixed(0);
                        position = parseInt(position/60)+":"+((position%60)>9? position%60:"0"+position%60);
                        jq_ra("#articleTime").html(position+" / "+durationStr)
                        // console.log(position+" / "+durationStr);
                        jq_ra("#ar_mp3_progress").find(".Mp3LongShow").animate({width: ((audioObj.currentTime/audioObj.duration).toFixed(2)*100)+"%"},"fast").css("overflow","visible");
                        //jq_ra("#ar_mp3_progress").find(".Mp3LongShow").css("width",((audioObj.currentTime/audioObj.duration).toFixed(2)*100)+"%");
                    }
                }, 1000);
            };
        };


        splitArticleContent = function(text){
            while(true){
                whileIndex++;
                var str1 = text.substring(splitNum);
                var str = text.substring(0,splitNum+str1.indexOf("。")+1);
                textArr.push(str);
                text = text.substring(text.indexOf(text.substring(splitNum+str1.indexOf("。")+1)));
                if(text.length<splitNum){
                    textArr.push(text);
                    break;
                }
                if(whileIndex>5000){//防止死循环
                    console.error("循环出现问题!");
                    break;
                }
            }
        };

        jq_ra(function(){
            if(jq_ra(contentDom).length==0){
                return false;
            }
            read();
        });
    }
 
    replaceStr = function(oStr,originalWord,newWord){
        if(oStr.indexOf(originalWord)>-1){
            var strArr = oStr.split(originalWord);
            var temstr = "";
            for(var i=0;i<strArr.length;i++){
                if(i==strArr.length-1){
                    temstr = temstr+strArr[i];
                    break;
                }else{
                    temstr = temstr+strArr[i]+newWord;
                }
            }
            oStr = temstr;
        }
        return oStr;
    }

    checkUsePhone = function (){
        var userAgentInfo = navigator.userAgent.toLowerCase();
        var agents = new Array("android", "iphone", "symbianOS", "windows phone", "ipad", "ipod");
        var flag = false;
        for (var i = 0; i < agents.length; i++) {
            if (userAgentInfo.indexOf(agents[i]) > 0) {
                flag = true; 
                break; 
            }
        }
        return flag;
    };

    var base64={};
    //将Ansi编码的字符串进行Base64编码
    base64.encode64=function(input){
    var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;
        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + base64.keyStr.charAt(enc1) + base64.keyStr.charAt(enc2)
                    + base64.keyStr.charAt(enc3) + base64.keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);
        return output;
    };
    //将Base64编码字符串转换成Ansi编码的字符串
    base64.decode64=function(input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;
        
        if (input.length % 4 != 0) {
            return "";
        }
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            return "";
        }
        do {
            enc1 = base64.keyStr.indexOf(input.charAt(i++));
            enc2 = base64.keyStr.indexOf(input.charAt(i++));
            enc3 = base64.keyStr.indexOf(input.charAt(i++));
            enc4 = base64.keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output += String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output += String.fromCharCode(chr3);
            }
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);
        return output;
    };
    
    base64.utf16to8 = function(str) {
        var out, i, len, c;

        out = "";
        len = str.length;
        for(i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    } else {
        out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    }
    }
    return out;
    };
    
    base64.utf8to16=function(str) {
        var out, i, len, c;
        var char2, char3;
        
        out = "";
        len = str.length;
        i = 0;
        while(i < len) {
            c = str.charCodeAt(i++);
            switch(c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += str.charAt(i-1);
                break;
                case 12: case 13:
                    // 110x xxxx   10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) |
                ((char2 & 0x3F) << 6) |
                ((char3 & 0x3F) << 0));
                break;
            }
        }
        return out;
    };
    base64.e64=function(arg){
        return base64.encode64(base64.utf16to8(arg));
    };
    base64.d64=function(arg){
        return utf8to16(decode64(arg));
    };
    base64.keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    
    var playStyle = '<style type="text/css">'
        +'#articlePlayer svg:hover{'
        +'	cursor:pointer;'
        +'}'
        +'#articlePlayer *{ margin:0px; padding:0px;}'
        +'#articlePlayer {'
        +'	width:500px;'
        +'	min-width: 500px;'
        +'	text-align: left;'
        +'	margin: 0 auto;'
        +'	border-radius:10px;'
        +'	box-shadow:2px 2px 5px 2px #ccc;'
        +'	line-height:50px;'
        +'	font-size:20px;'
        +'	overflow:hidden;'
        +'  margin-bottom:26px;'
        +'  height:160px;'
        +'}'
        +'#articlePlayer .playTitle{'
        +'	float:right;'
        +'	font-weight:normal;'
        +'	color:#9a9a9a;'
        +'	font-style:italic;'
        +'	padding-right:1em;'
        +'	font-size:18px;'
        +'	line-height: 56px;'
        +'}'
        +'#articlePlayer #articleTime{'
        +'	float:left;'
        +'	padding-left:1em;'
        +'	color:#333333;'
        +'	line-height: 56px;'
        +'}'
        +'#articlePlayer #ar_mp3_progress{'
        +'	clear:both;'
        +'	width:100%;'
        +'	margin:10px 0px 10px 0px;'
        +'	position:relative;'
        +'	left:0px;'
        +'	top:0px;'
        +'	background:#f2f2f2;'
        +'	height:3px;'
        +'	box-sizing:border-box;'
        +'	cursor: pointer;'
        +'  border-radius: 2px;'
        +'	}'
        +'#articlePlayer #ar_mp3_progress .Mp3LongShow{'
        +'	background:#5378e3;'
        +'	height:3px;'
        +'	width:0%;'
        +'	position:relative;'
        +'	display:none;'
        +'  border-radius: 2px;'
        +'}'
        +'#articlePlayer #ar_mp3_progress .Mp3LongShow span{'
        +'	width:16px;'
        +'	height:16px;'
        +'	border-radius:12px;'
        +'	display:block;'
        +'	background:#5378e3;'
        +'	position:absolute;'
        +'	left:100%;'
        +'	top:-10px;'
        +'	border:4px solid #b9ccf6;'
        +'	margin-left:-10px;'
        +'  box-sizing: initial;'
        +'}'
        +'#articlePlayer #ar_mp3_progress circle{'
        +'	stroke:#b9ccf6;'
        +'	stroke-width:1px;'
        +'	fill-opacity:"0.5";'
        +'}'
        +'#articlePlayer .article_main_item {'
        +'	height: 60px;'
        +'	display: inline-block;'
        +'	margin: 10px 5px 5px 5px;'
        +'	border-radius: 50%;'
        +'}'
        +'#articlePlayer .article_main_item svg {'
        +'	width: 60px;'
        +'	height: 60px;'
        +'	stroke: #2329D6;'
        +'	stroke-width: 1;'
        +'	stroke-linecap: square;'
        +'	stroke-linejoin: miter;'
        +'	fill: none;'
        +'	color: #2329D6;'
        +'}'
        +'#articlePlayer #voiceCtrl svg{'
        +'	width: 36px;'
        +'	height: 36px;'
        +'}'
        +'#articlePlayer .pause:hover svg circle{'
        +'	 fill:#437AEB;'
        +'	 fill-opacity:1'
        +'}'
        +'#articlePlayer .pause:hover svg path{'
        +'	 fill:#FFFFFF;'
        +'}'
        +'#articlePlayer .refresh svg{'
        +'	stroke:#ea7128;'
        +'	stroke-width:1.5;'
        +'}'
        +'#articlePlayer .refresh:hover svg circle{'
        +'	 fill:#FD6B11;'
        +'	 fill-opacity:1'
        +'}'
        +'#articlePlayer .refresh:hover svg path{'
        +'	 fill:#FFFFFF;'
        +'}'
        +'#articlePlayer .Volume{'
        +'	width:140px;'
        +'	display:inline-block;'
        +'	height:5px;'
        +'	stroke-width: 10;'
        +'	position:relative;'
        +'	left:0px;'
        +'	top:-16px;'
        +'	background:#f2f2f2;'
        +'  border-radius: 2px;'
        +'}'
        +'#articlePlayer .VolumeShow{'
        +'	background:#525252;'
        +'	height:5px;'
        +'	width:10%;'
        +'	position:relative;'
        +'  border-radius: 2px;'
        +'}'
        +'#articlePlayer .VolumeShow span{'
        +'	background:#525252;'
        +'	width:14px;'
        +'	height:14px;'
        +'	border-radius:10px;'
        +'	display:block;'
        +'	position:absolute;'
        +'	border:1px solid #525252;'
        +'	left:100%;'
        +'	top:-6px;'
        +'  box-sizing: initial;'
        +'  margin-left: -5px;'
        +'}'
        +'#articlePlayer .Volume svg{'
        +'	height:40px;'
        +'}'
        +'#articlePlayer #voiceCtrl{'
        +'	display:inline-block;'
        +'	float:right;'
        +'  margin-right:15px;'
        +'}'
        +'#articlePlayer #voiceCtrl svg{'
        +'	stroke: #525252;'
        +'}'
        +'#articlePlayer .VolumeMax .VolumeLoud path.VolumeLoudMouse{'
        +'	fill:#464646'
        +'}'
        +'#ar_volume_mute {'
        +'  margin-right:0px !important'    
        +'}'
        +'#articlePlayer button{'
        +'	border:none;'
        +'	outline:none;'
        +'	background:none;'
        +'}'
        +'#articlePlayer #ar_volume_progress{'
        +'	cursor:pointer;'
        +'}'
        +'</style>';
    
        
    imgs = {};
    imgs.play = '<svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill="#437AEB"><circle fill-opacity="0.1" cx="30" cy="30" r="30"></circle><path d="M43.1462913,28.604442 L22.6758037,16.2533015 C22.1307198,15.9248615 21.451009,15.9151419 20.8970326,16.2281133 C20.3428495,16.5410433 20,17.1280249 20,17.7643904 L20,42.4665059 C19.9972864,43.104195 20.3396235,43.6935755 20.8950887,44.0071673 C21.4503472,44.320635 22.1318365,44.3093023 22.6764654,43.9776362 L43.1469531,31.6264957 C43.6763615,31.3070721 44,30.7338634 44,30.1153655 C44,29.4970743 43.6763615,28.9238656 43.1469531,28.604442 L43.1462913,28.604442 Z" id="Fill-1"></path></g></g></svg>';
    imgs.pause = '<svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g><circle fill="#437AEB" cx="30" cy="30" r="30"></circle><g transform="translate(21.000000, 16.000000)" fill="#FFFFFF"><path d="M2.11174292,0 C0.945500206,0 0,0.945500206 0,2.11174292 L0,25.8882571 C0,27.0544998 0.945500206,28 2.11174292,28 C3.27798563,28 4.22348584,27.0544998 4.22348584,25.8882571 L4.22348584,2.11174292 C4.22348584,0.945500206 3.27798563,0 2.11174292,0" id="Fill-1"></path><path d="M16.8155824,0 C15.6493397,0 14.7038395,0.945500206 14.7038395,2.11174292 L14.7038395,25.8882571 C14.7038395,27.0544998 15.6493397,28 16.8155824,28 C17.9820162,28 18.9273253,27.0544998 18.9273253,25.8882571 L18.9273253,2.11174292 C18.9273253,0.945500206 17.9820162,0 16.8155824,0" id="Fill-3"></path></g></g></g></svg>';    
    imgs.replay = '<svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><polygon id="path-replay" points="0 0 40 0 40 32.2322203 0 32.2322203"></polygon></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g><circle fill-opacity="0.1" fill="#FD6B11" cx="30" cy="30" r="30"></circle><g transform="translate(10.000000, 14.000000)"><mask id="mask-replay" fill="white"><use xlink:href="#path-replay"></use></mask><g id="Clip-2"></g><path d="M36.7106129,16.7495655 C36.7178526,13.3770205 35.7103581,10.0802561 33.8191519,7.28794703 C33.7922392,7.24305321 33.7742581,7.19493302 33.7521456,7.15314753 C33.5152825,6.82083097 33.2738159,6.51530905 33.0279032,6.20101296 C32.9985511,6.16442116 32.9716777,6.12598009 32.9475193,6.08588648 C31.3008486,4.05708715 29.1963082,2.44775585 26.8067844,1.39048869 C26.735332,1.36389077 26.677218,1.32840065 26.6052934,1.30058301 C26.2255255,1.14087748 25.8366687,1.00332376 25.4432084,0.866242189 C25.3084089,0.821348369 25.165937,0.768782073 25.0274389,0.724203022 C24.6830431,0.618165472 24.3436836,0.534083006 23.9935433,0.449567735 C23.8011019,0.404516531 23.6046865,0.356435683 23.4127172,0.314610853 C23.3186802,0.296629717 23.2292073,0.269717033 23.1308423,0.248234101 C22.8718667,0.203182897 22.6170618,0.181660619 22.353168,0.1461705 C22.1696581,0.123585879 21.9935059,0.0975781535 21.8167636,0.079597018 C21.3788816,0.0345851601 20.9456031,0.0175089832 20.5131116,0.0130628818 C20.4325702,0.0130628818 20.3566324,0 20.2762878,0 C20.2627528,0 20.2492178,0.00444610135 20.2356827,0.00444610135 C16.867938,0.00708228534 13.5856135,1.06509702 10.8501595,3.02995905 C9.92230143,3.69022477 10.0469496,4.62225352 10.4617748,5.09239923 C10.7567127,5.42636833 11.6567531,5.89804854 12.3863465,5.34153829 C14.6928108,3.59445654 17.4939333,2.80509649 20.3117779,2.82937299 C20.7162945,2.83429125 21.120811,2.85364949 21.5128942,2.89240533 C21.6352603,2.90224184 21.7520394,2.92160008 21.8725562,2.94095833 C22.1973184,2.97601564 22.5200739,3.02779502 22.8394456,3.09602103 C22.9744025,3.12033688 23.1182515,3.15889599 23.249982,3.18596606 C23.5673471,3.25879556 23.8702722,3.33150702 24.1729219,3.42818022 C24.2694377,3.45552571 24.3641042,3.48948133 24.4560165,3.52977167 C24.807652,3.64627526 25.1496477,3.76769711 25.4814528,3.91276592 C25.5205234,3.92275981 25.5498755,3.95152176 25.5839885,3.96135826 C27.5912656,4.84341756 29.357981,6.19377329 30.7357216,7.89934499 C30.7417022,7.90945692 30.7483123,7.91929342 30.7555126,7.92853974 C32.7672358,10.4300816 33.8618817,13.5448707 33.8573962,16.7549559 L30.5374176,16.7549559 L34.7443738,24.7815459 L40.0000197,16.7500376 L36.7106129,16.7495655 Z M27.4469443,26.7834326 C25.1178168,28.4543798 22.3144122,29.3349046 19.4481719,29.2958733 C19.0723387,29.290955 18.7010302,29.2616029 18.3301938,29.2324081 C18.1786329,29.2181255 18.0325018,29.1938097 17.8805868,29.1695332 C17.5875375,29.1308167 17.2993279,29.0967037 17.0161152,29.0345763 C16.8403958,29.0053816 16.6645977,28.9523825 16.4982427,28.9133118 C16.2199482,28.8503189 15.9417325,28.7869717 15.6729204,28.7047779 C15.5457147,28.6561855 15.4237813,28.6148329 15.291618,28.5595123 C14.9742529,28.4574487 14.6621996,28.3459028 14.3637206,28.2199955 C14.2955339,28.1908007 14.2289998,28.1616059 14.1637641,28.1377623 C13.8121286,27.972863 13.4602177,27.803321 13.1235731,27.6235096 C13.1091331,27.6136731 13.094221,27.609227 13.0785219,27.5992331 C11.9335131,26.9600175 10.885925,26.1597193 9.96825759,25.2229297 C9.95373891,25.2081749 9.93898414,25.1888167 9.92320639,25.1743767 C9.64007236,24.8835702 9.36669614,24.5828091 9.10772058,24.2577322 C9.05369848,24.1899784 9.00530286,24.126946 8.94628382,24.0491589 C7.00695736,21.5751593 5.95445107,18.5215139 5.95783483,15.3780022 L9.27415428,15.3780022 L5.26451844,7.44316712 L-1.96730148e-05,15.4786494 L3.28474427,15.4786494 C3.28281631,18.8620931 4.29806191,22.1681039 6.19867187,24.9671805 C6.21602347,25.0073134 6.23699491,25.0458726 6.26123206,25.082307 C6.44922739,25.3614277 6.66578794,25.6141079 6.86448539,25.8707621 C6.94506606,25.9637761 7.012033,26.0608821 7.09241694,26.1673918 C7.38735478,26.5307524 7.7136514,26.8803812 8.03640688,27.22159 C8.0724085,27.2571194 8.09896707,27.283678 8.1263519,27.3147614 C9.21847965,28.4271916 10.4631126,29.3788541 11.8230294,30.1410654 C11.8585589,30.1634926 11.8899964,30.1765555 11.9300113,30.202996 C12.3188287,30.4157006 12.7211812,30.615185 13.1231403,30.7923995 C13.2259515,30.8372933 13.3244346,30.8854135 13.4225636,30.927199 C13.7712481,31.0778156 14.1287461,31.2018343 14.4865983,31.3318729 C14.6563764,31.3938036 14.8219445,31.446842 14.9958933,31.504484 C15.3105041,31.5974586 15.6307021,31.677095 15.9569987,31.7525607 C16.1713559,31.8055598 16.3813063,31.8587556 16.6003457,31.9031773 C16.6865922,31.9300506 16.7746092,31.9508253 16.8638067,31.9652653 C17.1720828,32.0227499 17.4759522,32.0493478 17.779979,32.089284 C17.8918004,32.1117112 18.0046841,32.1292596 18.1106823,32.1423225 C18.6606218,32.1953216 19.205761,32.2322281 19.7557398,32.2322281 C23.093975,32.2322281 27.1326089,31.1641802 29.6308064,28.8063693 C30.3774366,28.0973539 30.2322104,27.1262939 29.9085106,26.7694254 C29.4666547,26.2748458 28.4250473,26.0847258 27.4481641,26.7883508 L27.4469443,26.7834326 Z" id="Fill-1" fill="#FD6B11" mask="url(#mask-replay)"></path></g></g></g></svg>';
    imgs.volumeBig = '<svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><polygon id="path-big" points="0 0 26.8423108 0 26.8423108 40 0 40"></polygon></defs><g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(5.000000, 10.000000)"><path d="M35.8149612,31.5806068 C35.0352449,32.3066434 33.8176234,32.2741331 33.0781291,31.5071185 C32.725809,31.1409626 32.5349815,30.6486217 32.5491953,30.140328 C32.563031,29.6323368 32.7806983,29.151261 33.1531295,28.8051405 C38.368375,23.9298159 38.368375,16.0694474 33.1531295,11.1935935 C32.7806983,10.847473 32.563031,10.3663216 32.5491953,9.85810353 C32.5349815,9.3500367 32.725809,8.85784696 33.0781291,8.49153985 C33.8176234,7.72452526 35.0352449,7.69178822 35.8149612,8.41805161 C42.6427897,14.8019265 42.6427897,25.1973368 35.8149612,31.5812872 L35.8149612,31.5806068 Z M42.2807164,39.21295 C41.5087119,39.9465471 40.2913172,39.9262093 39.5441112,39.1672089 C39.1873304,38.8048333 38.9912861,38.3142312 39.0001319,37.8057108 C39.0086753,37.2974171 39.2216551,36.8136952 39.5905328,36.4640212 C49.1259341,27.3633497 49.1259341,12.6353087 39.5905328,3.53463721 C39.2216551,3.18466082 39.0089777,2.70124127 39.0004343,2.19332565 C38.9915885,1.68503201 39.1873304,1.19450558 39.5441112,0.832054327 C40.2913172,0.0730538916 41.5087119,0.0527917025 42.2807164,0.786313191 C53.3905201,11.3896377 53.3905201,28.6096255 42.2807164,39.21295 L42.2807164,39.21295 Z" id="Fill-1" fill="#000000"></path><g><mask id="mask-big" fill="white"><use xlink:href="#path-big"></use></mask><g id="Clip-2"></g><path d="M11.6398214,10.1428817 L23.7560555,0.417867188 C24.3256512,-0.0391141918 25.106686,-0.129190827 25.7649498,0.186781698 C26.42351,0.502457674 26.8423108,1.16791271 26.8423108,1.8983119 L26.8423108,38.1026691 C26.8417177,38.8318821 26.4238066,39.4962251 25.766729,39.8124942 C25.1095774,40.1284667 24.3297287,40.0400952 23.7600589,39.5851897 L11.3096886,29.647624 L1.89805185,29.647624 C0.849678439,29.647624 -7.4137148e-06,28.7979381 -7.4137148e-06,27.7495647 L-7.4137148e-06,12.0405703 C-7.4137148e-06,10.9925676 0.849678439,10.1428817 1.89805185,10.1428817 L11.6398214,10.1428817 Z M3.79574042,13.9386295 L3.79574042,25.851802 L12.6400798,25.851802 L23.0461923,34.1589436 L23.0461923,5.85538217 L12.9759952,13.9386295 L3.79574042,13.9386295 Z" id="Fill-1" fill="#000000" mask="url(#mask-big)"></path></g></g></g></svg>';
    imgs.mute = '<svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><polygon id="path-mute1" points="0 0 26.8423108 0 26.8423108 40 0 40"></polygon><polygon id="path-mute2" points="0 0 51.2347511 0 51.2347511 40 0 40"></polygon></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(4.000000, 10.000000)"><g transform="translate(1.000000, 0.000000)"><mask id="mask-mute1" fill="white"><use xlink:href="#path-mute1"></use></mask><g id="Clip-2"></g><path d="M11.6398214,10.1428817 L23.7560555,0.417867188 C24.3256512,-0.0391141918 25.106686,-0.129190827 25.7649498,0.186781698 C26.42351,0.502457674 26.8423108,1.16791271 26.8423108,1.8983119 L26.8423108,38.1026691 C26.8417177,38.8318821 26.4238066,39.4962251 25.766729,39.8124942 C25.1095774,40.1284667 24.3297287,40.0400952 23.7600589,39.5851897 L11.3096886,29.647624 L1.89805185,29.647624 C0.849678439,29.647624 -7.4137148e-06,28.7979381 -7.4137148e-06,27.7495647 L-7.4137148e-06,12.0405703 C-7.4137148e-06,10.9925676 0.849678439,10.1428817 1.89805185,10.1428817 L11.6398214,10.1428817 Z M3.79574042,13.9386295 L3.79574042,25.851802 L12.6400798,25.851802 L23.0461923,34.1589436 L23.0461923,5.85538217 L12.9759952,13.9386295 L3.79574042,13.9386295 Z" id="Fill-1" fill="#000000" mask="url(#mask-mute1)"></path></g><g><mask id="mask-mute2" fill="white"><use xlink:href="#path-mute2"></use></mask><g id="Clip-2"></g><path d="M40.7960637,16.1972178 L47.8185568,6.83480803 C48.447314,5.99609448 49.6369186,5.826098 50.4755581,6.4551517 C51.3140492,7.08413126 51.4839715,8.27351352 50.854992,9.11215294 L43.1684525,19.3607981 L50.854992,29.6096657 C51.4839715,30.4480086 51.3140492,31.6376874 50.4755581,32.2667411 C49.6369186,32.8957207 48.447314,32.7257242 47.8185568,31.8870848 L40.7960637,22.5246009 L33.7738672,31.8870848 C33.1448877,32.7257242 31.9555054,32.8957207 31.1167918,32.2667411 C30.2781524,31.6376874 30.1084525,30.4480086 30.7371355,29.6096657 L38.423675,19.3607981 L30.7371355,9.11215294 C30.1084525,8.27351352 30.2781524,7.08413126 31.1167918,6.4551517 C31.9555054,5.826098 33.1448877,5.99609448 33.7738672,6.83480803 L40.7960637,16.1972178 Z" id="Fill-1" fill="#000000" mask="url(#mask-mute2)" style="display:none;"></path></g></g></g></svg>';
    imgs.max = '<svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><polygon id="path-max1" points="0 0 26.8423108 0 26.8423108 40 0 40"></polygon></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(5.000000, 10.000000)"><path d="M35.8149612,31.5806068 C35.0352449,32.3066434 33.8176234,32.2741331 33.0781291,31.5071185 C32.725809,31.1409626 32.5349815,30.6486217 32.5491953,30.140328 C32.563031,29.6323368 32.7806983,29.151261 33.1531295,28.8051405 C38.368375,23.9298159 38.368375,16.0694474 33.1531295,11.1935935 C32.7806983,10.847473 32.563031,10.3663216 32.5491953,9.85810353 C32.5349815,9.3500367 32.725809,8.85784696 33.0781291,8.49153985 C33.8176234,7.72452526 35.0352449,7.69178822 35.8149612,8.41805161 C42.6427897,14.8019265 42.6427897,25.1973368 35.8149612,31.5812872 L35.8149612,31.5806068 Z M42.2807164,39.21295 C41.5087119,39.9465471 40.2913172,39.9262093 39.5441112,39.1672089 C39.1873304,38.8048333 38.9912861,38.3142312 39.0001319,37.8057108 C39.0086753,37.2974171 39.2216551,36.8136952 39.5905328,36.4640212 C49.1259341,27.3633497 49.1259341,12.6353087 39.5905328,3.53463721 C39.2216551,3.18466082 39.0089777,2.70124127 39.0004343,2.19332565 C38.9915885,1.68503201 39.1873304,1.19450558 39.5441112,0.832054327 C40.2913172,0.0730538916 41.5087119,0.0527917025 42.2807164,0.786313191 C53.3905201,11.3896377 53.3905201,28.6096255 42.2807164,39.21295 L42.2807164,39.21295 Z" id="Fill-1" fill="#000000"></path><g><mask id="mask-max1" fill="white"><use xlink:href="#path-max1"></use></mask> <g id="Clip-2"></g><path d="M11.6398214,10.1428817 L23.7560555,0.417867188 C24.3256512,-0.0391141918 25.106686,-0.129190827 25.7649498,0.186781698 C26.42351,0.502457674 26.8423108,1.16791271 26.8423108,1.8983119 L26.8423108,38.1026691 C26.8417177,38.8318821 26.4238066,39.4962251 25.766729,39.8124942 C25.1095774,40.1284667 24.3297287,40.0400952 23.7600589,39.5851897 L11.3096886,29.647624 L1.89805185,29.647624 C0.849678439,29.647624 -7.4137148e-06,28.7979381 -7.4137148e-06,27.7495647 L-7.4137148e-06,12.0405703 C-7.4137148e-06,10.9925676 0.849678439,10.1428817 1.89805185,10.1428817 L11.6398214,10.1428817 Z" id="Fill-1" fill="#000000" mask="url(#mask-max1)"></path></g></g></g></svg>';

    var playHtml = '<div id="articlePlayer" class="VolumeMax" onselectstart="return false">'
        +'	<span class="playTitle">无障碍语音播报</span>'
        +'	<div id="articleTime">0:00 / 0:00</div>'
        +'	<div id="ar_mp3_progress">'
        +'		<div class="Mp3LongShow"><span></span></div>'
        +'	</div>'
        +'	<button class="article_main_item pause" id="ar_play_pause" style="margin-left:20px;">'
        +       imgs.play
        +'	</button>'
        +'	<button class="article_main_item refresh" id="ar_replay" title="重新播放" style="margin-left:10px;">'
        +	    imgs.replay
        +'	</button>'
        +'	<div id="voiceCtrl">'
        +'		<button class="article_main_item VolumeLow" id="ar_volume_mute" title="静音">'
        +           imgs.mute
        +'		</button>'
        +'		<div class="Volume" id="ar_volume_progress" style="margin-right: 2px;">'
        +'			<div class="VolumeShow"><span></span></div>'
        +'		</div>'
        +'		<button class="article_main_item VolumeLoud" id="ar_volume_max" title="最大音量" style="margin-right: 7px;">'
        +           imgs.volumeBig
        +'		</button>'
        +'	</div>'
        +'</div>';

    getReady();
})(window.jQuery, window.esdArOption||{})