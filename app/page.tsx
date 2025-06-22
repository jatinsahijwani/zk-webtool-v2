"use client";

import {
  ArrowRight,
  Code,
  Zap,
  Shield,
  Globe,
  Download,
  Rocket,
  CheckCircle,
  Github,
  Network,
  Layers,
  Users,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-purple-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Shield className="h-8 w-8 text-pink-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-bold text-white">Polka</span>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                ZK
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:text-pink-400">
                Docs
              </Button>
              <Button onClick={() => {
                router.push("/test")
              }} className="bg-pink-600 hover:bg-pink-700 text-white"> 
                Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-pink-600/20 text-pink-400 border-pink-600/30">
            🔗 Built for the Polkadot Ecosystem
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Polkadot's
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              ZK Circuit Platform
            </span>
            <br />
            </h1>
            <h2 className="text-2xl md:text-5xl font-bold text-white mb-6 leading-tight">Build, Prove & Deploy</h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            The first zero-knowledge development platform built specifically for Polkadot parachains. Create custom
            Circom circuits and deploy directly to PolkaVM—no complex setup, no barriers to entry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => {
              router.push("/test")
            }} size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Polkadot Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">50+</div>
              <div className="text-gray-300">Parachain Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">1000+</div>
              <div className="text-gray-300">ZK Circuits Deployed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">24/7</div>
              <div className="text-gray-300">PolkaVM Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Polkadot Integration Highlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-600/10 to-purple-600/10 border-y border-pink-600/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">How to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Follow the steps to create your own ZK Proof using your own Circom Logic. Deploy ZK verifiers across parachains with
            seamless interoperability.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-pink-600/10 border-pink-600/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Network className="h-8 w-8 text-pink-400 mx-auto mb-2" />
                <CardTitle className="text-white text-sm">Write your Own Circom Circuit</CardTitle>
                <CardDescription className="text-gray-300 text-xs">
                  Direct compilation to PolkaVM bytecode
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-purple-600/10 border-purple-600/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Layers className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <CardTitle className="text-white text-sm">Download the Generated FIles</CardTitle>
                <CardDescription className="text-gray-300 text-xs">
                  Verify proofs across multiple parachains
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-pink-600/10 border-pink-600/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Shield className="h-8 w-8 text-pink-400 mx-auto mb-2" />
                <CardTitle className="text-white text-sm">Deploy</CardTitle>
                <CardDescription className="text-gray-300 text-xs">
                 Deploy your own ZK proof Verifier
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-purple-600/10 border-purple-600/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <CardTitle className="text-white text-sm">DOT Governance</CardTitle>
                <CardDescription className="text-gray-300 text-xs">
                  Participate in Polkadot governance with ZK
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need for Polkadot ZK Development</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From circuit design to parachain deployment, streamlined for the Polkadot ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-pink-600/20 backdrop-blur-sm hover:border-pink-600/40 transition-colors">
              <CardHeader>
                <Code className="h-12 w-12 text-pink-400 mb-4" />
                <CardTitle className="text-white">Polkadot-Optimized Editor</CardTitle>
                <CardDescription className="text-gray-300">
                  Write Circom circuits with Polkadot-specific templates and parachain integration snippets.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-purple-600/20 backdrop-blur-sm hover:border-purple-600/40 transition-colors">
              <CardHeader>
                <Zap className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">PolkaVM Compilation</CardTitle>
                <CardDescription className="text-gray-300">
                  Direct compilation to PolkaVM bytecode using Parity Revive for seamless parachain deployment.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-pink-600/20 backdrop-blur-sm hover:border-pink-600/40 transition-colors">
              <CardHeader>
                <Rocket className="h-12 w-12 text-pink-400 mb-4" />
                <CardTitle className="text-white">Multi-Parachain Deploy</CardTitle>
                <CardDescription className="text-gray-300">
                  Deploy to multiple Polkadot parachains simultaneously with one-click cross-chain verification.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-purple-600/20 backdrop-blur-sm hover:border-purple-600/40 transition-colors">
              <CardHeader>
                <Download className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">Substrate Artifacts</CardTitle>
                <CardDescription className="text-gray-300">
                  Get Substrate-compatible WASM, zkey files, and Solidity verifiers optimized for PolkaVM.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-pink-600/20 backdrop-blur-sm hover:border-pink-600/40 transition-colors">
              <CardHeader>
                <Globe className="h-12 w-12 text-pink-400 mb-4" />
                <CardTitle className="text-white">Relay Chain Bridge</CardTitle>
                <CardDescription className="text-gray-300">
                  Bridge ZK proofs between parachains via Polkadot's relay chain for ultimate interoperability.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-purple-600/20 backdrop-blur-sm hover:border-purple-600/40 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">DOT-Secured Proofs</CardTitle>
                <CardDescription className="text-gray-300">
                  Leverage Polkadot's shared security model for enterprise-grade zero-knowledge proof verification.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Parachain Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Deploy Across the Polkadot Ecosystem</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your ZK circuits work seamlessly across all major Polkadot parachains.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 border-pink-600/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">A</span>
                </div>
                <CardTitle className="text-white">Acala</CardTitle>
                <CardDescription className="text-gray-300">DeFi Hub</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-600/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">M</span>
                </div>
                <CardTitle className="text-white">Moonbeam</CardTitle>
                <CardDescription className="text-gray-300">Ethereum Compatible</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 border-pink-600/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">P</span>
                </div>
                <CardTitle className="text-white">Parallel</CardTitle>
                <CardDescription className="text-gray-300">Money Market</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-600/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">A</span>
                </div>
                <CardTitle className="text-white">Astar</CardTitle>
                <CardDescription className="text-gray-300">Smart Contracts</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-pink-400/30 text-pink-400 hover:bg-pink-400/10">
              View All 50+ Supported Parachains <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works - Polkadot Flow */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">From Circuit to Parachain in Minutes</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Streamlined for Polkadot's multi-chain architecture.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Design Circuit</h3>
              <p className="text-gray-300">Use Polkadot-optimized templates in our web editor</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Compile to PolkaVM</h3>
              <p className="text-gray-300">Automatic compilation using Parity Revive toolchain</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Choose Parachain</h3>
              <p className="text-gray-300">Select target parachains from 50+ options</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Deploy & Verify</h3>
              <p className="text-gray-300">Live deployment with cross-chain verification</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We've Built - Polkadot Focus */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Built for Polkadot from Day One</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Every feature designed with Polkadot's multi-chain vision in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Polkadot-Native ZK Editor</h3>
                  <p className="text-gray-300">
                    Web-based Circom editor with Polkadot parachain templates and cross-chain proof patterns.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">PolkaVM Compilation Pipeline</h3>
                  <p className="text-gray-300">
                    Server-side compilation using Parity Revive, optimized for Polkadot's WebAssembly runtime.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Substrate-Compatible Artifacts</h3>
                  <p className="text-gray-300">
                    Generate WASM, zkey, and Solidity verifiers that work across all Substrate-based chains.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Multi-Parachain Deployment</h3>
                  <p className="text-gray-300">
                    One-click deployment to multiple Polkadot parachains with automatic cross-chain verification setup.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Relay Chain Integration</h3>
                  <p className="text-gray-300">
                    Bridge ZK proofs between parachains using Polkadot's relay chain for ultimate interoperability.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">DOT-Secured Infrastructure</h3>
                  <p className="text-gray-300">
                    Leverage Polkadot's shared security model for enterprise-grade zero-knowledge applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack - Polkadot Focused */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Powered by Polkadot's Tech Stack</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Built with the best tools in the Polkadot ecosystem for seamless parachain integration.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-pink-600/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Frontend</CardTitle>
                <CardDescription className="text-gray-300">Next.js • Tailwind CSS • Polkadot.js API</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-purple-600/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Polkadot Core</CardTitle>
                <CardDescription className="text-gray-300">Substrate • PolkaVM • Parity Revive • XCMP</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-pink-600/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">ZK Stack</CardTitle>
                <CardDescription className="text-gray-300">Circom • SnarkJS • Groth16 • Foundry</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Future Vision - Polkadot Ecosystem */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">The Future of Polkadot ZK</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Building the most comprehensive ZK platform for the Polkadot multi-chain future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 border-pink-600/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-sm">Cross-Chain ZK Proofs</CardTitle>
                <CardDescription className="text-gray-300 text-xs">
                  Verify proofs across any Polkadot parachain with XCMP integration
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-600/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-sm">DOT Governance ZK</CardTitle>
                <CardDescription className="text-gray-300 text-xs">
                  Private voting and governance participation using zero-knowledge
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 border-pink-600/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-sm">Parachain ZK Rollups</CardTitle>
                <CardDescription className="text-gray-300 text-xs">
                  Deploy ZK rollups as specialized parachains for ultimate scalability
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-600/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-sm">Visual Parachain Designer</CardTitle>
                <CardDescription className="text-gray-300 text-xs">
                  Drag-and-drop interface for multi-chain ZK application architecture
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-pink-400" />
                <span className="text-lg font-bold text-white">Polka</span>
                <span className="text-lg font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  ZK
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                The premier zero-knowledge development platform for the Polkadot ecosystem.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <div className="space-y-2">
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-sm block">
                  Documentation
                </a>
                
                
              </div>
            </div>

            

            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <div className="space-y-2">
                
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-sm block">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2024 PolkaZK. Empowering privacy-preserving applications across the Polkadot multiverse.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
