import { Type } from '@angular/core';
import { TestMockMapper, TestSuite } from '@ajdhefley/test-suite';
export declare type AngularTestSuiteType = 'component' | 'service';
export declare class AngularTestSuite<T> extends TestSuite<T> {
    readonly classType: Type<T>;
    readonly testType: AngularTestSuiteType;
    constructor(classType: Type<T>, testType: AngularTestSuiteType, excludeOthers?: boolean);
    protected initializeTest(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function): Promise<void>;
}
