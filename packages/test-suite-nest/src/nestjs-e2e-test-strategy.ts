

import { Test, TestingModule } from '@nestjs/testing';
import { TestMockMapper, TestSuiteStrategy } from '@ajdhefley/test-suite';

export class e2eNestJSTestStrategy extends TestSuiteStrategy {
    async initialize(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function) {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports,
            providers
        }).compile();

        let app = moduleFixture.createNestApplication();
        await app.init();

        callback(app, mockMapper);
    }
}
