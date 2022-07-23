# slim-suite

A library that makes Angular and NestJS tests simpler to read and write.

* Encapsulates boilerplate code for test module setup
* Streamlines mocking of dependencies by creating providers with spies behind the scenes
* Provides an elegant method-chaining API
* Can reduce old code by half or more
* Greatly increases developer productivity with less time spent on tests

Supports:
* Angular 2+
* NestJS

## Usage

Instantiate the framework suite (`AngularTestSuite`, `NestJsTestSuite`, `e2eNestJsTestSuite`), the component type being required as an argument for non-e2e test suites.

Method chaining is fully supported, with the following methods available:

* addImports
* addDeclarations
* addProviders
* addMocks
* addTest
* beforeEach
* afterEach
* run

### Examples

__Before:__

```
describe('TestedComponent', () => {
    let component: TestedComponent;
    let fixture: ComponentFixture<TestedComponent>;
    let mockFactory: MyFactory;
    let mockComponentOptions: ComponentOptions;

    beforeEach(async () => {
        mockFactory = new MyFactory();
        mockComponentOptions = {
            getOption: () => { ... }
        };

        await TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                TestedComponent,
                MyDeclaredComponent,
                MyOtherDeclaredComponent
            ],
            providers: [
                { provide: MyFactory, useValue: mockFactory }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.options = mockComponentOptions;
    });

    it('should', () => {
        mockFactory.getFactoryObject = jest.fn().mockreturnValue(of());
        component.factoryObj = mockFactory.getFactoryObject();
        ...
    });
});
```

__After:__

```
new AngularTestSuite(TestedComponent, 'component')
    .addImports(FormsModule)
    .addDeclarations(MyDeclaredComponent, MyOtherDeclaredComponent)
    .addMocks(MyFactory, ComponentOptions)
    .beforeEach((component, mocks) => {
        mocks.get(ComponentOptions).getOption.mockReturnValue(...);
        component.options = mocks.get(ComponentOptions);
    })
    .addTest('should', (component, mocks) => {
        component.factoryObj = mocks.get(MyFactory).getFactoryObject();
        ...
    })
    .run();
```

## Building

Run `npm run build` to build the npm packages.

## Testing

Run `npm run test` to execute internal tests (Jest).
