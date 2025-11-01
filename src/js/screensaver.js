        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const bufferCanvas = document.createElement('canvas');
        const bufferCtx = bufferCanvas.getContext('2d');
        let width, height;
        const shapes = [];
        const SHAPE_COUNT = 15;
        const BASE_SIZE = 0.0075;
        const BASE_SIZE_MULTIPLIER = 16;
        const BLUR_AMOUNT = 3;
        const SHADOW_SCALES = [1.3, 1.9, 3, 4.1];
        const FRAME_RATE = 5;
        const FRAME_INTERVAL = 800 / FRAME_RATE;

        class SimplexNoise {
            constructor(seed = Math.random()) {
                this.grad3 = [
                    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
                    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
                    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
                ];
                this.p = [];
                for (let i = 0; i < 256; i++) {
                    this.p[i] = Math.floor(seed * 256);
                    seed = (seed * 9301 + 49297) % 233280 / 233280;
                }
                this.perm = [];
                for (let i = 0; i < 512; i++) {
                    this.perm[i] = this.p[i & 255];
                }
            }

            dot(g, x, y) {
                return g[0] * x + g[1] * y;
            }

            noise(xin, yin) {
                const F2 = 0.5 * (Math.sqrt(3) - 1);
                const G2 = (3 - Math.sqrt(3)) / 6;
                let n0, n1, n2;
                let s = (xin + yin) * F2;
                let i = Math.floor(xin + s);
                let j = Math.floor(yin + s);
                let t = (i + j) * G2;
                let X0 = i - t;
                let Y0 = j - t;
                let x0 = xin - X0;
                let y0 = yin - Y0;
                let i1, j1;
                if (x0 > y0) {
                    i1 = 1; j1 = 0;
                } else {
                    i1 = 0; j1 = 1;
                }
                let x1 = x0 - i1 + G2;
                let y1 = y0 - j1 + G2;
                let x2 = x0 - 1 + 2 * G2;
                let y2 = y0 - 1 + 2 * G2;
                let ii = i & 255;
                let jj = j & 255;
                let gi0 = this.perm[ii + this.perm[jj]] % 12;
                let gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12;
                let gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12;
                let t0 = 0.5 - x0 * x0 - y0 * y0;
                if (t0 < 0) n0 = 0;
                else {
                    t0 *= t0;
                    n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);
                }
                let t1 = 0.5 - x1 * x1 - y1 * y1;
                if (t1 < 0) n1 = 0;
                else {
                    t1 *= t1;
                    n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1);
                }
                let t2 = 0.5 - x2 * x2 - y2 * y2;
                if (t2 < 0) n2 = 0;
                else {
                    t2 *= t2;
                    n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2);
                }
                return 70 * (n0 + n1 + n2);
            }
        }

        const noise = new SimplexNoise(Math.random());

        function resizeCanvas() {
            width = canvas.width = bufferCanvas.width = window.innerWidth;
            height = canvas.height = bufferCanvas.height = window.innerHeight;
        }

        function random(min, max) {
            return Math.random() * (max - min) + min;
        }

        function easeInOut(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function createAndChangeShapes(deltaTime) {
            const time = Date.now() * 0.00012;
            shapes.forEach(shape => {
                let freq1 = 0.0015, freq2 = 0.007;
                let noiseValueX = noise.noise(shape.x * freq1, time) * 0.15 + noise.noise(shape.x * freq2, time * 3) * 0.05;
                let noiseValueY = noise.noise(shape.y * freq1, time) * 0.15 + noise.noise(shape.y * freq2, time * 3) * 0.05;

                shape.vx += (noiseValueX - shape.vx) * deltaTime * 0.7;
                shape.vy += (noiseValueY - shape.vy) * deltaTime * 0.7;

                shape.x += shape.vx * deltaTime * 40;
                shape.y += shape.vy * deltaTime * 40;
                shape.rotation += shape.rotationSpeed * deltaTime * 0.6;

                // Wrap edges for smooth continuous motion
                if (shape.x < 0) shape.x += width;
                if (shape.x > width) shape.x -= width;
                if (shape.y < 0) shape.y += height;
                if (shape.y > height) shape.y -= height;

                // Slant and skew morph with eased noise for smooth complex flow
                const slowTime = time * 0.3;
                shape.slantX = easeInOut(noise.noise(shape.slantNoiseOffsetX + shape.x * 0.002, slowTime) * 0.5 + 0.5);
                shape.slantY = easeInOut(noise.noise(shape.slantNoiseOffsetY + shape.y * 0.002, slowTime) * 0.5 + 0.5);
                shape.skewX = easeInOut(noise.noise(shape.skewNoiseOffsetX + shape.x * 0.002, slowTime) * 0.5 + 0.5);
                shape.skewY = easeInOut(noise.noise(shape.skewNoiseOffsetY + shape.y * 0.002, slowTime) * 0.5 + 0.5);

                // Relaxing hue oscillation
                shape.hue = (shape.hue + Math.sin(time * 1.5 + shape.hueShift) * 2) % 360;

                // Alpha oscillates gently within relaxing range
                const alphaBase = 0.15 + 0.1 * Math.sin(time + shape.alphaShift);
                const alphaNoise = noise.noise(shape.x * 0.005, shape.y * 0.005 + time) * 0.05;
                shape.alpha = Math.min(Math.max(0.07, alphaBase + alphaNoise), 0.3);

                // Scale oscillates to simulate fluid depth
                shape.scale = 0.8 + noise.noise(shape.x * 0.005, shape.y * 0.005 + time * 0.5) * 0.7;
            });
        }

        function drawShapes(ctx) {
            shapes.forEach(shape => {
                ctx.save();
                ctx.translate(shape.x, shape.y);
                ctx.transform(
                    1 + shape.skewX * 1.5, shape.slantY * 1.5,
                    shape.slantX * 1.5, 1 + shape.skewY * 1.5,
                    0, 0
                );
                ctx.rotate(shape.rotation);
                ctx.scale(shape.scale, shape.scale);

                function createGradient(flip) {
                    const minX = Math.min(...shape.vertices.filter((_, i) => i % 2 === 0));
                    const maxX = Math.max(...shape.vertices.filter((_, i) => i % 2 === 0));
                    const minY = Math.min(...shape.vertices.filter((_, i) => i % 2 === 1));
                    const maxY = Math.max(...shape.vertices.filter((_, i) => i % 2 === 1));
                    const gradient = ctx.createLinearGradient(
                        flip ? maxX : minX,
                        flip ? maxY : minY,
                        flip ? minX : maxX,
                        flip ? minY : maxY
                    );
                    const color1 = `hsla(${shape.hue}, 80%, 60%, 0.6)`;
                    const color2 = `hsla(${(shape.hue + 140) % 360}, 90%, 40%, 0.8)`;
                    gradient.addColorStop(0, flip ? color2 : color1);
                    gradient.addColorStop(0.15, flip ? color2 : color1);
                    gradient.addColorStop(0.8, flip ? color1 : color2);
                    gradient.addColorStop(1, flip ? color1 : color2);
                    return gradient;
                }

                SHADOW_SCALES.forEach((scale, idx) => {
                    ctx.save();
                    ctx.scale(scale, scale);
                    ctx.beginPath();
                    const vertices = shape.vertices;
                    const roundedCorners = shape.roundedCorners;
                    ctx.moveTo(vertices[0], vertices[1]);
                    for (let j = 0; j < vertices.length; j += 2) {
                        const currentX = vertices[j];
                        const currentY = vertices[j + 1];
                        const nextX = vertices[(j + 2) % vertices.length];
                        const nextY = vertices[(j + 3) % vertices.length];
                        if (roundedCorners[j / 2]) {
                            const controlX = (currentX + nextX) / 2;
                            const controlY = (currentY + nextY) / 2;
                            ctx.quadraticCurveTo(currentX, currentY, controlX, controlY);
                        } else {
                            ctx.lineTo(nextX, nextY);
                        }
                    }
                    ctx.closePath();
                    const glowAlpha = 0.04 + idx * 0.02;
                    const shadowColorHue = (shape.hue + idx * 40) % 360;
                    ctx.fillStyle = `hsla(${shadowColorHue}, 70%, 50%, ${glowAlpha})`;
                    ctx.fill();
                    ctx.restore();
                });

                ctx.beginPath();
                const vertices = shape.vertices;
                const roundedCorners = shape.roundedCorners;
                ctx.moveTo(vertices[0], vertices[1]);
                for (let i = 0; i < vertices.length; i += 2) {
                    const currentX = vertices[i];
                    const currentY = vertices[i + 1];
                    const nextX = vertices[(i + 2) % vertices.length];
                    const nextY = vertices[(i + 3) % vertices.length];
                    if (roundedCorners[i / 2]) {
                        const controlX = (currentX + nextX) / 2;
                        const controlY = (currentY + nextY) / 2;
                        ctx.quadraticCurveTo(currentX, currentY, controlX, controlY);
                    } else {
                        ctx.lineTo(nextX, nextY);
                    }
                }
                ctx.closePath();
                ctx.fillStyle = createGradient(SHADOW_SCALES.length % 2 === 0);
                ctx.globalAlpha = shape.alpha;
                ctx.shadowColor = `hsla(${shape.hue}, 100%, 80%, 0.3)`;
                ctx.shadowBlur = 9;
                ctx.fill();
                ctx.restore();
            });
        }

        let lastTime = 0;
        let accumulator = 0;

        function animate(currentTime) {
            const deltaTime = (currentTime - lastTime) / 1000 || 0.016;
            lastTime = currentTime;
            accumulator += deltaTime;
            while (accumulator >= FRAME_INTERVAL / 1000) {
                createAndChangeShapes(FRAME_INTERVAL / 1000);
                accumulator -= FRAME_INTERVAL / 1000;
            }
            bufferCtx.clearRect(0, 0, width, height);
            drawShapes(bufferCtx);
            ctx.filter = `blur(${BLUR_AMOUNT}px)`;
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(bufferCanvas, 0, 0);
            ctx.filter = 'none';
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        for (let i = 0; i < SHAPE_COUNT; i++) {
            const size = Math.min(width, height) * random(BASE_SIZE, BASE_SIZE * BASE_SIZE_MULTIPLIER);
            const sides = Math.floor(random(33, 44));
            const vertices = new Float32Array(sides * 2);
            const roundedCorners = new Array(sides).fill(false);

            for (let j = 0; j < sides; j++) {
                const angle = (j / sides) * Math.PI * random(-99, 99);
                const distance = size * random(0.01, 6);
                vertices[j * 2] = Math.cos(angle) * distance;
                vertices[j * 2 + 1] = Math.sin(angle) * distance;
                if (Math.random() < 0.85) roundedCorners[j] = true;
            }

            shapes.push({
                vertices,
                roundedCorners,
                hue: random(0, 360),
                alpha: random(0.05, 0.25),
                x: random(0, width),
                y: random(0, height),
                vx: random(-1, 1),
                vy: random(-1, 1),
                rotation: random(0, Math.PI * 2),
                rotationSpeed: random(-0.25, 0.25),
                hueShift: random(0, Math.PI * 2),
                alphaShift: random(0, Math.PI * 2),
                scale: 1,
                slantX: 0,
                slantY: 0,
                skewX: 0,
                skewY: 0,
                slantNoiseOffsetX: random(0, 1000),
                slantNoiseOffsetY: random(0, 1000),
                skewNoiseOffsetX: random(0, 1000),
                skewNoiseOffsetY: random(0, 1000),
            });
        }

        animate(0);
