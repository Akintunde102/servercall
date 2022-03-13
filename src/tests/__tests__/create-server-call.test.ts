import { createServerCall } from "../../create-server-call";
import { serverCalls } from "../resources/fake-server-call-store";


describe('ServerCall', () => {

    const serverCall = createServerCall({
        baseUrl: "http://localhost:9000",
        logger: console.log,
        defaultAuthSource: () => "fake-auth",
        defaultResponseDataDept: (response: any) => response?.["data"]
    })

    it("passes serverCall as a function", () => {
        expect(typeof serverCall).toBe("function");
    })

    it("does not run", async () => {
        const response = await serverCall({ serverCallProps: { call: serverCalls.getUser }, pathArgs: { id: "620aec25eaf54c618c8f26f2" }, authorized: true, run: false });
        expect(response).toBe(undefined);
    })
});