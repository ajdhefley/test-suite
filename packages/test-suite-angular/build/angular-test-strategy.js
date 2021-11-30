"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngularTestStrategy = void 0;
const testing_1 = require("@angular/core/testing");
const test_suite_1 = require("@ajdhefley/test-suite");
class AngularTestStrategy extends test_suite_1.TestSuiteStrategy {
    constructor(testType, classType) {
        super();
        this.testType = testType;
        this.classType = classType;
    }
    async initialize(mockMapper, declarations, imports, providers, callback) {
        switch (this.testType) {
            case 'component': {
                // Tested components declare themselves by default.
                declarations.push(this.classType);
                await testing_1.TestBed.configureTestingModule({
                    declarations,
                    imports,
                    providers
                }).compileComponents();
                let componentFixture = testing_1.TestBed.createComponent(this.classType);
                let cls = componentFixture.componentInstance;
                callback(cls, mockMapper);
                // Trigger the component lifecycle prior to the tests.
                componentFixture.detectChanges();
            }
            case 'service': {
                let cls = testing_1.TestBed.inject(this.classType);
                callback(cls, mockMapper);
            }
        }
    }
}
exports.AngularTestStrategy = AngularTestStrategy;
