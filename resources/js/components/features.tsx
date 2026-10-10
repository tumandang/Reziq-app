// Features.tsx
import { Clock, Database, PieChart } from 'lucide-react'

const iconBox =
  'mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:text-green-400'

export const Features = () => {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="mx-auto mb-6 max-w-max text-4xl font-bold leading-[3.25rem] text-gray-900 dark:text-white lg:max-w-3xl font-lexend">
            Built for Better Business Management
          </h2>
          <p className="mx-auto mb-8 text-base font-normal text-gray-600 dark:text-gray-400 lg:max-w-2xl font-dm-sans">
            Simplify the way you manage products, track inventory, organize customers, and handle
            sales — all in one place with Reziq.
          </p>
        </div>

        <div className="mx-auto grid max-w-lg grid-cols-1 gap-6 md:max-w-2xl md:grid-cols-2 lg:max-w-full lg:grid-cols-4">
          <div className="h-full md:col-span-2">
            <div className="flex h-full flex-row flex-wrap justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#111111] dark:shadow-none">
              <div className="w-full p-5 md:w-1/2 xl:p-8">
                <div className={iconBox}><Clock /></div>
                <h3 className="w-full py-2 text-lg font-bold text-gray-900 dark:text-white xl:w-64 xl:text-xl font-lexend">
                  Manage Your Business with Ease
                </h3>
                <p className="mb-8 w-full text-xs font-normal text-gray-600 dark:text-gray-400 xl:w-64 font-dm-sans">
                  Centralize your business operations. Automate manual tasks and focus on growth.
                </p>
              </div>
              <div className="relative hidden md:block md:w-1/2">
                <img src="/img/giantphone.png" alt="Hand-Give-illustration" className="ml-auto h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="relative w-full h-auto">
            <div className="bg-green-500 rounded-2xl p-5 xl:p-8 h-full text-white">
              <Database />
              <h3 className="py-5 text-lg font-bold xl:text-xl font-lexend">Smarter Inventory, Better Control</h3>
              <p className="text-xs font-normal mb-8 font-dm-sans">
                Track stock levels, log adjustments, and catch low inventory before it runs out. Simple, reliable inventory management.
              </p>
            </div>
          </div>

          <div className="relative w-full h-auto">
            <div className="bg-emerald-500 rounded-2xl p-5 xl:p-8 h-full text-white">
              <PieChart />
              <h3 className="py-5 text-lg font-bold xl:text-xl font-lexend">Turn Sales into Better Insights</h3>
              <p className="text-xs font-normal mb-8 font-dm-sans">
                Track orders, payments, and sales performance from a single dashboard. Stay organized and make smarter, data-backed decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}