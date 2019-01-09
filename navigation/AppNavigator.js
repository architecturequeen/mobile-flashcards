import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import QuizScreen from '../screens/QuizScreen';
import DeckScreen from '../screens/DeckScreen';
import DeckListScreen from '../screens/DeckListScreen';
import NewDeckScreen from '../screens/NewDeckScreen';
import NewQuestionScreen from '../screens/NewQuestionScreen';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Deck: { screen: DeckScreen },
    DeckList: { screen: DeckListScreen },
    Quiz: { screen: QuizScreen },
    NewDeck: { screen: NewDeckScreen },
    NewQuestion: { screen: NewQuestionScreen }
  })
);
