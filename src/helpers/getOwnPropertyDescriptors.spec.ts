import { getOwnPropertyDescriptors } from "./getOwnPropertyDescriptors"

describe('getOwnPropertyDescriptors', () => {
  it('should get all properties with or without object description', () => {
    const object = { test1: true, test2: false }
    expect(getOwnPropertyDescriptors(object)).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([]),
        expect.arrayContaining([]),
      ])
    )
  })
})