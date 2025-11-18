'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Navigation Bar */}
      <header className="absolute top-0 left-0 right-0 z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between bg-brand-dark-brown text-white/90 rounded-b-lg px-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="size-6 text-brand-gold">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tighter text-white">CoffeeTrack</h2>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a className="text-sm font-medium transition hover:text-white" href="#">Features</a>
            <a className="text-sm font-medium transition hover:text-white" href="#">Pricing</a>
            <a className="text-sm font-medium transition hover:text-white" href="#">Sign In</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-wide transition hover:opacity-90">
              <span className="truncate">Sign Up</span>
            </button>
            <button className="md:hidden p-2 rounded-md text-white/90 hover:text-white hover:bg-white/10">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex h-full grow flex-col">
        <div className="relative flex flex-1 items-center justify-center pt-20">
          <div className="absolute inset-0 bg-gradient-custom bg-pattern"></div>
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
              {/* Left Column: Text Content */}
              <div className="flex flex-col gap-8 text-center lg:text-left">
                <div className="flex flex-col gap-4">
                  <h1 className="font-serif-display text-4xl font-black leading-tight tracking-tight text-brand-dark-brown dark:text-background-light sm:text-5xl md:text-6xl">
                    Find Premium Coffee at the Best Prices
                  </h1>
                  <p className="max-w-xl text-base text-brand-dark-brown/80 dark:text-background-light/80 lg:text-lg mx-auto lg:mx-0">
                    Our AI-powered platform helps you track prices and discover the best deals on specialty coffee beans from around the world. Never overpay for your favorite roast again.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <Link href="/deals">
                    <button className="flex w-full sm:w-auto min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold tracking-wide shadow-lg shadow-primary/30 transition hover:shadow-xl hover:shadow-primary/40">
                      <span className="truncate">Browse Coffees</span>
                    </button>
                  </Link>
                  <button className="flex w-full sm:w-auto min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent border-2 border-brand-dark-brown/40 text-brand-dark-brown dark:border-background-light/40 dark:text-background-light text-base font-bold tracking-wide transition hover:bg-brand-dark-brown/5 dark:hover:bg-background-light/10">
                    <span className="truncate">See How It Works</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Content */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-lg rounded-xl bg-white/50 dark:bg-black/20 p-4 shadow-2xl backdrop-blur-sm dark:shadow-brand-dark-brown/40">
                  <div
                    className="aspect-[4/3] w-full rounded-lg bg-center bg-no-repeat bg-cover"
                    style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrKXt7bkXQOcuqzqhCW9cXXAd5rVW92xLGmcABltqaQy7bEy6D9LAZMSwFmnswUZ-Qb9EO7yGmjlBOZCn4aFFpsMZoU18v_OhKT1s1fa_aUgJAEcnEsYC_iLS7VTNpKR3EMNqQpAwSKgELm_6ayCA2vHAB2paXRi7gYnFGJOmauHY0awmXnIlEWMD7woRUZdrND1Bh7ALSnSFIyOvBtwGpXtETYzDBq2EQ-zEMgrBliG5O7XJN0zpVKGsDs4dneB0hYdIBeaCSEoE")'}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
