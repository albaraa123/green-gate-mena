import { Container } from '@/components/ui/Container'
import { CardSkeletonGrid } from '@/components/ui/CardSkeleton'

export default function Loading() {
  return (
    <main id="main-content" className="py-24">
      <Container>
        <div className="mb-10 flex flex-col gap-3">
          <div className="h-4 w-24 rounded bg-sand-200 animate-pulse" />
          <div className="h-10 w-2/3 max-w-lg rounded bg-sand-200 animate-pulse" />
        </div>
        <CardSkeletonGrid count={6} />
      </Container>
    </main>
  )
}
