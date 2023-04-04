import React, { useState } from 'react'
import { LabeledInput } from '../../../ui/labeledInput/LabeledInput'
import { TextArea } from '../../../ui/textArea/TextArea'
import { DateInput } from '../../../ui/dateInput/DateInput'
import { Meetup } from '../../../../core/types/Meetup'
import Button from '../../../ui/button/Button'
import styles from './EditMeetupForm.module.scss'
import { useTranslation } from 'react-i18next'
import PreviewMeetup from '../../../preview/previewMeetup/PreviewMeetup'
import { ImageReloader } from '../../../ui/imageReloader/ImageReloader'

interface EditMeetupFormProps {
    meetup: Meetup
    onCancel: () => void
    onSave: (meetup: Meetup, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const EditMeetupForm = ({ meetup, onCancel, onSave }: EditMeetupFormProps): JSX.Element => {
    const { t } = useTranslation();

    const [image, setImage] = useState<string | null>(meetup.image)
    const [subject, setTheme] = useState<string>(meetup.subject)
    const [start, setStart] = useState<string>(meetup.start)
    const [finish, setEnd] = useState<string>(meetup.finish)
    const [place, setPlace] = useState<string>(meetup.place || '')
    const [author, setSpeaker] = useState<string>(`${meetup.author.name} ${meetup.author.surname}`)
    const [excerpt, setDescription] = useState<string>(meetup.excerpt)
    const [isPreview, setIsPreview] = useState<boolean>(false)

    const parseAuthor = (author: string) => {
        return author.split(' ')
    }

    const combineData = (): Meetup => {
        const [name, surname] = parseAuthor(author)

        return {
            ...meetup,
            image,
            start: start,
            finish: finish,
            subject,
            place,
            author: {
                id: meetup.author.id,
                name,
                surname
            },
            excerpt
        }
    }

    const preventDefaultSubmit = (event: React.FormEvent): void => event.preventDefault()

    return isPreview ? (<PreviewMeetup meetup={combineData()} onCancel={() => setIsPreview(false)} onPublish={() => { }} />)
        :
        (
            <form className={styles.form} onSubmit={preventDefaultSubmit}>
                <div className={styles.inputs}>
                    <div className={styles.photo}>
                        <span className={styles.caption}>Фото</span>
                        <ImageReloader image={image} onLoadCallback={(newImage) => { setImage(newImage) }} />
                    </div>
                    <div className={styles.theme}>
                        <LabeledInput onChange={setTheme} initialValue={subject} label={t('topic')} />
                    </div>
                    <div className={styles.dates}>
                        <DateInput id={'start'} setValue={setStart} value={start} label={t('start')} className={styles.dateInput} />
                        <DateInput id={'finish'} setValue={setEnd} value={finish} label={t('ending')} className={styles.dateInput} />
                    </div>
                    <div className={styles.place}>
                        <LabeledInput onChange={setPlace} initialValue={place} label={t('place')} />
                    </div>
                    <div className={styles.speaker}>
                        <LabeledInput onChange={setSpeaker} initialValue={author} label={t('speaker')} />
                    </div>
                    <div className={styles.description}>
                        <TextArea
                            onChange={(event) => setDescription(event.target.value)}
                            initialValue={excerpt}
                            className={styles.textarea}
                            name={t('description') || undefined}
                        />
                    </div>
                </div>
                <div className={styles.buttonsBlock}>
                    <Button callback={onCancel} type="default" text={t('cancel')} className={styles.button} />
                    <div className={styles.rightButtons}>
                        <Button callback={() => setIsPreview(true)} type="secondary" text={t('preview')} className={styles.button} />
                        <Button callback={(event) => onSave(combineData(), event)} type="primary" text={t('save')} className={styles.button} />
                    </div>
                </div>
            </form>
        )
}
