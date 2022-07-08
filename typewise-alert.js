
const mapOfCoolingType = {
  PASSIVE_COOLING: [0, 35],
  HI_ACTIVE_COOLING: [0, 45],
  MED_ACTIVE_COOLING: [0, 40],
};

function inferBreach(value, lowerLimit, upperLimit) {
  return (value < lowerLimit) ? 'TOO_LOW' : (value > upperLimit) ? 'TOO_HIGH' : 'NORMAL';
}

function setUpperLowerLimit(coolingType) {
  let lowerLimit = 0;
  let upperLimit = 0;
  [lowerLimit, upperLimit] = mapOfCoolingType[coolingType];
  return [lowerLimit, upperLimit];
}

function classifyTemperatureBreach(coolingType, temperatureInC) {
  let lowerLimit = 0;
  let upperLimit = 0;
  [lowerLimit, upperLimit] = setUpperLowerLimit(coolingType);
  return inferBreach(temperatureInC, lowerLimit, upperLimit);
}

function checkAndAlert(alertTarget, batteryChar, temperatureInC) {
  const breachType = classifyTemperatureBreach(
      batteryChar['coolingType'],
      temperatureInC,
  );
  if (alertTarget == 'TO_CONTROLLER') {
    console.log(sendToController(breachType));
  } else if (alertTarget == 'TO_EMAIL') {
    sendToEmail(breachType);
  }
}

function sendToController(breachType) {
  const header = 0xfeed;
  return (`${header}, ${breachType}`);
}

function sendToEmail(breachType) {
  const recepient = 'a.b@c.com';
  if (breachType == 'TOO_LOW') {
    console.log(`To: ${recepient}`);
    console.log('Hi, the temperature is too low');
  } else if (breachType == 'TOO_HIGH') {
    console.log(`To: ${recepient}`);
    console.log('Hi, the temperature is too high');
  }
}

checkAndAlert('TO_CONTROLLER', {'coolingType': 'PASSIVE_COOLING'}, 20);

module.exports = {
  inferBreach,
  classifyTemperatureBreach,
  checkAndAlert,
  sendToController,
  sendToEmail,
  setUpperLowerLimit,
};
