import React, { Component } from 'react'
import { AutoComplete, message } from 'antd'
import { apiGet } from '../../api'
import Link from 'next/link'
import styled from 'styled-components'

const { Option, OptGroup } = AutoComplete

class Search extends Component {
  state = {
    results: [],
  }

  handleChange = async value => {
    if (value) {
      try {
        const res = await apiGet.searchQuery(value)
        let query = _.get(res, 'data', null)
        if (!query) throw new Error('Internal server error!')
        this.setState({ results: query })
      } catch (error) {
        message.error('Internal server error')
      }
    } else {
      this.setState({ results: [] })
    }
  }

  render() {
    let daRealOptions = []
    Object.keys(this.state.results).map(group => {
      daRealOptions.push({ title: group, children: this.state.results[group] })
    })
    console.log(daRealOptions)

    const options = daRealOptions.map(group => {
      return (
        <OptGroup key={group.title} label={group.title}>
          {group.children.map(opt => {
            if (opt.description) {
              return (
                <Option key={opt.id + opt.slug} value={opt.title}>
                  <Link as={`question/${opt.id}/${opt.slug}`} href={`question/${opt.id}/${opt.slug}`}>
                    <a>{opt.title}</a>
                  </Link>
                </Option>
              )
            } else if (opt.full_name) {
              return (
                <Option key={opt.id + opt.username} value={opt.full_name}>
                  <Link href={`/profile/?=${opt.id}`} as={`/profile/${opt.id}/${opt.username}`}>
                    <a>{opt.full_name}</a>
                  </Link>
                </Option>
              )
            } else {
              return (
                <Option key={opt.id + opt.title} value={opt.title}>
                  {opt.title}
                </Option>
              )
            }
          })}
        </OptGroup>
      )
    })

    return (
      <SearchWrapper>
        <AutoComplete
          className="certain-category-search"
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: 300 }}
          size="large"
          style={{ width: '100%' }}
          dataSource={options}
          placeholder="Search..."
          optionLabelProp="value"
          onChange={this.handleChange}
        />
      </SearchWrapper>
    )
  }
}

const SearchWrapper = styled.div`
  width: 364px;
  @media screen and (max-width: 364px) {
    width: 100%;
  }
`

export default Search
