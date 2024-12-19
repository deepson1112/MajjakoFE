import React from 'react'
import { Skeleton } from '../ui/Skeleton'

const RestaurantLoader = () => {
  return (
    <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 pt-10 pb-5">
<Skeleton className="w-72 h-80 shadow-md rounded-xl" />
<Skeleton className="w-72 h-80 shadow-md rounded-xl" />
<Skeleton className="w-72 h-80 shadow-md rounded-xl" />
<Skeleton className="w-72 h-80 shadow-md rounded-xl" />
<Skeleton className="w-72 h-80 shadow-md rounded-xl" />
<Skeleton className="w-72 h-80 shadow-md rounded-xl" />
      
    </section>
  )
}

export default RestaurantLoader
