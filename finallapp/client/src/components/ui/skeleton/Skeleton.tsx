import React, { useEffect } from 'react'
import styles from './Skeleton.module.scss'
import classNames from 'classnames'
import { weakKey } from '../../../core/utils/weakKey'

export interface SkeletonProps {
    lines?: number
    className?: string
    style?: React.CSSProperties
}

export const Skeleton = ({lines, className, style}: SkeletonProps): JSX.Element => {
  if (!lines) {
    lines = 1;
  }

  return (
    <div className={styles.skeletonContainer}>
        {[...Array(lines)].map((line) => 
            <div className={classNames(styles.skeleton, className)} style={style} key={weakKey({line})}/>
        )}
    </div>
  )
}
