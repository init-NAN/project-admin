import { http } from '@/utils/http'
//表格请求
export const getattrResours = ({page,pageSize}) => {
  return http.get(`/attrResours?_page=${page}&_limit=${pageSize}`);
}