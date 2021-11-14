

import { Test, TestingModule } from '@nestjs/testing';
import { TestMockMapper } from '../test-mock-mapper';
import { TestStrategy } from './test-strategy';

export class e2eNestJSTestStrategy extends TestStrategy {
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
