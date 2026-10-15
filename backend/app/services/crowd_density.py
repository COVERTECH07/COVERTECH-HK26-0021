from __future__ import annotations


def estimate_density(frame, persons=None):
    if persons is None:
        persons = 0
    count = persons if isinstance(persons, int) else max(0, int(persons))
    level = 'low'
    if count >= 12:
        level = 'high'
    elif count >= 7:
        level = 'medium'
    risk = min(count / 20, 1.0)
    return {'person_count': count, 'level': level, 'risk': round(risk, 3), 'threshold_exceeded': count >= 9}
