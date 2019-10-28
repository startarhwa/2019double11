toast("检测是否开启无障碍模式")
auto.waitFor()
var appName = "手机淘宝";
var shops = ["欧莱雅官方旗舰店", "美的官方旗舰店", "GREE格力官方旗舰店", "苏泊尔官方旗舰店", "小米官方旗舰店",
    "荣耀官方旗舰店", "vivo官方旗舰店", "OPPO官方旗舰店", "李宁官方网店", "olay官方旗舰店", "YSL圣罗兰美妆官方旗舰店",
    "蒙牛旗舰店", "自然堂旗舰店", "KIEHL'S科颜氏官方旗舰店", "Lancome兰蔻官方旗舰店", "雅诗兰黛官方旗舰店天猫店",
    "美特斯邦威官方网店", "宝洁官方旗舰店", "adidas官方旗舰店", "奥克斯旗舰店", "海尔官方旗舰店", "HR赫莲娜官方旗舰店",
    "阿玛尼美妆官方旗舰店", "波司登官方旗舰店", "SK-II官方旗舰店", "百雀羚旗舰店", "戴森官方旗舰店", "ZARA官方旗舰店"]
sleep(3000);
launchApp(appName);
sleep(3000);
//寻找领喵币按钮，存在则执行任务，否则退出脚本
var lingmiaobi = indexInParent(5).depth(18).text("").findOnce();
if (lingmiaobi) {
    lingmiaobi.click();
    sleep(1000);
    execTask();
}
else {
    toast("未检查到领喵币按钮")
}
toast("即将执行店铺签到任务");
back();
sleep(1000);
execShopCheckin(shops);
toast("任务完成")
function execTask() {
    while (true) {
        var target = text("去进店").findOne(2000) || text("去浏览").findOne(500) || text("签到").findOne(500);
        if (target == null) {
            break;
        }
        target.click();
        sleep(3000);
        if (target.text() === "签到") {
            sleep(2000);
            continue;
        }
        else {
            //执行浏览广告类任务
            viewWeb(20);
        }
        back();
        sleep(2000);
    }
}
function viewWeb(time) {
    gesture(1000, [300, device.height - 300], [300, device.height - 500]);
    var cnt = 1;
    while (true) {
        var finish = desc("任务完成").exists() || descStartsWith("已获得").exists();
        if (finish || cnt > time) {
            break;
        }
        sleep(1000);
        cnt += 1;
    }
}
function execShopCheckin(shopName) {
    var searchBar = desc("搜索").findOnce();
    //点击首页的搜索按钮
    if (searchBar) {
        searchBar.click();
        shopCheckin(shopName);
    }
    else {
        toast("未找到搜索按钮")
    }
}
function shopCheckin(shopName) {
    for (var i = 0; i < shopName.length; ++i) {
        //将搜索框内的内容替换成相应的店铺名并点击搜索
        sleep(2000);
        searchBar2 = depth(10).indexInParent(0).findOnce();
        searchBar2.setText(shopName[i]);
        sleep(500);
        depth(9).indexInParent(2).text("搜索").findOne(5000).click();
        //点击店铺
        var shopText = text("店铺").findOne(5000);
        var currentShop = shopText.parent().parent().parent();
        currentShop.click();
        //点击进店
        // var jindian = depth(15).indexInParent(0).text("进店").findOne(3000).parent();
        var jindian = depth(15).indexInParent(0).descContains(shopName[i]).clickable(true).findOne(3000) ||
            depth(20).indexInParent(0).textContains(shopName[i]).clickable(true).findOne(1000)
            || depth(19).indexInParent(0).textContains(shopName[i]).clickable(true).findOne(1000);
        if (jindian) {
            jindian.click();
            //双十一父亲 indexinparent(1) depth(10)
            sleep(3000);
            //点击双十一
            var childofBtn = classNameStartsWith("android.widget.ImageView").depth(17).indexInParent(0).findOne(10000);
            if (childofBtn) {
                var btn = childofBtn.parent().parent();
                // var btn = classNameStartsWith("android.widget.FrameLayout").depth(15).indexInParent(2).clickable(true).findOne(5000);

                btn.click();
                //点击签到领喵币
                var qiandaoImg = desc("签到领喵币").findOne(5000);
                if (qiandaoImg) {
                    var qiandao = qiandaoImg.parent();
                    qiandao.click();
                    sleep(1000);
                    log(shopName[i] + "签到领喵币");
                }
                else {
                    log(shopName[i] + "没找到领喵币按钮")
                }
            }
            else {
                log(shopName[i] + "没找到双十一按钮")
            }
            //两次退回回到搜索框界面
            while (desc("拍立淘").findOnce() == null) {
                back();
                sleep(1000);
            }
            back();
        }
        else {
            log(shopName[i] + "没找到进店按钮");
            back();
        }
    }
}