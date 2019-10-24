"auto"
var appName = "手机淘宝";
launchApp(appName);
sleep(3000);
//寻找领喵币按钮，存在则执行任务，否则退出脚本
var lingmiaobi = indexInParent(5).depth(18).text("").findOnce();
if (lingmiaobi) {
    lingmiaobi.click();
    sleep(1000);
    execTask();
}
else {
    toast("未检查到领喵币按钮")
}
function execTask() {
    while (true) {
        var target =  text("签到").findOnce() || text("去进店").findOnce() || text("去浏览").findOnce() || text("去签到").findOnce();
        if (target == null) {
            toast("任务完成");
            break;
        }
        target.click();
        sleep(3000);
        if (target.text() === "去签到") {
            //执行签到任务
            var checkInParent = depth(12).indexInParent(6).text("").clickable(false).findOnce();
            var checkIn = checkInParent.child(0);
            checkIn.click();
            sleep(2000);
        }
        else if (target.text() === "签到") {
            sleep(2000);
            continue;
        }
        else {
            //执行浏览广告类任务
            viewWeb(20);
        }
        back();
        sleep(1000);
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