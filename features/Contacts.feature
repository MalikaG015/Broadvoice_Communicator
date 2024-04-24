@contacts
Feature: Contacts

    Background: Login User01 and User02
        When Login as "user_01" in communicator in "first" window
        Then the page should display as logged-in state
        When let user wait for "5" seconds
        When the user clicks on "Contacts" menu in "first" window

    @0001
    Scenario: Create New Contact - With Required Fields
        When the user clicks on Add new contact button in "first" window
        And the user selects Add contact button
        Then an error is shown with the message "Save contact to field is required"
        And the field is edited or new field is added for the following contact in "first" window:
            | saveAs   |
            | Personal |
        And the user selects Add contact button
        Then an error is shown with the message "First name field is required"
        And the field is edited or new field is added for the following contact in "first" window:
            | user       | firstName  |
            | contact_02 | contact_02 |
        And the user selects Add contact button
        Then an error is shown with the message "Last name field is required"
        And the field is edited or new field is added for the following contact in "first" window:
            | user       | lastName              |
            | contact_02 | Qa-collaboration-auto |
        Then the contact should be updated with following details in "first" window:
            | user       | type     |
            | contact_02 | Personal |
       

    @0002
    Scenario: Add personal work email for Contact02
        When check and add new contact with following details in "first" window:
            | saveAs            | user       | type      | phoneType | emailType | required                             |
            | Personal contacts | contact_02 | firstName | Mobile    | Work      | Save Contact To,First Name,Last Name |
        Then the user searches and verify contact details in "first" window
            | user       | saveAs            | type      | status |
            | contact_02 | Personal contacts | firstName | true   |
        And select contact and verify details as following in "first" window:
            | source   | user       | phoneType | emailType |
            | Personal | contact_02 | Mobile    | Work      |
        And the field is edited or new field is added for the following contact in "first" window:
            | user       | type     |
            | contact_02 | Personal |
        When the user clicks on "SAVE"
        Then the contact should be updated with following details in "first" window:
            | user       | type     |
            | contact_02 | Personal |

    @0003
    Scenario: Edit email for Contact02
        When check and add new contact with following details in "first" window:
            | saveAs            | user       | type      | phoneType | emailType | required                             |
            | Personal contacts | contact_02 | firstName | Mobile    | Work      | Save Contact To,First Name,Last Name |
        Then the user searches and verify contact details in "first" window
            | user       | saveAs            | type      | status |
            | contact_02 | Personal contacts | firstName | true   |
        And select contact and verify details as following in "first" window:
            | source   | user       | phoneType | emailType |
            | Personal | contact_02 | Mobile     | Work      |
        And the field is edited or new field is added for the following contact in "first" window:
        | user       | new_email              | 
        | contact_02 | contact_02@dev.lzy.com | 
        When the user clicks on "SAVE"
        Then the contact should be updated with following details in "first" window:
            | user       | new_email              |
            | contact_02 | contact_02@dev.lzy.com |
    
    @0004
    Scenario: Edit role for Contact02
        When check and add new contact with following details in "first" window:
            | saveAs            | user       | type      | phoneType | emailType | required                             |
            | Personal contacts | contact_02 | firstName | Mobile    | Work      | Save Contact To,First Name,Last Name |
        Then the user searches and verify contact details in "first" window
            | user       | saveAs            | type      | status |
            | contact_02 | Personal contacts | firstName | true   |
        And select contact and verify details as following in "first" window:
            | source   | user       | phoneType | emailType |
            | Personal | contact_02 | Mobile     | Work      |
        And the field is edited or new field is added for the following contact in "first" window:
        | user       | role |
        | contact_02 | QA2 |
        When the user clicks on "SAVE"
        Then the contact should be updated with following details in "first" window:
            | user       | role |
            | contact_02 | QA2  |

    @0005
    Scenario: Edit first name of Contact02
        When check and add new contact with following details in "first" window:
            | saveAs            | user       | type      | phoneType | emailType | required                             |
            | Personal contacts | contact_02 | firstName | Mobile    | Work      | Save Contact To,First Name,Last Name |
        Then the user searches and verify contact details in "first" window
            | user       | saveAs            | type      | status |
            | contact_02 | Personal contacts | firstName | true   |
        And select contact and verify details as following in "first" window:
            | source   | user       | phoneType | emailType |
            | Personal | contact_02 | Mobile    | Work      |
        And the field is edited or new field is added for the following contact in "first" window:
            | user       | firstName|
            | contact_02 | contact_11|
        When the user clicks on "SAVE"
        Then the contact should be updated with following details in "first" window:
            | user       | firstName |
            | contact_02 | contact_11 |


    @8322
    Scenario: Add New Contact - With Required Fields
        Then check and add new contact with following details in "first" window:
            | saveAs                | user       | phoneType                                   | emailType     |
            | Organization contacts | contact_01 | Organization_main                           | Work          |
            | Personal contacts     | contact_02 | Mobile                                      | Work          |
            | Personal contacts     | contact_03 | Radio,Pager,Home,Other                      | Work,Personal |
            | Personal contacts     | contact_04 | Mobile,Business,Assistant,Organization_main | Personal      |
            | Personal contacts     | contact_05 | Home_fax,Business_fax                       | Work          |

    @7529
    Scenario: Contact List - Filter by Source (all)
        When the user searches and verify contact details in "first" window
            | user       | saveAs      | filterBySource |
            | contact_04 | Display all | Yes            |

    @7532
    Scenario: Contact List - Filter by Source (Organization)
        When the user searches and verify contact details in "first" window
            | user       | saveAs                | filterBySource |
            | contact_01 | Organization contacts | Yes            |

    @7530
    Scenario: Contact List - Filter by Source (Personal)
        When the user searches and verify contact details in "first" window
            | user       | saveAs            | filterBySource |
            | contact_02 | Personal contacts | Yes            |

    @7525
    Scenario: Search Contact - By Organization
        When the user searches and verify contact details in "first" window
            | user       | saveAs      | type         | status | filterBySource |
            | contact_01 | Display all | organisation | true   | No             |

    @7522
    Scenario: Search Contact - By Phone Number (Other)
        When the user searches and verify contact details in "first" window
            | user       | saveAs            | type              | status |
            | contact_03 | Personal contacts | phoneNumber_Other | true   |
        Then select contact and verify details as following in "first" window:
            | source   | user       | phoneType | emailType |
            | Personal | contact_03 | Other     | Work      |

    @7521
    Scenario: Search Contact - By Phone Number (Radio)
        When the user searches and verify contact details in "first" window
            | user       | saveAs            | type              | status |
            | contact_03 | Personal contacts | phoneNumber_Radio | true   |
        Then select contact and verify details as following in "first" window:
            | source   | user       | phoneType | emailType |
            | Personal | contact_03 | Radio     | Work      |

    @7520
    Scenario: Search Contact - By Phone Number (Assistant)
        When the user searches and verify contact details in "first" window
            | user       | saveAs            | type                  | status |
            | contact_04 | Personal contacts | phoneNumber_Assistant | true   |
        Then select contact and verify details as following in "first" window:
            | source   | user       | phoneType | emailType |
            | Personal | contact_04 | Assistant | Personal  |

    @7519
    Scenario: Search Contact - By Phone Number (Organization Fax)
        When the user searches and verify contact details in "first" window
            | user       | saveAs            | type                          | status |
            | contact_04 | Personal contacts | phoneNumber_Organization_main | true   |
        Then select contact and verify details as following in "first" window:
            | source   | user       | phoneType         | emailType |
            | Personal | contact_04 | Organization_main | Personal  |

    @7518
    Scenario: Search Contact - By Phone Number (Home Fax)
        When the user searches and verify contact details in "first" window
            | user       | saveAs            | type                 | status |
            | contact_05 | Personal contacts | phoneNumber_Home_fax | true   |
        Then select contact and verify details as following in "first" window:
            | source   | user       | phoneType | emailType |
            | Personal | contact_05 | Home_fax  | Work      |

    @7517
    Scenario: Search Contact - By Phone Number (Business Fax)
        When the user searches and verify contact details in "first" window
            | user       | saveAs            | type                     | status |
            | contact_05 | Personal contacts | phoneNumber_Business_fax | true   |
        Then select contact and verify details as following in "first" window:
            | source   | user       | phoneType    | emailType |
            | Personal | contact_05 | Business_fax | Work      |

    @7516
    Scenario: Search Contact - By Phone Number (Pager)
        When the user searches and verify contact details in "first" window
            | user       | saveAs            | type              | status |
            | contact_03 | Personal contacts | phoneNumber_Pager | true   |
        Then select contact and verify details as following in "first" window:
            | source   | user       | phoneType | emailType |
            | Personal | contact_03 | Pager     | Work      |

    @7515
    Scenario: Search Contact - By Phone Number (Home)
        When the user searches and verify contact details in "first" window
            | user       | saveAs            | type             | status |
            | contact_03 | Personal contacts | phoneNumber_Home | true   |
        Then select contact and verify details as following in "first" window:
            | source   | user       | phoneType | emailType |
            | Personal | contact_03 | Home      | Work      |

    @7514
    Scenario: Search Contact - By Phone Number (Mobile)
        When the user searches and verify contact details in "first" window
            | user       | saveAs            | type               | status |
            | contact_04 | Personal contacts | phoneNumber_Mobile | true   |
        Then select contact and verify details as following in "first" window:
            | source   | user       | phoneType | emailType |
            | Personal | contact_04 | Mobile    | Personal  |

    @7513
    Scenario: Search Contact - By Phone Number (Business)
        When the user searches and verify contact details in "first" window
            | user       | saveAs            | type                 | status |
            | contact_04 | Personal contacts | phoneNumber_Business | true   |
        Then select contact and verify details as following in "first" window:
            | source   | user       | phoneType | emailType |
            | Personal | contact_04 | Business  | Personal  |

    @7512
    Scenario: Search Contact - By Last Name
        When the user searches and verify contact details in "first" window
            | user       | saveAs            | type     | status |
            | contact_04 | Personal contacts | lastName | true   |
        Then select contact and verify details as following in "first" window:
            | source   | user       | phoneType                                   | emailType |
            | Personal | contact_04 | Mobile,Business,Assistant,Organization_main | Personal  |

    @7511
    Scenario: Search Contact - By First Name
        When the user searches and verify contact details in "first" window
            | user       | saveAs            | type      | status |
            | contact_04 | Personal contacts | firstName | true   |
        Then select contact and verify details as following in "first" window:
            | source   | user       | phoneType                                   | emailType |
            | Personal | contact_04 | Mobile,Business,Assistant,Organization_main | Personal  |

    @8319
    Scenario: Contact Detail - Delete Contact
        When the user searches and verify contact details in "first" window
            | user       | saveAs            | type               | status |
            | contact_02 | Personal contacts | phoneNumber_Mobile | true   |
        Then select contact and verify details as following in "first" window:
            | source   | user       | phoneType | emailType |
            | Personal | contact_02 | Mobile    | Work      |
        When the user clicks on "DELETE CONTACT" in "first" window
        Then a popup will appear with the message "You are about to remove {contact_02} from contacts. Are you sure?"
        And the user clicks "Yes" in "first" window
        When the user searches and verify contact details in "first" window
            | user       | saveAs            | type               | status |
            | contact_02 | Personal contacts | phoneNumber_Mobile | false  |