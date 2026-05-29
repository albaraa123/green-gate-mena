import { Container } from '@/components/ui/Container'

export default function Loading() {
  return (
    <main id="main-content" className="py-24">
      <Container>
        <div className="flex justify-center py-20">
          <div
            className="w-10 h-10 rounded-full border-2 border-teal-200 border-t-teal-700 animate-spin"
            aria-label="Loading opportunities"
            role="status"
          />
        </div>
      </Container>
    </main>
  )
}
