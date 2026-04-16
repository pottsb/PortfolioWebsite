import { Cloud, Cpu, HardDrive, Network, Server, Shield } from 'lucide-react'
import { ServerStreams } from './server-streams'

const specs = [
  {
    icon: Cpu,
    label: 'Hardware',
    value: 'HPE Servers',
    description: 'Enterprise-grade hardware',
  },
  {
    icon: HardDrive,
    label: 'Storage',
    value: 'ZFS RAID Array',
    description: 'Redundant storage with snapshots',
  },
  {
    icon: Network,
    label: 'Network',
    value: '10GbE Internal',
    description: 'High-speed interconnects',
  },
  {
    icon: Shield,
    label: 'Security',
    value: 'Next Gen Firewall',
    description: 'VLANs, IDS/IPS, PiHole, Wazuh, Crowdsec',
  },
  {
    icon: Cloud,
    label: 'Virtualization',
    value: 'Proxmox VE & Docker',
    description: 'VMs and containers',
  },
  {
    icon: Server,
    label: 'Backups',
    value: '321 Backup Strategy',
    description: 'Proxmox Backup Server, Synology Backup Server',
  },
  {
    icon: Server,
    label: 'Power',
    value: 'UPS and Power Logging',
    description: 'UPS with ATS Bypass and monitoring dashboard',
  },
  {
    icon: Server,
    label: 'Monitoring',
    value: 'Information & Alerting',
    description: 'Greylog, Zabbix, Scrutiny, Uptime Kuma, Grafana',
  },
]

export function Homelab() {
  return (
    <section id="homelab" className="pt-8 pb-24 md:py-24">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">The Homelab</h2>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          My homelab started as a hobby and ties in closely with my career. I tinker and learn
          because I enjoy computers! Over time, it’s grown into a full environment for testing,
          development, and hosting real services. I focus on building performant, reliable systems
          with minimal resources, similar to the constraints you see in real businesses. It gave me
          a safe place to experiment with Linux, Windows Server, networking, and automation early
          on, and still does today. I use it to test ideas before production, run services for
          friends and family, and gain hands-on experience solving real infrastructure problems.
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
          Self-hosting gives me full control over how things are built and run. If something breaks,
          I'm the one at fault, I'm the one who needs to fix it, and I learn from it. It’s the best
          way I’ve found to learn. You run into real problems: networking issues, performance
          bottlenecks, security concerns. Solving real problems builds skills that actually transfer
          to production environments. Plus, there’s something satisfying about knowing exactly where
          your data lives and how every part of the system fits together. The blinky lights are a
          nice bonus too!
        </p>
      </div>
    </section>
  )
}
