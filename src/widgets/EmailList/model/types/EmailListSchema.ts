import { Email } from '@/entity/Email';

export interface EmailListSchema {
    emails?: Email[]
    isLoading?: boolean
    error?: string
    count?: number
    currentPage?: number
}
