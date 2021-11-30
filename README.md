# test-suite

Encapsulates boilerplate code of framework tests written in Jest, improving design and readability.

Supports:
* Angular 2+
* NestJS

### Examples

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

becomes:

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
        mocks.get(ComponentOptions).getOption.mockReturnValue(...);
        component.options = mocks.get(ComponentOptions);
    })
    .run();
```

---

```
describe('ParkController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/parks/:parkId/rides/ (GET) - 200', () => {
        return request(app.getHttpServer())
            .get('/parks/1/rides')
            .expect(200)
            .then((response) => {
                const rideNames = response.body.map(res => res.name);
                expect(rideNames).toContain('Possessed');
                expect(rideNames).toContain('Steel Force');
                expect(rideNames).toContain('Cedar Creek Flyers');
            });
    });
});
```

becomes:

```
new e2eNestJSTestSuite('ParkController')
    .addImports(AppModule)
    .addSpec('/parks/:parkId/rides/ (GET) - 200', (app, get, post, put, delete) => {
        return get('/parks/1/rides')
            .expect(200)
            .then((response) => {
                const rideNames = response.body.map(res => res.name);
                expect(rideNames).toContain('Possessed');
                expect(rideNames).toContain('Steel Force');
                expect(rideNames).toContain('Cedar Creek Flyers');
            });
    })
```

## Building

Run `npm run build` to build the npm packages.

## Testing

Run `npm run test` to execute the tests (Jest).