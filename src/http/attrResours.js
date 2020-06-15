import { http } from '@/utils/http'
//表格请求
export const getattrResours = () => {
  return http.get('/attrResours');
}