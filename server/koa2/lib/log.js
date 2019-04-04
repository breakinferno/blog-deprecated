import chalk from 'chalk'
import status from '../constant/log'
const log = console.log
const error = chalk.bold.red
const warning = chalk.bold.orange
const info = chalk.bold.green
const underline = chalk.underline

/**
 *实现日志打印
 *
 * @export
 * @param {*} level  日志级别   
 * @param {*} process 日志发生的程序方法
 * @param {*} message 日志内容
 */
export default function(level, process, message) {
    process = `[${process}]:`
    switch (level.toUpperCase()) {
        case status.ERROR :
            log(error('Error in ') + underline(process) + chalk.magenta(message))
            break
        case status.WARNING :
            log(warning('Warning in ') + underline(process) + chalk.blue(message))
            break
        case status.INFO :
            log(info('Just Tip in ') + underline(process) + chalk.cyan(message))
    }
}

export const LoggerStatus = status