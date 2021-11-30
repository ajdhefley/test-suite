import { Test, TestingModule } from '@nestjs/testing';
import { TestMockMapper, TestSuiteStrategy } from '@ajdhefley/test-suite';

export class NestJSTestStrategy<T> extends TestSuiteStrategy {
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
