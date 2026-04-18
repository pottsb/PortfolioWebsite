import { ContactSocialLinks } from '@/components/contact-social-links'

export function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-border">
      <div className="max-w-xl">
        <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Have a project in mind or just want to chat about tech? I&apos;m always happy to connect
          and discuss ideas.
        </p>

        <ContactSocialLinks />
      </div>
    </section>
  )
}
