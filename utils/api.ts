import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { WP_API_PATH, CUSTOM_API_PATH } from '@/config/blog'
import type { Page, Post, PromiseSearchPost, Category } from '@/types/page'

Vue.use(VueAxios, axios)

export const isWpApi = 'wp'

export const isCustomApi = 'custom'

export function getApiBaseUrl (api_type: string) {
  return api_type === 'wp' ? WP_API_PATH : CUSTOM_API_PATH
}

export async function apiGetPageDetail (slug: string | null | undefined): Promise<Page> {
  const params: string = 'pages?slug=' + slug
  const base_url: string = getApiBaseUrl(isWpApi)
  return await callGetApi(base_url + params)
}

export async function callGetApi (buildPath: string): Promise<any> {
  console.log('call api:' + buildPath)
  return await Vue.axios.get(buildPath, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function apiGetSitemapPosts (category: Category): Promise<Post[]> {
  const params: string = 'posts?categories=' + category.id + '&per_page=100'
  const base_url: string = getApiBaseUrl(isWpApi)
  return await callGetApi(base_url + params)
}

export async function apiGetPosts (current_page: number, per_page: number): Promise<Post[]> {
  const base_url: string = getApiBaseUrl(isWpApi)
  const params: string = 'posts?_embed' + '&page=' + current_page + '&per_page=' + per_page
  return await callGetApi(base_url + params)
}

export async function apiGetCategoryPosts (category_id: number, current_page: number, per_page: number): Promise<Post[]> {
  const base_url: string = getApiBaseUrl(isWpApi)
  const params: string = 'posts?categories=' + category_id + '&_embed' + '&page=' + current_page + '&per_page=' + per_page
  return await callGetApi(base_url + params)
}

export async function apiGetSearchPosts (search_query: string): Promise<PromiseSearchPost> {
  const base_url: string = getApiBaseUrl(isCustomApi)
  const params: string = 'search/' + search_query
  return await callGetApi(base_url + params)
}

export async function apiGetCategoryDetail (category_id: number, api_type: string): Promise<Category> {
  const base_url: string = getApiBaseUrl(api_type)
  const params: string = 'categories/' + category_id
  return await callGetApi(base_url + params)
}

export async function apiGetPostDetail (post_id: number, api_type: string): Promise<Post> {
  const params: string = 'posts/' + post_id + '?_embed'
  const base_url: string = getApiBaseUrl(api_type)
  return await callGetApi(base_url + params)
}

export async function apiGetCategories (api_type: string): Promise<Category[]> {
  const base_url: string = getApiBaseUrl(api_type)
  const params: string = 'categories?per_page=20'
  return await callGetApi(base_url + params)
}
