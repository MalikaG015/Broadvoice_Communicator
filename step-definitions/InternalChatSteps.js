const playwright = require('playwright');
const { When, Then } = require('@cucumber/cucumber');
const { Homepage } = require('../page-objects/HomePage.po');
const { InternalChat } = require('../page-objects/InternalChat.po');
const loginData = require('../fixtures/data.json');
const { Breaks } = require('../page-objects/Breaks.po');
const { AgentQuality } = require('../page-objects/AgentQuality.po');
const { BaseAction } = require('../setup/baseAction');
const { ticketsOnline } = require('../page-objects/TicketsOnline.po');

const login = loginData.userAccount;
const homepageObj = new Homepage();
const internalChat = new InternalChat();
const breaks = new Breaks();
const agentQuality = new AgentQuality();
const baseAction = new BaseAction();
const ticket = new ticketsOnline();
global.newUserName = '';
let previousCounter = 0;
let newCounter = 0;

// When('user access profile manager menu', async () => {
//   await internalChat.navigateToProfileManagerPage();
// });
When('user access {string} menu', async (menu) => {
  if(menu==='profile manager'){
    await internalChat.navigateToProfileManagerPage();
  }
});

When('user selects {string} tab', async (userType) => {
  await internalChat.selectAgentTab(userType);
});

When('user selects {string} chat access', async (accessType) => {
  await internalChat.selectChatAccess(accessType);
});

// When('user save the settings', async () => {
//   await internalChat.saveSetting();
// });

When('user selects following configurations and save the settings:',async(dataTable)=>{
  let data = dataTable.rowsHash();
  await internalChat.saveSetting(data);
})

When('I re-login using {string} account', async (userType) => {
  await homepageObj.logout();
  await homepageObj.loginProcess(login[userType]);
  await homepageObj.verifyPageDisplayed();
  await homepageObj.verifyPageDisplayedRoleWise(userType);
  await homepageObj.deleteRedisCall('same');
});

// When('user select messaging option in {string} window', async (session) => {
//   await homepageObj.clickOnMessagingOption(session);
// });

Then('user should not have chat access in {string} window', async (session) => {
  await homepageObj.verifyChatAccess(session);
});

Then('user should see active user list', async () => {
  await homepageObj.verifyActiveUserList();
});

When('user enables broadcast messages', async () => {
  await internalChat.selectBroadcastMessageCheckbox();
});

When('user selects send broadcast message option in {string} window', async (session) => {
  await homepageObj.clickOnBroadcastMessageOption(session);
});

When('user selects send broadcast message to {string} agent option in {string} window', async (user,session) => {
  await homepageObj.sendBroadcastMessageToAllAgent(user,session);
});

When(
  'user selects send broadcast message to particular {string} agent option in {string} window',
  async (agent, session, dataTable) => {
    let data = dataTable.rowsHash();
    await homepageObj.sendBroadcastMessageToParticularAgent(agent, data, session);
  }
);

Then('user verifies broadcast message is send', async () => {
  await homepageObj.verifyBroadcastMessageIsSent();
});

Then('user verifies broadcast message is send to agent', async () => {
  await homepageObj.logout();
  await homepageObj.loginProcess(login['admin']);
  await homepageObj.verifyPageDisplayed('dashboard');
  await homepageObj.verifyPageDisplayedRoleWise('admin');
  await homepageObj.verifyMessageIsRecieved();
});

When('user selects user from users tab', async () => {
  await homepageObj.selectUserFromUsersTab(login['admin']);
});

When('user send a message', async () => {
  await homepageObj.sendMessageToSelectedUser();
});

Then('user should see the sent message', async () => {
  await homepageObj.navigateToHomePage();
  await homepageObj.verifyMessageIsRecieved();
});

// When('verify admin is online for agent account', async () => {
//   await homepageObj.openNewBrowserSessionAndVerifyUser(
//     login['Agent_1'],
//     login['admin'].name
//   );
// });
//verify 'Agent_1' is online for another agent account in 'third' window
When('verify {string} is online for another agent account in {string} window', async (user,session) => {
  await homepageObj.openNewBrowserSessionAndVerifyUser(
    // login[Agent_2],
    login[user].name,
    session
  );
});

// When('verify agent is online for another agent account', async () => {
//   await homepageObj.openNewBrowserSessionAndVerifyUser(
//     login['Agent_2'],
//     login['Agent_1'].name,
//   );
// });

When('user login to the platform with {string} account in {string} window', async (userType, session) => {
  await breaks.openNewBrowserSession(session);
  await homepageObj.loginProcess(login[userType], session);
  await homepageObj.verifyPageDisplayed('dashboard', session);
  await homepageObj.verifyPageDisplayedRoleWise(userType, session);
  await homepageObj.deleteRedisCall(session);
});

When('user send a message in {string} window', async (session) => {
  await homepageObj.sendMessageToSelectedUser(session);
});

When('user switch the tab',async () => {
  await homepageObj.switchTab();
});

When('user select messaging option in {string} window', async (session) => {
  await homepageObj.clickOnMessagingOption(session);
});

When('user selects user from users tab in {string} window', async (session) => {
  await homepageObj.selectUserFromUsersTab(login['admin'], session);
});

When('close the {string} window session', async (session) => {
  await breaks.closeBrowserSession(session);
});

When('user navigate to homepage', async() => {
  await homepageObj.navigateToHomePage();
});

When('user get the counter of message in {string} window',async(type)=>{
  previousCounter= await internalChat.getCounter(type);
});

When('user get the counter of message',async()=>{
  previousCounter= await internalChat.getCounter();
});

