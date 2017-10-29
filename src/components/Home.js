import React, { Component } from "react";
import Quiz from "../components/Quiz";
import Result from "../components/Result";
import { Loader } from "semantic-ui-react";
import Header from "../components/Header";
let quizQuestions = [];
class Home extends Component {
  constructor(props) {
    super(props);
    //Intialize state
    this.state = {
      isFetching: true,
      counter: 0,
      question: "",
      answerOptions: [],
      answer: "",
      questionCount: 0,
      userAnswerCount: 0,
      result: "",
      userName: this.props.params.username,
      timeInSeconds: 60
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.getAllQuestions = this.getAllQuestions.bind(this);
    this.setQuestionsState = this.setQuestionsState.bind(this);
    this.onClickNextButton = this.onClickNextButton.bind(this);
    this.decrimentTime = this.decrimentTime.bind(this);
    this.startQuizAgian = this.startQuizAgian.bind(this);
  }

  componentWillMount() {
    this.getAllQuestions();
  }
  getAllQuestions() {
    // Get all questions from open database
    let thisState = this;
    let url = null;

    if (this.props.params.id === null) {
      url =
        "https://opentdb.com/api.php?amount=" +
        this.props.params.count +
        "&category=" +
        this.props.params.id +
        "&type=multiple";
    } else {
      url =
        "https://opentdb.com/api.php?amount=" +
        this.props.params.count +
        "&type=multiple";
    }

    fetch(url)
      .then(resp => resp.json())
      .then(function(data) {
        quizQuestions = data.results;
        thisState.setQuestionsState();
      })
      .catch(function(error) {
        return error;
      });
  }
  setQuestionsState() {
    //Take all Answer Options
    const answerOptions = quizQuestions.map(question => {
      question.incorrect_answers.splice(
        Math.round(Math.random() * 3) + 1,
        0,
        question.correct_answer
      );
      return question.incorrect_answers;
    });

    // Set First Question and Answer Options

    this.setState({
      question: quizQuestions[0].question,
      answerOptions: answerOptions[0],
      questionCount: quizQuestions.length
    });
    this.timerID = setInterval(() => this.decrimentTime(), 1000);

    this.setState({
      isFetching: false
    });
  }

  decrimentTime() {
    if (this.state.timeInSeconds !== 0) {
      this.setState({
        timeInSeconds: this.state.timeInSeconds - 1
      });
    } else {
      this.onClickNextButton();
    }
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  //user selected a answer
  handleAnswerSelected(event) {
    this.setState({
      answer: event.currentTarget.value
    });
  }
  onClickNextButton() {
    this.setUserAnswer();
  }
  //Update user results based on the selected answer

  setUserAnswer() {
    if (this.state.counter + 1 < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(), 300);
    }
    let count = this.state.userAnswerCount;
    if (
      quizQuestions[this.state.counter].correct_answer === this.state.answer
    ) {
      count++;
    }
    this.setState({
      userAnswerCount: count
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;

    this.setState({
      timeInSeconds: 60,
      counter: counter,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].incorrect_answers,
      answer: ""
    });
  }

  setResults() {
    this.setState({ result: "Done" });
    clearInterval(this.timerID);
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        question={this.state.question}
        counter={this.state.counter}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
        onClickNextButton={this.onClickNextButton}
        timeInSeconds={this.state.timeInSeconds}
      />
    );
  }

  renderResult() {
    return (
      <Result
        questionTotal={quizQuestions.length}
        userAnswerCount={this.state.userAnswerCount}
        quizResult={this.state.result}
        userName={this.state.userName}
        startQuizAgian={this.startQuizAgian}
      />
    );
  }
  startQuizAgian() {
    const userName = this.props.params.username;
    this.context.router.transitionTo(`/category/${userName}`);
  }
  render() {
    if (this.state.isFetching) {
      return (
        <div>
          <Header />
          <div style={{ marginTop: 30 }}>
            <Loader active inline="centered" size="huge">
              Fetching Questions,Please wait..
            </Loader>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          {this.state.result ? this.renderResult() : this.renderQuiz()}
        </div>
      );
    }
  }
}
Home.contextTypes = {
  router: React.PropTypes.object
};
export default Home;
