import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor } from '@testing-library/react';
import App from '../App';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('When the details of an event are hidden by default.', ({ given, when, then }) => {
      let AppComponent;
      given('the main page is open', () => {
          AppComponent = render(<App />);
      });

      when('the app displays a list of event', async () => { 
          await waitFor(() => {
              expect(AppComponent.queryAllByRole('listitem').length).toBeGreaterThan(0);
          });
      });

      then('the event details are hidden by default', () => {
          expect(AppComponent.queryByText('Event details')).not.toBeInTheDocument(); 
      });
  });

    test('User clicks to show event details.', ({ given, when, then }) => {
        let EventComponent;
        let allEvents;
        given('there is an event with hidden details', async () => {
            allEvents = await getEvents(); 
            
        });

        when('the user clicks on the event to Show Details', async () => {
            // await waitFor(() => {
            //     userEvent.click(EventComponent.getByText('Show Details'));
            // });
            EventComponent = render(<Event event={allEvents[0]} />);
            const user = userEvent.setup();
            const button = EventComponent.queryByText('Show Details');
            await user.click(button);
        });

        then('the app should display the details of the event', () => {
            expect(EventComponent.queryByText('Hide Details')).toBeInTheDocument();
        });
    });


    test('User clicks to hide event details.', ({ given, when, then }) => {
        let EventComponent;
        let allEvents;
        let user;
        let button;
        given('there is an event with displayed details', async () => {
            allEvents = await getEvents();
            // EventComponent = render(<Event event={allEvents[0]} />);
            // userEvent.click(EventComponent.getByText('Show Details'));
            EventComponent = render(<Event event={allEvents[0]} />);
            user = userEvent.setup();
            button = EventComponent.queryByText('Show Details');
            await user.click(button);
        });

        when('the user clicks on the event to hide details again', async () => {
            // await waitFor(() => {
            //     userEvent.click(EventComponent.getByText('Hide Details'));
            // });
            EventComponent = render(<Event event={allEvents[0]} />);
            user = userEvent.setup();
            button = EventComponent.queryByText('Hide Details');
            await user.click(button);
        });

        then('the app should hide the details of the event', () => {
            expect(EventComponent.queryByText('details')).not.toBeInTheDocument();
        });
    });
});
