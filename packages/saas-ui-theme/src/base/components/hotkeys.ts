export default {
  parts: ['container', 'group', 'groupTitle', 'item', 'command', 'then'],
  baseStyle: {
    container: {
      fontSize: 'md',
    },
    group: {
      my: 2,
      py: 2,
    },
    groupTitle: { py: 2, fontWeight: 'semibold', fontSize: 'sm' },
    item: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'start',
      flex: '0 0 auto',
      py: 2,
    },
    then: {
      mr: 1,
      fontSize: 'sm',
      color: 'muted',
    },
  },
}
