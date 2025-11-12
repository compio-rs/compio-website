export type Title = string
export type Path = string
export type Page = [Title, Path | null]
export type Section = Page | [Page, Section[]] | Section[]

const compio: Section[] = [
  ['Buffers', '/docs/compio/buffers'],
  ['IO', '/docs/compio/io'],
  [
    ['Driver', '/docs/compio/driver'],
    [
      ['IOCP', '/docs/compio/driver/iocp'],
      ['io-uring', '/docs/compio/driver/io-uring'],
      ['polling', '/docs/compio/driver/polling'],
    ],
  ],
  ['Runtime', '/docs/compio/runtime'],
  ['Dispatcher', '/docs/compio/dispatcher'],
  [
    ['File system', '/docs/compio/fs'],
    [
      ['File', '/docs/compio/fs/file'],
      ['Pipe', '/docs/compio/fs/pipe'],
      ['Standard IO', '/docs/compio/fs/stdio'],
      ['Utils', '/docs/compio/fs/utils'],
    ],
  ],
  [
    ['Networking', '/docs/compio/net'],
    [
      ['Sockets', '/docs/compio/net/sockets'],
      ['Asynchronous resolve', '/docs/compio/net/resolve'],
      ['Ready-based socket', '/docs/compio/net/poll'],
    ],
  ],
  ['Signal', '/docs/compio/signal'],
  ['Process', '/docs/compio/process'],
  ['TLS', '/docs/compio/tls'],
  // [['QUIC', 'compio/quic'], [['HTTP 3', 'compio/quic/http3']]], // TODO(@Berrysoft): Write this
]

const cyper: Section[] = [
  ['Core', '/docs/cyper/core'],
  ['HTTP client', '/docs/cyper/client'],
  ['HTTP server - Axum adaptor', '/docs/cyper/axum'],
]

const winio: Section[] = [
  ['Start', '/docs/winio/start'],
  ['Async GUI', '/docs/winio/async'],
  ['Component', '/docs/winio/component'],
  ['Layout', '/docs/winio/layout'],
  ['Handle', '/docs/winio/handle'],
  ['Widgets', '/docs/winio/widgets'],
]

const summary: Section[] = [
  ['Preface', '/docs/preface'],
  [['Compio', null], compio],
  [['Cyper', null], cyper],
  [['WinIO', null], winio],
]

export default summary
