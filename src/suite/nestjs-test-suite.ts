import { NestJSTestStrategy } from '../strategy/nestjs-test-strategy';
import { TestMockMapper } from '../test-mock-mapper';
import { TestSuite } from './test-suite';

export class NestJSTestSuite<TClass> extends TestSuite<TClass> {
    constructor(readonly classType: any, excludeOthers: boolean = false) {
        super(classType.name, excludeOthers);
    }

    protected initializeTest(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function) {
        let strategy = new NestJSTestStrategy(this.classType);
        strategy.initialize(mockMapper, declarations, imports, providers, callback);
    }
}