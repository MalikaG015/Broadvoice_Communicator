const playwright = require('playwright');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Homepage } = require('../page-objects/HomePage.po');
const { userAccount } = require('../fixtures/data.json');
const { BaseAction } = require('../setup/baseAction');
const loginData = require('../fixtures/data.json');
const { Breaks } = require('../page-objects/Breaks.po');


const homepage = new Homepage();
const baseAction = new BaseAction();

const breaks = new Breaks();
const login = loginData.userAccount;

Then('reset global variables', async () => {
  global.uuidResponse = [];
  global.newDBName = [];
  global.templateName = [];
  global.campaignName = [];
  global.downloadFileName = [];
  global.voiceChannelLogInTime = '';
  global.voiceChannelLogoutTime = '';
  global.totalVoiceLoginTime = '';
  global.databaseResponse = [];
  global.contactID = [];
  global.scriptNew = '';
  global.auditDate = '';
  global.ticketID = '';
  global.emailSubject = '';
  global.emailSubjectOld = '';
  global.loggedInAgentName = '';
  global.webchatMsg = [];
  global.queueName = [];
  global.chatId = '';
  global.webchatOldMsg = [];
  global.chatRepliedTime = '';
  global.chatCloseTime = '';
  global.messageReceivedTime = '';
  global.totalChatCount = '';
  global.activeChatCount = '';
  global.solvedChatCount = '';
  global.waitingChatCount = '';
  global.abandonedChatCount = '';
  global.webchatTicketId = '';
  global.breakName = '';
  global.randomStringMessage = '';
});

Given('User login to the platform as {string} in {string} window', async (role, session) => {
   await homepage.openBrowserWithURL(session);
await homepage.loginProcess(login[role], session);
  await homepage.deleteRedisCall(session);
  await homepage.verifyPageDisplayed('dashboard', session);
  await homepage.deleteRedisCall(session);
  await homepage.verifyPageDisplayedRoleWise(role, session);
  global.loggedInAgentName = login[role].name;
  global.emailSubject = baseAction.userID_Alpha_Numeric();
  if (role === 'admin') {
    global.emailSubjectOld = global.emailSubject;
  }
});

When('user access {string} menu and then {string} submenu in {string} window', async(menu, submenu, session) => {
  await homepage.clickMenuAndSubMenus(menu, submenu, session);
});



When('Add agent {string} to the group', async (agent) => {
  await homepage.addAgent(agent);
});

Then('user select {string} from users_table', async (user) => {
  await homepage.selectUser(user);
});

Then('validate {string} is displayed in {string} filter', async (user, status) => {
  await homepage.validateUserState(user,status);
});

Then('validate {string} count is {string}', async (status,count) => {
  await homepage.validateUserCount(status,count);
});

Then('user click {string} user button', async(state)=>{
  await homepage.changeUserStatus(state);
});

Then('user click {string} in pending contact', async(action)=>{
  await homepage.changePendingStatus(action);
});

Then('user clicks {string} button on popup', async(action)=>{
  await homepage.interactDeletePopup(action);
});

When('User access ticket channel in {string} window', async (session) => {
  await homepage.navigateToTicketChannel(session);
});

When('user selects {string} tab', async (userType) => {
  await homepage.selectAgentTab(userType);
});

When('user save the settings', async () => {
  await homepage.saveSetting();
});