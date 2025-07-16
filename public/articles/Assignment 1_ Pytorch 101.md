# Assignment 1: Pytorch 101

这里是UMich EECS498第一次作业Pytorch 101的笔记和题目的Solution。同时，我也会在这个文档中加入补充更多PyTorch的知识。

## Tensor Basics

### Creating and Accessing tensors

在torch中，tensor是一个multidimensional grid of values，其中所有值的类型相同，并由一个非负整数元组索引。维数是tensor的rank。tensor的形状是一个整数元组，给出了数组沿每个维度的大小。

```python
# Create a rank 1 tensor from a Python list
a = torch.tensor([1, 2, 3]) # 通过嵌套的Python列表初始化torch tensor
print('Here is a:')
print(a)
print('type(a): ', type(a))
print('rank of a: ', a.dim())
print('a.shape: ', a.shape)

# Access elements using square brackets
print()
print('a[0]: ', a[0]) # 用方括号访问或修改torch tensor的元素
print('type(a[0]): ', type(a[0]))
print('type(a[0].item()): ', type(a[0].item())) # 可以用.item()方法将PyTorch标量转换为Python标量

# Mutate elements using square brackets
a[1] = 10
print()
print('a after mutating:')
print(a)
```

输出如下：

```shellsession
Here is a:
tensor([1, 2, 3])
type(a):  <class 'torch.Tensor'>
rank of a:  1
a.shape:  torch.Size([3])

a[0]:  tensor(1)
type(a[0]):  <class 'torch.Tensor'>
type(a[0].item()):  <class 'int'>

a after mutating:
tensor([ 1, 10,  3])
```

上面的例子仅展示了一个一维张量，我们可以类似地创建具有二维或多维的张量。

```python
# Create a two-dimensional tensor
b = torch.tensor([[1, 2, 3], [4, 5, 5]])
print('Here is b:')
print(b)
print('rank of b:', b.dim())
print('b.shape: ', b.shape)

# Access elements from a multidimensional tensor
print()
print('b[0, 1]:', b[0, 1])
print('b[1, 2]:', b[1, 2])

# Mutate elements of a multidimensional tensor
b[1, 1] = 100
print()
print('b after mutating:')
print(b)
```

这里的用法和一维是一样的，不再赘述，输出如下：

```shellsession
Here is b:
tensor([[1, 2, 3],
        [4, 5, 5]])
rank of b: 2
b.shape:  torch.Size([2, 3])

b[0, 1]: tensor(2)
b[1, 2]: tensor(5)

b after mutating:
tensor([[  1,   2,   3],
        [  4, 100,   5]])
```

现在，我们要来完成 `create_sample_tensor`、`mutate_tensor`和`count_tensor_elements`三个函数的实现。

```python
import torch

def create_sample_tensor():
  """
  Return a torch Tensor of shape (3, 2) which is filled with zeros, except for
  element (0, 1) which is set to 10 and element (1, 0) which is set to 100.

  Inputs: None

  Returns:
  - Tensor of shape (3, 2) as described above.
  """
  x = None
  #############################################################################
  #                    TODO: Implement this function                          #
  #############################################################################
  # Replace "pass" statement with your code
  x = torch.zeros(3, 2)
  #  another implementation: x = troch.tensor(
  #     [0, 0], [0, 0], [0, 0]
  #   )
  x[0, 1] = 10
  x[1, 0] = 100
  #############################################################################
  #                            END OF YOUR CODE                               #
  #############################################################################
  return x


def mutate_tensor(x, indices, values):
  """
  Mutate the PyTorch tensor x according to indices and values.
  Specifically, indices is a list [(i0, j0), (i1, j1), ... ] of integer indices,
  and values is a list [v0, v1, ...] of values. This function should mutate x
  by setting:

  x[i0, j0] = v0
  x[i1, j1] = v1

  and so on.

  If the same index pair appears multiple times in indices, you should set x to
  the last one.

  Inputs:
  - x: A Tensor of shape (H, W)
  - indicies: A list of N tuples [(i0, j0), (i1, j1), ..., ]
  - values: A list of N values [v0, v1, ...]

  Returns:
  - The input tensor x
  """
  #############################################################################
  #                    TODO: Implement this function                          #
  #############################################################################
  # Replace "pass" statement with your code
  for idx, val in zip(indices, values):
    i, j = idx
    if 0 <= i < x.shape[0] and 0 <= j < x.shape[1]: # check bounds
      x[i, j] = val # mutate
  #############################################################################
  #                            END OF YOUR CODE                               #
  #############################################################################
  return x

def count_tensor_elements(x):
  """
  Count the number of scalar elements in a tensor x.

  For example, a tensor of shape (10,) has 10 elements.a tensor of shape (3, 4)
  has 12 elements; a tensor of shape (2, 3, 4) has 24 elements, etc.

  You may not use the functions torch.numel or x.numel. The input tensor should
  not be modified.

  Inputs:
  - x: A tensor of any shape

  Returns:
  - num_elements: An integer giving the number of scalar elements in x
  """
  num_elements = None
  #############################################################################
  #                    TODO: Implement this function                          #
  #   You CANNOT use the built-in functions torch.numel(x) or x.numel().      #
  #############################################################################
  # Replace "pass" statement with your code
  for dim in x.shape:
    if num_elements is None:
      num_elements = dim  # Initialize with the first dimension size
    else:
      num_elements *= dim  # Multiply by the size of the next dimension
  # If x is a scalar, num_elements will remain None, so we set it to 1
  if num_elements is None:
    num_elements = 1
  #############################################################################
  #                            END OF YOUR CODE                               #
  #############################################################################
  return num_elements
```

