var text = document.getElementsByTagName("h1")[0].innerText
// 获取页面中第一个<h1>标签元素
// innerText🦦获取该<h1>标签内文本内容，将其存储在变量text中
console.log(text)
// 在控制台输出该文本内容
document.getElementsByTagName("h1")[0].innerHTML = ""
// 将该<h1>标签内容清空，为后续插入新内容做准备

var spans = []
for (var i = 0; i < text.length; i++) {
    var span = document.createElement("span")
    // 创建新的<span>标签元素
    span.innerText = text[i]
    // 将文本中的每个字符依次赋值给<span>标签的文本内容
    document.getElementsByTagName("h1")[0].appendChild(span)
    // 将每个<span>标签元素插入到第一个<h1>标签内
    spans.push(span)
    // 将每个<span>标签元素存储在数组spans中，方便后续操作
}

function light() {
    for (var i = 0; i < spans.length; i++) {
        var span = spans[i]
        var color = "hsl(" + (Math.random() * 360 | 0) + "deg,50%,50%)"
        // 生成一个0到360之间的随机整数，用于生成随机的HSL颜色值
        span.style.color = "white"
        // 将<span>标签的文本颜色设置为白色
        if (Math.random() < 0.3) {
            span.style.color = "rgba(255,255,255,0.3)"
        }
        // 有30%概率将<span>标签的文本颜色设置为半透明白色

        span.style.textShadow = "0 0 5px " + color + ",0 0 10px " + color + ",0 0 20px " + color + ""
        // 为<span>标签添加文本阴影效果，阴影颜色为随机生成的颜色
        span.style.fontSize = Math.random() * 3 + 7 + "vw"
        // 将<span>标签的字体大小设置为7到10vw之间的随机值
    }
}

setInterval(light, 1000)
// 每隔1秒（1000毫秒）调用一次light()函数，从而实现灯光闪烁效果
var canvas = document.getElementById("canvas")
// 获取页面中id为"canvas"的canvas元素
canvas.width = window.innerWidth
canvas.height = window.innerHeight
// 将canvas元素设置为浏览器窗口的内部宽度和高度
var ctx = canvas.getContext("2d")
// 获取canvas元素的2D绘图上下文
var fireworksArray = []
// 创建一个空数组fireworksArray用于存储烟花对象
var particlesArray = []
// 创建一个空数组particlesArray用于存储粒子对象
class Particle {
// 构造函数，用于初始化粒子对象的属性
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.c = color
        // x坐标、y坐标、颜色
        this.vx = (0.5 - Math.random()) * 100
        this.vy = (0.5 - Math.random()) * 100
        // 粒子在x或y方向上的速度，取值范围在 -50 到 50 之间
        this.c = color
        // 粒子的颜色（重复赋值）
        this.age = Math.random() * 100 | 0
        // 粒子的寿命，取值范围在 0 到 99 之间的整数
    }
    update() {
    // 更新粒子的位置和状态
        this.x += this.vx / 20
        this.y += this.vy / 20
        // 更新粒子的x/Y坐标，根据x/y方向的速度进行移动
        this.vy++
        // 增加粒子在 y 方向上的速度，模拟重力效果
            this.age--
            // 减少粒子的寿命
    }
    draw() {
    // 绘制粒子
        ctx.globalAlpha = 1
        // 设置全局透明度为 1
        ctx.beginPath()
        // 开始一个新的路径
        ctx.fillStyle = this.c
        // 设置填充颜色为粒子的颜色
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
        // 绘制一个以粒子坐标为中心，半径为 1 的圆形
        ctx.fill()
        // 填充圆形
    }
}

