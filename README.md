# ajdhefley/test-suite

Encapsulates standard boilerplate code of Angular and NestJS tests written in Jest, improving test design and making tests easier to read and write.

1. Reduces the size of spec files as well as time spent creating and maintaining them, enabling greater test coverage with less effort.
2. Eliminates need for global variables by injecting component/service and mocks into each callback, isolating each test.

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
    .addSpec('should', (component, mocks) => {
        component.factoryObj = mocks.get(MyFactory).getFactoryObject();
        ...
    })
    .beforeEach((component, mocks) => {
        mocks.get(ComponentOptions).getOption.and.returnValue(...);
        component.options = mocks.get(ComponentOptions);
    })
    .run();
```
