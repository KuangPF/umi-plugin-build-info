import childProcess from 'child_process'
import type { IApi } from 'umi'

export default (api: IApi) => {
  api.describe({
    key: 'buildInfo',
    config: {
      default: {
        debug: false,
        injectAlways: false,
        buildInfoKey: 'buildInfo',
      },

      schema(Joi) {
        return Joi.object({
          debug: Joi.boolean(),
          injectAlways: Joi.boolean(),
          buildInfoKey: Joi.string(),
        })
      },
    },
  })

  api.addHTMLHeadScripts(() => {
    // 构建时间
    const buildTime = new Date().toLocaleString()
    // 提取最后一次提交记录的信息
    const lastCommit = childProcess.execSync('git log --format="[%h]: %s, %cd" -n 1').toString().trim().replace(/['"]/g, "");
    // 最新 tag
    const tag = childProcess.execSync('git tag --sort=-version:refname | head -n 1').toString().trim().replace(/['"]/g, "");
    // commit hash
    const commitHash = childProcess.execSync('git rev-parse HEAD').toString().trim().replace(/['"]/g, "");

    const { debug, buildInfoKey, injectAlways } = api.config.buildInfo

    if (api.env === 'production' || injectAlways) {
      if (debug) {
        api.logger.info(`buildTime: ${buildTime}`)
        api.logger.info(`lastCommit: ${lastCommit}`)
        api.logger.info(`tag: ${tag}`)
      }

      return `
      /* ## THIS CONTENT WAS INJECTED BY UMI BUILD_INFO PLUGIN ## */

      const buildInfo = Object.create(null);
      buildInfo.buildTime = '${buildTime}';
      buildInfo.lastCommit = '${lastCommit}';
      buildInfo.commitHash = '${commitHash}';
      buildInfo.tag = '${tag}';

      window.${buildInfoKey} = buildInfo
      `
    }

    return ''
  })
}
