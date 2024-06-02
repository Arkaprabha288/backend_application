import add from '../add';

test('add() should return the sum of two numbers', () => {
    // Arrange
    const a = 1;
    const b = 2;
  
    // Act
    const result = add(a, b);
  
    // Assert
    expect(result).toBe(3);
  });