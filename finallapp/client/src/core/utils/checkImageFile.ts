import { MAX_UPLOADED_IMAGE_SIZE_MB } from '../constants/restrictionConstants'

export const checkImageFile = (files: FileList | null): boolean => {
    if (!files) return false
    if (!files[0]) return false

    if (files[0].type.split('/')[0] !== 'image') return false

    if (files[0].size > MAX_UPLOADED_IMAGE_SIZE_MB * 1024 * 1024) return false

    return true
}
