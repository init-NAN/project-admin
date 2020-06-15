import { http } from '@/utils/http'
//获取合同表格列表
export const getattrContract = () => {
  return http.get('/arrtContract');
}

export const creatAttrContract = ({date,contractName,management,contractNo,peoName,per,costCycle,amountReceivable,amountPaid,refundAmount,amountOwed,id}) => {
  return http.post('/attrContract', {
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