export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-900 mb-4">
          Nebula AI Mobile
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Your AI agents, accessible from anywhere
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <h2 className="text-2xl font-semibold mb-3">Quick Start</h2>
          <p className="text-gray-600">
            Install this app to your home screen for the best experience!
          </p>
        </div>

        <div className="grid gap-4">
          <div className="bg-purple-100 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900">iPhone/iPad</h3>
            <p className="text-sm text-purple-700">
              Tap Share → Add to Home Screen
            </p>
          </div>

          <div className="bg-purple-100 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900">Android</h3>
            <p className="text-sm text-purple-700">
              Tap Menu → Install app
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
