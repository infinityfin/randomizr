import { useNetwork, useSwitchNetwork } from 'wagmi'

export const NetworkSwitcher = () => {
  const { chain } = useNetwork()
  const { chains, error, pendingChainId, switchNetwork, status } =
    useSwitchNetwork()

  let count = 1;
  let btnID = "btn" + count;

  return (
    <div>
      {chain && <div>Using {chain.name}</div>}

      {chains.map((x) => (
        <button
          disabled={!switchNetwork || x.id === chain?.id}
          key={x.id}
          id={"net" + count++}
          type='button'
          onClick={() => switchNetwork?.(x.id)}
        >
          Switch to {x.name}
          {status === 'loading' && x.id === pendingChainId && '…'}
        </button>
      ))}

      <div>{error && (error?.message ?? 'Failed to switch')}</div>
    </div>
  )
}
