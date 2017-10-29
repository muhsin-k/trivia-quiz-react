import React from "react";
import { Button, Segment } from "semantic-ui-react";
function Result(props) {
  return (
    <div className="container">
      <Segment>
        <div className="resultHeaderText">Time up!</div>
        <div className="congratsText">
          Congratulations <strong>{props.userName}</strong>
        </div>
        <div className="congratsText">
          You got <strong>{props.userAnswerCount}</strong>/<strong>{props.questionTotal}</strong>{" "}
          answers right
        </div>
      </Segment>
      <Button
        style={{ marginTop: 30 }}
        color="green"
        fluid
        size="large"
        onClick={props.startQuizAgian}
      >
        Try Again
      </Button>
    </div>
  );
}

Result.propTypes = {
  quizResult: React.PropTypes.string.isRequired
};

export default Result;
