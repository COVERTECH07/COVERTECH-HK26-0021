from app.services.fall_detector import detect_fall


def test_detect_fall_confidence_threshold():
    payload = detect_fall([{'confidence': 0.9, 'y': 0.7}])
    assert payload['detected'] is True
    assert payload['confidence'] >= 0.85


def test_detect_fall_without_landmarks():
    payload = detect_fall([])
    assert payload['detected'] is False
