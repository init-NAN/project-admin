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
import index from './components/ownerService/index.vue'
import handoverHouse from './components/ownerService/handoverHouse.vue'
import receiveHouse from './components/ownerService/receiveHouse.vue'
import checkIn from './components/ownerService/checkIn.vue'
import decorate from './components/ownerService/decorate.vue'
import repairApplication from './components/ownerService/repairApplication.vue'




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
//物业管理
const estateManagement = () => import('./components/estateManagement/estateManagement.vue')
//设备档案
const equipmentFiles = () => import('./components/estateManagement/equipmentFiles.vue')
//检查巡检计划
const inspectionPlan = () => import('./components/estateManagement/inspectionPlan.vue')
let routes = [{
    path: '/',
    component: Main,
    name: '',
    redirect:'/attractInvestment/resources',
    children: [

      {
        path: 'attractInvestment',
        component: attractInvestment,
        name: '',
        redirect: '/attractInvestment/resources',
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
            path: 'charts',
            component: charts,
            title: '资源图示'
          }
        ]

      },

      {
        path: 'index',
        component: index,
        name: '',
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
        ]
      },
      {
        path: '/moveout',
        component: Usermgt,
        title: '物品放行',
        iconCls: 'el-icon-user',
        admin: 1,
        children: [{
            path: 'business',
            component: DeviceList,
            title: '申请记录',
          },
          {
            path: 'business',
            component: DeviceList,
            title: '统计分析',
          }
        ]
      }
    ]
  },
  {
    // 会匹配所有路径
    path: '*',
    component: Main,
  }

];


export default routes;