import { theme } from 'antd';
import type { ThemeConfig } from 'antd';

let themeConfig: ThemeConfig = {
  // 1. 单独使用暗色算法
  algorithm: theme.defaultAlgorithm,
  // 2. 组合使用暗色算法与紧凑算法
  // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
  token: {
    // Seed Token，影响范围大
    colorPrimary: '#75baff',
    borderRadius: 2,
    fontSize: 12,
    // 派生变量，影响范围小
    colorBgContainer: '#cae4ff',
  },
  components: {
    Button: {
      colorPrimary: '#75baff',
      controlOutline: '#75baff',
      fontSize: 12,
      algorithm: true, // 启用算法
    },
    Input: {
      colorPrimary: '#75baff',
      fontSize: 12,
      algorithm: true, // 启用算法
    }
  },
}
export default themeConfig