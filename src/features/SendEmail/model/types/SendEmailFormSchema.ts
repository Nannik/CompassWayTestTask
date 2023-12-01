export interface SendEmailFormSchema {
    recipientEmail?: string
    subject?: string
    message?: string
    isLoading?: boolean
    error?: string
}
