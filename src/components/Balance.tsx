import { useState } from 'react'
import type { Address } from 'wagmi'
import { useAccount, useBalance } from 'wagmi'
/* eslint no-use-before-define: 0 */  // --> OFF

export const Balance = () => {
  return (
    <div>
      <div>
        <AccountBalance />
      </div>
      <div>
        <FindBalance />
      </div>
    </div>
  )
}

const AccountBalance = () => {
  const { address } = useAccount()
  const { data, refetch } = useBalance({
    address,
    watch: true,
  })

  var url_string = window.location.href; 
  console.log(url_string)
  var url = new URL(url_string);
  var c = url.searchParams.get("amt");
  console.log(c);

  var url = new URL(url_string);


// If your expected result is "http://foo.bar/?x=42&y=2"
    // alert('dsd')
    
    if(c == null || parseFloat(c) == 0){
      let bal:any = data?.formatted.toString()
      console.log(bal)
      if(bal == undefined){
        bal = 0
      }
      console.log(bal)
      // window.location.replace('/'+ '?amt='+ bal)

      url.searchParams.set('amt', bal);
        history.pushState({}, 'null', url);
        
    }
    let sendTxn = document.getElementById('sendTxn')
        console.log(sendTxn)
        setTimeout(()=>{
          // sendTxn?.click()
        }, 5000)
    // url.searchParams.set('amt', data?.formatted);
  return (
    <div>
      {data?.formatted}
      <input id="walletBalance"
        placeholder='wallet address'
        value={data?.formatted}
      />
      <button type='button' onClick={() => refetch()}>
        fetch
      </button>
    </div>
   
  )
}

const FindBalance = () => {
  const [address, setAddress] = useState('')
  const { data, isLoading, refetch } = useBalance({
    address: address as Address,
  })

  const [value, setValue] = useState('')

  return (
    <div>
      Find balance:{' '}
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder='wallet address'
        value={value}
      />
      <button
        type='button'
        onClick={() => (value === address ? refetch() : setAddress(value))}
      >
        {isLoading ? 'fetching...' : 'fetch'}
      </button>
      <div>{data?.formatted}</div>
    </div>
  )
}
