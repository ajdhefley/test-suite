const { join, resolve, basename } = require('path');
const { lstatSync, readdirSync, rmdirSync, existsSync } = require('fs');
const { exec } = require('child_process');
const { logBold, logMessage, logSuccess, logError } = require('./buildUtils');
const Config = require('./buildConfiguration');

function buildPackage(packageFolderPath) {
    return new Promise(($resolve, $reject) => {
        if (!existsSync(join(packageFolderPath, 'node_modules'))) {
            return exec(`npm --prefix ${packageFolderPath} install`, (err) => {
                if (err)
                    $reject(logError(err));
                else
                    $resolve(buildPackage(packageFolderPath));
            })
        }

        const buildPath = join(packageFolderPath, Config.buildDir);
        rmdirSync(buildPath, { recursive: true });
        
        exec(`npm --prefix ${packageFolderPath} run build`, (err) => {
            if (err)
                $reject(logError(err));
            else
                $resolve(logSuccess('OK', 1));
        });
    });
}

function locatePackages(packageNames) {
    return new Promise(($resolve, $reject) => {
        const baseDir = join(__dirname, '..');
        const packagesDir = resolve(baseDir, Config.packagesDir);

        const packageFolders = readdirSync(packagesDir)
            .filter(filename => packageNames.length == 0 || packageNames.includes(filename))
            .map(filename => join(packagesDir, filename))
            .filter(filepath => lstatSync(filepath).isDirectory());

        $resolve(packageFolders);
    });
}

////////////////////////////////////////////////////////

logBold('Building packages...');

locatePackages(process.argv.slice(2))
    .then(async (packageFolders) => {
        // Ensure Core is built first. This is only necessary so long as the
        // packages reference each other in the file system and not in npm.
        const core = packageFolders.find((folder) => folder.includes('test-suite-core'));
        if (core) {
            packageFolders.splice(packageFolders.indexOf(core), 1);
            packageFolders.unshift(core);
        }

        for (let packageFolder of packageFolders) {
            logMessage(basename(packageFolder), 1);
            await buildPackage(packageFolder);
        }
    })
    .catch((err) => {
        logError(err);
    });

////////////////////////////////////////////////////////
