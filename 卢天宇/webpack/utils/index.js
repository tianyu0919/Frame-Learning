let progressObj = (function () {
    function el(selector) {
        return document.querySelector(selector);
    }

    function init(els, endVal, options) {
        // 默认配置
        let defaultOptions = {
            startValue: 0,
            duration: 2, // 默认时长
            decPla: 0, // 显示小数点几位
        }

        this.options = { ...defaultOptions, ...options };
        const { startValue, decPla, done, change } = this.options;
        this.el = els;
        this.startVal = parseFloat(startValue); // 开始值
        this.decPla = parseFloat(decPla); // 小数点位
        this.endVal = parseFloat(endVal); // 结束值
        this.done = done; // 完成的时候
        this.change = change; // 修改的时候

        this.start = function () {
            this.ref = requestAnimationFrame(this.count.bind(this));
        }

        this.count = function (timestamp) {
            if (!this._startTime) {
                this._startTime = timestamp;
            }
            // * progress = newTIme - firstTIme
            let progress = timestamp - this._startTime;
            // * 比例， 当前时间 / 总时长 表示 0 - 1之前的数量，用最终值乘以这个比例，可以拿到最终想要的结果。
            this.currentSchedule = (progress / this.duration); // 当前进度 0 - 1
            this.currentSchedule = this.currentSchedule > 1 ? 1 : this.currentSchedule; // 因为有可能超出 1 所以，判断一下
            this.frameVal = this.formateVal(this.endVal * this.currentSchedule); // 格式化文字
            // 如果时间在一定范围内
            if (progress <= this.duration) {
                this.ref = requestAnimationFrame(arguments.callee.bind(this));
                this.change ? this.change(this.currentSchedule) : "";
            } else {
                this.reset();
                cancelAnimationFrame(this.ref);
                this.change ? this.change(this.currentSchedule) : "";
                this.done ? this.done(this) : "";
                this.frameVal = this.endVal;
            }
            this.setView(this.frameVal);
        }

        this.formateVal = function (val) {
            return val.toFixed(this.decPla);
        }

        this.setView = function (val) {
            const { el } = this;
            if (el instanceof Array) {
                el.forEach(ele => {
                    setValueType(ele, val);
                })
                return;
            }
            setValueType(el, val);
        }

        function setValueType(el, val) {
            if (el.value != undefined && el.tagName !== 'BUTTON') {
                el.value = val;
            } else {
                el.innerText = val;
            }
        }

        this.restDuration = () => {
            this.duration = this.options.duration * 1000;
        }

        // 初始化
        this.reset = function () {
            this._startTime = null;
            this.ref = null;
        }

        this.restDuration();
    }
    return { el, init };
})()

window.lty_progress = progressObj;