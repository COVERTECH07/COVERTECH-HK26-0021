from app.services.crowd_density import estimate_density


def test_density_detects_high_risk():
    result = estimate_density(None, 12)
    assert result['level'] == 'high'
    assert result['threshold_exceeded'] is True


def test_density_detects_low_risk():
    result = estimate_density(None, 3)
    assert result['level'] == 'low'
    assert result['threshold_exceeded'] is False
