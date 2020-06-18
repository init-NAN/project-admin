import { http } from '@/utils/http'

const HandOver = {
  //获取交房登记列表
  getHandOverTable() {
    return http.get('/handoverTable');
  },
  //新增交房登记
  addHandOver(form) {
    return http.post('/handoverTable',form)
  },
  //删除交房登记
  delHandOver(id) {
    return http.delete(`/handoverTable/${id}`)
  },
  //更改交房日期
  changeHDate(id, handoverDate) {
    return http.patch(`/handoverTable/${id}`,{
      handoverDate
    })
  }
}

export default HandOver