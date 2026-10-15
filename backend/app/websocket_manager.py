from fastapi import WebSocket


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections = [client for client in self.active_connections if client != websocket]

    async def broadcast(self, message: dict):
        for connection in list(self.active_connections):
            await connection.send_json(message)

    async def send_to(self, websocket: WebSocket, message: dict):
        await websocket.send_json(message)


manager = ConnectionManager()
