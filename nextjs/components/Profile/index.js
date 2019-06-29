import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import RecentActivities from '../RecentActivities'
import Card from '../Card'
import CustomIcon from '../../assets/icons/index'

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
  username,
}) => {
  return (
    <Wrapper>
      <LeftSide>
        <AvatarWrapper>
          <Avatar
            src={`https://hashnode.imgix.net/res/hashnode/image/upload/v1559308217154/bN4BiCPyN.jpeg?w=400&h=400&fit=crop&crop=faces&auto=format,enhance&q=60`}
            alt="avatar"
          />
        </AvatarWrapper>
        <UserFullName>{full_name}</UserFullName>
        <Username>@{username}</Username>
        <UserBio>Co-founder & CEO, Hashnode</UserBio>
        <Button default>Edit profile</Button>

        <Break />

        <div>
          <Row>
            <span
              css={css`
                font-size: 1rem;
              `}
            >
              📍 Belgrade, Serbia
            </span>
          </Row>
          <Row>
            <span
              css={css`
                font-size: 1rem;
              `}
            >
              💻 Full-stack web developer @ Makonda
            </span>
          </Row>
        </div>

        <Links>
          <Link href="">
            <CustomIcon name="website" height="22px" />
          </Link>

          <Link href="">
            <CustomIcon name="twitter" height="22px" />
          </Link>

          <Link href="">
            <CustomIcon name="github" height="22px" />
          </Link>

          <Link href="">
            <CustomIcon name="email" height="22px" />
          </Link>
        </Links>
      </LeftSide>
      <RightSide>
        <Card>
          <RecentActivities type="Questions" typeCounts={questions.length} data={questions} />
        </Card>
      </RightSide>
    </Wrapper>
  )
}
Profile.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
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

const Row = styled.div`
  display: flex;
`

const LeftSide = styled.div`
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
  margin-bottom: 15px;
`

const Avatar = styled.img`
  width: 100%;
`

const CountBox = styled.div`
  border: 1px solid ${props => props.theme.darkGrey};
  padding: 8px;
  margin-bottom: 8px;
  font-size: 18px;
`

const Break = styled.div`
  width: 100%;
  height: 1.5px;
  background: ${props => props.theme.antGrey};
  opacity: 0.35;
  margin: 10px 0;
`

const Links = styled.div`
  display: flex;
`

const Link = styled.a`
  margin-right: 5px;
`

const StyledCustomIconWithMargin = styled(CustomIcon)`
  margin-right: 7px;
`

const RightSide = styled.div``
const UserCompanyWrapper = styled.div``
const Username = styled.p`
  font-size: 16px;
  color: ${props => props.theme.darkerDarkGrey};
  opacity: 0.64;
  margin-bottom: 15px;
`
const UserHeadline = styled.span`
  color: black;
  font-size: 20px;
  line-height: 28px;
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
