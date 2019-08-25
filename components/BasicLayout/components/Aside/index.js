import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import FoundationSymbol from '@icedesign/foundation-symbol'
import { Nav } from '@alifd/next'
import stores from '../../../../stores/index'
import { asideMenuConfig } from '../../../../config/menu.js'
import styles from './index.module.scss'

const SubNav = Nav.SubNav
const NavItem = Nav.Item

function getSubMenuOrItem(item, index) {
  if (item.children && item.children.some(child => child.name)) {
    const childrenItems = getNavMenuItems(item.children)
    if (childrenItems && childrenItems.length > 0) {
      return (
        <SubNav
          key={index}
          icon={item.icon ? <FoundationSymbol type={item.icon} size="small" /> : null}
          label={
            <span className="ice-menu-collapse-hide">
              SubNav label
            </span>
          }
        >
          {childrenItems}
        </SubNav>
      )
    }
    return null
  }
  return (
    <NavItem key={item.path}>
      <Link href={item.path}>
        <a>NaveItem</a>
      </Link>
    </NavItem>
  )
}

function getNavMenuItems(menusData) {
  if (!menusData) {
    return []
  }

  return menusData
    .filter(item => item.name && !item.hideInMenu)
    .map((item, index) => {
      return getSubMenuOrItem(item, index)
    })
}

function getDefaultOpenKeys(location = {}) {
  const { pathname } = location
  const menus = getNavMenuItems(asideMenuConfig)

  let openKeys = []
  if (Array.isArray(menus)) {
    asideMenuConfig.forEach((item, index) => {
      if (pathname.startsWith(item.path)) {
        openKeys = [`${index}`]
      }
    })
  }

  return openKeys
}

const Aside = (props) => {
  const expandAside = stores.useStore('expandAside')
  const { collapse, toggle } = expandAside

  const { location, isMobile } = props;
  const { pathname } = location;
  const defaultOpenKeys = getDefaultOpenKeys(location);
  const [openKeys, setOpenKeys] = useState(collapse ? [] : defaultOpenKeys);
  const [mode, setMode] = useState('inline');
  const cacheOpenKeys = useRef(openKeys);

  useEffect(() => {

    if (isMobile) {
      if (!collapse) {
        toggle(true)
      }
    } else {
      toggle(false)
    }
  }, [isMobile])

  useEffect(() => {
    if (collapse) {
      cacheOpenKeys.current = openKeys
      setMode('popup')
      setOpenKeys([])
    } else {
      setMode('inline')
      setOpenKeys(cacheOpenKeys.current)
    }
  }, [collapse])

  function onOpenChange(keys) {
    setOpenKeys(keys)
  }

  return (
    <div className={`${styles.iceDesignLayoutAside} ${styles.iceDesignProAside}`}>
      <Nav
        style={{ width: collapse ? '60px' : '200px' }}
        mode={mode}
        iconOnly={collapse}
        hasArrow={!collapse}
        triggerType={collapse ? 'hover' : 'click'}
        activeDirection={null}
        openKeys={openKeys}
        selectedKeys={[pathname]}
        defaultSelectedKeys={[pathname]}
        onOpen={onOpenChange}
      >
        {getNavMenuItems(asideMenuConfig)}
      </Nav>
    </div>
  )
}

export default Aside