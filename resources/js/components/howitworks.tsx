// Howitworks.tsx
import { ChevronsRight } from 'lucide-react'
import React from 'react'

const steps = [
  { n: 1, title: 'Setup Your Products', body: 'Start by adding your products, prices, and essential details. Build an organized product catalog that makes managing your business easier from day one.' },
  { n: 2, title: 'Track Inventory and Manage Sales', body: 'Record stock additions and deductions, monitor inventory levels, register sales, and manage customer information — all from one centralized platform.' },
  { n: 3, title: 'Monitor and Grow Your Business', body: 'View your sales statistics, review order records, and keep track of your inventory. Use the information available in your dashboard to stay organized and make better business decisions.' },
]

export const Howitworks = () => {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full flex-col justify-start items-center lg:gap-12 gap-10 inline-flex">
          <div className="w-full flex-col justify-start items-center gap-3 flex">
            <h2 className="w-full text-center text-gray-900 dark:text-gray-200 text-4xl font-bold leading-normal font-lexend">
              How It Works
            </h2>
            <p className="w-full text-center text-gray-600 dark:text-gray-400 text-base leading-relaxed font-dm-sans">
              Managing your business doesn't have to be complicated.<br />
              Reziq brings your products, inventory, customers, and sales together in a simple workflow.
            </p>
          </div>

          <div className="w-full justify-start items-center gap-4 flex md:flex-row flex-col">
            {steps.map((s, i) => (
              <React.Fragment key={s.n}>
                <div className="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
                  <div className="self-stretch flex-col justify-start items-center gap-0.5 flex">
                    <h3 className="self-stretch text-center text-green-600 text-4xl font-extrabold leading-normal">
                      {s.n}
                    </h3>
                    <h4 className="self-stretch text-center text-gray-900 dark:text-gray-200 text-xl font-semibold leading-8 font-lexend">
                      {s.title}
                    </h4>
                  </div>
                  <p className="self-stretch text-center text-gray-600 dark:text-gray-400 text-base leading-relaxed font-dm-sans">
                    {s.body}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <ChevronsRight className="shrink-0 text-gray-400 dark:text-gray-500 rotate-90 md:rotate-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}