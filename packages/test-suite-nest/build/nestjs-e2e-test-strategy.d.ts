import { TestMockMapper, TestSuiteStrategy } from '@ajdhefley/test-suite';
export declare class e2eNestJSTestStrategy extends TestSuiteStrategy {
    initialize(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function): Promise<void>;
}
