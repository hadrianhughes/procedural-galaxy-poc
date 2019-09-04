const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const getRandom = (max, min = 0) => {
  const actualMax = min ? max - min : max;
  const num = Math.floor(Math.random() * actualMax);
  return num + min;
};

const multiplierWeightedToZero = () => Math.abs(Math.random() - Math.random());

const generateGalaxy = () => {
  const center = [CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2];
  const armCount = getRandom(6, 2);
  const starCount = getRandom(20000, 2000);
  const radius = getRandom(500, 200) / 2;
  const armRadius = getRandom(50, 100);

  const armInterval = (Math.PI * 2) / armCount;

  const starsPerArm = Math.floor(starCount / armCount);
  const points = [];
  for (let i = 0;i < armCount;i += 1) {
    let j;
    for (j = 0;j < starsPerArm;j += 1) {
      const relX = getRandom(armRadius);
      const relY = multiplierWeightedToZero() * radius;
      const jAngle = armInterval * j;

      const absX = center[0] + (relY * Math.cos(jAngle)) + (relX - armRadius / 2) * Math.cos(jAngle + Math.PI / 2);
      const absY = center[1] + (relY * Math.sin(jAngle)) + (relX - armRadius / 2) * Math.sin(jAngle + Math.PI / 2);
      points.push([absX, absY]);
    }
  }

  return points;
};

const render = points => {
  ctx.fillStyle = 'black';

  const pointsLength = points.length;
  let i;
  for (i = 0;i < pointsLength;i += 1) {
    ctx.fillRect(points[i][0], points[i][1], 1, 1);
  }
};

const galaxy = generateGalaxy();
render(galaxy);
