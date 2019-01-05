import React from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

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
    this.setState({
      answers: { ...this.state.answers, [this.state.currQu]: result }
    });
    if (this.state.currQu < this.props.deck.questions.length - 1) {
      this.setState({
        currQu: this.state.currQu + 1,
        showAnswer: false
      });
    }
    if (this.state.currQu === this.props.deck.questions.length - 1) {
      this.setState({
        endOfQuiz: true
      });
    }
  };

  render() {
    const { deck } = this.props;
    const totalQu = deck.questions.length;
    return (
      <ScrollView style={styles.container}>
        <Text>{deck.title} Quiz!! </Text>
        <Text>
          Question {this.state.currQu + 1} / {totalQu}
        </Text>
        {this.state.showAnswer === false ? (
          <View>
            <Text>{deck.questions[this.state.currQu].question}</Text>
            <Button title="Show Answer" onPress={this.onPress} />
          </View>
        ) : (
          <View>
            <Text>{deck.questions[this.state.currQu].answer}</Text>
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
              <Text>You have reached end of quiz</Text>
              <Text>
                You scored {this.getNoCorrectAnswers()} / {totalQu}
              </Text>
              <Button title="Restart Quiz" onPress={this.restartQuiz} />
              <Button title="Back to Deck (TODO)" onPress={this.backToDeck} />
            </View>
          ) : (
            <Text />
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});

QuizScreen.defaultProps = {
  deck: {
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
  }
};
