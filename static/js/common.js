// 本站点/全网之间切换 sitetype变量判断是否为本站
var sitetype = "only";
$(".js_zhandianxuanze").on("click", function () {
    var $thisait = $(this).find(".op.cur");
    $thisait.removeClass("cur").siblings(".op").addClass("cur");
    if ($(".js_zhandianxuanze .op.cur").text() == "本站") {
        sitetype = "only";
    } else {
        sitetype = "all";
    }
});
var widthpcphone = $(window).width();
//  手机端展示pc的样式 通过媒体查询
function yidongShowpc() {
    if ($(".js_zhanshipc").length > 0 && widthpcphone <= 750) {
        if (!sessionStorage.getItem("ifShowphone")) {
            sessionStorage.setItem("ifShowphone", "no");
            $(".js_zhanshipc").addClass("showthis");
            $(".js_zhanshiphone").removeClass("showthis");
        }
        $(".js_zhanshipc").on("touchend", function () {
            sessionStorage.setItem("ifShowphone", "yes");
            window.location.reload();
        });
        $(".js_zhanshiphone").on("touchend", function () {
            sessionStorage.setItem("ifShowphone", "no");
            window.location.reload();
        });
    }
}
// yidongShowpc();
function PhonePCresizeScreen() {
    if (widthpcphone > 750) {
        var phoneWidth = parseInt(window.screen.width);
        var phoneScale = phoneWidth / 750;
        var ua = navigator.userAgent;

        if (phoneWidth > 750) {
            $("meta[name='viewport']").attr(
                "content",
                "width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
            );
        } else {
            $("meta[name='viewport']").attr(
                "content",
                "width=750, user-scalable=no, target-densitydpi=device-dpi"
            );
        }

        if ($(".js_zhanshipc").length > 0) {
            $(".js_zhanshipc").removeClass("showthis");
            $(".js_zhanshiphone").removeClass("showthis");
        }
    } else {
        var ifShowphone = sessionStorage.getItem("ifShowphone");
        if ($(".js_zhanshipc").length > 0) {
            if (ifShowphone == "no") {
                var phoneWidth = parseInt(window.screen.width);
                var phoneScale = phoneWidth / 750;
                var ua = navigator.userAgent;

                if (phoneWidth > 750) {
                    $("meta[name='viewport']").attr(
                        "content",
                        "width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
                    );
                } else {
                    $("meta[name='viewport']").attr(
                        "content",
                        "width=750, user-scalable=no, target-densitydpi=device-dpi"
                    );
                }
                $(".js_zhanshipc").addClass("showthis");
                $(".js_zhanshiphone").removeClass("showthis");
            } else {
                $(".js_zhanshiphone").addClass("showthis");
                $(".js_zhanshipc").removeClass("showthis");
                $("meta[name='viewport']").attr(
                    "content",
                    "width=1366, user-scalable=no, target-densitydpi=device-dpi"
                );
            }
        }
    }
}

function resizeScreen(screenwidth) {
    var metaattr =
        "width=" +
        screenwidth +
        ", user-scalable=no, target-densitydpi=device-dpi";
    var phoneWidth = parseInt(window.screen.width);
    var phoneScale = phoneWidth / screenwidth;
    var ua = navigator.userAgent;
    if (phoneWidth > screenwidth) {
        $("meta[name='viewport']").attr(
            "content",
            "width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
        );
    } else {
        $("meta[name='viewport']").attr("content", metaattr);
    }
}

if (widthpcphone < 751) {
    $(".o_main").animate({ opacity: "1" }, 50);
}
$(window).resize(function () {
    var widthwww = $(window).width();
    if (widthwww < 751) {
        $(".o_main").animate({ opacity: "1" }, 50);
    }
});
// var bumen_list = [
//     {"市教育局": 140121133703375766},
//     {"市公安局": 140121134008096621},
//     {"市人力资源社会保障局": 140121134635416514},
//     {"市民政局": 140121134052634586},
//     {"市住房和城乡建设局": 140121134735618874},
//     {"市自然资源和规划局": 140121135256439264},
//     {"市城市管理局": 140121135406639748},
//     {"市交通运输局": 140121135443830275},
//     {"市卫生健康委": 140625091914826186},
//     {"市生态环境局": 140121140423109034},
//     {"市市场监管局": 190212143254236634},
//     {"市医保局": 190212143316642648},
//     {"市发展改革委": 140121133205008720},
//     {"市工业和信息化局": 140121133602285122},
//     {"市科技局": 140121133813435833},
//     {"市司法局": 140121134215939541},
//     {"市农业农村局": 140121135527246668},
//     {"市水务管理局": 140121135614374230},
//     {"市海洋发展局": 140121135703717601},
//     {"市园林和林业局": 140121135821593188},
//     {"市商务局": 140121135908330714},
//     {"市文化和旅游局": 140121140051151006},
//     {"市体育局": 140121140746238236},
//     {"市应急管理局": 140121141222719147},
//     {"部门联合上线": 150507140202653480},
//     {"市政府办公厅": 140121123837866802},
//     {"市财政局": 140121134336357716},
//     {"市审计局": 140121140328135034},
//     {"市政府外办": 140121140633230501},
//     {"市统计局": 140121141123267307},
//     {"市政府国资委": 140121144519413557},
//     {"青岛保税港区管委": 140121143528076725},
//     {"市住房公积金管理中心": 140121142538484378},
//     {"市供销社": 140121142308908124},
//     {"市退役军人局": 190212144224082543},
//     {"市民营经济局": 190212144244580131},
//     {"市地方金融监管局": 140121141946027040},
//     {"市行政审批局": 160115100259909766},
//     {"市国资委": 190212144625439440},
//     {"市大数据局": 190212145911173700},
//     {"市政府研究室": 190212145938861188},
//     {"市信访局": 190218145249689640},
// ];
// 互动头部 获取参数产生链接
// 首页，回音壁，问题查询
function hudonglianjie() {
    var hudongheader = window.location.href;
    if (hudongheader.indexOf("hudong_header_zxwz3") != -1) {
        function getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return false;
        }
        // var realid= getQueryVariable("bumenid");
        var realname = decodeURIComponent(getQueryVariable("bumenname"));
        // console.log(realname);
        $(".header_sp .header_center .name").text(realname);
        // $(".header_sp .nav_list a").eq(1).attr("href","http://zxwz.qingdao.gov.cn/Site/ListEchoWall.aspx?department="+realid);
        // $(".header_sp .nav_list a").eq(2).attr("href","http://zxwz.qingdao.gov.cn/Site/ListQue.aspx?department="+realid);
    }
}
hudonglianjie();

