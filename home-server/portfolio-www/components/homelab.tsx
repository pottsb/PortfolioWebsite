"use client"

import { Server, HardDrive, Cpu, Network, Shield, Cloud } from "lucide-react"
import { ServerStreams } from "./server-streams"

const specs = [
  {
    icon: Cpu,
    label: "Processing",
    value: "Intel Xeon / AMD EPYC",
    description: "Multi-core server processors",
  },
  {
    icon: HardDrive,
    label: "Storage",
    value: "ZFS RAID Array",
    description: "Redundant storage with snapshots",
  },
  {
    icon: Network,
    label: "Network",
    value: "10GbE Internal",
    description: "High-speed interconnects",
  },
  {
    icon: Shield,
    label: "Security",
    value: "OPNsense Firewall",
    description: "VLANs, IDS/IPS, VPN",
  },
  {
    icon: Cloud,
    label: "Virtualization",
    value: "Proxmox VE",
    description: "VMs and containers",
  },
  {
    icon: Server,
    label: "Services",
    value: "Self-Hosted",
    description: "This site, media, backup",
  },
]

export function Homelab() {
  return (
    <section id="homelab" className="py-24">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-primary text-sm font-medium mb-4">
          <Server className="h-4 w-4" />
          Self-Hosted Infrastructure
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">The Homelab</h2>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          My passion project and learning playground. A full server rack running enterprise-grade 
          hardware, hosting everything from this website to media servers and development environments.
        </p>
      </div>

      {/* Live Streams */}
      <div className="mb-16">
        <ServerStreams />
      </div>

      {/* Specs Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="p-5 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <spec.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {spec.label}
                </p>
                <p className="font-semibold text-foreground">{spec.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{spec.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Philosophy */}
      <div className="mt-12 p-6 bg-secondary/30 rounded-xl border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3">Why Self-Host?</h3>
        <p className="text-muted-foreground leading-relaxed">
          Running my own infrastructure gives me complete control over my data and services. 
          It&apos;s also an incredible learning experience - from networking and security to 
          system administration and automation. Every problem solved adds to my skillset, 
          and there&apos;s something satisfying about knowing exactly where your bits live.
        </p>
      </div>
    </section>
  )
}
