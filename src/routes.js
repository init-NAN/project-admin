import Main from './components/Main.vue';
import HoldView from './components/HoldView.vue';
import Login from './components/Login.vue';
import DeviceList from './components/device/DeviceList.vue';
import DeviceCmd from './components/device/DeviceCmd.vue';
import Usermgt from './components/user/UserManagement.vue';
import groupMgt from './components/group/GroupManagement.vue';
import DeviceStat from './components/device/DeviceStat.vue';
import Overview from './components/overview/Overview.vue';
import BaseTabs from './components/basestation/basetabs.vue';


//招商
const attractInvestment = () => import('./components/attractInvestment/attractInvestment.vue')
//资源
const resources = () => import('./components/attractInvestment/resources.vue')
const charts = () => import('./components/attractInvestment/charts/')
//合同
const contract = () => import('./components/attractInvestment/contract.vue')
//客户
const customer = () => import('./components/attractInvestment/customer.vue')
//合同模板
const contractTemplate = () => import('./components/attractInvestment/contractTemplate.vue')
const overviewAttractInvestment = () => import('./components/attractInvestment/overviewAttractInvestment.vue')
//合同预警
const contractWarning = () => import('./components/attractInvestment/contractWarning.vue')


//业主服务路由
const ownerService = () => import('./components/ownerService/index.vue')
//交房登记
const handoverHouse = () => import('./components/ownerService/handoverHouse.vue')
//接房登记
const receiveHouse = () => import('./components/ownerService/receiveHouse.vue')
//入住登记
const checkIn = () => import('./components/ownerService/checkIn.vue')
//装修登记
const decorate = () => import('./components/ownerService/decorate.vue')
//报修管理
const repairApplication = () => import('./components/ownerService/repairApplication.vue')
//租赁详情
const rentDetail = () => import('.//components/ownerService/rentDetail.vue')
//业主echarts
const ownerEcharts = () => import('./components/ownerService/ownerEcharts.vue')


//物业管理
const estateManagement = () => import('./components/estateManagement/estateManagement.vue')
//设备档案
const equipmentFiles = () => import('./components/estateManagement/equipmentFiles.vue')
//保养巡检计划
const inspectionPlan = () => import('./components/estateManagement/inspectionPlan.vue')
//保养巡检任务
const inspectionTask = () => import('./components/estateManagement/inspectionTask.vue')
//保养巡检核查
const maintenanceInspection = () => import('./components/estateManagement/maintenanceInspection.vue')
//保养巡检问题
const inspectionProblems = () => import('./components/estateManagement/inspectionProblems.vue')
//巡查任务
const patrolTask = () => import('./components/estateManagement/patrolTask.vue')
//巡查问题
const patrolProblems = () => import('./components/estateManagement/patrolProblems.vue')
const overviewEstate = () => import('./components/estateManagement/overviewsEstate.vue')


//财务中心
const financialCenter = () => import('./components/financialCenter/index')
const financialOverview = () => import('./components/financialCenter/financialOverview')
const financialEcharts = () => import('./components/financialCenter/financialEcharts')
const intentionMoney = () => import('./components/financialCenter/intentionMoney')
const deposit = () => import('./components/financialCenter/deposit')
const settlement = () => import('./components/financialCenter/settlement')
const charges = () => import('./components/financialCenter/charges.vue')

//能源管理
const energyManagement = () => import('./components/energyManagement/index')
const energyEcharts = () => import('./components/energyManagement/energyEcharts')
const installationManagement = () => import('./components/energyManagement/installationManagement')
const meterReading = () => import('./components/energyManagement/meterReading')
const historicalSupplement = () => import('./components/energyManagement/historicalSupplement')



//园付通
const yuanFuTong = () => import('./components/Yuanfutong/yuanFuTong.vue')
const businessRegistration = () => import('./components/Yuanfutong/businessRegistration.vue')
const registerForCash = () => import('./components/Yuanfutong/registerForCash.vue')
const memberInformation = () => import('./components/Yuanfutong/memberInformation.vue')
const whiteConsumption = () => import('./components/Yuanfutong/whiteConsumption.vue')
const discountConfiguration = () => import('./components/Yuanfutong/discountConfiguration.vue')
const accountInformation = () => import('./components/Yuanfutong/accountInformation.vue')
const monthlyFinancialStatements = () => import('./components/Yuanfutong/monthlyFinancialStatements.vue')
const overviewYuan = () => import('./components/Yuanfutong/overviewYuan.vue')


//产业分析
const industryAnalysis = () => import('./components/industryAnalysis/index')
const enterpriseArchives = () => import('./components/industryAnalysis/enterpriseArchives')
const retiredApplication = () => import('./components/industryAnalysis/retiredApplication')
const outputValue = () => import('./components/industryAnalysis/outputValue')
const taxRevenue = () => import('./components/industryAnalysis/taxRevenue')
const industryEcharts = () => import('./components/industryAnalysis/industryEcharts')