// 繁简体切换
setTimeout(function () {
    FanJianChange();
}, 300)
function FanJianChange() {
    if ($.cookie('FanJianChange') == undefined) {
        $.cookie('FanJianChange', 'jian', { path: '/', domain: 'qingdao.gov.cn' })
    } else {
        if ($.cookie('FanJianChange') == "jian") {
            $(".js_fanjianchange").html("<a href='javascript:;' title='繁体中文'><span>繁体中文</span></a>")
            // textT_S();
        } else {
            $(".js_fanjianchange").html("<a href='javascript:;' title='簡體中文'><span>簡體中文</span></a>");
            textS_T();
        }
    }
    $("body").off("click", ".js_fanjianchange");
    $("body").on("click", ".js_fanjianchange", function (e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        } else {
            window.event.returnValue = false; //兼容IE
        }
        if ($.cookie('FanJianChange') == "jian") {
            $.cookie('FanJianChange', 'fan', { path: '/', domain: 'qingdao.gov.cn' });
            $(".js_fanjianchange").html("<a href='javascript:;' title='简体中文'><span>简体中文</span></a>");
            // $(".js_fanjianchange").find("a").attr("title","簡體中文")
            textS_T();
        } else {
            $.cookie('FanJianChange', 'jian', { path: '/', domain: 'qingdao.gov.cn' })
            $(".js_fanjianchange").html("<a href='javascript:;' title='繁體中文'><span>繁體中文</span></a>")
            // $(".js_fanjianchange").find("a").attr("title","简体中文")
            textT_S();
        }
    })

}
// 为所有 AJAX 请求设置默认选项 请求完成之后 添加a的点击url替换事件
function AjaxDefaultSetting() {
    $.ajaxSetup({
        success: function (result) {
            setTimeout(function () {
                FanJianChange();
            }, 300)
        }
    });
    $.ajax();
}
AjaxDefaultSetting();

//登陆功能
var USER_NAME = $.cookie("USER_NAME");
var USER_ID = $.cookie("USER_ID");
var USER_TOKEN = $.cookie("USER_TOKEN");//token
if (USER_NAME && USER_ID) {
    //登陆
    $(".js_login").show();
    $(".js_nologin").hide();
    var locUrl = window.location.href;
    var loginInfo =
        "<a target='_blank' href='http://qdzwfw.sd.gov.cn/qd/uinfo'><span>您好，" +
        USER_NAME +
        "！</span></a>";
    loginInfo +=
        "<a href='" +
        // www.退出暂时不好用 先使用new
        // config.apiUrl +
        "http://new.qingdao.gov.cn"+
        "/common/auth/logout?target=" +
        delHtml(locUrl) +
        "' style='margin-left: 10px;'><span>退出</span></a>";
    $(".js_login").html(loginInfo);
    //登陆后政务服务链接
    // var loginZWFW='http://login.qingdao.gov.cn/auth/sso/oauth?goto=aHR0cDovL3Fkendmdy5zZC5nb3YuY24vcWQvcHVibGljL2luZGV4L3N0YXRpY2h0bWwvaW5kZXhfcWQ%3D&ticket=3bqOcN&utype=0&state=-1950457162&client_id=MNXCPU5AL';
    var loginZWFW =
        "http://qdzwfw.sd.gov.cn/qd/login?goto=http%3A%2F%2Fqdzwfw.sd.gov.cn%2Fqd%2Fpublic%2Findex%2Fstatichtml%2Findex_qd&loginType=login";
    $(".js_showModel a,.js_youce a").each(function (index, item) {
        if ($.trim($(this).text()) == "政务服务") {
            $(this).attr("href", loginZWFW);
        }
    });
    //登陆后企业开办/企业注销链接
    var loginQykb =
        "http://amr-wsdj.qingdao.gov.cn/psout/jsp/gcloud/wsdj/callback.jsp";
    $(".part_3 li a,.part_4_right .a_box a").each(function () {
        if (
            $.trim($(this).text()).indexOf("企业开办") >= 0 ||
            $.trim($(this).text()).indexOf("企业注销") >= 0
        ) {
            $(this).attr("href", loginQykb);
        }
    });
} else {
    //未登录
    $(".js_nologin").show();
    $(".js_login").hide();
    var baseUrl = window.location.href;
    if ($(".header_sp").length > 0) {
        baseUrl = $.base64.btoa("http://www.qingdao.gov.cn/zmhd/");
    } else {
        baseUrl = $.base64.btoa(baseUrl);
    }
    $(".js_nologin a").attr(
        "href",
        "http://login.qingdao.gov.cn/auth/sso/login?utype=0&client_id=5BLDBAEPQ&goto=" +
        baseUrl
    );
}

