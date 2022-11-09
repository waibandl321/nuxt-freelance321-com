import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import type { Page, AxiosResponsePostObject, AxiosResponseTypeArray, AxiosResponseCategoryDataObjectType, Category } from '@/types/'

Vue.use(VueAxios, axios)

const WpApi = 'wp'
const CustomApi = 'custom'
const WpAPIPath = 'https://admin.freelance321.com/wp-json/wp/v2/'
const CustomAPIPath = 'https://admin.freelance321.com/wp-json/wp/api/'
export const MediaBasePath = 'https://media.freelance321.com/uploads/'

export async function useFetchPage (slug: string | null | undefined): Promise<Page> {
  const params: string = 'pages?slug=' + slug
  const base_url: string = getApiBaseUrl(WpApi)
  return await callGetApi(base_url + params)
}

export async function useFetchSitemapPosts (category: Category): Promise<AxiosResponseTypeArray> {
  const params: string = 'posts?categories=' + category.id + '&per_page=100'
  const base_url: string = getApiBaseUrl(WpApi)
  return await callGetApi(base_url + params)
}

export async function useFetchPosts (current_page: number, per_page: number): Promise<AxiosResponseTypeArray> {
  const base_url: string = getApiBaseUrl(WpApi)
  const params: string = 'posts?_embed' + '&page=' + current_page + '&per_page=' + per_page
  return await callGetApi(base_url + params)
}

export async function useFetchCategoryPosts (route_category_id: string | (string | null)[], current_page: number, per_page: number): Promise<AxiosResponseTypeArray> {
  const base_url: string = getApiBaseUrl(WpApi)
  const params: string = 'posts?categories=' + route_category_id + '&_embed' + '&page=' + current_page + '&per_page=' + per_page
  return await callGetApi(base_url + params)
}

export async function useFetchSearchPosts (search_query: string): Promise<AxiosResponseTypeArray> {
  const base_url: string = getApiBaseUrl(CustomApi)
  const params: string = 'search/' + search_query
  return await callGetApi(base_url + params)
}

export async function useFetchCategory (category_id: string | (string | null)[]): Promise<AxiosResponseCategoryDataObjectType> {
  const base_url: string = getApiBaseUrl(WpApi)
  const params: string = 'categories/' + category_id
  return await callGetApi(base_url + params)
}

export async function useFetchPost (post_id: string): Promise<AxiosResponsePostObject> {
  const params: string = 'posts/' + post_id + '?_embed'
  const base_url: string = getApiBaseUrl(WpApi)
  return await callGetApi(base_url + params)
}

export async function useFetchCategories (): Promise<AxiosResponseTypeArray> {
  const base_url: string = getApiBaseUrl(WpApi)
  const params: string = 'categories?per_page=20'
  return await callGetApi(base_url + params)
}

function getApiBaseUrl (api_type: string) {
  return api_type === 'wp' ? WpAPIPath : CustomAPIPath
}

async function callGetApi (buildPath: string): Promise<any> {
  console.log('call api:' + buildPath)
  return await Vue.axios.get(buildPath, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
