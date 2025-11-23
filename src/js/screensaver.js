const canvas = document.getElementById('canvas');
canvas.style.willChange = 'transform';
const ctx = canvas.getContext('2d', {
  alpha: true,
  willReadFrequently: false,
  desynchronized: true
});

const bufferCanvas = document.createElement('canvas');
bufferCanvas.style.willChange = 'transform';
const bufferCtx = bufferCanvas.getContext('2d', {
  alpha: true,
  willReadFrequently: false,
  desynchronized: true
});

let width, height;
function resizeCanvas() {
  width = canvas.width = bufferCanvas.width = window.innerWidth;
  height = canvas.height = bufferCanvas.height = window.innerHeight;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const shapes = [];
const SHAPE_COUNT = 12;
const BASE_SIZE = 0.006;
const BASE_SIZE_MULTIPLIER = 12;
const BLUR_AMOUNT = 3;
const SHADOW_SCALES = [1.3, 1.9, 3, 4.1];
let lastFrameTime = 0;
const ACCUMULATOR_THRESHOLD = 1 / 60;

const noise = new SimplexNoise(Math.random());

const noiseGenerators = [
  {
    name: 'simplex',
    generate: (x, y, time) => noise.noise(x, y)
  },
  {
    name: 'fbm',
    generate: (x, y, time) => fbm(noise, x, y, 3)
  },
  {
    name: 'turbulence',
    generate: (x, y, time) => turbulence(noise, x, y, 3)
  },
  {
    name: 'worley',
    generate: (x, y, time) => worley(x, y, 4)
  }
];

function getNoiseValue(generator, x, y, time) {
  try {
    return generator.generate(x, y, time);
  } catch (e) {
    return noise.noise(x, y);
  }
}

let lastNoiseTime = 0;
const NOISE_UPDATE_INTERVAL = isMobile ? 32 : 16;

function createAndChangeShapes(SSDeltaTime, currentTime) {
  if (typeof isWindowActive !== 'undefined' && !isWindowActive) return;
  const time = currentTime * 0.000005;
  const shouldUpdateNoise = (currentTime - lastNoiseTime) >= NOISE_UPDATE_INTERVAL;

  shapes.forEach(shape => {
    if (shouldUpdateNoise) {
      const freq1 = 0.0015, freq2 = 0.007;
      const time3 = time * 3;
      const x = shape.x;
      const y = shape.y;
      // Unique influences per shape and axis
      const noiseValueX = (
        getNoiseValue(shape.noiseGeneratorX, x * freq1, time, time) * 0.15 +
        noise.noise(x * freq2, time3) * 0.05
      ) * shape.noiseInfluenceX;
      const noiseValueY = (
        getNoiseValue(shape.noiseGeneratorY, y * freq1, time, time) * 0.15 +
        noise.noise(y * freq2, time3) * 0.05
      ) * shape.noiseInfluenceY;

      const smoothing = SSDeltaTime * 0.7;
      shape.vx += (noiseValueX - shape.vx) * smoothing;
      shape.vy += (noiseValueY - shape.vy) * smoothing;
    }

    const velocityFactor = SSDeltaTime * 40 * shape.speedMultiplier;
    shape.x += shape.vx * velocityFactor;
    shape.y += shape.vy * velocityFactor;
    shape.rotation += shape.rotationSpeed * SSDeltaTime * 0.6;

    const margin = 10;
    if (shape.x - margin < 0) {
      shape.x = margin;
      shape.vx = Math.abs(shape.vx);
    } else if (shape.x + margin > width) {
      shape.x = width - margin;
      shape.vx = -Math.abs(shape.vx);
    }
    if (shape.y - margin < 0) {
      shape.y = margin;
      shape.vy = Math.abs(shape.vy);
    } else if (shape.y + margin > height) {
      shape.y = height - margin;
      shape.vy = -Math.abs(shape.vy);
    }

    const slowTime = time * 0.3;
    const slantNoiseX1 = noise.noise(shape.slantNoiseOffsetX + shape.x * 0.002, slowTime) * 0.5 + 0.5;
    const slantNoiseY1 = noise.noise(shape.slantNoiseOffsetY + shape.y * 0.002, slowTime) * 0.5 + 0.5;
    const skewNoiseX1 = noise.noise(shape.skewNoiseOffsetX + shape.x * 0.002, slowTime) * 0.5 + 0.5;
    const skewNoiseY1 = noise.noise(shape.skewNoiseOffsetY + shape.y * 0.002, slowTime) * 0.5 + 0.5;

    shape.slantX = easeInOut(slantNoiseX1);
    shape.slantY = easeInOut(slantNoiseY1);
    shape.skewX = easeInOut(skewNoiseX1);
    shape.skewY = easeInOut(skewNoiseY1);

    const hueModulation = typeof metaRecursiveEaseNoise !== 'undefined'
      ? metaRecursiveEaseNoise(Math.sin(time * 1.5 + shape.hueShift))
      : Math.sin(time * 1.5 + shape.hueShift);
    shape.hue = (shape.hue + (hueModulation * 180)) % 360;

    const alphaBase = 0.15 + 0.1 * Math.sin(time + shape.alphaShift);
    const alphaNoise = noise.noise(shape.x * 0.005, shape.y * 0.005 + time) * 0.05;
    shape.alpha = Math.min(Math.max(0.07, alphaBase + alphaNoise), 0.3);

    shape.scale = 0.8 + noise.noise(shape.x * 0.005, shape.y * 0.005 + time * 0.5) * 0.7;
  });

  if (shouldUpdateNoise) lastNoiseTime = currentTime;
}

function precomputeShapeColors(shape) {
  shape.color1 = `hsla(${shape.hue}, 80%, 60%, 0.6)`;
  shape.color2 = `hsla(${(shape.hue + 140) % 360}, 90%, 40%, 0.8)`;
  shape.shadowColors = SHADOW_SCALES.map((_, idx) =>
    `hsla(${(shape.hue + idx * 40) % 360}, 70%, 50%, ${0.04 + idx * 0.02})`
  );
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

    const vertices = shape.vertices;
    const roundedCorners = shape.roundedCorners;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (let k = 0; k < vertices.length; k += 2) {
      const vx = vertices[k], vy = vertices[k + 1];
      if (vx < minX) minX = vx;
      if (vx > maxX) maxX = vx;
      if (vy < minY) minY = vy;
      if (vy > maxY) maxY = vy;
    }

    function createGradient(flip) {
      const gradient = ctx.createLinearGradient(
        flip ? maxX : minX,
        flip ? maxY : minY,
        flip ? minX : maxX,
        flip ? minY : maxY
      );
      const color1 = shape.color1;
      const color2 = shape.color2;
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
      ctx.fillStyle = shape.shadowColors[idx];
      ctx.fill();
      ctx.restore();
    });

    ctx.beginPath();
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

let accumulator = 0;

function animateShapes(currentTime) {
  const SSDeltaTime = (currentTime - lastFrameTime) / 1000 || 0.016;
  lastFrameTime = currentTime;
  accumulator += SSDeltaTime;
  while (accumulator >= ACCUMULATOR_THRESHOLD) {
    createAndChangeShapes(ACCUMULATOR_THRESHOLD, currentTime);
    accumulator -= ACCUMULATOR_THRESHOLD;
  }

  bufferCtx.clearRect(0, 0, width, height);
  drawShapes(bufferCtx);
  ctx.clearRect(0, 0, width, height);
  ctx.filter = `blur(${BLUR_AMOUNT}px)`;
  ctx.drawImage(bufferCanvas, 0, 0);
  ctx.filter = 'none';
  requestAnimationFrame(animateShapes);
}

// Shape initialization
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

  // Randomly assign noise generators to X and Y independently
  const randomGeneratorX = noiseGenerators[Math.floor(Math.random() * noiseGenerators.length)];
  const randomGeneratorY = noiseGenerators[Math.floor(Math.random() * noiseGenerators.length)];

  // Each gets a unique influence per axis
  const shape = {
    vertices,
    roundedCorners,
    hue: random(0, 360),
    alpha: random(0.05, 0.25),
    x: random(0, width),
    y: random(0, height),
    vx: random(-1, 1),
    vy: random(-1, 1),
    speedMultiplier: random(0.8, 1.2),
    rotation: random(0, Math.PI * 2),
    rotationSpeed: random(-0.33, 0.33),
    hueShift: random(0, Math.PI * 2),
    alphaShift: random(0, Math.PI * 2),
    scale: 1,
    slantX: 0,
    slantY: 0,
    skewX: 0,
    skewY: 0,
    slantNoiseOffsetX: random(-100000, 100000),
    slantNoiseOffsetY: random(-100000, 100000),
    skewNoiseOffsetX: random(-100000, 100000),
    skewNoiseOffsetY: random(-100000, 100000),
    noiseGeneratorX: randomGeneratorX,
    noiseGeneratorY: randomGeneratorY,
    noiseInfluenceX: typeof metaRecursiveEaseNoise !== 'undefined'
      ? metaRecursiveEaseNoise(Math.random())
      : Math.random(),
    noiseInfluenceY: typeof metaRecursiveEaseNoise !== 'undefined'
      ? metaRecursiveEaseNoise(Math.random())
      : Math.random(),
  };
  precomputeShapeColors(shape);
  shapes.push(shape);
}

animateShapes(0);
