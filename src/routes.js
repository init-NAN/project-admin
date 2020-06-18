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
//抄表计费管理
const billingMeter = () => import('./components/estateManagement/billingMeter.vue')

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
            title: '合同',
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
        iconCls: 'el-icon-data-analysis',
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
          {
            path: 'billingMeter',
            component: billingMeter,
            title: '抄表计费管理'
          }
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
    ]
  }
];


export default routes;