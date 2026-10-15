from __future__ import annotations

try:
    import cv2
except ImportError:
    cv2 = None


def anonymize_frame(frame):
    if frame is None:
        return None
    if cv2 is None:
        return frame
    return cv2.GaussianBlur(frame, (21, 21), 0)
