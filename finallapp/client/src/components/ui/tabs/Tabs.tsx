import classNames from 'classnames'
import React, { useState } from 'react'
import styles from './Tabs.module.scss'

export interface TabsProps {
  tabs: Array<{ key: string, name: string }>,
  activeTabKey?: string,
  onTabChange: (key: string) => void,
  className?: string
}

export const Tabs = ({ tabs, activeTabKey, onTabChange, className }: TabsProps): JSX.Element => {
  const [activeKey, setActiveKey] = useState<string>(activeTabKey || tabs[0].key)

  const onTabChangeHandler = (key: string) => {
    setActiveKey(key)
    onTabChange(key)
  }

  return (
    <nav className={classNames(styles.tabsNav, className)}>
      <div className={styles.tabs}>
        {tabs.map((tab) =>
          <div
            className={classNames(styles.tabItem, activeKey === tab.key && styles.active)}
            key={tab.key}
            onClick={() => onTabChangeHandler(tab.key)}>
            {tab.name}
          </div>
        )}
      </div>
    </nav>
  )
}
