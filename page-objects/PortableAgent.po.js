/*global page pageNew*/

const { BaseAction } = require('../setup/baseAction');
const { assert } = require('chai');

exports.PortableAgent = class PortableAgent extends BaseAction {
  constructor() {
    super();
  }

  /**
  * * Creating elements object for initializing required locators
  */
  elements = {
    manualCallButton: '//button[@id="manualCallBtnClick"]',
    dialPadInput: '[name="phoneToCall"]',
    userStatus: (userState) => `//p[contains(@class,"state ng-binding") and contains(.,"${userState}")]`,
    submitButton: '[ng-click="submitBtnClick()"]',
    callButton: '[name="performCall"]',
    usernameInput: '//form[@id="login-form"]//input[@name="username"]',
    passwordInput: '//form[@id="login-form"]//input[@name="password"]',
    extensionInput: '//form[@id="login-form"]//input[@name="phoneExtension"]',
    signInButton: '//form[@id="login-form"]//button[@type="submit"]',
    callContainer: '//div[@id="outbound-inbound-container"]',
    selectOutbound: '//div[@id="outbound-inbound-container"]//div[@ng-model="outboundCampaign.selected"]',
    activeInputBox: '.select2-drop-active input',
    selectInbound: '//div[@id="outbound-inbound-container"]//div[@ng-model="inboundQueue.selected"]',
    inboundQueueSelector: (queueName) => `//div[@ng-model='inboundQueue.selected']//ul//span[contains(text(),'${queueName}')]`,
    removeDropDown: '//label[contains(text(),"Inbound queues")]',
    voiceSubmit: '//div[@id="outbound-inbound-container"]//button[contains(text(),"Submit")]',
    callOption: (option) => `//div[@id="call-container"]//li[@title='${option}']`,
    callbackList: '//div[@id="agent-callbacks"]//ul[@class="callbacks-list"]//li[contains(.,"Scheduled")][1]',
    phoneToCall: '//div[@id="agent-callbacks"]//ul[@class="callbacks-list"]//li[contains(.,"Scheduled")][1]//a[@class="phone-to-calll"]//span',
    callStateInRunning: '//div[contains(@class,"stopwatch-container")]',
    expandCallback: '//div[@id="agent-callbacks"]//li[@class="callback ng-scope expand"]',
    transferToButton: '[title="Transfer to"]',
    transferToButtonOptions: (actionButton) => `//div[@class="popover-left arrow ngdo-contents"]//button[@title="${actionButton}"]`,
    plusIcon: '[ng-dropover="transferRightMenu"]',
    plusIconOptionButton: (optionToSelect) => `//button[@title="${optionToSelect}"]`,
    callMenuOptionButton: (actionButton) => `//div[@class="call-menu"]//button[@title="${actionButton}"]`,
    selectIVR: '//div[@ng-model="transferPopOver.transferIVR"]',
    inputIVR: '//div[@ng-model="transferPopOver.transferIVR"]//input[@type="search"]',
    breakItem: (breakName) => `//div[@id="break-list-container"]//button[contains(@class,"break-item") and contains(.,'${breakName}')]`,
    notificationMessage: (message) => `//div[@id='notification-list-container']//li[contains(.,'${message}')]`,
    closePanel: '//a[@ng-click="closePanel()"]',
    breakName: '//div[@id="break-container"]//div[contains(@class,"break-name")]',
    outboundCampaignList: (campaign) => `//div[contains(@class,"select2-drop-active") and not(contains(@class,"select2-display-none"))]//ul[contains(@class,"select2-results")]//li//span[contains(text(),'${campaign}')]`,
    ivrList: (ivr) => `//div[contains(@class,"ui-select-container") and contains(@class,"open")]//div[contains(@class,"ui-select-dropdown")]//span[contains(.,'${ivr}') and contains(@class,"ui-select-highlight")]`,
    destinationNumber: '#popover-input input.popmodal-text-input',
    addSign: '.popover .btn-transf-padding',
    callDestination: '.go-call-destination',
    selectQueue: '//input[@placeholder="Queue inbound"]',
    transferQueueSelector: (queue) => `//div[contains(@class,'option')]//span[contains(text(),'${queue}')]`,
    destinationStatus: (state)=> `//p[contains(text(),"Destination")]/following-sibling::div//span[text()="${state}"]`
  };

  /**
     * Function to open portable url
     * @param {string} session - window session
     * @return {void} Nothing
     */
  async openPortableBrowserWithURL(session = '') {
    await this.openBrowser(global.PORTABLE_AGENT_HOST, session);
  }

  /**
   * function to set portable agent iframe instance
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async setIframe(session = '') {
    if (session === 'first') {
      this.iframe = await page.frame({ url: global.PORTABLE_AGENT_IFRAME_URL });
    } else if (session === 'second') {
      this.iframe = await pageNew.frame({ url: global.PORTABLE_AGENT_IFRAME_URL });
    }
  }

  /**
   * function to login on portable view
   * @param {object} loginData - logindata
   * @param {string} loginData.username - username
   * @param {string} loginData.password - password
   * @param {string} extension - login extension
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async loginProcess(loginData, extension, session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.usernameInput);
    await this.iframe.type(this.elements.usernameInput, loginData.username + '@' + global.DOMAIN);
    await this.iframe.type(this.elements.passwordInput, loginData.password);
    await this.iframe.type(this.elements.extensionInput, extension);
    await this.iframe.click(this.elements.signInButton);
    await this.iframe.waitForSelector(this.elements.callContainer);
  }

  /** 
   * Select outbound campaign & inbound queue while logging to voice channel
   * @param  {String} outboundCampaign - outbound campaign
   * @param  {String} inboundQueue - inbound queue
   * @param {string} session - window session
   * @return {void} Nothing
   **/
  async selectCampaignAndQueue(outboundCampaign, inboundQueue, session = '') {
    await this.setIframe(session);
    if (outboundCampaign !== 'No') {
      await this.iframe.waitForSelector(this.elements.selectOutbound);
      await this.iframe.click(this.elements.selectOutbound);
      await this.iframe.type(this.elements.activeInputBox, outboundCampaign);
      await this.iframe.waitForSelector(this.elements.outboundCampaignList(outboundCampaign));
      await this.iframe.click(this.elements.outboundCampaignList(outboundCampaign));
    }
    if (inboundQueue !== 'No') {
      await this.iframe.waitForSelector(this.elements.selectInbound);
      await this.iframe.click(this.elements.selectInbound);
      await this.iframe.waitForSelector(this.elements.inboundQueueSelector(inboundQueue));
      await this.iframe.click(this.elements.inboundQueueSelector(inboundQueue));
      await this.iframe.click(this.elements.removeDropDown);
    }
    await this.iframe.click(this.elements.voiceSubmit);
    //wait for agent to be ready
    await this.wait(3);
  }

  /**
   * Function to make a manual call in portable view
   * @param  {string} phoneNumber - phone number to dial
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async makeManualCall(phoneNumber, session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.manualCallButton);
    await this.iframe.click(this.elements.manualCallButton);
    await this.iframe.waitForSelector(this.elements.dialPadInput);
    await this.iframe.type(this.elements.dialPadInput, phoneNumber);
    await this.iframe.click(this.elements.callButton);
    await this.wait(2); //wait for call to load
    await this.iframe.waitForSelector(this.elements.manualCallButton);
    await this.iframe.click(this.elements.manualCallButton);
  }

  /**
   * Function to verify the user state
   * @param  {string} userState - user state(Wrap up, Talking, Ready)
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async verifyUserState(userState, session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.userStatus(userState));
    const userStates = await this.iframe.isVisible(this.elements.userStatus(userState));
    assert.isTrue(userStates);
  }

  /**
   * Function to submit the outcome
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async submitOutcome(session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.submitButton);
    await this.iframe.click(this.elements.submitButton);
    await this.wait(2); //wait to load state
  }

  /**
   * Function to select call option: Personal Callback
   * @param  {string} optionName - select option
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async selectCallOption(option, session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.callOption(option));
    await this.iframe.click(this.elements.callOption(option));
  }

  /**
   * Function to select callback from list & make a call
   * @param  {string} optionName - select option
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async selectCallbackAndCall(session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.callbackList);
    await this.iframe.click(this.elements.callbackList);
    await this.iframe.waitForSelector(this.elements.expandCallback);
    await this.iframe.waitForSelector(this.elements.phoneToCall);
    await this.iframe.click(this.elements.phoneToCall);
    await this.wait(5); //wait for call to load
    await this.iframe.waitForSelector(this.elements.manualCallButton);
    await this.iframe.click(this.elements.manualCallButton);
  }

  /**
   * Function to select transfer to options
   * @param  {string} actionButton - option to select (Manual call, IVR, Queue inbound)
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async transferToOptions(actionButton, session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.transferToButton);
    await this.iframe.click(this.elements.transferToButton);
    await this.iframe.waitForSelector(this.elements.transferToButtonOptions(actionButton));
    await this.iframe.click(this.elements.transferToButtonOptions(actionButton));
  }

  /**
   * Function to click on + icon & select option
   * @param  {string} optionToSelect - option to select (Call destination, Immediate transfer)
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async selectPlusIconAndOption(optionToSelect, session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.plusIcon);
    await this.iframe.click(this.elements.plusIcon);
    await this.iframe.waitForSelector(this.elements.plusIconOptionButton(optionToSelect));
    await this.iframe.click(this.elements.plusIconOptionButton(optionToSelect));
  }

  /**
   * Function to click on call menu buttons
   * @param  {string} actionButton - call menu options (Manual call, Hang up, Volume, On hold, IVR, Transfer)
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async selectCallMenu(actionButton, session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.callMenuOptionButton(actionButton));
    await this.iframe.click(this.elements.callMenuOptionButton(actionButton));
  }

  /**
   * Function to select IVR menu
   * @param  {string} ivrMenu - menu to be selected
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async selectIVRMenu(ivrMenu, session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.selectIVR);
    await this.iframe.click(this.elements.selectIVR);
    await this.iframe.waitForSelector(this.elements.inputIVR);
    await this.iframe.type(this.elements.inputIVR, ivrMenu);
    await this.iframe.waitForSelector(this.elements.ivrList(ivrMenu));
    await this.iframe.click(this.elements.ivrList(ivrMenu));
  }

  /**
   * Function to request a break
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async requestBreak(session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.breakItem(global.breakName));
    await this.iframe.click(this.elements.breakItem(global.breakName));
  }

  /**
   * Function to verify notification
   * @param  {string} messageAction - message to be verified on notification
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async verifyNotification(messageAction, session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.notificationMessage(messageAction));
  }

  /**
   * Function to close panel
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async closePanel(session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.closePanel);
    await this.iframe.click(this.elements.closePanel);
  }

  /**
   * Function to verify break name
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async verifyBreakName(session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.breakName);
    let currentBreakName = await this.iframe.locator(this.elements.breakName).innerText();
    assert.equal(currentBreakName, global.breakName);
  }

  /**
   * Function to enter transfer destination number
   * @param {string} destination - destination number
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async enterDestinationNum(destination, session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.destinationNumber);
    await this.iframe.type(this.elements.destinationNumber, destination);
    await this.pressKey('Enter');
  }

  /**
   * Function to select transfer queue
   * @param {string} queueName - queue name
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async selectTransferQueue(queueName, session = '') {
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.selectQueue);
    await this.iframe.click(this.elements.selectQueue);
    await this.iframe.waitForSelector(this.elements.transferQueueSelector(queueName));
    await this.iframe.click(this.elements.transferQueueSelector(queueName));
  }

  /**
   * Function to verify destination user state
   * @param {string} state - user state
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async verifyDestination(state, session =''){
    await this.setIframe(session);
    await this.iframe.waitForSelector(this.elements.destinationStatus(state));
    const userStates = await this.iframe.isVisible(this.elements.destinationStatus(state));
    assert.isTrue(userStates);
  }
};