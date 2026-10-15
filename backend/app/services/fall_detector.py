from __future__ import annotations


def detect_fall(landmarks, threshold=0.75):
    if not landmarks:
        return {'detected': False, 'confidence': 0.0, 'reason': 'no landmarks'}
    dominant = max(landmarks, key=lambda item: item.get('confidence', 0.0))
    fall_score = dominant.get('confidence', 0.0)
    detected = fall_score >= threshold and dominant.get('y', 0.0) > 0.45
    return {
        'detected': detected,
        'confidence': round(fall_score, 3),
        'reason': 'body posture below threshold' if not detected else 'fall posture detected',
    }
