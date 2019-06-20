import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import RecentActivities from '../RecentActivities'

const Profile = ({
  avatar,
  reputation,
  answers,
  questions,
  biography,
  role_in_company,
  company,
  company_headquarters,
  full_name,
}) => {
  return (
    <Wrapper>
      <LeftSide>
        <AvatarWrapper>
          <Avatar src={avatar} alt="avatar" />
        </AvatarWrapper>
        <Reputation>
          <span>{reputation}</span> reputation
        </Reputation>
        <div>
          <CountBox>
            Answers <span>{answers.length}</span>
          </CountBox>
          <CountBox>
            Questions <span>{questions.length}</span>
          </CountBox>
        </div>
      </LeftSide>
      <RightSide>
        <div>
          <UserFullName>{full_name}</UserFullName>
          <UserCompanyWrapper>
            <UserHeadline>{role_in_company}</UserHeadline>
            <span> at </span>
            <span>{company}</span>
            <span>{company_headquarters}</span>
          </UserCompanyWrapper>
          <UserBio>{biography}</UserBio>
        </div>
        <RecentActivities type="Questions" typeCounts={questions.length} data={questions} />
      </RightSide>
    </Wrapper>
  )
}
Profile.propTypes = {
  id: PropTypes.number.isRequired,
  reputation: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  full_name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  company_headquarters: PropTypes.string.isRequired,
  role_in_company: PropTypes.string.isRequired,
  biography: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
}

const Wrapper = styled.div`
  display: flex;
  @media screen and (max-width: 740px) {
    flex-direction: column;
  }
`

const LeftSide = styled.div`
  width: 200px;
  margin-right: 32px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 740px) {
    margin: 0 auto;
  }
`

const AvatarWrapper = styled.div`
  width: 200px;
`

const Avatar = styled.img`
  img {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
`

const Reputation = styled.div`
  background-color: red;
  padding: 8px;
  text-align: center;
  font-size: 18px;
  margin-bottom: 32px;
  @media screen and (max-width: 740px) {
    margin-bottom: 16px;
  }
`

const CountBox = styled.div`
  border: 1px solid ${props => props.theme.darkGrey};
  padding: 8px;
  margin-bottom: 8px;
  font-size: 18px;
`

const RightSide = styled.div``
const UserCompanyWrapper = styled.div``

const UserHeadline = styled.span`
  color: $lightBlack;
  font-size: 20px;
  line-height: 28px;
`
const UserFullName = styled.span`
  font-size: 30px;
  line-height: 36px;
`
const UserBio = styled.span`
  font-size: 16px;
  line-height: 22px;
`
export default Profile
