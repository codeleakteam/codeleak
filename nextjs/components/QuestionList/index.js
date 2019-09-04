import React from 'react'
import PropTypes from 'prop-types'
import { Skeleton } from 'antd'
import QuestionSummary from '../QuestionSummary'
import Card from '../Card'

class QuestionList extends React.Component {
  state = {
    // Most recent Y of the last item in the question list
    prevY: 0,
    lastItemRef: null,
    lastItemRefFakeId: null,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.lastItemRefFakeId !== this.state.lastItemRefFakeId) {
      this.attachInteresectionObserverListener()
    }
  }

  attachInteresectionObserverListener = () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    var options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }
    // When lastListItemRef y is reached the handleObserver fn is called
    this.observer = new IntersectionObserver(this.handleObserver, options)
    this.observer.observe(this.state.lastItemRef)
  }

  handleObserver = entities => {
    const y = entities[0].boundingClientRect.y
    if (this.state.prevY > y) {
      if (this.props.haveNextPage) {
        this.props.fetchMoreQuestions(this.props.currentPage + 1)
      }
    }
    this.setState({ prevY: y })
  }

  setLastItemRef = ({ lastItemRef, lastItemRefFakeId }) => {
    if (lastItemRefFakeId !== this.state.lastItemRefFakeId) {
      this.setState({ lastItemRef, lastItemRefFakeId })
    }
  }

  render() {
    const questionToBeObserved = this.props.questions[this.props.questions.length - 3]
    const shouldObserveLastItem = questionToBeObserved === undefined

    return (
      <div>
        {this.props.questions.map((question, i) => {
          const refCondition = shouldObserveLastItem
            ? i === this.props.questions.length - 1
            : i === this.props.questions.length - 3
          return (
            <QuestionSummary
              id={question.id}
              score={question.score}
              viewedTimes={question.viewed_times}
              answers={question.answers}
              comments={question.comments}
              title={question.title}
              description={question.description}
              createdAt={question.created_at}
              tags={question.tags}
              authorUsername={question.author.username}
              authorFullName={question.author.full_name}
              authorId={question.author.id}
              questionId={question.id}
              slug={question.slug}
              authorAvatar={question.author.avatar}
              repositoryUrl={question.repository_url}
              setLastItemRef={refCondition ? this.setLastItemRef : undefined}
            />
          )
        })}
        <Card
          css={`
            display: ${this.props.isFetchingQuestions ? 'block' : 'none'};
          `}
        >
          <Skeleton avatar />
        </Card>
      </div>
    )
  }
}

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  isFetchingQuestions: PropTypes.bool.isRequired,
  haveNextPage: PropTypes.bool.isRequired,
  fetchMoreQuestions: PropTypes.func.isRequired,
}

export default QuestionList