// 定义一个名为 Firework 的类，表示烟花
class Firework {
    // 构造函数，用于初始化烟花对象的属性
    constructor() {
        // 将烟花的初始 y 坐标设置为画布的高度，即烟花从画布底部开始
        this.y = canvas.height
        // 随机生成烟花的初始 x 坐标，范围是 0 到画布的宽度
        this.x = Math.random() * canvas.width | 0
        // 计算烟花的初始速度，速度为负值表示烟花向上运动
        this.vel = -(Math.random() * Math.sqrt(canvas.height) / 3 + Math.sqrt(4 * canvas.height) / 2) / 5
        // 随机生成烟花的颜色，使用 HSL 颜色模式
        this.c = "hsl(" + (Math.random() * 360 | 0) + ",100%,60%)"
    }
    // 更新烟花的位置和状态
    update() {
        // 根据速度更新烟花的 y 坐标
        this.y += this.vel
        // 烟花的速度逐渐增加，模拟重力效果
        this.vel += 0.04
        // 当烟花的速度大于等于 0 时，表示烟花到达最高点，开始爆炸
        if (this.vel >= 0) {
            // 生成 200 个粒子，模拟烟花爆炸的效果
            for (var i = 0; i < 200; i++) {
                particlesArray.push(new Particle(this.x, this.y, this.c))
            }
            // 重置烟花的 y 坐标为画布底部
            this.y = canvas.height
            // 重新随机生成烟花的 x 坐标
            this.x = Math.random() * canvas.width | 0
            // 重新计算烟花的速度
            this.vel = -(Math.random() * Math.sqrt(canvas.height) / 3 + Math.sqrt(4 * canvas.height) / 2) / 5
            // 重新随机生成烟花的颜色
            this.c = "hsl(" + (Math.random() * 360 | 0) + ",100%,60%)"
        }
    }
    // 绘制烟花
    draw() {
        // 设置全局透明度为 1
        ctx.globalAlpha = 1
        // 开始绘制路径
        ctx.beginPath()
        // 设置填充颜色为烟花的颜色
        ctx.fillStyle = this.c
        // 绘制一个圆形，表示烟花
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
        // 填充圆形
        ctx.fill()
    }
}

// 初始化烟花的函数
function init_fireworks() {
    // 循环的次数根据画布宽度除以200的结果向下取整来确定
    // 用于创建一定数量的烟花对象并添加到烟花数组中
    for (var i = 0; i < (canvas.width / 200 | 0); i++) {
        // 创建一个新的烟花对象并添加到烟花数组 fireworksArray 中
        fireworksArray.push(new Firework());
    }
}
// 调用初始化烟花的函数，开始创建烟花对象
init_fireworks();

// 绘制动画的函数
function draw() {
    // 设置全局透明度为 0.1，用于实现渐变的背景效果
    ctx.globalAlpha = 0.1;
    // 设置填充颜色为黑色
    ctx.fillStyle = "black";
    // 绘制一个黑色的矩形，覆盖整个画布，用于清除之前的绘制内容
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 遍历烟花数组，更新每个烟花的位置并绘制
    for (var i = 0; i < fireworksArray.length; i++) {
        // 更新当前烟花的位置和状态
        fireworksArray[i].update();
        // 绘制当前烟花
        fireworksArray[i].draw();
    }

    // 遍历粒子数组，更新每个粒子的位置并绘制
    for (var i = 0; i < particlesArray.length; i++) {
        // 更新当前粒子的位置和状态
        particlesArray[i].update();
        // 绘制当前粒子
        particlesArray[i].draw();
        // 如果粒子的寿命小于 0，说明粒子已经消失，从粒子数组中移除该粒子
        if (particlesArray[i].age < 0) {
            particlesArray.splice(i, 1);
        }
    }
    // 请求浏览器在下一次重绘之前调用 draw 函数，实现动画效果
    requestAnimationFrame(draw);
}

// 调用绘制函数，开始动画循环
draw();



