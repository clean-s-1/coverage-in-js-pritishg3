const alerts = require('../typewise-alert');
const {expect} = require('chai');

/** Testing the inferBreach issue.  */
it('infers a value lower than the minimum as TOO_LOW', () => {
  expect(alerts.inferBreach(20, 50, 100)).equals('TOO_LOW');
});

it('infers a value higher than the maximum temperature as TOO_HIGH', () => {
  expect(alerts.inferBreach(101, 50, 100)).equals('TOO_HIGH');
});

it('infers a value between min and max temperature as NORMAL', () => {
  expect(alerts.inferBreach(70, 50, 100)).equals('NORMAL');
});

/** Testing the classifyTemperatureBreach issue.  */
it('classifies a value lower than the minimum as TOO_LOW', () => {
  expect(alerts.classifyTemperatureBreach('PASSIVE_COOLING', -1)).equals('TOO_LOW');
});

it('classifies a value higher than the maximum temperature as TOO_HIGH', () => {
  expect(alerts.classifyTemperatureBreach('PASSIVE_COOLING', 36)).equals('TOO_HIGH');
});

it('classifies a value between min and max temperature as NORMAL', () => {
  expect(alerts.classifyTemperatureBreach('PASSIVE_COOLING', 20)).equals('NORMAL');
});

it('Send to controller test', () => {
  expect(alerts.sendToController('TOO_LOW')).equals('65261, TOO_LOW');
});

