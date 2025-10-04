import type { CreateClientConfig } from '@/shared/api/generated/client'

export const createClientConfig: CreateClientConfig = (config) => ({
  credentials: 'include',
  ...config,
})
