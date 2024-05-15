/*global page, frames, browser, userPage*/

const { assert } = require('chai');
const { BaseAction } = require('../setup/baseAction');
const { Breaks } = require('../page-objects/Breaks.po');
const { Homepage } = require('../page-objects/HomePage.po');
const homepageObj = new Homepage();
const Break = new Breaks();
exports.WebchatChannel = class WebchatChannel extends BaseAction {
  constructor() {
    super();
  }

  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    emptyWebChatMessage: '.webchat-inbox-table-empty',
    webchatChannel: '#channel-webchat-connection-toggle',
    webchatId: '.info_container > div:nth-child(1) p:nth-child(2)',
    webchatMsg: '#webchat-inbox-table-ctn tbody tr:first-child td:nth-child(6)',
    webchataActiveTab: '#webchat-inbox-tabs li.active span',
    webchatStatus:
      '[id="webchat-inbox-table-ctn"]>table>tbody>tr:nth-child(1)>td:nth-child(4)>span',
    webchatUnreadmessage:
      '[id="webchat-inbox-table-ctn"]>table>tbody>tr:nth-child(1)>td:nth-child(8)>span:nth-child(1)',
    webchatCounter: '#channel-webchat-connection-toggle span',
    webchatReplybutton: 'button[data-action="join"]',
    webchatReplyBox: '.message-area',
    webchatReplySendButton: '#send-message',
    webchatCloseButton: 'button[data-action="leave"]',
    webchatSubject: '#s2id_modal-close-subject',
    webchatSubjectSelect:
      '#select2-drop ul.select2-results li ul li:first-child',
    webchatCloseComment: '#modal-close-comments',
    calendarTab: '[data-target="#wc-calendar"]',
    queuesTab: '[data-target="#wc-queues"]',
    calendarDaySlider: '#webxhat-calender-container > div:nth-child',
    calendarDaySliderException:
      '#wc-calendar fieldset section:nth-child(3) div',
    exceptionDatePicker: '[id="wc-datepicker-date"]',
    saveButton: '[id="wc-button-cancel"]~button>i~span',
    addExceptionButton: '[id="wc-button-exception"]',
    settingsTab: '[data-target="#wc-style"]',
    ticketIntegrationProperty:
      '[data-translate="webchat_settings_properties_ticket"]',
    ticketOfflineProperty:
      '[data-translate="webchat_settings_properties_show_off"]',
    ticketQueueID: '//div[@id="s2id_wc-select-queues"]',
    editQueues: '[title="Edit Queue"]',
    webchatActionButton:
      'button[class="btn btn-default btn-block dropdown-toggle"]',
    spamYes: '[id="bot2-Msg1"]',
    searchTab: '[data-translate="search_webchats"]',
    searchTabStatus: '[id="s2id_wc-select-state"]',
    searchTabStartDate: '[id="wc-date-start"]',
    searchTabEndDate: '[id="wc-date-end"]',
    searchTabEmail: '[id="wc-input-email"]',
    submitSearch: '[id="search_button"]',
    searchResultTable: '[id="wc-search-datatable"]',
    searchTabChatID: '[id="wc-input-id"]',
    ticketId: '[data-translate="ticket_msg_success"]~b',
    previousConversationTab: 'li.tab-previous-conv',
    prevConversationTable: '.tab-previous-conv-ctn table tbody tr',
    prevConversationDetails:
      '#webchat_print_version li[data-from="CLIENT"][data-type="MSG"] div div:nth-child(2)',
    prevConversationDetailsReply:
      '#webchat_print_version li[data-from="AGENT"][data-type="MSG"] div div:nth-child(2)',
    queueFilter: '#wc-queue-datatable_filter input',
    queueFilterEdit: '#wc-queue-datatable td .btn-edit:first-child',
    queueTab: 'a[data-target="#wc-queues"]',
    queueTd: '#wc-queue-datatable td:first-child',
    queueWidgetForm: '#wc-queue-content',
    addAgentInput:
      '#wc-queue-content fieldset:last-child .select2-choices li:last-child input',
    editAgent: '#wc-queue-edit',
    saveAgent: '#wc-queue-save',
    transferConversation: 'button[data-action="transfer"]',
    modalTransfer: '#modal-transfer',
    newAgentDropdown: '#s2id_modal-transfer-new-agent span',
    newAgentSelectName: '#select2-drop input',
    transferConfirm: '#modal-transfer-confirm',
    webchatWorkspace: '#webchat-workspace-ctn',
    webchatReceivedMessage:
      'li[data-from="AGENT"][data-type="JOIN"]:last-child div div.intro span:nth-child(2)',
    addQueue: '#wc-queue-add',
    queueNameInput: 'input[name="wc-queue-name"]',
    queuePathInput: 'input[name="wc-queue-relative-path"]',
    newQueueDropdown: '#s2id_modal-transfer-new-queue',
    newQueueInput: '.select2-drop-active input',
    webchatFilter: '#webchat-inbox-options-webchats',
    addTemplate: '#wc-button-template',
    templateName: '#templateNameInput',
    templateMessage: 'textarea[data-translate="template_message_placeholder"]',
    selectType: 'select[name="type"]',
    addOption: '#wc-button-add-option',
    inputOption: '.webchat-template-option-ctn label.input:nth-child(2) input',
    inputOption2: '.webchat-template-option-ctn label.input:nth-child(3) input',
    saveTemplate: 'span[data-translate="template_btn_submit"]',
    templateSelect2: '#s2id_wc-select2-templates',
    templateSelect2Input: '#s2id_wc-select2-templates input.select2-input',
    channelSubmit: 'span[data-translate="webchat_btn_submit"]',
    webchatAgentJoined: 'li[data-from="AGENT"]',
    activeTemplate:
      '.ui-autocomplete-custom[style*="display: block;"] li:first-child',
    clientTemplateVerify:
      'li[data-type="MSG"][data-from="AGENT"] div div:nth-child(2) .bubble-text',
    verifyReply:
      '.active.client-status-online li[data-type="MSG"][data-from="CLIENT"]:last-child div div:nth-child(2) div:nth-child(2)',
    selectClientReply:
      'li[data-type="MSG"][data-from="AGENT"] div div:nth-child(2) select',
    deleteException:
      '[id="wc-exceptions-table"]>tbody>tr>td:nth-child(4)>button',
    ticketIdFromWebchat:
      'div > div > div > table > tbody > tr > td:nth-child(1) > span',
    uploadCssFileButton: '#webchat_files_custom_css_select',
    successMessage: '.bigBox.animated.fadeIn.fast',
    topSuccessMessage: '.SmallBox.animated.fadeInRight.fast',
    editSuccessMessage: '#smallbox10 > div.textoFull',
    searchedRow: '#wc-search-datatable tbody tr:first-child',
    searchRowModal: '#wc-modal-chat-render',
    inputSearch: '#wc-search-datatable_filter input',
    groupFilterList: '#groups_search_input',
    selectUser: '#groups_list',
    filterAgents: '#users_in_group_table_filter input',
    agentAdded: '#users_in_group_table tbody',
    addUser: '#show_user_to_group_modal',
    addingAgent: '#users_table_filter input',
    addUserCheckbox: '#users_table tbody td label',
    addToGroup: 'button[class="btn btn-success btn-sm add-users pull-right access-level-add"]',
    activeUserCheckBox: 'label[data-translate="changeUsersProfile"] i',
    saveAgentAccess: '#save-access-level',
    validateManageAssignment: '[data-translate="groupManagement.manageAssignments"]',
    webchatQueue: '#s2id_webchat_queues input',
    removeQueue: 'a[class="select2-search-choice-close"]',
    assignButton: '[data-translate="groupManagement.assignButton.Label"]',
    webchatChannelButton: '#webchat-inbox-options-webchats',
    noQueueAvailable: '#wc-queue-datatable tbody [class="dataTables_empty"]',
    deleteQueue: '[title="Delete Queue"]',
    returnButton: '//span[@data-translate="return_inbox"]',
    removeQueueExist: '(//a[@class="select2-search-choice-close"])[last()]',
    webchatClosebtn: '(//button[@data-action="leave"])[last()]',
    generalTab: 'a[data-target="#wc-settings"]',
    automaticChatDeliveryOption: '//span[@data-translate="groupManagement.refineAssignments.automaticChatDelivery"]',
    maxConcurrentChat: '#max_concurrent_chats',
    submitButton: '//button[@name="save_refine_assignments_button"]',
    messageInfo: '//p[@data-translate="wc_no_conversation"]',
    noOfMessages: '//div[@class="open-convo"]',
    authorizeButton: '[id="bigBoxAuthorize"]',
    webchatMessages: '(//div[@id="assignedConversations"])[last()]//div[@class="open-convo"]',
    webchatSubjectInput: '#select2-drop input',
    webchatConversationButton: '#modal-close-btn-close',
    closeConversationButton: '//div[contains(@class,"active status-OPEN client-status-online channel-webchat")]//button[@id="close-conversation"]',
    webchatAction: '#chat-after-logout-action span#webChatBreak-text',
    webchatReplyAgent: '//div[contains(@class, "active status-OPEN")]//div[contains(@class, "message-area")][not(@disabled)]',
    webchatReplySend: '//div[contains(@class, "active status-OPEN")]//span[@id="send-message" and not(contains(@class,"disabled"))]',
    firstMessage: '(//div[@class="conversation_status"])[1]',
    webchatLogout: '#channel-webchat-logout i',
    profileUserName: '#profile-userName',
    groupSelect: '#s2id_group_select',
    saveChange: '[name="save_user_button"]',
    chooseChannelButton: '#wallboard-totals-choose-webchatchannels',
    webchatChannel_1: '.choose-owner-checkbox + i',
    totalChat: '[data-translate="dashboard.webchat.overviewArea.totalChats"] +span',
    activeChat: '[data-translate="dashboard.webchat.overviewArea.activeChats"] +span',
    solvedChat: '[data-translate="dashboard.webchat.overviewArea.solvedChats"] +span',
    waitingChat: '[data-translate="dashboard.webchat.overviewArea.waitingChats"] +span',
    abandonedChat: '[data-translate="dashboard.webchat.overviewArea.abandonedChats"] +span',
    saveChannel: '[class="btn btn-primary pull-right submit-owner-selection-btn"]',
    averageReplyTime: '//div[@class="figure-wrapper shown-as-a-box avg-first-reply-time"]//h1[@class="figure-label"]',
    averageDurationTime: '//div[@class="figure-wrapper shown-as-a-box avg-chat-duration-time"]//h1[@class="figure-label"]',
    averageCloseTime: '//div[@class="figure-wrapper shown-as-a-box avg-chat-duration-time"]//h1[@class="figure-label"]',
    returntoActiveChat: '[id="return-to-inbox"]',
    webchatSaveBtn: '#btn-webchats-save'
  };

  /**
   * function to validate webchat message status
   * @param {string} hashString - random string
   * @return {void} Nothing
   */
  async webchatMessageStatus(hashString) {
    await this.waitForSelector(this.elements.webchatMsg);
    await this.shouldContainSomeText(this.elements.webchatMsg);
    await this.wait(5);//wait to load latest message string
    await this.containSubstring(
      await this.getText(this.elements.webchatMsg),
      hashString
    );
    await this.containSubstring(
      await this.getText(this.elements.webchataActiveTab),
      'Active'
    );
    await this.containSubstring(
      await this.getText(this.elements.webchatStatus),
      'New'
    );
  }
  /**
   * function to get chat id
   * @return {void} Nothing
   */
  async getChatId() {
    await this.waitForSelector(this.elements.webchatId);
    const id = await this.getText(this.elements.webchatId);
    return id;
  }

  /**
   * function to validate unread message
   * @return {void} Nothing
   */
  async webchatUnreadMessage() {
    await this.containSubstring(
      await this.getText(this.elements.webchatUnreadmessage),
      '1'
    );
  }

  /**
   * function to validate webchat counter
   * @param {boolean} apiCall - flag to wait for api
   * @param {string} type -  page type
   * @return {string} - returns counter as text
   */
  async getWebChatCounter(apiCall = true, type = '') {
    if (apiCall) {
      await this.waitForResponse(
        global.BASE_URL + 'poll/new-webchat-service/users', type
      );
    }
    //This wait is needed to wait till counter increase
    await this.wait(4);
    await this.waitForSelector(this.elements.webchatChannel, type);
    let a = 0;
    // Check for empty webchat channel
    if (!(await this.isVisible(this.elements.emptyWebChatMessage, type))) {
      await this.wait(2);//wait to load counter
      if (await this.isVisible(this.elements.webchatCounter, type)) {
        await this.waitForSelector(this.elements.webchatCounter, type);
        a = await this.getText(this.elements.webchatCounter, type);
      }
    }
    return a;
  }

  /**
   * function to verify the counter
   * @param {string} counter - previous counter to compare with
   * @returns {void} nothing
   */
  async verifyCounter(counter) {
    const newCounter = await this.getWebChatCounter(false);
    console.log('newCounter=================',newCounter)
    await this.verifyGreaterThan(counter, newCounter);
  }

  /**
   * function for switching the tab
   * @return {void} Nothing
   */
  async switchtoOtherTab() {
    await this.switchTab();
  }

  /**
   * function to click the message under webchat channel
   * @param {string} hashString - random string
   * @param {string} type -  page type
   * @return {void} Nothing
   */
  async clickOnMessage(hashString, type) {
    const latestMessage = `//div[@id="webchat-inbox-table-ctn"] //td[contains(text(),"${hashString}")]`;
    await this.waitForSelector(latestMessage, type);
    await this.click(latestMessage, type);
  }

  /**
   * function to reply the message under webchat ticket
   * @param {string} hashStringReply - random string
   * @return {void} Nothing
   */
  async replyOnMessage(hashStringReply) {
    await this.click(this.elements.webchatReplybutton);
    await this.waitForSelector(this.elements.webchatReplySendButton);
    await this.click(this.elements.webchatReplyBox);
    await this.type(this.elements.webchatReplyBox, hashStringReply);
    await this.click(this.elements.webchatReplySendButton);
  }

  /**
   * function to close the conversation with customer
   * @param {string} status - conversation status
   * @param {string} subject - random subject
   * @param {string} type -  page type
   * @return {void} Nothing
   */
  async closeConversation(status, subject, type = '') {
    if (await this.isVisible(this.elements.webchatCloseButton, type)) {
      await this.click(this.elements.webchatCloseButton, type);
    }
    else {
      await this.waitForSelector(this.elements.webchatClosebtn, type);
      await this.click(this.elements.webchatClosebtn, type);
    }
    await this.waitForSelector(this.elements.webchatSubject, type);
    await this.click(this.elements.webchatSubject, type);
    await this.type(this.elements.newAgentSelectName, subject, type);
    await this.click(this.elements.webchatSubjectSelect, type);
    await this.click(this.elements.webchatCloseComment, type);
    await this.type(this.elements.webchatCloseComment, status, type);
    await this.click(this.elements.webchatConversationButton, type);
    const day = new Date();
    global.chatCloseTime = day.getTime();
    await this.waitForSelector(this.elements.successMessage, type);
  }

  /**
   * function to edit the action for webChat
   * @param {string} channelType - type of webchat channel
   * @returns {void} nothing
   */
  async clickEditAction(channelType) {
    let locator = `//td[text()='${channelType}']/following-sibling::td[last()]/button[last()-1]`;
    await this.waitForSelector(locator);
    await this.click(locator);
    await this.forceClick(locator);
    await this.waitForSelector(this.elements.generalTab);
    await this.click(this.elements.generalTab);
    await this.waitForSelector(this.elements.templateSelect2);
  }

  /**
   * function to click the calendar tab
   * @returns {void} nothing
   */
  async clickCalendarTab() {
    await this.waitForSelector(this.elements.calendarTab);
    await this.click(this.elements.calendarTab);
  }

  /**
   * function to select the time outside the current time
   * @returns {void} nothing
   */
  async selectTimeOutsideCurrentTime() {
    const d = new Date();
    let day = d.getDay();
    if (day === 0) day = 7;
    const selector = `${this.elements.calendarDaySlider}(${day})`;
    let hour = d.getHours();

    if (hour < 12) {
      await this.slider(
        `${selector}> div > span > span.irs-slider.from`,
        `${selector}> div > span > span.irs-slider.to`,
        'outOfSchedule'
      );
    } else {
      await this.slider(
        `${selector}> div > span > span.irs-slider.to`,
        `${selector}> div > span > span.irs-slider.from`,
        'outOfSchedule'
      );
    }
  }

  /**
   * function to add exception for working time
   * @returns {void} nothing
   */
  async selectExceptionWorkingTime() {
    await this.slider(
      `${this.elements.calendarDaySliderException}>span>span:nth-child(7)`,
      `${this.elements.calendarDaySliderException}>span>span:nth-child(6)`,
      'exception'
    );
  }

  /**
   * function to click the save button
   * @returns {void} nothing
   */
  async clickSavebutton() {
    await this.click(this.elements.saveButton);
    //need to add wait to save the editing
    await this.wait(6);
  }

  /**
   * function to add the exception date
   * @returns {void} nothing
   */
  async typeExceptionDate() {
    const day = new Date();
    const yyyy = day.getFullYear();
    let mm = day.getMonth() + 1; // Months start at 0!
    let dd = day.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const today = dd + '/' + mm + '/' + yyyy;
    await this.type(this.elements.exceptionDatePicker, today);
    await this.click(`${this.elements.exceptionDatePicker}~span`);
  }

  /**
   * function to click exception button
   * @returns {void} nothing
   */
  async addExceptionButton() {
    await this.waitForSelector(this.elements.addExceptionButton);
    await this.click(this.elements.addExceptionButton);
  }

  /**
   * function to click setting tab in webChat Manager
   * @returns {void} nothing
   */
  async clickSettingsTab() {
    await this.waitForSelector(this.elements.settingsTab);
    await this.click(this.elements.settingsTab);
  }

  /**
   * function to add the properties in webChat Manager
   * @param {object} properties - different properties in webchat channel settings
   * @param {string} properties.ticketIntegration - ticket integration with webchat
   * @param {string} properties.chatOffline - chat offline property for plugin
   * @param {string} properties.ticketQueue - ticket queue
   * @returns {void} nothing
   */
  async addProperties(properties) {
    if (properties.ticketIntegration) {
      await this.checkToCheckbox(this.elements.ticketIntegrationProperty);
    }
    if (properties.chatOffline) {
      await this.checkToCheckbox(this.elements.ticketOfflineProperty);
    }
    if (properties.ticketQueue) {
      await this.waitForSelector(this.elements.ticketQueueID);
      await this.click(this.elements.ticketQueueID);
      await this.type(this.elements.newAgentSelectName, properties.ticketQueue);
      await this.pressKey('Enter');
    }
  }

  /**
   * function to reset the properties
   * @returns {void} nothing
   */
  async resetProperties() {
    await this.waitForSelector(this.elements.ticketIntegrationProperty);
    await this.uncheckToCheckbox(this.elements.ticketIntegrationProperty);
  }

  /**
   * function to click the queue tab
   * @returns {void} nothing
   */
  async clickQueuesTab() {
    await this.click(this.elements.queuesTab);
  }

  /**
   * function to edit the queues
   * @returns {void} nothing
   */
  async editQueues() {
    await this.click(this.elements.editQueues);
  }

  /**
   * function to click Action Button in webchat ticket
   * @param {string} action - type of action
   * @returns {void} nothing
   */
  async clickWebChatActionButton(action) {
    if (action === 'spam') {
      await this.waitForSelector(this.elements.webchatActionButton);
      await this.click(this.elements.webchatActionButton);
      if (!(await this.isVisible(`[data-action="${action}"]`))) {
        await this.forceClick(this.elements.webchatActionButton);
      }
      await this.waitForSelector(`[data-action="${action}"]`);
      await this.click(`[data-action="${action}"]`);
      await this.waitForSelector(this.elements.spamYes);
      await this.forceClick(this.elements.spamYes);
    } else {
      await this.clickLastElement(this.elements.webchatActionButton);
      await this.clickLastElement(`[data-action="${action}"]`);
    }
  }

  /**
   * function to click the search tab in webcht channel
   * @returns {void} nothing
   */
  async clickSearchTab() {
    await this.click(this.elements.searchTab);
  }

  /**
   * function to search the data in webchat channel
   * @param {object} searchdata - search data for web chat
   * @param {string} searchdata.status - status of webchat
   * @param {string} searchdata.email - emailid
   * @param {string} searchdata.chatId - chat id of webchat
   * @param {string} searchdata.startDate - start date
   * @param {string} searchdata.endDate - end date
   * @returns {void} nothing
   */
  async searchWebChat(searchdata) {
    const day = new Date();
    const yyyy = day.getFullYear();
    let mm = day.getMonth() + 1; // Months start at 0!
    let dd = day.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const today = dd + '-' + mm + '-' + yyyy;
    // search by status
    if (searchdata.status) {
      await this.type(this.elements.searchTabStatus, searchdata.status);
      await this.pressKey('Enter');
    }
    // search by email
    if (searchdata.email) {
      await this.type(this.elements.searchTabEmail, searchdata.email);
    }
    // search by chatId
    if (searchdata.chatId) {
      await this.type(this.elements.searchTabChatID, searchdata.chatId);
    }
    // search by startdate
    if (searchdata.startDate) {
      await this.type(this.elements.searchTabStartDate, searchdata.startDate);
    } else {
      await this.type(this.elements.searchTabStartDate, today);
    }
    // search by endDate
    if (searchdata.endDate) {
      await this.type(this.elements.searchTabEndDate, searchdata.endDate);
    } else {
      await this.type(this.elements.searchTabEndDate, today);
    }
    await this.click(this.elements.submitSearch);
  }

  /**
   * function to validate the chat results
   * @param {object} searchdata - search data for web chat
   * @param {string} searchdata.status - status of webchat
   * @param {string} searchdata.email - emailid
   * @param {string} searchdata.chatId - chat id of webchat
   * @param {string} searchdata.chatIde - chat id of conversation
   * @param {string} searchdata.from - from email id
   * @param {string} searchdata.select - select message
   * @param {string} searchdata.clientMessage - client message
   * @returns {void} nothing
   */
  async verifyChatResultInSearchTab(searchdata) {
    if (searchdata.clientMessage) {
      await this.type(this.elements.inputSearch, searchdata.clientMessage);
      await this.pressKey('Enter');
      if (!await this.isVisible(`${this.elements.searchResultTable}>tbody>tr>td:nth-child(5)`) && searchdata.chatIde) {
        await this.clearField(this.elements.inputSearch);
        await this.type(this.elements.inputSearch, searchdata.chatIde);
      }
      await this.pressKey('Enter');
    }

    if (searchdata.status) {
      await this.containSubstring(
        searchdata.status,
        await this.getText(
          `${this.elements.searchResultTable}>tbody>tr>td:nth-child(5)`
        )
      );
    }
    if (searchdata.email) {
      await this.containSubstring(
        searchdata.email,
        await this.getText(
          `${this.elements.searchResultTable}>tbody>tr>td:nth-child(7)`
        )
      );
    }
    if (searchdata.chatId) {
      await this.containSubstring(
        searchdata.chatId,
        await this.getText(
          `${this.elements.searchResultTable}>tbody>tr>td:nth-child(3)`
        )
      );
    }
    if (searchdata.from) {
      await this.containSubstring(
        searchdata.from,
        await this.getText(
          `${this.elements.searchResultTable}>tbody>tr>td:nth-child(6)`
        )
      );
    }
    if (searchdata.select === 'true') {
      await this.waitForSelector(this.elements.searchedRow);
      await this.click(this.elements.searchedRow);
      await this.waitForSelector(this.elements.searchRowModal);
    }
  }

  /**
   * function to validate the out of schedule webchat message
   * @param {string} message - message in popup
   * @returns {void} nothing
   */
  async verifyWebChatOutOfSchedule(message) {
    await frames.locator(this.elements.ticketId).isVisible({ timeout: 3000 });
    const textString = await frames.locator(this.elements.ticketId).innerText();
    await this.containSubstring(message, textString);
  }

  /**
   * function to get the ticketID
   * @returns {void} nothing
   */
  async getTicketId() {
    await frames.locator(this.elements.ticketId).isVisible({ timeout: 3000 });
    const textString = await frames.locator(this.elements.ticketId).innerText();
    return textString;
  }

  /**
   * function to add the template in webchat Manager
   * @param {object} tempData - add template data
   * @param {string} tempData.template - template name
   * @param {string} tempData.message - message string
   * @param {string} tempData.option - template options
   * @param {string} tempData.option1 - template options
   * @param {string} tempData.option2 - template options
   * @returns {void} nothing
   */
  async addTemplate(tempData) {
    await this.click(this.elements.addTemplate);
    await this.waitForSelector(this.elements.templateName);
    await this.type(this.elements.templateName, tempData.template);
    await this.type(this.elements.templateMessage, tempData.message);
    await this.click(this.elements.selectType);
    await this.selectOptionByValue(this.elements.selectType, tempData.option);
    await this.waitForSelector(this.elements.addOption);
    await this.click(this.elements.addOption);
    await this.type(this.elements.inputOption, tempData.option1);
    await this.waitForSelector(this.elements.addOption);
    await this.click(this.elements.addOption);
    await this.type(this.elements.inputOption2, tempData.option2);
    await this.click(this.elements.saveTemplate);
  }

  /**
   * function to add the template in webchat Channel
   * @param {string} template - name of template
   * @returns {void} nothing
   */
  async addTemplateInChannel(template) {
    await this.waitForSelector(this.elements.templateSelect2);
    await this.click(this.elements.templateSelect2);
    await this.type(this.elements.templateSelect2Input, template);
    await this.pressKey('Enter');
    await this.waitForSelector(this.elements.channelSubmit);
    await this.click(this.elements.channelSubmit);
    if (!(await this.isVisible(this.elements.topSuccessMessage))) {
      await this.click(this.elements.channelSubmit);
    }
  }

  /**
   * function to reply with the template to customer
   * @param {string} template - name of template
   * @returns {void} nothing
   */
  async replyWithTemplate(template) {
    await this.waitForSelector(this.elements.webchatReplybutton);
    await this.click(this.elements.webchatReplybutton);
    await this.waitForSelector(this.elements.webchatAgentJoined);
    await this.switchTab('newTab');
    await frames.isVisible(this.elements.webchatAgentJoined);
    await this.switchTab();
    await this.click(this.elements.webchatReplyBox);
    await this.type(this.elements.webchatReplyBox, '#' + template);
    await this.waitForSelector(this.elements.activeTemplate);
    await this.click(this.elements.activeTemplate);
    await this.click(this.elements.webchatReplySendButton);
  }

  /**
   * function to validate the answer template
   * @param {string} answer - answer
   * @returns {void} nothing
   */
  async verifyAnswerTemplate(answer) {
    await this.switchTab();
    await this.waitForSelector(this.elements.verifyReply);
    await this.containSubstring(
      answer,
      await this.getText(this.elements.verifyReply)
    );
  }

  /**
   * function to reset the exception ny delete
   * @returns {void} nothing
   */
  async deleteException() {
    await this.waitForSelector(this.elements.deleteException, 8000);
    await this.click(this.elements.deleteException);
  }

  /**
   * function to reset calendar schedule
   * @returns {void} nothing
   */
  async resetCalendarSchedule() {
    const d = new Date();
    let day = d.getDay();
    let visibility;
    if (day === 0) day = 7;
    const selector = `${this.elements.calendarDaySlider}(${day})`;
    let hour = d.getHours();
    if (hour < 12) {
      visibility = await this.getAttributeElement(`${selector}>div>span>span:nth-child(1)>span:nth-child(2)`, 'style');
      if (visibility !== 'visibility: hidden;') {
        await this.slider(
          `${selector}>div>span>span:nth-child(6)`,
          `${selector}>div>span>span:nth-child(1)>span:nth-child(2)`,
          'reset'
        );
      }
    } else {
      visibility = await this.getAttributeElement(`${selector}>div>span>span:nth-child(1)>span:nth-child(3)`, 'style');
      if (visibility !== 'visibility: hidden;') {
        await this.slider(
          `${selector}>div>span>span:nth-child(7)`,
          `${selector}>div>span>span:nth-child(1)>span:nth-child(3)`,
          'reset'
        );
      }
    }
  }

  /**
   * function to validate the template at client side
   * @param {string} message - text string
   * @returns {void} nothing
   */
  async validateTemplateAtClient(message) {
    await this.switchTab('newTab');
    await frames
      .locator(this.elements.clientTemplateVerify)
      .isVisible({ timeout: 3000 });
    await this.containSubstring(
      await frames.locator(this.elements.clientTemplateVerify).innerText(),
      message
    );
  }

  /**
   * function to validate the answer template
   * @param {string} answer - answer string
   * @returns {void} nothing
   */
  async answerTemplate(answer) {
    let locator = `input[value="${answer}"]`;
    await frames.locator(locator).isVisible({ timeout: 3000 });
    await frames.locator(locator).click({ force: true });
  }

  /**
   * function to select the option from the template
   * @param {string} answer - answer string
   * @returns {void} nothing
   */
  async selectOptionTemplate(answer) {
    await frames.click(this.elements.selectClientReply);
    await frames.selectOption(this.elements.selectClientReply, answer);
  }

  /**
   * function to validate the ticket id in webchat conversation
   * @param {string} ticketId - ticketid displayed
   * @returns {string} - ticket id
   */
  async verifyTicketIdInWebChatConversation(ticketId) {
    await this.clickLastElement('text="Webchat tickets"');
    await this.containSubstring(
      await this.getTexts(this.elements.ticketIdFromWebchat),
      ticketId
    );
  }

  /**
   * function to select the previous conversation
   * @returns {void} nothing
   */
  async clickOnPreviousConversation() {
    await this.click(this.elements.previousConversationTab);
    await this.waitForSelector(this.elements.prevConversationTable);
  }

  /**
   * function to validate the previous conversation
   * @param {string} hashString - random string
   * @returns {void} nothing
   */
  async verifyPreviousConversation(hashString) {
    let lastConversation = `//div[@id="webchat-opened-conversations"]//td[contains(text(),"${hashString}")]`;
    await this.waitForSelector(lastConversation);
    await this.click(lastConversation);
    await this.waitForSelector(this.elements.prevConversationDetails);
  }

  /**
   * function to validate the preview conversation
   * @param {string} hashString - random string
   * @param {string} hashStringReply - random reply string
   * @returns {void} nothing
   */
  async previewConversation(hashString, hashStringReply) {
    await this.waitForSelector(this.elements.prevConversationDetails);
    await this.containSubstring(
      await this.getTexts(this.elements.prevConversationDetails),
      hashString
    );
    await this.containSubstring(
      await this.getTexts(this.elements.prevConversationDetailsReply),
      hashStringReply
    );
  }

  /**
   * function to search queue
   * @param {string} queue - name of queue
   * @returns {void} nothing
   */
  async searchQueue(queue) {
    await this.click(this.elements.queueTab);
    await this.type(this.elements.queueFilter, queue);
    await this.pressKey('Enter');
  }

  /**
   * function to edit queue
   * @param {string} queue - name of queue
   * @returns {void} nothing
   */
  async editQueue(queue) {
    await this.waitForSelector(this.elements.queueTd);
    await this.containSubstring(
      await this.getTexts(this.elements.queueTd),
      queue
    );
    await this.click(this.elements.queueFilterEdit);
    await this.waitForSelector(this.elements.queueWidgetForm);
    let path = 'Path' + new Date().getTime();
    await this.type(this.elements.queuePathInput, path);
  }

  /**
   * function to add a new agent
   * @param {string} agent - agent name
   * @returns {void} nothing
   */
  async addNewAgent(agent) {
    let locator = `//li[contains(., "${agent}")][1]`;
    const isExist = await this.isElementExist(locator);
    if (isExist.length === 0) {
      await this.click(this.elements.addAgentInput);
      await this.type(this.elements.addAgentInput, agent);
      await this.pressKey('Enter');
    }
    await this.click(this.elements.editAgent);
  }

  /**
   * function to transfer the conversation to new agent
   * @param {string} agent - agent name
   * @returns {void} nothing
   */
  async transferConversationToNewAgent(agent) {
    await this.click(this.elements.transferConversation);
    await this.waitForSelector(this.elements.modalTransfer);
    await this.waitForSelector(this.elements.newAgentDropdown);
    await this.click(this.elements.newAgentDropdown);
    await this.type(this.elements.newAgentSelectName, agent);
    await this.pressKey('Enter');
    await this.click(this.elements.transferConfirm);
  }

  /**
   * function to validate the transfered conversation
   * @param {string} agent - agent name
   * @returns {void} nothing
   */
  async validateTransferConversation(agent) {
    const agentActiveRow = `//div[@id="webchat-inbox-table-ctn"]//table//tr//td//span[contains(text(),"${agent}")]`;
    await this.waitForSelector(agentActiveRow);
  }

  /**
   * function to notify the customer about Agent Change
   * @param {string} agent - agent name
   * @returns {void} nothing
   */
  async customerNotifyAgentChange(agent) {
    await this.switchTab('newTab');
    await frames
      .locator(this.elements.webchatReceivedMessage)
      .isVisible({ timeout: 3000 });
    await this.containSubstring(
      await frames.locator(this.elements.webchatReceivedMessage).innerText(),
      agent
    );
  }

  /**
   * function to add the queue
   * @param {object} queueData - add queues data
   * @param {string} queueData.queue - queue name
   * @param {string} queueData.path - path
   * @param {string} queueData.agent - agent name
   * @returns {void} nothing
   */
  async createQueue(queueData) {
    await this.waitForSelector(this.elements.addQueue);
    await this.click(this.elements.addQueue);
    await this.type(this.elements.queueNameInput, queueData.queueName);
    if (queueData.path) {
      await this.type(this.elements.queuePathInput, queueData.pathName);
    }
    if (queueData.agent) {
      await this.click(this.elements.addAgentInput);
      await this.type(this.elements.addAgentInput, queueData.agent);
      await this.pressKey('Enter');
    }
    await this.click(this.elements.saveAgent);
  }

  /**
   * function to validate that conversation transfered to new queue
   * @param {string} queue - queue name
   * @returns {void} nothing
   */
  async transferConversationToNewQueue(queue) {
    await this.click(this.elements.transferConversation);
    await this.waitForSelector(this.elements.modalTransfer);
    await this.click(this.elements.newQueueDropdown);
    await this.type(this.elements.newQueueInput, queue);
    await this.pressKey('Enter');
    await this.click(this.elements.transferConfirm);
    await this.waitForSelector(this.elements.webchatWorkspace);
  }

  /**
   * function to validate the transfered conversation
   * @param {string} queue - queue name
   * @param {string} channel - channel name
   * @param {string} hashString - random string
   * @returns {void} nothing
   */
  async validateTransferConversationQueue(queue, channel, hashString) {
    await this.click(this.elements.webchatFilter);
    const channelLocator = `//div[@id="webchat-inbox-options"]//div[normalize-space(text())="${channel}"]`;
    await this.waitForSelector(channelLocator);
    const queueLocator = `//div[@class="popover-content" and contains(., "${channel}")]//following-sibling::div[@class="checkbox" and contains(., "${queue}")]`;
    await this.waitForSelector(queueLocator);
    const queueLocatorCheckbox = `//div[@class="popover-content" and contains(., "${channel}")]//following-sibling::div[@class="checkbox" and contains(., "${queue}")]//span`;
    await this.waitForSelector(queueLocatorCheckbox);
    if (!(await this.isChecked(queueLocatorCheckbox))) {
      await this.click(queueLocatorCheckbox);
    }
    await this.click(this.elements.webchatSaveBtn);
    const queueAssignedValidator = `//td[contains(., "${queue}")]/following-sibling::td[contains(., "${hashString}")]`;
    await this.waitForSelector(queueAssignedValidator);
  }

  /**
   * function to open ad new browser session
   * @returns {void} nothing
   */
  async openNewBrowserSession() {
    let userContext = await browser.newContext({ viewport: null, launchOptions: { args: ['--start-maximized'] } });
    if (global.headlessValue === true) {
      userContext = await global.browser.newContext({
        viewport: { width: 1920, height: 1080 },
        launchOptions: { args: ['--start-maximized'] }
      });
    }
    global.userPage = await userContext.newPage();
    await userPage.goto(global.BASE_URL);
  }

  /**
   * function to upload a css File
   * @param {string} cssFile - file path
   * @returns {void} nothing
   */
  async uploadCssFile(cssFile) {
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator(this.elements.uploadCssFileButton).click(),
    ]);
    await fileChooser.setFiles(cssFile);
    await this.click(this.elements.channelSubmit);
  }

  /**
   * function to validate ChatId from plugin
   * @param {string} chatId - chatid of user
   * @returns {void} nothing
   */
  async verifyChatIdFromPlugin(chatId) {
    await this.waitForSelector(
      `//div[@id='webchat-inbox-table-ctn']//tbody//td[contains(text(),'${chatId}')]`
    );
    const currentChatID = await this.getText(
      `//div[@id='webchat-inbox-table-ctn']//tbody//td[contains(text(),'${chatId}')]`
    );
    await this.containSubstring(currentChatID, chatId);
  }
  /**
   * function to assign group to agent
   * @param {string} group - searched group
   * @returns {void} nothing
   */
  async searchGroup(group) {
    await this.waitForSelector(this.elements.groupFilterList);
    await this.type(this.elements.groupFilterList, group);
    await this.wait(2); //wait for the row to be displayed
    await this.click(this.elements.selectUser);
  }

  /**
   * function to assign group
   * @param {object} agentData - name of the agents
   * @param {string} agent - adding agent
   * @returns {void} nothing
   */
  async assignAgent(agentData) {
    if (agentData.agent) {
      if(!(await this.isVisible(this.elements.filterAgents))) {
        await homepageObj.reloadPage();
        await Break.selectGroup('Group_1');
      }
      await this.clearField(this.elements.filterAgents);
      const multipleAgents = agentData.agent.split(',');
      for (let i = 0; i < multipleAgents.length; i++) {
        await this.type(
          this.elements.filterAgents,
          multipleAgents[i]
        );
        await this.pressKey('Enter');
        const agentAssigned = await this.isVisible(this.elements.agentAdded);
        if (agentAssigned === false) {
          await this.click(this.elements.addUser);
          await this.waitForSelector(this.elements.addingAgent);
          await this.type(this.elements.addingAgent, agentData.agent);
          await this.click(this.elements.addUserCheckbox);
          await this.waitForSelector(this.elements.addToGroup);
          await this.click(this.elements.addToGroup);
        }
      }
    }
  }

  /**
   * function to set profile to the agent
   * @returns {void} nothing
   */
  async setProfile() {
    // waiting for elements to load
    await this.wait(2);
    await this.waitForSelector(this.elements.activeUserCheckBox);
    if (!(await this.isChecked(this.elements.activeUserCheckBox))) {
      await this.waitForSelector(this.elements.activeUserCheckBox);
      await this.click(this.elements.activeUserCheckBox);
      await this.waitForSelector(this.elements.saveAgentAccess);
      await this.click(this.elements.saveAgentAccess);
    }
  }

  /**
   * function to remove and assign queue
   * @param {string} queueName - queue to add
   * @returns {void} nothing
   */
  async assignQueue(queueName) {
    await this.isVisible(this.elements.validateManageAssignment);
    await this.click(this.elements.webchatQueue);
    await this.wait(2); // quick load
    if (await this.isVisible(this.elements.removeQueueExist)) {
      const totalAssignedQueue = await this.countElement(this.elements.removeQueue);
      for (let i = 0; i < totalAssignedQueue + 1; i++) {
        await this.pressKey('Backspace');
      }
    }
    await this.type(this.elements.webchatQueue, queueName);
    await this.pressKey('Enter');
    await this.waitForSelector(this.elements.assignButton);
    await this.click(this.elements.assignButton);
  }

  /**
   * function to validate channel
   * @param {object} queueDetails - channel details
   * @param {string} queueDetails.channel - channel name
   * @param {string} queueDetails.queue - queue name
   * @returns {void} nothing
   */
  async validateChannel(queueDetails) {
    await this.waitForSelector(this.elements.webchatChannelButton);
    await this.click(this.elements.webchatChannelButton);
    if (queueDetails.channel) {
      await this.isVisible(`//div[contains(text(),"${queueDetails.channel}")]`);
    }
    if (queueDetails.queue) {
      const multipleQueues = queueDetails.queue.split(',');
      for (let i = 0; i < multipleQueues.length; i++) {
        await this.isVisible(
          `//span[contains(text(),"${queueDetails.queue[i]}")]`
        );
      }
    }
  }

  /**
   * function to delete assigned queue
   * @param {string} queueName - name of the queue
   * @returns {void} nothing
   */
  async deleteAssignedQueue(queueName) {
    if (queueName === 'all') {
      if (await this.isVisible(this.elements.removeQueueExist)) {
        const totalAssignedQueue = await this.countElement(this.elements.removeQueue);
        for (var i = 0; i < totalAssignedQueue; i++) {
          await this.waitForSelector(this.elements.removeQueueExist);
          await this.click(this.elements.removeQueueExist);
        }
      }
    }
    else {
      let queueLocator = `//div[@id='s2id_webchat_queues']//li//div[contains(text(),'${queueName}')]/following-sibling::a[@class='select2-search-choice-close']`;
      await this.waitForSelector(queueLocator);
      await this.click(queueLocator);
    }
    await this.waitForSelector(this.elements.assignButton);
    await this.click(this.elements.assignButton);
  }

  /**
   * function to delete queue
   * @param {string} queueName - name of the queue
   * @returns {void} nothing
   */
  async deleteQueue(queueName) {
    await this.clickQueuesTab();
    await this.searchQueue(queueName);
    await this.waitForSelector(this.elements.deleteQueue);
    await this.click(this.elements.deleteQueue);
  }

  /**
   * function to verify webchat channel & queue visiblity
   * @param  {string} channel -  channel name
   * @param  {string} queue -  queue name
   * @returns {void} nothing
   */
  async validateChannelQueueVisibility(channel, queue) {
    if (await this.isVisible(this.elements.webchatChannelButton)) {
      await this.click(this.elements.webchatChannelButton);
      if (await this.isVisible(`//div[contains(text(),"${channel}")]`)) {
        await this.verifyVisibility(`//span[contains(text(),"${queue}")]`, false);
      }
    }
  }

  /**
   * function to goto webchat Tab
   * @param  {string} type -  page type
   * @returns {void} nothing
   */
  async returnOnWebchatTab(type = '') {
    let check = await this.isVisible(this.elements.returnButton, type);
    if (check) {
      await this.click(this.elements.returnButton, type);
    }
  }

  /**
   * function to validate assigned queue
   * @param {string} queueName - queue to validate
   * @returns {void} nothing
   */
  async validateQueue(queueName) {
    await this.isVisible(this.elements.validateManageAssignment);
    await this.isVisible(`//div[@id='s2id_webchat_queues']//li//div[contains(text(),'${queueName}')]`);
  }

  /**
   * function to select Automatic chat delivery
   * @returns {void} nothing
   */
  async selectAutomaticChatDelivery() {
    await this.waitForSelector(this.elements.automaticChatDeliveryOption);
    let checked = await this.isChecked(this.elements.automaticChatDeliveryOption);
    if (!checked) {
      await this.click(this.elements.automaticChatDeliveryOption);
    }
  }

  /**
   * function to type Max concurrent chats
   * @param {string} chatCount - Max concurrent chats
   * @returns {void} nothing
   */
  async maxChatCount(chatCount) {
    await this.waitForSelector(this.elements.maxConcurrentChat);
    await this.type(this.elements.maxConcurrentChat, chatCount);
    await this.click(this.elements.submitButton);
  }

  /**
   * function to validate Static Information
   * @param {string} message - Static Information 
   * @param {string} type -  page type
   * @returns {void} nothing
   */
  async validateStaticInfo(message, type = '') {
    await this.waitForSelector(this.elements.messageInfo, type);
    await this.isVisible(this.elements.messageInfo, message, type);
  }

  /**
   * function to Approve Break Request
   * @returns {void} nothing
   */
  async approveBreakRequest() {
    await this.waitForSelector(this.elements.authorizeButton);
    await this.click(this.elements.authorizeButton);
  }

  /**
   * function to Close number of conversations
   * @param {string} status - Close Comment Status 
   * @param {string} convo -  No. of conversation close
   * @param {string} type -  page type
   * @returns {void} nothing
   */
  async closeAllConversation(status, convo, type = '') {
    for (let i = 0; i < convo; i++) {
      await this.wait(5); //wait for latest plugin message to appear
      await this.click(this.elements.firstMessage, type);
      let eleClass = await this.getAttributeElement(
        this.elements.closeConversationButton,
        'class', type
      );
      if (eleClass.includes('disabled')) {
        await this.click(this.elements.webchatReplyAgent, type);
        await this.type(this.elements.webchatReplyAgent, 'Test Message', type);
        await this.click(this.elements.webchatReplySend, type);
      }
      await this.click(this.elements.closeConversationButton, type);
      await this.click(this.elements.webchatSubject, type);
      await this.click(this.elements.webchatSubjectSelect, type);
      await this.click(this.elements.webchatCloseComment, type);
      await this.type(this.elements.webchatCloseComment, status, type);
      await this.click(this.elements.webchatConversationButton, type);
      //wait for conversation to close and status to update
      await this.wait(2);
    }
  }

  /**
     * function to verify error message
     * @param {string} message - message
     * @returns {void} nothing
     */
  async verifyErrorMessage(message) {
    await this.waitForSelector(this.elements.successMessage);
    await this.shouldContainText(this.elements.successMessage, message);
  }

  /**
   * function to verify action
   * @param {string} action - action name
   * @returns {void} nothing
   */
  async verifyAction(action) {
    await this.waitForSelector(this.elements.webchatAction);
    await this.shouldContainText(this.elements.webchatAction, action);
  }

  /**
   * function to logout of webchat
   * @param {string} type - session
   * @returns {void} nothing
   */
  async webchatLogout(type = '') {
    await this.waitForSelector(this.elements.webchatLogout, type);
    await this.click(this.elements.webchatLogout, type);
  }

  /**
   * Function to check if user logged out of webchat channel
   * @param {string} role - agent role
   * @param {string} type - page type
   * @return {void} Nothing
   */
  async verifyLogout(role, type = '') {
    try {
      await this.waitForSelector(this.elements.profileUserName, type);
    } catch (error) {
      console.log(error);
      await this.waitForSelector(this.elements.webchatLogout, type);
      await this.click(this.elements.webchatLogout, type);
    }
    let text = await this.getText(this.elements.profileUserName, type);
    assert.isTrue(role.includes(text));
  }

  /**
   * Function to assign Agent t Group
   * @param {string} group - group name
   * @return {void} Nothing
   */
  async assignGroupToAgent(group) {
    await this.waitForSelector(this.elements.groupSelect);
    await this.click(this.elements.groupSelect);
    await this.waitForSelector(this.elements.newQueueInput);
    await this.type(this.elements.newQueueInput, group);
    await this.pressKey('Enter');
    await this.click(this.elements.saveChange);
  }

  /**
   * Function to click on choose channel button
   * @return {void} Nothing
   */
  async clickOnChooseChannel() {
    await this.waitForSelector(this.elements.chooseChannelButton);
    await this.click(this.elements.chooseChannelButton);
  }

  /**
   * Function to select channel 
   * @param {string} channelType - type of channel
   * @return {void} Nothing
   */
  async selectChannel(channelType) {
    let locator = `//label[contains(.,"${channelType}")]/i`;
    await this.waitForSelector(locator);
    await this.checkToCheckbox(locator);
    await this.waitForSelector(this.elements.saveChannel);
    await this.click(this.elements.saveChannel);
  }

  /**
   * Function to validate webchat indicators
   * @param {object} chatsDetails - chat details object
   * @param {string} chatsDetails.totalChats - total chats
   * @param {string} chatsDetails.activeChats - active chats
   * @param {string} chatsDetails.solvedChats - solved chats
   * @param {string} chatsDetails.waitingChats - waiting chats
   * @param {string} chatsDetails.abandonedChats - abandoned chats
   * @return {void} Nothing
   */
  async validateIndicators(chatsDetails) {
    await this.wait(2); //added wait to load the indicators
    if (chatsDetails.totalChats) {
      await this.waitForSelector(this.elements.totalChat);
      let actualTotalChatCount = await this.getText(this.elements.totalChat);
      let expectedTotalChatCount = parseInt(global.totalChatCount) + parseInt(chatsDetails.totalChats);
      assert.equal(actualTotalChatCount, expectedTotalChatCount);
    }
    if (chatsDetails.activeChats) {
      await this.waitForSelector(this.elements.activeChat);
      let actualActiveChatCount = await this.getText(this.elements.activeChat);
      let expectedActiveChatCount = parseInt(global.activeChatCount) + parseInt(chatsDetails.activeChats);
      assert.equal(actualActiveChatCount, expectedActiveChatCount);
    }
    if (chatsDetails.solvedChats) {
      await this.waitForSelector(this.elements.solvedChat);
      let actualSolvedChatCount = await this.getText(this.elements.solvedChat);
      let expectedSolvedChatCount = parseInt(global.solvedChatCount) + parseInt(chatsDetails.solvedChats);
      assert.equal(actualSolvedChatCount, expectedSolvedChatCount);
    }
    if (chatsDetails.waitingChats) {
      await this.waitForSelector(this.elements.waitingChat);
      let actualWaitingChatCount = await this.getText(this.elements.waitingChat);
      let expectedWaitingChatCount = parseInt(global.waitingChatCount) + parseInt(chatsDetails.waitingChats);
      assert.equal(actualWaitingChatCount, expectedWaitingChatCount);
    }
    if (chatsDetails.abandonedChats) {
      await this.waitForSelector(this.elements.abandonedChat);
      let actualAbandonedChatCount = await this.getText(this.elements.abandonedChat);
      let expectedAbandonedChatCount = parseInt(global.abandonedChatCount) + parseInt(chatsDetails.abandonedChats);
      assert.equal(actualAbandonedChatCount, expectedAbandonedChatCount);
    }
  }

  /**
 * function to validate the average first time reply
 * @param {number} chatRecievedTime - time when message received
 * @param {number} chatRepliedTime - time when reply the message
 * @param {number} chatCloseTime - time when close the conversation
 * @return {void} Nothing
 */
  async validateAverageFirstReplyTime(chatStatus, chatRecievedTime, chatRepliedTime, chatCloseTime) {
    const actualAverageReplyTime = await this.getText(this.elements.averageReplyTime);
    const actualAverageCloseTime = await this.getText(this.elements.averageCloseTime);
    await this.waitForSelector(this.elements.averageReplyTime);
    const dateOfReply = new Date(chatRepliedTime);
    const dateOfRecieve = new Date(chatRecievedTime);
    const dateOfClose = new Date(chatCloseTime);
    var options = {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const formattedChatReceivedTime = dateOfRecieve.toLocaleString('en-IN', options);
    const formattedChatRepliedTime = dateOfReply.toLocaleString('en-IN', options);
    const formattedChatCloseTime = dateOfClose.toLocaleString('en-IN', options);
    const repliedTime = new Date(`2000-01-01T${formattedChatRepliedTime}`);
    const receivedTime = new Date(`2000-01-01T${formattedChatReceivedTime}`);
    const closeTime = new Date(`2000-01-01T${formattedChatCloseTime}`);
    let addedSeconds = -1;

    if(chatStatus === 'reply'){
    // Calculate the formatted average time by adding seconds and comparing it to the target average time. Up to 10 seconds to be added to the average time to maintain buffer between validation.
      for (let i = 0; i < 10; i++) {
        const averageTime = repliedTime - receivedTime + (addedSeconds * 1000);
        const hours = Math.floor(averageTime / (1000 * 60 * 60));
        const minutes = Math.floor((averageTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((averageTime % (1000 * 60)) / 1000);
        const expectedAverageTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        try {
          assert.strictEqual(actualAverageReplyTime, expectedAverageTime);
          break;
        } catch (err) {
          if (i === 9) {
            throw err;
          }
        }
        addedSeconds++;
      }
    }

    if (chatStatus === 'close') {
      for (let i = 0; i < 10; i++) {
        const averageTime = closeTime - receivedTime + (addedSeconds * 1000);
        const hours = Math.floor(averageTime / (1000 * 60 * 60));
        const minutes = Math.floor((averageTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((averageTime % (1000 * 60)) / 1000);
        const expectedAverageTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        try {
          assert.strictEqual(actualAverageCloseTime, expectedAverageTime);
          break;
        } catch (err) {
          if (i === 9) {
            throw err;
          }
        }
        addedSeconds++;
      }
    }
  }

  /**
   * function to validate webchat message status
   * @param {string} conversationStatus - webchat conversation status
   * @param {int} convo - webchat conversation
   * @param {string} userContact - user contact name
   * @return {void} Nothing
   */
  async actionOnConversation(conversationStatus, convo, userContact) {
    if (conversationStatus === 'reply') {
      let locator = `//div[@id="webchat-inbox-table-ctn"]//tbody//td[contains(.,"${userContact}")]`;
      await this.click(locator);
      let replyButton = `(//button[@data-action="join"])[${convo-1}]`;
      console.log('reply button=========', replyButton)
      await this.click(replyButton);
      let replyBox = `(//div[@class="message-area message-autocomplete editable form-control ui-autocomplete-input"])[${convo-1}]`;
      await this.click(replyBox);
      await this.type(replyBox, 'Test Reply');
      let sendButton = `(//span[@id="send-message"])[${convo-1}]`;
      await this.click(sendButton);
    }
    if (conversationStatus === 'close') {
      let closeButton = `(//button[@data-action="leave"])[${convo-1}]`;
      if (await this.isVisible(closeButton)) {
        await this.click(closeButton);
      }
      else {
        let locator = `//div[@id="webchat-inbox-table-ctn"]//tbody//td[contains(.,"${userContact}")]`;
        await this.click(locator);
        await this.waitForSelector(locator);
        await this.click(this.elements.webchatClosebtn);
      }
      await this.waitForSelector(this.elements.webchatSubject);
      await this.click(this.elements.webchatSubject);
      await this.type(this.elements.newAgentSelectName, 'WebchatChild_1');
      await this.click(this.elements.webchatSubjectSelect);
      await this.click(this.elements.webchatCloseComment);
      await this.type(this.elements.webchatCloseComment, 'Test Message');
      await this.click(this.elements.webchatConversationButton);
      await this.waitForSelector(this.elements.successMessage);
    }
    if (conversationStatus === 'spam') {
      let locator = `//div[@id="webchat-inbox-table-ctn"]//tbody//td[contains(.,"${userContact}")]`;
      await this.click(locator);
      let actionButton = `(//button[@class="btn btn-default btn-block dropdown-toggle"])[${convo-1}]`;
      await this.waitForSelector(actionButton);
      await this.click(actionButton);
      let spamButton = `(//li[@data-action="${conversationStatus}"])[${convo-1}]`;
      if (!(await this.isVisible(spamButton))) {
        await this.forceClick(actionButton);
      }
      await this.waitForSelector(spamButton);
      await this.click(spamButton);
      await this.waitForSelector(this.elements.spamYes);
      await this.forceClick(this.elements.spamYes);
    }
  }

  /**
   * function to back to the active webchat conversations
   * @return {void} Nothing
   */
  async backToActiveTab() {
    await this.waitForSelector(this.elements.returntoActiveChat);
    await this.forceClick(this.elements.returntoActiveChat);
  }

  /**
   * function to get the count of all indicators inside webchat tab
   * @return {void} Nothing
   */
  async indicatorsCount() {
    await this.waitForSelector(this.elements.totalChat);
    global.totalChatCount = await this.getText(this.elements.totalChat);
    global.activeChatCount = await this.getText(this.elements.activeChat);
    global.solvedChatCount = await this.getText(this.elements.solvedChat);
    global.waitingChatCount = await this.getText(this.elements.waitingChat);
    global.abandonedChatCount = await this.getText(this.elements.abandonedChat);
  }
};
