@portableAgent @group_9
Feature: Portable Agent

    Background: portable agent is Logged In
        Given reset data set

    @976
    Scenario: Portable Agent - Enter a break with authorization requiremen
        Given User login to the platform as 'admin' with 'normal' view with extension '' in 'first' window
        Then clean active calls
        And Access the 'Users & Groups' menu
        And Select 'Group_1' group
        When Create a new break with following configurations:
            | breakName | auth | startTime | endTime | maxTime | comments | billing |
            | Break_AT  | true | 00:00     | 23:59   | 60      | false    | false   |
        Then Add agent 'Agent Three' to the group
        Given User login to the platform as 'Agent_3' with 'portable' view with extension '100' in 'second' window
        When user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in portable view in 'second' window
        And user make a manual call to '9998887776' in portable view in 'second' window
        And user state should be 'Talking' in portable view in 'second' window
        Then user selects the option 'Breaks' in portable view in 'second' window
        And request a break in portable view in 'second' window
        And validate break approval request and clicks on 'Authorize' button
        Then user selects the option 'Notifications' in portable view in 'second' window
        And user verifies if a 'After call Actions' was created in portable view in 'second' window
        When user closes the panel in portable view in 'second' window
        Then user select 'Hang up' button in portable view in 'second' window
        And user state should be 'Wrap up' in portable view in 'second' window
        Then user submits the outcome in portable view in 'second' window
        And validate that the agent enters the previously selected break in 'second' window

    @974
    Scenario: Portable Agent - Personal Callback
        Given User login to the platform as 'admin' with 'normal' view with extension '' in 'first' window
        Then clean active calls
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And select the Personal Callback '1'
        When user navigates to callOutcome
        Then check if outcome 'Callback' exist
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits outcome with following configurations:
            | group   | Call Again Later |
            | outcome | Callback         |
            | option  | personal         |
            | agent   | Agent Two        |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled for 'OutboundCampaign_1' campaign
        Given User login to the platform as 'Agent_3' with 'portable' view with extension '100' in 'second' window
        When user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in portable view in 'second' window
        Then user selects the option 'Personal callbacks' in portable view in 'second' window
        Then user selects a callback from the list and make a call in 'second' window
        And user state should be 'Talking' in portable view in 'second' window
        Then user select 'Hang up' button in portable view in 'second' window
        And user state should be 'Wrap up' in portable view in 'second' window
        Then user submits the outcome in portable view in 'second' window
        And user state should be 'Ready' in portable view in 'second' window

    @973
    Scenario: Portable Agent - Transfer to IVR
        Given User login to the platform as 'admin' with 'normal' view with extension '' in 'first' window
        When user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in portable view in 'first' window
        And user make a manual call to '9998887776' in portable view in 'first' window
        And user state should be 'Talking' in portable view in 'first' window
        Then user select 'Transfer' button in portable view in 'first' window
        Then user select option 'IVR' for transfer call in 'first' window
        And user selects 'IVR_1' from IVR menu in 'first' window
        And user select plus icon and select 'Immediate transfer' option in 'first' window
        And user state should be 'Wrap up' in portable view in 'first' window
        Then user submits the outcome in portable view in 'first' window
        And user state should be 'Ready' in portable view in 'first' window

    @975
    Scenario: Portable Agent - Enter a break without authorization requirement
        Given User login to the platform as 'admin' with 'normal' view with extension '' in 'first' window
        Then clean active calls
        And Access the 'Users & Groups' menu
        And Select 'Group_1' group
        When Create a new break with following configurations:
            | breakName | auth  | startTime | endTime | maxTime |
            | Break_AT  | false | 00:00     | 23:59   | 60      |
        Then Add agent 'Agent Two' to the group
        Given User login to the platform as 'Agent_2' with 'portable' view with extension '100' in 'second' window
        When user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in portable view in 'second' window
        And user make a manual call to '9998887776' in portable view in 'second' window
        And user state should be 'Talking' in portable view in 'second' window
        Then user selects the option 'Breaks' in portable view in 'second' window
        And request a break in portable view in 'second' window
        Then user selects the option 'Notifications' in portable view in 'second' window
        And user verifies if a 'After call Actions' was created in portable view in 'second' window
        When user closes the panel in portable view in 'second' window
        Then user select 'Hang up' button in portable view in 'second' window
        And user state should be 'Wrap up' in portable view in 'second' window
        Then user submits the outcome in portable view in 'second' window
        And validate that the agent enters the previously selected break in 'second' window

    @969
    Scenario: Portable Agent - Outbound Call
        When User login to the platform as 'Agent_1' with 'portable' view with extension '100' in 'first' window
        When user selects 'OutboundCampaign_1' campaign with 'No' queue in portable view in 'first' window
        And user make a manual call to '9998887776' in portable view in 'first' window
        And user state should be 'Talking' in portable view in 'first' window
        Then user select 'Hang up' button in portable view in 'first' window
        And user state should be 'Wrap up' in portable view in 'first' window
        Then user submits the outcome in portable view in 'first' window
        And user state should be 'Ready' in portable view in 'first' window

    @970
    Scenario: Portable Agent - Inbound Call
        When User login to the platform as 'Agent_3' with 'portable' view with extension '100' in 'first' window
        When user selects 'No' campaign with 'InboundQueue_1' queue in portable view in 'first' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '5' seconds
        And user state should be 'Talking' in portable view in 'first' window
        Then user select 'Hang up' button in portable view in 'first' window
        And user state should be 'Wrap up' in portable view in 'first' window
        And user submits the outcome in portable view in 'first' window
        Then user state should be 'Ready' in portable view in 'first' window

    @971
    Scenario: Portable Agent - Transfer to Remote
        When User login to the platform as 'Agent_3' with 'portable' view with extension '100' in 'first' window
        When user selects 'OutboundCampaign_1' campaign with 'No' queue in portable view in 'first' window
        And user make a manual call to '9998887776' in portable view in 'first' window
        And user state should be 'Talking' in portable view in 'first' window
        Then user select 'Transfer' button in portable view in 'first' window
        Then user select option 'Manual call' for transfer call in 'first' window
        When user enters the destination number '9998887776' in 'first' window
        And user select plus icon and select 'Call destination' option in 'first' window
        Then user state should be 'Talking' at Destination in 'first' window
        When user select plus icon and select 'Transfer client' option in 'first' window
        And user state should be 'Wrap up' in portable view in 'first' window
        And user submits the outcome in portable view in 'first' window
        Then user state should be 'Ready' in portable view in 'first' window

    @972
    Scenario: Portable Agent - Transfer to Queue
        When User login to the platform as 'Agent_3' with 'portable' view with extension '100' in 'first' window
        When user selects 'OutboundCampaign_1' campaign with 'No' queue in portable view in 'first' window
        And user make a manual call to '9998887776' in portable view in 'first' window
        And user state should be 'Talking' in portable view in 'first' window
        Then user select 'Transfer' button in portable view in 'first' window
        Then user select option 'Queue inbound' for transfer call in 'first' window
        When user selects transfer queue 'InboundQueue_2' in 'first' window
        And user select plus icon and select 'Immediate transfer' option in 'first' window
        Then user submits the outcome in portable view in 'first' window
        And user state should be 'Ready' in portable view in 'first' window
