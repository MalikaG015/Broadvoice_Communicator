const { When, Then } = require("@cucumber/cucumber");
const { Contacts } = require("../page-objects/contacts.po");

const contacts = new Contacts();

When("check and add new contact with following details in {string} window:", async (session, datatable) => {
  let groupUserData = [];
  datatable.hashes().forEach((element) => {
    groupUserData.push({
      saveAs: element.saveAs,
      user: element.user,
      phoneType: element.phoneType,
      emailType: element.emailType,
      required: element.required,
      type: element.type
    });
  });
  for (let i = 0; i < groupUserData.length; i++) {
    try {
      await contacts.searchAndverifyContactUser(groupUserData[i], "new", session);
    } catch (error) {
      console.error(`Error processing index ${i}:`, error);
      await contacts.searchAndverifyContactUser(groupUserData[i], "new", session); // Create same failed contact again, if necessary
    }
  }
});


Then("the user searches and verify contact details in {string} window", async (session, datatable) => {
  let groupUserData = [];
  datatable.hashes().forEach((element) => {
    groupUserData.push({
      user: element.user,
      saveAs: element.saveAs,
      type: element.type,
      status: element.status,
      filterBySource: element.filterBySource
    });
  });
  for (let i = 0; i < groupUserData.length; i++) {
    let userInfo = await contacts.getContactInfo('username', groupUserData[i].user);
    groupUserData[i]["userName"] = `${userInfo.firstName} ${userInfo.lastName}`;
    await contacts.searchAndverifyContactUser(groupUserData[i], groupUserData[i].status, session);
  }
});

When("select contact and verify details as following in {string} window:", async (session, datatable) => {
  let groupUserData = '';
  datatable.hashes().forEach((element) => {
    groupUserData = {
      source: element.source,
      user: element.user,
      phoneType: element.phoneType,
      emailType: element.emailType
    };
  });
  let userInfo = await contacts.getContactInfo('username', groupUserData.user);
  await contacts.selectUser(`${userInfo.firstName} ${userInfo.lastName}`, session);
  await contacts.verifyContactDetails(groupUserData, userInfo, session);
});

Then("the user clicks on {string} in {string} window", async (button, session) => {
  await contacts.selectActionButton(button, session);
});

Then("a popup will appear with the message {string}", async (message) => {
  let user = message.substring(message.indexOf("{") + 1, message.lastIndexOf("}"));
  let userInfo = await contacts.getContactInfo('username', user);
  message = message.replace(/{.*}/, `${userInfo.firstName} ${userInfo.lastName}`);
  await contacts.validatePopup(message);
});

Then("the user clicks {string} in {string} window", async (buttonText, session) => {
  await contacts.clickPopupButton(buttonText, session);
});

When('the user clicks on Add new contact button in {string} window', async (session) => {
  await contacts.clickAddNewContactButton(session);
})

Then('the page should display the form to create a new contact', async () => {
  await contacts.verifyContactPage();
})

When('the user selects Add contact button', async () => {
  await contacts.clickAddContact();
})

Then('an error is shown with the message {string}', async (message) => {
  await contacts.verifyErrorMessage(message);
})

When('the user fills Save Contact To field with {string}', async (option) => {
  await contacts.saveContactTo(option);
})

When('the user fills First Name field with {string}', async (firstName) => {
  await contacts.addFirstName(firstName)
})

When('the user fills Last Name field with {string}', async (lastName) => {
  await contacts.addLastName(lastName)
})

Then('a new contact should be created and displayed on the list:', async (userDetails) => {
  const user = userDetails.rowsHash();
  await contacts.verifyContact(user);
})

When('the user searches by {string}', async (contactName) => {
  await contacts.searchContact(contactName);
})

When('select the {string} contact in {string} window', async (contactName, session) => {
  await contacts.selectContact(contactName);
})

// When('Add new field for contact in {string} window', async (session, datatable) => {
//   let groupUserData = [];
//   datatable.hashes().forEach((element) => {
//     groupUserData.push({
//       user: element.user,
//       type: element.type,
//     });
//   });
//  for (let i = 0; i < groupUserData.length; i++) {
//     let userInfo = await contacts.getContactInfo('username', groupUserData[i].user);
//     // groupUserData["userName"] = `${userInfo.firstName} ${userInfo.lastName}`;

//   await contacts.selectUser(`${userInfo.firstName} ${userInfo.lastName}`, session);
//   await contacts.createContactField(groupUserData[i].type,userInfo.email_Personal);
//  }

// })

Then('the {string} button should be available to click', async (savebtn) => {
  await contacts.checkSaveButtonStatus(savebtn);
})

When('the user clicks on {string}', async (savebtn) => {
  await contacts.clickOnContactSave(savebtn);
})

Then('the contact should be updated with following details in {string} window:', async (session,datatable) => {
  let groupUserData = [];
  datatable.hashes().forEach((element) => {
    groupUserData.push({
      user: element.user,
      new_email: element.new_email,
      role: element.role
    });
  });
  for (let i = 0; i < groupUserData.length; i++) {
    let userInfo = await contacts.getContactInfo('username', groupUserData[i].user);
    if (groupUserData[i].type) {
      await contacts.checkUpdatedField(userInfo.email_Personal,session)
  }
  if (groupUserData[i].new_email) {
    await contacts.checkUpdatedEmail(groupUserData[i].new_email, session)
  }

  if(groupUserData[i].role){
    await contacts.checkUpdatedRole(groupUserData[i].role, session); 
  }

  if(groupUserData[i].firstName){
    await contacts.checkUpdatedFirstName(groupUserData[i].firstName, session)
  }
}
})

When('the field is edited or new field is added for the following contact in {string} window:', async (session, datatable) => {
  let groupUserData = [];
  datatable.hashes().forEach((element) => {
    groupUserData.push({
      user: element.user,
      new_email: element.new_email,
      type:element.type,
      role: element.role,
      firstName: element.firstName,
      saveAs: element.saveAs
    });
  });
  for (let i = 0; i < groupUserData.length; i++) {
    let userInfo = await contacts.getContactInfo('username', groupUserData[i].user);
    if(groupUserData[i].saveAs){
      await contacts.saveContactTo(groupUserData[i].saveAs, session);

    }
    if (groupUserData[i].type) {
      await contacts.createContactField(groupUserData[i].type, userInfo.email_Personal);
  }
  if (groupUserData[i].new_email) {
      await contacts.updateEmail(groupUserData[i].new_email, session);
  }

  if(groupUserData[i].role){
    await contacts.updateRole(groupUserData[i].role, session);
  }
  if(groupUserData[i].firstName){
    await contacts.updateFirstName(groupUserData[i].firstName, session)
  }}
})





