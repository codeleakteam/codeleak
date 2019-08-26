import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { Button, Input, Upload, Icon, message, Form, Switch } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CustomIcon from '../../assets/icons/index'
import Card from '../Card'
import { apiPut } from '../../api'

const EditProfile = props => {
  // const [imageLoading, setImageLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [avatarFileObj, setAvatarFileObj] = useState(null)
  let {
    username,
    full_name,
    avatar,
    biography,
    location,
    looking_for_job,
    website_url,
    twitter_username,
    github_username,
  } = props.userData

  // Since avatar is initially valued from state
  // We have to check if user alreay has an avatar and set it if so
  useEffect(() => {
    if (avatar) setImageUrl(avatar)
  }, [])

  // Submit api call
  const handleEditSave = async data => {
    message.loading('Saving', 5)
    var formData = new FormData()

    Object.entries(data)
      .filter(([k, v]) => v !== null)
      .forEach(([k, v]) => {
        console.log({ k, v })
        if (k === 'website_url' && !v.match(/^[a-zA-Z]+:\/\//)) {
          formData.append(k, 'http://' + v)
        } else {
          formData.append(k, v)
        }
      })

    avatarFileObj && formData.append('avatar', avatarFileObj)

    try {
      const res = await apiPut.updateUser(formData, props.userData.id, props.token)
      console.log('[handleEditSave]', res.data)
      message.destroy()
      message.success('Updated')
      Router.push(`/profile/${props.userData.id}/${props.userData.username}`)
    } catch (error) {
      message.destroy()
      message.error('Internal server error. Please try again later!')
      console.log('[handleEditSave]', error)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        handleEditSave(values)
      }
    })
  }

  // Ant upload component change
  const handleChange = ({ file, fileList }) => {
    console.log('[file]eChange] fired', { file, fileList })
    setAvatarFileObj(file.originFileObj)
    const reader = new FileReader()
    reader.onload = e => setImageUrl(e.target.result)
    reader.readAsDataURL(file.originFileObj)
  }

  const { getFieldDecorator } = props.form
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload avatar</div>
    </div>
  )
  return (
    <Wrapper>
      <LeftSide>
        <Card>
          <AvatarWrapper>
            <UploadCustom
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </UploadCustom>
          </AvatarWrapper>
        </Card>
      </LeftSide>
      <RightSide>
        <Card>
          <Form onSubmit={handleSubmit}>
            <Form.Item label="Full name">
              {getFieldDecorator('full_name', {
                initialValue: full_name,
                rules: [{ required: true, message: 'Full name is required' }],
              })(<Input size="large" placeholder="Your name" />)}
            </Form.Item>

            <Form.Item label="Biography">
              {getFieldDecorator('biography', {
                initialValue: biography,
                rules: [{ message: 'Biography is required' }],
              })(<Input.TextArea size="large" placeholder="Tell us about yourself" />)}
            </Form.Item>

            <Form.Item
              label="Looking for a job?"
              css={`
                .ant-form-item-control {
                  line-height: normal;
                }
                .ant-switch {
                  margin: 0;
                }
              `}
            >
              {getFieldDecorator('looking_for_job', {
                initialValue: looking_for_job,
              })(<Switch defaultChecked={looking_for_job} size="large" placeholder="Looking for a job" />)}
            </Form.Item>

            <Form.Item label="Location">
              {getFieldDecorator('location', {
                initialValue: location,
                rules: [{ message: 'Location is required' }],
              })(
                <Input
                  size="large"
                  placeholder="Location"
                  prefix={
                    <CustomIcon
                      css={`
                        opacity: 0.8;
                        margin-left: -3px;
                      `}
                      name="location"
                      fill="#4d4d4d"
                      height="16px"
                    />
                  }
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('twitter_username', {
                initialValue: twitter_username,
                rules: [{ required: false }],
              })(<Input size="large" placeholder="Twitter username" prefix={<Icon type="twitter" />} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('website_url', {
                initialValue: website_url ? website_url.replace(/^(https?:|)\/\//, '') : null,
                rules: [{ required: false }],
              })(<Input size="large" placeholder="Website" prefix={<Icon type="read" />} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('github_username', {
                initialValue: github_username,
                rules: [{ required: false }],
              })(<Input size="large" placeholder="Github username" prefix={<Icon type="github" />} />)}
            </Form.Item>

            <Button size="large" type="primary" htmlType="submit">
              Save changes
            </Button>
          </Form>
        </Card>
      </RightSide>
    </Wrapper>
  )
}

EditProfile.propTypes = {
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

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt4M = file.size / 1024 / 1024 < 4
  if (!isLt4M) {
    message.error('Image must smaller than 4MB!')
  }
  return isJpgOrPng && isLt4M
}

const Wrapper = styled.div`
  display: flex;
  @media screen and (max-width: 740px) {
    flex-direction: column;
  }
`

const LeftSide = styled.div`
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
  @media screen and (max-width: 740px) {
    margin: 0 auto;
  }
`

const UploadCustom = styled(Upload)`
  .ant-upload.ant-upload-select-picture-card {
    width: 100%;
    margin: 0;
  }
`

const RightSide = styled.div`
  width: 100%;
`

const WrappedEditProfile = Form.create({ name: 'edit_profile' })(EditProfile)

export default WrappedEditProfile
