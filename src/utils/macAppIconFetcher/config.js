import path from 'node:path'

/**
 * 导出配置对象
 */
export const CONFIG = {
  paths: {
    output: path.join(process.cwd(), '/assets/imgs', 'tools'),
    data: path.join(process.cwd(), '/config', 'tools.js'),
  },
  iconSize: 64,
  onlyMissingIcons: false,
  concurrency: 10,
  verbose: false,
}
