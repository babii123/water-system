export function checkPH(ph) {
  let result = true;
  if (ph < 6.5) {
    result = false;
  } else if (ph > 8.5) {
    result = false;
  } 
  return result;
}

export function checkTurbidity(turbidity) {
  let result = true;
  if (turbidity > 1) {
    result = false
  }
  return result;
}

export function checkFluoride(fluoride) {
  let result = true;
  if (fluoride > 1) {
    result = false
  }
  return result;
}

export function checkCyanin(cyanin) {
  let result = true;
  if (cyanin > 1) {
    result = false
  }
  return result;
}