if (USER_TOKEN) {
    $(".js_zycf").off("click");
    $(".js_zycf").on("click", function (e) {
        var $this = $(this);
        if (e && e.preventDefault) {
            e.preventDefault();
        } else {
            window.event.returnValue = false; //兼容IE
        }
        var NewHref = $this.attr("href");
        $.ajax({
            type: "get",
            url: "http://www.qingdao.gov.cn/common/auth/get/ticket?token=" + USER_TOKEN,
            dataType: "json",
            success: function (data) {
                if (data.isSuccess) {
                    var ticket = data.data;
                    NewHref = "http://www.shandong.gov.cn/policyservices/#/home?ticket=" + ticket + "&regioncode=370200000000";
                    window.open(NewHref);
                }

            }

        })

    })

}

// 互动头部input 搜索为空
$(".js_hudonginput").on("click", function () {
    var $this = $(this).siblings("input");
    var Searchtext = $this.val();
    if (Searchtext == "") {
        alert("请输入搜索关键词！");
    }
});

// 保存 Cookie
function setCookie(name, value) {
    document.cookie = name + "=" + escape(value) + ";path=/";
}
var maxDate = new Date("9999-12-31T23:59:59"); //我尽力了 到了日子代码还在运行的话~，嘿嘿嘿~~~溜溜旗
if (isIe8) {
    maxDate = new Date("2030-12-31T23:59:59");
}
var cookieArr = [];
function setCookieArr(name, value) {
    getCookieArr(name);
    if (cookieArr.length > 0) {
        var indexOfNum = -1;
        for (var i = 0; i < cookieArr.length; i++) {
            if (cookieArr[i] == value) {
                indexOfNum = i;
            }
        }
        if (indexOfNum == -1) {
            if (cookieArr.length >= 5) {
                //未包含就判断长度是否为最大，如果是删去第一个，如果不是直接尾部添加
                cookieArr = cookieArr.slice(0, 4);
            }
        } else {
            cookieArr.splice(indexOfNum, 1);
        }
    }
    cookieArr.unshift(value);
    var cookieStr = cookieArr.join("&");
    $.cookie(name, cookieStr, {
        path: "/",
        expires: maxDate,
        // 'domain':window.location.host
    });
}

// 获取 Cookie
function getCookie(name) {
    cookie_name = name + "=";
    cookie_length = document.cookie.length;
    cookie_begin = 0;
    while (cookie_begin < cookie_length) {
        value_begin = cookie_begin + cookie_name.length;
        if (
            document.cookie.substring(cookie_begin, value_begin) == cookie_name
        ) {
            var value_end = document.cookie.indexOf(";", value_begin);
            if (value_end == -1) {
                value_end = cookie_length;
            }
            return unescape(document.cookie.substring(value_begin, value_end));
        }
        cookie_begin = document.cookie.indexOf(" ", cookie_begin) + 1;
        if (cookie_begin == 0) {
            break;
        }
    }
    return "";
}
function getCookieArr(name) {
    if (!$.cookie(name) || $.cookie(name) == "null" || $.cookie(name) == "") {
        return false;
    } else {
        var cookieStr = $.cookie(name);
        cookieArr = cookieStr.split("&");
        return cookieArr;
    }
}

// 清除 Cookie
function delCookie(name) {
    var expireNow = new Date();
    document.cookie =
        name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT" + "; path=/";
}
// 获取地址栏参数
function getParamFromUrl(paramName) {
    paramValue = "";
    isFound = false;
    if (
        this.location.search.indexOf("?") == 0 &&
        this.location.search.indexOf("=") > 1
    ) {
        arrSource = unescape(this.location.search)
            .substring(1, this.location.search.length)
            .split("&");
        i = 0;
        while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf("=") > 0) {
                if (
                    arrSource[i].split("=")[0].toLowerCase() ==
                    paramName.toLowerCase()
                ) {
                    paramValue = arrSource[i].split("=")[1];
                    isFound = true;
                }
            }
            i++;
        }
    }
    return paramValue;
}

//显示提示弹层
function openTips(isSuccess, title) {
    if (isSuccess) {
        $(".js_tips").addClass("cur success");
        $(".js_tips .success").find("p").html(title);
    } else {
        $(".js_tips").addClass("cur fail");
        $(".js_tips .fail").find("p").html(title);
    }
    $(".o_main").append('<div class="tipShadow"></div>');
    // $('body').css('overflow', 'hidden')
}
// 关闭弹层
function closeTips() {
    $(".js_tips").removeClass("cur");
    $(".js_tips").removeClass("success");
    $(".js_tips").removeClass("fail");
    // $('bo.o_maindy').css('overflow', 'auto')
    $(".tipShadow").remove();
}
//提示弹层
$(".js_tips").on("click", ".close", function () {
    closeTips();
});
// 获取url参数
function getRequest(paraName, isDecode) {
    var url = window.location.href;
    if (isDecode) {
        //url解码
        try {
            url = url.replace("%%", "%");
            url = decodeURIComponent(url);
        } catch (e) {
            return;
        }
    }
    var arrPara = url.substring(url.indexOf("?") + 1, url.length).split("&"); //防止出现吧关键词中有问号
    var arr;

    for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");

        if (arr != null && arr[0] == paraName) {
            return arr[1];
        }
    }
    return "";
}

// pc底部导航初始化下拉
$(".footer_pc .js_footer_link .link_box_floor2 .link_item").each(function (
    index,
    item
) {
    hope.selector({
        ele: ".js_select_link_" + (index + 1),
        on: {
            change: function (e) {
                $(".js_footer_link .option").removeClass("hopeui-select-this");
                if (e.value == "http://www.qingdao.gov.cn/index.shtml") {
                    return
                } else {
                    window.open(e.value);
                }
            },
        },
    });
});
// 移动端 导航初始化
//$(".footer_phone .js_footer_web_list .web_item").each(function (index, item) {
//    hope.selector({
//        ele: ".js_select_web_" + (index + 1),
//        on: {
//            change: function (e) {
//                $(".js_footer_web_list .option").removeClass(
//                    "hopeui-select-this"
//                );
//                window.open(e.value);
                // openwin(e.value)
