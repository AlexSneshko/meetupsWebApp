import React from 'react'
import styles from './RedactorButton.module.scss'
import editIcon from '../../../assets/icons/edit-icon.svg'
import deleteIcon from '../../../assets/icons/delete-icon.svg'
import classNames from 'classnames'

export interface RedactorButtonProps {
    type: 'delete' | 'edit'
    onClick: () => void
    className?: string
}

export const RedactorButton = ({ type, onClick, className }: RedactorButtonProps): JSX.Element => {
    const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onClick()
    }

    return (
        <button className={classNames(styles.button, className)} onClick={(event) => onButtonClick(event)}>
            {type === 'delete' ? <img src={deleteIcon} alt="Remove" /> : <img src={editIcon} alt="Edit" />}
        </button>
    )
}
