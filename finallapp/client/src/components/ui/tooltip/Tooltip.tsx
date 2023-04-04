import React from 'react'
import styles from './Tooltip.module.scss'
import classNames from 'classnames'

interface TooltipProps {
    className?: string
    type: 'primary' | 'secondary' | 'default'
    children: React.ReactNode
}

const Tooltip = (props: TooltipProps): JSX.Element => {
    const tooltipClass = classNames([styles[props.type], props.className ? props.className : ''])

    return (
        <div className={tooltipClass}>
            <span className={styles[`${props.type}__caption`]}>Need some help?</span>
            {props.children}
        </div>
    )
}

export default Tooltip
