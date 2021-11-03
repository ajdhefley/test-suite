import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TestSuiteMockMapper } from './test-suite-mock-mapper';

export type TestSuiteType = 'component' | 'service';

export class TestSuite<TClass> {
    private declarations = new Array<any>();
    private imports = new Array<any>();
    private customProviders = new Array<any>();
    private mockProviders = new Array<any>();
    private callbacks = new Array<() => void>();
    private mockMapper = new TestSuiteMockMapper();

    private class: TClass;
    private initialized: boolean;

    constructor(private classType: Type<TClass>, private testType: TestSuiteType, private excludeOthers?: boolean) { }

    addDeclarations(...declarations: any[]): TestSuite<TClass> {
        this.declarations.push(...declarations);
        return this;
    }

    addImports(...imports: any[]): TestSuite<TClass> {
        this.imports.push(...imports);
        return this;
    }

    addProviders(...providers: any[]): TestSuite<TClass> {
        this.customProviders.push(...providers);
        return this;
    }

    addMocks(...services: Type<any>[]): TestSuite<TClass> {
        this.callbacks.push(() => {
            beforeEach(() => {
                this.mockProviders = [];
                services.forEach((service) => {
                    this.mockMapper.add(service);
                    this.mockProviders.push({ provide: service, useValue: this.mockMapper.get(service) });
                });
            });
        });

        return this;
    }

    addTestCase(description: string, callback: (classInstance: TClass, mocks: TestSuiteMockMapper) => void, excludeOthers?: boolean): TestSuite<TClass> {
        this.callbacks.push(() => {
            if (excludeOthers) {
                fit(description, () => callback(this.class, this.mockMapper));
            }
            else {
                it(description, () => callback(this.class, this.mockMapper));
            }
        });

        return this;
    }

    beforeEach(callback: (classInstance: TClass, mocks: TestSuiteMockMapper) => void): TestSuite<TClass> {
        if (!this.initialized) {
            this.initialized = true;

            this.callbacks.push(() => {
                beforeEach(async () => {
                    switch (this.testType) {
                        case 'component': {
                            // Tested components declare themselves by default.
                            this.declarations.push(this.classType);

                            await TestBed.configureTestingModule({
                                declarations: this.declarations,
                                imports: this.imports,
                                providers: this.customProviders.concat(this.mockProviders)
                            }).compileComponents();

                            let componentFixture = TestBed.createComponent(this.classType);
                            this.class = componentFixture.componentInstance;
                            callback(this.class, this.mockMapper);
        
                            // Trigger the component lifecycle prior to the tests.
                            componentFixture.detectChanges();
                        }
                        case 'service': {
                            this.class = TestBed.inject(this.classType);
                            callback(this.class, this.mockMapper);
                        }
                    }
                });
            });
        }

        return this;
    }

    afterEach(callback: (classInstance: TClass, mocks: TestSuiteMockMapper) => void): TestSuite<TClass> {
        this.callbacks.push(() => {
            afterEach(() => callback(this.class, this.mockMapper));
        });

        return this;
    }

    run() {
        // Call here in case not called externally, to ensure test bed is initialized.
        this.beforeEach(() => {});

        if (this.excludeOthers) {
            fdescribe(this.classType.name, () => {
                this.callbacks.forEach((callback) => callback());
            });
        }
        else {
            describe(this.classType.name, () => {
                this.callbacks.forEach((callback) => callback());
            });
        }
    }
}
