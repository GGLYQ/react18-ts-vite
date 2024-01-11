import {theme } from 'antd';

let themeConfig={
  // 1. 单独使用暗色算法
  algorithm: theme.darkAlgorithm,
  // 2. 组合使用暗色算法与紧凑算法
  // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
  token: {
    // Seed Token，影响范围大
    colorPrimary: '#00b96b',
    borderRadius: 2,

    // 派生变量，影响范围小
    colorBgContainer: '#f6ffed',
  },
  components: {
    Button: {
      colorPrimary: '#00b96b',
    },
    Input: {
      colorPrimary: '#eb2f96',
    }
  },
}
export default themeConfig