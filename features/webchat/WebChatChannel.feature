@webchatChannel @group_4
Feature: Webchat Channel

    Background: Login
        Given reset data set
        Given  User login to the platform as 'admin' in 'first' window
        And reset global variables

    @6254 @healthcheck
    Scenario: Webchat Online - Rates conversation after being closed
        Given user access 'Webchat Manager' menu and then '' submenu in 'first' window
        When user access 'WebchatChannel_1' select edit option and click '' tab
        And setting 'AllowRatingRequest' to 'true'
        When user access the 'Webchat Channel' in 'first' window
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact       | email                   |
            | second | Sakshi Sharma | sharma.sakshi@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        When user reply to received message by selecting Request rating
        When user 'close' the 'active' conversation with the subject 'WebchatParent_1'
        Then customer is notified that the agent has 'left' the conversation
        Then client sends 'rating' with '4' star and 'Nice' message
        When user switch to main tab
        When user navigate to search and search by following attributes
            | status | email                   |
            | CLOSED | sharma.sakshi@tftus.com |
        Then validate the conversation is correctly registered and in 'CLOSED' status
            | status | from          | email                   | select |
            | CLOSED | Sakshi Sharma | sharma.sakshi@tftus.com | true   |
        And verify 'rate' with '4' star and 'Nice' message

    @844
    Scenario: Webchat - Receive Messsage
           Given user access the 'Webchat Channel' in 'first' window
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate message received successfully in 'Active' tab & 'New' status
        Then Validate the Unread Messages column

    @845
    Scenario: Webchat - Reply message
        Given user access the 'Webchat Channel' in 'first' window
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate message received successfully in 'Active' tab & 'New' status
         When user select the received message and reply the conservation
        Then user 'close' the conversation with subject 'WebchatChild_1' in '' window

    @846
    Scenario: Webchat - Send message Out of Schedule without Tickets integration
        Given user access 'Webchat Manager' menu and then '' submenu in 'first' window
        When user open webchat plugin 'second'
        When user access 'WebchatChannel_1' select edit option and click 'calendar' tab
        When user select a time outside the current time in calendar section
        Then save the changes successfully
        When user open previous tab and send a message through Webchat plugin
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then verify webchat error message 'Webchat is out of schedule.'

    @847
    Scenario: Webchat - Send message Exception Date with Tickets integration
        Given user access 'Webchat Manager' menu and then '' submenu in 'first' window
        When user access 'WebchatChannel_1' select edit option and click 'calendar' tab
        Then user configure an exception for today
        When user goto settings and in properties configure following
            | ticketIntegration | True          |
            | chatOffline       | True          |
            | ticketQueue       | TicketQueue_1 |
        Then save the changes successfully
        When user open a duplicate tab and send a message through Webchat plugin and ticket is created
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then Validate ticket in ticket channel

    @848
    Scenario: Webchat - Message - Send as Ticket
        Given user access 'Webchat Manager' menu and then '' submenu in 'first' window
        When user access 'WebchatChannel_1' select edit option
        When user goto settings and in properties configure following
            | ticketIntegration | True |
        And user edit the 'queue_one' queue
        And add new agent 'Agent One'
        Then save the changes successfully
        When user access the 'Webchat Channel' in 'first' window
        And user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate message received successfully in 'Active' tab & 'New' status
        When user select the received message and reply the conservation
        Then user navigate to ticket channel through action and create a ticket
            | queue    | TicketQueue_1     |
            | subject  | SubjectTree_1     |
            | template | TicketsTemplate_1 |     
        Then Then validate the ticket creation and the webchat conversation for the ticket

    @849
    Scenario: Webchat - Message - Mark as SPAM
        Given user access the 'Webchat Channel' in 'first' window
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate message received successfully in 'Active' tab & 'New' status
        When user select the received message and reply the conservation
        Then user mark message as 'spam'
        When user navigate to search and search by following attributes
            | status | email                  |
            | spam   | arora.Ankush@tftus.com |
        Then validate the conversation is correctly registered and in 'SPAM' status
            | status | from   | email                  |
            | SPAM   | Ankush | arora.Ankush@tftus.com |

    @850
    Scenario: Webchat - Template - Type Radio Button
        Given user access the 'Webchat Channel' in 'first' window
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate message received successfully in 'Active' tab & 'New' status
        When user reply to received message with 'WebchatTemplateRadio_1' template
        Then validate template is received in the client plugin with 'Do you prefer?'
        And the template is successfully answered by customer as 'rain'
        And agent is notified the response by customer as 'Option Selected - rain'

    @855
    Scenario: Webchat - See previous conversations
        Given user access the 'Webchat Channel' in 'first' window
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate message received successfully in 'Active' tab & 'New' status
        When user select the received message and reply the conservation
        And verify previous conversation

    @852
    Scenario: Webchat - Transfer conversation between Agents
        Given user access 'Webchat Manager' menu and then '' submenu in 'first' window
        When user access 'WebchatChannel_1' select edit option
        And user edit the 'queue_one' queue
        And add new agent 'Agent Three'
        Then save the changes successfully
        And user login to the platform with 'Agent_3' account in 'second' window
        And agent login the webChat channel
        When user access the 'Webchat Channel' in 'first' window
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate message received successfully in 'Active' tab & 'New' status
        And select received message
        When user Transfer Conversation to agent 'Agent Three'
        And validate transfer successfully to agent 'Agent Three'
        Then customer is notified that the agent has changed to 'Agent Three'

    @853
    Scenario: Webchat - Transfer conversation between Queues
        Given user access 'Webchat Manager' menu and then '' submenu in 'first' window
        When user access 'WebchatChannel_1' select edit option
        Then user access the 'Webchat Channel' in 'first' window
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate message received successfully in 'Active' tab & 'New' status
        And select received message
        When user Transfer Conversation to 'queue_two' queue
        And validate transfer successfully to 'queue_two' queue with 'WebchatChannel_1' channel

    @851
    Scenario: Webchat - Template - Type Select
        Given user access the 'Webchat Channel' in 'first' window
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate message received successfully in 'Active' tab & 'New' status
        When user reply to received message with 'WebchatTemplateSelect_1' template
        Then validate template is received in the client plugin with 'Do you prefer?'
        And the template of type select is successfully answered by customer as 'rain'
        And agent is notified the response by customer as 'Option Selected - rain'

    @854
    Scenario: Webchat - Make Call
        When user access 'Voice Manager' menu and then '' submenu in 'first' window
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to 'General Settings' tab during campaign edit
        Then user configure Global Max tries with value '0'
        When user navigates to 'dialer' tab during campaign edit
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the voice channel with following credentials:
            | campaign           | queue | extension | session |
            | OutboundCampaign_1 |       | 100       | first   |  
        When user access the 'Webchat Channel' in 'first' window
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user verify reply option
        And update contact info if not added '8094217411'
        When user click on Webchat call
        And user make a call
        Then user state should be 'talking'
        When user disconnects the call
        Then user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        And user verify webchat with an information message about the call made:
            | termReason | campaign           |
            | AGENT      | OutboundCampaign_1 |

    @5555
    Scenario: Webchat - Send message Exception Date without Tickets integration
        Given user access 'Webchat Manager' menu and then '' submenu in 'first' window
        When user open webchat plugin 'second'
        When user access 'WebchatChannel_1' select edit option and click 'calendar' tab
        Then user configure an exception for today
        Then save the changes successfully
        When user open previous tab and send a message through Webchat plugin
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then verify webchat error message 'Webchat is out of schedule.'

    @6210
    Scenario: Manage assignments - Webchat channel association
        When user access 'Users' menu and then 'Groups & users' submenu in 'first' window
        And Select 'Group_1' group
        Then user assign agents to the group
            | agent | Agent Five |
        When user access 'Webchat Manager' menu and then '' submenu in 'first' window
        Then user access 'WebchatChannel_1' select edit option
        Then user navigate to Queue and search 'queue_one'
        Then save the changes successfully
        When user access 'Admin Tools' menu and then 'Profile manager' submenu in 'first' window
        And In access agent user set the profile
        Then User logout with current session in 'first' window
        When User login to the platform as 'Agent_5' in 'first' window
        When user access 'Users' menu and then 'Groups & users' submenu in 'first' window
        And Select 'Group_1' group
        And user validate manage assignments and 'assign' 'queue_one' queue
        When user access the 'Webchat Channel' in 'first' window
        Then validate user has access to the group
            | channel | WebchatChannel_1 |
            | queue   | queue_one        |
        Then User logout with current session in 'first' window
        When User login to the platform as 'Agent_4' in 'first' window
        When user access the 'Webchat Channel' in 'first' window
        Then validate user has access to the group
            | channel | WebchatChannel_1 |
            | queue   | queue_one        |

    @6211
    Scenario: Manage assignments - No association of webchat channels
        When user access 'Users' menu and then 'Groups & users' submenu in 'first' window
        And Select 'Group_1' group
        Then user assign agents to the group
            | agent | Agent Five |
        When user access 'Webchat Manager' menu and then '' submenu in 'first' window
        Then user access 'WebchatChannel_1' select edit option
        Then user navigate to Queue and search 'queue_one'
        Then save the changes successfully
        When user access 'Admin Tools' menu and then 'Profile manager' submenu in 'first' window
        And In access agent user set the profile
        When  user access 'Users' menu and then 'Groups & users' submenu in 'first' window
        And Select 'Group_1' group
        And user validate manage assignments and 'assign' 'queue_one' queue
        Then User logout with current session in 'first' window
        When User login to the platform as 'Agent_5' in 'first' window
        When user access 'Users' menu and then 'Groups & users' submenu in 'first' window
        And Select 'Group_1' group
        And user validate manage assignments and 'validate' 'queue_one' queue
        And user delete the assigned queue 'queue_one'
        When user access the 'Webchat Channel' in 'first' window
        Then validate webchat channel 'WebchatChannel_1' with queue 'queue_one' is not configured for the user
        Then User logout with current session in 'first' window
        When User login to the platform as 'Agent_4' in 'first' window
        When user access the 'Webchat Channel' in 'first' window
        Then validate webchat channel 'WebchatChannel_1' with queue 'queue_one' is not configured for the user

    @6212
    Scenario: Manage assignments - Webchat channel associations to different Webchat-queues
        When user access 'Users' menu and then 'Groups & users' submenu in 'first' window
        And Select 'Group_1' group
        Then user assign agents to the group
            | agent | Agent One,Agent Two |
        When user access 'Webchat Manager' menu and then '' submenu in 'first' window
        Then user access 'WebchatChannel_1' select edit option
        Then user navigate to Queue and search 'queue_one'
        When user create a new queue
            | path | path1 |
        And validate '0' queue is successfully created
        When user create a new queue
            | path | path2 |
        And validate '1' queue is successfully created
        Then save the changes successfully
        When user access 'Admin Tools' menu and then 'Profile manager' submenu in 'first' window
        And In access agent user set the profile
        When user access 'Users' menu and then 'Groups & users' submenu in 'first' window
        And Select 'Group_1' group
        And user validate manage assignments and 'assign' 'queue_one' queue
        When user access 'Webchat Manager' menu and then '' submenu in 'first' window
        Then user access 'WebchatChannel_1' select edit option
        When user search and edit '0' queue
        And add new agent 'Agent One'
        When user search and edit '1' queue
        And add new agent 'Agent Two'
        Then save the changes successfully
        Then User logout with current session in 'first' window
        When User login to the platform as 'Agent_1' in 'first' window
        When user access the 'Webchat Channel' in 'first' window
        Then validate user has access to the group
            | channel | WebchatChannel_1 |
            | queue   | queue_one,0      |
        Then User logout with current session in 'first' window
        When User login to the platform as 'Agent_4' in 'first' window
        When user access the 'Webchat Channel' in 'first' window
        Then validate user has access to the group
            | channel | WebchatChannel_1 |
            | queue   | queue_one,1      |