//            },
//        },
//    });
//});
//function openwin(url) {
//    var a = document.createElement("a");
//    a.setAttribute("href", url);
//    a.setAttribute("target", "_blank");
//    a.setAttribute("id", "openwin");
//    document.body.appendChild(a);
//    a.click();
//}
// 手机导航
$(".js_daohang").on("click", function () {
    var $this = $(this);
    $this.siblings(".js_zhezhao").removeClass("displaynone");
    setTimeout(function () {
        $this.siblings(".js_youce").addClass("show");
    }, 1);
});
$(".js_zhezhao").on("click", function (e) {
    var $this = $(this);
    $this.siblings(".js_youce").removeClass("show");
    setTimeout(function () {
        $this.addClass("displaynone");
    }, 100);
});
// 年份排序
function arrSort(arr, type) {
    return arr.sort(function (a1, a2) {
        var item1 = Number(a1[type]);
        var item2 = Number(a2[type]);
        if (item1 < item2) {
            return 1;
        } else if (item1 > item2) {
            return -1;
        } else {
            return 0;
        }
    });
}
function onIndexOf(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == obj) {
            return i;
        }
    }
    return -1;
}
// 获取一年一月一周
function getData(num) {
    var timestamp = Math.round(new Date());
    var dataNum = Number(num) * 24 * 60 * 60 * 1000;
    // return formatDate(new Date(timestamp - dataNum)) + ',' + formatDate(new Date())
    return formatDate(new Date(timestamp - dataNum));
}
function formatDate(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var date = now.getDate();
    if (date < 10) {
        date = "0" + date;
    }
    return year + "-" + month + "-" + date;
}
// 獲取年月日
function GetDate() {
    var now = new Date();

    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    if (month < 10) {
        month = "0" + month;
    }
    var day = now.getDate(); //日
    var hh = now.getHours(); //时
    var mm = now.getMinutes(); //分
    var dateStr = year + "-" + month + "-" + day;

    return dateStr;
}
if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    };
}
function openShadow() {
    $(".js_shadow").addClass("cur");
    // $('body').css('overflow', 'hidden')
}
function closeShadow() {
    // $('body').css('overflow', 'auto')
    $(".js_shadow").removeClass("cur");
}
//过滤
var patt1 = new RegExp("[$()*+.[\\]?^{\\\\}|%]", "g");
function delSearchIllegaWords(str) {
    if (null != str) {
        str = str.replace(patt1, "");
        str = str.replace(/script/g, "");
        str = str.replace(/&amp;/gi, "&");
        str = str.replace(/&nbsp;/gi, " ");
        str = str.replace(/&quot;/gi, '"');
        str = str.replace(/&#39;/g, "'");
        str = str.replace(/&lt;/gi, "<");
        str = str.replace(/&gt;/gi, ">");
        str = str.replace(/&ensp;/gi, ">");
        str = str.replace(/&#40;/g, "(");
        str = str.replace(/&#41;/g, ")");
        str = str.replace(/<br[^>]*>(?:(rn)|r|n)?/gi, "n");
        str = str.replace(/<\/?[^>]*>/g, ""); //去除HTML Tag
        str = str.replace(/[|]*\n/, ""); //去除行尾空格
        str = str.replace(/&npsp;/gi, ""); //去掉npsp
        str = str.replace(/>/gi, "");
        str = str.replace(/</gi, "");
        str = str.replace(/'/gi, "");
    }
    return str;
}
function delHtml(str) {
    if (null != str) {
        str = str.replace(/>/gi, "");
        str = str.replace(/</gi, "");
        str = str.replace(/"/gi, "&quot;");
        str = str.replace(/'/gi, "");
    }
    return str;
}
function isSearchPage(searchWord) {
    if (
        window.location.pathname.indexOf("/search/qingdao/index.shtml") < 0 &&
        window.location.pathname.indexOf("/unionsearch") < 0 &&
        window.location.pathname.indexOf("search_117") < 0 &&
        window.location.pathname.indexOf("searchAll") < 0
    ) {
        searchWord = delSearchIllegaWords(searchWord);
        searchWord = encodeURIComponent($.trim(searchWord));
        if (null != searchWord && "" != searchWord) {
            var url = "www.qingdao.gov.cn";

            // 判断是全网还是本站
            if (sitetype == "only") {
                //本站
                window.open(
                    "//" +
                    url +
                    "/unionsearch/index.shtml?searchWord=" +
                    searchWord +
                    "&" +
                    "sitetype=" +
                    sitetype
                );
            } else {
                // 全网
                window.open(
                    "//" +
                    url +
                    "/unionsearch/index.shtml?searchWord=" +
                    searchWord +
                    "&" +
                    "sitetype=" +
                    sitetype
                );
            }
        }
        // window.open('/gov2020_searchAll.shtml?searchWord='+searchWord)
        return false;
    } else {
        return true;
    }
}
var realTimeSearch = false;
function search(searchTxt, searchDivId, searchBtn) {
    var oT = document.getElementById(searchTxt);
    var searchDivEl = document.getElementById(searchDivId);
    var oBtn = document.getElementById(searchBtn);
    var iNow = -1;
    var oldValue = "";

    oT.addEventListener("keyup", showList);
    oT.addEventListener("click", showList);
    // oT.addEventListener('keydown', cleanList);

    var lastQt = "";

    function showList(ev) {
        var oEvent = ev || event;
        var flag = true;

        if (oEvent.keyCode == 40 || oEvent.keyCode == 38) {
            return;
        }

        if (oEvent.keyCode == 13) {
            oBtn.click();
            oT.blur();
        }
        var oval = oT.value;

        // 搜索词相同不搜索
        if (oval === lastQt) {
            return;
        } else {
            lastQt = oval;
            if (window.location.pathname.indexOf("searchAll") >= 0) {
                stillSearching = false;
            }
        }

        // 输入法 占位符阶段
        $("#qt").on("compositionstart", function () {
            flag = false;
        });

        // 输入法 插入数据阶段
        $("#qt").on("compositionupdate", function () {
            flag = false;
        });

        // 输入法 数据插入结束后
        $("#qt").on("compositionend", function () {
            flag = true;
        });

        if (flag && oval != "" && oval.trim().length > 0) {
            $.ajax({
                type: "get",
                url: config.apiUrl + "/igs/front/suggest/term.jhtml",
                data: {
                    code: "4fe430f0de7a4b069ee80f9e17009fbd",
                    siteId: "5",
                    fuzzy: false,
                    searchWord: $.trim($("#" + searchTxt).val()),
                },
                dataType: "json",
                success: function (arr) {
                    searchDivEl.innerHTML = "";
                    var isShowList = true;
                    if ($(".js_header_input ").is(":focus")) {
                        if (arr.length > 0) {
                            searchDivEl.style.display = "block";
                        } else {
                            if (arr.length == 1) {
                                if (arr[0] == oval) {
                                    searchDivEl.style.display = "none";
                                    isShowList = false;
                                } else {
                                    searchDivEl.style.display = "block";
                                }
                            } else {
                                searchDivEl.style.display = "none";
                                isShowList = false;
                            }
                        }
                    } else {
                    }

                    if (isShowList) {
                        var ulElemet = document.createElement("ul");
                        for (var i = 0; i < arr.length; i++) {
                            // 搜索词相同不展示
                            // if (arr[i] == oval) {
                            //     continue;
                            // }
                            var oLi = document.createElement("li");
                            oLi.innerHTML = arr[i];
                            oLi.classList.add("show_1_line");
                            ulElemet.appendChild(oLi);
                            //给li加事件
                            (function (index) {
                                oLi.onmouseover = function () {
                                    for (
                                        var i = 0;
                                        i < ulElemet.children.length;
                                        i++
                                    ) {
                                        ulElemet.children[i].classList =
                                            "show_1_line";
                                    }
                                    this.className = "show_1_line on";
                                    iNow = index;
                                };
                                oLi.onclick = function () {
                                    oT.value = this.innerHTML;
                                    oBtn.click();
                                };
                            })(i);
                        }
                        searchDivEl.appendChild(ulElemet);
                    }
                },
            });
        } else {
            searchDivEl.style.display = "none";
        }
        oldValue = oT.value;
    }

    function cleanList(ev) {
        var oval = oT.value;
        if (ev.keyCode == 8 && oval.length == 1) {
            $(".searchul ul").each(function () {
                $(this).remove();
            });
        }
    }

    oT.onkeydown = function (ev) {
        if (!realTimeSearch) {
            var aLi = $(".searchul ul li");
            var oEvent = ev || event;
            switch (oEvent.keyCode) {
                case 40:
                    // 下键
                    iNow++;
                    if (iNow == aLi.length) iNow = -1;

                    for (var i = 0; i < aLi.length; i++) {
                        aLi[i].className = "";
                    }
                    if (iNow == -1) {
                        oT.value = oldValue;
                    } else {
                        aLi[iNow].className = "on";
                        oT.value = aLi[iNow].innerHTML;
                    }
                    break;
                case 38:
                    // 上键
                    iNow--;
                    if (iNow == -2) iNow = aLi.length - 1;
                    for (var i = 0; i < aLi.length; i++) {
                        aLi[i].className = "";
                    }
                    if (iNow == -1) {
                        oT.value = oldValue;
                    } else {
                        aLi[iNow].className = "on";
                        oT.value = aLi[iNow].innerHTML;
                    }
                    break;
                default:
                    iNow = -1;
            }
        }
    };
}

// 老年专区跳转
function oldAlinkopen() {
    $("a[title='长者版']").on("click", function (e) {
        var $this = $(this);
        if (e && e.preventDefault) {
            e.preventDefault();
        } else {
            window.event.returnValue = false; //兼容IE
        }
        //未开启辅助工具时打开辅助工具的代码
        var openStatus = EsdToolbarInit.getCookie("wzaIsOn");
        if (openStatus == null || openStatus == "false" || openStatus == false) {
            EsdToolbarInit.loadScript(null);
            EsdToolbarInit.setCookie("wzaIsOn", "true", 10);
        }
        setTimeout(function () {
            var NewHref = $this.attr("href");
            var nowurl = window.location.href;
            if (nowurl.indexOf("ywdt/zwzl/zzgh") > -1) {
                location.reload()
            } else {
                window.location.href = '/ywdt/zwzl/zzgh/'
            }
        }, 10)
    })
}

$(function () {
    oldAlinkopen();
    if ($(".js_header_input").length > 0) {
        if (!isIe9 && !isIe8) {
            //头部下拉
            search("header_input", "ulSearchList", "clickSearchBtn");
            //搜索输入框
            var isBox = false;
            $("#ulSearchList").hide();
            $(".js_header_input").focus(function () {
                if ($(this).siblings("#ulSearchList").find("li").length > 0) {
                    $(this).siblings("#ulSearchList").show();
                }
                isBox = true;
            });

            $(".js_header_input")
                .parent(".input_box")
                .mousemove(function () {
                    isBox = true;
                })
                .mouseout(function () {
                    isBox = false;
                });

            //元素失焦事件
            $(".js_header_input").blur(function () {
                if (isBox == true) {
                    return false;
                }
                $(this).siblings("#ulSearchList").hide();
            });

            //下拉绑定点击事件
            $("#ulSearchList").on("click", "li", function () {
                isBox = false;
                var text = $(this).text();
                if ($("#ulSearchList li a").length < 0) {
                    $(this).parent().siblings(".js_header_input").val(text);
                    $(this).parent().hide();
                    go();
                } else {
                    $("#ulSearchList").hide();
                }
            });

            //下拉绑定鼠标样式
            $("#ulSearchList").on("mouseover", "li", function () {
                $(this).addClass("on");
            });
            $("#ulSearchList").on("mouseout", "li", function () {
                $(this).removeClass("on");
            });
        } else {
            var headInput = $("#header_input").oInputSelect({
                inputFn: function (val) {
                    // headInput.changelist(['11','11','11','11','11','11','11','11']);
                    if (val != "") {
                        $.ajax({
                            type: "get",
                            url:
                                config.apiUrl + "/igs/front/suggest/term.jhtml",
                            data: {
                                code: "4fe430f0de7a4b069ee80f9e17009fbd",
                                siteId: "5",
                                fuzzy: false,
                                searchWord: val,
                            },
                            dataType: "json",
                            success: function (data) {
                                if (data.length > 0) {
                                    headInput.changelist(data);

                                    var liHeight = $(
                                        ".listbox .o_scrollbody ul"
                                    ).innerHeight();
                                    // console.log('liHeight==', liHeight)
                                    $(".o_InputSelectBox .listbox .list").css(
                                        "height",
                                        liHeight
                                    );
                                } else {
                                    // 掩藏下拉框
                                    $(".listbox").hide();
                                }
                            },
                        });
                    }
                },
                openFn: function (val) {
                    // console.log('openfun==', val)
                },
                changeFn: function (val) {
                    // console.log('callbackFn==', val);
                    var $thisinput = $(".js_header_input");
                    var val = $thisinput.val();
                    // 调用查询接口
                    if ($.trim(val)) {
                        if (isSearchPage(val)) {
                            stillSearching = false;
                            //如果时间没有限制 就按照默认三年
                            if (
                                $(".js_date_limit").parent().find(".cur")
                                    .length == 0
                            ) {
                                gj_timeRange = getData(1095);
                                $(".js_date_limit")
                                    .eq(1)
                                    .addClass("cur")
                                    .siblings()
                                    .removeClass("cur");
                            }
                            getSreachFun();
                        }
                    } else {
                        openTips("", "请输入检索词");
                        return false;
                    }
                },
            });
            hope.input({
                ele: "#header_input",
            });
            $(".js_header_input").focus(function () {
                headInput.inputFn($(this).val());
            });
        }
        // 搜索框回车事件
        if (isIe9 || isIe8) {
            $(".js_header_input").bind("keypress", function (event) {
                if (event.keyCode == 13) {
                    // 调用查询接口
                    var val = $(this).val();
                    if ($.trim(val)) {
                        if (isSearchPage(val)) {
                            stillSearching = false;
                            //如果时间没有限制 就按照默认三年
                            if (
                                $(".js_date_limit").parent().find(".cur")
                                    .length == 0
                            ) {
                                gj_timeRange = getData(1095);
                                $(".js_date_limit")
                                    .eq(1)
                                    .addClass("cur")
                                    .siblings()
                                    .removeClass("cur");
                            }
                            getSreachFun();
                        }
                    } else {
                        openTips("", "请输入检索词");
                        return false;
                    }

                    $(".o_InputSelectBox .listbox").hide();
                    $("#ulSearchList").hide();
                    $(".js_header_input").blur();
                }
            });
        }
        // 点击搜索按钮
        $(".header_search").on("click", ".js_clickSearchBtn", function () {
            if (isIe9 || isIe8) {
                var $thisinput = $(".js_header_input");
            } else {
                var $thisinput = $(this).siblings(".js_header_input");
            }
            var val = $thisinput.val();
            if ($.trim(val)) {
                if (isSearchPage(val)) {
                    stillSearching = false;
                    //如果时间没有限制 就按照默认三年
                    if ($(".js_date_limit").parent().find(".cur").length == 0) {
                        gj_timeRange = getData(1095);
                        $(".js_date_limit")
                            .eq(1)
                            .addClass("cur")
                            .siblings()
                            .removeClass("cur");
                    }
                    // 包含以下的完整关键词
                    includesFull = "";
                    $("#hightGrade_search2").val("");
                    // 包含以下任意一个关键词
                    includesAny = "";
                    $("#hightGrade_search3").val("");
                    // 不包含以下关键词
                    notIncludes = "";
                    $("#hightGrade_search4").val("");
                    // 调用查询接口
                    getSreachFun();
                }
            } else {
                openTips("", "请输入检索词");
                return false;
            }

            $("#ulSearchList").hide();
            if (isIe9 || isIe8) {
                headInput.inputFn($(this).val());
            }
        });

        getsearch_hot_wordFun();

        // 点击热词列表进行快速搜索
        $(".hot_word_list").on("click", ".js_click_headerHotword", function () {
            var searchWord = $(this)
                .attr("times")
                .replace(/&quot;/gi, '"');
            $(".js_header_input").val(searchWord);
            $(".js_header_input").siblings("label").hide();
            if (isSearchPage(searchWord)) {
                // 包含以下的完整关键词
                includesFull = "";
                $("#hightGrade_search2").val("");
                // 包含以下任意一个关键词
                includesAny = "";
                $("#hightGrade_search3").val("");
                // 不包含以下关键词
                notIncludes = "";
                $("#hightGrade_search4").val("");

                // 调用查询接口
                getSreachFun();

                $("body,html").animate(
                    {
                        scrollTop: 0,
                    },
                    500
                );
            }
        });
    }

    // 点击头导航显示弹层
    // $('.js_showModel').click(function () {
    //     openTips(true, '正在努力建设中...')
    // })
    // 调用 查询[搜索热词]方法
    // 查询[搜索热词]
    function getsearch_hot_wordFun() {
        // 加一个判断吧  如果是统一检索的页面 则不执行公用 
        // 同意检索页面有单独的热刺方法
        if ($(".tyse_header").length > 0) {
            return false
        }
        if ($(".searchtgcs").length == 0) {
            $.ajax({
                type: "get",
                // 动态
                // url: config.apiUrl + '/igs/front/statistics/find_search_hot_word.jhtml',
                // 暂时写死
                url:
                    config.apiUrl +
                    "/igs/front/statistics/find_search_hot_word.jhtml",
                data: {
                    siteId: "5",
                },
                dataType: "json",
                success: function (data) {
                    var hotWordList = data; //新闻列表内容
                    // 循环生成新闻列表
                    var headerHotWordHtml = "";
                    var leftHotWordHtml = "";

                    if ($(".js_hotWord_Ul ").length != 0) {
                        // 如果沒有搜索时，搜索第一个热词
                        if ($(".js_header_input").val() == "") {
                            $(".js_header_input").val(hotWordList[0].name);
                        }
                        getSreachFun();
                    }

                    // 设置头部搜索
                    $(".js_header_input").attr(
                        "placeholder",
                        "搜索您想了解的政策/资讯/服务"
                    );
                    if ($("#header_input").siblings("label").length != 0) {
                        $("#header_input")
                            .siblings("label")
                            .text("搜索您想了解的政策/资讯/服务");
                    }

                    // 根据字数判断 如果字数大约15个字 则取4个 否则5个
                    var topfivestr = "";
                    var hotnum = 0;
                    for (var i = 0; i < 5; i++) {
                        topfivestr = topfivestr + hotWordList[i].name;
                    }
                    var pattern_chin = /[\u4e00-\u9fa5]/g;
                    var count_chin = topfivestr.match(pattern_chin).length;
                    // console.log(count_chin);
                    if ($(".header_sp").length > 0) {
                        if (count_chin > 19) {
                            hotnum = 4;
                        } else {
                            hotnum = 5;
                        }
                    } else {
                        if (widthpcphone <= 750 && count_chin > 17) {
                            hotnum = 4;
                        } else {
                            hotnum = 5;
                        }
                    }

                    for (var i = 0; i < hotWordList.length; i++) {
                        // 前四个热词让在头导航，剩下的放在右侧
                        // if (i > 3 && i < 13) {
                        //     leftHotWordHtml += '<li>';
                        //     leftHotWordHtml += '<span class="num">' + (i - 3) + '</span>';
                        //     leftHotWordHtml += ' <a class="js_click_headerHotword" href="javascript:;" title="" times="' + hotWordList[i].name + '">' + hotWordList[i].name + '</a>';
                        //     leftHotWordHtml += ' </li>';
                        // } else {
                        //     headerHotWordHtml += '  <li class="js_click_headerHotword" title="" times="' + hotWordList[i].name + '">' + hotWordList[i].name + '</li>';
                        // }
                        var y = hotWordList[i].name;
                        y = delHtml(y);
                        if (i < 10) {
                            leftHotWordHtml += "<li>";
                            leftHotWordHtml +=
                                '<span class="num num_' +
                                (i + 1) +
                                '">' +
                                (i + 1) +
                                "</span>";
                            leftHotWordHtml +=
                                ' <a class="js_click_headerHotword" href="javascript:;" title="" times="' +
                                y +
                                '">' +
                                y +
                                "</a>";
                            leftHotWordHtml += " </li>";
                        }
                        if (i < hotnum) {
                            headerHotWordHtml +=
                                '  <li class="js_click_headerHotword" title="" times="' +
                                y +
                                '">' +
                                y +
                                "</li>";
                        }
                    }
                    // 插入到头部ul中
                    $(".js_headerHotword_Ul").html(headerHotWordHtml);
                    if ($(".js_hotWord_Ul").length != 0) {
                        $(".js_hotWord_Ul").html(leftHotWordHtml);
                    }
                    // if(window.location.pathname.indexOf('searchAll')>=0){
                    //      // 插入到右侧ul中

                    //     // 搜索热词之后，调用可能感兴趣列表
                    //     // if (getCookie("keywords")) {
                    //     //     getInterestedList(getCookie("keywords"));
                    //     // } else {
                    //     //     // 掩藏感兴趣
                    //     //     var keywords = $('.js_hotWord_Ul li a').eq(0).text();
                    //     //     getInterestedList(keywords);
                    //     // }
                    // }
                },
            });
        } else {
            var hotWordList = [{ name: "企业", times: 1448, day: 1654132297254 },
            { name: "企业开办", times: 806, day: 1654132297254 },
            { name: "项目", times: 683, day: 1654132297254 },
            { name: "人才", times: 660, day: 1654132297254 },
            { name: "疫情防控", times: 409, day: 1654132297254 },
            { name: "医养结合", times: 368, day: 1654132297254 },
            { name: "公积金", times: 365, day: 1654132297254 },
            { name: "国家实验室", times: 338, day: 1654132297254 },
            { name: "人才引进", times: 290, day: 1654132297254 },
            { name: "旅游", times: 274, day: 1654132297254 }]; //新闻列表内容
            // 循环生成新闻列表
            var headerHotWordHtml = "";
            var leftHotWordHtml = "";

            if ($(".js_hotWord_Ul ").length != 0) {
                // 如果沒有搜索时，搜索第一个热词
                if ($(".js_header_input").val() == "") {
                    $(".js_header_input").val(hotWordList[0].name);
                }
                getSreachFun();
            }

            // 设置头部搜索
            $(".js_header_input").attr(
                "placeholder",
                "大家在搜 " + hotWordList[0].name
            );
            if ($("#header_input").siblings("label").length != 0) {
                $("#header_input")
                    .siblings("label")
                    .text("大家在搜 " + hotWordList[0].name);
            }

            // 根据字数判断 如果字数大约15个字 则取4个 否则5个
            var topfivestr = "";
            var hotnum = 0;
            for (var i = 0; i < 5; i++) {
                topfivestr = topfivestr + hotWordList[i].name;
            }
            var pattern_chin = /[\u4e00-\u9fa5]/g;
            var count_chin = topfivestr.match(pattern_chin).length;
            // console.log(count_chin);
            if ($(".header_sp").length > 0) {
                if (count_chin > 19) {
                    hotnum = 4;
                } else {
                    hotnum = 5;
                }
            } else {
                if (widthpcphone <= 750 && count_chin > 17) {
                    hotnum = 4;
                } else {
                    hotnum = 5;
                }
            }

            for (var i = 0; i < hotWordList.length; i++) {
                // 前四个热词让在头导航，剩下的放在右侧
                // if (i > 3 && i < 13) {
                //     leftHotWordHtml += '<li>';
                //     leftHotWordHtml += '<span class="num">' + (i - 3) + '</span>';
                //     leftHotWordHtml += ' <a class="js_click_headerHotword" href="javascript:;" title="" times="' + hotWordList[i].name + '">' + hotWordList[i].name + '</a>';
                //     leftHotWordHtml += ' </li>';
                // } else {
                //     headerHotWordHtml += '  <li class="js_click_headerHotword" title="" times="' + hotWordList[i].name + '">' + hotWordList[i].name + '</li>';
                // }
                var y = hotWordList[i].name;
                y = delHtml(y);
                if (i < 10) {
                    leftHotWordHtml += "<li>";
                    leftHotWordHtml +=
                        '<span class="num num_' +
                        (i + 1) +
                        '">' +
                        (i + 1) +
                        "</span>";
                    leftHotWordHtml +=
                        ' <a class="js_click_headerHotword" href="javascript:;" title="" times="' +
                        y +
                        '">' +
                        y +
                        "</a>";
                    leftHotWordHtml += " </li>";
                }
                if (i < hotnum) {
                    headerHotWordHtml +=
                        '  <li class="js_click_headerHotword" title="" times="' +
                        y +
                        '">' +
                        y +
                        "</li>";
                }
            }
            // 插入到头部ul中
            $(".js_headerHotword_Ul").html(headerHotWordHtml);
            if ($(".js_hotWord_Ul").length != 0) {
                $(".js_hotWord_Ul").html(leftHotWordHtml);
            }
        }
    }
    // 输入时阻止事件冒泡，防止触发无障碍
    $("input").on("keyup", function (e) {
        e.stopPropagation();
    });
    $("input").on("keydown", function (e) {
        e.stopPropagation();
    });
});

// 点击头导航显示弹层
// $('.js_showModel,.js_business_services_url').click(function () {
//     openTips(true, '正在努力建设中...')
// })
// 头导航菜单选中样式
$(".js_showModel a").removeClass("cur");
function positionHeadNav() {
    var pasthName = window.location.pathname;
    pasthName = pasthName.replace("/gate/big5/www.qingdao.gov.cn", "");
    var fileName = pasthName.substring(0, 6);
    // if(pasthName.substring(0,11).indexOf('gggs')>=0){
    //     $(".js_showModel a").eq(5).addClass('cur')
    // }else{
    if (fileName == "/") {
        $(".js_showModel a").eq(0).addClass("cur");
    } else {
        $(".js_showModel a").each(function (index, element) {
            if (index != 0 && index != 3 && index != 5) {
                var $this = $(this);
                var navHref = $this.attr("href");
                if (navHref.indexOf(fileName) >= 0) {
                    $this.addClass("cur");
                }
            }
        });
    }

    // }
}
// if(!isHomePage){
positionHeadNav();
// }

//点击纠错图标
function Link(site_code) {
    //获取该站点需要纠错页面的url地址
    var url = getCurrUrl();
    //跳转至纠错系统填写页面
    window.open(
        "https://zfwzgl.www.gov.cn/exposure/jiucuo.html?site_code=" +
        site_code +
        "&url=" +
        encodeURIComponent(url)
    );
}
//获取该站点需要纠错页面的url地址
function getCurrUrl() {
    var url = "";
    if (parent !== window) {
        try {
            url = window.top.location.href;
        } catch (e) {
            url = window.top.document.referrer;
        }
    }
    if (url.length == 0) url = document.location.href;

    return url;
}

$(function () {
    if (!sessionStorage.getItem("screenwidth")) {
        sessionStorage.setItem("screenwidth", "750");
    }
    $(".js_typechange").on("touchend", function () {
        sessionStorage.setItem("screenwidth", "1280");
        setTimeout(function () {
            resizeScreen(1280);
            window.location.reload();
        }, 100);
    });
    if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|Mobile)/i)) {
        if (sessionStorage.getItem("screenwidth") == "1280") {
            $(".js_typechange_pc").show();
        }
    }
    $(".js_typechange_pc").on("touchend", function () {
        sessionStorage.setItem("screenwidth", "750");
        setTimeout(function () {
            resizeScreen(750);
            window.location.reload();
        }, 100);
    });
});

resizeScreen(+sessionStorage.getItem("screenwidth") || 750);
// window.setTimeout(function(){
//     $('body').show()
// },100)
$(window).resize(function () {
    setTimeout(function () {
        resizeScreen(+sessionStorage.getItem("screenwidth") || 750);
    }, 10);
});

// 判断字段手头为空
function isNull(a) {
    if (
        typeof a == "undefined" ||
        a == [] ||
        a == "" ||
        a == "null" ||
        a == null
    ) {
        return true;
    }
    return false;
}
// showLoading();
function ShowLoading() {
    $('.js_shadow').addClass('cur'); //遮罩
    $('.loading_box').show();

    //旋转图片
    rotation();
}

function HiddenLoading() {
    $('.loading_box').hide();
    $('.js_shadow').removeClass('cur'); //遮罩
}
//旋转图片
var rotation = function () {

    $(".loading_img").rotate({

        angle: 0,

        animateTo: 360,

        callback: rotation,

        easing: function (x, t, b, c, d) { // t: current time, b: begInnIng value, c: change In value, d: duration

            return c * (t / d) + b;

        }

    });

}