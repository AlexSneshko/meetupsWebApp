import React, { useState } from 'react'
import styles from './ImageReloader.module.scss'
import defaultImage from '../../../assets/images/default-meetup-img.png'
import { ImageReloadButton } from '../imageReloadButton/ImageReloadButton'
import { ImageLoader } from '../imageLoader/ImageLoader'

export interface ImageReloaderProps {
  image: string | null,
  onLoadCallback: (image: string | null) => void
}

export const ImageReloader = ({ image, onLoadCallback }: ImageReloaderProps): JSX.Element => {
  const [imageLoading, setImageLoading] = useState<boolean>(false)

  return imageLoading ? (
    <ImageLoader onLoadCallback={onLoadCallback}/>
  ) 
  :
  (
    
    <div className={styles.a}>
      <img className={styles.reloadImage} src={image || defaultImage}/>
        
      <ImageReloadButton onReloadImage={() => setImageLoading(true)} className={styles.reloadButton} />
    </div>
  )

}
