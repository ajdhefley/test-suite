import { Type } from '@angular/core';
import { AngularTestStrategy } from '../strategy/angular-test-strategy';
import { TestMockMapper } from '../test-mock-mapper';
import { TestSuite } from './test-suite';

export type AngularTestSuiteType = 'component' | 'service';

export class AngularTestSuite<TClass> extends TestSuite<TClass> {
    constructor(readonly classType: Type<TClass>, readonly testType: AngularTestSuiteType, excludeOthers: boolean = false) {
        super(classType.name, excludeOthers);
    }

    protected initializeTest(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function) {
        let strategy = new AngularTestStrategy(this.testType, this.classType);
        strategy.initialize(mockMapper, declarations, imports, providers, callback);
    }
}