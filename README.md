# umi-plugin-build-info

umi@4 插件，用于在生产环境展示版本构建信息以及对应的版本最后一次 git 提交记录。

[![NPM version](https://img.shields.io/npm/v/umi-plugin-build-info.svg?style=flat)](https://npmjs.org/package/umi-plugin-build-info) [![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-build-info.svg?style=flat)](https://npmjs.org/package/umi-plugin-build-info)

## Install

```bash
pnpm i umi-plugin-build-info -D
```

## Usage

Configure in `.umirc.ts`,

```js
export default {
  plugins: ['umi-plugin-build-info'],
}
```

在生产环境浏览器控制台中，访问 `buildInfo` 变量即可：

```
window.buildInfo

<!--
{
  buildTime: '2024/4/7 17:06:02', 
  lastCommit: '[11e031b]: chore(deps): add build-info umi plugin, Sun Apr 7 17:05:45 2024 +0800'
}
-->
```

## Options

```js
export default defineConfig({
  buildInfo: {
    debug: true,
    buildInfoKey: 'buildInfo_xxx',
  },
})
```

| 配置项       | 类型    | 默认值    | 说明                             |
| ------------ | ------- | --------- | -------------------------------- |
| debug        | boolean | false     | 是否开启调试模式                 |
| injectAlways | boolean | false     | 是否总是注入变量，默认 `production` 环境才会注入 |
| buildInfoKey | string  | buildInfo | 构建信息注入在 window 中的变量值 |

## LICENSE

MIT