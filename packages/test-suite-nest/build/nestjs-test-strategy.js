"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestJSTestStrategy = void 0;
const testing_1 = require("@nestjs/testing");
const test_suite_1 = require("@ajdhefley/test-suite");
class NestJSTestStrategy extends test_suite_1.TestSuiteStrategy {
    constructor(classType) {
        super();
        this.classType = classType;
    }
    async initialize(mockMapper, declarations, imports, providers, callback) {
        const app = await testing_1.Test.createTestingModule({
            imports,
            providers
        }).compile();
        let cls = app.get(this.classType);
        callback(cls, mockMapper);
    }
}
exports.NestJSTestStrategy = NestJSTestStrategy;
