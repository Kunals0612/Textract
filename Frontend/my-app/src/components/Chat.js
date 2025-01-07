import React from 'react'

function Chat({message}) {
  return (
    <>
        {message && <div className='ml-5 flex flex-row'>
            <div>
                <img src="/user.png" className='w-[10vw]'></img>
            </div>
            <div className='m-3'>
                <p className=''>{message}</p>
            </div>
        </div>}
    </>
  )
}

export default Chat