import { AsyncStorage } from 'react-native';
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

AsyncStorage.setItem('decks', JSON.stringify(decks), () => {
  AsyncStorage.getItem('decks', (err, result) => {
    console.log(`deck object added: ${result}`);
  });
});

export const getDecks = () => {
  return AsyncStorage.getItem('decks');
};
