"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngularTestSuite = void 0;
const test_suite_1 = require("@ajdhefley/test-suite");
const angular_test_strategy_1 = require("./angular-test-strategy");
class AngularTestSuite extends test_suite_1.TestSuite {
    constructor(classType, testType, excludeOthers = false) {
        super(classType.name, excludeOthers);
        this.classType = classType;
        this.testType = testType;
    }
    async initializeTest(mockMapper, declarations, imports, providers, callback) {
        let strategy = new angular_test_strategy_1.AngularTestStrategy(this.testType, this.classType);
        await strategy.initialize(mockMapper, declarations, imports, providers, callback);
    }
}
exports.AngularTestSuite = AngularTestSuite;