### Tensor constructors

正如我在上面 `create_simple_tensor` 函数中所使用的，PyTorch提供了很多快速的方法来构造一个特殊的张量，从而避免直接使用Python列表所造成的冗余。常见的如：

* `torch.zeros`：创建一个全零张量
* `torch.ones`：创建一个全一张量
* `torch.rand`：创建一个具有uniform random numbers的张量

下面是代码示例：

```python
# Create a tensor of all zeros
a = torch.zeros(2, 3)
print('tensor of zeros:')
print(a)

# Create a tensor of all ones
b = torch.ones(1, 2)
print('\ntensor of ones:')
print(b)

# Create a 3x3 identity matrix
c = torch.eye(3)
print('\nidentity matrix:')
print(c)

# Tensor of random values
d = torch.rand(4, 5)
print('\nrandom tensor:')
print(d)
```

输出为：

```shellsession
tensor of zeros:
tensor([[0., 0., 0.],
        [0., 0., 0.]])

tensor of ones:
tensor([[1., 1.]])

identity matrix:
tensor([[1., 0., 0.],
        [0., 1., 0.],
        [0., 0., 1.]])

random tensor:
tensor([[0.4508, 0.0341, 0.4158, 0.7429, 0.5292],
        [0.0554, 0.7904, 0.6918, 0.6475, 0.7404],
        [0.6166, 0.4952, 0.6031, 0.4260, 0.5148],
        [0.7459, 0.0017, 0.4603, 0.3970, 0.8988]])
```

感觉每次贴输出有点麻烦，等有空给博客实现一个代码运行的功能（：

接下来，pytorch101让我们实现一个 `create_tensor_of_pi` 的函数。

```python
def create_tensor_of_pi(M, N):
  """
  Returns a Tensor of shape (M, N) filled entirely with the value 3.14

  Inputs:
  - M, N: Positive integers giving the shape of Tensor to create

  Returns:
  - x: A tensor of shape (M, N) filled with the value 3.14
  """
  x = None
  #############################################################################
  #       TODO: Implement this function. It should take one line.             #
  #############################################################################
  # Replace "pass" statement with your code
  x = torch.full((M, N), 3.14, dtype=torch.float64)  # Create a tensor filled with 3.14
  #############################################################################
  #                            END OF YOUR CODE                               #
  #############################################################################
  return x
```

这个实现起来非常简单，一行代码就足够，所以这里重点讲解一下 `torch.full` 的用法。在 `torch.full` 中，第一项的元组表示要创建的tensor的shape是多少，在这里为 (M, N)。第二项代表了整个tensor所有元素要填充的数值，这里是3.14。最后一项加不加都可以，代表使用双精度浮点数，有助于保持数值精度。

除了 `torch.full`，有没有别的类似的填充函数呢？

```python
x = torch.linspace(10, 20, steps=6, dtype=torch.float64)
# 代表：x = tensor([10, 12, 14, 16, 18, 20]) 且 x.dtype == torch.float64
v = torch.arange(10)
# 代表：tensor([0,1,2,3,4,5,6,7,8,9])
torch.randint(low=0, high, shape)
# 创建一个每个数为整数, 在 [low, high) 之间, 有 shape 大小的张量
```

### Datatypes

在上面的很多例子中，我们创建的一些张量包含浮点值，而另一些包含整数值。创建张量时PyTorch会尝试猜测其数据类型；构建张量的函数通常包含一个 `dtype` 参数，可以用于显式指定数据类型。

同样的，我们可以使用张量的 `dtype` 属性来检查其数据类型：

```python
# Let torch choose the datatype
x0 = torch.tensor([1, 2])   # List of integers
x1 = torch.tensor([1., 2.]) # List of floats
x2 = torch.tensor([1., 2])  # Mixed list
print('dtype when torch chooses for us:')
print('List of integers:', x0.dtype)
print('List of floats:', x1.dtype)
print('Mixed list:', x2.dtype) # mixed也会看作是float

# Force a particular datatype
y0 = torch.tensor([1, 2], dtype=torch.float32)  # 32-bit float
y1 = torch.tensor([1, 2], dtype=torch.int32)    # 32-bit (signed) integer
y2 = torch.tensor([1, 2], dtype=torch.int64)    # 64-bit (signed) integer
print('\ndtype when we force a datatype:')
print('32-bit float: ', y0.dtype)
print('32-bit integer: ', y1.dtype)
print('64-bit integer: ', y2.dtype)

# Other creation ops also take a dtype argument
z0 = torch.ones(1, 2)  # Let torch choose for us
z1 = torch.ones(1, 2, dtype=torch.int16) # 16-bit (signed) integer
z2 = torch.ones(1, 2, dtype=torch.uint8) # 8-bit (unsigned) integer
print('\ntorch.ones with different dtypes')
print('default dtype:', z0.dtype)
print('16-bit integer:', z1.dtype)
print('8-bit unsigned integer:', z2.dtype)
```

