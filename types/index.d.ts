interface FixedPage {
  author: number;
  comment_status: string;
  content: {
    protected: boolean;
    rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
    protected: boolean;
    rendered: string;
  };
  featured_media: number;
  guid: {
    rendered: string;
  };
  id: number;
  link: string;
  menu_order: number;
  meta: [];
  modified: string;
  modified_gmt: string;
  parent: number;
  ping_status: string;
  slug: string;
  status: string;
  template: string;
  title: {
    rendered: string
  };
  type: string;
  _links: Object
}

interface Post {
  author: number;
  categories: number[];
  comment_status: string;
  content: {
    protected: boolean;
    rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
    protected: boolean;
    rendered: string;
  };
  featured_media: number;
  format: string;
  guid: {
    rendered: string;
  };
  id: number;
  jetpack_featured_media_url: string;
  link: string;
  meta: [];
  modified: string;
  modified_gmt: string;
  ping_status: string;
  slug: string;
  status: string;
  sticky: boolean;
  tags: [];
  template: string;
  title: {
    rendered: string
  };
  type: string;
  _embedded: [];
  _links: [];
}

export interface Category {
  count: number;
  description: string;
  id: number;
  name: string;
  parent: number;
  slug: string;
  posts: Post[],
  sub_categories: Category[]
}

interface SearchPostCategory {
  count: number;
  description: string;
  filter: string;
  name: string;
  parent: number;
  slug: string;
  taxonomy: string;
  term_group: number;
  term_id: number;
  term_taxonomy_id: number;
}

export interface SearchPost {
  category: SearchPostCategory;
  content: string;
  date: string;
  excerpt: string;
  id: number;
  modified: string;
  post_type: string | null;
  slug: string;
  thumbnail: string;
  title: string;
}

export interface AxiosResponseTypeArray {
  config: Object;
  data: [];
  headers: {
    'content-type': string;
    link: string;
    'x-wp-total': string;
    'x-wp-totalpages': string;
  }
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}
export interface AxiosResponsePostObject {
  config: Object;
  data: Post;
  headers: {
    'content-type': string;
    link: string;
    'x-wp-total': string;
    'x-wp-totalpages': string;
  }
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface AxiosResponseCategoryDataObjectType {
  config: Object;
  data: Category;
  headers: {
    'content-type': string;
    link: string;
    'x-wp-total': string;
    'x-wp-totalpages': string;
  }
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

interface Tag {}

interface Meta {}

interface Auther {
  avatar_urls: {};
  description: string;
  id: number;
  link: string;
  name: string;
  slug: string;
  url: string
  _links: []
}

export interface Page {
  config: Object;
  data: Array<FixedPage>;
  headers: Object;
  request: XMLHttpRequest;
  status: 200;
  statusText: string;
}

export type GoogleFormData = {
  'entry.247993782': string;
  'entry.2089866053': string;
  'entry.666391459': string;
  'entry.682995808': string;
  'entry.1849326221_sentinel': boolean;
}
