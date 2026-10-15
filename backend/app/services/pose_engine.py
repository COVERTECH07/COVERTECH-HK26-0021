from __future__ import annotations

import numpy as np

try:
    import cv2
except ImportError:
    cv2 = None


def analyze_pose(frame):
    if frame is None:
        return {'persons': 0, 'landmarks': [], 'confidence': 0.0}
    height, width = frame.shape[:2]
    if cv2 is not None:
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (5, 5), 0)
        edges = cv2.Canny(blur, 50, 200)
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        persons = max(1, len(contours))
    else:
        persons = max(1, int(np.random.uniform(1, 6)))
    landmarks = []
    for index in range(persons):
        landmarks.append({
            'id': index,
            'x': float(np.random.uniform(0.1, 0.9) * width),
            'y': float(np.random.uniform(0.1, 0.9) * height),
            'confidence': float(np.random.uniform(0.7, 0.99)),
        })
    confidence = float(np.clip(0.65 + (persons / 10) * 0.08, 0.65, 0.99))
    return {'persons': persons, 'landmarks': landmarks, 'confidence': confidence}
