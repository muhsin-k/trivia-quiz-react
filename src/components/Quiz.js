import React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
import Question from "../components/Question";
import Timer from "../components/Timer";
import QuestionOption from "../components/QuestionOption";
function Quiz(props) {
  function renderAnswerOptions(key) {
    return (
      <QuestionOption
        key={key}
        counter={props.counter}
        answerContent={key}
        answerType={key}
        answer={props.answer}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  return (
    <Grid className="container">
      <Grid.Column width={12}>

        <Question
          content={props.question}
          counter={props.counter + 1}
          timeInSeconds={props.timeInSeconds}
        />
      </Grid.Column>
      <Grid.Column width={4} >
     <Segment className="timerCard">
        <Timer timeInSeconds={props.timeInSeconds} />
        </Segment>
      </Grid.Column>
      <Grid.Column width={16}>
        {" "}
        <Segment>
          <ul className="answerOptions">
            {props.answerOptions.map(renderAnswerOptions)}
          </ul>
        </Segment>
      </Grid.Column>
      <Grid.Column width={16}>
        {" "}
        <Segment>
          <Button
            color="green"
            fluid
            size="large"
            onClick={props.onClickNextButton}
          >
            Next
          </Button>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

Quiz.propTypes = {
  answer: React.PropTypes.string.isRequired,
  answerOptions: React.PropTypes.array.isRequired,
  question: React.PropTypes.string.isRequired,
  questionTotal: React.PropTypes.number.isRequired,
  onAnswerSelected: React.PropTypes.func.isRequired
};

export default Quiz;
