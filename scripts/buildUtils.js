const chalk = require('chalk');

function getPadding(indent) {
    if (!indent)
        return '';
    return Array(indent * 4).join(' ');
}

function logBold(data, indent) {
    process.stdout.write(chalk.inverse(`${getPadding(indent)}${data}\n`));
}

function logMessage(data, indent) {
    process.stdout.write(`${getPadding(indent)}${data}\n`);
}

function logSuccess(data, indent) {
    process.stdout.write(chalk.bold(chalk.green(`${getPadding(indent)}${data}\n`)));
}

function logError(err) {
    if (!err?.name || !err?.message || !err?.stack)
        return;

    process.stdout.write('\n');
    process.stdout.write(chalk.inverse(chalk.red(err.name)));
    process.stdout.write(' ');
    process.stdout.write(chalk.bold(chalk.redBright(err.message)));
    process.stdout.write('\n');
    process.stdout.write(chalk.red(err.stack.split(' at ').slice(1).join('')));
    process.stdout.write('\n\n');
    process.stdout.write('');
}

module.exports = { logBold, logMessage, logSuccess, logError };