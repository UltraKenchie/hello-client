import { TestBed } from "@angular/core/testing";
import { MockProvider } from "ng-mocks";
import { ApiService } from "../services/api.service";

import { AuthRepository } from "./auth.repository";

describe("AuthRepository", () => {
    let service: AuthRepository;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MockProvider(ApiService), AuthRepository]
        });
        service = TestBed.inject(AuthRepository);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
