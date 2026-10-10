// Contact.tsx
import React from 'react'

export const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex gap-x-24 clear-left md:mb-16 mb-10">
          <div className="md:mb-0 mb-4">
            <h2 className="text-green-600 dark:text-green-500 text-4xl font-semibold leading-10 mb-5 md:text-left text-center font-lexend">
              Get In Touch
            </h2>
            <p className="text-gray-700 dark:text-gray-200 text-lg font-normal leading-7 mb-7 md:text-left text-center font-dm-sans">
              Whether you have a concern or simply want to say hello, We are here to facilitate communication with you.
            </p>
          </div>
          <div className="border-l-2 border-gray-300 md:border-green-600 dark:border-white/20 dark:md:border-green-600 px-10 py-6">
            <div className="mb-8">
              <h6 className="text-green-600 dark:text-green-400 text-sm font-medium leading-5 pb-3 md:text-start text-center font-lexend">Email Address</h6>
              <h3 className="text-gray-900 dark:text-gray-50 text-xl font-semibold leading-8 md:text-start text-center font-dm-sans">TBA</h3>
            </div>
            <div>
              <h6 className="text-green-600 dark:text-green-400 text-sm font-medium leading-5 pb-3 md:text-start text-center font-lexend">Phone Number</h6>
              <h3 className="text-gray-900 dark:text-gray-50 text-xl font-semibold leading-8 md:text-start text-center font-dm-sans">TBA</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}