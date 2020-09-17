import { BaseResource } from "./interfaces/BaseResource";
import { ContentTypes } from "./enums/ContentTypes";
import { isFunction } from './helpers';

export type FetchRequestMethod = 'post' | 'put' | 'get' | 'delete' | 'patch';

export interface FetchOptions {
  trailingSlash?: boolean;
  headers?: HeadersInit
  responseType?: string
  contentType?: ContentTypes
  accessType?: string
  mode?: RequestMode
  cache?: RequestCache
  credentials?: RequestCredentials
  redirect?: RequestRedirect
  referrer?: 'no-referrer' | 'client'
  timeOffset?: boolean
  handleError?: (payload: { response: Response, parsedBody: any }) => any
  queryParamsDecodeMode?: 'comma' | 'array'
  queryParams?: any
  // params?: any
  // todo 
  // Добавить проверку перед тем как отправить запрос
  // можно ли его слать (пример, если нет интернета или любое другое условие)
  // то есть перехватить и вернуть другую ошибку
}

export interface FetchRequestOptions {
  method: FetchRequestMethod
  headers?: HeadersInit
  mode?: RequestMode
  cache?: RequestCache
  credentials?: RequestCredentials
  redirect?: RequestRedirect
  referrer?: string
  body?: any
}

export const DefaultFetchOptions: FetchOptions = {
  contentType: ContentTypes.JSON,
  trailingSlash: false,
  cache: 'default',
  timeOffset: false,
  handleError: undefined,
  queryParamsDecodeMode: 'comma'
};

export class FetchResource implements BaseResource {
  protected defaultOptions: FetchOptions;

  constructor(protected baseUrl: string,
    defaultOptions?: FetchOptions,
    protected fetchClient = fetch) {
    this.defaultOptions = { ...DefaultFetchOptions, ...defaultOptions };
  }

  public post(url: string, body: any, options?: FetchOptions): Promise<object> {
    const { requestUrl, requestOptions } = this.resolveRequestData('post', url, options, body);
    return this.fetchHandleCode(requestUrl, requestOptions);
  }

  public put(url: string, body: any, options?: FetchOptions): Promise<object> {
    const { requestUrl, requestOptions } = this.resolveRequestData('put', url, options, body);
    return this.fetchHandleCode(requestUrl, requestOptions);
  }

  public patch(url: string, body: any, options?: FetchOptions): Promise<object> {
    const { requestUrl, requestOptions } = this.resolveRequestData('patch', url, options, body);
    return this.fetchHandleCode(requestUrl, requestOptions);
  }

  public get(url: string, queryParams?: any, options?: FetchOptions): Promise<object> {
    const { requestUrl, requestOptions } = this.resolveRequestData('get', url, options, queryParams);
    return this.fetchHandleCode(requestUrl, requestOptions);
  }

  public delete(url: string, body?: any, options?: FetchOptions): Promise<void> {
    const { requestUrl, requestOptions } = this.resolveRequestData('delete', url, options, body);
    return this.fetchHandleCode(requestUrl, requestOptions);
  }

  public setHeaders(headers: object) {
    this.defaultOptions.headers = Object.assign({}, this.defaultOptions.headers, headers);
  }

  public clearHeaders() {
    delete this.defaultOptions.headers;
  }

