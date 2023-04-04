import React from 'react'
import styles from './ImageReloadButton.module.scss'
import imageReloadIcon from '../../../assets/icons/image-reload-icon.svg'
import classNames from 'classnames'

export interface ImageReloadButtonProps {
  onReloadImage: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  className?: string
}

export const ImageReloadButton = ({ onReloadImage, className }: ImageReloadButtonProps): JSX.Element => {
  return (
    <button className={classNames(styles.imageReloadButtonShape, className)} onClick={onReloadImage}>
        <img src={imageReloadIcon}/>
    </button>
  )
}
