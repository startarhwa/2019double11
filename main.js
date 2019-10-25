toast("检测是否开启无障碍模式")
auto.waitFor()
var appName = "手机淘宝";
//广告版 depth(20) indexparent(0) text("OPPO官方旗舰店") text("GREE格力官方旗舰店 进店") 
//广告版 text("Logo HR赫莲娜官方旗舰店 90.7万粉丝 进店")
//非广告 depth(15) indexparent(0) desc("OPPO官方旗舰店天猫店")
 var shops = ["欧莱雅官方旗舰店","美的官方旗舰店","GREE格力官方旗舰店","苏泊尔官方旗舰店","小米官方旗舰店",
        "荣耀官方旗舰店", "vivo官方旗舰店","OPPO官方旗舰店","李宁官方网店","olay官方旗舰店","YSL圣罗兰美妆官方旗舰店",
        "蒙牛旗舰店","自然堂旗舰店","KIEHL'S科颜氏官方旗舰店","Lancome兰蔻官方旗舰店","Estee Lauder雅诗兰黛官方旗舰店天猫店",
        "美特斯邦威官方网店","宝洁官方旗舰店","adidas官方旗舰店","奥克斯旗舰店","海尔官方旗舰店","HR赫莲娜官方旗舰店",
        "GIORGIO ARMANI阿玛尼美妆官方旗舰店","波司登官方旗舰店"]
sleep(3000);
launchApp(appName);
sleep(3000);
toast("即将找");
//寻找领喵币按钮，存在则执行任务，否则退出脚本
var lingmiaobi = indexInParent(5).depth(18).text("").findOnce();
if (lingmiaobi) {
    toast("找到按钮了")
    lingmiaobi.click();
    sleep(1000);
    execTask();
}
else {
    toast("未检查到领喵币按钮")
}
function execTask() {
    while (true) {
        var target =  text("签到").findOnce() || text("去进店").findOnce() || text("去浏览").findOnce() ;
        if (target == null) {
            toast("任务完成");
            break;
        }
        target.click();
        sleep(3000);
        if (target.text() === "签到") {
            sleep(2000);
            continue;
        }
        else {
            //执行浏览广告类任务
            viewWeb(20);
        }
        back();
        sleep(2000);
    }
}
function viewWeb(time) {
    gesture(1000, [300, 600], [300, 300]);
    var cnt = 1;
    while (true) {
        var finish = desc("任务完成").exists() || descStartsWith("已获得").exists();
        if (finish || cnt > time) {
            break;
        }
        sleep(1000);
        cnt += 1;
    }
}