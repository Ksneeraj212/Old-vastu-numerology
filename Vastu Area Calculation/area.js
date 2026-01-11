function calculateVastuArea(floorPlan) {
  // Split the floor plan into 16 directions
  const directions = splitFloorPlan(floorPlan);

  // Calculate the area of each direction
  const areas = directions.map(direction => {
    const points = direction.points;
    const area = calculatePolygonArea(points);
    return { direction, area };
  });

  return areas;
}

function splitFloorPlan(floorPlan) {
  // Split the floor plan into 16 directions based on Vastu wheel
  const directions = [];
  for (let i = 0; i < 16; i++) {
    const direction = {
      directionName: getVastuDirectionName(i),
      points: getVastuDirectionPoints(i, floorPlan.points),
    };
    directions.push(direction);
  }

  return directions;
}

function calculatePolygonArea(points) {
  // Calculate the area of a polygon using Shoelace formula
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const x1 = points[i].x;
    const y1 = points[i].y;
    const x2 = points[(i + 1) % points.length].x;
    const y2 = points[(i + 1) % points.length].y;
    area += (x1 * y2 - x2 * y1);
  }

  return area / 2;
}

function getVastuDirectionName(index) {
  const directions = [
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
  ];
  return directions[index];
}

function getVastuDirectionPoints(index, floorPlanPoints) {
  // Get the points of the specified Vastu direction from the floor plan
  const directionPoints = [];
  for (let i = 0; i < floorPlanPoints.length; i++) {
    const angle = calculateAngle(floorPlanPoints[i], floorPlanPoints[0]);
    const directionAngle = index * 22.5;
    if (Math.abs(angle - directionAngle) <= 11.25) {
      directionPoints.push(floorPlanPoints[i]);
    }
  }

  return directionPoints;
}

function calculateAngle(point1, point2) {
  // Calculate the angle between two points
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  return angle;
}
