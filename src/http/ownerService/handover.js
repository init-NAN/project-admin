import { http } from '@/utils/http'

const HandOver = {
  //获取交房登记列表
  getHandOverTable() {
    return http.get('/handoverTable');
  }
}

export default HandOver