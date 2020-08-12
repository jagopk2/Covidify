const get_goal = (point) => {
  if (point < 100) {
    return 100;
  } else if (point < 250) {
    return 250;
  } else if (point < 500) {
    return 500;
  } else if (point < 1000) {
    return 1000;
  } else if (point < 5000) {
    return 5000;
  } else if (point < 10000) {
    return 10000;
  } else if (point < 20000) {
    return 20000;
  }
};
const get_achievementPoints = (key) => {
  switch (key) {
    case 1:
      return 100;
    case 2:
      return 250;
    case 3:
      return 500;
    case 4:
      return 1000;
    case 5:
      return 5000;
    case 6:
      return 10000;
    case 7:
      return 20000;
  }
};

const logo_helper = (point1, point2) => {
  if ((point1 >= 0 && point1 < 100) || (point2 >= 0 && point2 < 100)) {
    return [0];
  } else if (
    (point1 >= 100 && point1 < 250) ||
    (point2 >= 100 && point2 < 250)
  ) {
    return [0, 1];
  } else if (
    (point1 >= 250 && point1 < 500) ||
    (point2 >= 250 && point2 < 500)
  ) {
    return [0, 1, 2];
  } else if (
    (point1 >= 500 && point1 < 1000) ||
    (point2 >= 500 && point2 < 1000)
  ) {
    return [0, 1, 2, 3];
  } else if (
    (point1 >= 1000 && point1 < 5000) ||
    (point2 >= 1000 && point2 < 5000)
  ) {
    return [0, 1, 2, 3, 4];
  } else if (
    (point1 >= 5000 && point1 < 10000) ||
    (point2 >= 5000 && point2 < 10000)
  ) {
    return [0, 1, 2, 3, 4, 5];
  } else if (
    (point1 >= 10000 && point1 < 20000) ||
    (point2 >= 10000 && point2 < 20000)
  ) {
    return [0, 1, 2, 3, 4, 5, 6];
  } else if (
    (point1 >= 20000 && point1 < 50000) ||
    (point2 >= 20000 && point2 < 50000)
  ) {
    return [0, 1, 2, 3, 4, 5, 6, 7];
  } else {
    return [0];
  }
};

const check_Helper = (point1, point2) => {
  if (
    (point1 >= 0 && point1 < 100) ||
    (point2 >= 0 && point2 < 100 && key == 0)
  ) {
    return false;
  } else if (
    (point1 >= 100 && point1 < 250) ||
    (point2 >= 100 && point2 < 250 && key == 1)
  ) {
    return false;
  } else if (
    (point1 >= 250 && point1 < 500) ||
    (point2 >= 250 && point2 < 500 && key == 2)
  ) {
    return false;
  } else if (
    (point1 >= 500 && point1 < 1000) ||
    (point2 >= 500 && point2 < 1000 && key == 3)
  ) {
    return false;
  } else if (
    (point1 >= 1000 && point1 < 5000) ||
    (point2 >= 1000 && point2 < 5000 && key == 4)
  ) {
    return false;
  } else if (
    (point1 >= 5000 && point1 < 10000) ||
    (point2 >= 5000 && point2 < 10000 && key == 5)
  ) {
    return false;
  } else if (
    (point1 >= 10000 && point1 < 20000) ||
    (point2 >= 10000 && point2 < 20000 && key == 6)
  ) {
    return false;
  } else if (
    (point1 >= 20000 && point1 < 50000) ||
    (point2 >= 20000 && point2 < 50000 && key == 7)
  ) {
    return false;
  } else {
    return true;
  }
};
export {get_goal, get_achievementPoints, logo_helper};
