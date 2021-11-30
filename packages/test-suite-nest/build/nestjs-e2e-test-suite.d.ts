import { INestApplication } from '@nestjs/common';
import { TestMockMapper, TestSuite } from '@ajdhefley/test-suite';
export declare class e2eNestJSTestSuite extends TestSuite<INestApplication> {
    constructor(name: string, excludeOthers?: boolean);
    protected initializeTest(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function): Promise<void>;
}
