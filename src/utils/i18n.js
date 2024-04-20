import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // 检测用户当前使用的语言
  .use(LanguageDetector)
  // 注入 react-i18next 实例
  .use(initReactI18next)
  // 初始化 i18next
  .init({
    debug: true,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          'Water Resources Management System': 'Water Resources Management System',
          // 这里是我们的翻译文本
          Roles: 'Roles',
          UserId: 'UserId',
          RealName: 'Real Name',
          AccountName: 'Account Name',
          Email: 'Email',
          Phone: 'Phone',
          Sex: 'Sex',
          Birthday: 'Birthday',
          AddTime: 'Add Time',
          WaterSources: 'Water Sources',
          WaterArea: 'Water Area',
          WaterPriceType: 'Water Price Type',
          Description: 'Description',
          addUser: 'Add User',
          PlanTime: 'PlanTime',
          StartTime: 'Start Time',
          EndTime: 'End Time',
          DetectTime: 'Detect Time',
          DetectPeople: 'Detect People',
          Supply: 'Supply(billion cubic meters)',
          Storage: 'Storage(billion cubic meters)',
          WaterID: 'Water ID',
          Type: 'Type',
          WaterName: 'Water Name',
          Address: 'Address',
          CheckUser: 'Check User',
          Turbidity: 'Turbidity(NTU)',
          PH: 'PH',
          Fluoride: 'Fluoride(mg/L)',
          Cyanin: 'Cyanin(mg/L)',
          Title: 'Title',
          Link: 'Link',
          delReason: 'delReason',
          Action: 'Action',
          Delete: 'Delete',
          Update: 'Update',
          Add: 'Add',
          BatchDelete: 'Batch Delete',
          Export: 'Export',
          Yes: 'Yes',
          No: 'No',
          Search: 'Search',
          Reset: 'Reset',
          Submit: 'Submit',
          Login: 'Login',
          'change success!': 'change success!',
          'change fail!': 'change fail!',
          'Are you sure delete this user': 'Are you sure delete this user',
          'Are you sure delete this plan': 'Are you sure delete this plan',
          'Are you sure delete this storage': 'Are you sure delete this storage',
          'Are you sure delete this quality': 'Are you sure delete this quality',
          'Are you sure delete this water': 'Are you sure delete this water',
          'Are you sure delete this water type': 'Are you sure delete this water type',
          'Change Password': 'Change Password',
          'email or phone': 'email or phone',
          'Please input password!': 'Please input password!',
          'Please input email or phone!': 'Please input email or phone!',
          'Please input description!': 'Please input description!',
          'Please input add user!': 'Please input add user!',
          'Please input start time!': 'Please input start time!',
          'Please input end time!': 'Please input end time!',
          'Please input water sources!': 'Please input water sources!',
          'Please input water area!': 'Please input water area!',
          'Please select water price type!': 'Please select water price type!',
          'Please input old password!': 'Please input old password!',
          'Please input new password!': 'Please input new password!',
          'Please input real name!': 'Please input real name!',
          'Please input account name!': 'Please input account name!',
          'Please input phone!': 'Please input phone!',
          'Please input email!': 'Please input email!',
          'Please select sex!': 'Please select sex!',
          'Please input birthday!': 'Please input birthday!',
          'Please select roles!': 'Please select roles!',
          'Please input storage!': 'Please input storage!',
          'Please input supply!': 'Please input supply(billion cubic meters)!',
          'Please input detect people!': 'Please input detect people!',
          'Please input detect time!': 'Please input detect time!',
          'Please input type!': 'Please input type!',
          'Please input delete reason！！！': 'Please input delete reason！！！',
          'Please input water name!': 'Please input water name!',
          'Please input address!': 'Please input address!',
          'Please input check user!': 'Please input check user!',
          'Please input ph!': 'Please input ph!',
          'Please input turbidity!': 'Please input turbidity!',
          'Please input fluoride!': 'Please input fluoride!',
          'Please input cyanin!': 'Please input cyanin!',
          'Please input title!': 'Please input title!',
          'Please input link!': 'Please input link!',
          'The input is not valid E-mail!': 'The input is not valid E-mail!',
          admin: 'admin',
          engineer: 'engineer',
          searcher: 'searcher',
          AddUser: 'Add User',
          AddPlan: 'Add Plan',
          AddWater: 'Add Water',
          AddType: 'Add Type',
          male: 'male',
          female: 'female',
          oldPassword: 'Old Password',
          newPassword: 'New Password',
          BasicInfo: 'Basic Info',
          UpdatePassword: 'Update Password',
          SupplyArea: 'Supply Area',
          SupplyType: 'Supply Type',
          userType: 'User Type',
          waterPrice: 'Water Price',
          basicPrice: 'Basic Price',
          resourceCost: 'Resource Cost',
          pollutionCost: 'Pollution Cost',
          realPrice: 'Real Price',
          Account: 'Account',
          Password: 'Password',
          dashboard: 'Dashboard',
          userManage: 'User Manage',
          userCenter: 'User Center',
          waterPlan: 'Water Plan',
          waterPlanManage: 'Water Plan Manage',
          waterPriceTable: 'Water Price Table',
          waterSourcesManage: 'Water Sources Manage',
          waterTypeManage: 'Water Type Manage',
          waterStorageManage: 'Water Storage Manage',
          waterQualityManage: 'Water Quality Manage',
          storage: 'storage',
          quality: 'quality',
          'add quality info': 'add quality info',
          'add storage info': 'add storage info',
          'Update Water': 'Update Water',
          'Create Water': 'Create Water',
          'Update Water Type': 'Update Water Type',
          'Create Water Type': 'Create Water Type',
          'Update Water Quality': 'Update Water Quality',
          'Create Water Quality': 'Create Water Quality',
          'Update Water Storage': 'Update Water Storage',
          'Create Water Storage': 'Create Water Storage',
          'Create Water Link': 'Create Water Link',
          'Update User': 'Update User',
          'Create User': 'Create User',
          'Update Plan': 'Update Plan',
          'Create Plan': 'Create Plan',
          'Delete Reason': 'Delete Reason',
          'Send a message to the relevant responsible person': 'Send a message to the relevant responsible person'
        }
      },
      zh: {
        translation: {
          'Water Resources Management System': '水资源信息管理系统',
          Roles: '角色',
          UserId: '用户ID',
          RealName: '真实姓名',
          AccountName: '昵称',
          Email: '邮箱',
          Phone: '手机号',
          Sex: '性别',
          Birthday: '生日',
          AddTime: '添加时间',
          WaterSources: '水资源',
          WaterArea: '供水区域',
          WaterPriceType: '用水类型',
          Description: '详情',
          addUser: '添加人',
          PlanTime: '计划时间',
          StartTime: '开始时间',
          EndTime: '结束时间',
          DetectTime: '测量时间',
          DetectPeople: '测量人员',
          Supply: '供水量(亿立方米)',
          Storage: '库存量(亿立方米)',
          WaterID: '水资源ID',
          Type: '类型',
          WaterName: '水资源名称',
          Address: '区域',
          CheckUser: '核查人员',
          Turbidity: '浊度(NTU)',
          PH: '酸碱度',
          Fluoride: '含氟量(mg/L)',
          Cyanin: '含氰量(mg/L)',
          Title: '标题',
          Link: '链接',
          delReason: '删除原因',
          Action: '操作',
          Delete: '删除',
          Update: '修改',
          Add: '新增',
          BatchDelete: '批量删除',
          Export: '导出数据',
          Yes: '是',
          No: '否',
          Search: '搜索',
          Reset: '重置',
          Submit: '提交',
          Login: '登录',
          'change success!': '修改成功!',
          'change fail!': '修改失败!',
          'Are you sure delete this user': '是否删除此用户',
          'Are you sure delete this plan': '是否删除此计划',
          'Are you sure delete this storage': '是否删除此水量信息',
          'Are you sure delete this quality': '是否删除此水质信息',
          'Are you sure delete this water': '是否删除此水资源信息',
          'Are you sure delete this water type': '是否删除此水资源类型信息',
          'Change Password': '修改密码',
          'email or phone': '邮箱或手机号',
          'Please input password!': '请输入密码!',
          'Please input email or phone!': '请输入邮箱或手机号!',
          'Please input description!': '请输入详情!',
          'Please input add user!': '请输入添加用户!',
          'Please input start time!': '请输入开始时间!',
          'Please input end time!': '请输入结束时间!',
          'Please input water sources!': '请输入水资源!',
          'Please input water area!': '请输入水资源区域!',
          'Please select water price type!': '请选择水价类型!',
          'Please input old password!': '请输入旧密码!',
          'Please input new password!': '请输入新密码!',
          'Please input real name!': '请输入真实姓名!',
          'Please input account name!': '请输入昵称!',
          'Please input phone!': '请输入手机号!',
          'Please input email!': '请输入邮箱!',
          'Please select sex!': '请输入性别!',
          'Please input birthday!': '请输入生日!',
          'Please select roles!': '请选择角色!',
          'Please input storage!': '请输入库存量!',
          'Please input supply!': '请输入供水量(亿立方米)!',
          'Please input detect people!': '请输入测量人员!',
          'Please input detect time!': '请输入测量时间!',
          'Please input type!': '请输入类型!',
          'Please input delete reason！！！': '请输入删除原因！！！',
          'Please input water name!': '请输入水资源名称!',
          'Please input address!': '请输入水资源区域!',
          'Please input check user!': '请输入核查人员!',
          'Please input ph!': '请输入酸碱度!',
          'Please input turbidity!': '请输入浊度!',
          'Please input fluoride!': '请输入含氟量!',
          'Please input cyanin!': '请输入含氰量!',
          'Please input title!': '请输入标题!',
          'Please input link!': '请输入链接!',
          'The input is not valid E-mail!': '该输入是无效的电子邮件!',
          admin: '超级管理员',
          engineer: '总工程师',
          searcher: '水资源调查人员',
          AddUser: '新增用户',
          AddPlan: '新增计划',
          AddWater: '新增水资源',
          AddType: '新增类型',
          male: '男',
          female: '女',
          oldPassword: '旧密码',
          newPassword: '新密码',
          BasicInfo: '基本信息',
          UpdatePassword: '修改密码',
          SupplyArea: '用水区域',
          SupplyType: '用水类型',
          userType: '用户类型',
          waterPrice: '自来水价格',
          basicPrice: '基本水价',
          resourceCost: '水资源费',
          pollutionCost: '污水处理费',
          realPrice: '用户最终负担价格',
          Account: '账号',
          Password: '密码',
          dashboard: '工作台',
          userManage: '用户管理',
          userCenter: '个人中心',
          waterPlan: '供水计划',
          waterPlanManage: '供水计划管理',
          waterPriceTable: '水价表',
          waterSourcesManage: '水资源管理',
          waterTypeManage: '水资源类型管理',
          waterStorageManage: '水量管理',
          waterQualityManage: '水质管理',
          storage: '水量',
          quality: '水质',
          'add quality info': '新增水质信息',
          'add storage info': '新增水量信息',
          'Update Water': '修改水资源信息',
          'Create Water': '新增水资源信息',
          'Update Water Type': '修改水资源类型',
          'Create Water Type': '新增水资源类型',
          'Update Water Quality': '修改水质信息',
          'Create Water Quality': '新增水质信息',
          'Update Water Storage': '修改水量信息',
          'Create Water Storage': '新增水量信息',
          'Create Water Link': '新增水资源相关链接',
          'Update User': '修改用户信息',
          'Create User': '新增用户信息',
          'Update Plan': '修改供水计划信息',
          'Create Plan': '新增供水计划信息',
          'Delete Reason': '删除原因',
          'Send a message to the relevant responsible person': '发送消息给相关负责人'
        }
      }
    }
  });

export default i18n;
