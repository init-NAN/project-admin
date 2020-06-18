import {
  http
} from '@/utils/http'
//获取合同表格列表
export const getattrContract = () => {
  return http.get('attrContract');
}
//新建合同
export const creatAttrContract = ({
  date,
  contractName,
  management,
  contractNo,
  peoName,
  per,
  costCycle,
  amountReceivable,
  amountPaid,
  refundAmount,
  amountOwed,
  id
}) => {
  return http.post('attrContract', {
    date,
    contractName,
    management,
    contractNo,
    peoName,
    per,
    costCycle,
    amountReceivable,
    amountPaid,
    refundAmount,
    amountOwed,
    id
  })
}
// 修改合同
export const editAttrContract = ({
  id,
  date,
  contractName,
  management,
  contractNo,
  peoName,
  per,
  costCycle,
  amountReceivable,
  amountPaid,
  refundAmount,
  amountOwed
}) => {
  return http.put(`attrContract/${id}`, {
    date,
    contractName,
    management,
    contractNo,
    peoName,
    per,
    costCycle,
    amountReceivable,
    amountPaid,
    refundAmount,
    amountOwed,
  })
}

//删除单个合同
export const deletAttrContract = (id) => {
  return http.delete(`attrContract/${id}`)
}
