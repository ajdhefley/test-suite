import { TestMockMapper, TestSuiteStrategy } from '@ajdhefley/test-suite';
export declare class NestJSTestStrategy<T> extends TestSuiteStrategy {
    readonly classType: any;
    constructor(classType: any);
    initialize(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function): Promise<void>;
}
