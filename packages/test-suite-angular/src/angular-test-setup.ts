import { TestBed, TestBedStatic } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

export class AngularTestSetup {
    private static testBed: TestBedStatic;

    static async setTestBed(imports: any[], declarations: any[], providers: any[]) {
        TestBed.initTestEnvironment(
            BrowserDynamicTestingModule,
            platformBrowserDynamicTesting(),
        );

        beforeAll((done) => (async () => {
            TestBed.resetTestingModule();
            
            TestBed.configureTestingModule({
                declarations,
                imports,
                providers
            });

            await TestBed.compileComponents();

            // prevent Angular from resetting testing module
            TestBed.resetTestingModule = () => TestBed;
        })()
        .then(done)
        .catch(done.fail));
    }
}
