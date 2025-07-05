---
title: "Code Highlighting and Math Test"
date: "2025-01-05"
year: 2025
description: "Testing syntax highlighting for code blocks and mathematical formula rendering together"
category: "Technical"
tags: ["programming", "mathematics", "syntax highlighting", "testing", "algorithms"]
---

# Code Highlighting and Math Test

This article tests both code syntax highlighting and mathematical formula rendering.

## Mathematical Formulas

Let's start with some inline math: $E = mc^2$ and $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.

Here's a display formula:

$$\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}$$

And a more complex one:

$$\sum_{n=0}^{\infty} \frac{x^n}{n!} = e^x$$

## Code Syntax Highlighting

### Python Code

```python
def calculate_fibonacci(n):
    """Calculate the nth Fibonacci number using dynamic programming."""
    if n <= 1:
        return n

    a, b = 0, 1
    for i in range(2, n + 1):
        a, b = b, a + b

    return b

# Example usage
print(calculate_fibonacci(10))  # Output: 55
```

### JavaScript Code

```javascript
// Binary search algorithm
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; // Not found
}

const numbers = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(numbers, 7)); // Output: 3
```

### TypeScript Code

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

class UserManager {
    private users: User[] = [];

    constructor() {}

    addUser(user: Omit<User, 'id'>): User {
        const newUser: User = {
            id: this.generateId(),
            ...user
        };

        this.users.push(newUser);
        return newUser;
    }

    private generateId(): number {
        return Math.max(...this.users.map(u => u.id), 0) + 1;
    }

    getActiveUsers(): User[] {
        return this.users.filter(user => user.isActive);
    }
}
```

### SQL Code

```sql
-- Find users with their order counts
SELECT
    u.id,
    u.name,
    u.email,
    COUNT(o.id) as order_count,
    SUM(o.total_amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 10;
```

## Mathematical Algorithms

Here's the mathematical foundation for the binary search algorithm:

The time complexity is $O(\log n)$ because we eliminate half of the search space in each iteration.

If we have an array of size $n$, the maximum number of comparisons needed is:

$$\lceil \log_2 n \rceil$$

For example, with 1000 elements:
$$\lceil \log_2 1000 \rceil = \lceil 9.97 \rceil = 10$$

## Matrix Operations in Code

Here's how we might implement matrix multiplication:

```python
import numpy as np

def matrix_multiply(A, B):
    """Multiply two matrices A and B."""
    rows_A, cols_A = A.shape
    rows_B, cols_B = B.shape

    if cols_A != rows_B:
        raise ValueError("Invalid matrix dimensions for multiplication")

    C = np.zeros((rows_A, cols_B))

    for i in range(rows_A):
        for j in range(cols_B):
            for k in range(cols_A):
                C[i][j] += A[i][k] * B[k][j]

    return C

# Example usage
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
result = matrix_multiply(A, B)
print(result)
```

The mathematical representation of matrix multiplication is:

$$(AB)_{ij} = \sum_{k=1}^{n} A_{ik}B_{kj}$$

Where $A$ is an $m \times n$ matrix and $B$ is an $n \times p$ matrix.

## Conclusion

This article demonstrates that both code syntax highlighting and mathematical formula rendering work correctly together in our markdown system!
