export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: 'https://discord.gg/4PmJGFcAjX',
      permanent: false,
    },
  }
}

export default function Discord() {
  return null
}
