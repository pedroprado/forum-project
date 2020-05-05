import { formatLocalDateTime } from './fn';

test('should format LocalDateTime', () =>{
    const result = formatLocalDateTime('2020-05-01T07:52:48.259234');

    expect(result).toBe('1 de maio de 2020');
})