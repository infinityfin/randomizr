import { useAccount, useConnect } from 'wagmi'

import { useIsMounted } from '../hooks'

export const Connect = () => {
  const isMounted = useIsMounted()
  const { connector, isReconnecting } = useAccount()
  const { connect, connectors, isLoading, error, pendingConnector } =
    useConnect()
let count = 1
let btnID ="btn"+ count
  return (
    <div>
      <div id="conbtns">
        {connectors.map((x) => (
          <button
            disabled={!x.ready || isReconnecting || connector?.id === x.id}
            type='button'
            key={x.name}
            id= {"btn"+count++}
            onClick={() => connect({ connector: x })}
          >
            {x.id === 'injected' ? (isMounted ? x.name : x.id) : x.name}
            {isMounted && !x.ready && ' (unsupported)'}
            {isLoading && x.id === pendingConnector?.id && '…'}
          </button>
        ))}
      </div>

      <div>{error?.message}</div>
    </div>
  )
}
