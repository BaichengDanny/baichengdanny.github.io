---
title: "Getting Started with PyTorch: A Practical Guide"
date: "2024-09-10"
year: 2024
description: "A comprehensive beginner's guide to PyTorch, covering installation, basic concepts, and building your first neural network."
category: "Tutorial"
tags: ["PyTorch", "deep learning", "tutorial", "neural networks", "python"]
---

# Getting Started with PyTorch: A Practical Guide

PyTorch has become one of the most popular deep learning frameworks, favored for its dynamic computational graphs and intuitive design.

## Installation

First, let's install PyTorch. Visit [pytorch.org](https://pytorch.org) for the latest installation command, but here's a basic example:

```bash
# CPU only
pip install torch torchvision torchaudio

# With CUDA support (for GPU acceleration)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

## Core Concepts

### Tensors

Tensors are the fundamental data structure in PyTorch, similar to NumPy arrays but with GPU support:

```python
import torch
import numpy as np

# Creating tensors
x = torch.tensor([1, 2, 3, 4])
y = torch.zeros(3, 4)
z = torch.randn(2, 3, 4)

# From NumPy
numpy_array = np.array([1, 2, 3])
tensor_from_numpy = torch.from_numpy(numpy_array)

# To NumPy
tensor = torch.tensor([1, 2, 3])
numpy_from_tensor = tensor.numpy()
```

### Automatic Differentiation

PyTorch's `autograd` system automatically computes gradients:

```python
# Enable gradient computation
x = torch.tensor(2.0, requires_grad=True)
y = x**2 + 3*x + 1

# Compute gradients
y.backward()
print(x.grad)  # dy/dx = 2*x + 3 = 2*2 + 3 = 7
```

### GPU Acceleration

Moving tensors to GPU for faster computation:

```python
# Check if CUDA is available
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

# Move tensors to GPU
x = torch.tensor([1, 2, 3]).to(device)
y = torch.tensor([4, 5, 6]).to(device)
z = x + y  # Computation happens on GPU
```

## Building Neural Networks

### Using `torch.nn`

PyTorch provides the `nn` module for building neural networks:

```python
import torch.nn as nn
import torch.nn.functional as F

class SimpleNN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.fc2 = nn.Linear(hidden_size, output_size)
        self.dropout = nn.Dropout(0.2)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        return x

# Create model instance
model = SimpleNN(input_size=784, hidden_size=128, output_size=10)
```

### Convolutional Neural Network

For image classification tasks:

```python
class CNN(nn.Module):
    def __init__(self, num_classes=10):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, num_classes)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 64 * 7 * 7)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x
```

## Training Loop

Here's a complete training example:

```python
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

# Data preparation
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

train_dataset = datasets.MNIST('data', train=True, download=True, transform=transform)
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)

# Model, loss, and optimizer
model = SimpleNN(784, 128, 10)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
def train_model(model, train_loader, criterion, optimizer, epochs=5):
    model.train()
    for epoch in range(epochs):
        running_loss = 0.0
        for batch_idx, (data, targets) in enumerate(train_loader):
            # Flatten the images
            data = data.view(data.size(0), -1)

            # Zero gradients
            optimizer.zero_grad()

            # Forward pass
            outputs = model(data)
            loss = criterion(outputs, targets)

            # Backward pass
            loss.backward()
            optimizer.step()

            running_loss += loss.item()

            if batch_idx % 100 == 0:
                print(f'Epoch {epoch+1}/{epochs}, '
                      f'Batch {batch_idx}, '
                      f'Loss: {loss.item():.4f}')

        avg_loss = running_loss / len(train_loader)
        print(f'Epoch {epoch+1} completed. Average Loss: {avg_loss:.4f}')

# Train the model
train_model(model, train_loader, criterion, optimizer)
```

## Model Evaluation

```python
def evaluate_model(model, test_loader):
    model.eval()
    correct = 0
    total = 0

    with torch.no_grad():
        for data, targets in test_loader:
            data = data.view(data.size(0), -1)
            outputs = model(data)
            _, predicted = torch.max(outputs.data, 1)
            total += targets.size(0)
            correct += (predicted == targets).sum().item()

    accuracy = 100 * correct / total
    print(f'Test Accuracy: {accuracy:.2f}%')
    return accuracy
```

## Saving and Loading Models

```python
# Save model
torch.save(model.state_dict(), 'model.pth')

# Load model
model = SimpleNN(784, 128, 10)
model.load_state_dict(torch.load('model.pth'))
model.eval()

# Save entire model (including architecture)
torch.save(model, 'complete_model.pth')
loaded_model = torch.load('complete_model.pth')
```

## Best Practices

### 1. Use DataLoaders
Always use DataLoaders for efficient batch processing:

```python
from torch.utils.data import Dataset, DataLoader

class CustomDataset(Dataset):
    def __init__(self, data, labels):
        self.data = data
        self.labels = labels

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        return self.data[idx], self.labels[idx]
```

### 2. Monitor Training
Track metrics during training:

```python
import matplotlib.pyplot as plt

def plot_training_history(losses, accuracies):
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

    ax1.plot(losses)
    ax1.set_title('Training Loss')
    ax1.set_xlabel('Epoch')
    ax1.set_ylabel('Loss')

    ax2.plot(accuracies)
    ax2.set_title('Training Accuracy')
    ax2.set_xlabel('Epoch')
    ax2.set_ylabel('Accuracy')

    plt.tight_layout()
    plt.show()
```

### 3. Use Learning Rate Scheduling

```python
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=30, gamma=0.1)

# In training loop
for epoch in range(epochs):
    train_one_epoch()
    scheduler.step()
```

## Common Patterns

### Transfer Learning

```python
import torchvision.models as models

# Load pre-trained model
model = models.resnet18(pretrained=True)

# Freeze parameters
for param in model.parameters():
    param.requires_grad = False

# Replace final layer
model.fc = nn.Linear(model.fc.in_features, num_classes)

# Only train the final layer
optimizer = optim.Adam(model.fc.parameters())
```

### Gradient Clipping

```python
# Prevent exploding gradients
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
```

## Debugging Tips

1. **Check tensor shapes**: Use `.shape` frequently
2. **Verify gradients**: Use `requires_grad=True` and check `x.grad`
3. **Use smaller datasets**: Debug with subset of data first
4. **Monitor loss**: Ensure loss decreases over time
5. **Check device placement**: Ensure all tensors are on same device

## Next Steps

Once comfortable with basics:

- Explore **torch.nn.functional** for more operations
- Learn about **custom datasets** and **data augmentation**
- Study **different optimizers** (SGD, RMSprop, AdamW)
- Investigate **model architectures** (ResNet, Transformer, etc.)
- Practice with **real-world datasets**

## Conclusion

PyTorch provides a flexible and intuitive framework for deep learning. Start with simple examples, understand the core concepts, and gradually build more complex models. The key is practice and experimentation!

Remember: the best way to learn PyTorch is by building projects and experimenting with different architectures and techniques.
