import axios from "axios";
import { singOut } from "~/modules/admin/actions";
import { store } from "~/store";
import { toast } from "react-toastify";

const UNAUTHORIZED = 401;

const getCompanyId = () => {
  const {
    admin: {
      profile: {
        companyId
      } = {}
    } = {}
  } = store.getState() || {};

  return companyId
}
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

api.interceptors.response.use(
  response => response,
  error => {
    const { status, statusText, data } = error.response;
    if (status === UNAUTHORIZED) {
      store.dispatch(singOut());
      toast.error('Token Inválido!!');
    }
    else {
      toast.error(`Falha na requisição ${status} - ${statusText} - ${error.message} \n${data}` || error.message);
    }
    return Promise.reject(error);
  }
);


axios.defaults.headers.common["Content-Type"] = "application/json";

api.getReportFFI = async (id) => {
  return await api.get(`reports/ffi/${id}`)
}

api.getReportAgreementAndAdjustment = async (filters) => {
  return await api.post(`reports/agreement-and-adjustments`, { ...filters, empId: getCompanyId() });
}

api.insertDueDateHistory = async (values) => {
  return await api.post(`agreement/history`, { ...values, empId: getCompanyId() });
}

export default api;
