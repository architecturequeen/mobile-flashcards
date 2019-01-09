import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Data from '../data/Data';

export default class QuizScreen extends React.Component {
  state = {
    currQu: 0,
    showAnswer: false,
    answers: { 0: 'incorrect' },
    endofQuiz: false
  };

  static navigationOptions = {
    title: 'Quiz'
  };

  getNoCorrectAnswers = () => {
    let total = 0;
    for (let key in this.state.answers) {
      if (this.state.answers[key] == 'correct') total++;
    }
    return total;
  };

  onPress = () => {
    this.setState({ showAnswer: true });
  };

  restartQuiz = () => {
    this.setState({
      currQu: 0,
      showAnswer: false,
      answers: { 0: 'incorrect' },
      endOfQuiz: false
    });
  };

  backToDeck = () => {};

  submitGuess = result => {
    const deck = this.props.deck || this.props.navigation.state.params.deck;
    this.setState({
      answers: { ...this.state.answers, [this.state.currQu]: result }
    });
    if (this.state.currQu < deck.questions.length - 1) {
      this.setState({
        currQu: this.state.currQu + 1,
        showAnswer: false
      });
    }
    if (this.state.currQu === deck.questions.length - 1) {
      this.setState({
        endOfQuiz: true
      });
    }
  };

  render() {
    const deck = this.props.deck || this.props.navigation.state.params.deck;
    const { navigate } = this.props.navigation;
    const totalQu = deck ? deck.questions.length : 0;
    //notification logic on completion of quiz
    if (this.state.endOfQuiz) {
      Data.clearLocalNotification().then(() => {
        Data.setLocalNotification();
      });
    }
    if (!deck) return <Text>No Questions on this deck</Text>;
    return (
      <View style={styles.container}>
        <Text>{deck.title} Quiz </Text>
        <Text>
          Question {this.state.currQu + 1} / {totalQu}
        </Text>
        {this.state.showAnswer === false ? (
          <View>
            <Text style={styles.text}>
              {deck.questions[this.state.currQu].question}
            </Text>
            <Button title="Show Answer" onPress={this.onPress} />
          </View>
        ) : (
          <View>
            <Text style={styles.text}>
              {deck.questions[this.state.currQu].answer}
            </Text>
            <Button
              disabled={this.state.endOfQuiz}
              title="Correct"
              onPress={() => this.submitGuess('correct')}
            />
            <Button
              disabled={this.state.endOfQuiz}
              title="Incorrect"
              onPress={() => this.submitGuess('incorrect')}
            />
          </View>
        )}
        <View>
          {this.state.endOfQuiz === true ? (
            <View>
              <Text style={styles.text}>You have reached end of quiz</Text>
              <Text style={styles.text}>
                You scored {this.getNoCorrectAnswers()} / {totalQu}
              </Text>
              <Button title="Restart Quiz" onPress={this.restartQuiz} />
              <Button
                title="Back to Deck"
                onPress={() => navigate('Deck', { deck: deck })}
              />
            </View>
          ) : (
            <Text />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: '#fff',
    fontSize: 40,
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20
  }
});

QuizScreen.defaultProps = {};
