const alerts = require('../typewise-alert');
const chai = require('chai');
const {expect} = require('chai');

const spies = require('chai-spies');

chai.use(spies);


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

/** Testing send to email */
it('sends a message to the email', () => {
  const spy = chai.spy.on(alerts, 'sendToEmail');
  alerts.sendToEmail('TOO_HIGH');
  expect(spy).to.have.been.called.with('TOO_HIGH');
});

/** Testing the check and alert functionality */
it('Test Checkandalert', () => {
  const spy = chai.spy.on(alerts, 'sendToController');
  alerts.checkAndAlert('TO_CONTROLLER', {coolingType: 'PASSIVE_COOLING'}, 20, {
    'TO_CONTROLLER': alerts.sendToController,
  });
  expect(spy).to.have.been.called.with('NORMAL');
});
