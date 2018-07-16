new Vue({
	el: "#app",
	data: {
		radius: 0, // 圆半径
		frameTick: 15, // 帧间隔
		runBallOver: false,
		isOut: false,
		isLight: false,
		isSplit:false,
		data: [{
			"imgUrl": "img/eggBeater2-ball1-20180702.png",
			"translateXPos": 0,
			"translateYPos": 182,
		}, {
			"imgUrl": "img/eggBeater2-ball2-20180702.png",
			"translateXPos": 95,
			"translateYPos": 204,
		}, {
			"imgUrl": "img/eggBeater2-ball3-20180702.png",
			"translateXPos": -158,
			"translateYPos": 169,
		}, {
			"imgUrl": "img/eggBeater2-ball4-20180702.png",
			"translateXPos": 174,
			"translateYPos": 160,
		}, {
			"imgUrl": "img/eggBeater2-ball5-20180702.png",
			"translateXPos": -101,
			"translateYPos": 198,
		}, {
			"imgUrl": "img/eggBeater2-ball6-20180702.png",
			"translateXPos": -204,
			"translateYPos": 105,
		}, {
			"imgUrl": "img/eggBeater2-ball7-20180702.png",
			"translateXPos": 122,
			"translateYPos": 115,
		}, {
			"imgUrl": "img/eggBeater2-ball8-20180702.png",
			"translateXPos": 79,
			"translateYPos": 32,
		}, {
			"imgUrl": "img/eggBeater2-ball9-20180702.png",
			"translateXPos": -62,
			"translateYPos": 112,
		}, {
			"imgUrl": "img/eggBeater2-ball10-20180702.png",
			"translateXPos": 29,
			"translateYPos": 108,
		}, {
			"imgUrl": "img/eggBeater2-ball11-20180702.png",
			"translateXPos": -156,
			"translateYPos": 91,
		}]
	},
	mounted() {

		this.data.forEach(ball => {
			// 初始化角度、速度、坐标参数
			ball.angle = -Math.random() * (Math.PI - 1) - 0.5,
				ball.speed = -Math.random() * 100 + 1000,
				ball.x = ball.translateXPos,
				ball.y = ball.translateYPos,

				this.$set(ball, 'style', {
					transform: `translate( ${ball.translateXPos}%, ${ball.translateYPos}%)`,
				});
		});

	},
	methods: {

		runBall() {
			this.isSplit=false;
			if(this.runBallOver == false) {
				this.data.forEach(ball => {
					// 重置角度、速度、坐标参数
					ball.angle = -Math.random() * (Math.PI - 1) - 0.5,
						ball.speed = -Math.random() * 100 + 900,
						ball.x = ball.translateXPos,
						ball.y = ball.translateYPos,

						this.$set(ball, 'style', {
							transform: `translate( ${ball.translateXPos}%, ${ball.translateYPos}%)`,
						});
				});
				this.runBallOver = true;
				let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				this.radius = w * 0.72 * 0.5 - 115; //半径
				let frameCount = 200; //300次
				let idxTimer = setInterval(() => {
					this.data.forEach(ball => {

						let tempStyle = ball.style;
						let dis = ball.speed * (this.frameTick / 1000.0); //50毫秒走的距离

						if(Math.sqrt(ball.x * ball.x + ball.y * ball.y) >= this.radius) {
							ball.angle = ball.angle + Math.PI - 0.5;
							dis *= 2;

						}
						ball.x = ball.x + dis * Math.cos(ball.angle);
						ball.y = ball.y + dis * Math.sin(ball.angle);

						// 位移
						tempStyle.transform = `translate( ${ball.x}%, ${ball.y}%)`
						this.$set(ball, 'style', tempStyle);

						// 控制速度（先加速后减速）

						ball.speed += frameCount > 0 ? 7 : -5;

					});

					if(frameCount-- < -50) this.finishBall(idxTimer);

				}, this.frameTick); //每间隔50毫秒移动一次
			}

		},
		finishBall(idx) {
			clearInterval(idx);

			let frameCount = 80;
			let idxTimer = setInterval(() => {
				this.data.forEach(ball => {

					let tempStyle = ball.style;
					let dis = 100 * (frameCount / 5.0) * (this.frameTick / 1000);
					ball.angle = this.getAngleBetweenPoint(ball.x, ball.translateXPos, ball.y, ball.translateYPos);

					if(this.getDistanceBetweenPoint(ball.x, ball.translateXPos, ball.y, ball.translateYPos) < 10) {
						return;
					}

					ball.x = ball.x + dis * Math.cos(ball.angle);
					ball.y = ball.y + dis * Math.sin(ball.angle);

					tempStyle.transform = `translate( ${ball.x}%, ${ball.y}%)`

					this.$set(ball, 'style', tempStyle)
				});

				if(frameCount-- < 0) clearInterval(idxTimer);
			}, this.frameTick);
			this.runBallOver = false;
			setTimeout(this.ballOut, 200);
		},
		ballOut() {
			this.isOut = true;
			setTimeout(this.ballOutLight, 500);
		},
		ballOutLight() {
			this.isLight = true;
			setTimeout(this.ballSplit, 1500);
		},
		ballSplit() {
			this.isOut = false;
			this.isSplit=true;
		},
		// 计算两点之间距离
		getDistanceBetweenPoint(x1, x2, y1, y2) {
			let dx = x2 - x1;
			let dy = y2 - y1;
			return Math.sqrt(dx * dx + dy * dy);
		},
		// 计算两点之间角度
		getAngleBetweenPoint(x1, x2, y1, y2) {
			return Math.atan2(y2 - y1, x2 - x1);
		}
	}
});