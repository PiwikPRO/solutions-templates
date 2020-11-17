import getSelectorFromTarget from '../getSelectorFromTarget';

describe('when call getSelectorFromTarget', () => {
  it('should create proper selector', () => {
    expect(getSelectorFromTarget({
      nodeName: 'div',
      className: 'custom-class',
      id: 'my-custom-id'
    })).toBe('div .custom-class #my-custom-id');
  });
});
