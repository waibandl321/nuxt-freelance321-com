import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { WP_API_PATH, CUSTOM_API_PATH } from '@/config/blog'

Vue.use(VueAxios, axios)

export const isWpApi = 'wp'

export const isCustomApi = 'custom'

export function getApiBaseUrl (api_type: string) {
  return api_type === 'wp' ? WP_API_PATH : CUSTOM_API_PATH
}

export async function callGetApi (buildPath: string): Promise<any> {
  console.log('call api:' + buildPath)
  return await Vue.axios.get(buildPath, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
