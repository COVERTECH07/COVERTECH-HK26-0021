from __future__ import annotations


def build_alert(category: str, severity: str, location: str, confidence: float):
    return {
        'category': category,
        'severity': severity,
        'location': location,
        'confidence': round(confidence, 3),
        'message': f'{category.replace("_", " ").title()} detected near {location}',
    }
