// Nebula API Client
// This connects the mobile UI to the Nebula backend at https://nebula.gg

const API_BASE_URL = process.env.NEXT_PUBLIC_NEBULA_API_URL || 'https://nebula.gg/api'

interface Agent {
  id: string
  name: string
  description: string
  tools: number
  status: 'ready' | 'configuring' | 'error'
  lastUsed: string
  capabilities: string[]
}

interface Activity {
  id: string
  type: string
  title: string
  description: string
  agent: string
  timestamp: string
  status: 'completed' | 'running' | 'failed'
}

interface DelegateTaskRequest {
  agentId: string
  description: string
  files?: string[]
}

class NebulaAPI {
  private baseUrl: string
  private authToken: string | null = null

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
    
    // Load auth token from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      this.authToken = localStorage.getItem('nebula_auth_token')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid - redirect to login
        this.clearAuth()
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Authentication
  setAuthToken(token: string) {
    this.authToken = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('nebula_auth_token', token)
    }
  }

  clearAuth() {
    this.authToken = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nebula_auth_token')
    }
  }

  isAuthenticated(): boolean {
    return this.authToken !== null
  }

  // Agents API
  async getAgents(): Promise<Agent[]> {
    return this.request<Agent[]>('/agents')
  }

  async getAgent(agentId: string): Promise<Agent> {
    return this.request<Agent>(`/agents/${agentId}`)
  }

  async delegateTask(request: DelegateTaskRequest): Promise<{ taskId: string }> {
    return this.request<{ taskId: string }>(`/agents/${request.agentId}/delegate`, {
      method: 'POST',
      body: JSON.stringify({
        description: request.description,
        files: request.files,
      }),
    })
  }

  // Activity API
  async getActivity(limit: number = 50): Promise<Activity[]> {
    return this.request<Activity[]>(`/activity?limit=${limit}`)
  }

  // Scripts API
  async getScripts(): Promise<any[]> {
    return this.request<any[]>('/scripts')
  }

  async runScript(scriptId: string, inputData?: any): Promise<{ taskId: string }> {
    return this.request<{ taskId: string }>(`/scripts/${scriptId}/run`, {
      method: 'POST',
      body: JSON.stringify({ input_data: inputData }),
    })
  }

  // Tasks API
  async getTasks(): Promise<any[]> {
    return this.request<any[]>('/tasks')
  }

  async getTask(taskId: string): Promise<any> {
    return this.request<any>(`/tasks/${taskId}`)
  }

  // Files API
  async getFiles(): Promise<any[]> {
    return this.request<any[]>('/files')
  }

  async uploadFile(file: File): Promise<{ fileId: string }> {
    const formData = new FormData()
    formData.append('file', file)

    const headers: HeadersInit = {}
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`
    }

    const response = await fetch(`${this.baseUrl}/files/upload`, {
      method: 'POST',
      headers,
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`)
    }

    return response.json()
  }

  // Connected Apps API
  async getConnectedApps(): Promise<any[]> {
    return this.request<any[]>('/apps/connected')
  }
}

// Export singleton instance
export const nebulaAPI = new NebulaAPI()

// Export for custom instances if needed
export { NebulaAPI }
