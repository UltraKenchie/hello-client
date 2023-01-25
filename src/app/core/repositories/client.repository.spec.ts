import { TestBed } from "@angular/core/testing";
import { MockProvider } from "ng-mocks";
import { ApiService } from "../services/api.service";

import { ClientRepository } from "./client.repository";

describe("ClientRepository", () => {
    let service: ClientRepository;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MockProvider(ApiService), ClientRepository]
        });
        service = TestBed.inject(ClientRepository);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
