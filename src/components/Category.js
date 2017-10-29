import React from "react";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Segment,
  Loader
} from "semantic-ui-react";
import Header from "../components/Header";
import constant from "../Constants";
let categoryOptions = [];
let questionCountList = [
  { key: "5", value: "5", text: "5" },
  { key: "10", value: "10", text: "10" },
  { key: "15", value: "15", text: "15" },
  { key: "20", value: "20", text: "20" }
];
class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      selectedCategory: null,
      selectedCategoryId: null,
      questionCount: 20
    };
    this.getAllCategories = this.getAllCategories.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.gotoQuizSection = this.gotoQuizSection.bind(this);
    this.changeQuestionCount = this.changeQuestionCount.bind(this);
  }
  componentWillMount() {
    this.getAllCategories();
  }
  getAllCategories() {
    // Get all catgeories from open database
    let thisState = this;
    fetch(constant.categoryUrl)
      .then(resp => resp.json())
      .then(function(data) {
        let triviaCaetgories = data.trivia_categories;

        categoryOptions = triviaCaetgories.map(category => {
          return {
            key: category.id,
            value: category.name,
            text: category.name
          };
        });
        thisState.setState({
          isFetching: false
        });
      })
      .catch(function(error) {
        return error;
      });
  }
  changeCategory(event, data) {
    let selectedCategory = categoryOptions.find(
      item => item.value === data.value
    );
    this.setState({
      selectedCategory: selectedCategory.value,
      selectedCategoryId: selectedCategory.key
    });
  }
  changeQuestionCount(event, data) {
    let selectedQuestionCount = questionCountList.find(
      item => item.value === data.value
    );
    this.setState({
      questionCount: selectedQuestionCount.value
    });
  }
  gotoQuizSection(event) {
    event.preventDefault();
    const userName = this.props.params.username;
    const categoryId = this.state.selectedCategoryId;
    const questionCount = this.state.questionCount;
    this.context.router.transitionTo(
      `/home/${userName}/${categoryId}/${questionCount}`
    );
  }
  render() {
    if (this.state.isFetching) {
      return (
        <div className="App">
          <Header />
          <div style={{ marginTop: 30 }}>
            <Loader active inline="centered" size="huge">
              Fetching Catgories,Please wait..
            </Loader>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Header />
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
                <Form size="large" onSubmit={e => this.gotoQuizSection(e)}>
                  <Segment stacked>
                    <Form.Field>
                      <label className="categoryLabel">
                        Please Select a Category
                      </label>
                      <Dropdown
                        style={{ marginTop: 20 }}
                        placeholder="Any Category"
                        fluid
                        search
                        selection
                        options={categoryOptions}
                        onChange={this.changeCategory}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label className="categoryLabel">Question Count</label>
                      <Dropdown
                        placeholder="20"
                        fluid
                        search
                        selection
                        options={questionCountList}
                        onChange={this.changeQuestionCount}
                      />
                    </Form.Field>
                    <Button
                      style={{ marginTop: 20 }}
                      color="green"
                      fluid
                      size="large"
                      type="submit"
                    >
                      Play
                    </Button>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          </div>
        </div>
      );
    }
  }
}
Category.contextTypes = {
  router: React.PropTypes.object
};
export default Category;