@7092
    Scenario: ACD agent request a break with authorization while there are conversations assigned - Authorization approved
        Then user access 'Users' menu and then 'Groups & users' submenu in 'first' window
        And Select 'Group_1' group
        When Create a new break with following configurations:
            | breakName | auth | startTime | endTime | maxTime |
            | Break_AT  | true | 00:00     | 23:00   | 60      |
        Then user choose the following configurations in groups panel:
            | queueName | actionType | automaticChatDelivery | maxConcurrent |
            | queue_one | assign     | check                 | 3             |
        When User login to the platform as 'Agent_1' in 'second' window
        When user login to the voice channel with following credentials:
            | campaign           | queue | extension | session |
            | OutboundCampaign_1 |       | 100       | second  |
        When user access the 'Webchat Channel' in 'second' window
        And validate the static information 'There are no active conversations to reply to. You\'ll be assigned to one as soon as it\'s received.' in 'second' window
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact    | email           |
            | second | first user | first@tftus.com |
        And user confirm that message with contact 'first user' delivered to Agent in 'second' window
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact     | email            |
            | third  | second user | second@tftus.com |
        And user confirm that message with contact 'second user' delivered to Agent in 'second' window
        And request the break 'once' with auth 'true' in 'second' window
        And validate break approval request and clicks on 'Authorize' button
        Then agent is notified about break 'approval' in 'second' window
        And As agent 'close' the '2' conversation in 'second' window
        And validate the static information 'There are no active conversations to reply to. You\'ll be assigned to one as soon as it\'s received.' in 'second' window  

 @7105
    Scenario: ACD agent logout while there are conversations assigned
        And user access 'Users' menu and then 'Groups & users' submenu in 'first' window
        And Select 'Group_1' group
        Then user choose the following configurations in groups panel:
            | queueName | actionType | automaticChatDelivery | maxConcurrent |
            | queue_one | assign     | check                 | 3             |
        Then User logout with current session in 'first' window
        When User login to the platform as 'Agent_1' in 'first' window
        And  user access the 'Webchat Channel' in 'first' window
        And validate the static information 'There are no active conversations to reply to. You\'ll be assigned to one as soon as it\'s received.' in 'first' window
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact    | email           |
            | second | first user | first@tftus.com |
        And let user wait for '8' seconds
        And user confirm that message with contact 'first user' delivered to Agent in 'first' window
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact     | email            |
            | third  | second user | second@tftus.com |
        And let user wait for '5' seconds
        And user confirm that message with contact 'second user' delivered to Agent in 'first' window
        When user logout of webchat channel in 'first' window
        Then verify an alert message is displayed: 'You will log out of Webchat when you close the assigned conversations'
        And verify that in the webchat inbox header is created a 'Logout' after-action
        And As agent 'close' the '2' conversation in 'first' window
        Then verify 'Agent_1' logged out of webchat successfully in 'first' window
   
    @7082
    Scenario: Assign conversations with the ACD mode activated
        Then user access 'Users' menu and then 'Groups & users' submenu in 'first' window
        And Select 'Group_1' group
        Then user assign agents to the group
            | agent | Agent One |
        Then user choose the following configurations in groups panel:
            | queueName | actionType | automaticChatDelivery | maxConcurrent |
            | queue_one | assign     | check                 | 1             |
        And user select 'Agent Two' from users_table
        And assign 'Group_2' to agent
        And Select 'Group_2' group
        Then user choose the following configurations in groups panel:
            | queueName | actionType | automaticChatDelivery | maxConcurrent |
            | queue_one | assign     | check                 | 2             |
        Then User logout with current session in 'first' window
        When User login to the platform as 'Agent_1' in 'first' window
        And  user access the 'Webchat Channel' in 'first' window
        And validate the static information 'There are no active conversations to reply to. You\'ll be assigned to one as soon as it\'s received.' in 'first' window
        When User login to the platform as 'Agent_2' in 'second' window
        When user access the 'Webchat Channel' in 'second' window
        And validate the static information 'There are no active conversations to reply to. You\'ll be assigned to one as soon as it\'s received.' in 'second' window
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact    | email           |
            | second | first user | first@tftus.com |
        And user confirm that message with contact 'first user' delivered to Agent in 'second' window
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact     | email            |
            | third  | second user | second@tftus.com |
        And user confirm that message with contact 'second user' delivered to Agent in 'first' window
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact    | email           |
            | fourth | third user | third@tftus.com |
        And user confirm that message with contact 'third user' delivered to Agent in 'second' window
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact     | email            |
            | fifth  | fourth user | fourth@tftus.com |
        And user confirm that message in 'fifth' window is not delivered
        And As agent 'close' the '1' conversation in 'first' window
        And user confirm that message with contact 'fourth user' delivered to Agent in 'first' window
        And As agent 'close' the '2' conversation in 'second' window
        And validate the static information 'There are no active conversations to reply to. You\'ll be assigned to one as soon as it\'s received.' in 'second' window
        And As agent 'close' the '1' conversation in 'first' window
        And validate the static information 'There are no active conversations to reply to. You\'ll be assigned to one as soon as it\'s received.' in 'first' window


    @7084
    Scenario: [Automation] Assign conversations to ACD users with the same ratio
        Then User logout with current session in 'first' window
        # When User login to the platform as 'Supervisor_1' in 'first' window
        When User login to the platform as 'Supervisor_1' in 'first' window
        Then user access 'Users' menu and then 'Groups & users' submenu in 'first' window
        And Select 'Group_1' group
        Then user choose the following configurations in groups panel:
            | queueName | actionType | automaticChatDelivery | maxConcurrent |
            | queue_one | assign     | check                 | 2             |
        And Select 'Group_2' group
        Then user choose the following configurations in groups panel:
            | queueName | actionType | automaticChatDelivery | maxConcurrent |
            | queue_one | assign     | check                 | 2             |
        Then User logout with current session in 'first' window
        When User login to the platform as 'Agent_1' in 'first' window
        And  user access the 'Webchat Channel' in 'first' window
        And validate the static information 'There are no active conversations to reply to. You\'ll be assigned to one as soon as it\'s received.' in 'first' window
        When User login to the platform as 'Agent_2' in 'second' window
        When user access the 'Webchat Channel' in 'second' window
        And validate the static information 'There are no active conversations to reply to. You\'ll be assigned to one as soon as it\'s received.' in 'second' window
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact    | email           |
            | second | first user | first@tftus.com |
        And user confirm that message with contact 'first user' delivered to Agent in 'second' window
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact     | email            |
            | third  | second user | second@tftus.com |
        And user confirm that message with contact 'second user' delivered to Agent in 'first' window
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact    | email           |
            | fourth | third user | third@tftus.com |
        And user confirm that message with contact 'third user' delivered to Agent in 'second' window
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact     | email            |
            | fifth  | fourth user | fourth@tftus.com |
        And user confirm that message with contact 'fourth user' delivered to Agent in 'first' window
        And As agent 'close' the '2' conversation in 'first' window
        And validate the static information 'There are no active conversations to reply to. You\'ll be assigned to one as soon as it\'s received.' in 'first' window
        And As agent 'close' the '2' conversation in 'second' window
        And validate the static information 'There are no active conversations to reply to. You\'ll be assigned to one as soon as it\'s received.' in 'second' window