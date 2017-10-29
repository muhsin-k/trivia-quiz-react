import React from "react";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import constant from "../Constants";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null
    };
    this.goToCategory = this.goToCategory.bind(this);
  }
  goToCategory(event) {
    event.preventDefault();
    const userName = this.state.userName;
    this.context.router.transitionTo(`/category/${userName}`);
  }
  renderStartButton() {
    return (
      <Button color="green" fluid size="large" type="submit">
        Start
      </Button>
    );
  }
  render() {
    return (
      <div className="login-form">
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src={constant.appLogo} /> Welcome to Trivia Quiz
            </Header>
            <Form size="large" onSubmit={e => this.goToCategory(e)}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="User name"
                  onChange={e =>
                    this.setState({
                      userName: e.target.value
                    })}
                  required
                />
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email"
                  type="email"
                />
                <Form.Input
                  fluid
                  icon="phone"
                  iconPosition="left"
                  placeholder="Phone number"
                  type="number"
                />

                {this.renderStartButton()}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
Login.contextTypes = {
  router: React.PropTypes.object
};
export default Login;
