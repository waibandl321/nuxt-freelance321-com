import { InjectionKey } from '@nuxtjs/composition-api'
import { CategoryStore } from '@/utils/store'

const CategoryStoreKey: InjectionKey<CategoryStore> = Symbol('CategoryStoreKey')
export default CategoryStoreKey
