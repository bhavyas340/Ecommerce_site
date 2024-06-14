import React from 'react'
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph'
import { Metadata } from 'next'
import classes from './index.module.scss'
import Link from 'next/link'
import { RenderParams } from '../../../_components/RenderParams'
import { Order } from '../../../../payload/payload-types'
import { getMeUser } from '../../../_utilities/getMeUser'
import { formatDateTime } from '../../../_utilities/formatDateTime'
import { Button } from '../../../_components/Button'

export default async function Orders(){
    const { token } = await getMeUser({
        nullUserRedirect: `/login?error=${encodeURIComponent(
          'You must be logged in to view your orders.',
        )}&redirect=${encodeURIComponent('/orders')}`,
      })
    let orders: Order[] | null = null
  return (
    // <div>
    //   <h1>Orders</h1>
    // </div>
    <div>
    <h5>My Orders</h5>
    {(!orders || !Array.isArray(orders) || orders?.length === 0) && (
      <p className={classes.noOrders}>You have no orders.</p>
    )}
    <RenderParams />
    {orders && orders.length > 0 && (
      <ul className={classes.orders}>
        {orders?.map(order => (
          <li key={order.id} className={classes.order}>
            <Link className={classes.item} href={`/account/orders/${order.id}`}>
              <div className={classes.itemContent}>
                <h6 className={classes.itemTitle}>{`Order ${order.id}`}</h6>
                <div className={classes.itemMeta}>
                  <p>
                    {'Total: '}
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'usd',
                    }).format(order.total / 100)}
                  </p>
                  <p className={classes.orderDate}>{`Ordered On: ${formatDateTime(
                    order.createdAt,
                  )}`}</p>
                </div>
              </div>
              <Button
                appearance="default"
                label="View Order"
                className={classes.button}
                el="link"
                href={`/account/orders/${order.id}`}
              />
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
  )
}

// export default Orders;
export const metadata: Metadata = {
    title: 'Orders',
    description: 'Your orders.',
    openGraph: mergeOpenGraph({
      title: 'Orders',
      url: '/orders',
    }),
  }
  
