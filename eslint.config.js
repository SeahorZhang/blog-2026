import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: {
    tsconfigPath: 'jsconfig.json',
  },
})
