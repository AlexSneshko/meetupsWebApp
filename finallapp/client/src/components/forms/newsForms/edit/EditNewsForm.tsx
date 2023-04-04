import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useInput } from '../../../../core/hooks/useInput';
import { News } from '../../../../core/types/News';
import { checkMaxLength, checkMinLength } from '../../../../core/utils/inputValidation';
import Button from '../../../ui/button/Button';
import { ImageReloader } from '../../../ui/imageReloader/ImageReloader';
import { LabeledInput } from '../../../ui/labeledInput/LabeledInput';
import { TextArea } from '../../../ui/textArea/TextArea';
import styles from './EditNewsForm.module.scss'

export interface EditNewsFormProps {
  news: News
  onCancel: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onSave: (data: News, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onDelete: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const minInputLength = 0
const maxInputLength = 100

const validationOptions = {
    minLength: checkMinLength(minInputLength),
    maxLength: checkMaxLength(maxInputLength)
}

const errorMessages = {
    minLength: 'Поле не может быть пустым',
}

export const EditNewsForm = ({ news, onCancel, onSave, onDelete }: EditNewsFormProps) => {
  const { t } = useTranslation();

  const title = useInput<typeof validationOptions>(validationOptions, errorMessages)
  const text = useInput<typeof validationOptions>(validationOptions, errorMessages)
  const [image, setImage] = useState<string | null>(news.image);

  const getEditedNews = (): News => {
    return {
        id: news.id,
        image: image,
        publicationDate: news.publicationDate,
        text: text.value,
        title: title.value
    }
  }

  const onSaveNews = (editedNews: News, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.preventDefault()

    onSave(editedNews, event)
  }

  const onDeleteNews = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.preventDefault()

    onDelete()
  }

  return (
    <form className={styles.form}>
        <div className={styles.infoBlock}>
            <div>
                <p className={styles.imageText}>{t('photo')}</p>
                <ImageReloader image={news.image} onLoadCallback={(newImage) => setImage(newImage)}/>
            </div>
            <div>
                <LabeledInput onChange={title.setValue} initialValue={news.title} label={t('title')} />
            </div>
            <div>
                <TextArea 
                  onChange={(event) => text.setValue(event.target.value)}
                  initialValue={news.text}
                  onBlur={() => text.setIsOnBlur(true)}
                  status={text.status}
                  name={t('description') || undefined}
                  helpText={text.message}
                  className={styles.textarea} />
            </div>
        </div>
        <div className={styles.buttonsBlock}>
            <Button type="default" text={t('back')} callback={onCancel} className={styles.button}/>
            <div className={styles.rightButtons}>
              <Button type="secondary" text={t('delete')} callback={(event) => onDeleteNews(event)} className={styles.button}/>
              <Button type="primary" text={t('save')} callback={(event) => onSaveNews(getEditedNews(), event)} className={styles.button}/>
            </div>
        </div>
    </form>
  )
}
