import { ThemesPage } from '@/components/themes/page'

export default ThemesPage

export async function getStaticProps() {
  return {
    props: {
      header: {
        position: 'fixed',
        variant: 'dark',
      },
      footer: false,
    },
  }
}