  public setBasePath(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public resolveDestination(pathParts: Array<number | string>, basePath: string): string {
    return (pathParts.reduce((resultUrl, routePart) =>
      `${resultUrl}/${routePart}`, basePath) as string).replace(/([^:]\/)\/+/g, "$1");
  }

  public getAllEntities(): Promise<any> {
    return new Promise((_, reject) => {
      reject(new Error('BaseHttpResource #getAllEntities(): need to provide method'));
    });
  }

  private fetchHandleCode(url: string, options: FetchRequestOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fetchClient(url, options)
        .then(async (response: Response) => {
          const text = await response.clone().text();
          if (response && response.status <= 208) {
            const data = !!text ? await response.json() : undefined;
            data['_status'] = response.status;
            resolve(data);
          } else {
            if (isFunction(response.clone)) {
              const responseCopy = response.clone();
              const handledErrorResult = await this.handleError(responseCopy);
              reject(handledErrorResult);
            }
            reject(response);
          }
        })
        .catch(async (error: Response) => {
          const handledErrorResult = await this.handleError(error);
          reject(handledErrorResult);
        });
    });
  }

  private async handleError(e: Response) {
    const response = isFunction(e?.clone) ? e.clone() : e;
    let parsedBody = null;
    if (isFunction(e.text) && !!(await e.clone().text())) {
      if (isFunction(e.json)) {
        try {
          parsedBody = await e.json();
        } catch (e) {
          parsedBody = e.message;
        }
      } else if (isFunction(e.text)) {
        parsedBody = await e.text();
      } else if (isFunction(e.formData)) {
        parsedBody = await e.formData();
      }
    }
    this.defaultOptions?.handleError && this.defaultOptions.handleError({ response, parsedBody });
    (response as Response & { parsedBody: any }).parsedBody = parsedBody;
    return response;
  }

  private resolveRequestBody(body: any, options?: FetchOptions): any {
    if (options) {
      if (body != null) {
        if (options.contentType === ContentTypes.FORM_DATA) {
          return this.transformToFormData(body);
        } else if (options.contentType === ContentTypes.JSON) {
          return JSON.stringify(body);
        } else if (!!options.contentType) {
          return body;
        }
      } else {
        return body;
      }
    }
    return JSON.stringify(body);
  }

  private transformToFormData(body: any, form?: FormData, namespace?: string) {
    const formData = form || new FormData();
    for (const property in body) {
      const value = body[property];
      if (!body.hasOwnProperty(property) || !value) {
        continue;
      }
      const formKey = namespace ?
        (Array.isArray(body) ? `${namespace}[]` : `${namespace}[${property}]`) :
        property;
      if (value instanceof Date) {
        formData.append(formKey, value.toISOString());
      } else if (typeof value === 'object' && !(value instanceof File)) {
        this.transformToFormData(value, formData, formKey);
      } else {
        formData.append(formKey, value);
      }
    }
    return formData;
  }

  private isFile(value: any): boolean {
    // todo realize for React Native
    return typeof value === 'object'; //&& !(value instanceof File)
  }

  private resolveRequestData(method: FetchRequestMethod, url: string, options?: FetchOptions, body?: any) {
    const queryParams = method === 'get' ? body : (options && options.queryParams);
    const requestBody = method === 'get' ? void 0 : body;
    const mergedOptions = this.resolveRequestOptions(options);
    let requestUrl = this.resolveRequestUrl(url, mergedOptions);
    const decodedBody = this.resolveRequestBody(requestBody, options);
    const requestOptions = this.createRequestOptions(method, mergedOptions, decodedBody);
    const query = this.getQueryString(queryParams, options);
    requestUrl = (query != null && query != '') ? `${requestUrl}?${query}` : requestUrl;
    return { requestUrl, requestOptions };
  }

  private resolveRequestUrl(url: string, o: FetchOptions): string {
    if (this.baseUrl == null) {
      throw new Error('BaseHttpResource#resolveRequestUrl: baseUrl is not defined');
    }
    const urlPart = `/${url}${o.trailingSlash ? '/' : ''}`;
    let result = (this.baseUrl + urlPart).replace(/([^:]\/)\/+/g, "$1");
    return result;
  }

  private resolveRequestOptions(options: any) {
    return { ...this.defaultOptions, ...options };
  }

  private createRequestOptions(method: FetchRequestMethod, options: FetchOptions, body?: any): FetchRequestOptions {
    const result: FetchRequestOptions = {
      method,
      headers: this.resolveHeaders(options),
      mode: options.mode,
      cache: options.cache,
      credentials: options.credentials,
      redirect: options.redirect,
      referrer: options.referrer
    };

    if (body) {
      result['body'] = body;
    }

    return result;
  }

  private resolveHeaders(options: FetchOptions) {
    const additionalHeaders = {} as any;
    if (options.contentType === ContentTypes.JSON) {
      additionalHeaders['Content-Type'] = 'application/json';
    } else if (options.contentType === ContentTypes.FORM_DATA) {
      // If form data, dont set headers
      // https://muffinman.io/uploading-files-using-fetch-multipart-form-data/
    }
    if (options.responseType === 'json') {
      additionalHeaders['Accept'] = 'application/json';
    }

    return { ...options.headers, ...additionalHeaders };
  }

  public getQueryString(params: any = {}, o?: FetchOptions): string {
    const options = o != null ? { ...this.defaultOptions, ...o } : this.defaultOptions as FetchOptions;

    if (options.timeOffset) {
      params['timeoffset'] = (new Date()).getTimezoneOffset() * -1;
    }

    return Object
      .keys(params)
      .map(k => {
        if (params[k] === null || params[k] === undefined) {
          return '';
        } else if (Array.isArray(params[k])) {
          switch (options.queryParamsDecodeMode) {
            case 'array':
              return params[k]
                .map((val: any) => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
                .join('&');
            case 'comma':
            default:
              return `${encodeURIComponent(k)}=${params[k].join(',')}`;
          }
        } else {
          return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
        }
      })
      .filter(Boolean)
      .join('&');
  }

}
