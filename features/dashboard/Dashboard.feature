@dashboard @group_13
Feature: Dashboard tests

    Background: reset data set
        Given reset data set

    @7850
    Scenario: Avg. first time reply and Avg. chat duration indicators - ACD mode
        Given User login to the platform as 'admin' in 'first' window
        And user access 'Real Time Tools' menu and then 'Dashboards' submenu in 'first' window
        And User selects the 'webchat' tab
        And let user wait for '2' seconds
        Then user click on Choose channels button
        And user select the 'WebchatChannel_1' and click on save
        Then user get the count of all indicators
        Then user access 'Users' menu and then 'Groups & users' submenu in 'first' window
        And Select 'Group_1' group
        Then user assign agents to the group
            | agent | Agent One,Supervisor One |
        When user access 'Admin Tools' menu and then 'Profile manager' submenu in 'first' window
        And user enables 'isWebChatSupervisor' option
         And user selects following configurations and save the settings:
            | tab        | Full|
            | chatAccess |     |
        Then User logout with current session in 'first' window
        When User login to the platform as 'Supervisor_1' in 'first' window
        When user access 'Users' menu and then 'Groups & users' submenu in 'first' window
        And Select 'Group_1' group
        And user validate manage assignments and 'assign' 'queue_one' queue
        Then In the Refine assignments section select the Automatic chat delivery option
        Then Set the Max concurrent chats to '1' and save the settings
        When access the 'Webchat Channel'
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                  |
            | second | first user | first@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And validate message received with '' agent
        And let user wait for '120' seconds
        When User login to the platform as 'Agent_1' in 'second' window
        When user access the webChat channel in 'second' window
        And user confirm that message with contact 'first user' delivered to Agent in 'second' window
         Then user reply the conversation and note the time in 'second' window
        And user access 'Real Time Tools' menu and then 'Dashboards' submenu in 'first' window
        And User selects the 'webchat' tab
        And let user wait for '2' seconds
        Then user click on Choose channels button
        And user select the 'WebchatChannel_1' and click on save
        Then user validate that the following indicators
            | totalChats  | 1 |
            | activeChats | 1 |
        When access the 'Webchat Channel'
        Then user 'close' the conversation with subject 'WebchatChild_1' in 'second' window
        And  user access 'Real Time Tools' menu and then 'Dashboards' submenu in 'first' window
        And User selects the 'webchat' tab
        And let user wait for '2' seconds
        Then user click on Choose channels button
        And user select the 'WebchatChannel_1' and click on save
        Then user validate that the following indicators
            | totalChats  | 1 |
            | solvedChats | 1 |
        Then user validate that the Average 'close' Time

    @7830
    Scenario: Webchat Dashboard - All indicators
       When User login to the platform as 'admin' in 'first' window
        And user access 'Real Time Tools' menu and then 'Dashboards' submenu in 'first' window
        And User selects the 'webchat' tab
        And let user wait for '2' seconds
        Then user click on Choose channels button
        And user select the 'WebchatChannel_1' and click on save
        Then user get the count of all indicators
        Then client makes a conversation one day before via API with following configurations:
            | time | status | name                | email                   |
            | 1    | active | Active Conversation | active@conversation.com |
        And let user wait for '3' seconds
        When User access 'webchat' channel
        And let user wait for '7' seconds
        Then user validate message received successfully in 'Active' tab & 'New' status from day before
        When user logout of webchat channel in 'first' window
        Then client makes a conversation one day before via API with following configurations:
            | time | status | name                | email                   |
            | 1    | unread | Unread Conversation | unread@conversation.com |
        And let user wait for '3' seconds
        When user access the webChat channel in 'first' window
        And let user wait for '7' seconds
        Then user validate message received successfully in 'Unread' tab & '' status from day before
        And user access 'Real Time Tools' menu and then 'Dashboards' submenu in 'first' window
        And User selects the 'webchat' tab
        And let user wait for '2' seconds
        Then user click on Choose channels button
        And user select the 'WebchatChannel_1' and click on save
        Then user validate that the following indicators
            | totalChats     | 1 |
            | activeChats    | 0 |
            | solvedChats    | 0 |
            | waitingChats   | 1 |
            | abandonedChats | 0 |
         When User access 'webchat' channel
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact     | email                  |
            | second | first convo | first@conversation.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact      | email                   |
            | third  | second convo | second@conversation.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact     | email                  |
            | fourth | third convo | third@conversation.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact      | email                   |
            | fifth  | fourth convo | fourth@conversation.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        Then client close the first conversation
        Then user validate that conversation with 'first convo' is now in Unread Tab
        When user 'reply' the 2 conversation 'second convo'
        Then user back to active tab
        When user 'reply' the 3 conversation 'third convo'
        When user 'close' the 3 conversation 'third convo'
        And let user wait for '3' seconds
        Then user back to active tab
        When user 'spam' the 3 conversation 'fourth convo'
        And user access 'Real Time Tools' menu and then 'Dashboards' submenu in 'first' window
        And let user wait for '2' seconds
        And User selects the 'webchat' tab
        Then user validate that the following indicators
            | totalChats     | 5 |
            | activeChats    | 1 |
            | solvedChats    | 2 |
            | waitingChats   | 1 |
            | abandonedChats | 1 |

    @1062
    Scenario: Dashboard - Tickets - Agents
        Given User login to the platform as 'admin' in 'first' window
        When User access 'ticket' channel
        And let user wait for '1' seconds
        And user access 'Real Time Tools' menu and then 'Dashboards' submenu in 'first' window
        And User selects the 'agent' tab
        And User selects the 'ticket' tab
        Then verify agent is in 'Idle' state in 'ticket' tab

    @1063
    Scenario: Dashboard - Webchat - Agents
        Given User login to the platform as 'admin' in 'first' window
        When User access 'webchat' channel
        And user access 'Real Time Tools' menu and then 'Dashboards' submenu in 'first' window
        And User selects the 'agent' tab
        And User selects the 'webchat' tab
        Then verify agent is in 'IDLE' state in 'webchat' tab

    @1064 @healthcheck
    Scenario: Dashboard - Force Logout
        Given User login to the platform as 'admin' in 'first' window
        When  user access 'Voice Manager' menu and then '' submenu in 'first' window
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to 'dialer' tab during campaign edit
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And User logout with current session in 'first' window
        Given User login to the platform as 'Agent_1' in 'first' window
         When user login to the voice channel with following credentials:
            | campaign           | queue | extension | session |
            | OutboundCampaign_1 |       | 100       | first   |  
        And user dial the number '123456789' in ready state in 'first' window
        And user make a call in 'first' window
        And user state should be 'talking' in 'first' window
        Then User login to the platform as 'Supervisor_1' in 'second' window
        And user access 'Real Time Tools' menu and then 'Dashboards' submenu in 'second' window
        And user selects the 'voice Outbound' tab in 'second' window
        And user selects the agent tab in 'second' window
        Then user search for 'Agent One' in 'second' window
        And verify agent is in 'talking' state in voice tab in 'second' window
        And User select the action tab in 'second' window
        And User click on Force Logout and verify that agent is succesfully Force logout
        Then close the 'second' window session


    @6721 @inboundCall
    Scenario: Dashboard - Add an agent to a queue
        When User login to the platform as 'admin' in 'first' window
        And user access 'Real Time Tools' menu and then 'Dashboards' submenu in 'first' window
        Then User login to the platform as 'Agent_1' in 'second' window
        When user login to the voice channel with following credentials:
            | campaign | queue          | extension | session |
            |          | InboundQueue_1 | 100       | second  |
        And user state should be 'ready' in 'second' window
        Then User login to the platform as 'Agent_2' in 'third' window
        When user login to the voice channel with following credentials:
            | campaign | queue          | extension | session |
            |          | InboundQueue_2 | 100       | third   |
        And user state should be 'ready' in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking' in 'second' window
        Then user click on the Agent List icon of the queue 'InboundQueue_1'
        And user with in the modal select 'Agent_2'
        Then validate the notification is displayed 'You were added to "InboundQueue_1".' in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking' in 'third' window
        And let user wait for '3' seconds
        And user disconnects the call in 'third' window
        Then user state should be 'outcomes' in 'third' window
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'third' window
        And user state should be 'ready' in 'third' window
        Then user access 'CRM' menu and then 'CRM' submenu in 'first' window
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | Agent Two      |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777      |
            | agentName   | Agent_2        |
            | callOutcome | Ok             |
            | owner       | InboundQueue_1 |
            | termReason  | AGENT          |
        And user disconnects the call in 'second' window
        Then user state should be 'outcomes' in 'second' window
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        Then close the 'second' window session
        Then close the 'third' window session

        

   @6722 @inboundCall
    Scenario: Dashboard - Add and remove an agent to a queue
        When User login to the platform as 'admin' in 'first' window
        And user access 'Real Time Tools' menu and then 'Dashboards' submenu in 'first' window
        Then User login to the platform as 'Agent_1' in 'second' window
        When user login to the voice channel with following credentials:
            | campaign | queue          | extension | session |
            |          | InboundQueue_1 | 100       | second  |
        And user state should be 'ready' in 'second' window
        Then User login to the platform as 'Agent_2' in 'third' window
        When user login to the voice channel with following credentials:
            | campaign | queue          | extension | session |
            |          | InboundQueue_2 | 100       | third   |
        And user state should be 'ready' in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking' in 'second' window
        Then user click on the Agent List icon of the queue 'InboundQueue_1'
        And user with in the modal select 'Agent_2'
        Then validate the notification is displayed 'You were added to "InboundQueue_1".' in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking' in 'third' window
        And let user wait for '3' seconds
        And user disconnects the call in 'third' window
        Then user state should be 'outcomes' in 'third' window
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'third' window
        And user state should be 'ready' in 'third' window
        Then user access 'CRM' menu and then 'CRM' submenu in 'first' window
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | Agent Two      |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777      |
            | agentName   | Agent_2        |
            | callOutcome | Ok             |
            | owner       | InboundQueue_1 |
            | termReason  | AGENT          |
        And user disconnects the call in 'second' window
        Then user state should be 'outcomes' in 'second' window
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        Then user access 'Real Time Tools' menu and then 'Dashboards' submenu in 'first' window
        Then user click on the Agent List icon of the queue 'InboundQueue_1'
        And user with in the modal select 'Agent_2'
        Then validate the notification is displayed 'You were removed from "InboundQueue_1"' in 'third' window
        Then close the 'second' window session
        Then close the 'third' window session

    @6723
    Scenario: Dashboard - No agent login to queue
        When User login to the platform as 'admin' in 'first' window
        And user access 'Real Time Tools' menu and then 'Dashboards' submenu in 'first' window
        Then User login to the platform as 'Agent_1' in 'second' window
        Then User login to the platform as 'Agent_2' in 'third' window
        Then user click on the Agent List icon of the queue 'InboundQueue_1'
        Then user validate group and name modal is not visible
        Then close the 'second' window session
        Then close the 'third' window session

    @6340
    Scenario: Dashboard - Webchat - Break - Agents
        Given User login to the platform as 'Supervisor_1' in 'first' window
        And user access 'Users' menu and then 'Groups & users' submenu in 'first' window
        And Select 'Group_1' group
        When Create a new break with following configurations:
            | breakName | auth  | startTime | endTime | maxTime |
            | Break_AT  | false | 00:00     | 23:59   | 60      |
        When User login to the platform as 'Agent_1' in 'second' window
        Then agent login the webChat channel
        And request the break 'once' with auth 'false' in 'second' window
        Then user click on return button of webchat in 'second' window
        And user access 'Real Time Tools' menu and then 'Dashboards' submenu in 'first' window
        And User selects the 'agent' tab
        And User selects the 'webchat' tab
        Then verify agent is in 'Break' state in 'webchat' tab
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact       | email                   |
            | second | Sakshi Sharma | sharma.sakshi@tftus.com |
        And select received message in 'second' window
        Then verify agent is in 'Break' state in 'webchat' tab
        And user access 'My Profile' menu and then '' submenu in 'second' window
        Then verify agent is in 'Break' state in 'webchat' tab
        And request the break 'once' with auth 'false' in 'second' window
        And let user wait for '5' seconds
        Then verify agent is in 'IDLE' state in 'webchat' tab