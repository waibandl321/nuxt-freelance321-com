import { WP_API_PATH, CUSTOM_API_PATH } from '@/config/blog'

export const isWpApi = 'wp'

export const isCustomApi = 'custom'

export function getApiBaseUrl (api_type: string) {
  return api_type === 'wp' ? WP_API_PATH : CUSTOM_API_PATH
}
