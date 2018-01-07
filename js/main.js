/**
 * Created by Administrator on 15-9-23.
 */
var start = document.getElementById("start");
var startbg = document.getElementById("startbg");
var gamebg = document.getElementById("gamebg");
var end = document.getElementById("end");
var score = document.getElementById("score");
var over = document.getElementById("over");
var sum = document.getElementById("sum");
var reload = document.getElementById("reload");
var stop = document.getElementById("stop");
var stop1;
var Game;
start.onclick = function () {
    startbg.style.display = "none";
    gamebg.style.display = "block";
    Game = window.setInterval(run, 150);
};
var BGpositionY = 0;
var tempdelay0 = 0;
var tempdelay1 = 0;
var tempdelay2 = 0;
var tempdelay3 = 0;
var temp1 = 0;//设置产生敌机速度初始值设定。
var enemy1 = [];
var temp2 = 0;
var enemy2= [];
var temp3 = 0;
var enemy3= [];
var temp = 0;

function run(){
    BGpositionY += 8;
    gamebg.style.backgroundPosition = "0px " + BGpositionY + "px";
    if(BGpositionY == 568){
        BGpositionY = 0;
    }
//产生敌机！！！！！！！！！！！！！！！！！！！！
    temp1++;
    if(temp1 == 6){
        var enemyPlanes1 = new Enemyplane("image/enemy1_fly_1.png", "image/小飞机爆炸.gif", 0, Math.round(Math.random()*(320-34)), 1,"../image/小飞机爆炸.gif");
        temp1 = 0;
        enemy1.push(enemyPlanes1);
    }
    temp2++;
    if(temp2 == 23){
        var enemyPlanes2 = new Enemyplane("image/enemy3_fly_1.png", "image/中飞机爆炸.gif", 0, Math.round(Math.random()*(320-46)), 3,"../image/中飞机挨打.png");
        temp2 = 0;
        enemy2.push(enemyPlanes2);
    }
    temp3++;
    if(temp3 == 61){
        var enemyPlanes3 = new Enemyplane("image/enemy2_fly_1.png", "image/大飞机爆炸.gif", 0, Math.round(Math.random()*(320-110)), 5,"../image/大飞机挨打.png");
        temp3 = 0;
        enemy3.push(enemyPlanes3);
    }
//敌机越界判断！！！！！！！！
    for(var k = 0; k < enemy1.length; k++) {
        enemy1[k].enemyPlanemove();
        if (parseInt(enemy1[k].imgNode.style.top) >= 568 - 24) {
            gamebg.removeChild(enemy1[k].imgNode);
            enemy1.splice(k, 1);
            k--;
        }
    }
    for(var k = 0; k < enemy2.length; k++) {
        enemy2[k].enemyPlanemove();
        if (parseInt(enemy2[k].imgNode.style.top) >= 568 - 60) {
            gamebg.removeChild(enemy2[k].imgNode);
            enemy2.splice(k, 1);
            k--;
        }
    }
    for(var k = 0; k < enemy3.length; k++) {
        enemy3[k].enemyPlanemove();
        if (parseInt(enemy3[k].imgNode.style.top) >= 568 - 164) {
            gamebg.removeChild(enemy3[k].imgNode);
            enemy3.splice(k, 1);
            k--;
        }
    }
//我的飞机碰撞判断！！！！！！！！！！！
    //小飞机
        for(var i = 0; i < enemy1.length; i++){
            if(myPlane.imgNode.offsetLeft <= enemy1[i].imgNode.offsetLeft + 34 && myPlane.imgNode.offsetLeft + 66 >= enemy1[i].imgNode.offsetLeft
                && myPlane.imgNode.offsetTop <= enemy1[i].imgNode.offsetTop + 24 && myPlane.imgNode.offsetTop + 80
                >= enemy1[i].imgNode.offsetTop){
                    myPlane.imgNode.src = myPlane.planeboomsrc;
                    myPlane.status = false;
            }
        }
    //中飞机
        for(var i = 0; i < enemy2.length; i++){
            if(myPlane.imgNode.offsetLeft <= enemy2[i].imgNode.offsetLeft + 46 && myPlane.imgNode.offsetLeft + 66 >= enemy2[i].imgNode.offsetLeft
                && myPlane.imgNode.offsetTop <= enemy2[i].imgNode.offsetTop + 60 && myPlane.imgNode.offsetTop + 80
                >= enemy2[i].imgNode.offsetTop){
                myPlane.imgNode.src = myPlane.planeboomsrc;
                myPlane.status = false;
            }
        }
    //大飞机
        for(var i = 0; i < enemy3.length; i++){
            if(myPlane.imgNode.offsetLeft <= enemy3[i].imgNode.offsetLeft + 110 && myPlane.imgNode.offsetLeft + 66 >= enemy3[i].imgNode.offsetLeft
                && myPlane.imgNode.offsetTop <= enemy3[i].imgNode.offsetTop + 164 && myPlane.imgNode.offsetTop + 80
                >= enemy3[i].imgNode.offsetTop){
                myPlane.imgNode.src = myPlane.planeboomsrc;
                myPlane.status = false;
            }
        }
        tempdelay0++;
        if(tempdelay0 == 6){
            if(!myPlane.status){
                gamebg.removeChild(myPlane.imgNode);
            }
        tempdelay0 = 0;
        }
//子弹击中敌机判断！！！！！！！！！！！
    //小飞机！！！！！
        for(var i = 0; i < bullets.length; i++){
            for(var j = 0; j < enemy1.length; j++){
                if(bullets[i].imgNode.offsetLeft <= enemy1[j].imgNode.offsetLeft + 34 && bullets[i].imgNode.offsetLeft + 6 >= enemy1[j].imgNode.offsetLeft
                    && bullets[i].imgNode.offsetTop <= enemy1[j].imgNode.offsetTop + 24){
                    enemy1[j].imgNode.src = enemy1[j].enemyboom;
                    enemy1[j].status = false;
                    gamebg.removeChild(bullets[i].imgNode);
                    bullets.splice(i,1);
                    i--;
                    score.innerHTML = score.innerHTML - 0 + 100;
                    break;
                }
            }
        }
    //中飞机！！！！
        for(var i = 0; i < bullets.length; i++){
            for(var j = 0; j < enemy2.length; j++){
                if(bullets[i].imgNode.offsetLeft <= enemy2[j].imgNode.offsetLeft + 46 && bullets[i].imgNode.offsetLeft + 6 >= enemy2[j].imgNode.offsetLeft
                    && bullets[i].imgNode.offsetTop <= enemy2[j].imgNode.offsetTop + 60){
                    gamebg.removeChild(bullets[i].imgNode);
                    bullets.splice(i,1);
                    i--;
                    //判断飞机被击次数
                    enemy2[j].hp = enemy2[j].hp - 1;
                    enemy2[j].imgNode.src = enemy2[j].attack;
                    if(enemy2[j].hp <= 0){
                        enemy2[j].imgNode.src = enemy2[j].enemyboom;
                        enemy2[j].status = false;
                        score.innerHTML = score.innerHTML - 0 + 500;
                        break;
                    }
                }
            }
        }
    //大飞机！！！！
        for(var i = 0; i < bullets.length; i++){
            for(var j = 0; j < enemy3.length; j++){
                if(bullets[i].imgNode.offsetLeft <= enemy3[j].imgNode.offsetLeft + 110 && bullets[i].imgNode.offsetLeft + 6 >= enemy3[j].imgNode.offsetLeft
                    && bullets[i].imgNode.offsetTop <= enemy3[j].imgNode.offsetTop + 164){
                    gamebg.removeChild(bullets[i].imgNode);
                    bullets.splice(i,1);
                    i--;
                    //判断飞机被击次数
                    enemy3[j].hp = enemy3[j].hp - 1;
                    enemy3[j].imgNode.src = enemy3[j].attack;
                    if(enemy3[j].hp <= 0){
                        enemy3[j].imgNode.src = enemy3[j].enemyboom;
                        enemy3[j].status = false;
                        score.innerHTML = score.innerHTML - 0 + 1000;
                        break;
                    }
                }
            }
        }
//敌机爆炸
    tempdelay1++;
    if(tempdelay1 == 4){
        for(var i = 0; i < enemy1.length; i++){
            if(!enemy1[i].status){
                gamebg.removeChild(enemy1[i].imgNode);
                enemy1.splice(i,1);
                i--;
            }
        }
        tempdelay1 = 0;
    }
    tempdelay2++;
    if(tempdelay2 == 4){
        for(var i = 0; i < enemy2.length; i++){
            if(!enemy2[i].status){
                gamebg.removeChild(enemy2[i].imgNode);
                enemy2.splice(i,1);
                i--;
            }
        }
        tempdelay2 = 0;
    }
    tempdelay3++;
    if(tempdelay3 == 4){
        for(var i = 0; i < enemy3.length; i++){
            if(!enemy3[i].status){
                gamebg.removeChild(enemy3[i].imgNode);
                enemy3.splice(i,1);
                i--;
            }
        }
        tempdelay3 = 0;
    }
    if(!myPlane.status){
        end.style.display = "block";
        end.style.position = "absolute";
        end.style.zIndex = 10;
        over.style.display = "block";
        over.style.position = "absolute";
        over.style.zIndex = 10;
        sum.innerHTML = "总分："  + score.innerHTML;
        sum.style.zIndex = 10;
        sum.style.display = "block";
        sum.style.position = "absolute";
        reload.style.display = "block";
        window.clearInterval(Game);
        myPlane.downmove = null;
        myPlane.upmove = null;
        myPlane.leftmove = null;
        myPlane.rightmove = null;
    }
 }
