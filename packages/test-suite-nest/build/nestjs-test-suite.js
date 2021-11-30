"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestJSTestSuite = void 0;
const test_suite_1 = require("@ajdhefley/test-suite");
const nestjs_test_strategy_1 = require("./nestjs-test-strategy");
class NestJSTestSuite extends test_suite_1.TestSuite {
    constructor(classType, excludeOthers = false) {
        super(classType.name, excludeOthers);
        this.classType = classType;
    }
    async initializeTest(mockMapper, declarations, imports, providers, callback) {
        let strategy = new nestjs_test_strategy_1.NestJSTestStrategy(this.classType);
        await strategy.initialize(mockMapper, declarations, imports, providers, callback);
    }
}
exports.NestJSTestSuite = NestJSTestSuite;
