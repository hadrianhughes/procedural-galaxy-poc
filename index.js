const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const MIN_ARMS = 2;
const MAX_ARMS = 6;
const MIN_STARS = 2000;
const MAX_STARS = 20000;
const MIN_RADIUS = 200;
const MAX_RADIUS = 500;
const MIN_ARM_RADIUS = 50;
const MAX_ARM_RADIUS = 100;
const MIN_SPIN = 0.5;
const MAX_SPIN = 1.3;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const getRandom = (max, min = 0) => {
  const actualMax = (min ? max - min : max) + 1;
  const floorFn = Number.isInteger(actualMax) ? Math.floor : y => y;

  const num = floorFn(Math.random() * actualMax);
  return num + min;
};

const multiplierWeightedToZero = abs => {
  const mul = Math.random() - Math.random();
  return abs ? Math.abs(mul) : mul;
};

const createGalaxy = () => {
  const center = [CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2];
  const armCount = getRandom(MAX_ARMS, MIN_ARMS);
  const starCount = getRandom(MAX_STARS, MIN_STARS);
  const radius = getRandom(MAX_RADIUS, MIN_RADIUS) / 2;
  const armRadius = getRandom(MAX_ARM_RADIUS, MIN_ARM_RADIUS);
  const spinFactor = getRandom(MAX_SPIN, MIN_SPIN);

  const armInterval = (Math.PI * 2) / armCount;

  const starsPerArm = Math.floor(starCount / armCount);
  const points = [];
  for (let i = 0;i < armCount;i += 1) {
    let j;
    for (j = 0;j < starsPerArm;j += 1) {
      // Set location of star in context of arm
      const armMiddle = armRadius / 2;
      const relX = (multiplierWeightedToZero() * armMiddle) + armMiddle;
      const relY = multiplierWeightedToZero(true) * radius;
      const jAngle = armInterval * j;

      // Convert arm relative position to absolute canvas position
      const absX = center[0] + (relY * Math.cos(jAngle)) + (relX - armRadius / 2) * Math.cos(jAngle + Math.PI / 2);
      const absY = center[1] + (relY * Math.sin(jAngle)) + (relX - armRadius / 2) * Math.sin(jAngle + Math.PI / 2);

      // Rotate stars
      const rotationAmount = (relY * spinFactor) * (Math.PI / 180);
      const xCenterRemoved = absX - center[0];
      const yCenterRemoved = absY - center[1];
      const rotatedX = xCenterRemoved * Math.cos(rotationAmount) - yCenterRemoved * Math.sin(rotationAmount);
      const rotatedY = xCenterRemoved * Math.sin(rotationAmount) + yCenterRemoved * Math.cos(rotationAmount);

      points.push([rotatedX + center[0], rotatedY + center[1]]);
    }
  }

  return points;
};

const render = points => {
  canvas.width = canvas.width;
  ctx.fillStyle = 'white';

  const pointsLength = points.length;
  let i;
  for (i = 0;i < pointsLength;i += 1) {
    ctx.fillRect(points[i][0], points[i][1], 1, 1);
  }
};

const generate = () => {
  const galaxy = createGalaxy();
  render(galaxy);
};

generate();

window.addEventListener('keyup', e => {
  if (e.keyCode === 32) {
    generate();
  }
});
