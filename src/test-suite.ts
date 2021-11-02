import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TestSuiteType } from './test-suite-type';
import { TestSuiteMockMapper } from './test-suite-mock-mapper';

export class TestSuite<TFixture> {
    private declarations = new Array<any>();
    private imports = new Array<any>();
    private providers = new Array<any>();
    private mockProviders = new Array<any>();
    private specDefinitions = new Array<() => void>();
    private mockMapper = new TestSuiteMockMapper();

    private fixture: TFixture;
    private initialized: boolean;

    constructor(private fixtureType: Type<TFixture>, private testType: TestSuiteType, private excludeOthers?: boolean) { }

    addDeclarations(...declarations: any[]): TestSuite<TFixture> {
        this.declarations.push(...declarations);
        return this;
    }

    addImports(...imports: any[]): TestSuite<TFixture> {
        this.imports.push(...imports);
        return this;
    }

    addProviders(...providers: any[]): TestSuite<TFixture> {
        this.providers.push(...providers);
        return this;
    }

    addMocks(...services: Type<any>[]): TestSuite<TFixture> {
        this.specDefinitions.push(() => beforeEach(() => {
            this.mockProviders = [];
            services.forEach((service) => {
                this.mockMapper.add(service);
                this.mockProviders.push({ provide: service, useValue: this.mockMapper.get(service) });
            });
        }));
        return this;
    }

    addTestCase(description: string, specDefinition: (fixture: TFixture, mocks: TestSuiteMockMapper) => void, excludeOthers?: boolean): TestSuite<TFixture> {
        this.specDefinitions.push(() => {
            if (excludeOthers) {
                fit(description, () => specDefinition(this.fixture, this.mockMapper));
            }
            else {
                it(description, () => specDefinition(this.fixture, this.mockMapper));
            }
        });
        return this;
    }

    afterEach(definition: (fixture: TFixture, mocks: TestSuiteMockMapper) => void): TestSuite<TFixture> {
        this.specDefinitions.push(() => afterEach(() => definition(this.fixture, this.mockMapper)));
        return this;
    }

    beforeEach(customInitialization?: (fixture: TFixture, mocks: TestSuiteMockMapper) => void): TestSuite<TFixture> {
        if (!this.initialized) {
            this.initialized = true;

            if (this.testType == 'component') {
                // Tested components declare themselves by default.
                this.declarations.push(this.fixtureType);
            }

            this.specDefinitions.push(() => beforeEach(async () => {
                let testBedModule = await TestBed.configureTestingModule({
                    declarations: this.declarations,
                    imports: this.imports,
                    providers: this.providers.concat(this.mockProviders)
                });

                if (this.testType == 'component') {
                    testBedModule.compileComponents();

                    let componentWrapper = TestBed.createComponent(this.fixtureType);
                    this.fixture = componentWrapper.componentInstance;

                    if (customInitialization) {
                        // Provide the component and mocks to the initializer.
                        customInitialization(this.fixture, this.mockMapper);
                    }

                    // Trigger the component lifecycle last, after all other initialization.
                    componentWrapper.detectChanges();
                }

                if (this.testType == 'service') {
                    this.fixture = TestBed.inject(this.fixtureType);

                    if (customInitialization) {
                        customInitialization(this.fixture, this.mockMapper);
                    }
                }
            }));
        }

        return this;
    }

    run() {
        if (!this.initialized) {
            this.beforeEach();
        }

        if (this.excludeOthers) {
            fdescribe(this.fixtureType.name, () => {
                this.specDefinitions.forEach((specDefinition) => specDefinition());
            });
        }
        else {
            describe(this.fixtureType.name, () => {
                this.specDefinitions.forEach((specDefinition) => specDefinition());
            });
        }
    }
}
