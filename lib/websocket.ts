// WebSocket connection for real-time updates from Nebula

const WS_URL = process.env.NEXT_PUBLIC_NEBULA_WS_URL || 'wss://nebula.gg/ws'

export type WebSocketMessage = {
  type: 'task_update' | 'agent_status' | 'activity' | 'notification'
  data: any
}

export type WebSocketCallback = (message: WebSocketMessage) => void

class NebulaWebSocket {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private callbacks: Set<WebSocketCallback> = new Set()
  private authToken: string | null = null

  connect(authToken: string) {
    if (typeof window === 'undefined') return // Only run in browser

    this.authToken = authToken
    
    try {
      this.ws = new WebSocket(`${WS_URL}?token=${authToken}`)
      
      this.ws.onopen = () => {
        console.log('WebSocket connected')
        this.reconnectAttempts = 0
      }

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          this.notifyCallbacks(message)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      this.ws.onclose = () => {
        console.log('WebSocket disconnected')
        this.handleReconnect()
      }
    } catch (error) {
      console.error('Failed to connect WebSocket:', error)
      this.handleReconnect()
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts && this.authToken) {
      this.reconnectAttempts++
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)
      
      console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
      
      setTimeout(() => {
        if (this.authToken) {
          this.connect(this.authToken)
        }
      }, delay)
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.authToken = null
    this.reconnectAttempts = 0
  }

  subscribe(callback: WebSocketCallback) {
    this.callbacks.add(callback)
    
    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback)
    }
  }

  private notifyCallbacks(message: WebSocketMessage) {
    this.callbacks.forEach(callback => {
      try {
        callback(message)
      } catch (error) {
        console.error('Error in WebSocket callback:', error)
      }
    })
  }

  send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    } else {
      console.warn('WebSocket not connected, cannot send message')
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN
  }
}

// Export singleton instance
export const nebulaWS = new NebulaWebSocket()
