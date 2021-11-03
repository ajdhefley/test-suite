import { mockService } from './test-mock';
import { TestSuiteMockMapper } from './test-suite-mock-mapper';

class FakeService {

}

describe('test-mock.ts', () => {
    it('TestSuiteMockMapper should return mocked service', () => {
        //Arrange
        let mapper = new TestSuiteMockMapper();
        mapper.add(FakeService);

        //Act
        let mockedService = mockService(FakeService);
        let mapperMockedService = mapper.get(FakeService);

        //Assert
        expect(mapperMockedService.constructor).toEqual(mockedService.constructor);
    });
});