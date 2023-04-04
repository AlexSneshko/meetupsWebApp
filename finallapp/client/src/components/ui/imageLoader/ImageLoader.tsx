import React from 'react'
import { LoaderForm } from './loaderForm/LoaderForm'
import { ImagePreviewer } from './imagePreviewer/ImagePreviewer'

interface ImageLoaderProps {
    onLoadCallback: (image: string | null) => void
}

export const ImageLoader = (props: ImageLoaderProps): JSX.Element => {
    const [file, setFile] = React.useState<File | null>(null)

    const onLoadFile = (newFile: File): void => {
        setFile(newFile)

        const reader: FileReader = new FileReader()
        reader.onloadend = () => props.onLoadCallback(reader.result?.toString() || null)
        reader.readAsDataURL(newFile)
    }

    const onCancelLoad = (): void => {
        setFile(null)
        props.onLoadCallback(null)
    }

    return file !== null ? (
        <ImagePreviewer title={file.name} size={file.size} onCancel={onCancelLoad} />
    ) : (
        <LoaderForm onLoad={onLoadFile} />
    )
}
