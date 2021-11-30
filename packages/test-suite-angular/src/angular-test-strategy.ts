import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TestMockMapper, TestSuiteStrategy } from '@ajdhefley/test-suite';
import { AngularTestSuiteType } from './angular-test-suite';

export class AngularTestStrategy<T> extends TestSuiteStrategy {
    constructor (readonly testType: AngularTestSuiteType, readonly classType: Type<T>) {
        super();
    }

    async initialize(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[], callback: Function) {
        switch (this.testType) {
            case 'component': {
                // Tested components declare themselves by default.
                declarations.push(this.classType);

                await TestBed.configureTestingModule({
                    declarations,
                    imports,
                    providers
                }).compileComponents();

                let componentFixture = TestBed.createComponent(this.classType);
                let cls = componentFixture.componentInstance;
                callback(cls, mockMapper);

                // Trigger the component lifecycle prior to the tests.
                componentFixture.detectChanges();
            }
            case 'service': {
                let cls = TestBed.inject(this.classType);
                callback(cls, mockMapper);
            }
        }
    }
}