export interface Data {
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

export interface PageDataType {
  config: Object;
  data: Array<Data>;
  headers: Object;
  request: XMLHttpRequest;
  status: 200;
  statusText: string;
}
