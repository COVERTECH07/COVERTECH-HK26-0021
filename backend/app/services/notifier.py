from __future__ import annotations


def send_notification(alert):
    return {
        'status': 'queued',
        'channel': 'dashboard',
        'alert': alert,
    }
