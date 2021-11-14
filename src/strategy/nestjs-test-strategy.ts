import { Test, TestingModule } from '@nestjs/testing';
import { TestMockMapper } from '../test-mock-mapper';
import { TestStrategy } from './test-strategy';

export class NestJSTestStrategy<T> extends TestStrategy {
    constructor(readonly classType: any) {
        super();
    }

    async initialize(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function) {
        const app: TestingModule = await Test.createTestingModule({
            imports,
            providers
        }).compile();

        let cls = app.get<T>(this.classType);
        callback(cls, mockMapper);
    }
}
