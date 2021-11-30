import { Type } from '@angular/core';
import { TestMockMapper, TestSuite } from '@ajdhefley/test-suite';
import { AngularTestStrategy } from './angular-test-strategy';

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
