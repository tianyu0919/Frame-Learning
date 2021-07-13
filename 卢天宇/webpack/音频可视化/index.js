(function (win, doc) {
    function createAudioMap(options) {

        // 默认的行为
        const defaultOptions = {
            delay: 26,
            timeUpdate: () => { }, // 视频播放秒发生变化事件
            playDone: () => { }, // 播放完成事件
            playInit: () => { }, // 可以播放的时候
        }

        const { timeUpdate, playDone, delay, src, playInit } = { ...defaultOptions, ...options };

        // 获取 canvas 的上下文
        const canvasObj = ((delay) => {
            let canvasObj = {};
            const canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            canvas.innerText = '您的浏览器不支持该插件，请切换到谷歌浏览器获得最佳体验！';
            canvas.id = 'canvas';
            doc.body.appendChild(canvas);

            setProperty(canvasObj, ctx, canvas);

            let timer = null;
            win.addEventListener('resize', () => {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    setProperty(canvasObj, ctx, canvas);
                }, delay)
            })

            function setProperty(canvasObj, ctx) {
                let w = win.innerWidth;
                let h = win.innerHeight;
                canvas.width = w;
                canvas.height = h;
                canvasObj.w = w;
                canvasObj.h = h;
                canvasObj.canvas = canvas;
                canvasObj.ctx = ctx;
                let color = ctx.createLinearGradient(w / 2, 300, w / 2, h / 2);
                color.addColorStop(1, '#473B7B');
                color.addColorStop(0.5, '#3584A7');
                color.addColorStop(0, '#30D2BE');
                ctx.fillStyle = color;
            }

            return canvasObj;
        })(delay)

        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser(); // 创建解析器。用来实现数据可视化。
        const audio = document.createElement('audio');
        this.audio = audio;
        this.context = audioContext;
        this.playing = false; // 设置没有播放
        this.audio.src = src ? src : 'null';
        this.playInit = playInit;

        this.audio.addEventListener('timeupdate', timeUpdate);
        this.audio.addEventListener('ended', playDone);
        // 给空音响创建一个数据源，createMediaElementSource---利用dom创建音频源。
        const source = audioContext.createMediaElementSource(this.audio);
        // analyser.fftSize = 2048; // 默认是2048 一个无符号长整形(unsigned long)的值，代表了用于计算频域信号时使用的 FFT (快速傅里叶变换) 的窗口大小。
        source.connect(analyser); // 连接到解析器
        source.connect(audioContext.destination); // 将目标源连接到出口位置，一般指扬声器。

        this.audio.addEventListener('canplay', ({ target }) => {
            const { currentTime, duration } = target;
            this.playInit(this);
            this.currentTime = currentTime;
            this.duration = duration;
            this.canplay = true;
            this.audioCallBack && this.audioCallBack(this);
            this.audioError = false;
        })
        this.audio.addEventListener('ended', () => {
            this.playing = false;
        });

        this.audio.addEventListener('error', ({ target }) => {
            this.audioError = true;
        })

        let animate = null;

        function draw() {
            const { canvas, ctx, w, h } = canvasObj;
            let columnLength = Math.round(w / 17);

            const audioData = new Uint8Array(analyser.frequencyBinCount); // 创建解析器位的 Unit8Array 数组。
            analyser.getByteFrequencyData(audioData); // 将当前频域数据拷贝进 Uint8Array 数组。

            ctx.clearRect(0, 0, w, h);
            let step = Math.round(audioData.length / columnLength); // 40.96

            for (let i = 0; i < columnLength; i++) {
                ctx.fillRect(w / 2 + i * 10, h / 2, 7, -audioData[step * i]);
                ctx.fillRect(w / 2 - i * 10, h / 2, 7, -audioData[step * i]);
            }

            animate = window.requestAnimationFrame(arguments.callee);
        }
        draw();

        // * 播放
        this.play = (callBack) => {
            if (this.audioError) {
                callBack && callBack({ state: 0, msg: "请先设置路径之后播放！" })
                throw new Error('请先设置路径之后播放！');
            }
            // 音频已经加载完成了
            if (this.canplay) {
                this.context.resume(); // 恢复之前被暂停的音频上下文中的时间进程。
                if (this.audio.paused) {
                    callBack({ state: 1, msg: '开始播放' })
                    this.audio.play();
                    this.playing = true;
                } else {
                    callBack({ state: 2, msg: '暂停播放' })
                    this.audio.pause();
                    this.playing = false;
                    // cancelAnimationFrame(animate);
                }
            } else {
                setTimeout(() => {
                    this.play();
                }, 16)
            }
        }

        // * 暂停
        this.pause = () => {
            this.audio.pause();
            this.playing = false; // 设置没有播放
            // cancelAnimationFrame(animate);
        }

        // * 设置路径
        this.setSrc = (src = "../audio/嚣张.mp3", callback) => {
            this.canplay = false; // 设置音频为加载完。
            this.playing = false; // 设置没有播放
            this.audioError = false;
            // cancelAnimationFrame(animate);
            this.audio.setAttribute('src', src);
            this.audioCallBack = callback;
            return this;
        }

        // * 设置音量
        this.setVolume = (volumeNum) => {
            volumeNum = parseFloat(volumeNum);
            if (volumeNum >= 0 && volumeNum <= 1) {
                this.audio.volume = volumeNum;
            } else {
                throw Error('音量设置在 0 - 1 之间')
            }
        }
    }
    window.AudioMap = createAudioMap;
})(window, document)

/*
    1. 实例化该插件
        1.1 实例化可以传入路径，也可以通过 setSrc 传入路径

        let audioMap = new AudioMap();
        audioMap.setSrc('路径');
        audioMap.play(); // 播放
        audioMao.pause(); // 暂停

        1.2 设置路径的时候不能立马播放，需要音频加载初始化完成才可以播放。

    2. 播放音频。
        2.1 播放音频主要功能：播放、暂停。

    3. 调节音量。
*/