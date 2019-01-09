import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'Flashcards:notifications';

let decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

function createNotification() {
  return {
    title: 'Complete a Quiz',
    body: "Don't forget to complete a quiz today!",
    ios: {
      sound: true
    }
  };
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            let dayAfter = new Date();
            dayAfter.setDate(dayAfter.getDate() + 1);
            dayAfter.setHours(17);
            dayAfter.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: dayAfter,
              repeat: 'day'
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}

export const loadDecks = () => {
  return AsyncStorage.removeItem('decks', JSON.stringify(decks));
};
export const getDecks = () => {
  return AsyncStorage.getItem('decks');
};

export const createDeck = title => {
  let decks = {
    [title]: { title: title, questions: [] }
  };
  return AsyncStorage.mergeItem('decks', JSON.stringify(decks));
};

export const createQuestion = (question, answer, title) => {
  console.log('CREATE QU CALLED');
  return AsyncStorage.getItem('decks', (err, result) => {
    const decks = JSON.parse(result);
    let questions = decks[title].questions;
    questions.push({ question: question, answer: answer });
    let updatedDecks = { [title]: { title: title, questions: questions } };
    console.log('UPDATED ', updatedDecks);
    return AsyncStorage.mergeItem('decks', JSON.stringify(updatedDecks));
  });
};
