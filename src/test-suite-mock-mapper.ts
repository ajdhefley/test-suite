import { Type } from '@angular/core';
import { MockOf } from './test-mock';
import { mockService } from './test-mock';

export class TestSuiteMockMapper {
    private mocks: any;

    add(type: Type<any>) {
        this.mocks[type.name] = mockService(type);
    }

    get<TMock>(serviceType: Type<TMock>): MockOf<TMock> {
        return this.mocks[serviceType.name];
    }
}