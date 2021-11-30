"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e2eNestJSTestSuite = void 0;
const test_suite_1 = require("@ajdhefley/test-suite");
const nestjs_e2e_test_strategy_1 = require("./nestjs-e2e-test-strategy");
class e2eNestJSTestSuite extends test_suite_1.TestSuite {
    constructor(name, excludeOthers = false) {
        super(name, excludeOthers);
    }
    async initializeTest(mockMapper, declarations, imports, providers, callback) {
        let strategy = new nestjs_e2e_test_strategy_1.e2eNestJSTestStrategy();
        await strategy.initialize(mockMapper, declarations, imports, providers, callback);
    }
}
exports.e2eNestJSTestSuite = e2eNestJSTestSuite;
