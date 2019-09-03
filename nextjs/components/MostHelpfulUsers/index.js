import React from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'
import { apiGet } from '../../api'
import { MostHelpfulUserSignature } from '../UserSignature'

export default class extends React.Component {
  state = {
    loading: true,
    err: false,
    users: null,
  }

  componentDidMount() {
    this.getUsersOfTheWeek()
  }
  getUsersOfTheWeek = async () => {
    try {
      const { data } = await apiGet.getMostHelpfulUsers()
      this.setState({ users: data, loading: false, err: false })
    } catch (err) {
      console.error('[getUsersOfTheWeek]', { err })
      this.setState({ loading: false, err: true })
    }
  }
  render() {
    if (this.state.err) return null

    return (
      <Wrapper {...this.props}>
        <Title>Users of the week</Title>
        {this.state.loading && (
          <div
            css={`
              width: 100%;
            `}
          >
            <Spin
              css={`
                display: block;
                margin: 0 auto;
              `}
            />
          </div>
        )}
        {!this.state.loading &&
          this.state.users &&
          this.state.users.map((u, i) => (
            <MostHelpfulUserSignature
              key={i}
              id={u.id}
              username={u.username}
              full_name={u.full_name}
              reputation={u.reputation}
              avatar={u.avatar}
              css={`
                margin-bottom: 16px;
              `}
            />
          ))}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: white;
  padding: 0.9rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`

const Title = styled.h4`
  color: #000;
  font-weight: bold;
  font-size: 20px;
`
