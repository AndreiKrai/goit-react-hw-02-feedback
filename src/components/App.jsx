import Title from './Title/Title';
import React, { Component } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';

export default class App extends Component {
  state = {
    good: 1,
    neutral: 2,
    bad: 3,
  };

  handleClick = e => {
    this.setState(prevState => {
      console.log(e.target.name);
      return { [e.target.name]: (prevState[e.target.name] += 1) };
    });
  };

  countTotalFeedback() {
    const aray = Object.values(this.state);
    let sum = aray.reduce(myFunction);

    function myFunction(total, value) {
      return total + value;
    }
    return sum;
  }

  countPositiveFeedbackPercentage(){
    return (this.state.good * 100/this.countTotalFeedback()).toFixed()
  }

  render() {
    const arr = Object.keys(this.state);

    return (
      <>
        <Title title="Please leave feedback" />
        {arr.map(feedbackState => (
          <button
            key={feedbackState}
            name={feedbackState}
            onClick={this.handleClick}
            type="button"
          >
            {feedbackState}
          </button>
        ))}

        <Title title="Statistics" />
        <Statistics
          good={this.state.good}
          neutral={this.state.neutral}
          bad={this.state.neutral}
          total={this.countTotalFeedback()}
          positivePercentage={this.countPositiveFeedbackPercentage()}
        ></Statistics>
      </>
    );
  }
}