When('user verify counter is increased in {string} window',async(type)=>{
  await internalChat.wait(2);//wait for counter to be loaded
  newCounter = await internalChat.getCounter(type);
  await internalChat.verifyGreaterThan(previousCounter,newCounter);
});

When('user verify counter is increased',async()=>{
  await internalChat.wait(3);//wait for counter to be updated
  newCounter = await internalChat.getCounter();
  await internalChat.verifyGreaterThan(previousCounter,newCounter);
});

Then('user access the notification in {string} window',async(type) =>{
  await homepageObj.clickOnMessagingOption(type);
  await homepageObj.notificationTab(type);
});

Then('user access the notification',async() =>{
  await homepageObj.clickOnMessagingOption();
  await homepageObj.notificationTab();
});

Then('user confirm that the top notification is unread in {string} window',async(type) => {
  await internalChat.verifyUnreadNotification(type);
});

Then('user confirm that the top notification is unread',async() => {
  await internalChat.verifyUnreadNotification();
});

Then('user confirm mark all read button is enabled and click it in {string} window',async(type) => {
  await internalChat.markAllReadEnable(type);
});

Then('user confirm mark all read button is enabled and click it',async() => {
  await internalChat.markAllReadEnable();
});

Then('user confirm that mark all read button is disabled in {string} window',async(type) => {
  await internalChat.markAllReadDisabled(type);
});

Then('user confirm that mark all read button is disabled',async() => {
  await internalChat.markAllReadDisabled();
});

Then('user verify message is visible {string} in {string} window',async(text,type)=>{
  await internalChat.verifyUnreadNotificationText(text,type);
});

Then('user verify message is visible {string}',async(text)=>{
  await internalChat.verifyUnreadNotificationText(text);
});

Then('user confirm that the notifications counter is no longer presented in {string} window',async(type)=>{
  await homepageObj.verifyNoCounter(type);
});

Then('user confirm that the notifications counter is no longer presented',async()=>{
  await homepageObj.verifyNoCounter();
});

When('Select {string} tab from agent quality page in {string} window',async(tabName,session)=>{
  await agentQuality.clickTab(tabName,session);
});

When('user make a suggest message in {string} window',async(session)=>{
  await agentQuality.makeASuggestion(session);
});

When('user verify and select mask number checkbox', async()=>{
  await internalChat.verifyAndSelectMaskNumber();
});

When('user uncheck masked number checkbox', async()=>{
  await internalChat.uncheckMaskNumber();
});

When('user enables {string} option', async (option) => {
  await internalChat.selectPermission(option);
});

When('user creates new profile page {string}', async(profileName)=>{
  await internalChat.createNewProfile(profileName);
});

Then('verify that access profile {string} is opened', async(profileName)=>{
  await internalChat.verifyOpenProfile(profileName);
});

When('user opens allowed channels box', async()=>{
  await internalChat.openAllowedChannels();
});

Then('verify following channels appear in the selector', async(dataTable)=>{
  let channelDetail =[];
  dataTable.hashes().forEach((element) => {
    channelDetail.push({
      'channelType': element.channelType,
    });
  });
  for (let i = 0; i < channelDetail.length; i++) {
    await internalChat.verifyChannelExists(channelDetail[i].channelType);
  }
});

When('user select {string} channel in profile access', async(channelType)=>{
  await internalChat.selectChannel(channelType);
});

Then('verify that {string} appears in allowed channels', async(channelType) =>{
  await internalChat.verifySelectedChannel(channelType);
});

Then('verify that success message {string}', async(message)=>{
  await internalChat.verifySuccessMessage(message);
});


Then('user add a new user with the following configurations:', async (tableData) => {
  const data = tableData.rowsHash();
  if (data.userName === 'New User') {
    let randomUserName = global.newUserName = await baseAction.getRandomString('_new');
    data.userName = await randomUserName.toString();
  }
  await internalChat.selectAddButton();
  await internalChat.verifyNewUserRegistrationModal();
  await internalChat.enterNewUserDetails(data);
  await internalChat.VerifyNewUserCreated();

});

Then('user fetch the login credentials from email {string} with subject {string} via API', async (email,subject) => {
  await ticket.mailVerify(email, subject);
  await ticket.loginCredentails();

});

Then('user re-login to the platform as second user', async () => {
  await homepageObj.logout();
  await homepageObj.loginAsNewUser();
  await homepageObj.verifyPageDisplayed();
});

Then('user activate the setting by checking the checkbox {string}', async(desktopOption) => {
  await internalChat.checkDesktopNotification(desktopOption);
});

When('User access ticket channel in {string} window', async (session) => {
  await homepageObj.navigateToTicketChannel(session);
});

Then('Agent_1 validate the in-app fast notification in {string} window', async (session) => {
  await internalChat.validateInAppNotification(session);
});

Then('user login to the platform with {string} account in non incognito mode in {string} window', async(userType, session) => {
  const options = {
    args: ['--start-maximized'],
    headless: global.headlessValue,
    slowMo: 100,
    channel: 'chrome', // or 'msedge'
  };
  const userDataPath = process.env.LOCALAPPDATA + '\\Google\\Chrome\\User Data\\Default';
  global.context = await playwright['chromium'].launchPersistentContext(userDataPath, options);
  global.secondSession = await global.context.newPage();
  await global.secondSession.goto(global.BASE_URL);
  await homepageObj.loginProcess(login[userType], session);
  await homepageObj.verifyPageDisplayed('dashboard', session);
  await homepageObj.verifyPageDisplayedRoleWise(userType, session);
  await homepageObj.deleteRedisCall(session);
});