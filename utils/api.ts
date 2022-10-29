import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import type { Page, Post, AxiosResponseType, AxiosResponseCategoryDataObjectType, Category } from '@/types/page'

Vue.use(VueAxios, axios)

const isWpApi = 'wp'
const isCustomApi = 'custom'
const apiWpAdminPath = 'https://admin.freelance321.com/wp-json/wp/v2/'
const apiCustomAdminPath = 'https://admin.freelance321.com/wp-json/wp/api/'

export const apiMediaPath = 'https://media.freelance321.com/uploads/'

export function getApiBaseUrl (api_type: string) {
  return api_type === 'wp' ? apiWpAdminPath : apiCustomAdminPath
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

export async function apiGetPosts (current_page: number, per_page: number): Promise<AxiosResponseType> {
  const base_url: string = getApiBaseUrl(isWpApi)
  const params: string = 'posts?_embed' + '&page=' + current_page + '&per_page=' + per_page
  return await callGetApi(base_url + params)
}

export async function apiGetCategoryPosts (route_category_id: string | (string | null)[], current_page: number, per_page: number): Promise<AxiosResponseType> {
  const base_url: string = getApiBaseUrl(isWpApi)
  const params: string = 'posts?categories=' + route_category_id + '&_embed' + '&page=' + current_page + '&per_page=' + per_page
  return await callGetApi(base_url + params)
}

export async function apiGetSearchPosts (search_query: string): Promise<AxiosResponseType> {
  const base_url: string = getApiBaseUrl(isCustomApi)
  const params: string = 'search/' + search_query
  return await callGetApi(base_url + params)
}

export async function apiGetCategoryDetail (category_id: string | (string | null)[]): Promise<AxiosResponseCategoryDataObjectType> {
  const base_url: string = getApiBaseUrl(isWpApi)
  const params: string = 'categories/' + category_id
  return await callGetApi(base_url + params)
}

export async function apiGetPostDetail (post_id: number): Promise<Post> {
  const params: string = 'posts/' + post_id + '?_embed'
  const base_url: string = getApiBaseUrl(isWpApi)
  return await callGetApi(base_url + params)
}

export async function apiGetCategories (): Promise<AxiosResponseType> {
  const base_url: string = getApiBaseUrl(isWpApi)
  const params: string = 'categories?per_page=20'
  return await callGetApi(base_url + params)
}
