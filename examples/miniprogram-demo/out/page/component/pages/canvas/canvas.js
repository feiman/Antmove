const _Page = require("../../../../__antmove/component/componentClass.js")(
    "Page"
);
const _my = require("../../../../__antmove/api/index.js")(my);
my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "page/component/pages/canvas/canvas"
    }
});

_Page({
    onShareAppMessage() {
        return {
            title: "canvas",
            path: "page/component/pages/canvas/canvas"
        };
    },

    onReady() {
        this.position = {
            x: 150,
            y: 150,
            vx: 2,
            vy: 2
        };
        this.drawBall(this.position);
        this.interval = setInterval(
            function() {
                this.drawBall(this.position);
            }.bind(this),
            17
        );
    },

    drawBall() {
        const p = this.position;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x >= 300) {
            p.vx = -2;
        }

        if (p.x <= 7) {
            p.vx = 2;
        }

        if (p.y >= 300) {
            p.vy = -2;
        }

        if (p.y <= 7) {
            p.vy = 2;
        }

        const context = _my.createCanvasContext("canvas");

        function ball(x, y) {
            context.beginPath(0);
            context.arc(x, y, 5, 0, Math.PI * 2);
            context.setFillStyle("#1aad19");
            context.setStrokeStyle("rgba(1,1,1,0)");
            context.fill();
            context.stroke();
        }

        ball(p.x, 150);
        ball(150, p.y);
        ball(300 - p.x, 150);
        ball(150, 300 - p.y);
        ball(p.x, p.y);
        ball(300 - p.x, 300 - p.y);
        ball(p.x, 300 - p.y);
        ball(300 - p.x, p.y);
        context.draw();
    },

    onUnload() {
        clearInterval(this.interval);
    },

    ontouchstart() {
        console.log("touchstart");
    },

    ontouchmove() {
        console.log("touchmove");
    },

    ontouchend() {
        console.log("touchend");
    },

    ontouchcancel() {
        console.log("touchcancel");
    },

    onlongtap() {
        console.log("longtap");
    }
});
