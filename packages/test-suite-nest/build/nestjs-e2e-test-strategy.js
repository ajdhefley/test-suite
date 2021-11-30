"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e2eNestJSTestStrategy = void 0;
const testing_1 = require("@nestjs/testing");
const test_suite_1 = require("@ajdhefley/test-suite");
class e2eNestJSTestStrategy extends test_suite_1.TestSuiteStrategy {
    async initialize(mockMapper, declarations, imports, providers, callback) {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports,
            providers
        }).compile();
        let app = moduleFixture.createNestApplication();
        await app.init();
        callback(app, mockMapper);
    }
}
exports.e2eNestJSTestStrategy = e2eNestJSTestStrategy;
