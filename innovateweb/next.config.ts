const isVercel = process.env.VERCEL === '1';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eorctlkxihvxynooadfg.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_TDXWsduFZhO_pEFinzozLg_u5_pqbJc',
  },
  ...(isVercel
    ? {}
    : {
        basePath: '/web',
        assetPrefix: '/web/',
      }),
};

export default nextConfig;
