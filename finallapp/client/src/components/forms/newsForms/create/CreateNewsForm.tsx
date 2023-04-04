import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useInput } from '../../../../core/hooks/useInput'
import { CreatedNews } from '../../../../core/types/News'
import { checkMinLength } from '../../../../core/utils/inputValidation'
import Button from '../../../ui/button/Button'
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader'
import { LabeledInput } from '../../../ui/labeledInput/LabeledInput'
import { TextArea } from '../../../ui/textArea/TextArea'
import styles from './CreateNewsForm.module.scss'

export interface CreateNewsFormProps {
  onSubmit: (data: CreatedNews, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onCancel: () => void
}

const minInputLength = 0

const validationOptions = {
    minLength: checkMinLength(minInputLength),
}

const errorMessages = {
    minLength: 'Поле не может быть пустым',
}

export default function CreateNewsForm({ onCancel, onSubmit} : CreateNewsFormProps) {
  const { t } = useTranslation()

  const title = useInput<typeof validationOptions>(validationOptions, errorMessages)
  const text = useInput<typeof validationOptions>(validationOptions, errorMessages)
  const [image, setImage] = useState<string | null>('')

  const getNewNews = (): CreatedNews => {
    return {
      title: title.value,
      text: text.value,
      image: image
    }
  }

  const checkForm = (): boolean => [text, title].every((input) => input.status === 'success')

  return (
    <form className={styles.form}>
        <div className={styles.inputsBlock}>
          <LabeledInput
            onChange={title.setValue}
            onBlur={() => title.setIsOnBlur(true)}
            status={title.status}
            type="text"
            label={t('header')}
            helpText={title.message}
          />    
          <TextArea
            onChange={(event) => text.setValue(event.target.value)}
            onBlur={() => text.setIsOnBlur(true)}
            status={text.status}
            name={t('description') || undefined}
            helpText={text.message}
          />
          <div>
            <h5 className={styles.blockName}>{t('photo')}</h5>
            <ImageLoader onLoadCallback={(newImage) => setImage(newImage)} />
          </div>  
        </div>
        <div  className={styles.buttonsBlock}>   
          <Button callback={onCancel} type="default" text={t('back')} />
          <Button
              callback={(event) => onSubmit(getNewNews(), event)}
              type="primary"
              text={t('create')}
              disabled={!checkForm()}
          />
        </div>
    </form>
  )
}
