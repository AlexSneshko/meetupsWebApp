import React, { useState } from 'react'
import { News } from '../../../core/types/News'
import { getNewsDate } from '../../../core/utils/news/getNewsDate'
import styles from './NewsCard.module.scss'
import defaultImage from '../../../assets/images/default-meetup-img.png'
import { Skeleton } from '../../ui/skeleton/Skeleton'

export interface NewsCardProps {
    news: News
    onPreview: (news: News, event?: React.MouseEvent<HTMLElement, MouseEvent>) => void
    loading?: boolean
}

export const NewsCard = ({ news, onPreview, loading }: NewsCardProps): JSX.Element => {
    const [imageLoading, setImageLoading] = useState<boolean>(true);

    return (
        <article className={styles.newsCard} onClick={(event) => onPreview(news, event)}>
            <Skeleton className={styles.image} style={{ display: imageLoading ? "block" : "none" }} />
            <img className={styles.image}
                src={news.image || defaultImage}
                alt="image"
                onLoad={() => setImageLoading(false)}
                style={{ display: imageLoading ? "none" : "block" }} />
            <div className={styles.newsInfo}>
                {loading ?
                    <>
                        <Skeleton className={styles.dateSkeleton} />
                        <Skeleton className={styles.titleSkeleton} />
                        <Skeleton lines={3} className={styles.textSkeleton} />
                    </>
                    :
                    <>
                        <span className={styles.newsDate}>{getNewsDate(news)}</span>
                        <h3 className={styles.newsTitle}>{news.title}</h3>
                        <p className={styles.newsText}>{news.text}</p>
                    </>
                }
            </div>
        </article>
    )
}
