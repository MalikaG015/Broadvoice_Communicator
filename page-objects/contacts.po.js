const { BaseAction } = require("../setup/baseActions");
const { assert } = require("chai");

global.organizationContactsList = [];
global.personalContactsList = [];
global.allContactsList = [];
exports.Contacts = class Contacts extends BaseAction {
  constructor() {
    super();
  }

  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    contactsButton: '[data-testid="secondarySideBarMenu-buttonContacts"]',
    sourceFilter: '[class="ui fluid selection dropdown"]',
    contactType: (saveAs) =>
      `//span[contains(@class,"text") and contains(.,"${saveAs}")]`,
    searchInput: '[placeholder="Search"]',
    existedUser: (user) => `//div[@id="contactList"]//div[text()="${user}"]`,
    addNewContactButton:
      '[data-testid="secondarySideBarMenu-buttonSecondaryMenuHeader"]',
    newContactFormPage: '[class="sc-fLQRDB eyDQPU"]',
    saveContactAsButton: '[id="selectedSource"]',
    firstName: (value = "") => `//input[@id="firstName"][@value='${value}']`,
    lastName: (value = "") => `//input[@id="lastName"][@value='${value}']`,
    organisation: (value = "") =>
      `//input[@id="organization"][@value='${value}']`,
    role: (value = "") => `//input[@id="organizationRole"][@value='${value}']`,
    phoneType: '(//div[contains(@id,"phoneNumberType")])[last()]',
    selectType: (option, type) =>
      `(//div[contains(@id,"${type}Type")])[last()]//span[contains(@class,"text") and text()="${option}"]`,
    emailType: '(//div[contains(@id,"emailType")])[last()]',
    addContactButton: '[class="ui primary button"]',
    phoneNumber: (type, value = "") =>
      `//div[contains(@id,'phoneNumberType')]//div[@aria-live="polite"][contains(text(),'${type}')]//parent::div//preceding-sibling::div//input[contains(@value,'${value}')]`,
    email: (type, value = "") =>
      `//div[contains(@id,'emailType')]//div[@aria-live="polite"][contains(text(),'${type}')]//parent::div//preceding-sibling::div//input[contains(@value,'${value}')]`,
    editPanel: '//div[@id="addressBook-container"]',
    selectedType: (type, value) =>
      `//div[contains(@id,'${type}')]//div[@aria-live="polite"][contains(text(),'${value}')]`,
    buttonAction: (buttonText) =>
      `//div[@id="addressBook-container"]//span[text()='${buttonText}']`,
    popupMessage: (message) =>
      `//div[@id="remove-modal"]//div[@class="text-center"][contains(.,'${message}')]`,
    popupButton: (buttonText) =>
      `//div[@id="remove-modal"]//button[text()='${buttonText}']`,
    addedPhoneNumber: (index, value = "") =>
      `//input[@id="phoneNumber-${index}"][@value='${value}']`,
    phoneNumberPlusIcon: '//div[@id="phoneNumberType"]/following-sibling::img',
    phoneNumberInList: (number) =>
      `//div[@class="six wide column"]/a[text()='${number}']`,
    emailPlusIcon: '//div[@id="emailType"]/following-sibling::img',
    contactListItems: '(//div[@class="directory-user-info"]/div[1])',
    popup:(message)=>`//*[contains(text(),'${message}')]`,
    saveContactTo: `//div[@id='selectedSource']`,
    saveContactToOption: (option)=>`//span[contains(text(),'${option}')]`,
    contactFirstName:'#firstName',
    contactLastName: '#lastName',
    verifyContact: (user) =>`//div[@class="directory-user-info"]//div[@data-private="true" and contains(text(),'${user.firstName} ${user.lastName}')]`,
    selectContactName: (contact) => `//div[@class="row directory-items"]//div[@data-private="true" and contains(text(),'${contact}')]`,
    clickExpandIcon:'//div[@id="emailType"]/following-sibling::img[@src="/assets/add-new-b2064d82.svg"]',
    clickDropdownForEmailType:'#emailType-0',
    selectPersonalMail: (type) => `(//div[@class="item"]//span[@class="text" and text()='${type}'])[2]`,
    clickDropdownForEmail: '#email-0',
    clickContactSave: (savebtn)=> `//button[contains(text(),'${savebtn}')]`,
    checkContactUpdatedWithPersonalEmail: (text)=>`//a[@data-testid="contactsLinks-linkEmail1" and text()='${text}']`,
    emailField: `//input[@id='email']`,
    roleField: `//input[@id='organizationRole']`,
    firstNameField: `//input[@id='firstName']`,
    checkEmailField:(email)=>`//a[contains(@data-testid, 'contactsLinks-linkEmail0') and contains(text(), '${email}')]`,
    checkEmailPersonalField:(email)=>`//a[contains(@data-testid, 'contactsLinks-linkEmail1') and contains(text(), '${text}')]`,
    checkRoleField:(role)=>`//div[contains(@class, 'directory-user-info')]//div[contains(text(), '${role}')]`,
    checkFirstNameField:(firstName)=>`//div[contains(@class, 'directory-user-info')]//div[contains(text(), '${firstName}')][@data-private="true"]`
  };

  /**
   * function to check & create new contact if not exist
   * @param {Object} groupUserData - object containing user's data
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async searchAndverifyContactUser(
    groupUserData,
    userCreatedFlag,
    session = ""
  ) {
    //fetch user's full details
    let userInfo = await this.getContactInfo("username", groupUserData.user);
    groupUserData.userName = `${userInfo.firstName} ${userInfo.lastName}`;
    groupUserData.userFirstName = `${userInfo.firstName}`;
    groupUserData.userLastName = `${userInfo.lastName}`;
    groupUserData.userEmail = `${userInfo.username}`;
    groupUserData.organisation = `${userInfo.organisation}`;
    groupUserData.role = `${userInfo.role}`;
    await this.waitForSelector(this.elements.contactsButton, session);
    await this.click(this.elements.contactsButton, session);
    await this.waitForSelector(this.elements.sourceFilter, session);
    await this.click(this.elements.sourceFilter, session);
    await this.waitForSelector(
      this.elements.contactType(groupUserData.saveAs),
      session
    );
    await this.click(this.elements.contactType(groupUserData.saveAs), session);
    await this.wait(2); //using wait to load the filtered contacts
    if (groupUserData.filterBySource === "Yes") {
      let expectedList;
      //This if condition has been imposed so that this function does not proceed further after filtering contacts by source
      if (groupUserData.saveAs === "Display all") {
        expectedList = global.allContactsList;
      } else if (groupUserData.saveAs.includes("Personal")) {
        expectedList = global.personalContactsList;
      } else if (groupUserData.saveAs.includes("Organization")) {
        expectedList = global.organizationContactsList;
      }
      await this.verifyContactList(expectedList, groupUserData.saveAs, session);
    }
    //If search needed by phoneNumber else username is default
    let searchKeyword = groupUserData.userName;
    if (groupUserData.type && groupUserData.type !== "") {
      searchKeyword = userInfo[`${groupUserData.type}`];
    }
    await this.type(this.elements.searchInput, searchKeyword, session);
    await this.pressKey("Enter", session);
    await this.wait(2); //Wait for menu loading
    const existUser = await this.isVisible(
      this.elements.existedUser(groupUserData.userName),
      session
    );
    if (userCreatedFlag === "true") {
      //condition-1 when contact is already exist but need to verify details in list-search
      await this.waitForSelector(
        this.elements.existedUser(groupUserData.userName),
        session
      );
      if (
        groupUserData.type &&
        groupUserData.type !== "" &&
        groupUserData.type.includes("phoneNumber")
      ) {
        await this.waitForSelector(
          this.elements.phoneNumberInList(
            await this.formatPhoneNumber(userInfo[`${groupUserData.type}`])
          ),
          session
        );
        await this.shouldVisible(
          this.elements.phoneNumberInList(
            await this.formatPhoneNumber(userInfo[`${groupUserData.type}`])
          ),
          session
        );
      } else if (
        groupUserData.type &&
        groupUserData.type !== "" &&
        groupUserData.type.includes("organisation")
      ) {
        await this.verifyContactList(
          global.allContactsList,
          groupUserData.saveAs,
          session
        );
      }
      assert.isTrue(existUser);
    } else if (userCreatedFlag === "false") {
      //condition-2 when searched contact not exist after apply delete operation [no need to perform add contact]
      assert.isFalse(existUser);
    } else if (!existUser) {
      //condition-3: when searched contact not exist so need to create new contact
      await this.clickAddContactAndVerifyPage(session);
      await this.fillRequriedfields(groupUserData, userInfo, session);
      global.allContactsList = [
        ...global.personalContactsList,
        ...global.organizationContactsList,
      ];
    }
  }

  /**
   * function to click on add new contact button & verify create contact page
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async clickAddContactAndVerifyPage(session = "") {
    await this.waitForSelector(this.elements.addNewContactButton, session);
    await this.click(this.elements.addNewContactButton, session);
    await this.waitForSelector(this.elements.newContactFormPage, session);
    const formPage = await this.isVisible(
      this.elements.newContactFormPage,
      session
    );
    assert.isTrue(formPage);
  }

  /**
   * function to fill the add contact form and serach for the same contact
   * @param {Object} groupUserData - object containing user's data
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async fillRequriedfields(groupUserData, userInfo, session = "") {
    let userFullName =
      groupUserData.userFirstName + " " + groupUserData.userLastName;
    await this.waitForSelector(this.elements.saveContactAsButton, session);
    await this.click(this.elements.saveContactAsButton, session);
    await this.click(this.elements.contactType(groupUserData.saveAs), session);
    if (groupUserData.saveAs.includes("Personal")) {
      global.personalContactsList.push(userFullName);
    }
    if (groupUserData.saveAs.includes("Organization")) {
      global.organizationContactsList.push(userFullName);
    }
    await this.type(
      this.elements.firstName(),
      groupUserData.userFirstName,
      session
    );
    await this.type(
      this.elements.lastName(),
      groupUserData.userLastName,
      session
    );
    await this.type(
      this.elements.organisation(),
      groupUserData.organisation,
      session
    );
    await this.type(this.elements.role(), groupUserData.role, session);
    //insert phoneNumber as per type selected
    let j = 0;
    let phoneTypeArr = groupUserData.phoneType.split(",");
    for (let i = 0; i < phoneTypeArr.length; i++) {
      let userPhoneType = userInfo[`phoneNumber_${phoneTypeArr[i]}`];
      await this.click(this.elements.phoneType, session);
      await this.click(
        this.elements.selectType(phoneTypeArr[i], "phoneNumber"),
        session
      );
      await this.type(
        this.elements.phoneNumber(phoneTypeArr[i]),
        userPhoneType,
        session
      );
      j++;
      if (j < phoneTypeArr.length) {
        await this.click(this.elements.phoneNumberPlusIcon, session);
      }
    }
    //insert email as per type selected
    let k = 0;
    let emailTypeArr = groupUserData.emailType.split(",");
    for (let i = 0; i < emailTypeArr.length; i++) {
      let userEmailType = userInfo[`email_${emailTypeArr[i]}`];
      await this.click(this.elements.emailType, session);
      await this.click(
        this.elements.selectType(emailTypeArr[i], "email"),
        session
      );
      await this.type(
        this.elements.email(emailTypeArr[i]),
        userEmailType,
        session
      );
      k++;
      if (k < emailTypeArr.length) {
        await this.click(this.elements.emailPlusIcon, session);
      }
    }
    await this.click(this.elements.addContactButton, session);
    await this.wait(3); //wait for contact to create
    //function to verify all contact details
    await this.searchAndverifyContactUser(groupUserData, "true", session);
  }

  /**
   * function to select searched user
   * @param {string} username - username
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async selectUser(username, session = "") {
    await this.waitForSelector(this.elements.existedUser(username), session);
    await this.click(this.elements.existedUser(username), session);
    await this.waitForSelector(this.elements.editPanel, session);
  }

  /**
   * function to verify contact details
   * @param {Object} groupUserData - object containing user's data
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async verifyContactDetails(groupUserData, userInfo, session = "") {
    await this.waitForSelector(
      this.elements.selectedType("selectedSource", groupUserData.source),
      session
    );
    await this.waitForSelector(
      this.elements.firstName(`${userInfo.firstName}`),
      session
    );
    await this.waitForSelector(
      this.elements.lastName(`${userInfo.lastName}`),
      session
    );
    await this.waitForSelector(
      this.elements.organisation(`${userInfo.organisation}`),
      session
    );
    await this.waitForSelector(this.elements.role(`${userInfo.role}`), session);
    //condition to check all type of phonenumber added
    let phoneTypeArr = groupUserData.phoneType.split(",");
    for (let i = 0; i < phoneTypeArr.length; i++) {
      let userPhoneType = userInfo[`phoneNumber_${phoneTypeArr[i]}`];
      await this.waitForSelector(
        this.elements.phoneNumber(
          phoneTypeArr[i],
          await this.formatPhoneNumber(userPhoneType)
        ),
        session
      );
      await this.waitForSelector(
        this.elements.selectedType("phoneNumberType", phoneTypeArr[i]),
        session
      );
    }
    //condition to check all type of email added
    let emailTypeArr = groupUserData.emailType.split(",");
    for (let i = 0; i < emailTypeArr.length; i++) {
      let userEmailType = userInfo[`email_${emailTypeArr[i]}`];
      await this.waitForSelector(
        this.elements.selectedType("emailType", emailTypeArr[i]),
        session
      );
      await this.waitForSelector(
        this.elements.email(emailTypeArr[i], userEmailType),
        session
      );
    }
  }

  /**
   * function to select action button
   * @param {string} button - button name
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async selectActionButton(button, session = "") {
    await this.waitForSelector(this.elements.buttonAction(button), session);
    await this.click(this.elements.buttonAction(button), session);
  }

  /**
   * function to validate popup message
   * @param {string} message - message to be verified
   * @return {void} Nothing
   */
  async validatePopup(message) {
    await this.waitForSelector(this.elements.popupMessage(message));
    await this.shouldVisible(this.elements.popupMessage(message));
  }

  /**
   * function to select action button on popup
   * @param {string} button - button name
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async clickPopupButton(button, session = "") {
    await this.waitForSelector(this.elements.popupButton(button), session);
    await this.click(this.elements.popupButton(button), session);
  }

  /**
   * function to click on add new contact button
   * @return {void} Nothing
   */
  async clickAddNewContactButton(session = "") {
    await this.clickAddContactAndVerifyPage(session);
    // await this.waitForSelector(this.elements.addNewContactButton);
    // await this.click(this.elements.addNewContactButton);
  }

  async verifyContactPage(){
    await this.waitForSelector(this.elements.newContactFormPage);
    const formPage = await this.isVisible(
      this.elements.newContactFormPage,
    );
    assert.isTrue(formPage);
  }

  async clickAddContact(){
    await this.click(this.elements.addContactButton);
    await this.wait(2)
  }

  async verifyErrorMessage(message){
    await this.waitForSelector(this.elements.popup(message));
    await this.shouldContainText(this.elements.popup(message),message);
  }

  async saveContactTo(option, session = ""){
    await this.click(this.elements.saveContactTo, session)
    await this.click(this.elements.saveContactToOption(option), session)
  }

  async addFirstName(firstName){
    await this.click(this.elements.contactFirstName)
    await this.type(this.elements.contactFirstName, firstName);
  }
 
  async addLastName(lastName){
    await this.click(this.elements.contactLastName)
    await this.type(this.elements.contactLastName, lastName);
  }

  async verifyContact(user) {
    await this.shouldContainText(this.elements.verifyContact(user), `${user.firstName} ${user.lastName}`);
  }

  async searchContact(contactName){
    await this.click(this.elements.searchInput);
    await this.type(this.elements.searchInput, contactName);
    await this.pressKey('Enter');
  }

  async selectContact(contactName){
    await this.click(this.elements.selectContactName(contactName));
  }

  async createContactField(type,email){
    await this.click(this.elements.clickExpandIcon);
    await this.click(this.elements.clickDropdownForEmailType);
    await this.waitForSelector(this.elements.selectPersonalMail(type))
    await this.click(this.elements.selectPersonalMail(type));
    await this.click(this.elements.clickDropdownForEmail);
    await this.type(this.elements.clickDropdownForEmail,email); 
  }

  async checkSaveButtonStatus(savebtn){
    await this.waitForSelector(this.elements.clickContactSave(savebtn))
    const isSaveButtonVisible = await this.isVisible(this.elements.clickContactSave(savebtn));
    assert.isTrue(isSaveButtonVisible);
  }

  async clickOnContactSave(savebtn){
    await this.waitForSelector(this.elements.clickContactSave(savebtn))
    const isSaveButtonVisible = await this.isVisible(this.elements.clickContactSave(savebtn));
    assert.isTrue(isSaveButtonVisible);
    await this.waitForSelector(this.elements.clickContactSave(savebtn))
    await this.click(this.elements.clickContactSave(savebtn))
    await this.wait(2);
  }
  async checkUpdatedField(field, session) {
    await this.shouldContainText(this.elements.checkEmailPersonalField(field),field)
  }

  async checkUpdatedEmail(email, session) {
    await this.shouldContainText(this.elements.checkEmailField(email), email);
  }

  async checkUpdatedRole(role) {
    await this.shouldContainText(this.elements.checkRoleField(role), role)
  }

  async checkUpdatedFirstName(firstName){
    await this.shouldContainText(this.elements.checkFirstNameField(firstName),firstName)
  }

    async updateEmail(email, session = ""){
      await this.click(this.elements.emailField, session)
      await this.type(this.elements.emailField, email);
    }

    async updateRole(role, session= ""){
      await this.click(this.elements.roleField, session)
      await this.type(this.elements.roleField, role);
    }

    async updateFirstName(firstName,session=""){
      await this.click(this.elements.firstNameField);
      await this.type(this.elements.firstNameField, firstName);
    }

  /**
   * function to verify if contact is present in list
   * @param {array} expectedList - contact list array
   * @param {string} sourceFilter - source type
   * @param {string} session - window session
   * @return {void} Nothing
   */
  async verifyContactList(expectedList, sourceFilter, session) {
    if (
      typeof expectedList === "undefined" ||
      expectedList === null ||
      expectedList.length === 0
    ) {
      expectedList = await this.fetchContactList(sourceFilter, session);
    }
    const getAllContactsCounts = await this.countElement(
      this.elements.contactListItems,
      session
    );
    for (let i = 1; i < getAllContactsCounts + 1; i++) {
      let list = await this.getText(
        this.elements.contactListItems + `[${[i]}]`,
        session
      );
      if (list.includes("(")) {
        list = list.substring(0, list.indexOf("(")).trim();
      }
      assert.isTrue(expectedList.includes(list));
    }
  }

  /**
   * function to fetch contact list
   * @param {string} sourceFilter - source type
   * @return {array} arrayList : Contact list
   */
  async fetchContactList(sourceFilter) {
    let arrayList = [];
    let userInfo = await this.getContactInfo("type", sourceFilter);
    if (sourceFilter.includes("Display")) {
      userInfo = await this.getContactInfo("", sourceFilter);
    }
    if (userInfo !== "" && userInfo.length > 0) {
      for (let i = 0; i < userInfo.length; i++) {
        let userfullName = `${userInfo[i].firstName} ${userInfo[i].lastName}`;
        arrayList.push(userfullName);
      }
      if (sourceFilter.includes("Personal")) {
        global.personalContactsList = arrayList.slice();
      }
      if (sourceFilter.includes("Organization")) {
        global.organizationContactsList = arrayList.slice();
      }
      if (sourceFilter.includes("Display")) {
        global.allContactsList = arrayList.slice();
      }
    }
    return arrayList;
  }
};
