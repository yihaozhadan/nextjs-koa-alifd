import React, { Component } from 'react'
import Layout from '@icedesign/layout'
import { Icon, Nav } from '@alifd/next'
import Aside from './components/Aside'
import './index.scss'

class BasicLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapse: false,
    }
  }

  render() {
    const { collapse } = this.state
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Aside
          type="primary"
          style={{
            width: collapse ? 60 : 200
          }}
        >
          <Logo text={collapse ? 'Hui' : 'Logo'} />
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '20px 0'
          }}>
            <Icon
              type={collapse ? 'arrow-right' : 'arrow-left'}
              onClick={() => {
                this.setState({
                  collapse: !this.state.collapse
                })
              }}
            />
          </div>
          <Aside location={{pathname:'/'}} isMobile={false}/>
        </Layout.Aside>
        <Layout.Section scrollable>
          <Layout.Header
            style={{
              height: '60px',
              padding: '0 20px',
              justifyContent: 'space-between',
            }}
            type="primary"
          >
            <Nav
              type="primary"
              direction="hoz"
              triggerType="hover"
            >
              <Nav.Item key="home">Home</Nav.Item>
              <Nav.SubNav label="Component" selectable>
                <Nav.Item key="next">ICE</Nav.Item>
                <Nav.Item key="mext">Next</Nav.Item>
              </Nav.SubNav>
              <Nav.Item key="document">Document</Nav.Item>
            </Nav>
          </Layout.Header>
          <Layout.Main
            style={{
              padding: 20,
              height: 700,
              margin: '0 24px'
            }}
          >
            {this.props.children}
          </Layout.Main>
          <Layout.Footer
            type="primary"
            style={{
              textAlign: 'center',
              lineHeight: '36px'
            }}
          >
            <p style={{ color: '#999' }}>
              ©2020 Hui all rights reserved.
              <br />
              Supported by <a href="https://alibaba.github.io/ice" target="_blank"> ICE </a>
            </p>
          </Layout.Footer>
        </Layout.Section>
      </Layout>
    )
  }
}

class Logo extends Component {
  render() {
    const { text } = this.props
    return (
      <div
        className="logo"
        style={{
          overflow: 'hidden',
          height: 60,
          color: '#f40',
          textAlign: 'center',
          ...this.props.style
        }}
      >
        <div
          style={{
            height: 60,
            lineHeight: '60px',
            fontSize: 20,
            ...this.props.style
          }}
        >
          {text}
        </div>
      </div>
    )
  }
}

export default BasicLayout