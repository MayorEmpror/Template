'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import cx from 'classnames'

import { registerPayloadUser } from '@/app/(frontend)/Components/server/actions'
import { ROUTES } from '@/app/(frontend)/utils/constants'

const Signup = () => {
  // router
  const router = useRouter()

  //states
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
  
    try {
      const user = await registerPayloadUser(
        data.email,
        data.password,
        data.firstName,
        data.lastName
      )
  
      if (user) {
        toast.success('Account created successfully!')
        router.push(ROUTES.LOGIN)
      }
    } catch (error) {
      toast.error((error as Error).message || 'Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <>
      {/* <!-- ===== SignUp Form Start ===== --> */}
      <ToastContainer className={'z-[999999]'} />
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
            <Image src="/images/shape/shape-dotted-light.svg" alt="Dotted" fill />
          </div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },

              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 xl:px-15 xl:pt-15"
          >
            <h2 className="mb-15 text-center text-3xl font-semibold text-black xl:text-sectiontitle2">
              Create an Account
            </h2>

            <form onSubmit={handleSignup} className='text-black'>
              <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
                <input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={data.firstName}
                  onChange={handleInputChange}
                  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none lg:w-1/2"
                  disabled={isLoading}
                />

                <input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={data.lastName}
                  onChange={handleInputChange}
                  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none lg:w-1/2"
                  disabled={isLoading}
                />
              </div>

              <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={data.email}
                  onChange={handleInputChange}
                  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none lg:w-1/2"
                  disabled={isLoading}
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={handleInputChange}
                  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none lg:w-1/2"
                  disabled={isLoading}
                />
              </div>

              <div className="flex flex-wrap gap-10 md:justify-between xl:gap-15">
                <div className="mb-4 flex items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    className="peer sr-only"
                    disabled={isLoading}
                  />
                  <span className="border-gray-300 bg-gray-100 text-blue-600 group mt-1 flex h-5 min-w-[20px] items-center justify-center rounded peer-checked:bg-primary">
                    <svg
                      className="opacity-0 peer-checked:group-[]:opacity-100"
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* SVG content */}
                    </svg>
                  </span>
                  <label
                    htmlFor="default-checkbox"
                    className="flex max-w-[425px] cursor-pointer select-none pl-3"
                  >
                    Keep me signed in
                  </label>
                </div>

                <button
                  aria-label="signup with email and password"
                  className={cx(
                    'inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out',
                    {
                      'cursor-not-allowed': isLoading,
                      'opacity-75': isLoading,
                      'hover:bg-black': !isLoading,
                    },
                  )}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      Create Account
                      <svg
                        className="fill-white"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                          fill=""
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-12.5 border-t border-stroke py-5 text-center">
                <p>
                  Already have an account?{' '}
                  <Link
                    className={cx('text-black hover:text-primary', {
                      'pointer-events-none opacity-50': isLoading,
                    })}
                    href={ROUTES.LOGIN}
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== SignUp Form End ===== --> */}
    </>
  )
}

export default Signup
