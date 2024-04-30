const { When, Then, Given } = require('@cucumber/cucumber');
const { PortableAgent } = require('../page-objects/PortableAgent.po');
const { BaseAction } = require('../setup/baseAction');
const { userAccount } = require('../fixtures/data.json');
const { Homepage } = require('../page-objects/HomePage.po');

const portableAgent = new PortableAgent();
const baseAction = new BaseAction();
const homepageObj = new Homepage();
const login = userAccount;

Given('User login to the platform as below:', async(datatable)=>{
  const user = dataTable.rowsHash();

})

When('user selects {string} campaign with {string} queue in portable view in {string} window', async (outboundCampaign, inboundQueue, session) => {
  await portableAgent.selectCampaignAndQueue(outboundCampaign, inboundQueue, session);
});

When('user selects the option {string} in portable view in {string} window', async (option, session) => {
  await portableAgent.selectCallOption(option, session);
});

When('user make a manual call to {string} in portable view in {string} window', async (phoneNumber, session) => {
  await portableAgent.makeManualCall(phoneNumber, session);
});

Then('user submits the outcome in portable view in {string} window', async(session) => {
  await portableAgent.submitOutcome(session);
});

Then('user state should be {string} in portable view in {string} window', async(userState, session) => {
  await portableAgent.verifyUserState(userState, session);
});

Then('user selects a callback from the list and make a call in {string} window', async(session) => {
  await portableAgent.selectCallbackAndCall(session);
});

When('user select option {string} for transfer call in {string} window', async(actionButton, session) => {
  await portableAgent.transferToOptions(actionButton, session);
});

Then('user select plus icon and select {string} option in {string} window', async(optionToSelect, session) => {
  await portableAgent.selectPlusIconAndOption(optionToSelect, session);
});

When('user select {string} button in portable view in {string} window', async(actionButton, session) => {
  await portableAgent.selectCallMenu(actionButton, session);
});

When('user selects {string} from IVR menu in {string} window', async(ivrMenu, session) => {
  await portableAgent.selectIVRMenu(ivrMenu, session);
});

When('request a break in portable view in {string} window', async(session) => {
  await portableAgent.requestBreak(session);
});

When('user verifies if a {string} was created in portable view in {string} window', async(messageAction, session) => {
  await portableAgent.verifyNotification(messageAction, session);
});

When('user closes the panel in portable view in {string} window', async(session) => {
  await portableAgent.closePanel(session);
});

When('validate that the agent enters the previously selected break in {string} window', async(session) => {
  await portableAgent.verifyBreakName(session);
});

When('user enters the destination number {string} in {string} window', async(destinationNumber,session)=>{
  await portableAgent.enterDestinationNum(destinationNumber,session);
});

When('user selects transfer queue {string} in {string} window', async(queueName, session)=>{
  await portableAgent.selectTransferQueue(queueName,session);
});

Then('user state should be {string} at Destination in {string} window', async(state,session)=>{
  await portableAgent.verifyDestination(state,session);

});