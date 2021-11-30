import { TestMockMapper, TestSuite } from '@ajdhefley/test-suite';
declare type Class<T> = new (...args: any[]) => T;
export declare class NestJSTestSuite<T> extends TestSuite<T> {
    readonly classType: Class<T>;
    constructor(classType: Class<T>, excludeOthers?: boolean);
    protected initializeTest(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function): Promise<void>;
}
export {};
