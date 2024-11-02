import { Icon } from '@iconify/react'
import { useRouteError } from 'react-router-dom'
import Container from './components/base/container'
import LinkButton from './components/base/link-button'
import Layout from './layout'

interface Error {
  status: number
}

export default function ErrorPage() {
  return (
    <Layout>
      <Container className='pt-24 px-8 flex flex-col gap-4'>
        <ErrorComponent />
        <p className='mt-16 mr-auto'>
          <LinkButton to='/' right={<Icon icon='carbon:return' />}>
            Go back home
          </LinkButton>
        </p>
      </Container>
    </Layout>
  )
}

function ErrorComponent() {
  const error = useRouteError() as Error

  if (error.status === 404) {
    return <NotFound />
  }

  return <Unknown />
}

function NotFound() {
  return (
    <>
      <h1 className='text-6xl font-bold'>Oops...</h1>
      <p className='mt-4 mx-2 text-sm text-zinc-600'>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  )
}

function Unknown() {
  return (
    <>
      <h1 className='text-6xl font-bold'>Oops...</h1>
      <p className='mt-4 mx-2 text-sm text-zinc-600'>
        Some unknown error occurred while trying to load the page.
      </p>
    </>
  )
}
