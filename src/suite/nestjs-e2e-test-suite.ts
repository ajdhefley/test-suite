import { INestApplication } from '@nestjs/common';
import { e2eNestJSTestStrategy } from '../strategy/nestjs-e2e-test-strategy';
import { TestMockMapper } from '../test-mock-mapper';
import { TestSuite } from './test-suite';

export class e2eNestJSTestSuite extends TestSuite<INestApplication> {
    constructor(name: string, excludeOthers: boolean = false) {
        super(name, excludeOthers);
    }

    protected async initializeTest(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function) {
        let strategy = new e2eNestJSTestStrategy();
        await strategy.initialize(mockMapper, declarations, imports, providers, callback);
    }
}
