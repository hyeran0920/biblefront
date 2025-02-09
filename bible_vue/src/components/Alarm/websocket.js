import Cookies from "js-cookie"; // js-cookie 라이브러리 필요

class WebSocketService {
  constructor() {
    this.socket = null;
  }

  connect(url) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      // 쿠키에서 authorization 토큰 가져오기 (없어도 진행)
      const token = Cookies.get("authorization");

      // WebSocket URL에 토큰 추가 (없을 경우 토큰 제외)
      const wsUrl = token ? `${url}?token=${encodeURIComponent(token)}` : url;

      console.log("WebSocket 연결 URL:", wsUrl);
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        console.log("✅ WebSocket 연결 성공!");
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("수신된 메시지:", data);
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket 에러:", error);
      };

      this.socket.onclose = () => {
        console.log("WebSocket 연결 종료");
      };
    }
  }

  send(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("메시지 전송:", message);
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket이 열려 있지 않습니다.");
    }
  }

  disconnect() {
    if (this.socket) {
        if (this.socket.readyState === WebSocket.OPEN) {
            console.log("WebSocket 연결 종료 요청...");
            this.socket.close();
        } else {
            console.log("WebSocket이 이미 닫혀 있습니다.");
        }
        this.socket = null; // WebSocket 객체 초기화
    }
  }

}

const webSocketService = new WebSocketService();
export default webSocketService;
