import { Postman } from "../../../src/types/postman";
import { hmacBody } from "../../../src/generators/hmacBody";

var pm: Partial<Postman> = {
  request: {
    url: { toString: () => 'http://localhost/record/{{sample_1_2#id}}' },
    headers: []
  }
};

describe(hmacBody, () => {
  beforeEach(() => {
    pm.request!.body = { raw: 'an example body!!' };
    Object.assign(global, { pm });
  });

  afterEach(() => {
    delete (global as any).pm;
    jest.resetModules();
  });

  it('should compute the hmac of the request body', () => {
    const hmac = hmacBody('SHA256', 'a_secret');
    expect(hmac).toBe('6db0f63df5ec267fbfc37bccea78da58e3d049f11aa465c9a21211b05226130b');
  });

  it('should return an hmac of empty string if the body is null', () => {
    delete(pm.request!.body);

    const hmac = hmacBody('SHA256', 'a_secret');
    expect(hmac).toBe('3fe9e6f28283b7261833fbb97b9204bf1fb4f056062e5ba31764722954bac9ef');
  });

  it('should allow algorithm and password selection', () => {
    const hmac = hmacBody('SHA1', 'another_secret');
    expect(hmac).toBe('c130ce58a8036b07d338dade3c00f19abc6bdfe6');
  });

  // TODO: this!
  xit('should replace existing variables before hashing', () => {
    pm.request!.body = { raw: 'there is a {{variable}} here!' };

    const hmac = hmacBody('SHA256', 'a_secret');
    expect(hmac).toBe('5b6bd742833dd2f6244709ec94b74062f47b1d3f4d51cf863e4a83af1122a2bb');
  });
});