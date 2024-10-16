import { Details } from '@/widgets/details'

type PageProps = {
  params: {
    id: number
  }
}

export default function page({ params }: PageProps) {
  const { id } = params
  return <Details id={id}></Details>
}
