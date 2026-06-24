import { AdminLogo } from '@/components/admin/Logo'
import { AdminIcon } from '@/components/admin/Icon'
import { BeforeDashboard } from '@/components/admin/Dashboard'
import { BeforeLogin } from '@/components/admin/BeforeLogin'
import { GenerateWithAI } from '@/components/admin/GenerateWithAI'

export const importMap = {
  '@/components/admin/Logo#AdminLogo': AdminLogo,
  '@/components/admin/Icon#AdminIcon': AdminIcon,
  '@/components/admin/Dashboard#BeforeDashboard': BeforeDashboard,
  '@/components/admin/BeforeLogin#BeforeLogin': BeforeLogin,
  '@/components/admin/GenerateWithAI#GenerateWithAI': GenerateWithAI,
}
