import { Type } from '@angular/core';
import { AngularTestStrategy } from '../strategy/angular-test-strategy';
import { TestMockMapper } from '../test-mock-mapper';
import { TestSuite } from './test-suite';

export type AngularTestSuiteType = 'component' | 'service';

export class AngularTestSuite<T> extends TestSuite<T> {
    constructor(readonly classType: Type<T>, readonly testType: AngularTestSuiteType, excludeOthers: boolean = false) {
        super(classType.name, excludeOthers);
    }

    protected async initializeTest(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function) {
        let strategy = new AngularTestStrategy(this.testType, this.classType);
        await strategy.initialize(mockMapper, declarations, imports, providers, callback);
    }
}
