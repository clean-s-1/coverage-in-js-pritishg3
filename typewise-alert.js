
const mapOfCoolingType = {
  PASSIVE_COOLING: [0, 35],
  HI_ACTIVE_COOLING: [0, 45],
  MED_ACTIVE_COOLING: [0, 40],
};

const temperatureVal = {
  'TOO_LOW': 'low',
  'TOO_HIGH': 'high',
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

function checkAndAlert(alertTarget, batteryChar, temperatureInC, messageMode) {
  const breachType = classifyTemperatureBreach(
      batteryChar['coolingType'],
      temperatureInC,
  );
  messageMode[alertTarget](breachType);
}

function sendToController(breachType) {
  const header = 0xfeed;
  console.log(`${header}, ${breachType}`);
}

const getToRecepientFormat = (recepient, temperatureStatus) => {
  console.log(`To: ${recepient}`);
  console.log('Hi, the temperature is too '+ temperatureStatus);
};

function sendToEmail(breachType) {
  const recepient = 'a.b@c.com';
  getToRecepientFormat(recepient, temperatureVal[breachType]);
}

checkAndAlert('TO_CONTROLLER', {coolingType: 'PASSIVE_COOLING'}, 20, {
  'TO_CONTROLLER': sendToController,
});

module.exports = {
  inferBreach,
  classifyTemperatureBreach,
  checkAndAlert,
  sendToController,
  sendToEmail,
  setUpperLowerLimit,
};
