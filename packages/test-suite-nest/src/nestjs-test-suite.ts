import { TestMockMapper, TestSuite } from '@ajdhefley/test-suite';
import { NestJSTestStrategy } from './nestjs-test-strategy';

type Class<T> = new (...args: any[]) => T;

export class NestJSTestSuite<T> extends TestSuite<T> {
    constructor(readonly classType: Class<T>, excludeOthers: boolean = false) {
        super(classType.name, excludeOthers);
    }

    protected async initializeTest(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function) {
        let strategy = new NestJSTestStrategy(this.classType);
        await strategy.initialize(mockMapper, declarations, imports, providers, callback);
    }
}
