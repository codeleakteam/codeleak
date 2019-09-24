import React from 'react'
import { Avatar, Button } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import RecentActivities from '../RecentActivities'
import Card from '../Card'
import CustomIcon from '../../assets/icons/index'
import Link from 'next/link'

const Profile = ({ userData, codeleakUser, changeTab, activeTab }) => {
  let {
    id,
    username,
    avatar,
    reputation,
    answers,
    questions,
    biography,
    full_name,
    location,
    looking_for_job,
    website_url,
    twitter_username,
    github_username,
  } = userData

  const shouldRenderFirstUserSection = location || looking_for_job || !codeleakUser

  return (
    <Wrapper>
      <LeftSide>
        <AvatarWrapper>
          {avatar ? (
            <CustomAvatar linkToImage={avatar} alt={username} />
          ) : (
            <StyledLetterAvatar shape="square" size={246}>
              {getAvatarLetter(username, full_name)}
            </StyledLetterAvatar>
          )}
        </AvatarWrapper>
        {full_name && <UserFullName>{full_name}</UserFullName>}
        <Username>@{username}</Username>
        {biography && <UserBio>{biography}</UserBio>}
        {codeleakUser && codeleakUser.id === id && (
          <Link href="/profile/edit">
            <Button type="default">Edit Profile</Button>
          </Link>
        )}

        <Break />
        <div>
          <UserSection>
            <Row>
              <UserSectionTitle>REPUTATION</UserSectionTitle>
            </Row>
            <ReputationCounter>{reputation}</ReputationCounter>
          </UserSection>
          {shouldRenderFirstUserSection && (
            <UserSection>
              <UserSectionTitle>INFO</UserSectionTitle>
              <Row>
                {location && (
                  <React.Fragment>
                    <LoweredOpacityIcon name="location" fill="#4d4d4d" height="19px" />
                    <GreyText>{location}</GreyText>
                  </React.Fragment>
                )}
              </Row>
              {looking_for_job && (
                <Row>
                  <LoweredOpacityIcon name="job" fill="#1890ff" height="19px" />
                  <BlueText>Looking for a job</BlueText>
                </Row>
              )}
              {!codeleakUser && (
                <Row>
                  <LoweredOpacityIcon name="email" fill="#1890ff" height="19px" />
                  <BlueText>Sign In to view email</BlueText>
                </Row>
              )}
            </UserSection>
          )}
        </div>

        {website_url || twitter_username || github_username ? (
          <UserSection>
            <UserSectionTitle>Links</UserSectionTitle>
            <Links>
              {website_url && (
                <Anchor href={website_url} target="_blank">
                  <LoweredOpacityIcon name="website" height="22px" />
                </Anchor>
              )}
              {twitter_username && (
                <Anchor href={`https://twitter.com/${twitter_username}`} target="_blank">
                  <LoweredOpacityIcon name="twitter" height="22px" />
                </Anchor>
              )}
              {github_username && (
                <Anchor href={`https://github.com/${github_username}`} target="_blank">
                  <LoweredOpacityIcon name="github" height="22px" />
                </Anchor>
              )}
            </Links>
          </UserSection>
        ) : null}
      </LeftSide>
      <RightSide>
        <Card>
          <ContentSwitchButton id="answers" onClick={changeTab} active={activeTab === 'answers' ? true : false}>
            Answers({answers.length})
          </ContentSwitchButton>
          <ContentSwitchButton id="questions" onClick={changeTab} active={activeTab === 'questions' ? true : false}>
            Questions({questions.length})
          </ContentSwitchButton>
        </Card>
        <Card>
          {activeTab === 'answers' ? (
            <RecentActivities type="answers" typeCounts={answers.length} data={answers} />
          ) : (
            <RecentActivities type="questions" typeCounts={questions.length} data={questions} />
          )}
        </Card>
      </RightSide>
    </Wrapper>
  )
}

Profile.propTypes = {
  codeleakUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    reputation: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    full_name: PropTypes.string,
  }),
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    questions: PropTypes.array.isRequired,
    answers: PropTypes.array.isRequired,
    full_name: PropTypes.string,
    website_url: PropTypes.string,
    twitter_username: PropTypes.string,
    github_username: PropTypes.string,
  }),
}

const Wrapper = styled.div`
  display: flex;
  @media screen and (max-width: 740px) {
    flex-direction: column;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2px;
`

const LeftSide = styled.div`
  width: 246px;
  margin-right: 32px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 740px) {
    width: 100%;
    margin: 0 auto;
  }
`

const AvatarWrapper = styled.div`
  width: 246px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 16px;
  @media screen and (max-width: 740px) {
    margin: 0 auto 16px auto;
  }
`

const CustomAvatar = styled.div`
  width: 100%;
  height: 246px;
  background-image: url(${props => (props.linkToImage ? props.linkToImage : null)});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`

const StyledLetterAvatar = styled(Avatar)`
  vertical-align: middle;
  color: #f56a00;
  background-color: #fde3cf;
  font-size: 2rem;
`
const ContentSwitchButton = styled.span`
  font-weight: bold;
  color: ${props => (props.active ? props.theme.antBlue : props.theme.darkerDarkGrey)};
  text-transform: uppercase;
  margin-right: 20px;
  &:hover {
    cursor: pointer;
  }
`

const Break = styled.div`
  width: 100%;
  height: 1.5px;
  background: ${props => props.theme.antGrey};
  opacity: 0.35;
  margin: 16px 0;
`

const UserSectionTitle = styled.p`
  font-size: 0.85rem;
  color: ${props => props.theme.darkerDarkGrey};
  text-transform: uppercase;
  font-weight: bold;
  opacity: 0.64;
  margin-bottom: 5px;
  margin-right: 5px;
`

const ReputationCounter = styled.p`
  color: ${props => props.theme.nextBlack};
  font-weight: bold;
  font-size: 1.1rem;
  line-height: 1;
`
const Links = styled.div`
  display: flex;
  flex-direction: ${props => (props.editMode ? 'column' : 'row')};
`

const Anchor = styled.a`
  margin-right: 8px;
`

const UserSection = styled.div`
  margin-bottom: 16px;
`

const GreyText = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.darkerDarkGrey};
`
const BlueText = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.antBlue};
`

const LoweredOpacityIcon = styled(CustomIcon)`
  margin-right: 8px;
  opacity: 0.64;
`

const RightSide = styled.div`
  width: 100%;
`

const Username = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.darkerDarkGrey};
  opacity: 0.64;
  margin-bottom: 16px;
  @media screen and (max-width: 740px) {
    text-align: center;
  }
`

const UserFullName = styled.span`
  font-size: 25px;
  line-height: 25px;
  font-weight: bold;
  @media screen and (max-width: 740px) {
    text-align: center;
  }
`
const UserBio = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.darkerDarkGrey};
  line-height: 22px;
  margin-bottom: 16px;
  @media screen and (max-width: 740px) {
    text-align: center;
  }
`

const getAvatarLetter = (username, full_name) => {
  if (!!full_name) {
    return full_name.charAt(0).toUpperCase()
  } else if (!!username) {
    return username.charAt(0).toUpperCase()
  } else return
}

export default Profile
