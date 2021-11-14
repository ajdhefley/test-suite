import { TestMockMapper } from '../test-mock-mapper';

export abstract class TestStrategy {
    abstract initialize(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function);
}
