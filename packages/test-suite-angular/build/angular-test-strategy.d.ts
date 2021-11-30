import { Type } from '@angular/core';
import { TestMockMapper, TestSuiteStrategy } from '@ajdhefley/test-suite';
import { AngularTestSuiteType } from './angular-test-suite';
export declare class AngularTestStrategy<T> extends TestSuiteStrategy {
    readonly testType: AngularTestSuiteType;
    readonly classType: Type<T>;
    constructor(testType: AngularTestSuiteType, classType: Type<T>);
    initialize(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function): Promise<void>;
}
