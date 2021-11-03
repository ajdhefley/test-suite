import { Type } from '@angular/core';
import { MockOf } from './test-mock';
import { mockService } from './test-mock';

export class TestMockMapper {
    private mocks = {};

    add(type: Type<any>) {
        this.mocks[type.name] = mockService(type);
    }

    get<TMock>(serviceType: Type<TMock>): MockOf<TMock> {
        return this.mocks[serviceType.name];
    }
}