//创建飞机！！！！！！！！！！！！！！！！！
function Plane(PlaneSrc,planeBoomSrc,planeHeight,planeWidth,planeTop,planeLeft){
    this.planesrc = PlaneSrc;
    this.planeboomsrc = planeBoomSrc;
    this.planeheight = planeHeight;
    this.planewidth = planeWidth;
    this.planetop = planeTop;
    this.planeleft = planeLeft;
    this.status = true;
    this.imgNode = null;
    this.gameway = function(){
        this.imgNode = document.createElement("img");
        gamebg.appendChild(this.imgNode);
        this.imgNode.src = this.planesrc;
        this.imgNode.style.position = "absolute";
        this.imgNode.style.top = this.planetop + "px";
        this.imgNode.style.left = this.planeleft + "px";
        this.imgNode.style.height = this.planeheight + "px";
        this.imgNode.style.width = this.planewidth + "px";
    };
    this.gameway();
}
//我的飞机！！！！！！！！！！！！！！！！！！！
var myPlane = new Myplane("image/我的飞机.gif", "image/本方飞机爆炸.gif", 80, 66, 568-80, (320-66)/2);
//产生子弹！！！！！！！！！！！！！！！！！！！！！
function Bullets(bulletsrc, bullettop, bulletleft) {
    this.bsrc = bulletsrc;
    this.btop = bullettop;
    this.bleft = bulletleft;
    this.imgNode = null;
    this.bul = function () {
        this.imgNode = document.createElement("img");
        gamebg.appendChild(this.imgNode);
        this.imgNode.style.position = "absolute";
        this.imgNode.src = this.bsrc;
        this.imgNode.style.top = this.btop + "px";
        this.imgNode.style.left = this.bleft + "px";
    };
    this.bul();
}
//子弹移动！！！！！！！！！！！！！！！！
var bullets = [];
window.onkeydown = function(e){
    var et = e || window.event;
//空格发射子弹！！！！！！！！！！！！！！！
    if(et.type == "keydown" && et.keyCode == "32"){
        var bulX = et.clientX - 300;
        var bulY = et.clientY;
        var buls = new Bullets("image/bullet1.png", bulY + "px", bulX + "px");
        buls.imgNode.style.left = parseInt(myPlane.imgNode.style.left)  + 33 + "px";
        buls.imgNode.style.top = parseInt(myPlane.imgNode.style.top) - 10 + "px";
        bullets.push(buls);
        var i = 0;
        stop1 = setInterval(function(){
            i += 10;
            buls.imgNode.style.top = parseInt(myPlane.imgNode.style.top) - i + "px";
            for(var j = 0;j < bullets.length; j++){
                if(parseInt(bullets[j].imgNode.style.top) <= 0){
                    gamebg.removeChild(bullets[j].imgNode);
                    bullets.splice(j,1);
                    j--;
                }
            }
        },40);
    }
//键盘移动事件！！！！！！！！！！！！！
    if(et.type == "keydown" && et.keyCode == "37"){
        myPlane.leftmove();
        if(parseInt(myPlane.imgNode.style.left) < 0){
            myPlane.imgNode.style.left = 0 + "px";
        }
    }
    if(et.type == "keydown" && et.keyCode == "38"){
        myPlane.upmove();
        if(parseInt(myPlane.imgNode.style.top) < 0){
            myPlane.imgNode.style.top = 0 + "px";
        }
    }
    if(et.type == "keydown" && et.keyCode == "39"){
        myPlane.rightmove();
        if(parseInt(myPlane.imgNode.style.left) > 320 - 66){
            myPlane.imgNode.style.left = 320 - 66 + "px";
        }
    }
    if(et.type == "keydown" && et.keyCode == "40"){
        myPlane.downmove();
        if(parseInt(myPlane.imgNode.style.top) > 568 - 80){
            myPlane.imgNode.style.top = 568 - 80 + "px";
        }
}
//暂停按钮！！！！！！！！！！！！！！！
    if(et.type == "keydown" && et.keyCode == "13"){
        temp++;
        if(temp % 2 == 1){
            stop.style.display = "block";
            et.stopPropagation(Game);
            clearInterval(Game);
            for(var i = 0;i < bullets.length; i++){
                bullets[i].imgNode.style.display = "none";
            }
            myPlane.downmove = null;
            myPlane.upmove = null;
            myPlane.leftmove = null;
            myPlane.rightmove = null;
        }else if(temp % 2 == 0){
            stop.style.display = "none";
            for(var i = 0;i < bullets.length; i++){
                bullets[i].imgNode.style.display = "block";
            }
            Game = window.setInterval(run, 150);
            myPlane.leftmove = function(){
                this.imgNode.style.left = parseInt(myPlane.imgNode.style.left) - 20 + "px";
            };
            myPlane.upmove = function(){
                this.imgNode.style.top = parseInt(myPlane.imgNode.style.top) - 20 + "px";
            };
            myPlane.rightmove = function(){
                this.imgNode.style.left = parseInt(myPlane.imgNode.style.left) + 20 + "px";
            };
            myPlane.downmove = function(){
                this.imgNode.style.top = parseInt(myPlane.imgNode.style.top) + 20 + "px";
            };
        }
    }

};
//键盘移动！！！！！！！！！！！！！！！！！！
function Myplane(PlaneSrc,planeBoomSrc,planeHeight,planeWidth,planeTop,planeLeft){
    Plane.call(this,PlaneSrc,planeBoomSrc,planeHeight,planeWidth,planeTop,planeLeft);
    this.leftmove = function(){
        this.imgNode.style.left = parseInt(myPlane.imgNode.style.left) - 20 + "px";
    };
    this.upmove = function(){
        this.imgNode.style.top = parseInt(myPlane.imgNode.style.top) - 20 + "px";
    };
    this.rightmove = function(){
        this.imgNode.style.left = parseInt(myPlane.imgNode.style.left) + 20 + "px";
    };
    this.downmove = function(){
        this.imgNode.style.top = parseInt(myPlane.imgNode.style.top) + 20 + "px";
    }
}

//产生敌机！！！！！！！！！！！！！！！！！！
function Enemyplane(Enemyplanesrc, EnemyplaneBoomsrc, Enemyplanetop, Enemyplaneleft, Hp, Attacked) {
    this.enemysrc = Enemyplanesrc;
    this.enemytop = Enemyplanetop;
    this.enemyleft = Enemyplaneleft;
    this.enemyboom = EnemyplaneBoomsrc;
    this.hp = Hp;
    this.attack = Attacked;
    this.status = true;
    this.imgNode = null;
    this.enemy = function () {
        this.imgNode = document.createElement("img");
        gamebg.appendChild(this.imgNode);
        this.imgNode.style.position = "absolute";
        this.imgNode.src = this.enemysrc;
        this.imgNode.style.top = this.enemytop + "px";
        this.imgNode.style.left = this.enemyleft + "px";
    };
    this.enemy();
    this.enemyPlanemove = function(){
        this.imgNode.style.top = parseInt(this.imgNode.style.top) + 15 + "px";
    }
}
//重新游戏！！！！！！！！！！！！！！！！
reload.onclick = function () {
    window.location.reload(true);
};
