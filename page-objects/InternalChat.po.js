/*global page*/


const {
  BaseAction
} = require('../setup/baseAction');
const { assert } = require('chai');

exports.InternalChat = class InternalChat extends BaseAction {
  constructor() {
    super();
  }

  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    adminToolsMenu: 'a[data-title="Admin Tools"]',
    profileManagerButton: 'a[data-title="Profile Manager"]',
    userTypeDropDowm: '#s2id_access-level-list',
    userTypeInput: '#select2-drop input[id*=\'search\']',
    chatAccessDropdown: '#chat-permission',
    saveSettingButton: '#save-access-level',
    broadcastMessageCheckbox: 'label[data-translate=\'broadcastMessage\'] i',
    messageCounter: '#userCounter',
    unreadMessage: '//ul[@id="notify-list"]//li[1]//span[@class="notification-container unreadMessage"]',
    markAsReadSelector: '.mark-as-read-container',
    markAsReadDisable: '#mark-as-read[disabled]',
    unreadNotificationText: '#unreadNotification-tooltip-text',
    notificationContainer: '//li[1] //span[@class="notification-container"]',
    successMessage: '.bigBox.animated.fadeIn.fast',
    maskNumberCheckbox: '#mask-phone-numbers-group label i',
    profileSelect: '#s2id_access-level-list',
    sidePanelExpandMenu: '#left-panel .minifyme',
    profileManagerWrapper: '#profile-manager-wrapper',
    newAccess: '#new-access-level',
    profileName: '#accessLevelNameForm input#accessLevelNameInput',
    accessLevelSaveBtn: '#accessLevelNameSave',
    selectedAccessLevel: '#s2id_access-level-list span.select2-chosen',
    allowedChannelDropDown: '#s2id_channels-permissions .select2-search-field',
    allowedChannels: '.select2-drop-active .select2-results .select2-result-label',
    channelSearchResult: '.select2-match',
    selectedchannel: '.select2-search-choice div',
    channelInput: '#s2id_channels-permissions .select2-search-field .select2-input',
    userAddButton: '#btn-show-user-modal',
    userName: '#new_user_username',
    email: '#new-user-email',
    firstName: '#new_user_first_name',
    lastName: '#new_user_last_name',
    profile: '//select[@id="new_user_access_level_select"]',
    role: '//select[@id="new_user_roles_select"]',
    registrationPage: '[data-translate="user-add-dialog-title"]',
    saveButton: '#save_new_user',
    newUserVerficationPopUp: '//div[@id="newContentdiv"]/p[contains(text(),"User was sucessfully created!")]',
    callsInPreviewModeOption: '#preview-mode-desktop-notification~i',
    inAppNotification: '//div[@id="divSmallBoxes"]/div//span[text()="Call in preview mode"]'
  };

  /**
   * function to navigate to profile manager
   * @return {void} Nothing
   */
  async navigateToProfileManagerPage() {
    await this.waitForSelector(this.elements.sidePanelExpandMenu);
    await this.click(this.elements.sidePanelExpandMenu);
    await this.waitForSelector(this.elements.adminToolsMenu);
    if (await this.isVisible(this.elements.profileManagerButton)) {
      await this.click(this.elements.profileManagerButton);
    } else {
      await this.click(this.elements.adminToolsMenu);
      await this.waitForSelector(this.elements.profileManagerButton);
      await this.click(this.elements.profileManagerButton);
    }
    await this.waitForSelector(this.elements.profileManagerWrapper);
    await this.click(this.elements.sidePanelExpandMenu);
  }

  /**
   * function to select agent tab
   * @param {string} userType - type of user
   * @return {void} Nothing
   */
  async selectAgentTab(userType) {
    await this.click(this.elements.userTypeDropDowm);
    await this.type(this.elements.userTypeInput, userType);
    await this.pressKey('Enter');
  }

  /**
   * function to verify and select mask phone number checkbox
   * @return {void} Nothing
   */
  async verifyAndSelectMaskNumber() {
    await this.waitForSelector(this.elements.maskNumberCheckbox);
    await this.isVisible(this.elements.maskNumberCheckbox);
    if (! await this.isChecked(this.elements.maskNumberCheckbox))
      await this.click(this.elements.maskNumberCheckbox);
  }


  /**
   * function to select chat access
   * @param {string} accessType - user access type
   * @return {void} Nothing
   */
  async selectChatAccess(accessType) {
    if (accessType === 'no') {
      await this.selectOption(this.elements.chatAccessDropdown, 0);
    }
    if (accessType === 'simple') {
      await this.selectOption(this.elements.chatAccessDropdown, 1);
    }
    if (accessType === 'supervisor') {
      await this.selectOption(this.elements.chatAccessDropdown, 2);
    }
  }

  /**
   * function to save settings
   * @return {void} Nothing
   */
  async saveSetting() {
    await this.waitForSelector(this.elements.saveSettingButton);
    await this.click(this.elements.saveSettingButton);
    await this.waitForSelector(this.elements.successMessage);
  }

  /**
   * function to check box in boradcast message
   * @return {void} Nothing
   */
  async selectBroadcastMessageCheckbox() {
    if (
      !(await this.checkCheckbosIsChecked(
        this.elements.broadcastMessageCheckbox
      ))
    )
      await this.click(this.elements.broadcastMessageCheckbox);
  }

  /**
   * function to get count of notification
   * @param  {string} type -  page type
   *  @return {void} Nothing
   */
  async getCounter(type = '') {
    let counter = await this.getText(this.elements.messageCounter, type);
    return counter;
  }

  /**
   * function to verify unread notification
   * @param  {string} type -  page type
   *  @return {void} Nothing
   */
  async verifyUnreadNotification(type = '') {
    await this.isVisible(this.elements.unreadMessage, type);
  }

  /**
   * function to verify and mark all read button
   * @param  {string} type -  page type
   *  @return {void} Nothing
   */
  async markAllReadEnable(type = '') {
    await this.isVisible(this.elements.markAsReadSelector, type);
    await this.click(this.elements.markAsReadSelector, type);
  }

  /**
   * function to verify mark all read button disabled
   * @param  {string} type -  page type
   *  @return {void} Nothing
   */
  async markAllReadDisabled(type = '') {
    await this.isVisible(this.elements.markAsReadDisable, type);
  }

  /**
   * function to verify unread notification test
   * @param  {string} text - message
   * @param  {string} type - page type
   * @return {void} Nothing
   */
  async verifyUnreadNotificationText(text, type = '') {
    await this.mouseOver(this.elements.markAsReadSelector, type);
    await this.shouldContainText(this.elements.unreadNotificationText, text, type);
  }

  /**

   * function to uncheck mask phone number checkbox
   * @return {void} Nothing
   */
  async uncheckMaskNumber() {
    await this.waitForSelector(this.elements.maskNumberCheckbox);
    await this.isVisible(this.elements.maskNumberCheckbox);
    if (await this.isChecked(this.elements.maskNumberCheckbox))
      await this.click(this.elements.maskNumberCheckbox);
  }

  /**
   * function to update gocontact permission option
   * @param  {string} option - option name
   * @return {void} Nothing
   */
  async selectPermission(option) {
    let isWebchatSupervisorCheckbox = `label[data-translate='${option}'] i`;
    if (!(await this.checkCheckbosIsChecked(isWebchatSupervisorCheckbox)))
      await this.click(isWebchatSupervisorCheckbox);
  }

  /**
   * function to create new profile
   * @param  {string} profileName - profile name
   * @return {void} Nothing
   */
  async createNewProfile(profileName) {
    await this.waitForSelector(this.elements.newAccess);
    await this.click(this.elements.newAccess);
    await this.waitForSelector(this.elements.profileName);
    await this.type(this.elements.profileName, profileName);
    await this.click(this.elements.accessLevelSaveBtn);
  }

  /**
   * function to verify new profile
   * @param  {string} profileName - profile name
   * @return {void} Nothing
   */
  async verifyOpenProfile(profileName) {
    //wait for profile to load
    await this.wait(2);
    await this.waitForSelector(this.elements.selectedAccessLevel);
    await this.shouldContainText(this.elements.selectedAccessLevel, profileName);
  }

  /**
   * function to open Allowed channels dropdown
   * @return {void} Nothing
   */
  async openAllowedChannels() {
    await this.waitForSelector(this.elements.allowedChannelDropDown);
    await this.click(this.elements.allowedChannelDropDown);
  }

  /**
   * function to verify channels exist
   * @param  {string} channelType - channel name
   * @return {void} Nothing
   */
  async verifyChannelExists(channelType) {
    const arrayOfLocators = page.locator(this.elements.allowedChannels);
    const elementsCount = await arrayOfLocators.count();
    let texts = [];
    for (var index = 0; index < elementsCount; index++) {
      const element = await arrayOfLocators.nth(index);
      const innerText = await element.innerText();
      texts.push(innerText);
    }
    assert.isTrue(texts.includes(channelType));
  }

  /**
   * function to select access channel
   * @param  {string} channelType - channel name
   * @return {void} Nothing
   */
  async selectChannel(channelType) {
    await this.waitForSelector(this.elements.channelInput);
    await this.type(this.elements.channelInput, channelType);
    await this.waitForSelector(this.elements.channelSearchResult);
    await this.click(this.elements.channelSearchResult);
  }

  /**
   * function to verify selected access channel
   * @param  {string} channelType - channel name
   * @return {void} Nothing
   */
  async verifySelectedChannel(channelType) {
    await this.waitForSelector(this.elements.selectedchannel);
    await this.shouldContainText(this.elements.selectedchannel, channelType);
  }

  /**
   * function to verify success message
   * @param  {string} message - message
   * @return {void} Nothing
   */
  async verifySuccessMessage(message) {
    await this.waitForSelector(this.elements.successMessage);
    await this.shouldContainText(this.elements.successMessage, message);
  }

  /**             
  *function to select add button (users section) 
  * @return {void} Nothing
  */
  async selectAddButton() {
    await this.waitForSelector(this.elements.userAddButton);
    await this.click(this.elements.userAddButton);
  }

  /**
   * function to verify new user registration modal
   *  @return {void} Nothing
   */

  async verifyNewUserRegistrationModal() {
    await this.waitForSelector(this.elements.registrationPage);
    let modal = await this.isVisible(this.elements.registrationPage);
    await assert.isTrue(modal);
  }


  /**
   * function to enter new user details
   * @param {object} data - user data
   * @param {string} data.username - user data
   * @param {string} data.email - user email
   * @param {string} data.firstName - user first name
   * @param {string} data.lastName - user last name
   * @param {string} data.profile - user profile
   * @param {string} data.role - user role
   * @return {void} Nothing
   */
  async enterNewUserDetails(data) {
    if (data.userName) {
      await this.waitForSelector(this.elements.userName);
      await this.click(this.elements.userName);
      await this.type(
        this.elements.userName,
        data.userName
      );
      await this.pressKey('Enter');
    }

    if (data.email) {
      await this.waitForSelector(this.elements.email);
      await this.click(this.elements.email);
      await this.type(
        this.elements.email,
        data.email
      );
      await this.pressKey('Enter');
    }

    if (data.firstName) {
      await this.waitForSelector(this.elements.firstName);
      await this.click(this.elements.firstName);
      await this.type(
        this.elements.firstName,
        data.firstName
      );
      await this.pressKey('Enter');
    }

    if (data.lastName) {
      await this.waitForSelector(this.elements.lastName);
      await this.click(this.elements.lastName);
      await this.type(
        this.elements.lastName,
        data.lastName
      );
      await this.pressKey('Enter');
    }

    if (data.profile) {
      await this.waitForSelector(this.elements.profile);
      await this.dropdownOptionSelect(this.elements.profile, data.profile);
    }

    if (data.role) {
      await this.waitForSelector(this.elements.role);
      await this.dropdownOptionSelect(this.elements.role,
        data.role
      );
    }
    await this.waitForSelector(this.elements.saveButton);
    await this.click(this.elements.saveButton);
  }

  /**
   * function to verify new user created success message
   * @returns {void} -nothing
   */
  async VerifyNewUserCreated() {
    await this.waitForSelector(this.elements.newUserVerficationPopUp);
    let popup = await this.isVisible(this.elements.newUserVerficationPopUp);
    await assert.isTrue(popup);
  }

  /**             
  *function to check the desktop notification
  * @param {string} desktopOption - desktop notification option
  * @return {void} Nothing
  */
  async checkDesktopNotification(desktopOption) {
    if(desktopOption === 'Calls in preview mode') {
      await this.waitForSelector(this.elements.callsInPreviewModeOption);
      if (! await this.isChecked(this.elements.callsInPreviewModeOption))
        await this.click(this.elements.callsInPreviewModeOption);
    }
  }

  /**
   * function to verify In-App Notification
   * @param  {string} type -  page type
   * @returns {void} -nothing
   */
  async validateInAppNotification(type = '') {
    await this.waitForSelector(this.elements.inAppNotification, type);
    let popup = await this.isVisible(this.elements.inAppNotification, type);
    await assert.isTrue(popup);
  }
};
