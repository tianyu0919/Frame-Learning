
(async function (window) {

    function progress({ el = 'body',
        width = '100%',
        height = '20px',
        bgColor = '#1890ff',
        radius = '10px',
        barWidth = 0, // 已完成的宽度从 0 - 100
        barDuration = 0.1, // 动画的运动时长
        success = () => { }
    }) {
        const elType = typeof el;
        let dom = null;
        if (elType === 'string') {
            dom = document.querySelector(el);
        } else if (elType === 'object' && el instanceof HTMLElement) {
            dom = el;
        }
        if (!dom) return;

        let frm = document.createDocumentFragment();
        // 最外面的盒子
        let Box = document.createElement('div');
        Box.id = "progress-box";
        Box.style.setProperty('--width', width);
        Box.style.setProperty('--height', height);
        Box.style.setProperty('--bgColor', bgColor);
        Box.style.setProperty('--radius', radius);
        Box.style.setProperty('--barDuration', `${barDuration}s`);
        Box.style.setProperty('--barWidth', 0);
        const bar = document.createElement('div');
        bar.classList.add('progress-bar');
        Box.appendChild(bar);

        frm.appendChild(Box);
        dom.appendChild(frm);
        this.Box = Box;
        this.el = bar;
        this.barWidth = barWidth;

        Object.defineProperty(this, '_barWidth', {
            // configurable: true, // 如果不写默认是 false
            // enumerable: false,
            writable: true,
            value: barWidth
        })

        Object.defineProperty(this, 'barWidth', {
            get() {
                return this._barWidth;
            },
            set(val) {
                const w = val <= 100 ? val : 100;
                const { el } = this;
                this._barWidth = w;
                Box.style.setProperty('--barWidth', w + '%');
                if (w == 100) {
                    setTimeout(() => {
                        el.classList.add('success');
                        success(this);
                    }, barDuration * 1000);
                    return;
                }
                if (el.classList.contains('success')) el.classList.remove('success');
            },
        })

        // Object.defineProperty(this, 'barWidth', {
        //     set(val) {
        //         const w = val <= 100 ? val : 100;
        //         const { el } = this;
        //         this._barWidth = w;
        //         Box.style.setProperty('--barWidth', w + '%');
        //         if (w == 100) {
        //             setTimeout(() => {
        //                 el.classList.add('success');
        //                 success(this);
        //             }, barDuration * 1000);
        //             return;
        //         }
        //         if (el.classList.contains('success')) el.classList.remove('success');
        //     },
        // })
        // 设置默认值
        // this.barWidth = barWidth;

        // 设置多少
        this.setValue = (val) => {
            this.barWidth = val;
        };

        // 完成
        this.done = () => {
            if (this.barWidth === 100) return;
            this.barWidth = 100;
        };

        // 开启动画
        this.start = function () {

        }
    }

    window.progress = progress;

})(window)