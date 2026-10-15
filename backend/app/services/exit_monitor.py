from __future__ import annotations


def monitor_exit(frame, exit_zones=None):
    if exit_zones is None:
        exit_zones = [{'x': 0.15, 'y': 0.7, 'width': 0.7, 'height': 0.2}]
    occupancy = 1 if exit_zones else 0
    status = 'clear'
    if occupancy > 0:
        status = 'monitored'
    return {'status': status, 'zones': exit_zones, 'blocked': occupancy > 0 and status == 'monitored'}
