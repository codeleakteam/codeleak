import React, { useState } from 'react'
import { Button, Input, Upload, Icon, message, Form, Switch } from 'antd'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Card from '../Card'
import { apiPut } from '../../api'

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
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const EditProfile = props => {
  const [imageLoading, setImageLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)

  const handleEditSave = async data => {
    var formData = new FormData()

    formData.set('biography', data.biography)
    formData.append('full_name', data.full_name)
    formData.set('github_username', data.github)
    formData.set('location', data.location)
    formData.set('looking_for_job', data.looking_for_job)
    formData.set('website_url', data.portfolio)
    formData.set('twitter_username', data.twitter)
    formData.set('avatar', imageUrl)

    try {
      const res = await apiPut.updateUser(formData, props.userData.id, props.token)
      console.log('res', res)
    } catch (error) {
      console.log('errorko', error)
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

  const handleChange = info => {
    // console.log('info', info)

    if (info.file.status === 'uploading') {
      setImageLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setImageLoading(false)
        setImageUrl(imageUrl)
      })
    }
  }

  let {
    avatar,
    biography,
    full_name,
    location,
    looking_for_job,
    website_url,
    twitter_username,
    github_username,
  } = props.userData

  const { getFieldDecorator } = props.form

  const uploadButton = (
    <div>
      <Icon type={imageLoading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  return (
    <Wrapper>
      <LeftSide>
        <AvatarWrapper>
          <UploadCustom
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {!imageUrl ? (
              <img src={avatar} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            )}
          </UploadCustom>
        </AvatarWrapper>
      </LeftSide>
      <RightSide>
        <Card>
          <Form onSubmit={handleSubmit}>
            <Form.Item label="Full name">
              {getFieldDecorator('full_name', {
                initialValue: full_name,
                rules: [{ required: true, message: 'Full name is required' }],
              })(<Input placeholder="Full name" />)}
            </Form.Item>

            <Form.Item label="Biography">
              {getFieldDecorator('biography', {
                initialValue: biography,
                rules: [{ required: true, message: 'Biography is required' }],
              })(<Input.TextArea placeholder="Biography" />)}
            </Form.Item>

            <Form.Item label="Looking for job?">
              {getFieldDecorator('looking_for_job', {
                initialValue: looking_for_job,
                rules: [{ required: true, message: 'Looking for job is required' }],
              })(<Switch placeholder="Looking for job?" />)}
            </Form.Item>

            <Form.Item label="Location">
              {getFieldDecorator('location', {
                initialValue: location,
                rules: [{ required: true, message: 'Location is required' }],
              })(<Input placeholder="Location" />)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('twitter', {
                initialValue: twitter_username,
                rules: [{ required: false }],
              })(<Input placeholder="Twitter" prefix={<Icon type="twitter" />} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('portfolio', {
                initialValue: website_url,
                rules: [{ required: false }],
              })(<Input placeholder="Portfolio" prefix={<Icon type="read" />} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('github', {
                initialValue: github_username,
                rules: [{ required: false }],
              })(<Input placeholder="GitHub" prefix={<Icon type="github" />} />)}
            </Form.Item>

            <Button type="primary" htmlType="submit">
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

const UploadCustom = styled(Upload)`
  .ant-upload.ant-upload-select-picture-card {
    width: 100%;
  }
`

const RightSide = styled.div`
  width: 100%;
`

const WrappedEditProfile = Form.create({ name: 'edit_profile' })(EditProfile)

export default WrappedEditProfile
