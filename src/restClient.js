import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  fetchUtils
} from 'admin-on-rest';
import {stringify} from 'query-string';

const {fetchJson} = fetchUtils;

export default (API_URL, httpClient = fetchJson) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertRESTRequestToHTTP = (type, resource, params) => {
    let url = '';
    const options = {};
    options.headers = new Headers({'Accept': 'application/ld+json'});
    switch (type) {
      case GET_LIST: {
        const {page, perPage} = params.pagination;
        url = `${API_URL}/${resource}?page=${page}&itemsPerPage=${perPage}`;
        break;
      }
      case GET_ONE:
        url = `${API_URL}/${resource}/${params.id}`;
        break;
      case GET_MANY: {
        const query = {
          filter: JSON.stringify({id: params.ids}),
        };
        url = `${API_URL}/${resource}?${stringify(query)}`;
        break;
      }
      case GET_MANY_REFERENCE: {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
          sort: JSON.stringify([field, order]),
          range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
          filter: JSON.stringify({...params.filter, [params.target]: params.id}),
        };
        url = `${API_URL}/${resource}?${stringify(query)}`;
        break;
      }
      case UPDATE:
        url = `${API_URL}/${resource}/${params.id}`;
        options.method = 'PUT';
        options.body = JSON.stringify(params.data);
        break;
      case CREATE:
        url = `${API_URL}/${resource}`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;
      case DELETE:
        url = `${API_URL}/${resource}/${params.id}`;
        options.method = 'DELETE';
        break;
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} REST response
   */
  const convertHTTPResponseToREST = (response, type, resource, params) => {
    const { json } = response;
    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        return {
          data: json["hydra:member"].map(x => x),
          total: json["hydra:totalItems"]
        };
      case CREATE:
        return { data: { ...params.data, id: json.id } };
      case DELETE:
        return { data: { ...params.data } };
      default:
        return { data: json };
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a REST response
   */
  return (type, resource, params) => {
    // json-server doesn't handle WHERE IN requests, so we fallback to calling GET_ONE n times instead
    if (type === GET_MANY) {
      return Promise.all(params.ids.map(id => httpClient(`${API_URL}/${resource}/${id}`)))
      .then(responses => ({ data: responses.map(response => response.json) }));
    }
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);
    return httpClient(url, options)
    .then(response => convertHTTPResponseToREST(response, type, resource, params));
  };
};
