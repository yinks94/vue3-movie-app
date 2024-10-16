const userA = {
    name: 'HEROPY',
    age: 85
}

const userB = {
    name: 'Neo',
    age: 22
}

test('데이터가 일치해야 합니다.', () => {
    expect(userA.age).toBe(85)
    expect(userA).toEqual(
        {name: 'HEROPY', age: 85},
    )
})

test('데이터가 일치하지 않아야 합니다.', ()=>{
    expect(userB.name).not.toBe('HEROPY')
    expect(userB).not.toBe(userA)
})