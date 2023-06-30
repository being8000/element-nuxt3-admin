import { UseFetchOptions } from "nuxt/app";
import { ApiConstanst, Exports, Gets, Posts, Puts, Deletes } from "~/utils/api";
interface TableParams {
  fetchUrl: string;
  methods: "post" | "get";
}

type DataT<T> = {
  records: T[];
  total: number;
};
const _options: UseFetchOptions<any> = {
  server: false,
  onRequest({ request, options }) {
    // Set the request headers
    options.headers = useRequestHeaders();
  },
  onRequestError({ request, options, error }) {
    // Handle the request errors
    // ElMessage.error(error);
    console.log("onRequestError", error);
  },
  onResponse({ request, response, options }) {
    // Process the response data
  },
  onResponseError({ request, response, options }) {
    // Handle the response errors
    const { status, _data } = response;
    ElMessage.error(`Status:${_data.statusCode}, ` + _data.message);
    console.log("onResponseError", response);
  },
};

export const usePost = (url: ApiConstanst<typeof Posts>, data?: object) => {
  // return authFetch(Posts[url], data);
  const options = _options;
  options.method = "post";
  options.body = data;
  return useFetch(Posts[url], options);
};

export function useGet(url: ApiConstanst<typeof Gets>, data?: object) {
  const options = _options;
  options.method = "get";
  options.params = data;
  return useFetch(Gets[url], options);
}
export const usePut = (url: ApiConstanst<typeof Puts>, data?: object) => {
  const options = _options;
  options.method = "put";
  options.body = data;
  return useFetch(Puts[url], options);
};

export const useDelete = (url: ApiConstanst<typeof Deletes>, data?: object) => {
  const options = _options;
  options.method = "delete";
  options.body = data;
  return useFetch(Deletes[url], options);
};

export const useExport = (url: ApiConstanst<typeof Exports>, data?: object) => {
  const options = _options;
  options.method = "post";
  options.body = data;
  return useFetch(Exports[url], options);
};
