from __future__ import annotations

from .crowd_density import estimate_density
from .exit_monitor import monitor_exit
from .fall_detector import detect_fall
from .pose_engine import analyze_pose


class VideoIngestService:
    def __init__(self):
        self.last_analysis = None

    def process_frame(self, frame, camera_id: int | None = None):
        if frame is None:
            return {'status': 'idle'}
        pose_result = analyze_pose(frame)
        crowd = estimate_density(frame, pose_result.get('persons', []))
        exit_status = monitor_exit(frame)
        fall_result = detect_fall(pose_result.get('landmarks', []))
        payload = {
            'camera_id': camera_id,
            'density': crowd,
            'exit_status': exit_status,
            'fall': fall_result,
            'pose': pose_result,
            'status': 'processed',
        }
        self.last_analysis = payload
        return payload

    def ingest_snapshot(self, image_payload):
        return self.process_frame(image_payload, 0)
