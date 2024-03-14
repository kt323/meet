Feature: Specify Number of Events

  Scenario: User specifies the number of events to display
    Given the user has opened the Meet app
    When the user selects a specific number of events to display, e.g., 10
    Then the app should display the specified number of events on the main page
    And the displayed events should not exceed the specified number
    
 Scenario: User resets the number of events to default
    Given the user has opened the Meet app and selected a specific number of events
    When the user resets the number of events to the default value
    Then the app should display the default number of events on the main page
    And the displayed events should not exceed the default number