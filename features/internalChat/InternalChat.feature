@internalChat @group_11
Feature: Internal chat tests

    Background: reset data set
        Given reset data set
        
    @858
    Scenario: Agent - No access
         Given User login to the platform as 'admin'
        Then clean active calls
        When user access 'profile manager' menu
        And user selects 'agent' tab
        And user selects 'no' chat access
        And user selects following configurations and save the settings:
            | tab   | chatAccess |
            | agent | no         |
        And user login to the platform with 'Agent_1' account in 'second' window
        And user select messaging option in 'second' window
        Then user should not have chat access in 'second' window

    @859
    Scenario: Agent - Simple access
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access 'profile manager' menu
        And user selects 'agent' tab
        And user selects 'simple' chat access
        And user selects following configurations and save the settings:
            | tab   | chatAccess |
            | agent | simple         |
        And let user wait for '30' seconds
        # Added step
        And user login to the platform with 'Agent_1' account in 'second' window
        Then verify 'admin' is online for another agent account in 'second' window


    @860
    Scenario: Agent - Super access
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access 'profile manager' menu
        And user selects 'agent' tab
        And user selects 'supervisor' chat access
        And user selects following configurations and save the settings:
            | tab   | chatAccess |
            | agent | supervisor        |
        And let user wait for '30' seconds
        And user login to the platform with 'Agent_1' account in 'second' window
        # Added step
        And user login to the platform with 'Agent_2' account in 'third' window
        Then verify 'Agent_1' is online for another agent account in 'third' window

    @861
    Scenario: Send broadcast message - All
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access 'profile manager' menu
        And user selects 'agent' tab
        And user enables broadcast messages
        And user selects following configurations and save the settings:
            | tab   | chatAccess |
            | agent | simple         |
        And user login to the platform with 'Agent_1' account in 'second' window
        And user selects send broadcast message option in 'second' window
        And user selects send broadcast message to 'all' agent option in 'second' window
        And user verifies broadcast message is send to agent

    @862 @healthcheck
    Scenario: Send broadcast message - Particular Agent
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access 'profile manager' menu
        And user selects 'agent' tab
        And user enables broadcast messages
        # And user save the settings
        And user selects following configurations and save the settings:
            | tab   | chatAccess |
            | agent | simple         |
        And user login to the platform with 'Agent_1' account in 'second' window
        And user selects send broadcast message option in 'second' window
        And user selects send broadcast message to particular 'admin' agent option in 'second' window
            | subject |  |
            | message |  |
        And user verifies broadcast message is send to agent in 'second' window

    @863
    Scenario: Send private message
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access 'profile manager' menu
        And user selects 'agent' tab
        And user selects 'supervisor' chat access
        # And user save the settings
        And user selects following configurations and save the settings:
            | tab   | chatAccess |
            | agent | supervisor         |
        And user login to the platform with 'Agent_1' account in 'second' window
        And user select messaging option in 'second' window
        And user selects user from users tab in 'second' window
        And user send a message in 'second' window
        Then user should see the sent message

    @6260
    Scenario: Mark all notifications as read - Broadcast (Particular agent message)
         Given User login to the platform as 'admin'
        Then clean active calls
        When user selects send broadcast message option in 'first' window
        Then user login to the platform with 'Agent_1' account in 'second' window
        Then user get the counter of message in 'second' window
        And user selects send broadcast message to particular 'Agent' agent option in 'first' window
            | subject | Quote of the day                                                                     |
            | message | Learn as if you will live forever, live like you will die tomorrow. — Mahatma Gandhi |
        Then user verify counter is increased in 'second' window
        Then user access the notification in 'second' window
        And user confirm that the top notification is unread in 'second' window
        And user confirm mark all read button is enabled and click it in 'second' window
        Then user confirm that mark all read button is disabled in 'second' window
        And user verify message is visible 'There are no unread notifications' in 'second' window
        Then user confirm that the notifications counter is no longer presented in 'second' window

    @6261
    Scenario: Mark all notifications as read - Broadcast (All agent message)
        Given User login to the platform as 'admin'
        Then clean active calls
        When user selects send broadcast message option in 'first' window
         Then user login to the platform with 'Agent_1' account in 'second' window
        Then user get the counter of message in 'second' window
        And user selects send broadcast message to particular 'All' agent option in 'first' window
            | subject | Quote of the day                                                                     |
            | message | Learn as if you will live forever, live like you will die tomorrow. — Mahatma Gandhi |
        Then user verify counter is increased in 'second' window
        Then user access the notification in 'second' window
        And user confirm that the top notification is unread in 'second' window
        And user confirm mark all read button is enabled and click it in 'second' window
        Then user confirm that mark all read button is disabled in 'second' window
        And user verify message is visible 'There are no unread notifications' in 'second' window
        Then user confirm that the notifications counter is no longer presented in 'second' window

    @6278
    Scenario: Mark all notifications as read - Break authorization
        Given User login to the platform as 'admin'
        Then clean active calls
        When Access the 'Users & Groups' menu in 'first' window
        And Select 'Group_1' group
        Then user get the counter of message
        When Create a new break with following configurations:
            | breakName | auth | startTime | endTime | maxTime |
            | Break_AT  | true | 00:00     | 23:00   | 60      |
        Then Add agent 'Agent One' to the group
        When user login to the platform with 'Agent_1' account in 'second' window
        And request the break with auth 'true' in 'second' window
        Then user verify counter is increased in 'first' window
        Then user access the notification in 'second' window
        And user confirm that the top notification is unread in 'second' window
        And user confirm mark all read button is enabled and click it in 'second' window
        Then user confirm that mark all read button is disabled in 'second' window
        And user verify message is visible 'There are no unread notifications' in 'second' window
        Then user confirm that the notifications counter is no longer presented in 'second' window

    @6280
    Scenario: Mark all notifications as read - Suggestion
        Given User login to the platform as 'Supervisor_1'
        Then clean active calls
        Then user get the counter of message
        When user login to the platform with 'Agent_1' account in 'second' window
        And Access the 'Agent Quality' menu in 'second' window
        And Select 'Suggestions' tab from agent quality page in 'second' window
        And user make a suggest message in 'second' window
        Then user verify counter is increased in 'first' window
        When user access the notification in 'second' window
        Then user confirm that the top notification is unread in 'second' window
        And user confirm mark all read button is enabled and click it in 'second' window
        Then user confirm that mark all read button is disabled in 'second' window
        And user verify message is visible 'There are no unread notifications' in 'second' window
        Then user confirm that the notifications counter is no longer presented in 'second' window
