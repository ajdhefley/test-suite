# angular-test-suite

Encapsulates the standard boilerplate code of Jasmine tests in Angular, improving test design and making tests easier to read/write.

1. Significantly reduces the size of spec files, typically by over 50%.
2. Eliminates need for global variables by injecting component/service and mocks into each test.

### Example

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
        fixture.detectChanges();s
        component.options = mockComponentOptions;
    });

    it('should', () => {
        spyOn(mockFactory.getFactoryObject).and.returnValue(of());
        component.factoryObj = mockFactory.getFactoryObject();
        ...
    });
});
```

With this library, the above code can be transformed into the following:

```
new TestSuite(TestedComponent, 'component')
    .addImports(FormsModule)
    .addDeclarations(MyDeclaredComponent, MyOtherDeclaredComponent)
    .addMocks(MyFactory, ComponentOptions)
    .beforeEach((component, mocks) => {
        mocks.get(ComponentOptions).getOption.and.returnValue(...);
        component.options = mocks.get(ComponentOptions);
    })
    .addTestCase('should', (component, mocks) => {
        component.factoryObj = mocks.get(MyFactory).getFactoryObject();
        ...
    });
}).run();
```
