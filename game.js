/**
 * 游戏基础类
 */
class Sprite {
    el = null
    pos = {
        x: 0,
        y: 0
    }
    width = 0
    height = 0
    img = ''
    constructor(img = '', width = 0, height = 0, x = 0, y = 0) {
        this.img = img
        this.width = width
        this.height = height
        this.pos.x = x
        this.pos.y = y
    }

    update() {}
}

/**
 * 子弹类
 */
class Bullet extends Sprite {
    speed = 0
    constructor() {
        super("./imgs/bullet.png", 31, 54)
        this.speed = 10
    }
    init(x, y) {
        this.pos.x = x
        this.pos.y = y
    }
    update() {
        this.pos.y -= this.speed
    }
}

/**
 * 敌机
 */
class Enemy extends Sprite {
    speed = 0
    constructor() {
        super("./imgs/enemy.png", 92, 64)
        this.speed = 5
    }
    init(x) {
        this.pos.x = x
    }
    update() {
        this.pos.y -= this.speed
    }
}

/**
 * 玩家类
 */
class Player extends Sprite {
    name = null //姓名
    hp = 100 //血量
    exp = 0 //经验值
    speed = 10 //速度
    constructor(name) {
        super("./imgs/hero.png", 92, 64)

        this.name = name
        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight

        //玩家默认处于屏幕底端中间位置
        this.pos.x = screenWidth / 2 - this.width / 2
        this.pos.y = screenHeight - this.height - 30
    }
}

/**
 * 游戏类
 */
class Game {
    player = null //玩家
    bullets = [] //子弹
    enemy=[] //敌人
    //启动
    start() {
        console.log("开始");
        var playerName = prompt("请输入您的姓名", "匿名");
        if (playerName == null || playerName == "") {
            gameStart();
            return;
        } else {
            //背景图
            let sprite = new Sprite("imgs/bg.jpg", window.innerWidth, window.innerHeight);
            let obt = document.getElementById("game");
            obt.style.backgroundImage = "url(" + sprite.img + ")";
            obt.style.width = sprite.width + "px";
            obt.style.height = sprite.height + "px";
            obt.style.backgroundSize = "100% 100%";
            obt.style.backgroundRepeat = "no-repeat";
            //背景音乐
            // let bgmAudio = document.createElement('audio');
            // bgmAudio.style.preload="auto";
            // bgmAudio.style.id="bgm";
            // bgmAudio.style.src="./audio/bgm.mp3";
            // bgmAudio.style.loop="true";
            // game.appendChild(bgmAudio);

            // 创建初始玩家
            this.player = new Player(playerName);
            console.log(this.player);
            let playerImg = document.createElement('img')
            playerImg.style.position = "absolute";
            playerImg.id = "myAircraft";
            playerImg.src = this.player.img;
            playerImg.style.width = this.player.width + "px";
            playerImg.style.height = this.player.height + "px";
            playerImg.style.left = this.player.pos.x + "px";
            playerImg.style.top = this.player.pos.y + "px";
            game.appendChild(playerImg);



            this.display();
            this.handle();

        }

    }
    //处理
    handle() {

        let players = this.player
        document.onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            // //40:下 37:左 39:右 38:上 32:空格
            if (e && e.keyCode == 40) {
                players.pos.y += players.speed
                this.handle();
                console.log(players);
                // myAircraft.style.left = 
            } else if (e && e.keyCode == 37) {
                players.pos.x -= players.speed
                this.handle();
                console.log(players);
            } else if (e && e.keyCode == 39) {
                players.pos.x += players.speed
                this.handle();
                // console.log(this.player);
            } else if (e && e.keyCode == 37) {
                players.pos.y -= players.speed
                this.handle();
                // console.log(this.player);
            } else if (e && e.keyCode == 32) {

            }
        }
        document.onclick = function () {
            var playPromise = bgm.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("开始bgm")
                }).catch(() => {
                    console.log("禁止播放")
                })
            }
        }

        this.player = players;
        this.display();
        console.log(players);
        console.log(this.player);

        (function(){
            
        })


    }
    //显示
    display(sprite) {
        //子弹
        this.bullets.forEach((v, index) => {

        })

        console.log(sprite);
        console.log("显示:", this.player);
        //玩家移动
        myAircraft.style.left = this.player.pos.x + "px";
        myAircraft.style.top = this.player.pos.y + "px";
        document.getElementById('playerInfo').innerHTML = this.player.name + ' ' + 'hp:' + this.player.hp + ' ' + 'exp:' + this.player.exp;
    }
}

function gameStart() {
    let game = new Game()
    game.start()
}
gameStart();