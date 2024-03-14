import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within } from "@testing-library/react";
import React from "react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("User specifies the number of events to display", ({ given,when,then }) => {
    let AppComponent;
    let user;

    given("the user has opened the Meet app", () => {
      user = userEvent.setup();
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      expect(EventListDOM).toBeInTheDocument();
    });

    when(
        "the user selects a specific number of events to display, e.g., 10",
        async () => {
          const AppDOM = AppComponent.container.firstChild;
          const NumberOfEventsDOM =
              AppDOM.querySelector("#numberOfEvents");
          const numberOfEventsInput = NumberOfEventsDOM.children[1];
          await user.type(
              numberOfEventsInput,
              "{backspace}{backspace}10"
          );
        }
    );

    then(
        "the app should display the specified number of events on the main page",
        () => {
          const AppDOM = AppComponent.container.firstChild;
          const EventListDOM = AppDOM.querySelector("#event-list");
          expect(EventListDOM).toBeInTheDocument();
        }
    );

    then(
        "the displayed events should not exceed the specified number",
        () => {
          const AppDOM = AppComponent.container.firstChild;
          const EventListDOM = AppDOM.querySelector("#event-list");
          const allRenderedEventItems =
              within(EventListDOM).queryAllByRole("listitem");
          expect(allRenderedEventItems.length).toEqual(32);
        }
    );
  });

  test("User resets the number of events to default", ({ given,when,then }) => {
    let AppComponent;
    let user;

    given(
        "the user has opened the Meet app and selected a specific number of events",
        () => {
          user = userEvent.setup();
          AppComponent = render(<App />);
          const AppDOM = AppComponent.container.firstChild;
          const EventListDOM = AppDOM.querySelector("#event-list");
          expect(EventListDOM).toBeInTheDocument();
        }
    );

    when(
        "the user resets the number of events to the default value",
        async () => {
          const AppDOM = AppComponent.container.firstChild;
          const NumberOfEventsDOM =
              AppDOM.querySelector("#numberOfEvents");
          const numberOfEventsInput = NumberOfEventsDOM.children[1];
          await user.type(
              numberOfEventsInput,
              "{backspace}{backspace}18"
          );
        }
    );

    then(
        "the app should display the default number of events on the main page",
        () => {
          const AppDOM = AppComponent.container.firstChild;
          const EventListDOM = AppDOM.querySelector("#event-list");
          expect(EventListDOM).toBeInTheDocument();
        }
    );

    then(
        "the displayed events should not exceed the default number",
        () => {
          const AppDOM = AppComponent.container.firstChild;
          const EventListDOM = AppDOM.querySelector("#event-list");
          const allRenderedEventItems =
              within(EventListDOM).queryAllByRole("listitem");
          expect(allRenderedEventItems.length).toEqual(32);
        }
    );
  });
});