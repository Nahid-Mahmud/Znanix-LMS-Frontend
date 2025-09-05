export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: December 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using Zanix, you accept and agree to be bound by the terms and provision of this
              agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-muted-foreground mb-4">
              Permission is granted to temporarily access the materials on Zanix for personal, non-commercial transitory
              viewing only.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>This is the grant of a license, not a transfer of title</li>
              <li>You may not modify or copy the materials</li>
              <li>You may not use the materials for commercial purposes</li>
              <li>You may not attempt to reverse engineer any software</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current
              at all times.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Course Access and Completion</h2>
            <p className="text-muted-foreground mb-4">
              Course access is granted for the duration specified in your subscription or purchase. Completion
              certificates are awarded upon successful completion of course requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Refund Policy</h2>
            <p className="text-muted-foreground mb-4">
              We offer a 30-day money-back guarantee on all paid courses. Refund requests must be submitted within 30
              days of purchase and before completing more than 30% of the course content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Prohibited Uses</h2>
            <p className="text-muted-foreground mb-4">
              You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us at legal@zanix.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