//会议管理
const meetingManagement = () => import('./components/meetingManagement/index')
const meetingRoomApplication = () => import('./components/meetingManagement/meetingRoomApplication')
const meetingOverView = () => import('./components/meetingManagement/meetingOverView')
const meetingManage = () => import('./components/meetingManagement/meetingManage')
const meetingRoomMange = () => import('./components/meetingManagement/meetingRoomMange')
const meetingType = () => import('./components/meetingManagement/meetingType')
const meetingEcharts = () => import('./components/meetingManagement/meetingEcharts')



//智慧停车
const parkingManagement = () => import('./components/parkingManagement/parkingManagement.vue')
const accessInquiry = () => import('./components/parkingManagement/accessInquiry.vue')
const chargeManagement = () => import('./components/parkingManagement/chargeManagement.vue')
const monthlyCardManagement = () => import('./components/parkingManagement/monthlyCardManagement.vue')
const paymentStatistics = () => import('./components/parkingManagement/paymentStatistics.vue')
const overviewParking = ()=>import ('./components/parkingManagement/overviewParking.vue')

let routes = [{
    path: '/',
    component: Main,
    name: '',
    redirect: '/attractInvestment/overviewAttractInvestment',
    children: [
      {
        path: 'attractInvestment',
        component: attractInvestment,
        name: '',
        redirect: '/attractInvestment/overviewAttractInvestment',
        title: '招商管理',
        iconCls: 'el-icon-help',
        children: [{
            path: 'resources',
            component: resources,
            title: '资源',
          },

          {
            path: 'contract',
            component: contract,
            title: '合同列表',
          },
          {
            path: 'customer',
            component: customer,
            title: '客户',
          },
          {
            path: 'contractTemplate',
            component: contractTemplate,
            title: '合同模板',
          },
          {
            path: 'contractWarning',
            component: contractWarning,
            title: '合同预警'
          }
        ]

      },
      {
        path: 'ownerService',
        component: ownerService,
        name: '',
        redirect: '/ownerService/ownerEcharts',
        title: '业主服务',
        iconCls: 'el-icon-service',
        children: [{
            path: 'handoverHouse',
            component: handoverHouse,
            title: '交房登记'
          },
          {
            path: 'receiveHouse',
            component: receiveHouse,
            title: '接房登记'
          },
          {
            path: 'checkIn',
            component: checkIn,
            title: '入住登记'
          },
          {
            path: 'decorate',
            component: decorate,
            title: '装修登记'
          },
          {
            path: 'repairApplication',
            component: repairApplication,
            title: '报修管理'
          },
          {
            path: 'rentDetail',
            component: rentDetail,
            title: '租赁详情'
          }
        ]
      },
      {
        path: 'estateManagement',
        component: estateManagement,
        redirect: '/estateManagement/overviewEstate',
        name: '',
        title: '物业报修',
        iconCls: 'el-icon-video-play',
        children: [{
            path: 'equipmentFiles',
            component: equipmentFiles,
            title: '设备档案',
          },
          {
            path: 'inspectionPlan',
            component: inspectionPlan,
            title: '保养巡检计划',
          },
          {
            path: 'inspectionTask',
            component: inspectionTask,
            title: '保养巡检任务',
          },
          {
            path: 'maintenanceInspection',
            component: maintenanceInspection,
            title: '保养巡检核查',
          },
          {
            path: 'inspectionProblems',
            component: inspectionProblems,
            title: '保养巡检问题',
          },
          {
            path: 'patrolTask',
            component: patrolTask,
            title: '巡查任务',
          },
          {
            path: 'patrolProblems',
            component: patrolProblems,
            title: '巡查问题',
          },
        ]
      },
      {
        path: 'financialCenter',
        component: financialCenter,
        name: '',
        redirect: '/financialCenter/financialEcharts',
        title: '财务中心',
        iconCls: 'el-icon-bank-card',
        children: [{
            path: 'financialOverview',
            component: financialOverview,
            title: '应收总账'
          },
          {
            path: 'intentionMoney',
            component: intentionMoney,
            title: '意向金管理'
          },
          {
            path: 'deposit',
            component: deposit,
            title: '押金管理'
          },
          {
            path: 'settlement',
            component: settlement,
            title: '结算单'
          },
          {
            path: 'charges',
            component: charges,
            title: '收费项'
          },
        ]
      },
      {
        path: 'energyManagement',
        component: energyManagement,
        name: '',
        redirect: '/energyManagement/energyEcharts',
        title: '能源管理',
        iconCls: 'el-icon-s-opportunity',
        children: [{
            path: 'installationManagement',
            component: installationManagement,
            title: '装表管理'
          },
          {
            path: 'meterReading',
            component: meterReading,
            title: '抄表管理'
          },
          {
            path: 'historicalSupplement',
            component: historicalSupplement,
            title: '历史补抄'
          }
        ]
      },
      {
        path: 'yuanFuTong',
        component: yuanFuTong,
        name: '',
        redirect: '/yuanFuTong/overviewYuan',
        title: '园付通',
        iconCls: 'el-icon-user-solid',
        children: [{
            path: 'businessRegistration',
            component: businessRegistration,
            title: '商家注册'
          },
          {
            path: 'registerForCash',
            component: registerForCash,
            title: '收银机注册'
          },
          {
            path: 'memberInformation',
            component: memberInformation,
            title: '会员信息'
          },
          {
            path: 'whiteConsumption',
            component: whiteConsumption,
            title: '消费白名单'
          },
          {
            path: 'discountConfiguration',
            component: discountConfiguration,
            title: '折扣配置'
          },
          {
            path: 'accountInformation',
            component: accountInformation,
            title: '账户信息'
          },
          {
            path: 'monthlyFinancialStatements',
            component: monthlyFinancialStatements,
            title: '财务月报表'
          }
        ]
      },
      {
        path: 'industryAnalysis',
        component: industryAnalysis,
        name: '',
        redirect: '/industryAnalysis/industryEcharts',
        title: '产业分析',
        iconCls: 'el-icon-data-analysis',
        children: [{
            path: 'enterpriseArchives',
            component: enterpriseArchives,
            title: '企业档案'
          },
          {
            path: 'retiredApplication',
            component: retiredApplication,
            title: '退园申请'
          },
          {
            path: 'outputValue',
            component: outputValue,
            title: '产值采集'
          },
          {
            path: 'taxRevenue',
            component: taxRevenue,
            title: '税收采集'
          }
        ]
      },
      {
        path: 'meetingManagement',
        component: meetingManagement,
        name: '',
        redirect: '/meetingManagement/meetingEcharts',
        title: '会议管理',
        iconCls: 'el-icon-date',
        children: [{
            path: 'meetingRoomApplication',
            component: meetingRoomApplication,
            title: '会议申请'
          },
          {
            path: 'meetingOverView',
            component: meetingOverView,
            title: '会议室看板'
          },
          {
            path: 'meetingManage',
            component: meetingManage,
            title: '会议管理'
          },
          {
            path: 'meetingRoomMange',
            component: meetingRoomMange,
            title: '会议室管理'
          },
          {
            path: 'meetingType',
            component: meetingType,
            title: '会议类型'
          }
        ]
      },
      {
        path: 'parkingManagement',
        component: parkingManagement,
        name: '',
        redirect: '/parkingManagement/overviewParking',
        title: '智慧停车',
        iconCls: 'el-icon-s-home',
        children: [{
            path: 'accessInquiry',
            component: accessInquiry,
            title: '出入查询'
          },
          {
            path: 'chargeManagement',
            component: chargeManagement,
            title: '收费管理'
          },
          {
            path: 'monthlyCardManagement',
            component: monthlyCardManagement,
            title: '月卡管理'
          },
          {
            path: 'paymentStatistics',
            component: paymentStatistics,
            title: '缴费统计'
          },
        ]
      }
    ]
  },
  {
    // 会匹配所有路径
    path: '*',
    component: Main,
  },
  {
    path: '/',
    component: Main,
    name: '',
    children: [{
        path: '/attractInvestment',
        component: attractInvestment,
        children: [{
            path: '/attractInvestment/charts',
            component: charts
          },
          {
            path: '/attractInvestment/overviewAttractInvestment',
            component: overviewAttractInvestment
          }
        ]
      },
      {
        path: '/ownerService',
        component: ownerService,
        children: [{
          path: '/ownerService/ownerEcharts',
          component: ownerEcharts
        }]
      },
      {
        path: '/estateManagement',
        component: estateManagement,
        children: [{
          path: '/estateManagement/overviewEstate',
          component: overviewEstate
        }, ]
      },
      {
        path: '/financialCenter',
        component: financialCenter,
        children: [{
          path: '/financialCenter/financialEcharts',
          component: financialEcharts
        }]
      },
      {
        path: '/energyManagement',
        component: energyManagement,
        children: [{
          path: '/energyManagement/energyEcharts',
          component: energyEcharts
        }]
      },
      {
        path: '/yuanFuTong',
        component: yuanFuTong,
        children: [{
          path: '/yuanFuTong/overviewYuan',
          component: overviewYuan
        }]
      },
      {
        path: '/industryAnalysis',
        component: industryAnalysis,
        children: [{
          path: '/industryAnalysis/industryEcharts',
          component: industryEcharts
        }]
      },
      {
        path: '/meetingManagement',
        component: meetingManagement,
        children: [{
          path: '/meetingManagement/meetingEcharts',
          component: meetingEcharts
        }]
      },
      {
        path: '/parkingManagement',
        component: parkingManagement,
        children: [{
          path: '/parkingManagement/overviewParking',
          component: overviewParking
        }]
      }
    ]
  }
];


export default routes;