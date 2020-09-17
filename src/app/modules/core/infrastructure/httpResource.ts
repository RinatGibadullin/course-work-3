import { FetchResource } from "infrastructure/FetchResource";
import { ToastContainer, toast } from 'react-toastify';
const fetch = window.fetch.bind(window);

const httpResource = new FetchResource(process.env.REACT_APP_API_URL, {
  handleError: (payload) => {
    const message = payload?.parsedBody?.error || 'Неизвестная ошибка';
    toast(message, { type: toast.TYPE.ERROR });
  }
}, fetch);
export default httpResource;