输出为：

```shellsession
dtype when torch chooses for us:
List of integers: torch.int64
List of floats: torch.float32
Mixed list: torch.float32

dtype when we force a datatype:
32-bit float:  torch.float32
32-bit integer:  torch.int32
64-bit integer:  torch.int64

torch.ones with different dtypes
default dtype: torch.float32
16-bit integer: torch.int16
8-bit unsigned integer: torch.uint8
```

我们可以用 `.to()` 方法将张量转换为另一种数据类型；同样，也有`.float()` ，`.long()`等方法将张量转换成特定的数据类型。

PyTorch还提供了几种方法来创建与另一个张量具有相同数据类型的张量：

* PyTorch提供了张量构造函数，例如 `torch.zeros_like()`，它可以创建与给定张量具有相同形状和类型的新张量。
* 张量对象具有instance method，例如 `.new_zeros()` 可以创建相同类型但可能是不同形状的张量。
* 张量实例方法 `.to()` 可以将张量作为参数，在这种情况下它会转换为参数的数据类型。

```python
x0 = torch.eye(3, dtype=torch.float64)  # Shape (3, 3), dtype torch.float64
x1 = torch.zeros_like(x0)               # Shape (3, 3), dtype torch.float64
x2 = x0.new_zeros(4, 5)                 # Shape (4, 5), dtype torch.float64
x3 = torch.ones(6, 7).to(x0)            # Shape (6, 7), dtype torch.float64)
print('x0 shape is %r, dtype is %r' % (x0.shape, x0.dtype))
print('x1 shape is %r, dtype is %r' % (x1.shape, x1.dtype))
print('x2 shape is %r, dtype is %r' % (x2.shape, x2.dtype))
print('x3 shape is %r, dtype is %r' % (x3.shape, x3.dtype))
```

输出为：

```shellsession
x0 shape is torch.Size([3, 3]), dtype is torch.float64
x1 shape is torch.Size([3, 3]), dtype is torch.float64
x2 shape is torch.Size([4, 5]), dtype is torch.float64
x3 shape is torch.Size([6, 7]), dtype is torch.float64
```

接着，我们需要实现一个函数 `multiples_of_ten` ，该函数应创建并返回 dtype `torch.float64` 的张量，其中包含给定范围内的所有十的倍数。代码如下：

```python
def multiples_of_ten(start, stop):
  """
  Returns a Tensor of dtype torch.float64 that contains all of the multiples of
  ten (in order) between start and stop, inclusive. If there are no multiples
  of ten in this range you should return an empty tensor of shape (0,).

  Inputs:
  - start, stop: Integers with start <= stop specifying the range to create.

  Returns:
  - x: Tensor of dtype float64 giving multiples of ten between start and stop.
  """
  assert start <= stop
  x = None
  #############################################################################
  #                    TODO: Implement this function                          #
  #############################################################################
  # Replace "pass" statement with your code
  first = (start + 9) // 10 * 10  # Find the first multiple of ten >= start
  if first < start:
    first += 10  # Ensure we start at the next multiple of ten if needed
  
  last = stop // 10 * 10  # Find the last multiple of ten <= stop

  if first <= last:
    x = torch.arange(first, last + 1, 10, dtype=torch.float64)  # Create tensor with multiples of ten
  else:
    x = torch.empty((0,), dtype=torch.float64) # Return an empty tensor if no multiples of ten are in the range
  #############################################################################
  #                            END OF YOUR CODE                               #
  #############################################################################
  return x
```

这里用到的 `torch.arange` 方法上面讲过了，就不再赘述了。对于 `first` 和 `last` 的计算，对于 `start` ，首先把 `start + 9`，向上推到下一个10的倍数的整除区间，然后整除10得到向下取整的商，最后乘以10转换回实际的10的倍数值。对于 `last` ，因为我们需要找到小于等于 `stop` 的最后一个10的倍数，所以不需要向上推，可以直接向下取整。

在PyTorch中，一些常用的数据类型如下：

* `torch.float32`：标准浮点类型； used to store learnable parameters, network activations, etc. 几乎所有算数都是用这种类型完成的。
* `torch.int64`：通常用于存储索引
* `torch.bool`：存储布尔值，0为False，1为True
* `torch.float16`：用于mixed-precision混合精度运算，通常用于带有tensor cores的NVIDIA GPUs



