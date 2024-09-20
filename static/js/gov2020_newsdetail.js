//控制文字大小
function changeSize(size) {
    if(size==18){
        $("#js_content").addClass("bigsize");
        $("#js_content").removeClass("smallsize");
    }else if(size==16){
        $("#js_content").removeClass("bigsize");
        $("#js_content").removeClass("smallsize");
    }else if(size=14){
        $("#js_content").addClass("smallsize");
        $("#js_content").removeClass("bigsize");
    }
}
//大中小添加选中样式
$(".content_box .right .changeSize").click(function(){
    $(this).addClass('cur').siblings().removeClass('cur')
})
$(".xinwen_details .changeSize").on("click",function(){
    $(this).addClass('cur').siblings().removeClass('cur')
})
var widthnow=$(window).width();
if(widthnow<751){
    $('.body_box').removeClass("body_box_pc");
    $('.body_box').addClass("body_box_phone");
}
$(window).resize(function() {
    var widthnow = $(window).width();
    var heigthnow = $(window).height();
    if(widthnow<751){
        $('.body_box').removeClass("body_box_pc");
        $('.body_box').addClass("body_box_phone");
    }else{
        $('.body_box').removeClass("body_box_phone");
        $('.body_box').addClass("body_box_pc");
    }
    
});




$(function(){
    var phoneWidth = parseInt(window.screen.width);
    if(phoneWidth <= 750){
        $('.info_box .odd').each(function(){
            if($.trim($(this).text()) == ''){
                $(this).next().remove()
                $(this).remove()
            }
         })
    }

    // 打印功能
    function printpage(){    
			
        // body全局打印
        // 页面缩放，此处缩放为50%，不缩放的话页面超出就打印不出来，这个需要自己调试，看自己
        document.getElementsByTagName('body')[0].style.zoom=0.6;
        
        // 调用window的打印功能
        window.print(); 
        
        // 将页面缩放调整到最初状态
        document.getElementsByTagName('body')[0].style.zoom=1;
        return false; 
    }


    $(".dayin").on("click",function(){
        // printpage();
    })
    //全文下载
    $('.js_download').hover(function(){
        $(this).find('ul').show()
    },function(){
        $(this).find('ul').hide()
    })
    if($(".js_download .js_word").length>0 || $(".js_download .js_pdf").length>0){
        $(".js_download").on("click",'.js_word,.js_pdf',function () {
            if(typeof ownerUrl!="undefined"){
                ownerUrl=ownerUrl.replace(/^http:\/\/[^/]+/, "");
                if($(this).hasClass('js_word')){
                    var downloadUrl="http://new.qingdao.gov.cn/common/print/doc?path=qingdao&file="+ownerUrl;
                }else if($(this).hasClass('js_pdf')){
                    var downloadUrl="http://new.qingdao.gov.cn/common/print/pdf?path=qingdao&file="+ownerUrl;
                }else{
                    return false
                }
                window.open(downloadUrl);
                $('.js_download ul').hide()
            }
        });
    }else{
        $(".js_download").on("click",function () {
            if(typeof ownerUrl!="undefined"){
                ownerUrl=ownerUrl.replace(/^http:\/\/[^/]+/, "");
                var downloadUrl="http://new.qingdao.gov.cn/common/print/pdf?path=qingdao&file="+ownerUrl;
                window.open(downloadUrl);
            }
        });
    }
    
    var widthnow=$(window).width();
    if(widthnow<751){
        // 电话pc hover
        $('.last_add').on("click",".dianhua",function(e){
            var $this=$(this);
            $this.parent(".tixing_right").siblings(".dianuafuceng").addClass("showthis");
             // 点击其他地方关闭
             $(document).click(function(e){
                if(!($(e.target).parents().hasClass("dianhuareal")||$(e.target).hasClass("dianhuareal"))){
                    // 点击浮层本身之外
                    $(".last_add .dianuafuceng").removeClass("showthis");
                }
            });
            e.stopPropagation();
        });

        // 手机端 浮层点击取消
        $('.last_add').on("click",".fucengbotton",function(e){
            var $this=$(this);
            $this.parent(".tixing_right").siblings(".gwfg_fuceng").addClass("showthis");
            // 点击其他地方关闭
            $(document).click(function(e){
                if(!($(e.target).parents().hasClass("fucenglist")||$(e.target).hasClass("fucenglist"))){
                    // 点击浮层本身之外
                    $(".last_add .gwfg_fuceng").removeClass("showthis");
                }
            });
            e.stopPropagation();
        });

    }else{
        // pc 联系电话hover
        $(".last_add.add2 .dianhua").hover(function(){
            var $this=$(this);
            $this.parent(".tixing_right").siblings(".dianuafuceng").addClass("showthis");
            },function(){
                var $this=$(this);
                $this.parent(".tixing_right").siblings(".dianuafuceng").removeClass("showthis");
        });
        // pc 浮层点击取消
        $('.last_add').on("click",".fucengbotton",function(e){
            var $this=$(this);
            $this.parent(".tixing_right").siblings(".gwfg_fuceng").addClass("showthis");
            // 点击其他地方关闭
            $(document).click(function(e){
                if(!($(e.target).parents().hasClass("gwfg_fuceng")||$(e.target).hasClass("gwfg_fuceng"))){
                    // 点击浮层本身之外
                    $(".last_add .gwfg_fuceng").removeClass("showthis");
                }
            });
            e.stopPropagation();
        });
    }
    $(".last_add .gwfg_fuceng").on("click",".closelogo",function(){
        var $this=$(this);
        $this.parents(".gwfg_fuceng").removeClass("showthis");
    });
    $('.last_add').on("click",".dianhua",function(e){
        var $this=$(this);
        $this.parent(".tixing_right").siblings(".dianuafuceng").addClass("showthis");
    });

    //详情页表头
    if($('div').hasClass('js_infoBox')&&widthnow > 750){
        var infoBox=$(".js_infoBox li").length;
        if(infoBox%3==1){
            var html='<li><span class="odd">&nbsp;</span><span class="even">&nbsp;</span></li><li><span class="odd">&nbsp;</span><span class="even">&nbsp;</span></li>';
            $(".js_infoBox").append(html);
        }else if(infoBox%3==2){
            var html='<li><span class="odd">&nbsp;</span><span class="even">&nbsp;</span></li>';
            $(".js_infoBox").append(html);
        }
    }

    // 元数据 网上问政 a链接
    function openWszx(suoyinhao, wenzhangid, wenzhangtitle, codema) {
        if (suoyinhao == "") {
            return;
        }
        var suoyinhaoArr = ["697193307", "00511818x", "740350161", "427403108", "005118163", "330253143",
        "005117734", "005118120", "005118462", "502925329", "753795442", "595297375", "005117574", "005117865", "005118008",
        "005117822", "763618626", "427600881", "005117785", "427401903", "727834292", "005117558", "005118059", "557745704",
        "550816450", "005118155", "005118534", "005118817", "502928706", "005117953", "717809480", "005118331", "005118884",
        "667871912", "987654321", "005119350", "005117582", "005118913", "005118948", "005117910", "005118489", "502927738",
        "857790600", "564749017", "00511770X", "005118681", "427402877", "163585613", "005117929", "73352475x", "005118470",
        "005118825", "00511885X", "427406536", "427403386", "73060915x", "0511811-2", "005118016", "005118139", "005118569",
        "005118876", "770275561", "427406843", "005118243", "005117750", "005117830", "718094069", "005118147", "502927631",
        "427407846", "QDSTGB000", "005118614", "005117937", "k23503845", "005118032", "73351755X", "427406974", "005118921",
        "005118905", "73063251X", "718086712", "005118104", "005117769", "005118075", "011385876", "725584242", "005117742",
        "005118040", "005118964", "F67921401"];
    
        var suoyinhaoDeptArr = ["市商务局", "市质监局", "青岛市仲裁办", "青岛市贸促会", "市水利局", "青岛市人民政府研究室",
        "青岛市城乡建设委员会", "青岛市总工会", "市环保局", "青岛市红十字会", "青岛保税区", "青岛市金融工作办公室", "青岛市人大办公厅",
        "市交通委", "市民政局", "市旅游局", "青岛保监局", "市机关事务管理局", "市教育局", "市城管执法局",
        "市法制办", "青岛市政府办公厅", "市畜牧局", "市文广新局", "市经信委",
        "市人社局", "市公安局", "市海洋与渔业局", "青岛市侨联", "青岛市司法局", "青岛证监局", "市国税局", "市农委",
        "青岛高新区", "青岛市城市园林局", "市财政局", "青岛市监察局", "市侨办", "市外办", "市统计局",
        "市审计局", "青岛市文联", "青岛市供销社", "市文化执法局", "市林业局", "青岛海关", "青岛市残联",
        "青岛供电公司", "青岛市科协", "市安监局", "市气象局", "市物价局", "青岛市工商联", "青岛市电子政务和信息资源管理办公室",
        "市广播电视台", "市市政公用局", "人民银行青岛市中心支行", "市规划局", "市科技局", "市农机局", "市国资委",
        "青岛市烟草专卖局", "青岛市社科院", "青岛市人口和计划生育委员会", "市口岸办", "市体育局", "市食品药品监管局",
        "青岛市妇联", "共青团青岛市委", "青岛市国内经济合作办公室", "青岛市体改办", "市粮食局", "市发改委", "市地震局", "市档案局",
        "青岛市信息产业局", "市住房公积金中心", "市民族宗教局", "市老龄办", "市国土资源房管局", "青岛市招商局",
        "青岛市劳动保障局", "青岛市人民防空办公室", "青岛市委老干局", "青岛检验检疫局", "青岛市史志办", "市卫生计生委",
        "市工商局", "市地税局", "市盐务局"];
        var dept = "";
        suoyinhao = suoyinhao.substr(0, 9);
        for (var i = 0; i < 90; i++) {
            if (suoyinhao == suoyinhaoArr[i]) {
                try {
                    dept = suoyinhaoDeptArr[i];
                    break;
                }
                catch (e) { }
            }
        }
        if (dept == "") {
            dept = "市长信箱";
        }
        var deptStr = escape(dept, 'GB2312');
        var wenzhangidStr = escape(wenzhangid, 'GB2312');
        var wenzhangtitleStr = escape(wenzhangtitle, 'GB2312');
        var codemaStr = escape(codema, 'GB2312');
        window.open("http://govmail.qingdao.gov.cn/governmentNew/wszxtmp.aspx?depart=" + deptStr + "&id=" + wenzhangidStr + "&title=" + wenzhangtitleStr + "&code=" + codemaStr);
    }
    // 点击网上问政 跳转a链接
    $(".last_add").on("click",".tixing_right .zixunalink",function(){
        openWszx(suoyinhao, wenzhangid, wenzhangtitle, codema);
    })

    /**
     * 解决uc浏览器下  文字占半行问题
     */
    if(navigator.userAgent.indexOf('UCBrowser') > -1 && $(window).width() < 751){
        setTimeout(function(){
            $('#js_content').html( $('#js_content').html())
            $('.crumbs_box').html($('.crumbs_box').html())
        },50)
    }
})