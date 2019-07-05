import React from 'react'
import { Button, Input, Checkbox, Upload, Icon, message } from 'antd'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import RecentActivities from '../RecentActivities'
import Card from '../Card'
import CustomIcon from '../../assets/icons/index'

const { TextArea } = Input
const { Dragger } = Upload

const Profile = ({ userData, saveChanges, changeTab, activeTab, editMode, enableEditMode, editProfileFields }) => {

  let { username,
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
    github_username } = userData
  const uploadImageProps = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }
  console.log(looking_for_job);


  return (
    <Wrapper>
      <LeftSide>
        <AvatarWrapper>
          {editMode ? (
            <Dragger {...uploadImageProps}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other band
                files
                    </p>
            </Dragger>
          ) : (
              <Avatar src={avatar} alt={username} />
            )}
        </AvatarWrapper>
        {editMode ? <Input onChange={editProfileFields} value={full_name} name="full_name" /> : <UserFullName>{full_name}</UserFullName>}
        {editMode ? <Input onChange={editProfileFields} value={username} name="username" /> : <Username>@{username}</Username>}
        {editMode ? <TextArea onChange={editProfileFields} value={biography} name="biography" style={{ height: 100 }} /> : <UserBio>{biography}</UserBio>}
        {editMode ? (
          <Button type="primary" onClick={() => saveChanges()}>
            Save changes
                </Button>
        ) : (
            <Button type="default" onClick={() => enableEditMode()}>
              Edit Profile
                </Button>
          )}
        <Break />
        <div>
          <UserSection>
            <Row
              css={`
                      align-items: center;
                    `}
            >
              <UserSectionTitle>REPUTATION</UserSectionTitle>
            </Row>
            <ReputationCounter>{reputation}</ReputationCounter>
          </UserSection>

          <UserSection>
            <UserSectionTitle>INFO</UserSectionTitle>
            <Row>
              <LoweredOpacityIcon name="location" fill="#4d4d4d" height="19px" />
              {editMode ? <Input onChange={editProfileFields} value={location} name="location" /> : <GreyText>{location}</GreyText>}
            </Row>
            {looking_for_job && !editMode ? (
              <Row>
                <LoweredOpacityIcon name="job" fill="#1890ff" height="19px" />
                <BlueText>Looking for a job</BlueText>
              </Row>
            ) : (
                <Checkbox onChange={editProfileFields} defaultChecked={looking_for_job} name="looking_for_job">Looking for job</Checkbox>
              )}

            <Row>
              <LoweredOpacityIcon name="email" fill="#1890ff" height="19px" />
              <BlueText>Sign In to view email</BlueText>
            </Row>
          </UserSection>
        </div>

        <UserSection>
          <UserSectionTitle>Links</UserSectionTitle>
          <Links editMode={editMode}>
            {website_url && !editMode ? (
              <Link href={website_url} target="_blank">
                <LoweredOpacityIcon name="website" height="22px" />
              </Link>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <LoweredOpacityIcon name="website" height="22px" />
                  <Input onChange={editProfileFields} value={website_url} name="website_url" />
                </div>
              )}
            {twitter_username && !editMode ? (
              <Link href={`https://twitter.com/${twitter_username}`} target="_blank">
                <LoweredOpacityIcon name="twitter" height="22px" />
              </Link>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <LoweredOpacityIcon name="twitter" height="22px" />
                  <Input onChange={editProfileFields} value={twitter_username} name="twitter_username" />
                </div>
              )}
            {github_username && !editMode ? (
              <Link href={`https://github.com/${github_username}`} target="_blank">
                <LoweredOpacityIcon name="github" height="22px" />
              </Link>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <LoweredOpacityIcon name="github" height="22px" />
                  <Input onChange={editProfileFields} value={github_username} name="github_username" />
                </div>
              )}
          </Links>
        </UserSection>
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
            <RecentActivities type="Answers" typeCounts={answers.length} data={answers} />
          ) : (
              <RecentActivities type="Questions" typeCounts={questions.length} data={questions} />
            )}
        </Card>
      </RightSide>
    </Wrapper>
  )

}





// Profile.propTypes = {
//   username: PropTypes.string.isRequired,
//   reputation: PropTypes.number.isRequired,
//   avatar: PropTypes.string.isRequired,
//   full_name: PropTypes.string.isRequired,
//   biography: PropTypes.string.isRequired,
//   questions: PropTypes.array.isRequired,
//   answers: PropTypes.array.isRequired,

// }

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
  margin: 0 auto;
}
`

const AvatarWrapper = styled.div`
width: 246px;
height: 246px;
overflow: hidden;
border-radius: 8px;
margin-bottom: 10px;
`

const Avatar = styled.img`
width: 100%;
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
margin: 10px 0;
`

const UserSectionTitle = styled.p`
font-size 0.85rem;
color: ${props => props.theme.darkerDarkGrey};
text-transform: uppercase;
font-weight: bold;
opacity: .64;
margin-bottom: 5px;
margin-right:5px;
`

const ReputationIcon = styled.img`
width: 22px;
height: 22px;
margin-bottom: 3px;
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
margin: -5px;
flex-direction: ${props => (props.editMode ? 'column' : 'row')};
`

const Link = styled.a`
margin: 5px;
`

const UserSection = styled.div`
margin-bottom: 15px;
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
font-size: 16px;
color: ${props => props.theme.darkerDarkGrey};
opacity: 0.64;
margin-bottom: 15px;
`

const UserFullName = styled.span`
font-size: 25px;
line-height: 25px;
font-weight: bold;
`
const UserBio = styled.span`
font-size: 16px;
color: ${props => props.theme.darkerDarkGrey};
line-height: 22px;
margin-bottom: 15px;
`


export default Profile
