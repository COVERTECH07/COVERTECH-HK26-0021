from __future__ import annotations

import math


def distance(point_a, point_b):
    return math.hypot(point_a[0] - point_b[0], point_a[1] - point_b[1])


def normalize_heatmap(values):
    if not values:
        return []
    max_value = max(values)
    if max_value == 0:
        return [0.0 for _ in values]
    return [value / max_value for value in values]
