import numpy as np

class Node:
    def __init__(self, feature=None, value=None, label=None):
        self.feature = feature
        self.value = value
        self.label = label
        self.children = {}

def entropy(y):
    classes, counts = np.unique(y, return_counts=True)
    probabilities = counts / len(y)
    return -np.sum(probabilities * np.log2(probabilities))

def information_gain(X, y, feature):
    unique_values = np.unique(X[:, feature])
    entropy_before = entropy(y)

    weighted_entropies = 0
    for value in unique_values:
        subset_indices = X[:, feature] == value
        subset_y = y[subset_indices]
        weighted_entropies += len(subset_y) / len(y) * entropy(subset_y)

    return entropy_before - weighted_entropies

def build_tree(X, y, features):
    if len(set(y)) == 1:
        return Node(label=y[0])

    if len(features) == 0:
        return Node(label=np.argmax(np.bincount(y)))

    best_feature = max(features, key=lambda feature: information_gain(X, y, feature))
    unique_values = np.unique(X[:, best_feature])

    node = Node(feature=best_feature)

    for value in unique_values:
        subset_indices = X[:, best_feature] == value
        subset_X = X[subset_indices]
        subset_y = y[subset_indices]

        if len(subset_y) == 0:
            label = np.argmax(np.bincount(y))
            node.children[value] = Node(label=label)
        else:
            remaining_features = [f for f in features if f != best_feature]
            node.children[value] = build_tree(subset_X, subset_y, remaining_features)

    return node

# Convert data to a numpy array
data = [
    {
        "recruitmentCycle": "Interviewing",
        "institute": ["Government Sadiq College Women University, Bahawalpur"],
        "level": ["B.S"],
        "majors": ["Biotechnology"]
        # Add other features as needed
    }
]

# Extract features and target variable
target_variable = "recruitmentCycle"
features = ["institute", "level", "majors"]  # Add other features as needed

X = np.array([[candidate[feature][0] for feature in features] for candidate in data])
y = np.array([candidate[target_variable] for candidate in data])

# Build the decision tree
decision_tree = build_tree(X, y, list(range(len(features))))

# Example usage:
def predict(candidate, node):
    if node.label is not None:
        return node.label

    feature_value = candidate[node.feature][0]
    if feature_value in node.children:
        return predict(candidate, node.children[feature_value])
    else:
        return np.argmax(np.bincount(y))

# Make predictions
for candidate in data:
    prediction = predict(candidate, decision_tree)
    print(f"Prediction for the candidate: {prediction}")