//音效管理器
const soundManager = {
	baseURL: "./",
	ctx: new (window.AudioContext || window.webkitAudioContext)(),
	sources: {
		lift: {
			volume: 1,
			playbackRateMin: 0.85,
			playbackRateMax: 0.95,
			fileNames: ["lift1.mp3", "lift2.mp3", "lift3.mp3"],
		},
		burst: {
			volume: 1,
			playbackRateMin: 0.8,
			playbackRateMax: 0.9,
			fileNames: ["burst1.mp3", "burst2.mp3"],
		},
		burstSmall: {
			volume: 0.25,
			playbackRateMin: 0.8,
			playbackRateMax: 1,
			fileNames: ["burst-sm-1.mp3", "burst-sm-2.mp3"],
		},
		crackle: {
			volume: 0.2,
			playbackRateMin: 1,
			playbackRateMax: 1,
			fileNames: ["crackle1.mp3"],
		},
		crackleSmall: {
			volume: 0.3,
			playbackRateMin: 1,
			playbackRateMax: 1,
			fileNames: ["crackle-sm-1.mp3"],
		},
	},

	preload() {
		const allFilePromises = [];

		function checkStatus(response) {
			if (response.status >= 200 && response.status < 300) {
				return response;
			}
			const customError = new Error(response.statusText);
			customError.response = response;
			throw customError;
		}

		const types = Object.keys(this.sources);
		types.forEach((type) => {
			const source = this.sources[type];
			const { fileNames } = source;
			const filePromises = [];
			fileNames.forEach((fileName) => {
				const fileURL = this.baseURL + fileName;
				// Promise will resolve with decoded audio buffer.
				const promise = fetch(fileURL)
					.then(checkStatus)
					.then((response) => response.arrayBuffer())
					.then(
						(data) =>
							new Promise((resolve) => {
								this.ctx.decodeAudioData(data, resolve);
							})
					);

				filePromises.push(promise);
				allFilePromises.push(promise);
			});

			Promise.all(filePromises).then((buffers) => {
				source.buffers = buffers;
			});
		});

		return Promise.all(allFilePromises);
	},

	pauseAll() {
		this.ctx.suspend();
	},

	resumeAll() {
		// Play a sound with no volume for iOS. This 'unlocks' the audio context when the user first enables sound.
		this.playSound("lift", 0);
		// Chrome mobile requires interaction before starting audio context.
		// The sound toggle button is triggered on 'touchstart', which doesn't seem to count as a full
		// interaction to Chrome. I guess it needs a click? At any rate if the first thing the user does
		// is enable audio, it doesn't work. Using a setTimeout allows the first interaction to be registered.
		// Perhaps a better solution is to track whether the user has interacted, and if not but they try enabling
		// sound, show a tooltip that they should tap again to enable sound.
		setTimeout(() => {
			this.ctx.resume();
		}, 250);
	},

	// Private property used to throttle small burst sounds.
	_lastSmallBurstTime: 0,

	/**
	 * Play a sound of `type`. Will randomly pick a file associated with type, and play it at the specified volume
	 * and play speed, with a bit of random variance in play speed. This is all based on `sources` config.
	 *
	 * @param  {string} type - The type of sound to play.
	 * @param  {?number} scale=1 - Value between 0 and 1 (values outside range will be clamped). Scales less than one
	 *                             descrease volume and increase playback speed. This is because large explosions are
	 *                             louder, deeper, and reverberate longer than small explosions.
	 *                             Note that a scale of 0 will mute the sound.
	 */
	playSound(type, scale = 1) {
		// Ensure `scale` is within valid range.
		scale = MyMath.clamp(scale, 0, 1);

		// Disallow starting new sounds if sound is disabled, app is running in slow motion, or paused.
		// Slow motion check has some wiggle room in case user doesn't finish dragging the speed bar
		// *all* the way back.
		if (!canPlaySoundSelector() || simSpeed < 0.95) {
			return;
		}

		// Throttle small bursts, since floral/falling leaves shells have a lot of them.
		if (type === "burstSmall") {
			const now = Date.now();
			if (now - this._lastSmallBurstTime < 20) {
				return;
			}
			this._lastSmallBurstTime = now;
		}

		const source = this.sources[type];

		if (!source) {
			throw new Error(`Sound of type "${type}" doesn't exist.`);
		}

		const initialVolume = source.volume;
		const initialPlaybackRate = MyMath.random(source.playbackRateMin, source.playbackRateMax);

		// Volume descreases with scale.
		const scaledVolume = initialVolume * scale;
		// Playback rate increases with scale. For this, we map the scale of 0-1 to a scale of 2-1.
		// So at a scale of 1, sound plays normally, but as scale approaches 0 speed approaches double.
		const scaledPlaybackRate = initialPlaybackRate * (2 - scale);

		const gainNode = this.ctx.createGain();
		gainNode.gain.value = scaledVolume;

		const buffer = MyMath.randomChoice(source.buffers);
		const bufferSource = this.ctx.createBufferSource();
		bufferSource.playbackRate.value = scaledPlaybackRate;
		bufferSource.buffer = buffer;
		bufferSource.connect(gainNode);
		gainNode.connect(this.ctx.destination);
		bufferSource.start(0);
	},
};

// imageTemplateManager.preload().then(() => {
//     if(imageTemplateManager.sources.length>0){
//         var img = imageTemplateManager.sources[0];
//     }
// });

// Kick things off.

function setLoadingStatus(status) {
	document.querySelector(".loading-init__status").textContent = status;
}

// CodePen profile header doesn't need audio, just initialize.
if (IS_HEADER) {
	init();
} else {
	// Allow status to render, then preload assets and start app.
	setLoadingStatus("正在点燃导火线");
	setTimeout(() => {
		// 只加载 soundManager
		var promises = [soundManager.preload()];

		// 在 soundManager 加载完毕后调用 init
		Promise.all(promises).then(init, (reason) => {
			console.log("资源文件加载失败");
			init();
			return Promise.reject(reason);
		});
	}, 0);
}