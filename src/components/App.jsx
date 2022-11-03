import Section from './Section/Section';
import React, { Component } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import NotificationMessage from './NotificationMessage/NotificationMessage';

export default class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleClick = e => {
    this.setState(prevState => {
      // console.log(e.target.name);
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

  countPositiveFeedbackPercentage() {
    return ((this.state.good * 100) / this.countTotalFeedback()).toFixed();
  }

  render() {
    const arr = Object.keys(this.state);

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={arr}
            onLeaveFeedback={this.handleClick}
          ></FeedbackOptions>
        </Section>

        <Section title="Statistics">
          {this.countTotalFeedback() > 0 ? 
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            ></Statistics>
           : 
            <NotificationMessage />
          }
        </Section>
      </>
    );
  }
}
